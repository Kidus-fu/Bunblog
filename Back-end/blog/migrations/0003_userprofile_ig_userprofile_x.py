# Generated by Django 5.1.3 on 2024-12-07 18:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0002_remove_postcomment_feel'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='ig',
            field=models.URLField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='x',
            field=models.URLField(blank=True, null=True),
        ),
    ]