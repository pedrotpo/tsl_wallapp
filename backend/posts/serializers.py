from rest_framework import serializers
from posts.models import Post


class PostSerializer(serializers.ModelSerializer):
    author = serializers.CharField(source="author_id", read_only=True)

    class Meta:
        fields = ('id', 'author_id', 'author', 'content', 'published')
        model = Post
