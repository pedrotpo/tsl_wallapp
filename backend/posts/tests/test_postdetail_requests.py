from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import RefreshToken
from users.models import CustomUser


class UserAPIViewTests(APITestCase):
    user_url = reverse('users:userslistcreate')
    post_url = reverse('posts:postslistcreate')
    post_detail_url = reverse('posts:postsdetail', args="1")

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

    def test_post_get_delete_post(self):
        self.new_user = CustomUser.objects.create_user(
            email='test1@test.com',
            first_name='Jim',
            last_name='Doe',
            password='test12345'
        )

        self.valid_new_post = {
            'author_id': 1,
            'content': 'This is a new post!',
        }
        self.post_detail_new_url = reverse('posts:postsdetail', args="2")

        self.response = self.client.post(
            self.post_url, self.valid_new_post, format='json'
        )
        self.assertEqual(self.response.status_code, status.HTTP_201_CREATED)
        self.response = self.client.get(self.post_detail_url)
        self.assertEqual(self.response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            self.response.data['content'], self.valid_new_post['content']
        )
        self.response = self.client.delete(self.post_detail_url)
        self.assertEqual(self.response.status_code, status.HTTP_204_NO_CONTENT)
        self.response = self.client.post(
            self.post_url, self.valid_new_post, format='json'
        )
        self.assertEqual(self.response.status_code, status.HTTP_201_CREATED)
        self.new_token = RefreshToken.for_user(self.new_user)
        self.client.credentials(
            HTTP_AUTHORIZATION=f'JWT {self.new_token.access_token}'
        )
        self.response = self.client.delete(self.post_detail_new_url)
        self.assertEqual(self.response.status_code, status.HTTP_403_FORBIDDEN)
