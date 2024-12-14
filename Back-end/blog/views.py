from django.contrib.auth.models import User
from rest_framework import mixins, viewsets,generics
from rest_framework.response import Response
from .models import Post, PostComment, Like, Category, Tag, UserProfile, PostView, Notification
from .serializers import PostSerializer, PostCommentSerializer, LikeSerializer, CategorySerializer, TagSerializer, UserProfileSerializer, SignUpSerializer, NotificationSerializer
from rest_framework import status
from rest_framework.views import APIView

from rest_framework.permissions import IsAuthenticated,IsAuthenticatedOrReadOnly

from rest_framework_simplejwt.authentication import JWTAuthentication

from . import client,clientuserprofileo
from .usermixin import UserFilterMixin , UserFilterMixinOut ,UserprofileMicin
from rest_framework.generics import CreateAPIView
#post search 

from rest_framework.viewsets import ModelViewSet


class PostSearch(generics.GenericAPIView):
    def get(self, request, *args, **kwargs):
        # Get the query and tags from the request
        query = request.GET.get("q", "")
        tags = request.GET.getlist("tag")  # Support multiple tags

        # Ensure at least one of query or tags is provided
        if not query and not tags:
            return Response({"error": "Provide at least a query or tags"}, status=400)

        # Perform the search
        results = client.preform_search(query, tags=tags)

        # Return the results or handle no matches
        if not results.get("hits"):
            return Response({"message": "No results found"}, status=404)

        return Response(results, status=200)

class UserSearch(generics.GenericAPIView):
    def get(self,request,*args, **kwargs):
        query = request.GET.get("q")
        if not query:
            return Response("",status=400)
        results = clientuserprofileo.preform_search(query)
        return Response(results,status=200)

# Post View
class PostView(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    mixins.CreateModelMixin,
    UserFilterMixinOut,
    generics.GenericAPIView
):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Post.objects.all().order_by('-pk')
    serializer_class = PostSerializer
    lookup_field = "pk"

    def get(self,request,*args,**kwargs):

        pk = kwargs.get("pk")
        if pk is None:
            return self.list(request,*args,**kwargs)
        return self.retrieve(request,*args,**kwargs)
    def post(self,request,*args,**kwargs):
        return self.create(request,*args,**kwargs)
    def destroy(self,request,*args,**kwargs):
        return self.destroy(request,*args,**kwargs)
    def update(self, request, *args, **kwargs):
        return self.update(request,*args,**kwargs)
class PostViewUser(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    UserFilterMixin,
    mixins.CreateModelMixin,
    generics.GenericAPIView
):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Post.objects.all().order_by('-pk')
    serializer_class = PostSerializer
    lookup_field = "pk"

    
    def get(self,request,*args,**kwargs):

        pk = kwargs.get("pk")
        if pk is None:
            return self.list(request,*args,**kwargs)
        return self.list(request,*args,**kwargs)
    def post(self,request,*args,**kwargs):
        return self.create(request,*args,**kwargs)
    def destroy(self,request,*args,**kwargs):
        return self.destroy(request,*args,**kwargs)
    def update(self, request, *args, **kwargs):
        return self.update(request,*args,**kwargs)


# PostComment View
class PostCommentView(mixins.ListModelMixin,
                      mixins.CreateModelMixin,
                      mixins.RetrieveModelMixin,
                      mixins.UpdateModelMixin,
                      mixins.DestroyModelMixin,
                      generics.GenericAPIView):
    queryset = PostComment.objects.all()
    serializer_class = PostCommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
        

    def get(self,request,*args,**kwargs):
        pk = kwargs.get("pk")
        if pk is None:
            return self.list(request,*args,**kwargs)
        return self.list(request,*args,**kwargs)
    def post(self,request,*args,**kwargs):
        print(request.data)
        return self.create(request,*args,**kwargs)
    def destroy(self,request,*args,**kwargs):
        return self.destroy(request,*args,**kwargs)
    def update(self, request, *args, **kwargs):
        return self.update(request,*args,**kwargs)
    
    


class LikeView(ModelViewSet):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer

    def perform_create(self, serializer):
        # Automatically set the user during creation
        serializer.save(user=self.request.user)


# Category View
class CategoryView(mixins.ListModelMixin,
                   mixins.CreateModelMixin,
                   mixins.RetrieveModelMixin,
                   mixins.UpdateModelMixin,
                   mixins.DestroyModelMixin,
                   viewsets.GenericViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


# Tag View
class TagView(mixins.ListModelMixin,
              mixins.CreateModelMixin,
              mixins.RetrieveModelMixin,
              mixins.UpdateModelMixin,
              mixins.DestroyModelMixin,
              viewsets.GenericViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Tag.objects.all()
    serializer_class = TagSerializer


class UserProfileViewOwn(mixins.ListModelMixin,
                      mixins.CreateModelMixin,
                      mixins.RetrieveModelMixin,
                      mixins.UpdateModelMixin,
                      UserFilterMixin,
                      mixins.DestroyModelMixin,
                      generics.GenericAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = UserProfile.objects.all().order_by("-pk")
    serializer_class = UserProfileSerializer
    lookup_field = "user"

    def get(self, request, *args, **kwargs):
        pk = kwargs.get("user")
        if pk is None:
            return self.list(request, *args, **kwargs)
        return self.retrieve(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        request.data['user'] = request.user.id  
        return self.create(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        if request.user.id != kwargs['pk']:
            return Response({"detail": "You can only update your own profile."}, status=403)

class UserProfileView(mixins.ListModelMixin,
                      mixins.CreateModelMixin,
                      mixins.RetrieveModelMixin,
                      mixins.UpdateModelMixin,
                      UserprofileMicin,
                      mixins.DestroyModelMixin,
                      generics.GenericAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = UserProfile.objects.all().order_by("-pk")
    serializer_class = UserProfileSerializer
    lookup_field = "user"

    def get(self, request, *args, **kwargs):
        pk = kwargs.get("user")
        if pk is None:
            return self.list(request, *args, **kwargs)
        return self.retrieve(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        request.data['user'] = request.user.id  
        return self.create(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        if request.user.id != kwargs['pk']:
            return Response({"detail": "You can only update your own profile."}, status=403)

        return self.update(request, *args, **kwargs)
class UserProfileViewLoginUser(mixins.ListModelMixin,
                      mixins.CreateModelMixin,
                      mixins.RetrieveModelMixin,
                      UserFilterMixin,
                      mixins.UpdateModelMixin,
                      mixins.DestroyModelMixin,
                      generics.GenericAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    lookup_field = "user"

    def get(self, request, *args, **kwargs):
        pk = kwargs.get("user")
        if pk is None:
            return self.list(request, *args, **kwargs)
        return self.retrieve(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        request.data['user'] = request.user.id  
        return self.create(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        if request.user.id != kwargs['pk']:
            return Response({"detail": "You can only update your own profile."}, status=403)

        return self.update(request, *args, **kwargs)

# Notification View
class NotificationView(mixins.ListModelMixin,
                       mixins.CreateModelMixin,
                       mixins.UpdateModelMixin,
                       mixins.DestroyModelMixin,
                       viewsets.GenericViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer

    def get_queryset(self):
        """
        Optionally restricts the queryset to a user's notifications,
        by filtering against a `user` query parameter in the URL.
        """
        queryset = Notification.objects.all()
        user = self.request.query_params.get('user', None)
        if user is not None:
            queryset = queryset.filter(user__id=user)
        return queryset

class signup(APIView):
    def post(self, request, *args, **kwargs):
        serializer = SignUpSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "User registered successfully", "data": serializer.data},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)