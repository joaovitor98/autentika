// Configuração da API
const API_BASE_URL = 'http://localhost:8080/api';

// Função para obter o ID do usuário logado
function getUsuarioId() {
    const usuarioId = localStorage.getItem('usuarioId');
    if (!usuarioId) {
        // Se não tiver usuarioId, tenta pegar do objeto usuario
        const usuarioStr = localStorage.getItem('usuario');
        if (usuarioStr) {
            try {
                const usuario = JSON.parse(usuarioStr);
                if (usuario && usuario.id) {
                    localStorage.setItem('usuarioId', usuario.id);
                    return usuario.id;
                }
            } catch (e) {
                console.error('Erro ao parsear usuário:', e);
            }
        }
        // Redireciona para login se não estiver logado
        window.location.href = 'login.html';
        return null;
    }
    return usuarioId;
}

// Função para carregar dados do usuário
async function carregarDadosUsuario() {
    const usuarioId = getUsuarioId();

    try {
        const response = await fetch(`${API_BASE_URL}/usuarios/${usuarioId}`);
        if (response.ok) {
            const usuario = await response.json();
            
            // Separar nome e sobrenome
            const nomeCompleto = usuario.nome || '';
            const partesNome = nomeCompleto.split(' ');
            const nome = partesNome[0] || '';
            const sobrenome = partesNome.slice(1).join(' ') || '';
            
            document.getElementById('profileName').value = nome;
            document.getElementById('profileSurname').value = sobrenome;
            document.getElementById('profileEmail').value = usuario.email || '';
            document.getElementById('profileCpf').value = usuario.cpf || '';
            document.getElementById('profileGender').value = usuario.genero || '';
            document.getElementById('profileBirthdate').value = usuario.dataNascimento || '';
            document.getElementById('profilePhone').value = usuario.telefone || '';
            
            const userNameDisplay = document.getElementById('userNameDisplay');
            if (userNameDisplay) {
                userNameDisplay.textContent = usuario.nome || 'Usuário';
            }
            
            // Desabilitar campos inicialmente
            desabilitarCamposEdicao();
        } else {
            console.error('Erro ao carregar dados do usuário');
        }
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
    }
}

// Função para desabilitar campos de edição
function desabilitarCamposEdicao() {
    const campos = ['profileName', 'profileSurname', 'profileEmail', 'profileCpf', 
                    'profileGender', 'profileBirthdate', 'profilePhone'];
    campos.forEach(id => {
        const campo = document.getElementById(id);
        if (campo) {
            campo.disabled = true;
        }
    });
    document.getElementById('editProfileBtn').style.display = 'inline-block';
    document.getElementById('saveProfileBtn').style.display = 'none';
}

// Função para habilitar campos de edição
function habilitarCamposEdicao() {
    const campos = ['profileName', 'profileSurname', 'profileEmail', 'profileCpf', 
                    'profileGender', 'profileBirthdate', 'profilePhone'];
    campos.forEach(id => {
        const campo = document.getElementById(id);
        if (campo) {
            campo.disabled = false;
        }
    });
    document.getElementById('editProfileBtn').style.display = 'none';
    document.getElementById('saveProfileBtn').style.display = 'block';
}

// Função para salvar dados do usuário
async function salvarDadosUsuario(event) {
    event.preventDefault();

    const usuarioId = getUsuarioId();
    const nome = document.getElementById('profileName').value;
    const sobrenome = document.getElementById('profileSurname').value;
    const nomeCompleto = `${nome} ${sobrenome}`.trim();
    const email = document.getElementById('profileEmail').value;
    const cpf = document.getElementById('profileCpf').value;
    const genero = document.getElementById('profileGender').value;
    const dataNascimento = document.getElementById('profileBirthdate').value;
    const telefone = document.getElementById('profilePhone').value;

    const usuarioAtualizado = {
        nome: nomeCompleto,
        email: email,
        cpf: cpf,
        genero: genero,
        dataNascimento: dataNascimento,
        telefone: telefone
    };

    try {
        const response = await fetch(`${API_BASE_URL}/usuarios/${usuarioId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuarioAtualizado)
        });

        if (response.ok) {
            const usuario = await response.json();
            const userNameDisplay = document.getElementById('userNameDisplay');
            if (userNameDisplay) {
                userNameDisplay.textContent = usuario.nome || nomeCompleto;
            }
            mostrarMensagem('Dados atualizados com sucesso!', 'success');
            desabilitarCamposEdicao();
        } else {
            mostrarMensagem('Erro ao atualizar dados. Tente novamente.', 'error');
        }
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        mostrarMensagem('Erro ao atualizar dados. Tente novamente.', 'error');
    }
}

// Função para carregar endereços do usuário
async function carregarEnderecos() {
    const usuarioId = getUsuarioId();
    const enderecosList = document.getElementById('enderecosList');

    try {
        const response = await fetch(`${API_BASE_URL}/enderecos/usuario/${usuarioId}`);
        if (response.ok) {
            const enderecos = await response.json();

            if (enderecos.length === 0) {
                enderecosList.innerHTML = '<p class="empty-message">Nenhum endereço cadastrado. <a href="endereco.html" class="auth-link">Adicione um endereço</a></p>';
                return;
            }

            enderecosList.innerHTML = enderecos.map(endereco => `
                <div class="endereco-item ${endereco.principal ? 'principal' : ''}">
                    ${endereco.principal ? '<span class="endereco-badge">Principal</span>' : ''}
                    <div class="endereco-info">
                        <p><strong>${endereco.logradouro}, ${endereco.numero}</strong></p>
                        ${endereco.complemento ? `<p>${endereco.complemento}</p>` : ''}
                        <p>${endereco.bairro} - ${endereco.cidade}/${endereco.estado}</p>
                        <p>CEP: ${endereco.cep}</p>
                    </div>
                    <div class="endereco-actions">
                        <button class="btn-edit" onclick="editarEndereco('${endereco.id}')">Editar</button>
                        <button class="btn-delete" onclick="deletarEndereco('${endereco.id}')">Excluir</button>
                    </div>
                </div>
            `).join('');
        } else {
            enderecosList.innerHTML = '<p class="empty-message">Erro ao carregar endereços.</p>';
        }
    } catch (error) {
        console.error('Erro ao carregar endereços:', error);
        enderecosList.innerHTML = '<p class="empty-message">Erro ao carregar endereços.</p>';
    }
}

// Função para editar endereço
function editarEndereco(enderecoId) {
    window.location.href = `endereco.html?id=${enderecoId}`;
}

// Função para deletar endereço
async function deletarEndereco(enderecoId) {
    if (!confirm('Tem certeza que deseja excluir este endereço?')) {
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/enderecos/${enderecoId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            mostrarMensagem('Endereço excluído com sucesso!', 'success');
            carregarEnderecos();
        } else {
            mostrarMensagem('Erro ao excluir endereço. Tente novamente.', 'error');
        }
    } catch (error) {
        console.error('Erro ao deletar endereço:', error);
        mostrarMensagem('Erro ao excluir endereço. Tente novamente.', 'error');
    }
}

// Função para mostrar mensagens
function mostrarMensagem(mensagem, tipo) {
    const feedback = document.createElement('div');
    feedback.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: ${tipo === 'success' ? '#28a745' : '#dc3545'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        font-weight: bold;
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
    `;
    feedback.textContent = mensagem;

    document.body.appendChild(feedback);

    setTimeout(() => {
        feedback.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            if (feedback.parentElement) {
                document.body.removeChild(feedback);
            }
        }, 300);
    }, 3000);
}

// Função de logout
function logout() {
    localStorage.removeItem('usuarioId');
    localStorage.removeItem('usuario');
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'index.html';
}

// Função para navegar entre seções
function navegarSecao(secao) {
    // Remove active de todos os itens do sidebar
    document.querySelectorAll('.sidebar-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Remove active de todas as seções
    document.querySelectorAll('.profile-section-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Adiciona active ao item clicado
    const itemClicado = document.querySelector(`[data-section="${secao}"]`);
    if (itemClicado) {
        itemClicado.classList.add('active');
    }
    
    // Mostra a seção correspondente
    const secaoContent = document.getElementById(`${secao}-section`);
    if (secaoContent) {
        secaoContent.classList.add('active');
    }
}

// Máscaras de input
function aplicarMascaraCPF(input) {
    input.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length <= 11) {
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
            e.target.value = value;
        }
    });
}

function aplicarMascaraTelefone(input) {
    input.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length <= 11) {
            if (value.length <= 10) {
                value = value.replace(/(\d{2})(\d)/, '($1) $2');
                value = value.replace(/(\d{4})(\d)/, '$1-$2');
            } else {
                value = value.replace(/(\d{2})(\d)/, '($1) $2');
                value = value.replace(/(\d{5})(\d)/, '$1-$2');
            }
            e.target.value = value;
        }
    });
}

// Inicialização quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    carregarDadosUsuario();
    carregarEnderecos();

    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', salvarDadosUsuario);
    }

    // Botão de editar
    const editBtn = document.getElementById('editProfileBtn');
    if (editBtn) {
        editBtn.addEventListener('click', function(e) {
            e.preventDefault();
            habilitarCamposEdicao();
        });
    }

    // Navegação do sidebar
    document.querySelectorAll('.sidebar-item[data-section]').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const secao = this.getAttribute('data-section');
            navegarSecao(secao);
            
            // Carregar endereços se a seção for endereços
            if (secao === 'enderecos') {
                carregarEnderecos();
            }
        });
    });

    // Aplicar máscaras
    const cpfInput = document.getElementById('profileCpf');
    if (cpfInput) {
        aplicarMascaraCPF(cpfInput);
    }

    const phoneInput = document.getElementById('profilePhone');
    if (phoneInput) {
        aplicarMascaraTelefone(phoneInput);
    }

    // Carregar preferências de mensagens do localStorage
    const smsPref = localStorage.getItem('smsPreference');
    const whatsappPref = localStorage.getItem('whatsappPreference');
    const emailPref = localStorage.getItem('emailPreference');
    
    if (smsPref !== null) document.getElementById('smsPreference').checked = smsPref === 'true';
    if (whatsappPref !== null) document.getElementById('whatsappPreference').checked = whatsappPref === 'true';
    if (emailPref !== null) document.getElementById('emailPreference').checked = emailPref === 'true';

    // Salvar preferências de mensagens
    ['smsPreference', 'whatsappPreference', 'emailPreference'].forEach(id => {
        const checkbox = document.getElementById(id);
        if (checkbox) {
            checkbox.addEventListener('change', function() {
                localStorage.setItem(id, this.checked);
            });
        }
    });
});

