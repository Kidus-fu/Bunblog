from rest_framework import serializers

class userserializers(serializers.Serializer):
    username = serializers.Serializer(read_only=True)