from django.test import TestCase
from rest_framework.test import APIClient
from .models import Consent, Tag
import uuid

class ConsentTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_should_create_consent(self):
        userid = uuid.uuid4()
        self.client.post('/consent/',
                         {'userid': userid, 'tag': 'newsletter', 'value': True},
                         format='json')
        consent = Consent.objects.get(userid=userid, tag='newsletter')
        self.assertTrue(consent.value)

    def test_should_update_consent(self):
        userid = uuid.uuid4()
        consent = Consent(userid=userid,
                          tag='flarp',
                          value=False)
        consent.save()
        self.client.put('/consent/' + str(consent.pk) + '/',
                          {'userid': userid, 'tag': 'flarp', 'value': True},
                          format='json')
        consent = Consent.objects.get(id=consent.id)
        self.assertTrue(consent.value)

    def test_should_list_consents(self):
        userid = uuid.uuid4()
        consent = Consent(userid=userid,
                          tag='newsletter',
                          value=True)
        consent.save()
        response = self.client.get('/consent/?userid='+str(userid))
        consents = response.json()
        self.assertEqual(consents[0]['userid'], str(userid))


class TagTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_should_list_tags(self):
        tag = Tag(name='newsletter', label='Newsletter')
        tag.save()
        response = self.client.get('/tag/')
        tags = response.json()
        self.assertEqual(tags[0]['name'], tag.name)
