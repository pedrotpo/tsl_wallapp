from django.db import models
from django.conf import settings
from django.utils import timezone


class Post(models.Model):

    content = models.TextField()
    published = models.DateTimeField(default=timezone.now)
    author_id = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='posts'
    )

    objects = models.Manager()

    class Meta:
        ordering = ('-published', )

    def __str__(self):
        return self.title
