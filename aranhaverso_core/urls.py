from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    
    # Rotas Visuais (Menu)
    path('', TemplateView.as_view(template_name='index.html'), name='home'),
    path('uniformes/', TemplateView.as_view(template_name='uniformes.html'), name='uniformes'),
    path('viloes/', TemplateView.as_view(template_name='viloes.html'), name='viloes'),
    path('poderes/', TemplateView.as_view(template_name='poderes.html'), name='poderes'),
    path('confrontos/', TemplateView.as_view(template_name='confrontos.html'), name='confrontos'),
    path('perfil/', TemplateView.as_view(template_name='perfil.html'), name='perfil'),
    path('todas-variantes/', TemplateView.as_view(template_name='variantes.html'), name='todas-variantes'),
]