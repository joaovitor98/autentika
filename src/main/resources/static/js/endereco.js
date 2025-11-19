// Configuração da API
const API_BASE_URL = 'http://localhost:8080/api';

// Função para obter o ID do usuário logado
function getUsuarioId() {
    const usuarioId = localStorage.getItem('usuarioId') || '1';
    return usuarioId;
}

// Função para obter parâmetros da URL
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Função para formatar CEP
function formatCEP(input) {
    let value = input.value.replace(/\D/g, '');
    value = value.replace(/(\d{5})(\d)/, '$1-$2');
    input.value = value;
}

// Função para buscar CEP via API ViaCEP
async function searchCEPAddress() {
    const cepInput = document.getElementById('cep');
    const cep = cepInput.value.replace(/\D/g, '');

    if (cep.length !== 8) {
        mostrarMensagem('Por favor, digite um CEP válido com 8 dígitos.', 'error');
        return;
    }

    const searchButton = document.querySelector('.btn-search-cep');
    const originalText = searchButton.textContent;

    searchButton.textContent = 'Buscando...';
    searchButton.disabled = true;

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (data.erro) {
            throw new Error('CEP não encontrado');
        }

        document.getElementById('logradouro').value = data.logradouro || '';
        document.getElementById('bairro').value = data.bairro || '';
        document.getElementById('cidade').value = data.localidade || '';
        document.getElementById('estado').value = data.uf || '';

        // Remove readonly dos campos preenchidos
        document.getElementById('logradouro').removeAttribute('readonly');
        document.getElementById('bairro').removeAttribute('readonly');
        document.getElementById('cidade').removeAttribute('readonly');
        document.getElementById('estado').removeAttribute('readonly');

        // Foca no campo número
        document.getElementById('numero').focus();

        mostrarMensagem('Endereço encontrado com sucesso!', 'success');
    } catch (error) {
        console.error('Erro ao buscar CEP:', error);
        mostrarMensagem('CEP não encontrado. Verifique o número digitado.', 'error');
    } finally {
        searchButton.textContent = originalText;
        searchButton.disabled = false;
    }
}

// Função para carregar endereço para edição
async function carregarEnderecoParaEdicao() {
    const enderecoId = getUrlParameter('id');

    if (!enderecoId) {
        // Modo de criação - apenas define o usuário ID
        document.getElementById('usuarioId').value = getUsuarioId();
        return;
    }

    // Modo de edição
    document.getElementById('enderecoTitle').textContent = 'Editar Endereço';
    document.getElementById('submitButton').textContent = 'Salvar Alterações';

    try {
        const response = await fetch(`${API_BASE_URL}/enderecos/${enderecoId}`);
        if (response.ok) {
            const endereco = await response.json();

            document.getElementById('enderecoId').value = endereco.id;
            document.getElementById('usuarioId').value = endereco.usuarioId;
            document.getElementById('cep').value = endereco.cep || '';
            document.getElementById('logradouro').value = endereco.logradouro || '';
            document.getElementById('numero').value = endereco.numero || '';
            document.getElementById('complemento').value = endereco.complemento || '';
            document.getElementById('bairro').value = endereco.bairro || '';
            document.getElementById('cidade').value = endereco.cidade || '';
            document.getElementById('estado').value = endereco.estado || '';
            document.getElementById('principal').checked = endereco.principal || false;

            // Remove readonly dos campos para edição
            document.getElementById('logradouro').removeAttribute('readonly');
            document.getElementById('bairro').removeAttribute('readonly');
            document.getElementById('cidade').removeAttribute('readonly');
            document.getElementById('estado').removeAttribute('readonly');
        } else {
            mostrarMensagem('Erro ao carregar endereço.', 'error');
        }
    } catch (error) {
        console.error('Erro ao carregar endereço:', error);
        mostrarMensagem('Erro ao carregar endereço.', 'error');
    }
}

// Função para salvar endereço
async function salvarEndereco(event) {
    event.preventDefault();

    const enderecoId = document.getElementById('enderecoId').value;
    const usuarioId = document.getElementById('usuarioId').value;

    const endereco = {
        usuarioId: usuarioId,
        cep: document.getElementById('cep').value.replace(/\D/g, ''),
        logradouro: document.getElementById('logradouro').value,
        numero: document.getElementById('numero').value,
        complemento: document.getElementById('complemento').value,
        bairro: document.getElementById('bairro').value,
        cidade: document.getElementById('cidade').value,
        estado: document.getElementById('estado').value.toUpperCase(),
        principal: document.getElementById('principal').checked
    };

    // Validação básica
    if (!endereco.cep || endereco.cep.length !== 8) {
        mostrarMensagem('Por favor, digite um CEP válido.', 'error');
        return;
    }

    if (!endereco.logradouro || !endereco.numero || !endereco.bairro || !endereco.cidade || !endereco.estado) {
        mostrarMensagem('Por favor, preencha todos os campos obrigatórios.', 'error');
        return;
    }

    const submitButton = document.getElementById('submitButton');
    const originalText = submitButton.textContent;

    submitButton.textContent = 'Salvando...';
    submitButton.disabled = true;

    try {
        let response;
        if (enderecoId) {
            // Atualizar endereço existente
            response = await fetch(`${API_BASE_URL}/enderecos/${enderecoId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(endereco)
            });
        } else {
            // Criar novo endereço
            response = await fetch(`${API_BASE_URL}/enderecos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(endereco)
            });
        }

        if (response.ok) {
            mostrarMensagem(enderecoId ? 'Endereço atualizado com sucesso!' : 'Endereço cadastrado com sucesso!', 'success');
            setTimeout(() => {
                window.location.href = 'perfil.html';
            }, 1500);
        } else {
            const errorData = await response.json();
            mostrarMensagem('Erro ao salvar endereço. Tente novamente.', 'error');
        }
    } catch (error) {
        console.error('Erro ao salvar endereço:', error);
        mostrarMensagem('Erro ao salvar endereço. Tente novamente.', 'error');
    } finally {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
}

// Função para mostrar mensagens
function mostrarMensagem(mensagem, tipo) {
    const feedback = document.createElement('div');
    feedback.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: ${tipo === 'success' ? '#28a745' : '#dc3545'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        font-weight: bold;
        z-index: 10000;
        animation: fadeInOut 2s ease-out;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
    `;
    feedback.textContent = mensagem;

    document.body.appendChild(feedback);

    setTimeout(() => {
        if (feedback.parentElement) {
            document.body.removeChild(feedback);
        }
    }, 2000);
}

// Função de logout
function logout() {
    localStorage.removeItem('usuarioId');
    window.location.href = 'index.html';
}

// Inicialização quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    carregarEnderecoParaEdicao();

    const cepInput = document.getElementById('cep');
    if (cepInput) {
        cepInput.addEventListener('input', function() {
            formatCEP(this);
        });

        // Busca CEP ao pressionar Enter
        cepInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                searchCEPAddress();
            }
        });
    }

    const enderecoForm = document.getElementById('enderecoForm');
    if (enderecoForm) {
        enderecoForm.addEventListener('submit', salvarEndereco);
    }
});

