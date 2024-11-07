document.addEventListener("DOMContentLoaded", function() {
    const cart = [];
    const cartCount = document.getElementById("cart-count");
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const checkoutButton = document.getElementById("checkout-button");

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function() {
            const product = this.closest(".product");
            const productName = product.getAttribute("data-name");
            const productPrice = parseFloat(product.getAttribute("data-price"));

            addToCart(productName, productPrice);
        });
    });

    function addToCart(name, price) {
        cart.push({ name, price });
        updateCart();
    }

    function updateCart() {
        cartCount.textContent = cart.length;
        cartItems.innerHTML = "";
        let total = 0;

        cart.forEach(item => {
            const cartItem = document.createElement("div");
            cartItem.textContent = `${item.name} - R$ ${item.price.toFixed(2)}`;
            cartItems.appendChild(cartItem);
            total += item.price;
        });

        cartTotal.textContent = total.toFixed(2);
        document.getElementById("cart").style.display = cart.length > 0 ? "block" : "none";
    }

    checkoutButton.addEventListener("click", function() {
        if (cart.length > 0) {
            alert("Compra finalizada com sucesso!");
            cart.length = 0;
            updateCart();
        } else {
            alert("Seu carrinho está vazio!");
        }
    });


    function finalizePurchase() {
        window.location.href = 'https://wa.me/5511976835325';
    }

    document.getElementById("contactForm").addEventListener("submit", function(event) {
        event.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        alert(`Obrigado por entrar em contato, ${name}!\nResponderemos em breve no email ${email}.`);
        document.getElementById("contactForm").reset();
    });

    // Filtro de categoria
    window.filterCategory = function(category) {
        document.querySelectorAll(".product").forEach(product => {
            if (category === "todos" || product.getAttribute("data-category") === category) {
                product.style.display = "inline-block";
            } else {
                product.style.display = "none";
            }
        });
    };

    function openComments() {
        var modal = document.getElementById('comments-modal');
        modal.style.display = 'block';
    }
    
    // Fecha o modal de comentários
    function closeComments() {
        var modal = document.getElementById('comments-modal');
        modal.style.display = 'none';
    }
    
    // Quando o usuário clicar em qualquer lugar fora do modal, ele será fechado
    window.onclick = function(event) {
        var modal = document.getElementById('comments-modal');
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
    
    // Barra de busca
    document.getElementById("search").addEventListener("input", function() {
        const searchTerm = this.value.toLowerCase();
        document.querySelectorAll(".product").forEach(product => {
            const productName = product.getAttribute("data-name").toLowerCase();
            if (productName.includes(searchTerm)) {
                product.style.display = "inline-block";
            } else {
                product.style.display = "none";
            }
        });
    });
});

function filterProducts(category) {
    const products = document.querySelectorAll('.product');
    products.forEach(product => {
        if (category === 'all' || product.dataset.category === category) {
            product.style.display = 'inline-block'; // Mantenha o estilo para que eles fiquem lado a lado
        } else {
            product.style.display = 'none';
        }
    });


// Adicionar pizza ao carrinho
function adicionarAoCarrinho(pizza) {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho.push(pizza);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    alert(`${pizza} adicionada ao carrinho!`);
}

// Finalizar compra e redirecionar para o WhatsApp
function finalizarCompra() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    if (carrinho.length === 0) {
        alert('Seu carrinho está vazio. Adicione itens antes de finalizar a compra.');
        return;
    }

    // Cria a mensagem para o WhatsApp
    const mensagem = `Gostaria de pedir as seguintes pizzas:\n${carrinho.join('\n')}`;
    const mensagemCodificada = encodeURIComponent(mensagem);
    const telefone = '551134370605'; // Substitua pelo seu número de telefone
    const urlWhatsApp = `https://api.whatsapp.com/send?phone=${telefone}&text=${mensagemCodificada}`;

    // Redireciona para o WhatsApp
    window.open(urlWhatsApp, '_blank');

    // Limpa o carrinho após finalizar (se desejar)
    localStorage.removeItem('carrinho'); 
    carregarCarrinho(); // Atualiza a lista do carrinho
    atualizarQuantidadeCarrinho(); // Atualiza a quantidade no menu
}

// Atualiza a quantidade no carrinho
function atualizarQuantidadeCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const quantidade = carrinho.length;
    document.getElementById('quantidade-carrinho').innerText = quantidade; // Supondo que você tenha um elemento com esse ID
}

// Carregar o carrinho ao iniciar
function carregarCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    // Código para exibir os itens do carrinho na página
}
}


