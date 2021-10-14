from django.conf import settings
from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model

User = get_user_model()


class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = settings.AUTH_USER_MODEL
        fields = (
            "id",
            "email",
            "first_name",
            "last_name",
            "username",
            "password",
        )
