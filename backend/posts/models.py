from django.db import models
from django.conf import settings


class Post(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, db_column="author"
    )
    title = models.CharField(max_length=120, blank=True, default="")
    content = models.TextField()
    slug = models.SlugField()

    class Meta:
        ordering = ["created"]

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return f"/{self.slug}/"
