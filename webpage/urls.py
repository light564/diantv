from django.conf.urls import patterns, url
from webpage import views

urlpatterns = patterns('',
    url(r'^show/', views.show, name='showpage'),
    url(r'^client/', views.client, name='clientpage'),#in computer
)