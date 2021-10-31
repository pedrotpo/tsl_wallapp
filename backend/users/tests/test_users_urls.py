from django.urls import reverse, resolve
from django.test import SimpleTestCase
from ..views import UserListCreate, UserDetail


class ApiUrlsTests(SimpleTestCase):
    def test_get_users(self):
        url = reverse('users:userslistcreate')
        resolvedUrl = resolve(url).func.view_class
        self.assertEqual(resolvedUrl, UserListCreate)

    def test_get_user_details(self):
        url = reverse('users:userdetail', args="1")
        resolvedUrl = resolve(url).func.view_class
        self.assertEqual(resolvedUrl, UserDetail)
