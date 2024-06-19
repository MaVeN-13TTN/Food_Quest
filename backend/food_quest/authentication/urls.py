from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import UserRegistrationView, CheckAuthenticationView

urlpatterns = [
    path("register/", UserRegistrationView.as_view(), name="user_registration"),
    path("login/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("check-auth/", CheckAuthenticationView.as_view(), name="check_authentication"),
]
