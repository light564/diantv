# Create your views here.
# -*- coding=utf-8 -*-
import datetime

from django.http import HttpResponse

from django.utils import timezone

from models import DianTVBlog, DianTVNotice
from blog.function import ResponseJson, StrLen

def BlogToJson(blog):
	BlogJson = {
		"Author"		: 	blog.Author,
		"PublishData"	:	str(blog.PublishData),
		"Content"		:	blog.Content
	}
	return BlogJson

def NoticeToJson(blog):
	NoticeJson = {
		"Content"		:	blog.Content
	}
	return NoticeJson

def bloglist(request):
	"""
	check request
	"""
	print "---------------"
	print request.method
	print "---------------"

	if request.method != 'POST':
		return ResponseJson({'ErrorMessage' : "request method error"})

	if request.POST.get('number') == None:
		return ResponseJson({'ErrorMessage' : "No number"})

	blognum = request.POST.get('number')
	blognum = int(blognum)
	maxnum  = request.POST.get('maxnumber')
	if not maxnum:
		maxnum = 999
	maxnum = int(maxnum)

	#print len(request.META.get('REMOTE_ADDR').split('.')[2])
	# room = request.META.get('REMOTE_ADDR').split('.')[2]
	# if len(room) == 1:
	# 	room = "(70"+room+")"
	# if len(room) == 2:
	# 	room = "(7"+room+")"
	# if len(room) == 3:
	# 	room = "("+room+")"
	# print room

	AllBlog = DianTVBlog.objects.all()
	last = len(AllBlog)-1

	if(blognum > last) or (blognum > maxnum):
		return ResponseJson({'ErrorMessage' : "No more message"})
	response_info = BlogToJson(AllBlog[last - blognum])

	return ResponseJson(response_info)

def notice(request):
	"""
	check request
	"""

	if request.method != 'POST':
		return ResponseJson({'ErrorMessage' : "request method error"})

	if request.POST.get('number') == None:
		return ResponseJson({'ErrorMessage' : "No number"})

	noticenum = request.POST.get('number')
	noticenum = int(noticenum)

	AllNotice = DianTVNotice.objects.all()
	last = len(AllNotice)-1

	if(noticenum > last):
		return ResponseJson({'ErrorMessage' : "No more notice"})
	response_info = NoticeToJson(AllNotice[last - noticenum])

	return ResponseJson(response_info)


def publish(request):
	"""
	check request
	"""
	key = 0
	if request.method != 'POST':
		return ResponseJson({'ErrorMessage' : "request method error"})

	if request.POST.get('author') == None:
		return ResponseJson({'ErrorMessage' : "No author"})
	print request.POST.get('author')

	if request.POST.get('message') == None:
		return ResponseJson({'ErrorMessage' : "No message"})

	if request.POST.get('EIid') != None:
		key = 1
		#print "key : 1"

	author = request.POST.get('author')
	message = request.POST.get('message')

	if len(author) > 15:
		return ResponseJson({'ErrorMessage' : "author is too long"})
	if len(author) == 0:
		return ResponseJson({'ErrorMessage' : "author is empty"})
	if len(message) > 140:
		return ResponseJson({'ErrorMessage' : "message is too long"})
	if len(message) == 0:
		return ResponseJson({'ErrorMessage' : "message is empty"})

	if key == 0:
		room = request.META.get('REMOTE_ADDR').split('.')[2]
		if len(room) == 1:
			author = author + "(70"+room+")"
		if len(room) == 2:
			author = author + "(7"+room+")"
		if len(room) == 3:
			author = author + "("+room+")"

		blog = DianTVBlog(Author = author,
						Content = message,
						PublishData = datetime.datetime.now(),
						EIid = ""
				)
		blog.save()

	if key == 1:
		author = author + "(from eistart)"
		blog = DianTVBlog(Author = author,
						Content = message,
						PublishData = request.POST.get('time'),
						EIid = request.POST.get('EIid')
					)

		blog.save()
	#print "author: " + author + " message: " + message
	return ResponseJson({'Message' : "Publish Success"})

def PublishNotice(request):
	"""
	check request
	"""
	if request.method != 'POST':
		return ResponseJson({'ErrorMessage' : "request method error"})

	if request.POST.get('message') == None:
		return ResponseJson({'ErrorMessage' : "No message"})

	message = request.POST.get('message')
	password = request.POST.get('password')
	other = request.POST.get('other')

	if password != "diangroup" :
		return ResponseJson({'Message' : "Published Success"})

	if len(message) > 15 and other != "force" :
		return ResponseJson({'ErrorMessage' : "message is too long"})

	#print message

	notice = DianTVNotice(Content = message)
	notice.save()
	#print "message: " + message
	return ResponseJson({'Message' : "Publish Success"})
