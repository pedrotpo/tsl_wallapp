from django.urls import path
from .views import PostsListCreate, PostsDetail

app_name = 'posts'

urlpatterns = [
    path('posts/', PostsListCreate.as_view(), name='postslistcreate'),
    path('posts/<int:pk>/', PostsDetail.as_view(), name='postsdetail'),
]
