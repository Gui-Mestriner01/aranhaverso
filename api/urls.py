from django.urls import path
from .views import (
    VarianteAPIView, VarianteDetailAPIView,
    UniformeAPIView, UniformeDetailAPIView,
    VilaoAPIView, VilaoDetailAPIView,
    UniversoAPIView, UniversoDetailAPIView,
    PoderAPIView, PoderDetailAPIView,
    RegistrarBatalhaAPIView
)

urlpatterns = [
    # Rotas de Lista e Criação (Coleção Inteira)
    path('variantes/', VarianteAPIView.as_view(), name='lista_variantes'),
    path('uniformes/', UniformeAPIView.as_view(), name='lista_uniformes'),
    path('viloes/', VilaoAPIView.as_view(), name='lista_viloes'),
    path('universos/', UniversoAPIView.as_view(), name='lista_universos'),
    path('poderes/', PoderAPIView.as_view(), name='lista_poderes'),
    
    # Rotas de Detalhe, Edição e Deleção (Documento Único por ID)
    path('variantes/<str:id>/', VarianteDetailAPIView.as_view(), name='detalhe_variante'),
    path('uniformes/<str:id>/', UniformeDetailAPIView.as_view(), name='detalhe_uniforme'),
    path('viloes/<str:id>/', VilaoDetailAPIView.as_view(), name='detalhe_vilao'),
    path('universos/<str:id>/', UniversoDetailAPIView.as_view(), name='detalhe_universo'),
    path('poderes/<str:id>/', PoderDetailAPIView.as_view(), name='detalhe_poder'),
    
    # Ação especial N:N
    path('batalha/', RegistrarBatalhaAPIView.as_view(), name='registrar_batalha'),
]