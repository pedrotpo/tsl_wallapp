from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import RefreshToken
from users.models import CustomUser


class UserAPIViewTests(APITestCase):
    client_url = reverse('users:userslistcreate')
    user_detail_url = reverse('users:userdetail', args="1")

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

    def test_update_user(self):
        updated_user = {
            'email': 'test@test.com',
            'first_name': 'Jim',
            'last_name': 'Doe',
            'password': 'test12345'
        }

        response = self.client.put(
            self.user_detail_url, updated_user, format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            response.data['first_name'], updated_user['first_name']
        )
