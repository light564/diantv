# Create your views here.
# -*- coding: utf-8 -*-
from django.http import HttpResponse,  HttpRequest
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

from django.shortcuts import render, get_object_or_404

def show(request):
	filename = "DianTv_ShowPage.html"
	filepath = filepath = "webpage/"+filename
	return render(request, filepath)

def client(request):
	filename = "DianTv_ClientPage.html"
	filepath = filepath = "webpage/"+filename
	return render(request, filepath)

def mobile(request):
	filename = "DianTv_MobilePage.html"
	filepath = filepath = "webpage/"+filename
	return render(request, filepath)