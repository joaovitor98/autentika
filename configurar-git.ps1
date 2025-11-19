# Script para configurar Git e conectar à branch gabriel
# Execute este script após instalar o Git

Write-Host "Configurando repositório Git..." -ForegroundColor Green

# Verificar se já é um repositório Git
if (-not (Test-Path .git)) {
    Write-Host "Inicializando repositório Git..." -ForegroundColor Yellow
    git init
}

# Adicionar remote se não existir
$remoteUrl = "https://github.com/joaovitor98/autentika.git"
$remoteExists = git remote | Select-String -Pattern "origin"

if (-not $remoteExists) {
    Write-Host "Adicionando remote origin..." -ForegroundColor Yellow
    git remote add origin $remoteUrl
} else {
    Write-Host "Atualizando remote origin..." -ForegroundColor Yellow
    git remote set-url origin $remoteUrl
}

# Buscar branches remotas
Write-Host "Buscando branches do repositório remoto..." -ForegroundColor Yellow
git fetch origin

# Verificar se a branch gabriel existe remotamente
$branchExists = git ls-remote --heads origin gabriel

if ($branchExists) {
    Write-Host "Branch 'gabriel' encontrada no remoto. Fazendo checkout..." -ForegroundColor Green
    git checkout -b gabriel origin/gabriel
} else {
    Write-Host "Branch 'gabriel' não existe no remoto. Criando nova branch..." -ForegroundColor Yellow
    git checkout -b gabriel
}

Write-Host "`nConfiguração concluída!" -ForegroundColor Green
Write-Host "Você está agora na branch 'gabriel'" -ForegroundColor Green
Write-Host "`nPara verificar o status, execute: git status" -ForegroundColor Cyan
Write-Host "Para adicionar arquivos, execute: git add ." -ForegroundColor Cyan
Write-Host "Para fazer commit, execute: git commit -m 'sua mensagem'" -ForegroundColor Cyan
Write-Host "Para fazer push, execute: git push -u origin gabriel" -ForegroundColor Cyan

