from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import RefreshToken
from users.models import CustomUser


class UserAPIViewTests(APITestCase):
    client_url = reverse('users:userslistcreate')

    def setUp(self):
        self.user = CustomUser.objects.create_user(
            email='test@test.com',
            first_name='John',
            last_name='Doe',
            password='test12345'
        )
        self.token = RefreshToken.for_user(self.user)
        self.client.credentials(
            HTTP_AUTHORIZATION=f'JWT {self.token.access_token}'
        )

    def tearDown(self):
        pass

    def test_get_user_list_authenticated(self):

        response = self.client.get(self.client_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_user_list_unauthenticated(self):

        self.client.force_authenticate(user=None, token=None)
        response = self.client.get(self.client_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_post_new_user(self):
        new_user = {
            'email': 'newtest@test.com',
            'first_name': 'Jane',
            'last_name': 'Doe',
            'password': 'test12345'
        }

        response = self.client.post(self.client_url, new_user, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['email'], new_user['email'])
        self.assertEqual(response.data['first_name'], new_user['first_name'])
        self.assertEqual(response.data['last_name'], new_user['last_name'])
