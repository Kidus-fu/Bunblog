from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import Post, UserProfile

# Automatically reindex the Post instance when it is created or updated
@receiver(post_save, sender=Post)
def reindex_post(sender, instance, **kwargs):
    """
    Triggered after saving a Post instance.
    Reindexes the Post instance in Algolia.
    """
    instance.indexing.save()

# Automatically remove the Post instance from Algolia when it is deleted
@receiver(post_delete, sender=Post)
def delete_from_algolia_post(sender, instance, **kwargs):
    """
    Triggered after deleting a Post instance.
    Removes the Post instance from Algolia.
    """
    instance.indexing.delete()

# Automatically reindex the UserProfile instance when it is created or updated
@receiver(post_save, sender=UserProfile)
def reindex_userprofile(sender, instance, **kwargs):
    """
    Triggered after saving a UserProfile instance.
    Reindexes the UserProfile instance in Algolia.
    """
    instance.indexing.save()

# Automatically remove the UserProfile instance from Algolia when it is deleted
@receiver(post_delete, sender=UserProfile)
def delete_from_algolia_userprofile(sender, instance, **kwargs):
    """
    Triggered after deleting a UserProfile instance.
    Removes the UserProfile instance from Algolia.
    """
    instance.indexing.delete()
