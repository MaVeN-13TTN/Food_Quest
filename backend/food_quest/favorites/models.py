from django.db import models
from authentication.models import User


class Favorite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    recipe_id = models.IntegerField()
    title = models.CharField(max_length=255)
    image_url = models.URLField()
    source_url = models.URLField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "recipe_id")
