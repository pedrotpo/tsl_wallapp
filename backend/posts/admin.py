from django.contrib import admin
from posts.models import Post, Tag


@admin.register(Post)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ('title', 'id', 'published', 'slug', 'author_id')
    prepopulated_fields = {
        'slug': ('title', ),
    }


admin.site.register(Tag)
