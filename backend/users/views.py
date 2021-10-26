from rest_framework import generics
from rest_framework.permissions import (SAFE_METHODS, AllowAny, BasePermission)
from users.models import CustomUser
from .serializers import CustomUserSerializer


class EditUserPermissions(BasePermission):

    message = "Only the author of this post can edit or delete"

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True

        return obj == request.user


# Create your views here.
class UserListCreate(generics.ListCreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [AllowAny]


class UserDetail(generics.RetrieveUpdateDestroyAPIView, EditUserPermissions):
    queryset = CustomUser.objects.all()
    permission_classes = [EditUserPermissions]
    serializer_class = CustomUserSerializer
