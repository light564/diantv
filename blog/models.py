from django.db import models

# Create your models here.
class DianTVBlog(models.Model):
	Author = models.CharField(max_length = 50)
	PublishData = models.DateTimeField('date published')
	Content = models.TextField()
	EIid = models.CharField(max_length = 20)

class DianTVNotice(models.Model):
	Content = models.TextField()