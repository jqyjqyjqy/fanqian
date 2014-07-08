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

name_map = {'p1':'小榕','p2':'大波','p3':'JQ','p4':'FYZ','p5':'蹭饭者'}

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
        other_sum = int(today.get("other_sum", 0))
        time = datetime.date.today()
        global name_map
        for item in name:
            if item != "":
                if item == "p5":
                    for i in range(other_sum):
                        new_record = fanqian_record()
                        new_record.Name = name_map[item]
                        new_record.cost = avg_cost
                        new_record.effect_time = time
                        new_record.save()
                else:
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

def show_data(request, template_name='show_data.html'):
    if request.method == 'POST':
        info = request.POST.dict()
        year = info.get('year', "")
        month = info.get('month', "")
        day = info.get('day', "")
        if mouth == "" and day == "":
            date_list = fanqian_record.objects.filter(effect_time__year=year)
        elif day == "":
            date_list = fanqian_record.objects.filter(effect_time__year=year, effect_time__month=month)
        else:
            date_list = fanqian_record.objects.filter(effect_time__year=year, effect_time__month=month, effect_time__day=day)
        c1 = 0
        c2 = 0
        c3 = 0
        c4 = 0
        c5 = 0
        for item in date_list:
            if item.Name == u'小榕':
                c1 += item.cost
            if item.Name == u'大波':
                c2 += item.cost
            if item.Name == u'JQ':
                c3 += item.cost
            if item.Name == u'FYZ':
                c4 += item.cost
            if item.Name == u'蹭饭者':
                c5 += item.cost
        tot = [{'name':u'小榕', 'cost':c1}, {'name':u'大波', 'cost':c2}, {'name':u'JQ', 'cost':c3}, {'name':u'FYZ', 'cost':c4}, {'name':u'蹭饭者', 'cost':c5}]
        return JsonResponse({'msg' : msg, 'tot' : tot})
    else:
        date_list = fanqian_record.objects.filter(effect_time__day='8')
        c1 = 0
        c2 = 0
        c3 = 0
        c4 = 0
        c5 = 0
        for item in date_list:
            if item.Name == u'小榕':
                c1 += item.cost
            if item.Name == u'大波':
                c2 += item.cost
            if item.Name == u'JQ':
                c3 += item.cost
            if item.Name == u'FYZ':
                c4 += item.cost
            if item.Name == u'蹭饭者':
                c5 += item.cost
        tot = [{'name':u'小榕', 'cost':c1}, {'name':u'大波', 'cost':c2}, {'name':u'JQ', 'cost':c3}, {'name':u'FYZ', 'cost':c4}, {'name':u'蹭饭者', 'cost':c5}]
        msg = 'hehe'
        res = {'msg' : msg, 'tot' : tot}
        return render_to_response(template_name,Context_Param(request,res))
