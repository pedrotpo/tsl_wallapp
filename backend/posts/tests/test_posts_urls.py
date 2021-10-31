from django.urls import reverse, resolve
from django.test import SimpleTestCase
from ..views import PostsListCreate, PostsDetail


class ApiUrlsTests(SimpleTestCase):
    def test_get_posts(self):
        url = reverse('posts:postslistcreate')
        resolvedUrl = resolve(url).func.view_class
        self.assertEqual(resolvedUrl, PostsListCreate)

    def test_get_post_details(self):
        url = reverse('posts:postsdetail', args="1")
        resolvedUrl = resolve(url).func.view_class
        self.assertEqual(resolvedUrl, PostsDetail)
