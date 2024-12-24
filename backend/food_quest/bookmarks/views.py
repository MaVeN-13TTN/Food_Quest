from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.db import IntegrityError
from django.shortcuts import get_object_or_404
from .models import Bookmark
from .serializers import BookmarkSerializer


class BookmarkListCreateView(generics.ListCreateAPIView):
    serializer_class = BookmarkSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Bookmark.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        try:
            serializer.save(user=self.request.user)
        except IntegrityError:
            # Recipe is already bookmarked, return existing bookmark
            recipe_id = serializer.validated_data.get('recipe_id')
            bookmark = Bookmark.objects.get(user=self.request.user, recipe_id=recipe_id)
            serializer = self.get_serializer(bookmark)

    def create(self, request, *args, **kwargs):
        try:
            return super().create(request, *args, **kwargs)
        except IntegrityError:
            # Get the existing bookmark
            recipe_id = request.data.get('recipe_id')
            bookmark = Bookmark.objects.get(user=request.user, recipe_id=recipe_id)
            serializer = self.get_serializer(bookmark)
            return Response(serializer.data, status=status.HTTP_200_OK)


class BookmarkDestroyView(generics.DestroyAPIView):
    serializer_class = BookmarkSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Bookmark.objects.filter(user=self.request.user)

    def get_object(self):
        recipe_id = self.kwargs.get('pk')
        return get_object_or_404(self.get_queryset(), recipe_id=recipe_id)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(
            {"message": "Recipe removed from bookmarks successfully"},
            status=status.HTTP_200_OK
        )
