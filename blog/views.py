# Create your views here.
from django.http import HttpResponse

from django.utils import timezone

from models import DianTVBlog
from blog.function import ResponseJson

def BlogToJson(blog):
	BlogJson = {
		"Author"		: 	blog.Author,
		"PublishData"	:	str(blog.PublishData),
		"Content"		:	blog.Content
	}
	return BlogJson

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


	AllBlog = DianTVBlog.objects.all()
	last = len(AllBlog)-1

	if(blognum > last):
		return ResponseJson({'ErrorMessage' : "No more message"})
	response_info = BlogToJson(AllBlog[last - blognum])

	return ResponseJson(response_info)

def publish(request):
	"""
	check request
	"""
	if request.method != 'POST':
		return ResponseJson({'ErrorMessage' : "request method error"})

	if request.POST.get('author') == None:
		return ResponseJson({'ErrorMessage' : "No author"})

	if request.POST.get('message') == None:
		return ResponseJson({'ErrorMessage' : "No message"})

	author = request.POST.get('author')
	message = request.POST.get('message')
	blog = DianTVBlog(Author = author,
					Content = message,
					PublishData = timezone.now()
			)
	blog.save()
	print "author: " + author + " message: " + message
	return ResponseJson({'Message' : "Publish Success"})