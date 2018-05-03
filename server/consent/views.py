from django.shortcuts import render
from .serializers import ConsentSerializer, CategorySerializer
from rest_framework import generics
from .models import Consent, Category


class ConsentListCreateView(generics.ListCreateAPIView):
    queryset = Consent.objects.all()
    serializer_class = ConsentSerializer

    def get_queryset(self):
        userid = self.request.query_params.get('userid')
        return self.queryset.filter(userid=userid)


class ConsentUpdateView(generics.UpdateAPIView):
    queryset = Consent.objects.all()
    serializer_class = ConsentSerializer


class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer 

