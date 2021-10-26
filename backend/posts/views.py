from rest_framework import generics
from posts.models import Post, Tag
from .serializers import PostSerializer, TagSerializer
from rest_framework.permissions import (SAFE_METHODS, BasePermission)


class PostUserPermissions(BasePermission):

    message = "Only the author of this post can edit or delete"

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True

        return obj.author_id == request.user


class PostsListCreate(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class PostsDetail(generics.RetrieveUpdateDestroyAPIView, PostUserPermissions):
    permission_classes = [PostUserPermissions]
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class TagsListCreate(generics.ListCreateAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
