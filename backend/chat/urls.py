from django.urls import path
from .views import ChatMessageListCreateView, ChatSessionListCreateView

urlpatterns = [
    path("chat/", ChatMessageListCreateView.as_view(), name="chat-list-create"),
    path("sessions/", ChatSessionListCreateView.as_view(), name="session-list-create"),
]
