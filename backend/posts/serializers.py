from rest_framework import serializers
from posts.models import Post, Tag


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'title', 'author_id', 'content', 'published', 'tag')
        model = Post


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'name')
        model = Tag
