function filtrar(categoria) {
    var cards = document.querySelectorAll('.product-card');
    cards.forEach(function(card) {
        var cat = (card.getAttribute('data-cat') || '').toLowerCase();
        if (categoria === 'todos') {
            card.style.display = 'block';
        } else {
            card.style.display = cat.includes(String(categoria).toLowerCase()) ? 'block' : 'none';
        }
    });
}

function buscarProdutos() {
    var campo = document.getElementById("campoBusca") || document.getElementById("campoBuscaHeader");
    var termo = (campo && (campo.value || '') || '').toLowerCase();
    var cards = document.querySelectorAll('.product-card');
    cards.forEach(function(card) {
        var nome = (card.getAttribute("data-nome") || '').toLowerCase();
        var categorias = (card.getAttribute("data-cat") || '').toLowerCase();
        var texto = (card.innerText || '').toLowerCase();
        var ok = nome.includes(termo) || categorias.includes(termo) || texto.includes(termo);
        card.style.display = ok ? "block" : (termo ? "none" : "block");
    });
}
