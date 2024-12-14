from django.urls import path
from .views import PostView, PostCommentView, LikeView, CategoryView, TagView, UserProfileView, NotificationView,PostViewUser,PostSearch
from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    re_path(r'ws/some-path/$', consumers.MyConsumer.as_asgi()),
]
urlpatterns = [
     
    path("post/search/",PostSearch.as_view(),name="PostSearch"),

    path('posts/', PostView.as_view(), name='post-list-create'),
    path('postsuser/', PostViewUser.as_view(), name='post-list-create'),
    path('posts/<int:pk>/', PostView.as_view(), name='post-detail'),

    path('comments/', PostCommentView.as_view(), name='comment-list-create'),
    path('comments/<int:pk>/', PostCommentView.as_view(), name='comment-detail'),

    path('likes/', LikeView.as_view({'get': 'list', 'post': 'create'}), name='like-list-create'),
    path('likes/<int:pk>/', LikeView.as_view({'put': 'update', 'delete': 'destroy'}), name='like-detail'),

    path('categories/', CategoryView.as_view({'get': 'list', 'post': 'create'}), name='category-list-create'),
    path('categories/<int:pk>/', CategoryView.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='category-detail'),

    path('tags/', TagView.as_view({'get': 'list', 'post': 'create'}), name='tag-list-create'),
    path('tags/<int:pk>/', TagView.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='tag-detail'),

    path('notifications/', NotificationView.as_view({'get': 'list', 'post': 'create'}), name='notification-list-create'),
    path('notifications/<int:pk>/', NotificationView.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='notification-detail'),

    
]
