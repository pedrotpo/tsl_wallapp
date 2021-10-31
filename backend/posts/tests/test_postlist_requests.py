from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import RefreshToken
from users.models import CustomUser


class UserAPIViewTests(APITestCase):
    user_url = reverse('users:userslistcreate')
    post_url = reverse('posts:postslistcreate')

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

    def test_get_post_list_authenticated(self):

        response = self.client.get(self.post_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_user_list_unauthenticated(self):

        self.client.force_authenticate(user=None, token=None)
        response = self.client.get(self.post_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_post_new_post(self):
        valid_new_post = {
            'author_id': 1,
            'content': 'This is a new post!',
        }

        wrong_author_post = {
            'author_id': 2,
            'content': 'This is a new post!',
        }

        response = self.client.post(
            self.post_url, valid_new_post, format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['content'], valid_new_post['content'])
        response = self.client.post(
            self.post_url, wrong_author_post, format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
