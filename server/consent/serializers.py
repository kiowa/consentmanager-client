from rest_framework import serializers
from .models import Consent, Category


class ConsentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consent
        fields = ('id', 'userid', 'category', 'value')


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category 
        fields = ('name', 'label', 'description', 'default')

