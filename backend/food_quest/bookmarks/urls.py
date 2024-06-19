from django.urls import path
from .views import BookmarkListCreateView, BookmarkDestroyView

urlpatterns = [
    path("", BookmarkListCreateView.as_view(), name="bookmark_list_create"),
    path("<int:pk>/", BookmarkDestroyView.as_view(), name="bookmark_destroy"),
]
