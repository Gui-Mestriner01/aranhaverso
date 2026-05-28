import os
from django.conf import settings
import firebase_admin
from firebase_admin import credentials, firestore
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# --- INICIALIZAÇÃO DO FIREBASE ---
caminho_credenciais = os.path.join(settings.BASE_DIR, 'firebase_credenciais.json')

if not firebase_admin._apps:
    cred = credentials.Certificate(caminho_credenciais)
    firebase_admin.initialize_app(cred)

db = firestore.client()

# ==========================================
# 1. VARIANTES (Listar, Criar, Atualizar, Deletar)
# ==========================================
class VarianteAPIView(APIView):
    def get(self, request):
        variantes = [doc.to_dict() | {"id": doc.id} for doc in db.collection('variantes').stream()]
        return Response(variantes, status=status.HTTP_200_OK)

    def post(self, request):
        _, doc_ref = db.collection('variantes').add(request.data)
        return Response({"mensagem": "Variante catalogada com sucesso!", "id": doc_ref.id}, status=status.HTTP_201_CREATED)

class VarianteDetailAPIView(APIView):
    def get(self, request, id):
        doc = db.collection('variantes').document(id).get()
        if not doc.exists: return Response({"erro": "Não encontrado"}, status=status.HTTP_404_NOT_FOUND)
        return Response(doc.to_dict() | {"id": doc.id}, status=status.HTTP_200_OK)

    def put(self, request, id):
        db.collection('variantes').document(id).update(request.data)
        return Response({"mensagem": "Variante atualizada com sucesso!"}, status=status.HTTP_200_OK)

    def delete(self, request, id):
        db.collection('variantes').document(id).delete()
        return Response({"mensagem": "Variante removida do multiverso!"}, status=status.HTTP_200_OK)


# ==========================================
# 2. UNIFORMES (Listar, Criar, Atualizar, Deletar)
# ==========================================
class UniformeAPIView(APIView):
    def get(self, request):
        uniformes = [doc.to_dict() | {"id": doc.id} for doc in db.collection('uniformes').stream()]
        return Response(uniformes, status=status.HTTP_200_OK)

    def post(self, request):
        _, doc_ref = db.collection('uniformes').add(request.data)
        return Response({"mensagem": "Traje adicionado com sucesso!", "id": doc_ref.id}, status=status.HTTP_201_CREATED)

class UniformeDetailAPIView(APIView):
    def get(self, request, id):
        doc = db.collection('uniformes').document(id).get()
        if not doc.exists: return Response({"erro": "Não encontrado"}, status=status.HTTP_404_NOT_FOUND)
        return Response(doc.to_dict() | {"id": doc.id}, status=status.HTTP_200_OK)

    def put(self, request, id):
        db.collection('uniformes').document(id).update(request.data)
        return Response({"mensagem": "Traje atualizado com sucesso!"}, status=status.HTTP_200_OK)

    def delete(self, request, id):
        db.collection('uniformes').document(id).delete()
        return Response({"mensagem": "Traje desintegrado!"}, status=status.HTTP_200_OK)


# ==========================================
# 3. VILÕES (Listar, Criar, Atualizar, Deletar)
# ==========================================
class VilaoAPIView(APIView):
    def get(self, request):
        viloes = [doc.to_dict() | {"id": doc.id} for doc in db.collection('viloes').stream()]
        return Response(viloes, status=status.HTTP_200_OK)

    def post(self, request):
        _, doc_ref = db.collection('viloes').add(request.data)
        return Response({"mensagem": "Vilão registrado!", "id": doc_ref.id}, status=status.HTTP_201_CREATED)

class VilaoDetailAPIView(APIView):
    def get(self, request, id):
        doc = db.collection('viloes').document(id).get()
        if not doc.exists: return Response({"erro": "Não encontrado"}, status=status.HTTP_404_NOT_FOUND)
        return Response(doc.to_dict() | {"id": doc.id}, status=status.HTTP_200_OK)

    def put(self, request, id):
        db.collection('viloes').document(id).update(request.data)
        return Response({"mensagem": "Dados do vilão atualizados!"}, status=status.HTTP_200_OK)

    def delete(self, request, id):
        db.collection('viloes').document(id).delete()
        return Response({"mensagem": "Vilão derrotado e apagado!"}, status=status.HTTP_200_OK)


# ==========================================
# 4. UNIVERSOS (Listar, Criar, Atualizar, Deletar)
# ==========================================
class UniversoAPIView(APIView):
    def get(self, request):
        universos = [doc.to_dict() | {"id": doc.id} for doc in db.collection('universos').stream()]
        return Response(universos, status=status.HTTP_200_OK)

    def post(self, request):
        _, doc_ref = db.collection('universos').add(request.data)
        return Response({"mensagem": "Dimensão mapeada!", "id": doc_ref.id}, status=status.HTTP_201_CREATED)

class UniversoDetailAPIView(APIView):
    def get(self, request, id):
        doc = db.collection('universos').document(id).get()
        if not doc.exists: return Response({"erro": "Não encontrado"}, status=status.HTTP_404_NOT_FOUND)
        return Response(doc.to_dict() | {"id": doc.id}, status=status.HTTP_200_OK)

    def put(self, request, id):
        db.collection('universos').document(id).update(request.data)
        return Response({"mensagem": "Universo reconfigurado!"}, status=status.HTTP_200_OK)

    def delete(self, request, id):
        db.collection('universos').document(id).delete()
        return Response({"mensagem": "Linha temporal colapsada e deletada!"}, status=status.HTTP_200_OK)


# ==========================================
# 5. PODERES (Listar, Criar, Atualizar, Deletar)
# ==========================================
class PoderAPIView(APIView):
    def get(self, request):
        poderes = [doc.to_dict() | {"id": doc.id} for doc in db.collection('poderes').stream()]
        return Response(poderes, status=status.HTTP_200_OK)

    def post(self, request):
        _, doc_ref = db.collection('poderes').add(request.data)
        return Response({"mensagem": "Poder registrado!", "id": doc_ref.id}, status=status.HTTP_201_CREATED)

class PoderDetailAPIView(APIView):
    def get(self, request, id):
        doc = db.collection('poderes').document(id).get()
        if not doc.exists: return Response({"erro": "Não encontrado"}, status=status.HTTP_404_NOT_FOUND)
        return Response(doc.to_dict() | {"id": doc.id}, status=status.HTTP_200_OK)

    def put(self, request, id):
        db.collection('poderes').document(id).update(request.data)
        return Response({"mensagem": "Atributos do poder modificados!"}, status=status.HTTP_200_OK)

    def delete(self, request, id):
        db.collection('poderes').document(id).delete()
        return Response({"mensagem": "Poder removido do DNA aracnídeo!"}, status=status.HTTP_200_OK)


# --- RELACIONAMENTO N:N ---
class RegistrarBatalhaAPIView(APIView):
    def post(self, request):
        variante_id, vilao_id = request.data.get('variante_id'), request.data.get('vilao_id')
        if not variante_id or not vilao_id: return Response({"erro": "Faltam IDs"}, status=status.HTTP_400_BAD_REQUEST)
        
        db.collection('variantes').document(variante_id).update({"viloes_enfrentados": firestore.ArrayUnion([vilao_id])})
        db.collection('viloes').document(vilao_id).update({"variantes_enfrentadas": firestore.ArrayUnion([variante_id])})
        return Response({"mensagem": "Batalha épica registrada!"}, status=status.HTTP_200_OK)