// Array de imagens disponíveis para os vestidos
const dressImages = [
    'ChatGPT Image 15 de out. de 2025, 16_41_58.png',
    'ChatGPT Image 15 de out. de 2025, 16_44_11.png',
    'ChatGPT Image 15 de out. de 2025, 16_46_29.png',
    'Gemini_Generated_Image_hdspjuhdspjuhdsp.png',
    'Gemini_Generated_Image_wl9z4xwl9z4xwl9z.png',
    'Gemini_Generated_Image_wl9z4xwl9z4xwl9z (1).png'
];

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

// Função para mudar a imagem do vestido
function changeDressImage(element) {
    const img = element.querySelector('.dress-image');
    const currentSrc = img.src;

    // Encontra uma nova imagem diferente da atual
    let newImageSrc;
    do {
        const randomIndex = Math.floor(Math.random() * dressImages.length);
        newImageSrc = dressImages[randomIndex];
    } while (newImageSrc === currentSrc.split('/').pop());

    // Aplica a nova imagem
    img.src = newImageSrc;

    // Adiciona animação de feedback
    element.classList.add('clicked');

    // Remove a animação após completar
    setTimeout(() => {
        element.classList.remove('clicked');
    }, 500);

    // Mostra feedback visual
    showImageFeedback(element, newImageSrc);
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

    currentProduct = {
        category: category,
        name: productName,
        image: imageSrc,
        price: productPrices[category] || 99.90,
        description: productDescriptions[category] || 'Produto de alta qualidade da AutêntikA.'
    };

    // Preenche o modal com os dados do produto
    document.getElementById('productMainImage').src = currentProduct.image;
    document.getElementById('productName').textContent = currentProduct.name;
    document.getElementById('productPrice').textContent = `R$ ${currentProduct.price.toFixed(2).replace('.', ',')}`;
    document.getElementById('productDescription').textContent = currentProduct.description;

    // Mostra o modal
    document.getElementById('productModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Função para fechar modal do produto
function closeProductModal() {
    document.getElementById('productModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Função para trocar cor do produto
function changeProductColor(color) {
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => option.classList.remove('active'));

    const selectedOption = document.querySelector(`[data-color="${color}"]`);
    if (selectedOption) {
        selectedOption.classList.add('active');

        // Aplica filtro de cor apenas no vestido (área específica da imagem)
        const productImage = document.getElementById('productMainImage');

        // Cria um overlay com a cor selecionada apenas na área do vestido
        let overlay = productImage.parentElement.querySelector('.color-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'color-overlay';
            overlay.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 1;
                border-radius: 10px;
            `;
            productImage.parentElement.style.position = 'relative';
            productImage.parentElement.appendChild(overlay);
        }

        switch (color) {
            case 'red':
                overlay.style.background = 'linear-gradient(45deg, rgba(255, 68, 68, 0.3) 0%, rgba(255, 100, 100, 0.2) 50%, rgba(255, 68, 68, 0.3) 100%)';
                overlay.style.mixBlendMode = 'multiply';
                break;
            case 'blue':
                overlay.style.background = 'linear-gradient(45deg, rgba(68, 68, 255, 0.3) 0%, rgba(100, 100, 255, 0.2) 50%, rgba(68, 68, 255, 0.3) 100%)';
                overlay.style.mixBlendMode = 'multiply';
                break;
            default:
                overlay.style.background = 'none';
                overlay.style.mixBlendMode = 'normal';
        }
    }
}

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

// Função para inicializar imagens aleatórias nos vestidos
function initializeDressImages() {
    const dressContainers = document.querySelectorAll('.dress-image-container');

    dressContainers.forEach((container, index) => {
        const img = container.querySelector('.dress-image');

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
    const darkModeToggle = document.createElement('button');
    darkModeToggle.innerHTML = '🌙';
    darkModeToggle.id = 'dark-mode-toggle';
    darkModeToggle.style.cssText = `
        position: fixed;
        top: 15px;
        right: 20px;
        background: #333;
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 20px;
        cursor: pointer;
        z-index: 9999;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
    `;

    document.body.appendChild(darkModeToggle);

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        darkModeToggle.innerHTML = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
        darkModeToggle.style.background = document.body.classList.contains('dark-mode') ? '#FFD700' : '#333';
    });

    darkModeToggle.addEventListener('mouseenter', () => {
        darkModeToggle.style.transform = 'scale(1.1)';
    });

    darkModeToggle.addEventListener('mouseleave', () => {
        darkModeToggle.style.transform = 'scale(1)';
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

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function () {
    // Atualiza status de login no header
    updateLoginStatus();
    
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

    // Adiciona eventos para trocar cor do produto
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.addEventListener('click', function () {
            const color = this.getAttribute('data-color');
            changeProductColor(color);
        });
    });

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

    console.log('Site AutêntikA carregado com sucesso! 🎉');
});

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