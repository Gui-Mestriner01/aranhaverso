from django.db import models

class Variante(models.Model):
    nome = models.CharField(max_length=100)
    universo = models.CharField(max_length=100)
    imagem = models.URLField()
    descricao = models.TextField()
    biografia = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.nome

class Vilao(models.Model):
    nome = models.CharField(max_length=100)
    ameaca_nivel = models.CharField(max_length=50)
    imagem = models.URLField()
    tecnologia = models.TextField()
    biografia = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.nome