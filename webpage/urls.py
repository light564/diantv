from django.conf.urls import patterns, url
from webpage import views

urlpatterns = patterns('',
    url(r'^show/', views.show, name='showpage'),
    url(r'^mobile/', views.mobile, name='mobilepage'),
    url(r'^$', views.client, name='clientpage'),#in computer
)
