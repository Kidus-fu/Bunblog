from django.contrib import admin

from django.urls import path,include

from django.conf import settings

from django.conf.urls.static import static
from blog.views import signup,UserProfileView,UserSearch,UserProfileViewOwn
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/signup/",signup.as_view()),
    path("api/userprofile/",UserProfileViewOwn.as_view()),
    path("api/userprofile/search/",UserSearch.as_view()),
    path("api/userprofile/<str:user>/",UserProfileView.as_view()),
    path("api/userprofiles/",UserProfileView.as_view()),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("blog/",include("blog.urls"))
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
