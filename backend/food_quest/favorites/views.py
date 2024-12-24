from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.db import IntegrityError
from django.shortcuts import get_object_or_404
from .models import Favorite
from .serializers import FavoriteSerializer


class FavoriteListCreateView(generics.ListCreateAPIView):
    serializer_class = FavoriteSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Favorite.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        try:
            serializer.save(user=self.request.user)
        except IntegrityError:
            # Recipe is already in favorites, return existing favorite
            recipe_id = serializer.validated_data.get('recipe_id')
            favorite = Favorite.objects.get(user=self.request.user, recipe_id=recipe_id)
            serializer = self.get_serializer(favorite)

    def create(self, request, *args, **kwargs):
        try:
            return super().create(request, *args, **kwargs)
        except IntegrityError:
            # Get the existing favorite
            recipe_id = request.data.get('recipe_id')
            favorite = Favorite.objects.get(user=request.user, recipe_id=recipe_id)
            serializer = self.get_serializer(favorite)
            return Response(serializer.data, status=status.HTTP_200_OK)


class FavoriteDestroyView(generics.DestroyAPIView):
    serializer_class = FavoriteSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Favorite.objects.filter(user=self.request.user)

    def get_object(self):
        recipe_id = self.kwargs.get('pk')
        return get_object_or_404(self.get_queryset(), recipe_id=recipe_id)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(
            {"message": "Recipe removed from favorites successfully"},
            status=status.HTTP_200_OK
        )
