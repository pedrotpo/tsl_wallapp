from django.urls import path
from .views import PostsList, PostsDetail, TagsList

app_name = 'posts'

urlpatterns = [
    path('posts/<int:pk>/', PostsDetail.as_view(), name='postsdetailcreate'),
    path('posts/', PostsList.as_view(), name='postslistcreate'),
    path('tags/', TagsList.as_view(), name='tagslistcreate'),
]
