from rest_framework import serializers
from .models import Favorite


class FavoriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorite
        fields = (
            "id",
            "user",
            "recipe_id",
            "title",
            "image_url",
            "source_url",
            "created_at",
        )
        read_only_fields = ("id", "user", "created_at")
