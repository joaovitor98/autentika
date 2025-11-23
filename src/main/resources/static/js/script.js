// Estrutura de dados dos vestidos com suas fotos organizadas por posição
const dressData = {
    1: {
        name: 'Vestido 1',
        images: {
            frente: './images/vestido 1 frente.jpg',
            ladoDireito: './images/vestido 1 lado direito.jpg',
            costas: './images/vestido 1 costas.jpg',
            lado: './images/vestido 1 lado.jpg'
        },
        positions: ['frente', 'ladoDireito', 'costas', 'lado']
    },
    2: {
        name: 'Vestido 2',
        images: {
            frente: './images/vestido 2 frente.jpg',
            ladoDireito: './images/vestido 2 lado direito.jpg',
            costas: './images/vestido 2 costas.jpg'
        },
        positions: ['frente', 'ladoDireito', 'costas']
    },
    3: {
        name: 'Vestido 3',
        images: {
            frente: './images/vestido 3 frente.jpg',
            ladoDireito: './images/vestido 3 lado direito.jpg',
            costas: './images/vestido 3 costas.jpg'
        },
        positions: ['frente', 'ladoDireito', 'costas']
    },
    4: {
        name: 'Vestido 4',
        images: {
            frente: './images/vestido 4 frente.jpg',
            ladoDireito: './images/vestido 4 lado direito.jpg',
            ladoEsquerdo: './images/vestido 4 lado esquerdo.jpg',
            costas: './images/vestido 4 costas.jpg'
        },
        positions: ['frente', 'ladoDireito', 'ladoEsquerdo', 'costas']
    },
    5: {
        name: 'Vestido 5',
        images: {
            frente: './images/vestido 5 frente.jpg',
            ladoEsquerdo: './images/vesido 5 lado esquerdo.jpg',
            costas: './images/vestido 5 costas.jpg'
        },
        positions: ['frente', 'ladoEsquerdo', 'costas']
    },
    6: {
        name: 'Vestido 6',
        images: {
            frente: './images/vestido 6 frente.jpg',
            ladoDireito: './images/vestido 6 lado direito.jpg',
            ladoEsquerdo: './images/vestido 6 lado esquerdo.jpg'
        },
        positions: ['frente', 'ladoDireito', 'ladoEsquerdo']
    }
};

// Mapeamento de categorias para vestidos (casual, festa, etc. -> vestido 1-6)
const categoryToDress = {
    'casual': 1,
    'festa': 2,
    'formal': 3,
    'curto': 4,
    'longo': 5,
    'tubinho': 6,
    'babydoll': 1,
    'midi': 2,
    'slip-dress': 3
};

// Armazena a posição atual de cada vestido
const dressCurrentPosition = {};

// Sistema de carrinho
let cart = [];
let currentProduct = null;

// Preços aleatórios para os produtos
const productPrices = {
    'casual': 89.90,
    'festa': 159.90,
    'formal': 199.90,
    'curto': 79.90,
    'longo': 189.90,
    'tubinho': 129.90,
    'babydoll': 99.90,
    'midi': 149.90,
    'slip-dress': 119.90
};

// Descriptions dos produtos
const productDescriptions = {
    'casual': 'Vestido casual perfeito para o dia a dia. Confortável e elegante, ideal para qualquer ocasião.',
    'festa': 'Vestido de festa deslumbrante que fará você brilhar em qualquer evento especial.',
    'formal': 'Vestido formal sofisticado para ocasiões importantes e eventos corporativos.',
    'curto': 'Vestido curto moderno e versátil, perfeito para jovens e descontraído.',
    'longo': 'Vestido longo elegante e clássico, ideal para eventos formais e especiais.',
    'tubinho': 'Vestido tubinho clássico que nunca sai de moda, perfeito para qualquer ocasião.',
    'babydoll': 'Vestido babydoll fofo e feminino, ideal para looks românticos e delicados.',
    'midi': 'Vestido midi versátil e elegante, perfeito para transição entre estações.',
    'slip-dress': 'Vestido slip dress minimalista e sofisticado, ideal para looks modernos.'
};

// Função para mudar a posição do vestido (360 graus)
function changeDressImage(element) {
    const dressItem = element.closest('.dress-item');
    const category = dressItem.getAttribute('data-category');
    const dressNumber = categoryToDress[category] || 1;
    const dress = dressData[dressNumber];

    if (!dress) return;

    const img = element.querySelector('.dress-image');

    // Inicializa a posição atual se não existir
    if (!dressCurrentPosition[dressNumber]) {
        dressCurrentPosition[dressNumber] = 0;
    }

    // Avança para a próxima posição
    dressCurrentPosition[dressNumber] = (dressCurrentPosition[dressNumber] + 1) % dress.positions.length;
    const currentPosition = dress.positions[dressCurrentPosition[dressNumber]];

    // Atualiza a imagem
    img.src = dress.images[currentPosition];

    // Adiciona animação de feedback
    element.classList.add('clicked');

    // Remove a animação após completar
    setTimeout(() => {
        element.classList.remove('clicked');
    }, 500);

    // Mostra feedback visual
    showImageFeedback(element, dress.images[currentPosition]);
}

// Função para mostrar feedback visual da imagem selecionada
function showImageFeedback(element, imageSrc) {
    // Cria um elemento temporário para mostrar o feedback
    const feedback = document.createElement('div');
    feedback.style.cssText = `
        position: absolute;
        top: -30px;
        left: 50%;
        transform: translateX(-50%);
        background-color: #D4AF37;
        color: white;
        padding: 5px 10px;
        border-radius: 15px;
        font-size: 12px;
        font-weight: bold;
        z-index: 1000;
        animation: fadeInOut 2s ease forwards;
    `;
    feedback.textContent = 'Nova imagem!';

    // Adiciona o feedback ao elemento pai
    element.parentElement.style.position = 'relative';
    element.parentElement.appendChild(feedback);

    // Remove o feedback após 2 segundos
    setTimeout(() => {
        if (feedback.parentElement) {
            feedback.parentElement.removeChild(feedback);
        }
    }, 2000);
}

// Função para abrir modal do produto
function openProductModal(element) {
    const category = element.closest('.dress-item').getAttribute('data-category');
    const imageSrc = element.querySelector('.dress-image').src;
    const productName = element.closest('.dress-item').querySelector('.dress-label').textContent;
    const dressNumber = categoryToDress[category] || 1;
    const dress = dressData[dressNumber];

    let basePrice = productPrices[category] || 99.90;
    let finalPrice = basePrice;
    let discount = 0;
    let discountPercent = 0;

    // Verifica se está no modo Black Friday
    if (document.body.classList.contains('theme-blackfriday')) {
        // Descontos disponíveis: 30%, 20%, 10%
        const discounts = [30, 20, 10];
        // Seleciona um desconto aleatório
        discountPercent = discounts[Math.floor(Math.random() * discounts.length)];
        discount = (basePrice * discountPercent) / 100;
        finalPrice = basePrice - discount;
    }

    // Inicializa a posição atual se não existir
    if (!dressCurrentPosition[dressNumber]) {
        dressCurrentPosition[dressNumber] = 0;
    }

    currentProduct = {
        category: category,
        name: productName,
        image: imageSrc,
        price: finalPrice,
        originalPrice: basePrice,
        discount: discount,
        discountPercent: discountPercent,
        description: productDescriptions[category] || 'Produto de alta qualidade da AutêntikA.',
        dressNumber: dressNumber,
        dress: dress
    };

    // Preenche o modal com os dados do produto
    document.getElementById('productMainImage').src = currentProduct.image;
    document.getElementById('productName').textContent = currentProduct.name;

    // Atualiza o preço com desconto se houver
    const priceElement = document.getElementById('productPrice');
    if (discountPercent > 0) {
        priceElement.innerHTML = `
            <span style="text-decoration: line-through; color: #999; font-size: 0.9em; margin-right: 10px;">
                R$ ${basePrice.toFixed(2).replace('.', ',')}
            </span>
            <span style="color: #ff2b2b; font-weight: bold;">
                R$ ${finalPrice.toFixed(2).replace('.', ',')}
            </span>
            <span style="display: block; color: #ff2b2b; font-size: 0.85em; margin-top: 5px;">
                ${discountPercent}% OFF - BLACK FRIDAY!
            </span>
        `;
    } else {
        priceElement.textContent = `R$ ${finalPrice.toFixed(2).replace('.', ',')}`;
    }

    document.getElementById('productDescription').textContent = currentProduct.description;

    // Remove as opções de cores
    const colorVariants = document.querySelector('.color-variants');
    if (colorVariants) {
        colorVariants.style.display = 'none';
    }

    // Adiciona indicador de clique na imagem
    const productImage = document.getElementById('productMainImage');
    productImage.style.cursor = 'pointer';
    productImage.title = 'Clique para ver outras posições';

    // Mostra o modal
    document.getElementById('productModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Função para fechar modal do produto
function closeProductModal() {
    document.getElementById('productModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Função removida - não usamos mais troca de cores

// Função para adicionar ao carrinho
function addToCart() {
    if (!currentProduct) return;

    const existingItem = cart.find(item => item.category === currentProduct.category);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...currentProduct,
            quantity: 1,
            id: Date.now() + Math.random()
        });
    }

    updateCartCount();
    showCartFeedback();
    closeProductModal();
}

// Função para comprar agora
function buyNow() {
    addToCart();
    openCartModal();
}

// Função para mostrar feedback do carrinho
function showCartFeedback() {
    const feedback = document.createElement('div');
    feedback.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: #28a745;
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        font-weight: bold;
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
    `;
    feedback.textContent = 'Produto adicionado ao carrinho!';

    document.body.appendChild(feedback);

    setTimeout(() => {
        feedback.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(feedback);
        }, 300);
    }, 2000);
}

// Função para abrir modal do carrinho
function openCartModal() {
    updateCartDisplay();
    document.getElementById('cartModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Função para fechar modal do carrinho
function closeCartModal() {
    document.getElementById('cartModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Função para atualizar contador do carrinho
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = totalItems;
}

// Função para atualizar exibição do carrinho
function updateCartDisplay() {
    const cartBody = document.getElementById('cartBody');
    const cartTotal = document.getElementById('cartTotal');

    if (cart.length === 0) {
        cartBody.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">Carrinho vazio</p>';
        cartTotal.textContent = 'Total: R$ 0,00';
        return;
    }

    cartBody.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">R$ ${item.price.toFixed(2).replace('.', ',')} x ${item.quantity}</div>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart('${item.id}')">&times;</button>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `Total: R$ ${total.toFixed(2).replace('.', ',')}`;
}

// Função para remover item do carrinho
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCartCount();
    updateCartDisplay();
}

// Função para aplicar desconto
function applyDiscount() {
    const discountCode = document.getElementById('discountCode').value.toLowerCase();
    const discountCodes = {
        'autentika10': 0.1,
        'desconto20': 0.2,
        'promocao30': 0.3
    };

    if (discountCodes[discountCode]) {
        const discount = discountCodes[discountCode];
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const discountAmount = total * discount;
        const finalTotal = total - discountAmount;

        document.getElementById('cartTotal').innerHTML = `
            <div style="text-decoration: line-through; color: #999;">Total: R$ ${total.toFixed(2).replace('.', ',')}</div>
            <div style="color: #28a745;">Desconto: R$ ${discountAmount.toFixed(2).replace('.', ',')}</div>
            <div style="font-weight: bold;">Total Final: R$ ${finalTotal.toFixed(2).replace('.', ',')}</div>
        `;

        // Desabilita o campo de desconto
        document.getElementById('discountCode').disabled = true;
        document.querySelector('.btn-apply-discount').disabled = true;
        document.querySelector('.btn-apply-discount').textContent = 'Desconto Aplicado!';
    } else {
        alert('Código de desconto inválido!');
    }
}

// Função para finalizar compra
function checkout() {
    if (cart.length === 0) {
        alert('Carrinho vazio!');
        return;
    }

    // Simula processo de checkout
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`Compra finalizada! Total: R$ ${total.toFixed(2).replace('.', ',')}\n\nObrigado por comprar na AutêntikA!`);

    // Limpa o carrinho
    cart = [];
    updateCartCount();
    updateCartDisplay();
    closeCartModal();
}

// Função para buscar CEP
async function searchCEP(cep) {
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (data.erro) {
            throw new Error('CEP não encontrado');
        }

        return {
            logradouro: data.logradouro,
            bairro: data.bairro,
            cidade: data.localidade,
            uf: data.uf
        };
    } catch (error) {
        console.error('Erro ao buscar CEP:', error);
        return null;
    }
}

// Função para buscar CEP no carrinho
async function searchCEPAddress() {
    const cepInput = document.getElementById('cepInput');
    const cep = cepInput.value.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (cep.length !== 8) {
        alert('Por favor, digite um CEP válido com 8 dígitos.');
        return;
    }

    const searchButton = document.querySelector('.btn-search-cep');
    const originalText = searchButton.textContent;

    searchButton.textContent = 'Buscando...';
    searchButton.disabled = true;

    try {
        const endereco = await searchCEP(cep);

        if (endereco) {
            document.getElementById('streetInput').value = endereco.logradouro;
            document.getElementById('neighborhoodInput').value = endereco.bairro;
            document.getElementById('cityInput').value = endereco.cidade;
            document.getElementById('stateInput').value = endereco.uf;

            // Foca no campo número após preencher
            document.getElementById('numberInput').focus();

            showAddressFeedback('Endereço encontrado com sucesso!', 'success');
        } else {
            showAddressFeedback('CEP não encontrado. Verifique o número digitado.', 'error');
        }
    } catch (error) {
        showAddressFeedback('Erro ao buscar CEP. Tente novamente.', 'error');
    } finally {
        searchButton.textContent = originalText;
        searchButton.disabled = false;
    }
}

// Função para mostrar feedback do endereço
function showAddressFeedback(message, type) {
    const feedback = document.createElement('div');
    feedback.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: ${type === 'success' ? '#28a745' : '#dc3545'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        font-weight: bold;
        z-index: 10000;
        animation: fadeInOut 2s ease-out;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
    `;
    feedback.textContent = message;

    document.body.appendChild(feedback);

    setTimeout(() => {
        document.body.removeChild(feedback);
    }, 2000);
}

// Função para formatar CEP automaticamente
function formatCEP(input) {
    let value = input.value.replace(/\D/g, '');
    value = value.replace(/(\d{5})(\d)/, '$1-$2');
    input.value = value;
}

// Função para scroll suave para seções
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Função para inicializar imagens dos vestidos
function initializeDressImages() {
    const dressContainers = document.querySelectorAll('.dress-image-container');

    dressContainers.forEach((container, index) => {
        const dressItem = container.closest('.dress-item');
        const category = dressItem.getAttribute('data-category');
        const dressNumber = categoryToDress[category] || 1;
        const dress = dressData[dressNumber];

        if (dress) {
            // Inicializa com a primeira posição (frente)
            dressCurrentPosition[dressNumber] = 0;
            const img = container.querySelector('.dress-image');
            const firstPosition = dress.positions[0];
            img.src = dress.images[firstPosition];
        }

        // Adiciona um pequeno delay para criar um efeito de "cascata"
        setTimeout(() => {
            container.style.opacity = '0';
            container.style.transform = 'scale(0.8)';
            container.style.transition = 'all 0.5s ease';

            setTimeout(() => {
                container.style.opacity = '1';
                container.style.transform = 'scale(1)';
            }, 100);
        }, index * 100);
    });
}

// Função para lidar com o formulário de contato
function handleContactForm(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    // Validação básica
    const nome = formData.get('nome');
    const email = formData.get('email');
    const mensagem = formData.get('mensagem');

    if (!nome || !email || !mensagem) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    // Validação de email simples
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Por favor, insira um e-mail válido.');
        return;
    }

    // Simula o envio do formulário
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;

    submitButton.textContent = 'Enviando...';
    submitButton.disabled = true;

    setTimeout(() => {
        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        form.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 2000);
}

// Função para adicionar efeitos de hover nos vestidos
function addDressHoverEffects() {
    const dressContainers = document.querySelectorAll('.dress-image-container');

    dressContainers.forEach(container => {
        container.addEventListener('mouseenter', function () {
            this.style.transform = 'scale(1.05) rotate(2deg)';
            this.style.boxShadow = '0 10px 25px rgba(0,0,0,0.3)';
        });

        container.addEventListener('mouseleave', function () {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
        });
    });
}

// Função para adicionar navegação suave
function addSmoothNavigation() {
    const navLinks = document.querySelectorAll('.nav a');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Se o link é para outra página (contém .html) ou não tem #, permite navegação normal
            if (href.includes('.html') || !href.includes('#')) {
                return; // Permite navegação normal
            }

            // Se é um link âncora na mesma página, faz scroll suave
            e.preventDefault();
            const targetId = href.substring(1);
            scrollToSection(targetId);
        });
    });
}

// Função para adicionar animações de scroll
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observa todas as seções, exceto "Quem Somos" que tem sua própria animação
    const sections = document.querySelectorAll('.section:not(.quem-somos-section)');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease';
        observer.observe(section);
    });

    // Garante que Quem Somos esteja sempre visível
    const quemSomosSection = document.querySelector('.quem-somos-section');
    if (quemSomosSection) {
        quemSomosSection.style.opacity = '1';
        quemSomosSection.style.transform = 'translateY(0)';
    }
}

// Função para adicionar efeito de parallax no hero
function addParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const rate = scrolled * -0.5;

        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Função para adicionar contador de cliques nos vestidos
function addClickCounter() {
    const dressContainers = document.querySelectorAll('.dress-image-container');
    let totalClicks = 0;

    dressContainers.forEach(container => {
        container.addEventListener('click', () => {
            totalClicks++;

            // Atualiza um contador visual (opcional)
            const counter = document.getElementById('click-counter');
            if (counter) {
                counter.textContent = `Vestidos personalizados: ${totalClicks}`;
            }
        });
    });
}

// Função para adicionar modo escuro (bonus)
function addDarkModeToggle() {
    const headerActions = document.querySelector('.header-actions');
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'theme-toggle';
    btn.setAttribute('aria-label', 'Alternar tema');
    btn.setAttribute('aria-pressed', document.body.classList.contains('dark-mode') ? 'true' : 'false');
    btn.innerHTML = `
        <span class="icon-sun" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="currentColor" preserveAspectRatio="xMidYMid meet" focusable="false">
                <circle cx="12" cy="12" r="5"></circle>
                <path d="M12 1v3M12 20v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M1 12h3M20 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"></path>
            </svg>
        </span>
        <span class="icon-moon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="currentColor" preserveAspectRatio="xMidYMid meet" focusable="false">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
        </span>
    `;
    if (document.body.classList.contains('dark-mode')) {
        btn.classList.add('is-dark');
    }
    if (headerActions) {
        headerActions.appendChild(btn);
    } else {
        document.body.appendChild(btn);
        btn.style.position = 'fixed';
        btn.style.top = '15px';
        btn.style.right = '20px';
    }
    btn.addEventListener('click', function () {
        const wantDark = !document.body.classList.contains('dark-mode');
        window.setColorScheme(wantDark ? 'dark' : 'light');
        const isDark = document.body.classList.contains('dark-mode');
        btn.classList.toggle('is-dark', isDark);
        btn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
    });
    btn.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            btn.click();
        }
    });
}

// Função para ativar animações dos capítulos quando visíveis
function addStoryChapterAnimations() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const chapters = entry.target.querySelectorAll('.story-chapter');
                chapters.forEach((chapter, index) => {
                    // Força a animação mesmo que já tenha carregado
                    chapter.style.opacity = '0';
                    chapter.style.animation = 'none';

                    setTimeout(() => {
                        chapter.style.animation = '';
                        chapter.style.animationDelay = `${0.3 + index * 0.2}s`;
                    }, 50);
                });

                // Para de observar depois que ativou
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const quemSomosSection = document.querySelector('.quem-somos-section');
    if (quemSomosSection) {
        observer.observe(quemSomosSection);
    }
}

// Função para verificar e atualizar status de login no header
function updateLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const usuarioStr = localStorage.getItem('usuario');
    const headerActions = document.querySelector('.header-actions .user-menu-text');

    if (headerActions) {
        if (isLoggedIn && usuarioStr) {
            try {
                const usuario = JSON.parse(usuarioStr);
                const userName = usuario.nome || 'Usuário';

                // Atualiza o header para mostrar que está logado
                headerActions.innerHTML = `
                    <span class="user-greeting">Olá, <span id="userNameDisplay">${userName}</span></span>
                    <span class="user-subtext"><a href="perfil.html" class="user-link">Meu Perfil</a> | <a href="#" class="user-link" onclick="logout()">Sair</a></span>
                `;
            } catch (e) {
                console.error('Erro ao parsear usuário:', e);
                // Se houver erro, mostra opção de login
                headerActions.innerHTML = `
                    <span class="user-greeting">Olá, faça seu <a href="login.html" class="user-link">login</a></span>
                    <span class="user-subtext">ou <a href="cadastro.html" class="user-link">cadastre-se</a></span>
                `;
            }
        } else {
            // Se não estiver logado, mostra opção de login
            headerActions.innerHTML = `
                <span class="user-greeting">Olá, faça seu <a href="login.html" class="user-link">login</a></span>
                <span class="user-subtext">ou <a href="cadastro.html" class="user-link">cadastre-se</a></span>
            `;
        }
    }
}

// Função de logout (para ser usada no header)
function logout() {
    localStorage.removeItem('usuarioId');
    localStorage.removeItem('usuario');
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'index.html';
}

function initResponsiveMenu() {
    const nav = document.querySelector('.nav');
    const toggle = document.getElementById('menuToggleBtn');
    if (!nav || !toggle) return;

    const openMenu = () => {
        nav.classList.add('open');
        toggle.setAttribute('aria-expanded', 'true');
        document.addEventListener('keydown', onKeyDown);
    };
    const closeMenu = () => {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.removeEventListener('keydown', onKeyDown);
    };
    const onKeyDown = (e) => {
        if (e.key === 'Escape') closeMenu();
        if ((e.key === 'Enter' || e.key === ' ') && document.activeElement === toggle) {
            e.preventDefault(); toggle.click();
        }
    };

    toggle.addEventListener('click', () => {
        const isOpen = nav.classList.contains('open');
        isOpen ? closeMenu() : openMenu();
    });

    nav.addEventListener('click', (e) => {
        const target = e.target.closest('a');
        if (target) closeMenu();
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024) closeMenu();
    }, { passive: true });
}

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function () {
    // Atualiza status de login no header
    updateLoginStatus();

    initResponsiveMenu();

    // Inicializa as imagens dos vestidos
    initializeDressImages();

    // Adiciona efeitos de hover
    addDressHoverEffects();

    // Adiciona navegação suave
    addSmoothNavigation();

    // Adiciona animações de scroll
    addScrollAnimations();

    // Adiciona animações específicas dos capítulos
    addStoryChapterAnimations();

    // Adiciona efeito parallax
    addParallaxEffect();

    // Adiciona contador de cliques
    addClickCounter();

    // Adiciona modo escuro
    addDarkModeToggle();

    // Configura o formulário de contato
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }

    // Adiciona eventos para abrir modal do produto
    const dressContainers = document.querySelectorAll('.dress-image-container');
    dressContainers.forEach(container => {
        container.addEventListener('click', function () {
            openProductModal(this);
        });
    });

    // Adiciona evento para mudar posição do vestido no modal
    const productImage = document.getElementById('productMainImage');
    if (productImage) {
        productImage.addEventListener('click', function() {
            if (currentProduct && currentProduct.dress) {
                const dressNumber = currentProduct.dressNumber;
                const dress = currentProduct.dress;

                // Avança para a próxima posição
                dressCurrentPosition[dressNumber] = (dressCurrentPosition[dressNumber] + 1) % dress.positions.length;
                const currentPosition = dress.positions[dressCurrentPosition[dressNumber]];

                // Atualiza a imagem no modal
                this.src = dress.images[currentPosition];
                currentProduct.image = dress.images[currentPosition];

                // Adiciona efeito de transição
                this.style.opacity = '0.7';
                setTimeout(() => {
                    this.style.opacity = '1';
                }, 200);
            }
        });
    }

    // Fecha modais ao clicar fora
    window.addEventListener('click', function (event) {
        const productModal = document.getElementById('productModal');
        const cartModal = document.getElementById('cartModal');

        if (event.target === productModal) {
            closeProductModal();
        }
        if (event.target === cartModal) {
            closeCartModal();
        }
    });

    // Formata CEP automaticamente
    const cepInput = document.getElementById('cepInput');
    if (cepInput) {
        cepInput.addEventListener('input', function () {
            formatCEP(this);
        });

        // Busca CEP ao pressionar Enter
        cepInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                searchCEPAddress();
            }
        });
    }

    // Inicializa o sistema de temas sazonais (Black Friday e Natal)
    initializeThemeSwitcher();

    console.log('Site AutêntikA carregado com sucesso! 🎉');
});

// --------- Temas Sazonais (Black Friday e Natal) ----------
function initializeThemeSwitcher() {
    const savedTheme = localStorage.getItem('autentikaTheme');
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        applyTheme('default');
    }

    // Settings modal trigger
    const openSettings = document.getElementById('openSettingsModal');
    if (openSettings) {
        openSettings.addEventListener('click', (e) => {
            e.preventDefault();
            openSettingsModal();
        });
    }
}

// Modal de Configurações
function openSettingsModal() {
    const modal = document.getElementById('settingsModal');
    if (!modal) return;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    setTimeout(() => modal.classList.add('visible'), 10);
    window.addEventListener('keydown', escCloseSettings);
    modal.addEventListener('click', outsideCloseSettings);
    const scheme = getColorSchemePreference();
    const lightBtn = document.getElementById('schemeLightBtn');
    const darkBtn = document.getElementById('schemeDarkBtn');
    if (lightBtn && darkBtn) {
        lightBtn.classList.toggle('active', scheme === 'light');
        darkBtn.classList.toggle('active', scheme === 'dark');
    }
}

function closeSettingsModal() {
    const modal = document.getElementById('settingsModal');
    if (!modal) return;
    modal.classList.remove('visible');
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }, 200);
    window.removeEventListener('keydown', escCloseSettings);
    modal.removeEventListener('click', outsideCloseSettings);
}

function escCloseSettings(e) {
    if (e.key === 'Escape') closeSettingsModal();
}

function outsideCloseSettings(e) {
    if (e.target && e.target.id === 'settingsModal') {
        closeSettingsModal();
    }
}

function clearThemes() {
    document.body.classList.remove('theme-blackfriday', 'theme-natal', 'dark-mode', 'theme-light');
    const banner = document.getElementById('promoBanner');
    if (banner) {
        banner.style.display = 'none';
        document.getElementById('promoContent').innerHTML = '';
    }
    // Remove guirlanda de natal se existir
    const garland = document.getElementById('natal-garland');
    if (garland && garland.parentElement) {
        garland.parentElement.removeChild(garland);
    }
    // Remove neve se existir
    const snow = document.getElementById('snow-container');
    if (snow && snow.parentElement) {
        snow.parentElement.removeChild(snow);
    }
    // Remove partículas do Black Friday se existir
    const particles = document.getElementById('bf-particles');
    if (particles && particles.parentElement) {
        particles.parentElement.removeChild(particles);
    }
    // Remove estrelas de natal se existir
    const stars = document.getElementById('natal-stars');
    if (stars && stars.parentElement) {
        stars.parentElement.removeChild(stars);
    }
}

 
function getColorSchemePreference() {
    const saved = localStorage.getItem('autentikaColorScheme');
    return saved === 'dark' ? 'dark' : 'light';
}

function setColorSchemePreference(mode) {
    localStorage.setItem('autentikaColorScheme', mode === 'dark' ? 'dark' : 'light');
}

function applySchemeForTheme(theme, scheme) {
    if (theme === 'blackfriday') {
        document.body.classList.add('theme-blackfriday');
        showPromoBanner(`
            <div class="promo-marquee">
                <span>BLACK FRIDAY AUTÊNTIKA • DESCONTOS IMPERDÍVEIS • ATÉ 70% OFF • CORRA! • </span>
                <span>BLACK FRIDAY AUTÊNTIKA • DESCONTOS IMPERDÍVEIS • ATÉ 70% OFF • CORRA! • </span>
                <span>BLACK FRIDAY AUTÊNTIKA • DESCONTOS IMPERDÍVEIS • ATÉ 70% OFF • CORRA! • </span>
                <span>BLACK FRIDAY AUTÊNTIKA • DESCONTOS IMPERDÍVEIS • ATÉ 70% OFF • CORRA! • </span>
            </div>
        `);
        addBlackFridayParticles();
    }

    if (theme === 'natal') {
        document.body.classList.add('theme-natal');
        const natalText = 'Feliz Natal! Frete GRÁTIS e ofertas especiais 🎄✨';
        showPromoBanner(`
            <div class="promo-marquee">
                <span class="promo-natal-text">${natalText} • </span>
                <span class="promo-natal-text">${natalText} • </span>
                <span class="promo-natal-text">${natalText} • </span>
                <span class="promo-natal-text">${natalText} • </span>
                <span class="promo-natal-text">${natalText} • </span>
                <span class="promo-natal-text">${natalText} • </span>
            </div>
        `);
        addChristmasGarland();
        addSnow();
        addNatalStars();
    } else {
    }

    if (scheme === 'dark') {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('theme-light');
    } else {
        document.body.classList.add('theme-light');
        document.body.classList.remove('dark-mode');
    }
}

window.applyTheme = function(theme) {
    console.log('Aplicando tema:', theme);
    clearThemes();
    const scheme = getColorSchemePreference();
    applySchemeForTheme(theme, scheme);
    localStorage.setItem('autentikaTheme', theme);
    closeSettingsModal();
};

 
window.setColorScheme = function(mode) {
    setColorSchemePreference(mode);
    const currentTheme = localStorage.getItem('autentikaTheme') || 'default';
    clearThemes();
    const scheme = getColorSchemePreference();
    applySchemeForTheme(currentTheme, scheme);
    const lightBtn = document.getElementById('schemeLightBtn');
    const darkBtn = document.getElementById('schemeDarkBtn');
    if (lightBtn && darkBtn) {
        lightBtn.classList.toggle('active', scheme === 'light');
        darkBtn.classList.toggle('active', scheme === 'dark');
    }
};

 
function runThemeTests() {
    const results = [];
    function assert(name, cond) { results.push(`${cond ? '✓' : '✗'} ${name}`); }

    setColorSchemePreference('light');
    clearThemes();
    applySchemeForTheme('blackfriday', getColorSchemePreference());
    assert('Black Friday respeita modo claro', document.body.classList.contains('theme-light') && !document.body.classList.contains('dark-mode'));
    const bfGearLight = document.getElementById('openSettingsModal');
    const bfUserTextLight = document.querySelector('.header-actions .user-menu-text');
    if (bfGearLight && bfUserTextLight) {
        const gearColor = getComputedStyle(bfGearLight).color;
        const userColor = getComputedStyle(bfUserTextLight).color;
        assert('Texto do usuário igual à cor do ícone (BF claro)', gearColor === userColor, `${gearColor} vs ${userColor}`);
    }

    setColorSchemePreference('dark');
    clearThemes();
    applySchemeForTheme('blackfriday', getColorSchemePreference());
    assert('Black Friday respeita modo escuro', document.body.classList.contains('dark-mode') && !document.body.classList.contains('theme-light'));

    setColorSchemePreference('light');
    clearThemes();
    applySchemeForTheme('natal', getColorSchemePreference());
    assert('Natal respeita modo claro', document.body.classList.contains('theme-light') && !document.body.classList.contains('dark-mode'));

    setColorSchemePreference('dark');
    clearThemes();
    applySchemeForTheme('natal', getColorSchemePreference());
    assert('Natal respeita modo escuro', document.body.classList.contains('dark-mode') && !document.body.classList.contains('theme-light'));

    setColorSchemePreference('dark');
    clearThemes();
    applySchemeForTheme('default', getColorSchemePreference());
    assert('Modo escuro preservado fora de promoções', document.body.classList.contains('dark-mode'));

    setColorSchemePreference('light');
    clearThemes();
    applySchemeForTheme('natal', getColorSchemePreference());
    assert('Tema Natal respeita modo claro', document.body.classList.contains('theme-light'));

    console.log('Theme tests:', results);
}

if (window.location.search.includes('themetest=1')) {
    runThemeTests();
}

function parseColorToRGB(color) {
    const ctx = document.createElement('canvas').getContext('2d');
    ctx.fillStyle = color;
    const computed = ctx.fillStyle; // normaliza
    const m = computed.match(/^#([0-9a-f]{6})$/i);
    if (m) {
        const hex = m[1];
        return [
            parseInt(hex.slice(0,2), 16),
            parseInt(hex.slice(2,4), 16),
            parseInt(hex.slice(4,6), 16)
        ];
    }
    const rgb = computed.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/i);
    if (rgb) return [Number(rgb[1]), Number(rgb[2]), Number(rgb[3])];
    return [0,0,0];
}

function relativeLuminance([r,g,b]) {
    const srgb = [r,g,b].map(v => v/255).map(v => v <= 0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055, 2.4));
    return 0.2126*srgb[0] + 0.7152*srgb[1] + 0.0722*srgb[2];
}

function contrastRatio(c1, c2) {
    const L1 = relativeLuminance(parseColorToRGB(c1));
    const L2 = relativeLuminance(parseColorToRGB(c2));
    const [max, min] = L1 >= L2 ? [L1, L2] : [L2, L1];
    return (max + 0.05) / (min + 0.05);
}

function getBackgroundColor(el) {
    const cs = getComputedStyle(el);
    let bg = cs.backgroundColor;
    if (!bg || bg === 'rgba(0, 0, 0, 0)' || bg === 'transparent') {
        if (el.parentElement) return getBackgroundColor(el.parentElement);
        return 'rgb(255,255,255)';
    }
    return bg;
}

function runNatalAccessibilityTests() {
    const results = [];
    function assert(name, cond, extra) { results.push(`${cond ? '✓' : '✗'} ${name}${extra ? ' ('+extra+')' : ''}`); }

    clearThemes();
    setColorSchemePreference('light');
    applySchemeForTheme('natal', 'light');

    const selectors = [
        '.theme-natal.theme-light .hero-text h2',
        '.theme-natal.theme-light .section',
        '.theme-natal.theme-light .product-modal-content',
        '.theme-natal.theme-light .auth-card',
        '.theme-natal.theme-light .footer',
        '.theme-natal.theme-light .user-greeting',
        '.theme-natal.theme-light .user-link',
        '.theme-natal.theme-light .close-modal'
    ];
    selectors.forEach(sel => {
        const el = document.querySelector(sel);
        if (!el) {
            assert(`Elemento não encontrado: ${sel}`, false);
            return;
        }
        const cs = getComputedStyle(el);
        const fg = cs.color;
        const bg = getBackgroundColor(el);
        const ratio = contrastRatio(fg, bg);
        assert(`Contraste adequado em ${sel}`, ratio >= 4.5, `ratio=${ratio.toFixed(2)}`);
        assert(`Cor segue ícones em ${sel}`, /#0f7b2d|rgb\(15,\s*123,\s*45\)/i.test(fg));
    });

    console.log('Natal A11y tests:', results);
}

if (window.location.search.includes('natalA11y=1')) {
    runNatalAccessibilityTests();
}

// Partículas para Black Friday
function addBlackFridayParticles() {
    if (document.getElementById('bf-particles')) return;
    const container = document.createElement('div');
    container.id = 'bf-particles';
    container.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 2;
        overflow: hidden;
    `;

    // Adiciona keyframes se não existir
    if (!document.getElementById('bf-particle-animation')) {
        const style = document.createElement('style');
        style.id = 'bf-particle-animation';
        style.textContent = `
            @keyframes bfParticleFall {
                0% {
                    transform: translateY(0) translateX(0) scale(1);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(110vh) translateX(var(--particle-x, 0px)) scale(0);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 4 + 2;
        const left = Math.random() * 100;
        const duration = (10 + Math.random() * 20).toFixed(2);
        const delay = Math.random() * 5;
        const opacity = 0.3 + Math.random() * 0.4;
        const randomX = (Math.random() * 100 - 50).toFixed(2);

        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, #ff2b2b, transparent);
            border-radius: 50%;
            left: ${left}%;
            top: -10px;
            opacity: ${opacity};
            --particle-x: ${randomX}px;
            animation: bfParticleFall ${duration}s linear infinite;
            animation-delay: ${delay}s;
            box-shadow: 0 0 10px rgba(255,43,43,0.8);
        `;
        container.appendChild(particle);
    }

    document.body.appendChild(container);
}

// Estrelas para Natal
function addNatalStars() {
    if (document.getElementById('natal-stars')) return;
    const container = document.createElement('div');
    container.id = 'natal-stars';
    container.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 2;
        overflow: hidden;
    `;

    const starCount = 10; // Reduzido para melhor performance
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        const size = Math.random() * 3 + 2;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const duration = (2 + Math.random() * 3).toFixed(2);
        const delay = Math.random() * 2;

        star.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${left}%;
            top: ${top}%;
            background: radial-gradient(circle, #FFD700, transparent);
            border-radius: 50%;
            animation: starTwinkle ${duration}s ease-in-out infinite;
            animation-delay: ${delay}s;
            box-shadow: 0 0 6px rgba(255,215,0,0.6);
            will-change: opacity, transform;
            transform: translate3d(0, 0, 0);
        `;
        container.appendChild(star);
    }

    // Adiciona keyframes se não existir
    if (!document.getElementById('natal-star-animation')) {
        const style = document.createElement('style');
        style.id = 'natal-star-animation';
        style.textContent = `
            @keyframes starTwinkle {
                0%, 100% {
                    opacity: 0.4;
                    transform: scale3d(1, 1, 1);
                }
                50% {
                    opacity: 0.8;
                    transform: scale3d(1.2, 1.2, 1);
                }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(container);
}

function showPromoBanner(innerHtml) {
    const banner = document.getElementById('promoBanner');
    const content = document.getElementById('promoContent');
    if (banner && content) {
        content.innerHTML = innerHtml;
        banner.style.display = 'block';
        console.log('Banner promocional exibido');
    } else {
        console.error('Banner ou conteúdo não encontrado', { banner, content });
    }
}

function addChristmasGarland() {
    // Cria uma guirlanda/pisca-pisca no topo
    const garland = document.createElement('div');
    garland.id = 'natal-garland';
    garland.className = 'garland';
    // 24 lâmpadas alternando cores
    for (let i = 0; i < 24; i++) {
        const bulb = document.createElement('span');
        bulb.className = 'bulb';
        garland.appendChild(bulb);
    }
    document.body.appendChild(garland);
}

// ===== Neve (Tema Natal) - Mais Intensa =====
function addSnow() {
    if (document.getElementById('snow-container')) return;
    const container = document.createElement('div');
    container.id = 'snow-container';
    container.className = 'snow-container';
    const flakes = 50; // Reduzido para melhor performance

    // Adiciona keyframes para neve se não existir
    if (!document.getElementById('snow-animation')) {
        const style = document.createElement('style');
        style.id = 'snow-animation';
        style.textContent = `
            @keyframes snow-fall {
                0% {
                    transform: translateY(0) translateX(0);
                    opacity: 0.7;
                }
                100% {
                    transform: translateY(100vh) translateX(var(--sway-x, 0px));
                    opacity: 0.3;
                }
            }
        `;
        document.head.appendChild(style);
    }

    for (let i = 0; i < flakes; i++) {
        const s = document.createElement('span');
        s.className = 'snowflake';
        const size = Math.random() * 5 + 2;
        const left = Math.random() * 100;
        const fallDur = (5 + Math.random() * 12).toFixed(2);
        const delay = (Math.random() * 10).toFixed(2);
        const swayAmount = (Math.random() * 40 - 20).toFixed(2);

        s.style.left = `${left}vw`;
        s.style.width = `${size}px`;
        s.style.height = `${size}px`;
        s.style.setProperty('--sway-x', `${swayAmount}px`);
        s.style.animation = `snow-fall ${fallDur}s linear infinite`;
        s.style.animationDelay = `${delay}s`;
        s.style.opacity = String(0.7 + Math.random() * 0.3);
        s.style.filter = 'drop-shadow(0 0 4px rgba(255,255,255,0.8))';
        container.appendChild(s);
    }
    document.body.appendChild(container);
}

// Adiciona estilos CSS dinâmicos para animações
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
    
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translateX(-50%) translateY(10px); }
        20% { opacity: 1; transform: translateX(-50%) translateY(0); }
        80% { opacity: 1; transform: translateX(-50%) translateY(0); }
        100% { opacity: 0; transform: translateX(-50%) translateY(-10px); }
    }
    
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    /* Novos Estilos Modo Escuro - Quem Somos Redesign */
    .dark-mode .quem-somos-section {
        background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 50%, #1a1a1a 100%) !important;
    }
    
    .dark-mode .quem-somos-section::before {
        background: radial-gradient(circle at 20% 50%, rgba(255, 215, 0, 0.08) 0%, transparent 50%),
                    radial-gradient(circle at 80% 50%, rgba(255, 215, 0, 0.08) 0%, transparent 50%) !important;
    }
    
    .dark-mode .brand-highlight {
        color: #FFD700 !important;
        text-shadow: 2px 2px 8px rgba(255, 215, 0, 0.4) !important;
    }
    
    .dark-mode .timeline-container::before {
        background: linear-gradient(to bottom, 
            transparent 0%,
            #FFD700 10%,
            #FFD700 90%,
            transparent 100%
        ) !important;
    }
    
    .dark-mode .chapter-number {
        color: #FFD700 !important;
        opacity: 0.2 !important;
    }
    
    .dark-mode .story-chapter:hover .chapter-number {
        opacity: 0.6 !important;
    }
    
    .dark-mode .chapter-icon {
        background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%) !important;
        border-color: #1a1a1a !important;
        box-shadow: 0 5px 20px rgba(255, 215, 0, 0.6) !important;
    }
    
    .dark-mode .chapter-content {
        background: #2d2d2d !important;
        border-left-color: #FFD700 !important;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5) !important;
    }
    
    .dark-mode .chapter-content::before {
        background: linear-gradient(135deg, rgba(255, 215, 0, 0.08) 0%, transparent 100%) !important;
    }
    
    .dark-mode .chapter-content:hover {
        box-shadow: 0 15px 40px rgba(255, 215, 0, 0.3) !important;
    }
    
    .dark-mode .chapter-title {
        color: #ffffff !important;
    }
    
    .dark-mode .story-paragraph {
        color: #cccccc !important;
    }
    
    .dark-mode .highlight-word {
        color: #FFD700 !important;
    }
    
    .dark-mode .highlight-word:hover {
        color: #FFF !important;
        text-shadow: 0 2px 15px rgba(255, 215, 0, 0.6) !important;
    }
    
    .dark-mode .highlight-word.gold {
        color: #FFD700 !important;
        text-shadow: 2px 2px 8px rgba(255, 215, 0, 0.5) !important;
    }
    
    .dark-mode .story-chapter-final .chapter-content {
        background: linear-gradient(135deg, #3d3d1a 0%, #2d2d2d 100%) !important;
        border-left-color: #FFD700 !important;
        box-shadow: 0 15px 40px rgba(255, 215, 0, 0.35) !important;
    }
    
    .dark-mode .impact-quote {
        background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%) !important;
        box-shadow: 0 20px 50px rgba(255, 215, 0, 0.5) !important;
    }
    
    .dark-mode .quote-mark {
        color: rgba(0, 0, 0, 0.2) !important;
    }
    
    .dark-mode .quote-text {
        color: #1a1a1a !important;
        text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.3) !important;
    }
    
    .dark-mode .gold-text {
        color: #1a1a1a !important;
        text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.4) !important;
    }
`;
document.head.appendChild(style);