const apiBase = 'http://127.0.0.1:8000/api/';

// ==========================================
// CONTROLE DOS MODAIS
// ==========================================
function abrirModal() { document.getElementById('modal-cadastro').classList.remove('hidden'); }
function fecharModal() { document.getElementById('modal-cadastro').classList.add('hidden'); document.getElementById('form-nova-variante').reset(); }
function abrirModalVilao() { document.getElementById('modal-vilao').classList.remove('hidden'); }
function fecharModalVilao() { document.getElementById('modal-vilao').classList.add('hidden'); document.getElementById('form-novo-vilao').reset(); }
function abrirModalUniforme() { document.getElementById('modal-uniforme').classList.remove('hidden'); }
function fecharModalUniforme() { document.getElementById('modal-uniforme').classList.add('hidden'); document.getElementById('form-novo-uniforme').reset(); }

// ==========================================
// FORMULÁRIOS DE CADASTRO
// ==========================================
document.getElementById('form-nova-variante').addEventListener('submit', async (e) => {
    e.preventDefault();
    const corpo = { nome: document.getElementById('cad-nome').value, universo: document.getElementById('cad-universo').value, imagem: document.getElementById('cad-imagem').value, descricao: document.getElementById('cad-descricao').value, biografia: document.getElementById('cad-biografia').value, viloes_enfrentados: [] };
    await fetch(`${apiBase}variantes/`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(corpo) });
    fecharModal(); carregarUltimasVariantes();
});

document.getElementById('form-novo-vilao').addEventListener('submit', async (e) => {
    e.preventDefault();
    const corpo = { nome: document.getElementById('cad-vilao-nome').value, ameaca_nivel: document.getElementById('cad-vilao-ameaca').value, imagem: document.getElementById('cad-vilao-imagem').value, tecnologia: document.getElementById('cad-vilao-tecnologia').value, biografia: document.getElementById('cad-vilao-biografia').value, variantes_enfrentadas: [] };
    await fetch(`${apiBase}viloes/`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(corpo) });
    fecharModalVilao(); carregarMenuViloes(); carregarPaginaViloes();
});

document.getElementById('form-novo-uniforme').addEventListener('submit', async (e) => {
    e.preventDefault();
    const corpo = { nome: document.getElementById('cad-uni-nome').value, variante_dono: document.getElementById('cad-uni-dono').value, imagem: document.getElementById('cad-uni-imagem').value, descricao: document.getElementById('cad-uni-descricao').value };
    await fetch(`${apiBase}uniformes/`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(corpo) });
    fecharModalUniforme(); carregarPaginaUniformes();
});

// ==========================================
// FUNÇÕES DE RENDERIZAÇÃO (COM TRAVAS)
// ==========================================

async function carregarUltimasVariantes() {
    const divLista = document.getElementById('lista-dinamica-variantes');
    if (!divLista) return;

    try {
        const res = await fetch(`${apiBase}variantes/`);
        const variantes = await res.json();
        
        if (variantes.length > 0) {
            // Pega as 2 últimas e inverte a ordem (para as mais novas ficarem em cima)
            const ultimas = variantes.reverse().slice(0, 2);

            divLista.innerHTML = ultimas.map(v => `
                <div class="bg-white text-black shadow-2xl flex flex-col md:flex-row overflow-hidden border-l-8 border-[#e62429] min-h-[300px]">
                    <div class="md:w-1/3 bg-black flex items-center justify-center p-6 h-64 md:h-auto">
                        <img src="${v.imagem}" class="max-h-full object-contain" alt="${v.nome}">
                    </div>
                    <div class="md:w-2/3 p-8 flex flex-col justify-center">
                        <p class="text-[#e62429] font-bold text-sm tracking-widest uppercase mb-1">${v.universo}</p>
                        <h4 class="font-bebas text-5xl uppercase mb-4">${v.nome}</h4>
                        <p class="text-gray-600 mb-6 leading-relaxed line-clamp-3">${v.descricao}</p>
                        <a href="/perfil/?id=${v.id}&tipo=variantes" class="bg-[#e62429] text-white font-bebas text-xl px-8 py-3 w-fit transition hover:bg-red-700 skew-x-[-10deg]">
                            <span class="block skew-x-[10deg]">LER PERFIL COMPLETO</span>
                        </a>
                    </div>
                </div>
            `).join('');
        } else {
             divLista.innerHTML = '<p class="text-gray-500 font-bebas text-2xl">NENHUMA VARIANTE REGISTRADA AINDA.</p>';
        }
    } catch (err) {
        console.error("Erro ao carregar variantes:", err);
    }
}

async function carregarMenuViloes() {
    const div = document.getElementById('mega-menu-viloes');
    if (!div) return;
    const res = await fetch(`${apiBase}viloes/`);
    const data = await res.json();
    div.innerHTML = data.reverse().slice(0, 5).map(v => `
        <div class="flex flex-col"><img src="${v.imagem}" class="h-48 object-cover"><div class="bg-[#151515] p-4 h-24"><h4 class="font-bebas text-xl">${v.nome}</h4></div></div>
    `).join('');
}

async function carregarPaginaViloes() {
    const div = document.getElementById('lista-pagina-viloes');
    if (!div) return;
    const res = await fetch(`${apiBase}viloes/`);
    const data = await res.json();
    div.innerHTML = data.reverse().map(v => `
        <div class="bg-[#1a1a1a] p-5 border-t-4 border-green-600">
            <img src="${v.imagem}" class="w-full h-56 object-cover mb-4">
            <h4 class="font-bebas text-2xl text-white uppercase">${v.nome}</h4>
            <a href="/perfil/?id=${v.id}&tipo=viloes" class="block text-center text-white bg-[#333] p-2 mt-4 font-bebas">VER PERFIL</a>
        </div>
    `).join('');
}

async function carregarPaginaUniformes() {
    const div = document.getElementById('lista-uniformes');
    if (!div) return;
    const res = await fetch(`${apiBase}uniformes/`);
    const data = await res.json();
    div.innerHTML = data.map(u => `
        <div class="bg-[#151515] border-b-4 border-[#e62429] p-6">
            <img src="${u.imagem}" class="h-64 w-full object-cover">
            <h4 class="font-bebas text-2xl mt-4">${u.nome}</h4>
            <p class="text-gray-400 text-sm mt-2">${u.descricao}</p>
        </div>
    `).join('');
}

// ==========================================
// PERFIL DINÂMICO
// ==========================================
let dadosPerfil = {};
async function carregarPaginaPerfil() {
    const tituloEl = document.getElementById('perfil-titulo');
    if (!tituloEl) return;
    const params = new URLSearchParams(window.location.search);
    const tipo = params.get('tipo');
    const id = params.get('id');
    if (!tipo || !id) return;
    
    const res = await fetch(`${apiBase}${tipo}/${id}/`);
    dadosPerfil = await res.json();
    tituloEl.innerText = dadosPerfil.nome;
    document.getElementById('perfil-imagem').src = dadosPerfil.imagem;
    trocarAba('overview');
}

function trocarAba(aba) {
    const container = document.getElementById('container-conteudo');
    const isVar = new URLSearchParams(window.location.search).get('tipo') === 'variantes';
    
    // Reset estilos
    document.getElementById('btn-overview').className = "px-8 py-5 transition border-t-4 border-transparent hover:text-white";
    document.getElementById('btn-bio').className = "px-8 py-5 transition border-t-4 border-transparent hover:text-white";
    
    if (aba === 'overview') {
        container.innerHTML = `<p class="text-xl leading-relaxed">${isVar ? dadosPerfil.descricao : dadosPerfil.tecnologia}</p>`;
        document.getElementById('btn-overview').className = "px-8 py-5 transition border-t-4 border-[#e62429] bg-[#252525] text-white";
    } else {
        container.innerHTML = `<p class="text-xl leading-relaxed">${dadosPerfil.biografia || "Biografia não disponível."}</p>`;
        document.getElementById('btn-bio').className = "px-8 py-5 transition border-t-4 border-[#e62429] bg-[#252525] text-white";
    }
}

// ==========================================
// INICIALIZADOR
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    carregarUltimasVariantes();
    carregarMenuViloes();
    carregarPaginaViloes();
    carregarPaginaPerfil();
    carregarPaginaUniformes();
});