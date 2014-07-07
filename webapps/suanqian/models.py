#!/usr/bin/python
#-*- coding:utf-8 -*-
from django.db import models
import datetime

# Create your models here.

class fanqian_record(models.Model):
    id = models.AutoField(max_length=20, primary_key=True, db_column='id')
    Name = models.CharField(max_length=64, db_column='name',default="")
    cost = models.FloatField(db_column='cost', default=0)
    effect_time = models.DateTimeField(db_column='time', default="")

    created_at = models.DateTimeField(auto_now_add=True, db_column='created_at')
    updated_at = models.DateTimeField(auto_now=True, db_column='updated_at')

    class Meta:
        db_table = "fanqian_record"
