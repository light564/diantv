from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'DianTV.views.home', name='home'),
    # url(r'^DianTV/', include('DianTV.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
    url(r'^$', include('webpage.urls', namespace="webpage")),
    url(r'^blog/', include('blog.urls', namespace="blog")),
    url(r'^diantv/', include('webpage.urls', namespace="webpage")),
)
