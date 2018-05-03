from django.db import models
import datetime
import uuid


class Consent(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    userid = models.UUIDField()
    category = models.CharField(max_length=255)
    value = models.BooleanField()
    created_at = models.DateTimeField(default=datetime.datetime.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = (
            ('userid', 'category')
        )

class Category(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    label = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    default = models.BooleanField(default=False)
