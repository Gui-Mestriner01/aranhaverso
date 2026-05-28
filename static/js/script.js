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
function abrirModalConfronto() { document.getElementById('modal-confronto').classList.remove('hidden'); }
function fecharModalConfronto() { document.getElementById('modal-confronto').classList.add('hidden'); document.getElementById('form-novo-confronto').reset(); }
function abrirModalPoder() { document.getElementById('modal-poder').classList.remove('hidden'); }
function fecharModalPoder() { document.getElementById('modal-poder').classList.add('hidden'); document.getElementById('form-novo-poder').reset(); }

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

document.getElementById('form-novo-confronto').addEventListener('submit', async (e) => {
    e.preventDefault();
    const corpo = {
        titulo: document.getElementById('cad-conf-titulo').value,
        heroi: document.getElementById('cad-conf-heroi').value,
        vilao: document.getElementById('cad-conf-vilao').value,
        vencedor: document.getElementById('cad-conf-vencedor').value,
        imagem: document.getElementById('cad-conf-imagem').value,
        descricao: document.getElementById('cad-conf-descricao').value
    };
    await fetch(`${apiBase}confrontos/`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(corpo) });
    fecharModalConfronto(); 
    carregarPaginaConfrontos();
    carregarConfrontosNaHome(); // Atualiza a home se você estiver nela
});

document.getElementById('form-novo-poder').addEventListener('submit', async (e) => {
    e.preventDefault();
    const corpo = {
        nome: document.getElementById('cad-poder-nome').value,
        usuario: document.getElementById('cad-poder-usuario').value,
        imagem: document.getElementById('cad-poder-imagem').value,
        descricao: document.getElementById('cad-poder-descricao').value
    };
    await fetch(`${apiBase}poderes/`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(corpo) });
    fecharModalPoder(); 
    carregarPaginaPoderes();
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
        <div class="flex flex-col group cursor-pointer border-b-4 border-transparent hover:border-green-600 transition duration-300 shadow-md bg-[#151515]">
            <div class="h-48 overflow-hidden bg-[#252525] flex items-center justify-center p-2">
                <img src="${v.imagem}" class="max-h-full object-contain group-hover:scale-110 transition duration-500 drop-shadow-xl" alt="${v.nome}">
            </div>
            <div class="text-white p-4 h-20 flex items-center justify-center text-center">
                <h4 class="font-bebas text-2xl tracking-wider uppercase">${v.nome}</h4>
            </div>
        </div>
    `).join('');
}

async function carregarPaginaViloes() {
    const div = document.getElementById('lista-pagina-viloes');
    if (!div) return;
    const res = await fetch(`${apiBase}viloes/`);
    const data = await res.json();
    
    div.innerHTML = data.reverse().map(v => `
        <div class="bg-[#1a1a1a] p-5 border-t-4 border-green-600 group transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(22,163,74,0.4)] flex flex-col justify-between">
            
            <div class="w-full h-64 overflow-hidden mb-6 flex items-center justify-center bg-black/40 rounded">
                <img src="${v.imagem}" class="max-h-full object-contain group-hover:scale-110 transition duration-500 drop-shadow-2xl" alt="${v.nome}">
            </div>
            
            <div>
                <h4 class="font-bebas text-3xl text-white uppercase text-center tracking-wider">${v.nome}</h4>
                <a href="/perfil/?id=${v.id}&tipo=viloes" class="block text-center text-white bg-[#333] group-hover:bg-green-600 transition-colors duration-300 p-3 mt-4 font-bebas text-xl tracking-widest">VER PERFIL COMPLETO</a>
            </div>
            
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

async function carregarPaginaConfrontos() {
    const div = document.getElementById('lista-confrontos');
    if (!div) return;

    try {
        const res = await fetch(`${apiBase}confrontos/`);
        const data = await res.json();
        
        if (data.length > 0) {
            div.innerHTML = data.reverse().map(c => `
                <div class="bg-[#151515] border-t-4 border-orange-500 overflow-hidden shadow-2xl group">
                    <div class="h-64 overflow-hidden relative">
                        <div class="absolute inset-0 bg-gradient-to-t from-[#151515] to-transparent z-10"></div>
                        <img src="${c.imagem}" class="w-full h-full object-cover group-hover:scale-105 transition duration-700">
                        <div class="absolute bottom-4 left-6 z-20">
                            <h4 class="font-bebas text-4xl text-white uppercase tracking-wider drop-shadow-md">${c.titulo}</h4>
                        </div>
                    </div>
                    <div class="p-6">
                        <div class="flex justify-between items-center mb-4 font-bebas text-2xl tracking-widest border-b border-[#333] pb-4">
                            <span class="text-blue-500">${c.heroi}</span>
                            <span class="text-gray-500 text-xl">VS</span>
                            <span class="text-green-500">${c.vilao}</span>
                        </div>
                        <p class="text-gray-400 mb-6 line-clamp-3">${c.descricao}</p>
                        <div class="bg-[#222] p-3 text-center border border-[#333]">
                            <span class="text-sm font-bold text-gray-500 uppercase tracking-widest block mb-1">VENCEDOR</span>
                            <span class="font-bebas text-2xl text-orange-500 uppercase">${c.vencedor}</span>
                        </div>
                    </div>
                </div>
            `).join('');
        } else {
             div.innerHTML = '<p class="text-gray-500 font-bebas text-2xl">NENHUM CONFRONTO REGISTRADO.</p>';
        }
    } catch (err) {
        console.error("Erro ao carregar confrontos:", err);
    }
}

async function carregarConfrontosNaHome() {
    const div = document.getElementById('grid-confrontos');
    if (!div) return;

    try {
        const res = await fetch(`${apiBase}confrontos/`);
        const data = await res.json();
        
        if (data.length > 0) {
            // Pega apenas os 4 últimos confrontos para não quebrar o layout da Home
            div.innerHTML = data.reverse().slice(0, 4).map(c => `
                <div class="bg-[#151515] border-t-4 border-[#e62429] p-4 group cursor-pointer hover:-translate-y-2 transition-transform">
                    <img src="${c.imagem}" class="w-full h-32 object-cover mb-4">
                    <h4 class="font-bebas text-xl text-white uppercase truncate">${c.titulo}</h4>
                    <p class="text-xs text-gray-500 mt-2 font-bold tracking-widest">${c.heroi} VS ${c.vilao}</p>
                </div>
            `).join('');
        } else {
             div.innerHTML = '<p class="text-gray-500 font-bebas text-xl col-span-4">Nenhum confronto registrado.</p>';
        }
    } catch (err) {
        console.error("Erro ao carregar confrontos na home:", err);
    }
}

async function carregarPaginaPoderes() {
    const div = document.getElementById('lista-poderes');
    if (!div) return;

    try {
        const res = await fetch(`${apiBase}poderes/`);
        const data = await res.json();
        
        if (data.length > 0) {
            div.innerHTML = data.reverse().map(p => `
                <div class="bg-[#151515] border-b-4 border-purple-500 overflow-hidden shadow-xl group hover:-translate-y-2 transition-transform duration-300 flex flex-col h-full">
                    <div class="h-56 overflow-hidden bg-black flex items-center justify-center p-4">
                        <img src="${p.imagem}" class="max-h-full object-contain group-hover:scale-110 transition duration-500" alt="${p.nome}">
                    </div>
                    <div class="p-6 flex-grow">
                        <span class="text-purple-500 font-bold text-xs tracking-widest uppercase block mb-1">USUÁRIO: ${p.usuario}</span>
                        <h4 class="font-bebas text-3xl text-white uppercase mb-3">${p.nome}</h4>
                        <p class="text-gray-400 text-sm line-clamp-4 leading-relaxed">${p.descricao}</p>
                    </div>
                </div>
            `).join('');
        } else {
             div.innerHTML = '<p class="text-gray-500 font-bebas text-2xl col-span-3">NENHUM PODER CATALOGADO.</p>';
        }
    } catch (err) {
        console.error("Erro ao carregar poderes:", err);
    }
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
    carregarPaginaConfrontos();
    carregarConfrontosNaHome();
    carregarPaginaPoderes();
});
