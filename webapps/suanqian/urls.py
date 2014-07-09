#!/usr/bin/python
#-*- coding:utf-8 -*-
from django.conf import settings
from django.conf.urls import patterns, include, url
#from django.conf.urls.defaults import url, patterns

urlpatterns = patterns('',
    url(r'^$', 'suanqian.views.fanqian', name='fanqian'),
    url(r'^save_day$', 'suanqian.views.save_day', name='save_day'),
    url(r'^show_data$', 'suanqian.views.show_data', name='show_data'),
    url(r'^jkq$', 'suanqian.views.jkq', name='jkq'),
)
