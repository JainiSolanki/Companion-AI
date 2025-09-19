from django.shortcuts import render
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken


# ✅ Signup API
@api_view(["POST"])
def signup(request):
    username = request.data.get("username")
    email = request.data.get("email")
    password = request.data.get("password")

    if not username or not email or not password:
        return Response({"error": "All fields are required"}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(email=email).exists():
        return Response({"error": "Email already exists"}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, email=email, password=password)
    
    user.save()

    return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)


# ✅ Login API (updated to use email instead of username)
@api_view(["POST"])
def login(request):
    email = request.data.get("email")
    password = request.data.get("password")

    if not email or not password:
        return Response({"error": "Email and password are required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Fetch user by email
        user_obj = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({"error": "Invalid Credentials"}, status=status.HTTP_401_UNAUTHORIZED)

    # Authenticate using username (since Django needs username)
    user = authenticate(username=user_obj.username, password=password)

    if user is not None:
        refresh = RefreshToken.for_user(user)
        return Response({
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "username": user.username,
            "email": user.email,
        }, status=status.HTTP_200_OK)
    else:
        return Response({"error": "Invalid Credentials"}, status=status.HTTP_401_UNAUTHORIZED)
