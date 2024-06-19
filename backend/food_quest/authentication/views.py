from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import User
from .serializers import UserSerializer


class UserRegistrationView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)


class CheckAuthenticationView(APIView):
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        return Response({"authenticated": True})
