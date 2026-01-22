/**
 * ==========================================================================
 * 1. CARREGAMENTO E INICIALIZAÇÃO
 * ==========================================================================
 */
const CONFIG = {
    FALLBACK_IMAGE: 'img/vita.jpg',
    HISTORY_KEY: 'capsula_pro_search_history_v1',
    MAX_HISTORY: 10,
    DEBOUNCE_DELAY: 250,
    ANIMATION_SPEED: 300
};

// --- Dados dos Produtos (Simulado - Idealmente viria de uma API/JSON) ---
const productsData = {
    "Revera Caps": {
        benefits: ["Rejuvenescimento da pele", "Redução de rugas e linhas de expressão", "Hidratação profunda", "Aumento da elasticidade"],
        composition: "Colágeno Verisol, Ácido Hialurônico, Retinol, Vitaminas C e E.",
        usage: "Tomar 2 cápsulas por dia, preferencialmente pela manhã.",
        category: "Beleza e Estética"
    },
    "Vigor Black": {
        benefits: ["Aumento da energia e disposição", "Melhora do desempenho físico", "Foco e concentração", "Recuperação muscular acelerada"],
        composition: "Cafeína, Taurina, Arginina, Zinco, Magnésio.",
        usage: "Tomar 1 cápsula 30 minutos antes do treino ou atividade física.",
        category: "Performance Masculina"
    },
    "Visara": {
        benefits: ["Saúde ocular", "Proteção contra luz azul", "Prevenção da degeneração macular", "Visão mais nítida"],
        composition: "Luteína, Zeaxantina, Vitamina A, Zinco.",
        usage: "Tomar 1 cápsula ao dia junto com uma refeição.",
        category: "Saúde Ocular"
    },
    "Regenere Drops": {
        benefits: ["Regeneração celular", "Cicatrização rápida", "Combate ao envelhecimento precoce", "Pele mais firme"],
        composition: "Óleo de Rosa Mosqueta, Vitamina K2, Trans-Resveratrol.",
        usage: "Aplicar 12 gotas sublinguais diariamente.",
        category: "Beleza e Estética"
    },
    "Lift Detox Black": {
        benefits: ["Acelera o metabolismo", "Queima de gordura localizada", "Redução do inchaço", "Controle do apetite"],
        composition: "Spirulina, Quitosana, Psyllium, Cromo, Guaraná.",
        usage: "Tomar 2 cápsulas por dia, antes das principais refeições.",
        category: "Emagrecimento"
    },
    "Diurie Fit Black": {
        benefits: ["Efeito diurético potente", "Eliminação de toxinas", "Redução da retenção de líquidos", "Auxílio no emagrecimento"],
        composition: "Cavalinha, Hibisco, Chá Verde, Carqueja.",
        usage: "Diluir 1 colher em 200ml de água e beber pela manhã.",
        category: "Emagrecimento"
    },
    "Clareador Natural Fit": {
        benefits: ["Clareamento de manchas", "Uniformização do tom da pele", "Ação antioxidante", "Pele iluminada"],
        composition: "Ácido Kójico, Vitamina C, Extrato de Arroz.",
        usage: "Aplicar sobre as manchas à noite e lavar pela manhã.",
        category: "Beleza e Estética"
    },
    "Harmony Hair": {
        benefits: ["Crescimento acelerado dos fios", "Redução da queda capilar", "Unhas mais fortes", "Cabelos com mais brilho"],
        composition: "Biotina, Silício Orgânico, Vitaminas do Complexo B.",
        usage: "Tomar 1 cápsula por dia.",
        category: "Cabelos e Unhas"
    },
    "Colágeno Tipo II Pro": {
        benefits: ["Saúde das articulações", "Redução de dores articulares", "Melhora da mobilidade", "Prevenção de lesões"],
        composition: "Colágeno Tipo II não desnaturado, Vitamina D3, Magnésio.",
        usage: "Tomar 1 cápsula ao dia.",
        category: "Saúde Articular"
    },
    "Durasil": {
        benefits: ["Resistência física", "Aumento da libido", "Equilíbrio hormonal", "Vitalidade"],
        composition: "Maca Peruana, Tribulus Terrestris, Ginseng.",
        usage: "Tomar 2 cápsulas diariamente.",
        category: "Performance Masculina"
    },
    "Erectus Plus": {
        benefits: ["Potência sexual", "Ereções mais firmes", "Aumento do desejo", "Energia extra"],
        composition: "L-Arginina, Epimedium, Zinco.",
        usage: "Tomar 2 cápsulas 1 hora antes da relação.",
        category: "Performance Masculina"
    },
    "Ora Pro Nobis": {
        benefits: ["Fonte de proteínas", "Saúde intestinal", "Fortalecimento imunológico", "Rico em fibras"],
        composition: "Extrato puro de Ora Pro Nobis.",
        usage: "Tomar 2 cápsulas por dia.",
        category: "Saúde Geral"
    },
    "Folixil": {
        benefits: ["Combate à calvície", "Fortalecimento dos folículos", "Crescimento de novos fios", "Volume capilar"],
        composition: "Biotina, Zinco, Ferro, Vitamina A.",
        usage: "Tomar 2 cápsulas por dia.",
        category: "Cabelos e Unhas"
    },
    "Rosa Amazonica": {
        benefits: ["Hidratação intensa", "Redução de estrias", "Combate à celulite", "Pele macia"],
        composition: "Óleo de Rosa Mosqueta, Óleo de Amêndoas, Vitamina E.",
        usage: "Aplicar na pele limpa e massagear até absorção.",
        category: "Beleza e Estética"
    },
    "Fire Max": {
        benefits: ["Energia explosiva", "Foco mental", "Termogênico potente", "Performance máxima"],
        composition: "Cafeína Anidra 420mg.",
        usage: "Tomar 1 cápsula antes do treino.",
        category: "Energia e Treino"
    },
    "Curcublack": {
        benefits: ["Ação anti-inflamatória", "Alívio de dores", "Saúde digestiva", "Antioxidante natural"],
        composition: "Curcumina com Piperina (Pimenta Preta).",
        usage: "Tomar 1 cápsula junto com o almoço.",
        category: "Saúde Geral"
    },
    "Slim Gota Black": {
        benefits: ["Controle da ansiedade", "Redução da vontade de doces", "Acelera a queima calórica", "Fácil absorção"],
        composition: "Picolinato de Cromo, L-Carnitina, Extrato de Laranja Moro.",
        usage: "15 gotas sublinguais antes do almoço.",
        category: "Emagrecimento"
    },
    "Purah": {
        benefits: ["Detoxificação do organismo", "Melhora da digestão", "Pele mais limpa", "Leveza corporal"],
        composition: "Chlorella, Carvão Ativado, Gengibre.",
        usage: "Tomar 2 cápsulas em jejum.",
        category: "Saúde e Bem-estar"
    },
    "Fire Max Feminine": {
        benefits: ["Aumento da libido feminina", "Lubrificação natural", "Equilíbrio hormonal", "Mais prazer"],
        composition: "Maca Peruana, Feno Grego, Vitaminas B6 e B12.",
        usage: "Tomar 2 cápsulas diariamente.",
        category: "Saúde da Mulher"
    },
    "OzenFit Caps": {
        benefits: ["Saciedade prolongada", "Queima de gordura abdominal", "Regula o intestino", "Energia natural"],
        composition: "Psyllium, Agar-Agar, Spirulina, Berinjela.",
        usage: "Tomar 2 cápsulas 30 min antes das refeições.",
        category: "Emagrecimento"
    },
    "Libid Intense": {
        benefits: ["Intensidade máxima", "Prazer prolongado", "Estimulante natural", "Vigor renovado"],
        composition: "Taurina, Cafeína, Guaraná, Canela.",
        usage: "Aplicar 15 gotas sublinguais quando desejar.",
        category: "Performance Sexual"
    },
    "Biotin Hair": {
        benefits: ["Crescimento rápido", "Cabelos mais fortes", "Unhas resistentes", "Pele saudável"],
        composition: "Biotina 45mcg, Vitamina B5, Cisteína.",
        usage: "Tomar 1 cápsula por dia.",
        category: "Cabelos e Unhas"
    },
    "Fignar Gotas": {
        benefits: ["Saúde do fígado", "Digestão eficiente", "Redução de gordura no fígado", "Desintoxicação"],
        composition: "Colina, Metionina, Vitaminas do Complexo B, Alcachofra.",
        usage: "20 gotas por dia, antes da principal refeição.",
        category: "Saúde Hepática"
    },
    "Nervocure": {
        benefits: ["Alívio de dores nos nervos", "Regeneração nervosa", "Redução de formigamentos", "Melhora do sono"],
        composition: "Vitamina B12 (Metilcobalamina), Ácido Alfa Lipóico, Magnésio.",
        usage: "Tomar 1 cápsula à noite.",
        category: "Saúde Neurológica"
    },
    "Block Fat": {
        benefits: ["Bloqueia absorção de gorduras", "Reduz o colesterol", "Melhora o trânsito intestinal", "Perda de peso"],
        composition: "Quitosana de alta densidade, Psyllium, Vitamina C.",
        usage: "Tomar 2 cápsulas antes de refeições gordurosas.",
        category: "Emagrecimento"
    }
};

/**
 * ==========================================================================
 * 2. ESTADO DA APLICAÇÃO
 * ==========================================================================
 */
const state = {
    searchHistory: JSON.parse(localStorage.getItem(CONFIG.HISTORY_KEY)) || []
};

/**
 * ==========================================================================
 * 3. ELEMENTOS DO DOM (Seletores e Helpers)
 * ==========================================================================
 */
// Os elementos são acessados dinamicamente dentro das funções ou no evento DOMContentLoaded
// para garantir que o DOM já esteja totalmente carregado.

/**
 * ==========================================================================
 * 4. FUNÇÕES PRINCIPAIS
 * ==========================================================================
 */

// --- Funções Utilitárias ---
function debounce(func, delay = CONFIG.DEBOUNCE_DELAY) {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// --- Funções de Modal e Página de Detalhes ---
function abrirDetalhes(nome, imagem, descricao, preco, linkCompra = null) {
    // Monta URL para página de detalhes dedicada
    const buy = linkCompra || getBuyLinkFallback(nome) || '';
    const url = `detalhes.html?name=${encodeURIComponent(nome)}&img=${encodeURIComponent(imagem)}&desc=${encodeURIComponent(descricao)}&price=${encodeURIComponent(preco)}&buy=${encodeURIComponent(buy)}`;
    window.location.assign(url);
}

// ---- Landing Page de Conversão ----
const THEME_BY_CATEGORY = {
    "Emagrecimento": { primary: "#50c878", dark: "#0c5c3c" },
    "Beleza e Estética": { primary: "#e67eac", dark: "#8a2c5b" },
    "Performance Masculina": { primary: "#4b6cff", dark: "#243a8f" },
    "Energia e Treino": { primary: "#ff6b57", dark: "#b23425" },
    "Saúde Geral": { primary: "#28c76f", dark: "#0f6b41" },
    "Cabelos e Unhas": { primary: "#4fb6ff", dark: "#1f6ea6" },
    "Saúde Ocular": { primary: "#2f80ed", dark: "#0b4f9c" },
    "Saúde Articular": { primary: "#f2994a", dark: "#b96b1e" },
    "Saúde Hepática": { primary: "#8bd94a", dark: "#4a7c1e" },
    "Saúde Neurológica": { primary: "#a36cff", dark: "#5b31ad" },
    "Performance Sexual": { primary: "#ff4fa3", dark: "#a32061" }
};

function parseBRL(str) {
    // "R$ 117,00" -> 117.00
    const num = parseFloat(str.replace(/[^\d,]/g, '').replace(',', '.'));
    return isNaN(num) ? 0 : num;
}

function formatBRL(num) {
    return num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function computeOriginal(priceStr) {
    const val = parseBRL(priceStr);
    if (!val) return priceStr;
    const original = Math.round(val * 1.35 * 100) / 100;
    return formatBRL(original);
}

function resolveTheme(nome, categoria) {
    const theme = THEME_BY_CATEGORY[categoria];
    if (theme) return theme;
    return { primary: "#50c878", dark: "#0c5c3c" };
}

function setLandingTheme(primary, dark) {
    const lp = document.getElementById('lpProductPage');
    if (!lp) return;
    if (primary) lp.style.setProperty('--primary-green', primary);
    if (dark) lp.style.setProperty('--dark-green', dark);
}

function getBuyLinkFallback(nome) {
    // Procura o card correspondente no catálogo para extrair o link
    const cards = document.querySelectorAll('.product-card');
    for (const card of cards) {
        const title = card.querySelector('h3')?.textContent?.trim();
        if (title === nome) {
            const buy = card.querySelector('.btn-buy');
            if (buy) return buy.getAttribute('href');
        }
    }
    return null;
}

function exibirLandingPage(nome, imagem, descricao, preco, linkCompra) {
    const extraData = productsData[nome] || {
        benefits: ["Qualidade Garantida", "Entrega Rápida", "Satisfação Comprovada", "Suporte Especializado"],
        composition: "Fórmula Exclusiva Natural.",
        usage: "Consulte a embalagem para instruções de uso.",
        category: "Suplementos"
    };
    
    const lp = document.getElementById('lpProductPage');
    if (!lp) return;
    
    const theme = resolveTheme(nome, extraData.category);
    lp.style.setProperty('--primary-green', theme.primary);
    lp.style.setProperty('--dark-green', theme.dark);
    
    document.getElementById('lpCategory').textContent = extraData.category;
    document.getElementById('lpTitle').textContent = nome;
    document.getElementById('lpBenefitsText').textContent = descricao;
    document.getElementById('lpPriceCurrent').textContent = preco;
    document.getElementById('lpPriceOriginal').textContent = computeOriginal(preco);
    
    const hero = document.getElementById('lpHeroImg');
    hero.src = imagem;
    hero.onerror = () => { hero.src = CONFIG.FALLBACK_IMAGE; };
    
    const kitImg1 = document.getElementById('lpKitImg1');
    const kitImg3 = document.getElementById('lpKitImg3');
    if (kitImg1) kitImg1.src = imagem;
    if (kitImg3) kitImg3.src = imagem;
    
    const buyURL = linkCompra || getBuyLinkFallback(nome);
    const btn = document.getElementById('lpBtnBuy');
    if (btn) {
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        let selectedQty = 1;
        newBtn.onclick = () => {
            if (buyURL) {
                window.open(buyURL, '_blank');
            } else {
                comprarProduto(nome);
            }
        };
        
        // Seletor de kits
        const kit1 = document.getElementById('lpKit1');
        const kit3 = document.getElementById('lpKit3');
        const setKit = (qty) => {
            selectedQty = qty;
            if (kit1 && kit3) {
                kit1.setAttribute('aria-checked', qty === 1 ? 'true' : 'false');
                kit3.setAttribute('aria-checked', qty === 3 ? 'true' : 'false');
            }
        };
        if (kit1) {
            kit1.onclick = () => setKit(1);
            kit1.onkeydown = (e) => { if (e.key === 'Enter' || e.key === ' ') setKit(1); };
        }
        if (kit3) {
            kit3.onclick = () => setKit(3);
            kit3.onkeydown = (e) => { if (e.key === 'Enter' || e.key === ' ') setKit(3); };
        }
        setKit(1);
    }
    
    // Foco total: esconde elementos não essenciais
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    const banner = document.querySelector('.banner-suplementos');
    const catalog = document.getElementById('produtos');
    const topbar = document.querySelector('.top-bar');
    if (header) header.hidden = true;
    if (footer) footer.hidden = true;
    if (banner) banner.hidden = true;
    if (catalog) catalog.hidden = true;
    if (topbar) topbar.hidden = true;
    
    const detailsPage = document.getElementById('productDetailsPage');
    if (detailsPage) detailsPage.hidden = true;
    
    lp.hidden = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function fecharPaginaDetalhes() {
    document.getElementById('productDetailsPage').hidden = true;
    document.getElementById('produtos').hidden = false;
    // document.querySelector('.header-search').hidden = false; // Se tiver escondido
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- Funções de Modal (Legado - Redireciona para nova página) ---
function fecharModal() {
    // Mantido apenas para evitar erros se algo ainda chamar isso
    const modal = document.getElementById('modalDetalhes');
    if(modal) modal.classList.remove('show');
}

function comprarProduto(nomeProduto) {
    const numeroWhatsApp = '5511999999999'; // Substitua pelo número real
    const mensagem = `Olá! Gostaria de comprar o produto: ${nomeProduto}`;
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
}

// --- Funções de Histórico de Busca ---
function saveSearchHistory(term) {
    if (!term || !term.trim()) return;
    const cleanTerm = term.trim();
    
    // Remove duplicatas e adiciona ao início
    state.searchHistory = state.searchHistory.filter(item => item !== cleanTerm);
    state.searchHistory.unshift(cleanTerm);
    
    // Limita o tamanho do histórico
    if (state.searchHistory.length > CONFIG.MAX_HISTORY) state.searchHistory.pop();
    
    localStorage.setItem(CONFIG.HISTORY_KEY, JSON.stringify(state.searchHistory));
    renderSearchHistory();
}

function loadSearchHistory() {
    state.searchHistory = JSON.parse(localStorage.getItem(CONFIG.HISTORY_KEY)) || [];
    renderSearchHistory();
}

function clearAllHistory() {
    state.searchHistory = [];
    localStorage.removeItem(CONFIG.HISTORY_KEY);
    renderSearchHistory();
}

function removeFromHistory(term) {
    state.searchHistory = state.searchHistory.filter(t => t !== term);
    localStorage.setItem(CONFIG.HISTORY_KEY, JSON.stringify(state.searchHistory));
    renderSearchHistory();
}

function renderSearchHistory() {
    let historyContainer = document.getElementById('searchHistory');
    const searchWrapper = document.querySelector('.search-wrapper');
    
    // Cria o container se não existir
    if (!historyContainer && searchWrapper) {
        historyContainer = document.createElement('div');
        historyContainer.id = 'searchHistory';
        historyContainer.className = 'search-history';
        historyContainer.setAttribute('role', 'listbox');
        historyContainer.hidden = true;
        searchWrapper.appendChild(historyContainer);
    }
    
    if (!historyContainer) return;

    if (state.searchHistory.length === 0) {
        historyContainer.innerHTML = '';
        historyContainer.hidden = true;
        return;
    }

    historyContainer.innerHTML = `
        <div class="history-header">
            <h3>Histórico Recente</h3>
            <button id="btnLimparHistorico" class="clear-all" type="button">Limpar</button>
        </div>
        <ul class="history-list">
            ${state.searchHistory.map(term => `
                <li class="history-item">
                    <span class="history-term" onclick="aplicarBusca('${term}')">${term}</span>
                    <button class="remove-item" onclick="removeFromHistory('${term}')" aria-label="Remover ${term}" type="button">
                        <i class="fas fa-times"></i>
                    </button>
                </li>
            `).join('')}
        </ul>
    `;
    
    // Reatribui evento do botão limpar
    const btnClear = document.getElementById('btnLimparHistorico');
    if (btnClear) {
        btnClear.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            clearAllHistory();
        };
    }
}

// Helper global para aplicar busca vinda do histórico/sugestão
function aplicarBusca(term) {
    const input = document.getElementById('campoBuscaHeader');
    if (input) {
        input.value = term;
        input.dispatchEvent(new Event('input')); // Dispara filtros
        
        // Esconde painéis
        const historyContainer = document.getElementById('searchHistory');
        const suggestionsList = document.getElementById('searchSuggestions');
        if (historyContainer) historyContainer.hidden = true;
        if (suggestionsList) suggestionsList.hidden = true;
    }
}

// --- Funções de Sugestão de Busca ---
function renderSuggestions(term) {
    const suggestionsList = document.getElementById('searchSuggestions');
    const searchLoading = document.getElementById('searchLoading');
    const searchIcon = document.querySelector('.search-icon-btn');

    // Helper para finalizar estado de loading
    const finishLoading = () => {
        if (searchLoading) searchLoading.hidden = true;
        if (searchIcon) searchIcon.style.opacity = '1';
    };

    if (!suggestionsList) {
        finishLoading();
        return;
    }

    if (term.length < 2) {
        suggestionsList.hidden = true;
        finishLoading();
        return;
    }

    const products = document.querySelectorAll('.product-card');
    const results = Array.from(products).map(card => {
        const title = card.querySelector('h3').textContent;
        const imgSrc = card.querySelector('img').src;
        
        // Extrair dados do botão de detalhes
        let description = '';
        let price = '';
        let buyLink = '';
        
        const btnDetails = card.querySelector('.btn-details');
        if (btnDetails) {
            const onclickAttr = btnDetails.getAttribute('onclick');
            // Regex para capturar argumentos: 'Nome', 'Img', 'Desc', 'Preco'
            const matches = onclickAttr.match(/'([^']*)'/g);
            if (matches && matches.length >= 4) {
                // Remove aspas simples
                description = matches[2].replace(/'/g, '');
                price = matches[3].replace(/'/g, '');
            }
        }
        
        const btnBuy = card.querySelector('.btn-buy');
        if (btnBuy) {
            buyLink = btnBuy.getAttribute('href');
        }

        // Relevância simples: 2 = começa com, 1 = contém
        let relevance = 0;
        if (title.toLowerCase().startsWith(term.toLowerCase())) relevance = 2;
        else if (title.toLowerCase().includes(term.toLowerCase())) relevance = 1;
        
        return { title, imgSrc, description, price, buyLink, relevance };
    }).filter(item => item.relevance > 0).sort((a, b) => b.relevance - a.relevance);

    if (results.length === 0) {
        suggestionsList.innerHTML = '<div class="suggest-item no-results">Nenhum produto encontrado</div>';
        suggestionsList.hidden = false;
        finishLoading();
        return;
    }

    // Limita a 5 sugestões
    const topResults = results.slice(0, 5);
    
    suggestionsList.innerHTML = topResults.map(item => `
        <div class="suggest-item" role="option" onclick="abrirDetalhes('${item.title}', '${item.imgSrc}', '${item.description}', '${item.price}', '${item.buyLink}')">
            <img src="${item.imgSrc}" alt="" class="suggest-img">
            <div class="suggest-info">
                <span class="suggest-title">${item.title}</span>
                <span class="suggest-desc">${item.description}</span>
                <span class="suggest-price">${item.price}</span>
            </div>
        </div>
    `).join('');
    suggestionsList.hidden = false;
    finishLoading();
}

/**
 * ==========================================================================
 * 5. EVENT LISTENERS
 * ==========================================================================
 */
document.addEventListener('DOMContentLoaded', function() {
    
    // --- Configuração de Imagens (Fallback) ---
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            if (this.src.includes(CONFIG.FALLBACK_IMAGE)) return;
            // console.warn(`Imagem falhou: ${this.src}. Usando fallback.`);
            this.src = CONFIG.FALLBACK_IMAGE;
            this.alt += " (Imagem indisponível)";
        });
    });

    // ---- Botão/Link "Ver detalhes" para produto1.html ----
    const slugify = (str) => {
        return String(str || '')
            .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .trim()
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');
    };
    document.querySelectorAll('.product-card').forEach(card => {
        const titleEl = card.querySelector('h3');
        const btn = card.querySelector('.btn-details');
        if (!titleEl || !btn) return;
        const nome = titleEl.textContent.trim();
        const slug = slugify(nome);
        const url = `produto1.html?produto=${encodeURIComponent(slug)}`;
        
        btn.textContent = 'Ver detalhes';
        btn.setAttribute('aria-label', `Ver detalhes de ${nome}`);
        btn.onclick = () => {
            if (window.dataLayer && Array.isArray(window.dataLayer)) {
                window.dataLayer.push({ event: 'view_details_click', product_name: nome, product_slug: slug });
            }
            window.location.assign(url);
        };
        btn.onkeydown = (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                btn.click();
            }
        };
    });

    // ---- Voltar ao topo (Footer) ----
    const backTop = document.getElementById('backToTop');
    if (backTop) {
        const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
        backTop.addEventListener('click', scrollTop);
        backTop.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                scrollTop();
            }
        });
    }

    // --- Modal ---
    const modal = document.getElementById('modalDetalhes');
    if (modal) {
        window.addEventListener('click', (e) => {
            if (e.target === modal) fecharModal();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') fecharModal();
        });
    }

    // --- Filtros de Categoria ---
    const filterButtons = document.querySelectorAll('.btn-filter');
    const products = document.querySelectorAll('.product-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const category = button.getAttribute('data-cat');
            products.forEach(card => {
                const cardCat = card.querySelector('.category-label').textContent.toLowerCase();
                // "todos" ou correspondência parcial (ex: "pele" em "CATEGORIA PELE")
                const shouldShow = category === 'todos' || cardCat.includes(category);
                card.style.display = shouldShow ? 'block' : 'none';
            });
        });
    });

    // --- Busca (Input, Histórico, Sugestões) ---
    const searchInput = document.getElementById('campoBuscaHeader');
    
    if (searchInput) {
        // Carrega histórico inicialmente
        loadSearchHistory();

        // Focus: mostra histórico se vazio
        searchInput.addEventListener('focus', () => {
            const historyContainer = document.getElementById('searchHistory');
            if (historyContainer && state.searchHistory.length > 0 && !searchInput.value) {
                historyContainer.hidden = false;
            }
        });

        // Blur: esconde painéis (com delay para permitir clique)
        searchInput.addEventListener('blur', () => {
            setTimeout(() => {
                const historyContainer = document.getElementById('searchHistory');
                const suggestionsList = document.getElementById('searchSuggestions');
                if (historyContainer) historyContainer.hidden = true;
                if (suggestionsList) suggestionsList.hidden = true;
            }, 200);
        });

        // Debounce para sugestões
        const debouncedSuggestions = debounce((term) => {
            renderSuggestions(term);
        }, 300);

        // Input: Filtra produtos + Mostra Sugestões + Gerencia Histórico
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            
            // UI Loading State
            const searchLoading = document.getElementById('searchLoading');
            const searchIcon = document.querySelector('.search-icon-btn');
            if (searchLoading) searchLoading.hidden = false;
            if (searchIcon) searchIcon.style.opacity = '0';
            
            // 1. Filtro em tempo real (UX original)
            products.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const cat = card.querySelector('.category-label').textContent.toLowerCase();
                const visible = title.includes(term) || cat.includes(term);
                card.style.display = visible ? 'block' : 'none';
            });

            // 2. Gerencia visibilidade do histórico
            const historyContainer = document.getElementById('searchHistory');
            if (historyContainer) {
                if (term.length === 0 && state.searchHistory.length > 0) {
                    historyContainer.hidden = false;
                } else {
                    historyContainer.hidden = true;
                }
            }

            // 3. Renderiza sugestões
            debouncedSuggestions(term);
        });
        
        // Enter: salva no histórico
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                saveSearchHistory(searchInput.value);
                const suggestionsList = document.getElementById('searchSuggestions');
                if (suggestionsList) suggestionsList.hidden = true;
                e.target.blur(); // Remove foco para esconder painéis
            }
        });
    }

    // --- Admin (Simulação) ---
    const adminArquivo = document.getElementById('adminArquivo');
    const adminPreviewImg = document.getElementById('adminPreviewImg');
    const adminSalvar = document.getElementById('adminSalvar');

    if (adminArquivo) {
        adminArquivo.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (!file) return;

            if (!['image/jpeg', 'image/png'].includes(file.type)) {
                alert('Formato inválido! Use apenas JPG ou PNG.');
                this.value = '';
                if (adminPreviewImg) adminPreviewImg.src = '';
                return;
            }

            const img = new Image();
            img.src = URL.createObjectURL(file);
            img.onload = function() {
                if (this.width < 800 || this.height < 600) {
                    alert(`Resolução baixa (${this.width}x${this.height}px). Mínimo exigido: 800x600px.`);
                }
                if (adminPreviewImg) adminPreviewImg.src = this.src;
            };
        });
    }

    if (adminSalvar) {
        adminSalvar.addEventListener('click', () => {
            if (!adminArquivo.files || adminArquivo.files.length === 0) {
                alert('Erro: Nenhuma imagem selecionada.');
                return;
            }
            alert('Banner salvo com sucesso! (Simulação)');
        });
    }

    // --- Smooth Scroll ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // --- Botões de Detalhes (Correção de acessibilidade) ---
    const detailButtons = document.querySelectorAll('.product-card .btn-details');
    detailButtons.forEach(btn => {
        const card = btn.closest('.product-card');
        const title = card && card.querySelector('h3') ? card.querySelector('h3').textContent.trim() : '';
        btn.setAttribute('aria-label', title ? `Ver detalhes de ${title}` : 'Ver detalhes do produto');
        btn.setAttribute('type', 'button');
        const onclickAttr = btn.getAttribute('onclick');
        let nome = title;
        let imagem = card && card.querySelector('img') ? card.querySelector('img').getAttribute('src') : CONFIG.FALLBACK_IMAGE;
        let descricao = card && card.querySelector('p') ? card.querySelector('p').textContent.trim() : '';
        let preco = '';
        if (onclickAttr) {
            const matches = onclickAttr.match(/'([^']*)'/g);
            if (matches && matches.length >= 4) {
                const args = matches.map(s => s.slice(1, -1));
                nome = args[0] || nome;
                imagem = args[1] || imagem;
                descricao = args[2] || descricao;
                preco = args[3] || '';
            }
            btn.removeAttribute('onclick');
        }
        const buyLinkEl = card ? card.querySelector('.btn-buy') : null;
        const buyLink = buyLinkEl ? buyLinkEl.getAttribute('href') : null;
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            abrirDetalhes(nome, imagem, descricao, preco, buyLink);
        });
        btn.setAttribute('tabindex', '0');
        btn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                btn.click();
            }
        });
    });

});
