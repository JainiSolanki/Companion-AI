from rest_framework import generics, permissions, serializers
from rest_framework.permissions import IsAuthenticated
from .models import ChatMessage, ChatSession
from .serializers import ChatMessageSerializer, ChatSessionSerializer
from .rag_pipeline import RAGPipeline
from django.db import transaction, IntegrityError
from rest_framework.response import Response
from rest_framework import status


rag = RAGPipeline()

class ChatMessageListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ChatMessageSerializer

    def get_queryset(self):
        session_id = self.request.query_params.get("session_id")
        if not session_id:
            return ChatMessage.objects.none()
    
        return ChatMessage.objects.filter(
            session_id=session_id,
            user=self.request.user
        ).order_by("timestamp")

    def perform_create(self, serializer):
        message = self.request.data.get("message")
        appliance = self.request.data.get("appliance")
        brand = self.request.data.get("brand")

        if not appliance or not brand:
            raise serializers.ValidationError("Appliance and brand are required.")

        # Use user-specific session_id to avoid conflicts
        session_id = f"{self.request.user.id}-{brand}-{appliance}"
        
        # Use atomic transaction with proper error handling
        try:
            with transaction.atomic():
                session, created = ChatSession.objects.get_or_create(
                    user=self.request.user,
                    appliance=appliance,
                    company=brand,
                    defaults={
                        "session_id": session_id,
                        "title": f"{brand.capitalize()} {appliance.capitalize()} Support",
                    }
                )
        except IntegrityError:
            # Handle race condition - get existing session
            session = ChatSession.objects.get(
                user=self.request.user,
                appliance=appliance,
                company=brand
            )

        # Call RAG pipeline
        try:
            ai_answer, sources = rag.answer_query(message)
        except Exception as e:
            ai_answer = f"I apologize, but I'm experiencing technical difficulties. Please try again later."
            sources = []

        # Save message with correct session reference
        serializer.save(
            user=self.request.user,
            session_id=session.session_id,
            message=message,
            response=ai_answer,
            sources=sources if hasattr(serializer.Meta.model, 'sources') else None
        )

class ChatSessionListCreateView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ChatSessionSerializer

    def get_queryset(self):
        return ChatSession.objects.filter(user=self.request.user).order_by('-last_activity')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def delete(self, request, *args, **kwargs):
            
        """
        DELETE /api/sessions/

        Expects:
            JSON body: { "session_id": "<session_id>" }

        Note:
            Requires user to be authenticated (class already enforces IsAuthenticated).
        """

        session_id = request.data.get("session_id")
        if not session_id:
            return Response({"error": "session_id is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            session = ChatSession.objects.get(user=request.user, session_id=session_id)
            session.delete()
            return Response({"message": "Session deleted successfully"}, status=status.HTTP_200_OK)
        except ChatSession.DoesNotExist:
            return Response({"error": "Session not found"}, status=status.HTTP_404_NOT_FOUND)


# from rest_framework import generics, permissions
# from rest_framework.permissions import IsAuthenticated
# from .models import ChatMessage, ChatSession
# from .serializers import ChatMessageSerializer, ChatSessionSerializer
# from .rag_pipeline import RAGPipeline
# from django.db import transaction, IntegrityError


# rag = RAGPipeline()

# class ChatMessageListCreateView(generics.ListCreateAPIView):
#     permission_classes = [IsAuthenticated]          # <--- require JWT auth
#     serializer_class = ChatMessageSerializer

#     def get_queryset(self):
#         session_id = self.request.query_params.get("session_id")
#         if not session_id:
#             return ChatMessage.objects.none()  # don’t return all messages
    
#         return ChatMessage.objects.filter(
#             session_id=session_id,
#             user=self.request.user
#         ).order_by("timestamp")

#     def perform_create(self, serializer):
#         message = self.request.data.get("message")
#         appliance = self.request.data.get("appliance")
#         brand = self.request.data.get("brand")

#         if not appliance or not brand:
#             raise serializers.ValidationError("Appliance and brand are required.")

#         # create a session_id from appliance+brand
#         session_id = f"{brand}-{appliance}"

#         # get or create ChatSession
#         session, created = ChatSession.objects.get_or_create(
#             user=self.request.user,
#             session_id=session_id,
#             defaults={
#                 "appliance": appliance,
#                 "company": brand,
#                 "title": f"{brand.capitalize()} {appliance.capitalize()} Support",
#             }
#         )

#         # 🔎 Call RAG pipeline here
#         try:
#             ai_answer, sources = rag.answer_query(message)
#         except Exception as e:
#             ai_answer = f"⚠️ AI service error: {str(e)}"
#             sources = []

#         # save message + AI response
#         serializer.save(
#             user=self.request.user,
#             session_id=session.session_id,
#             message=message,
#             response=ai_answer,   # <--- real AI response
#             sources=sources       # you may need to add this field in model/serializer
#         )

# class ChatSessionListCreateView(generics.ListCreateAPIView):
#     permission_classes = [permissions.IsAuthenticated]
#     serializer_class = ChatSessionSerializer

#     def get_queryset(self):
#         return ChatSession.objects.filter(user=self.request.user).order_by('-last_activity')

#     def perform_create(self, serializer):
#         serializer.save(user=self.request.user)

