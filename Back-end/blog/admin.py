from django.contrib import admin

from .  import models

admin.site.register(models.Post)
admin.site.register(models.PostComment)
admin.site.register(models.Like)
admin.site.register(models.Category)
admin.site.register(models.Tag)
admin.site.register(models.UserProfile)
admin.site.register(models.PostView)
admin.site.register(models.Notification)