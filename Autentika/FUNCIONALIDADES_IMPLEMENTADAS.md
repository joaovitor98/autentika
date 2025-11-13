# AutêntikA - Site de Moda Feminina

## 🎉 Novas Funcionalidades Implementadas

### ✅ Modo Escuro Melhorado
- **Contraste aprimorado**: Melhor visibilidade em todos os elementos
- **Cores harmoniosas**: Esquema de cores consistente com dourado (#FFD700)
- **Transições suaves**: Animações fluidas entre modo claro e escuro
- **Botão toggle**: Localizado no canto superior direito

### ✅ Sistema de Produtos Interativo
- **Modal de produto**: Clique em qualquer vestido para ver detalhes
- **Variações de cor**: 3 opções de cor (dourado, vermelho, azul)
- **Preços dinâmicos**: Valores aleatórios para cada categoria
- **Descrições personalizadas**: Texto único para cada tipo de produto

### ✅ Carrinho de Compras Completo
- **Botão do carrinho**: No header com contador de itens
- **Modal lateral**: Carrinho desliza da direita
- **Gestão de itens**: Adicionar, remover e visualizar produtos
- **Cálculo automático**: Total atualizado em tempo real

### ✅ Sistema de Descontos
- **Códigos válidos**:
  - `autentika10` - 10% de desconto
  - `desconto20` - 20% de desconto  
  - `promocao30` - 30% de desconto
- **Aplicação automática**: Desconto calculado no total
- **Feedback visual**: Mostra valor original e final

### ✅ API de CEP Integrada
- **Busca automática**: Função `searchCEP()` implementada
- **ViaCEP**: Integração com API gratuita brasileira
- **Tratamento de erros**: Validação de CEP inválido
- **Dados completos**: Logradouro, bairro, cidade e UF

## 🛠️ Como Usar

### Modo Escuro
1. Clique no botão 🌙 no canto superior direito
2. O site alternará entre modo claro e escuro
3. Todas as cores se adaptam automaticamente

### Visualizar Produtos
1. Clique em qualquer imagem de vestido
2. O modal abrirá com detalhes do produto
3. Use os círculos coloridos para ver variações
4. Clique em "Adicionar ao Carrinho" ou "Comprar Agora"

### Carrinho de Compras
1. Clique no ícone 🛒 no header
2. Visualize todos os itens adicionados
3. Use o campo "Código de desconto" para aplicar promoções
4. Clique em "Finalizar Compra" para concluir

### Buscar CEP
```javascript
// Exemplo de uso da API de CEP
const endereco = await searchCEP('01310-100');
if (endereco) {
    console.log(endereco.logradouro); // Rua Augusta
    console.log(endereco.cidade);     // São Paulo
}
```

## 🎨 Melhorias Visuais

- **Animações suaves**: Transições em todos os elementos
- **Feedback visual**: Confirmações de ações do usuário
- **Design responsivo**: Funciona em desktop e mobile
- **Cores consistentes**: Paleta dourada mantida em todo o site
- **Tipografia melhorada**: Hierarquia clara de informações

## 🔧 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Estilos avançados com Grid e Flexbox
- **JavaScript ES6+**: Funcionalidades interativas
- **API ViaCEP**: Busca de endereços brasileiros
- **Local Storage**: Persistência de dados (implementação futura)

## 📱 Responsividade

- **Desktop**: Layout completo com modais centralizados
- **Tablet**: Adaptação de grid e espaçamentos
- **Mobile**: Modais em tela cheia, botões otimizados

## 🚀 Próximas Funcionalidades

- [ ] Persistência do carrinho no Local Storage
- [ ] Sistema de favoritos
- [ ] Filtros por categoria e preço
- [ ] Avaliações de produtos
- [ ] Sistema de login/registro
- [ ] Integração com gateway de pagamento

---

**Desenvolvido com ❤️ para a AutêntikA**
