# 🚀 Resumo Rápido - Hospedagem AutêntikA

## ⚡ Opção Mais Rápida: Railway

### Passos Rápidos:

1. **Criar conta:** [railway.app](https://railway.app) (login com GitHub)

2. **Deploy Backend:**
   - New Project → Deploy from GitHub
   - Selecionar pasta `autentika-master`
   - Adicionar MongoDB (New → Database → MongoDB)
   - Copiar `MONGO_URL` do MongoDB
   - No serviço Java, adicionar variável: `MONGODB_URI` = `MONGO_URL`
   - Aguardar deploy (2-5 min)
   - Copiar URL gerada (ex: `https://autentika.up.railway.app`)

3. **Deploy Frontend:**
   - [vercel.com](https://vercel.com) ou [netlify.com](https://netlify.com)
   - Conectar GitHub
   - Apontar para pasta raiz
   - Deploy automático

4. **Atualizar URLs:**
   - Em `login.html`: trocar `http://localhost:8080` pela URL do Railway
   - Em `cadastro.html`: trocar `http://localhost:8080` pela URL do Railway
   - Fazer commit e redeploy

5. **Pronto!** 🎉

---

## 📋 Arquivos Criados (já prontos):

✅ `autentika-master/Procfile`
✅ `autentika-master/railway.json`
✅ `autentika-master/render.yaml`
✅ `autentika-master/src/main/resources/application-prod.properties`

---

## 💰 Custos:

- **Railway:** Gratuito ($5/mês após uso inicial)
- **Vercel/Netlify:** Totalmente gratuito
- **MongoDB (Railway):** Incluso no plano

---

## 📖 Guia Completo:

Veja `GUIA_HOSPEDAGEM.md` para instruções detalhadas e outras opções.

