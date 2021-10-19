from django.urls import path
from .views import UserList, UserCreate, BlacklistTokenUpdateView

app_name = 'users'

urlpatterns = [
    path('users/list/', UserList.as_view(), name='userslist'),
    path('users/create/', UserCreate.as_view(), name="create_user"),
    path(
        'logout/blacklist/',
        BlacklistTokenUpdateView.as_view(),
        name='blacklist'
    )
]
