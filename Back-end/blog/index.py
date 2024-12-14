from algoliasearch_django import AlgoliaIndex
from algoliasearch_django.decorators import register
from .models import Post, UserProfile

@register(Post)
class PostIndex(AlgoliaIndex):
    should_index = 'get_is_public'
    fields = [
        'header',
        'description',
        'image',
        'categories',
        'get_tags',
    ]
    tags = 'get_tags'

@register(UserProfile)
class UserProfileIndex(AlgoliaIndex):
    should_index = 'get_is_public'
    fields = [
        'user',  # or any fields you want to index
        'bio',
        'profile_picture',
        'birthdate',
        'ig',
        'x',
    ]
