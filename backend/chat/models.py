from django.db import models
from django.contrib.auth.models import User
import uuid

class ChatMessage(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    session_id = models.CharField(max_length=100, blank=True, null=True)
    message = models.TextField()
    response = models.TextField(blank=True, null=True)
    sources = models.JSONField(blank=True, null=True) 
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username}: {self.message[:30]}"
    
class ChatSession(models.Model):
    APPLIANCE_CHOICES = [
        ("refrigerator", "Refrigerator"),
        ("washing-machine", "Washing Machine"),  # ✅ FIXED: Use hyphen for consistency
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="chat_sessions")
    title = models.CharField(max_length=200, blank=True)
    appliance = models.CharField(max_length=50, choices=APPLIANCE_CHOICES)
    company = models.CharField(max_length=100)
    manual = models.CharField(max_length=200, blank=True, null=True)
    session_id = models.CharField(max_length=100, unique=True, default=uuid.uuid4)  # ✅ FIXED: Auto-generate unique IDs
    created_at = models.DateTimeField(auto_now_add=True)
    last_activity = models.DateTimeField(auto_now=True)

    class Meta:
        # ✅ FIXED: Add composite unique constraint to prevent duplicate sessions per user
        unique_together = ['user', 'appliance', 'company']

    def __str__(self):
        return f"{self.user.username} - {self.title or self.session_id}"


# from django.db import models
# from django.contrib.auth.models import User

# class ChatMessage(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE)   # <--- Do you have this?
#     session_id = models.CharField(max_length=100, blank=True, null=True)
#     message = models.TextField()
#     response = models.TextField(blank=True, null=True)
#     sources = models.JSONField(blank=True, null=True) 
#     timestamp = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f"{self.user.username}: {self.message[:30]}"
    
# class ChatSession(models.Model):
#     APPLIANCE_CHOICES = [
#         ("refrigerator", "Refrigerator"),
#         ("washing_machine", "Washing Machine"),
#     ]
#     # Companies could be extended later; keep generic text for flexibility
#     user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="chat_sessions")
#     title = models.CharField(max_length=200, blank=True)  # e.g. "LG Fridge - Manual 1"
#     appliance = models.CharField(max_length=50, choices=APPLIANCE_CHOICES)
#     company = models.CharField(max_length=100)  # "LG" or "Samsung"
#     manual = models.CharField(max_length=200, blank=True, null=True)  # store manual id or name
#     session_id = models.CharField(max_length=100, unique=True)  # frontend-generated uuid or string
#     created_at = models.DateTimeField(auto_now_add=True)
#     last_activity = models.DateTimeField(auto_now=True)

#     def __str__(self):
#         return f"{self.user.username} - {self.title or self.session_id}"
