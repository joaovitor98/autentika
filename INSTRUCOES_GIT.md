# Instruções para Configurar Git e Conectar à Branch Gabriel

## Passo 1: Instalar o Git

Se o Git não estiver instalado, baixe e instale:

1. Acesse: https://git-scm.com/download/win
2. Baixe o instalador para Windows
3. Execute o instalador e siga as instruções (aceite as opções padrão)
4. Reinicie o terminal/PowerShell após a instalação

## Passo 2: Configurar o Git (primeira vez)

Após instalar, configure seu nome e email:

```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu.email@exemplo.com"
```

## Passo 3: Conectar ao Repositório

Navegue até a pasta do projeto:

```bash
cd "C:\Users\GABRIEL LUCAS\Downloads\AUTENTIKA\Autentika\autentika-master"
```

### Opção A: Usar o Script Automático

Execute o script PowerShell:

```powershell
.\configurar-git.ps1
```

### Opção B: Comandos Manuais

Execute os seguintes comandos:

```bash
# Inicializar repositório (se ainda não for um repositório Git)
git init

# Adicionar remote
git remote add origin https://github.com/joaovitor98/autentika.git

# Ou atualizar se já existir
git remote set-url origin https://github.com/joaovitor98/autentika.git

# Buscar branches do remoto
git fetch origin

# Fazer checkout na branch gabriel (se existir no remoto)
git checkout -b gabriel origin/gabriel

# OU criar nova branch gabriel (se não existir no remoto)
git checkout -b gabriel
```

## Passo 4: Fazer Commit e Push

Após fazer suas alterações:

```bash
# Verificar status
git status

# Adicionar arquivos
git add .

# Fazer commit
git commit -m "Descrição das alterações"

# Fazer push para a branch gabriel
git push -u origin gabriel
```

## Comandos Úteis

```bash
# Ver branches locais e remotas
git branch -a

# Ver status do repositório
git status

# Ver histórico de commits
git log

# Ver diferenças
git diff

# Atualizar branch local com remoto
git pull origin gabriel
```

## Troubleshooting

### Erro: "fatal: not a git repository"
- Execute `git init` primeiro

### Erro: "fatal: remote origin already exists"
- Execute `git remote set-url origin https://github.com/joaovitor98/autentika.git`

### Erro: "Permission denied"
- Verifique suas credenciais do GitHub
- Pode ser necessário configurar autenticação via token ou SSH

