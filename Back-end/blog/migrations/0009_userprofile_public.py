# Generated by Django 4.2.5 on 2024-12-09 19:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0008_post_public'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='public',
            field=models.BooleanField(default=True),
        ),
    ]
