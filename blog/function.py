import json

from django.http import HttpResponse

def ResponseJson(data):
	return HttpResponse(json.dumps(data), mimetype="application/json")

def StrLen(str):
	if len(str) == 0:
		return 0
	len_str = len(str)
	utf8_len = len(str.encode('UTF-8'))
	return (utf8_len - len_str)/2 + len_str 
