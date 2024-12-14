from rest_framework import serializers
from .models import Post, PostComment, Like, Category, Tag, UserProfile, PostView, Notification
from django.contrib.auth.models import User



# Post Serializer
from django.conf import settings
from django.templatetags.static import static

class PostSerializer(serializers.ModelSerializer):
    userid = serializers.SerializerMethodField(read_only=True)
    username = serializers.SerializerMethodField(read_only=True)
    profile_picture = serializers.SerializerMethodField(read_only=True)  # Custom method to get the profile picture
    postuseremail = serializers.SerializerMethodField(read_only=True)
    categories = serializers.StringRelatedField(many=True, read_only=True)
    tags = serializers.StringRelatedField(many=True, read_only=True)
    total_likes = serializers.SerializerMethodField()
    likeinfo = serializers.SerializerMethodField()
    total_comments = serializers.SerializerMethodField()
    url = serializers.HyperlinkedIdentityField(
        view_name="post-detail",
        lookup_field="pk"
    )

    class Meta:
        model = Post
        fields = [
            'id', 'username', 'userid', 'description', 'created_at', 'updated_at', 
            'image', 'header', 'categories', 'tags', 'total_likes', 'total_comments', 
            "url", "userprofile", "profile_picture", "postuseremail","likeinfo"
        ]
    def get_likeinfo(self,obj):
        return obj.get_likeinfo()
    def get_postuseremail(self, obj):
        return obj.user.email

    def get_profile_picture(self, obj):
        # Ensure that the profile picture is returned correctly as a URL
        if obj.userprofile and obj.userprofile.profile_picture:
            return obj.userprofile.profile_picture.url  # This should return the media URL for the image
        return None  # If no profile picture is found, return None

    def get_total_likes(self, obj):
        return obj.get_total_likes()

    def get_total_comments(self, obj):
        return obj.get_total_comments()

    def create(self, validated_data):
        if 'user' not in validated_data:
            validated_data['user'] = self.context['request'].user
        return super().create(validated_data)

    def get_username(self, obj):
        return obj.user.username

    def get_userid(self, obj):
        return obj.user.id


    
# PostComment Serializer
class PostCommentSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    post = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = PostComment
        fields = ['id', 'user', 'post', 'comment', 'created_at']
    def create(self, validated_data):
       if 'user' not in validated_data:
            validated_data['user'] = self.context['request'].user  
       return super().create(validated_data)

class LikeSerializer(serializers.ModelSerializer):
    post = serializers.PrimaryKeyRelatedField(queryset=Post.objects.all())  # Allow setting the post field
    user = serializers.StringRelatedField(read_only=True)  # Keep the user as read-only

    class Meta:
        model = Like
        fields = ['id', 'post', 'user', 'created_at']

    def create(self, validated_data):
        # Automatically set the user from the request
        validated_data['user'] = self.context['request'].user  
        return super().create(validated_data)


# Category Serializer
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'description']


# Tag Serializer
class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']


class UserProfileSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField(read_only = True)
    email = serializers.SerializerMethodField(read_only=True)
    postcount = serializers.SerializerMethodField(read_only=True)
    join_date = serializers.SerializerMethodField(read_only=True)
    comments = serializers.SerializerMethodField(read_only=True)
    likes = serializers.SerializerMethodField(read_only=True)
    fristname = serializers.SerializerMethodField(read_only=True)
    lastname = serializers.SerializerMethodField(read_only=True)
    posts = serializers.SerializerMethodField(read_only=True)
    liked_posts = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = UserProfile
        fields = ['id', 'user', 'bio', 'profile_picture', 'birthdate','ig','x','email',"postcount","join_date","comments","likes","phone_number","address_line1","address_line2","city","state","postal_code","country","website","lastname","fristname","posts","liked_posts"]

    def create(self, validated_data):
        if 'user' not in validated_data:
            validated_data['user'] = self.context['request'].user  
        return super().create(validated_data)
    def get_liked_posts(self,obj):
        return obj.get_liked_posts()
    def get_posts(self,obj):
        return obj.get_posts()
    def get_fristname(self,obj):
        return obj.get_fristname()
    def get_lastname(self,obj):
        return obj.get_lastname()
    
    def get_comments(self,obj):
        return obj.get_comments()
    def get_likes(self,obj):
        return obj.get_likes()
    def get_join_date(self,obj):
        return obj.get_joinDate()
    def get_user(self,obj):
        return obj.user.username
    def get_email(self,obj):
        return obj.user.email
    def get_postcount(self,obj):
        return obj.get_userpost()


# PostView Serializer
class PostViewSerializer(serializers.ModelSerializer):
    post = serializers.StringRelatedField(read_only=True)
    user = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = PostView
        fields = ['id', 'post', 'user', 'viewed_at']
    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user  
        return super().create(validated_data)

# Notification Serializer
class NotificationSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Notification
        fields = ['id', 'user', 'message', 'is_read', 'created_at']

    def update(self, instance, validated_data):
        instance.is_read = validated_data.get('is_read', instance.is_read)
        instance.save()
        return instance


class SignUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "email", "password", "first_name", "last_name"]
        extra_kwargs = {
            "password": {"write_only": True},  # Ensure the password is write-only
        }

    def create(self, validated_data):
        # Use the `get` method to handle missing fields with default values
        first_name = validated_data.get("first_name", "")
        last_name = validated_data.get("last_name", "")

        user = User(
            email=validated_data["email"],
            username=validated_data["username"],
            first_name=first_name,
            last_name=last_name,
        )
        user.set_password(validated_data["password"])  # Set the password securely
        user.save()
        return user

