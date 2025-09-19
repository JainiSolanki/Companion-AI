from .models import ChatMessage, ChatSession
from rest_framework import serializers

class ChatMessageSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = ChatMessage
        fields = ['id', 'user', 'username', 'session_id', 'message', 'response','sources','timestamp']
        extra_kwargs = {
            'user': {'read_only': True},
            'session': {'read_only': True},
        }


class ChatSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatSession
        fields = ['id', 'session_id', 'title', 'appliance', 'company', 'manual', 'created_at', 'last_activity']
