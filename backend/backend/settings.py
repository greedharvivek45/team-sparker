import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = 'django-insecure-9*+h)y*_**c2v^vn1930(k^)&a%apy9$tg92j-s7)1!ngcnux+'

DEBUG = True

ALLOWED_HOSTS = ['*']


# 🔥 INSTALLED APPS
INSTALLED_APPS = [
    'corsheaders',  # 🔥 MUST be first

    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'rest_framework',
    'api',
]


# 🔥 MIDDLEWARE (ORDER VERY IMPORTANT)
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',   # 🔥 MUST FIRST

    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',

    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]


ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'


# 🔥 DATABASE
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# 🔥 PASSWORD VALIDATION
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]


# 🔥 INTERNATIONAL
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True


# 🔥 FILE SIZE
DATA_UPLOAD_MAX_MEMORY_SIZE = 10485760
FILE_UPLOAD_MAX_MEMORY_SIZE = 10485760


# 🔥 STATIC & MEDIA
STATIC_URL = 'static/'

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')


# =========================
# 🔥🔥🔥 CORS FINAL FIX
# =========================

CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_HEADERS = ['*']
CORS_ALLOW_METHODS = ['*']

# =========================
# 🔥 CSRF FIX (OPTIONAL)
# =========================

CSRF_TRUSTED_ORIGINS = [
    "https://*.onrender.com",
    "http://localhost:3000",
]


# =========================
# DEFAULT
# =========================

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'