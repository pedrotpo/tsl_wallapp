import environ
import os
from pathlib import Path
from datetime import timedelta

# .env file import
env = environ.Env(DEBUG=(bool, False))

BASE_DIR = Path(__file__).resolve().parent.parent

# Take environment variables from .env file
environ.Env.read_env(os.path.join(BASE_DIR, ".env"))

SECRET_KEY = env("SECRET_KEY")

DEBUG = env("DEBUG")

ALLOWED_HOSTS = []

# Application definition

INSTALLED_APPS = [
    "django.contrib.admin", "django.contrib.auth",
    "django.contrib.contenttypes", "django.contrib.sessions",
    "django.contrib.messages", "django.contrib.staticfiles", "rest_framework",
    "rest_framework_simplejwt", "corsheaders", "posts", "users"
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "api.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS":
            {
                "context_processors":
                    [
                        "django.template.context_processors.debug",
                        "django.template.context_processors.request",
                        "django.contrib.auth.context_processors.auth",
                        "django.contrib.messages.context_processors.messages",
                    ],
            },
    },
]

WSGI_APPLICATION = "api.wsgi.application"

# Permissions

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES':
        ['rest_framework.permissions.IsAuthenticatedOrReadOnly', ],
    'DEFAULT_AUTHENTICATION_CLASSES':
        ('rest_framework_simplejwt.authentication.JWTAuthentication', )
}

CORS_ALLOWED_ORIGINS = ["http://127.0.0.1:3000", "http://localhost:3000"]

# Users
AUTH_USER_MODEL = "users.CustomUser"

# Database

DATABASES = {
    "default":
        {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": BASE_DIR / "db.sqlite3",
        }
}

# Password validation

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME":
            "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME":
            "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME":
            "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME":
            "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

# JWT Settings

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME':
        timedelta(minutes=5),
    'REFRESH_TOKEN_LIFETIME':
        timedelta(days=1),
    'ROTATE_REFRESH_TOKENS':
        False,
    'BLACKLIST_AFTER_ROTATION':
        False,
    'UPDATE_LAST_LOGIN':
        False,
    'ALGORITHM':
        'HS256',
    'SIGNING_KEY':
        SECRET_KEY,
    'VERIFYING_KEY':
        None,
    'AUDIENCE':
        None,
    'ISSUER':
        None,
    'JWK_URL':
        None,
    'LEEWAY':
        0,
    'AUTH_HEADER_TYPES': ('Bearer', 'JWT'),
    'AUTH_HEADER_NAME':
        'HTTP_AUTHORIZATION',
    'USER_ID_FIELD':
        'id',
    'USER_ID_CLAIM':
        'user_id',
    'USER_AUTHENTICATION_RULE':
        'rest_framework_simplejwt.authentication.default_user_authentication_rule',
    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken', ),
    'TOKEN_TYPE_CLAIM':
        'token_type',
    'JTI_CLAIM':
        'jti',
    'SLIDING_TOKEN_REFRESH_EXP_CLAIM':
        'refresh_exp',
    'SLIDING_TOKEN_LIFETIME':
        timedelta(minutes=5),
    'SLIDING_TOKEN_REFRESH_LIFETIME':
        timedelta(days=1),
}

# Internationalization

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_L10N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)

STATIC_URL = "/static/"

# Default primary key field type

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
