#!/usr/bin/python
#-*- coding:utf-8 -*-

from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render_to_response
from django.contrib.auth.decorators import permission_required
from django.template import RequestContext
from django.conf import settings
from django.db import models, transaction
from django.core.exceptions import MultipleObjectsReturned
from django.core.paginator import Paginator
from django.forms.models import model_to_dict
from django.core.context_processors import csrf
from models import fanqian_record
import datetime, json
from django.views.decorators.csrf import csrf_exempt #for ajax

name_map = {'p1':'小榕','p2':'大波','p3':'JQ','p4':'FYZ','p5':'other'}

def JsonResponse(params):
    json_res = json.dumps(params)
    return HttpResponse(json_res)

def Context_Param(request, params):
    params = RequestContext(request, params)
    params.update(csrf(request))
    return params

# Create your views here.
def fanqian(request,template_name='fanqian.html'):
    res = {}
    return render_to_response(template_name,Context_Param(request,res))

@csrf_exempt 
def save_day(request):
    if request.method == 'POST':
        today = request.POST.dict()
        people = today.get("people", "")
        name = people.split(' ')
        avg_cost = float(today.get("avg_cost", 0))
        time = datetime.date.today()
        global name_map
        for item in name:
            if item != "":
                new_record = fanqian_record()
                new_record.Name = name_map[item]
                new_record.cost = avg_cost
                new_record.effect_time = time
                new_record.save()
        msg = 'ok'
        return JsonResponse({'msg' : msg})
    else:
        msg = 'NONONO'
        return JsonResponse({'msg' : msg})
