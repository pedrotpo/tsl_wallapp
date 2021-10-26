from django.urls import path
from .views import UserListCreate, UserDetail

app_name = 'users'

urlpatterns = [
    path('users/', UserListCreate.as_view(), name='userslistcreate'),
    path('users/<int:pk>/', UserDetail.as_view(), name='userdetail')
]
