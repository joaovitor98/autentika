# 🚀 Guia de Hospedagem - AutêntikA

## 📋 Visão Geral
Seu projeto tem:
- **Frontend**: HTML, CSS, JavaScript (páginas estáticas)
- **Backend**: Java Spring Boot (API REST)
- **Banco de Dados**: MongoDB

## 🎯 Opções de Hospedagem

### **OPÇÃO 1: Railway (RECOMENDADO - Mais Fácil) ⭐**

**Vantagens:**
- ✅ Gratuito para começar ($5/mês após uso)
- ✅ Suporta Java Spring Boot
- ✅ MongoDB incluso (gratuito)
- ✅ Deploy automático via GitHub
- ✅ HTTPS automático
- ✅ Muito fácil de usar

**Passos:**
1. Criar conta em [railway.app](https://railway.app)
2. Conectar seu repositório GitHub
3. Adicionar serviço "MongoDB" (gratuito)
4. Adicionar serviço "Java" e apontar para pasta `autentika-master`
5. Configurar variáveis de ambiente:
   - `SPRING_DATA_MONGODB_URI` = URL do MongoDB do Railway
   - `PORT` = Railway define automaticamente
6. Deploy automático!

**Custo:** Gratuito (depois $5/mês)

---

### **OPÇÃO 2: Render (Boa Alternativa)**

**Vantagens:**
- ✅ Plano gratuito disponível
- ✅ Suporta Java
- ✅ MongoDB Atlas (gratuito separado)
- ✅ Deploy via GitHub

**Passos:**
1. Criar conta em [render.com](https://render.com)
2. Criar banco MongoDB no [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (gratuito)
3. Criar "Web Service" apontando para `autentika-master`
4. Configurar variáveis de ambiente
5. Deploy!

**Custo:** Gratuito (com limitações)

---

### **OPÇÃO 3: Apenas Frontend (Mais Simples, SEM Backend)**

Se você quiser apenas hospedar o site visual (sem login/cadastro funcionando):

**Vercel ou Netlify:**
1. Criar conta em [vercel.com](https://vercel.com) ou [netlify.com](https://netlify.com)
2. Conectar GitHub
3. Apontar para pasta raiz do projeto
4. Deploy automático!

**Custo:** Totalmente gratuito

---

## 📝 Preparação do Projeto para Deploy

✅ **Arquivos já criados para você:**
- `autentika-master/Procfile` - Para Railway/Render
- `autentika-master/railway.json` - Configuração específica Railway
- `autentika-master/render.yaml` - Configuração específica Render
- `autentika-master/src/main/resources/application-prod.properties` - Configurações de produção

**Você só precisa:**
1. Fazer commit desses arquivos no GitHub
2. Seguir os passos abaixo da plataforma escolhida

---

## 🔧 Configuração Específica por Plataforma

### **Railway (PASSO A PASSO DETALHADO)**

1. **Criar conta:**
   - Acesse [railway.app](https://railway.app)
   - Faça login com GitHub

2. **Criar novo projeto:**
   - Clique em "New Project"
   - Selecione "Deploy from GitHub repo"
   - Escolha seu repositório
   - Selecione a pasta `autentika-master`

3. **Adicionar MongoDB:**
   - No projeto, clique em "New"
   - Selecione "Database" → "MongoDB"
   - Railway criará automaticamente
   - Vá em "Variables" e copie o `MONGO_URL` (será algo como `mongodb://mongo:27017`)

4. **Configurar Web Service:**
   - Railway detectará automaticamente que é Java (pelo `pom.xml`)
   - O arquivo `railway.json` já está configurado
   - Build e Start commands já estão prontos

5. **Configurar Variáveis de Ambiente:**
   - No serviço Java, vá em "Variables"
   - Adicione:
     - `MONGODB_URI` = Cole o `MONGO_URL` do MongoDB (do passo 3)
     - `ALLOWED_ORIGINS` = URL do seu frontend (ex: `https://seu-site.vercel.app`)
   - `PORT` é definido automaticamente pelo Railway

6. **Deploy:**
   - Railway fará deploy automático
   - Aguarde o build (pode levar 2-5 minutos)
   - Quando aparecer "Deployed", seu backend está no ar!
   - Copie a URL gerada (ex: `https://autentika-production.up.railway.app`)

7. **Atualizar Frontend:**
   - Após obter a URL do backend (ex: `https://autentika-production.up.railway.app`)
   - Atualize os arquivos:
   
   **`login.html` (linha ~122):**
   ```javascript
   // De:
   'http://localhost:8080/api/auth/login'
   // Para:
   'https://sua-url-railway.railway.app/api/auth/login'
   ```
   
   **`cadastro.html` (linha ~168):**
   ```javascript
   // De:
   'http://localhost:8080/api/auth/cadastro'
   // Para:
   'https://sua-url-railway.railway.app/api/auth/cadastro'
   ```
   
   - Faça commit e deploy do frontend novamente

### **Render**

1. **Criar MongoDB Atlas:**
   - [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Criar cluster gratuito
   - Obter connection string

2. **Criar Web Service:**
   - New → Web Service
   - Conectar GitHub
   - Build Command: `mvn clean package -DskipTests`
   - Start Command: `java -jar target/autentika-application.jar`

3. **Variáveis de Ambiente:**
   - `MONGODB_URI` = Connection string do Atlas
   - `PORT` = Render define automaticamente

---

## 🌐 Hospedar Frontend Separadamente

Se quiser hospedar frontend e backend separados:

### Frontend (Vercel/Netlify):
1. Fazer upload dos arquivos HTML, CSS, JS
2. Atualizar URLs da API no `script.js`:
   ```javascript
   // Trocar localhost:8080 pela URL do backend
   const API_URL = 'https://seu-backend.railway.app';
   ```

### Backend (Railway/Render):
- Seguir passos acima
- Configurar CORS para aceitar requisições do frontend

---

## 📦 Checklist Antes do Deploy

- [ ] Projeto compila sem erros (`mvn clean package`)
- [ ] Testes passando (se houver)
- [ ] Variáveis de ambiente configuradas
- [ ] MongoDB configurado e acessível
- [ ] CORS configurado corretamente
- [ ] URLs da API atualizadas no frontend
- [ ] Arquivos sensíveis não commitados (.env, etc)

---

## 🆘 Problemas Comuns

### Erro de conexão com MongoDB
- Verificar se a URL está correta
- Verificar se o IP está liberado no MongoDB Atlas
- Verificar credenciais

### CORS Error
- Configurar `ALLOWED_ORIGINS` corretamente
- Verificar configuração de CORS no código Java

### Porta não encontrada
- Usar variável `${PORT}` no application.properties
- Railway/Render definem automaticamente

---

## 💡 Recomendação Final

**Para começar rápido:** Railway (tudo em um lugar, MongoDB incluso)
**Para economizar:** Render (plano gratuito mais generoso)
**Apenas visual:** Vercel/Netlify (gratuito, sem backend)

---

## 📞 Próximos Passos

1. Escolher plataforma
2. Criar conta
3. Preparar projeto (seguir checklist)
4. Fazer primeiro deploy
5. Testar todas as funcionalidades
6. Configurar domínio personalizado (opcional)

