from django.conf.urls import patterns, url
from blog import views

urlpatterns = patterns('',
    url(r'^bloglist/$', views.bloglist, name='bloglist'),
    url(r'^publish/$', views.publish, name='publish'),
)