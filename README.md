fanqian
=======

饭钱～
系统    : ubuntu12.04
python  : 2.7.3
django  : 1.6.2
>>> print django.VERSION
(1, 6, 2, 'final', 0)

数据库  : Mysql


使用：
首先把以上都配置完了后，根据自己的sql来修改fanqian/setting.py里的配置信息
'''
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',    # Add 'postgresql_psycopg2', 'mysql', 'sqlite3' or 'oracle'.
        'NAME': 'fanqian',    # Or path to database file if using sqlite3.
        # The following settings are not used with sqlite3:
        'USER': 'root',
        'PASSWORD': '******',
        'HOST': '',    # Empty for localhost through domain sockets or '127.0.0.1' for localhost through TCP.
        'PORT': '3306',    # Set to empty string for default.
    }
}
'''
然后在主目录下运行python manage.py syncdb自动生成数据表(库要自己建)；
完成以前准备后，运行python manage.py runserver 测试运行项目，默认端口8000。在浏览器里打localhost:8000/suanqian 可以看到页面

django简要使用说明
webapps/suanqian这个文件里面：
urls.py:    控制url的规则
views.py:   控制各个url的功能
model.py:   设计数据库

templates：
html文件

static：
js,css,img等文件
