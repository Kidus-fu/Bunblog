from django.db import models
from django.contrib.auth.models import User
from django.core.serializers import serialize
from json import dumps

# UserProfile Model (Extended User)
class UserProfile(models.Model):
    user = models.OneToOneField(User, related_name='profile', on_delete=models.CASCADE)
    bio = models.TextField(blank=True, null=True)
    profile_picture = models.ImageField(upload_to='profile_pics/', blank=True, null=True)
    birthdate = models.DateField(null=True, blank=True)
    ig = models.URLField(blank=True, null=True)  # Instagram URL
    x = models.URLField(blank=True, null=True)  # Twitter (or X) URL
    public = models.BooleanField(default=True)

    # New Fields
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    address_line1 = models.CharField(max_length=255, blank=True, null=True)
    address_line2 = models.CharField(max_length=255, blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    state = models.CharField(max_length=100, blank=True, null=True)
    postal_code = models.CharField(max_length=20, blank=True, null=True)
    country = models.CharField(max_length=100, blank=True, null=True)
    website = models.URLField(blank=True, null=True)

    # Methods
    def get_posts(self):
        posts = Post.objects.filter(user=self.user).values('id', 'description', 'created_at', 'updated_at', 'image', 'header' )
        return list(posts)
    def get_liked_posts(self):
         """
         Returns a queryset of posts that the user has liked.
        """
         liked_posts = Post.objects.filter(likes__user=self.user).values('id', 'header', 'description', 'image', 'created_at')
         return list(liked_posts)

    def get_fristname(self):
        return self.user.first_name
    def get_lastname(self):
        return self.user.last_name
        
    def get_comments(self):
        return PostComment.objects.filter(post__user=self.user).count()

    def get_likes(self):
        return Like.objects.filter(post__user=self.user).count()

    def get_joinDate(self):
        return self.user.date_joined

    def get_userpost(self):
        return self.user.posts.count()

    def get_is_public(self):
        return self.public

    def __str__(self):
        return self.user.username

    
# Post Model
class Post(models.Model):
    userprofile = models.ForeignKey(UserProfile,related_name="post",on_delete=models.CASCADE,blank=True,null=True)
    user = models.ForeignKey(User, related_name="posts", on_delete=models.CASCADE)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    image = models.ImageField(upload_to="PostImages/", blank=True, null=True)
    header = models.CharField(max_length=50)
    categories = models.ManyToManyField('Category', related_name='posts', blank=True)  # Many-to-many with Category
    tags = models.ManyToManyField('Tag', related_name='posts', blank=True)  # Many-to-many with Tag
    public = models.BooleanField(default=True)
    def __str__(self):
        return self.header
    def get_is_public(self):
        return self.public
    def get_tags(self):
        tagsall = [ tag.name for tag in self.tags.all() ]

        return tagsall
    def get_total_likes(self):
        return self.likes.count()
    def get_likeinfo(self):
        """
        Get information about users who liked this post.
        Returns a list of dictionaries containing user info for each like.
        """
        return [
            {   "like_id":like.id,
                "user_id": like.user.id,
                "username": like.user.username,
                "profile": like.user.userprofile.profile_picture.url if hasattr(like.user, "userprofile") else None
            }
            for like in self.likes.all()
        ]

    def get_total_comments(self):
        return self.comments.count()

# PostComment Model
class PostComment(models.Model):
    
    user = models.ForeignKey(User, related_name="post_comments", on_delete=models.CASCADE)
    post = models.ForeignKey(Post, related_name="comments", on_delete=models.CASCADE)
    comment = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username}: {self.comment}"

# Like Model
class Like(models.Model):
    post = models.ForeignKey(Post, related_name="likes", on_delete=models.CASCADE)
    user = models.ForeignKey(User, related_name="likes", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} liked {self.post.header}"

# Category Model
class Category(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name

# Tag Model
class Tag(models.Model):
    name = models.CharField(max_length=30, unique=True)

    def __str__(self):
        return self.name



# Post View Model
class PostView(models.Model):
    post = models.ForeignKey(Post, related_name="views", on_delete=models.CASCADE)
    user = models.ForeignKey(User, related_name="views", on_delete=models.CASCADE)
    viewed_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} viewed {self.post.header}"

# Notification Model
class Notification(models.Model):
    user = models.ForeignKey(User, related_name="notifications", on_delete=models.CASCADE)
    message = models.CharField(max_length=255)
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Notification for {self.user.username}"

    def mark_as_read(self):
        self.is_read = True
        self.save()