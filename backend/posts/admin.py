from django.contrib import admin
from posts.models import Post


@admin.register(Post)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ('id', 'published', 'author_id')
