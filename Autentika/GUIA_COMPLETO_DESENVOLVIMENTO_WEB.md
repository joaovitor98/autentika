# 📚 GUIA COMPLETO DE DESENVOLVIMENTO WEB
## Do Básico ao Avançado - Projeto Autentika

---

## 📑 ÍNDICE

1. [Fundamentos HTML](#1-fundamentos-html)
2. [CSS Essencial](#2-css-essencial)
3. [Layout com Flexbox](#3-layout-com-flexbox)
4. [Animações CSS](#4-animações-css)
5. [JavaScript Moderno](#5-javascript-moderno)
6. [Responsividade](#6-responsividade)
7. [Boas Práticas](#7-boas-práticas)

---

# 1. FUNDAMENTOS HTML

## 1.1 Estrutura Básica

```html
<!DOCTYPE html>           <!-- Define que é HTML5 -->
<html lang="pt-BR">       <!-- Idioma do documento -->
<head>
    <meta charset="UTF-8">                    <!-- Codificação de caracteres -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- viewport: controla como o site aparece em dispositivos móveis -->
    <title>Título da Página</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <!-- Conteúdo visível aqui -->
</body>
</html>
```

### Conceitos Importantes:

**DOCTYPE**: Diz ao navegador qual versão do HTML usar
**meta charset**: Define codificação (UTF-8 = suporta acentos, emojis, etc)
**meta viewport**: Essencial para responsividade em celulares

---

## 1.2 Tags Semânticas

```html
<!-- ❌ NÃO SEMÂNTICO (Ruim para SEO e acessibilidade) -->
<div class="header">
    <div class="nav">...</div>
</div>

<!-- ✅ SEMÂNTICO (Bom!) -->
<header>
    <nav>...</nav>
</header>
```

### Tags Semânticas Principais:

| Tag | Uso |
|-----|-----|
| `<header>` | Cabeçalho da página ou seção |
| `<nav>` | Menu de navegação |
| `<main>` | Conteúdo principal |
| `<section>` | Seção de conteúdo relacionado |
| `<article>` | Conteúdo independente (posts, notícias) |
| `<aside>` | Conteúdo lateral |
| `<footer>` | Rodapé |

**Por que usar?**
- Melhora SEO (Google entende melhor)
- Acessibilidade (leitores de tela)
- Código mais limpo e organizado

---

## 1.3 Classes vs IDs

```html
<!-- ID: Único, usado para JavaScript ou âncoras -->
<section id="quemsomos">...</section>

<!-- CLASS: Reutilizável, usado para estilização -->
<div class="card"></div>
<div class="card"></div>
<div class="card"></div>
```

### Regras:

✅ **IDs**: 
- Únicos na página
- Para navegação (#quemsomos)
- Para JavaScript (getElementById)

✅ **Classes**:
- Reutilizáveis
- Para estilização CSS
- Pode ter múltiplas: `class="card highlight active"`

---

## 1.4 Estrutura do Projeto Autentika

```html
<section id="quemsomos" class="section quem-somos-section">
  <!-- ID para navegação, CLASSES para estilo -->
  
  <div class="container">
    <!-- Container: limita largura e centraliza -->
    
    <h2 class="section-title">Título</h2>
    
    <div class="timeline-container">
      <div class="story-chapter">
        <div class="chapter-number">01</div>
        <div class="chapter-icon">✨</div>
        <div class="chapter-content">
          <h3 class="chapter-title">Subtítulo</h3>
          <p class="story-paragraph">
            Texto com <span class="highlight-word">destaque</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
```

**Hierarquia**:
- Section (contêiner maior)
  - Container (limita largura)
    - Timeline (organiza capítulos)
      - Chapter (cada história)
        - Number, Icon, Content

---

# 2. CSS ESSENCIAL

## 2.1 Seletores

```css
/* ELEMENTO: Seleciona TODAS as tags <p> */
p {
    color: blue;
}

/* CLASSE: Seleciona elementos com class="destaque" */
.destaque {
    color: red;
}

/* ID: Seleciona elemento com id="menu" */
#menu {
    background: black;
}

/* DESCENDENTE: <p> dentro de .container */
.container p {
    font-size: 16px;
}

/* FILHO DIRETO: <p> filho direto de .container */
.container > p {
    font-weight: bold;
}

/* MÚLTIPLAS CLASSES: elemento com AMBAS as classes */
.card.highlight {
    border: 2px solid gold;
}

/* PSEUDO-CLASSE: estados especiais */
a:hover {          /* Quando passa o mouse */
    color: red;
}

button:active {    /* Quando clica */
    transform: scale(0.95);
}

.story-chapter:nth-child(2) {  /* Segundo filho */
    animation-delay: 0.4s;
}

/* PSEUDO-ELEMENTO: cria elementos virtuais */
.timeline::before {    /* Antes do conteúdo */
    content: '';
    background: gold;
}

.quote::after {        /* Depois do conteúdo */
    content: '"';
}
```

---

## 2.2 Box Model (Modelo de Caixa)

```
┌─────────────────────────────────────┐
│           MARGIN (margem)           │ ← Espaço EXTERNO
│  ┌───────────────────────────────┐  │
│  │     BORDER (borda)            │  │
│  │  ┌─────────────────────────┐  │  │
│  │  │   PADDING (preenchimento)│  │  │ ← Espaço INTERNO
│  │  │  ┌───────────────────┐  │  │  │
│  │  │  │    CONTENT        │  │  │  │ ← Conteúdo
│  │  │  │   (conteúdo)      │  │  │  │
│  │  │  └───────────────────┘  │  │  │
│  │  └─────────────────────────┘  │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

```css
.card {
    /* Conteúdo */
    width: 300px;
    height: 200px;
    
    /* Padding (interno) */
    padding: 20px;              /* Todos os lados */
    padding: 10px 20px;         /* Vertical Horizontal */
    padding: 10px 15px 20px 15px;  /* Top Right Bottom Left */
    
    /* Border */
    border: 2px solid #333;
    border-radius: 10px;        /* Cantos arredondados */
    
    /* Margin (externo) */
    margin: 20px;
    margin: 0 auto;             /* Centraliza horizontalmente */
}

/* box-sizing: altera o cálculo do tamanho */
* {
    box-sizing: border-box;
    /* Agora width INCLUI padding e border */
}
```

---

## 2.3 Cores e Unidades

```css
.elemento {
    /* CORES */
    color: red;                              /* Nome */
    color: #D4AF37;                          /* Hexadecimal */
    color: rgb(212, 175, 55);                /* RGB */
    color: rgba(212, 175, 55, 0.5);          /* RGBA (com transparência) */
    color: hsl(45, 59%, 52%);                /* HSL */
    
    /* UNIDADES ABSOLUTAS */
    width: 100px;                            /* Pixels */
    
    /* UNIDADES RELATIVAS */
    font-size: 1rem;                         /* Relativo ao root (16px padrão) */
    font-size: 1em;                          /* Relativo ao pai */
    width: 50%;                              /* Porcentagem do pai */
    width: 50vw;                             /* 50% da largura da janela */
    height: 100vh;                           /* 100% da altura da janela */
    
    /* CÁLCULOS */
    width: calc(100% - 40px);                /* Largura total menos 40px */
}
```

### Quando usar cada unidade?

| Unidade | Uso Ideal |
|---------|-----------|
| `px` | Bordas, sombras, detalhes fixos |
| `rem` | Fontes (melhor para acessibilidade) |
| `em` | Espaçamentos proporcionais |
| `%` | Larguras responsivas |
| `vw/vh` | Elementos fullscreen |

---

## 2.4 Gradientes

```css
/* GRADIENTE LINEAR */
.box {
    background: linear-gradient(
        to right,              /* Direção: to right, to bottom, 45deg */
        #FFD700 0%,           /* Cor inicial na posição 0% */
        #D4AF37 100%          /* Cor final na posição 100% */
    );
}

/* GRADIENTE RADIAL (circular) */
.circle {
    background: radial-gradient(
        circle,                              /* Forma */
        rgba(255, 255, 255, 0.2) 0%,        /* Centro */
        transparent 70%                      /* Borda */
    );
}

/* MÚLTIPLOS GRADIENTES */
.complex {
    background: 
        radial-gradient(circle at 20% 50%, rgba(212, 175, 55, 0.05) 0%, transparent 50%),
        radial-gradient(circle at 80% 50%, rgba(212, 175, 55, 0.05) 0%, transparent 50%);
}
```

---

## 2.5 Position (Posicionamento)

```css
/* STATIC (padrão) - fluxo normal */
.normal {
    position: static;
}

/* RELATIVE - relativo à posição original */
.relative {
    position: relative;
    top: 10px;        /* Move 10px para baixo da posição original */
    left: 20px;       /* Move 20px para direita */
}

/* ABSOLUTE - relativo ao primeiro pai com position: relative */
.absolute {
    position: absolute;
    top: 0;           /* Cola no topo do pai */
    right: 0;         /* Cola na direita do pai */
}

/* FIXED - relativo à janela (não move com scroll) */
.fixed {
    position: fixed;
    top: 0;
    right: 20px;
    /* Fica fixo no topo direito, mesmo ao rolar */
}

/* STICKY - híbrido de relative e fixed */
.sticky {
    position: sticky;
    top: 0;
    /* Normal até rolar, depois fica fixo */
}
```

### Exemplo Prático: Botão Modo Escuro

```css
.dark-mode-toggle {
    position: fixed;      /* Fica fixo na tela */
    top: 100px;
    right: 20px;
    z-index: 9999;       /* Fica na frente de tudo */
}
```

---

# 3. LAYOUT COM FLEXBOX

## 3.1 Conceitos Fundamentais

Flexbox organiza elementos em uma **linha** ou **coluna**.

```css
.container {
    display: flex;    /* Ativa o Flexbox */
}
```

### Eixos do Flexbox

```
FLEX-DIRECTION: ROW (padrão)
┌────────────────────────────────┐
│  Main Axis (eixo principal) → │
│  ┌───┐  ┌───┐  ┌───┐          │
│  │ 1 │  │ 2 │  │ 3 │          │
│  └───┘  └───┘  └───┘          │
│         ↓                      │
│    Cross Axis                  │
└────────────────────────────────┘

FLEX-DIRECTION: COLUMN
┌──────────────┐
│  Main Axis   │
│      ↓       │
│   ┌────┐     │
│   │ 1  │     │
│   └────┘     │
│   ┌────┐     │
│   │ 2  │     │
│   └────┘     │
│   ┌────┐     │
│   │ 3  │     │
│   └────┘     │
│              │
│ ← Cross Axis │
└──────────────┘
```

---

## 3.2 Propriedades do Container (Pai)

```css
.container {
    display: flex;
    
    /* DIREÇÃO */
    flex-direction: row;           /* Horizontal (padrão) → */
    flex-direction: column;        /* Vertical ↓ */
    flex-direction: row-reverse;   /* Horizontal invertido ← */
    
    /* ALINHAMENTO NO EIXO PRINCIPAL */
    justify-content: flex-start;   /* Início (padrão) */
    justify-content: center;       /* Centralizado */
    justify-content: flex-end;     /* Final */
    justify-content: space-between;/* Espaço entre elementos */
    justify-content: space-around; /* Espaço ao redor */
    justify-content: space-evenly; /* Espaço igual */
    
    /* ALINHAMENTO NO EIXO CRUZADO */
    align-items: stretch;          /* Estica (padrão) */
    align-items: center;           /* Centralizado */
    align-items: flex-start;       /* Topo */
    align-items: flex-end;         /* Base */
    
    /* QUEBRA DE LINHA */
    flex-wrap: nowrap;             /* Não quebra (padrão) */
    flex-wrap: wrap;               /* Quebra se necessário */
    
    /* ESPAÇAMENTO ENTRE ELEMENTOS */
    gap: 20px;                     /* Espaço entre filhos */
}
```

### Exemplos Visuais:

```css
/* CENTRALIZAR PERFEITAMENTE */
.center {
    display: flex;
    justify-content: center;  /* Centro horizontal */
    align-items: center;      /* Centro vertical */
}

/* DISTRIBUIR COM ESPAÇO */
.header {
    display: flex;
    justify-content: space-between;  /* Logo à esquerda, menu à direita */
    align-items: center;
}
```

---

## 3.3 Propriedades dos Filhos

```css
.filho {
    /* CRESCIMENTO */
    flex-grow: 1;      /* Cresce para preencher espaço */
    flex-grow: 0;      /* Não cresce (padrão) */
    
    /* ENCOLHIMENTO */
    flex-shrink: 1;    /* Pode encolher (padrão) */
    flex-shrink: 0;    /* Não encolhe */
    
    /* TAMANHO BASE */
    flex-basis: 200px; /* Tamanho inicial */
    
    /* SHORTHAND */
    flex: 1;           /* flex-grow: 1, flex-shrink: 1, flex-basis: 0 */
    
    /* ALINHAMENTO INDIVIDUAL */
    align-self: center;  /* Alinhamento próprio, diferente do pai */
    
    /* ORDEM */
    order: 1;          /* Muda ordem visual (padrão é 0) */
}
```

---

## 3.4 Exemplo Prático: Capítulo da História

```css
.story-chapter {
    display: flex;
    flex-direction: column;    /* Empilha verticalmente */
    align-items: center;       /* Centraliza tudo */
    gap: 1rem;                 /* 16px entre elementos */
    width: 100%;
}

/* Resultado Visual:
┌──────────────────┐
│       01         │  ← chapter-number
├──────────────────┤
│       ✨         │  ← chapter-icon
├──────────────────┤
│   [Conteúdo]     │  ← chapter-content
│   [do Card]      │
└──────────────────┘
*/
```

---

# 4. ANIMAÇÕES CSS

## 4.1 Transitions (Transições)

Transitions suavizam mudanças de propriedades.

```css
.button {
    background: blue;
    transform: scale(1);
    
    /* SINTAXE: property duration timing-function delay */
    transition: all 0.3s ease 0s;
}

.button:hover {
    background: red;
    transform: scale(1.1);
    /* A mudança será suave, levando 0.3s */
}
```

### Propriedades Transition:

```css
.elemento {
    /* Transicionar propriedade específica */
    transition-property: transform;
    
    /* Duração */
    transition-duration: 0.3s;     /* 300 milissegundos */
    
    /* Curva de aceleração */
    transition-timing-function: ease;       /* Suave início/fim */
    transition-timing-function: linear;     /* Constante */
    transition-timing-function: ease-in;    /* Acelera no início */
    transition-timing-function: ease-out;   /* Desacelera no fim */
    transition-timing-function: ease-in-out;/* Acelera e desacelera */
    
    /* Atraso */
    transition-delay: 0.1s;
    
    /* Shorthand (tudo junto) */
    transition: transform 0.3s ease 0s;
    
    /* Múltiplas propriedades */
    transition: 
        transform 0.3s ease,
        opacity 0.5s linear,
        background 0.2s ease-in-out;
}
```

### Exemplo: Palavra que Cresce

```css
.highlight-word {
    color: #D4AF37;
    font-size: 1.15em;
    transition: all 0.3s ease;  /* Suaviza TODAS as mudanças */
}

.highlight-word:hover {
    color: #FFD700;             /* Muda cor */
    transform: scale(1.1);      /* Aumenta 10% */
    text-shadow: 0 2px 8px rgba(212, 175, 55, 0.3);  /* Adiciona sombra */
    /* Tudo acontece suavemente em 0.3 segundos! */
}
```

---

## 4.2 Keyframes (Animações Complexas)

Keyframes definem animações passo a passo.

```css
/* DEFINIR A ANIMAÇÃO */
@keyframes nomeDaAnimacao {
    from {                    /* Estado inicial */
        opacity: 0;
        transform: translateY(30px);
    }
    to {                      /* Estado final */
        opacity: 1;
        transform: translateY(0);
    }
}

/* OU com porcentagens */
@keyframes pulsar {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.1);
    }
    100% {
        transform: scale(1);
    }
}

/* APLICAR A ANIMAÇÃO */
.elemento {
    animation: nomeDaAnimacao 2s ease-in-out infinite;
    /*         nome      duração  timing     repetição */
}
```

### Propriedades Animation:

```css
.elemento {
    animation-name: fadeIn;              /* Nome do @keyframes */
    animation-duration: 1s;              /* Duração */
    animation-timing-function: ease;     /* Curva */
    animation-delay: 0.5s;               /* Atraso antes de iniciar */
    animation-iteration-count: 3;        /* Repetir 3 vezes */
    animation-iteration-count: infinite; /* Repetir infinito */
    animation-direction: normal;         /* Normal */
    animation-direction: reverse;        /* Reverso */
    animation-direction: alternate;      /* Vai e volta */
    animation-fill-mode: forwards;       /* Mantém estado final */
    animation-fill-mode: backwards;      /* Aplica estado inicial */
    animation-play-state: running;       /* Rodando */
    animation-play-state: paused;        /* Pausado */
    
    /* Shorthand */
    animation: fadeIn 1s ease 0.5s infinite alternate forwards;
}
```

---

## 4.3 Exemplos de Animações do Projeto

### A. Fade In com Movimento

```css
@keyframes chapterFadeIn {
    from {
        opacity: 0;                    /* Invisível */
        transform: translateY(30px);   /* 30px abaixo */
    }
    to {
        opacity: 1;                    /* Visível */
        transform: translateY(0);      /* Posição normal */
    }
}

.story-chapter {
    animation: chapterFadeIn 0.8s ease-out forwards;
}

/* Cada capítulo com delay diferente */
.story-chapter:nth-child(1) { animation-delay: 0.2s; }
.story-chapter:nth-child(2) { animation-delay: 0.4s; }
.story-chapter:nth-child(3) { animation-delay: 0.6s; }
```

### B. Ícone Flutuando

```css
@keyframes iconFloat {
    0%, 100% { 
        transform: translateY(0px);    /* Posição normal */
    }
    50% { 
        transform: translateY(-10px);  /* Sobe 10px */
    }
}

.chapter-icon {
    animation: iconFloat 3s ease-in-out infinite;
    /* Flutua continuamente */
}
```

### C. Pulso no Ícone

```css
@keyframes iconPulse {
    0%, 100% { 
        transform: scale(1);
        box-shadow: 0 5px 20px rgba(212, 175, 55, 0.4);
    }
    50% { 
        transform: scale(1.1);
        box-shadow: 0 10px 30px rgba(212, 175, 55, 0.6);
    }
}

.story-chapter-final .chapter-icon {
    animation: iconPulse 2s ease-in-out infinite;
}
```

### D. Brilho Rotativo

```css
@keyframes shineRotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

.impact-quote::before {
    animation: shineRotate 8s linear infinite;
    /* Rotaciona continuamente */
}
```

### E. Texto Brilhando

```css
@keyframes textGlow {
    0%, 100% { 
        text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.3);
    }
    50% { 
        text-shadow: 3px 3px 15px rgba(255, 255, 255, 0.8);
    }
}

.gold-text {
    animation: textGlow 2s ease-in-out infinite;
}
```

---

## 4.4 Transform (Transformações)

```css
.elemento {
    /* TRANSLAÇÃO (mover) */
    transform: translateX(50px);     /* Move 50px para direita */
    transform: translateY(-20px);    /* Move 20px para cima */
    transform: translate(50px, -20px);  /* X e Y juntos */
    
    /* ESCALA (tamanho) */
    transform: scale(1.5);           /* 150% do tamanho */
    transform: scale(0.8);           /* 80% do tamanho */
    transform: scaleX(2);            /* Dobra largura */
    transform: scaleY(0.5);          /* Metade da altura */
    
    /* ROTAÇÃO */
    transform: rotate(45deg);        /* Rotaciona 45 graus */
    transform: rotate(-90deg);       /* Sentido anti-horário */
    
    /* INCLINAÇÃO */
    transform: skewX(10deg);         /* Inclina horizontalmente */
    transform: skewY(5deg);          /* Inclina verticalmente */
    
    /* MÚLTIPLAS TRANSFORMAÇÕES */
    transform: translateX(50px) rotate(45deg) scale(1.2);
    /* Ordem importa! */
    
    /* ORIGEM DA TRANSFORMAÇÃO */
    transform-origin: center;        /* Centro (padrão) */
    transform-origin: top left;      /* Canto superior esquerdo */
    transform-origin: 50% 50%;       /* Centro em porcentagem */
}
```

### Exemplo: Card que Cresce

```css
.chapter-content {
    transition: transform 0.4s ease;
}

.chapter-content:hover {
    transform: scale(1.02);  /* Aumenta 2% */
}
```

---

# 5. JAVASCRIPT MODERNO

## 5.1 Fundamentos

### Variáveis

```javascript
// VAR (antigo, evitar)
var nome = 'João';

// LET (pode mudar)
let idade = 25;
idade = 26;  // OK

// CONST (constante, não muda)
const PI = 3.14159;
PI = 3.14;  // ERRO!

// Mas CONST com objetos/arrays pode ter propriedades alteradas
const pessoa = { nome: 'Ana' };
pessoa.nome = 'Maria';  // OK
pessoa = {};  // ERRO!
```

### Tipos de Dados

```javascript
// STRING (texto)
let nome = "João";
let sobrenome = 'Silva';
let template = `Olá, ${nome}!`;  // Template literal

// NUMBER (número)
let inteiro = 42;
let decimal = 3.14;
let negativo = -10;

// BOOLEAN (verdadeiro/falso)
let ativo = true;
let desativado = false;

// ARRAY (lista)
let numeros = [1, 2, 3, 4, 5];
let misto = ['texto', 42, true, null];

// OBJECT (objeto)
let pessoa = {
    nome: 'Ana',
    idade: 30,
    ativo: true
};

// NULL e UNDEFINED
let vazio = null;
let naoDefinido;  // undefined
```

---

## 5.2 Funções

```javascript
// FUNÇÃO TRADICIONAL
function somar(a, b) {
    return a + b;
}

// ARROW FUNCTION (moderna)
const somar = (a, b) => {
    return a + b;
};

// ARROW FUNCTION compacta
const somar = (a, b) => a + b;

// FUNÇÃO SEM PARÂMETROS
const dizerOi = () => console.log('Oi!');

// FUNÇÃO COM 1 PARÂMETRO (parênteses opcionais)
const dobro = x => x * 2;
```

---

## 5.3 DOM Manipulation (Manipular HTML)

### Selecionar Elementos

```javascript
// Por ID
const elemento = document.getElementById('quemsomos');

// Por classe (retorna o PRIMEIRO)
const card = document.querySelector('.card');

// Por classe (retorna TODOS)
const cards = document.querySelectorAll('.card');

// Por tag
const paragrafos = document.querySelectorAll('p');

// Seletores CSS complexos
const link = document.querySelector('.nav a[href="#quemsomos"]');
```

### Modificar Elementos

```javascript
const titulo = document.querySelector('h1');

// Mudar texto
titulo.textContent = 'Novo Título';
titulo.innerHTML = '<span>Título com HTML</span>';

// Mudar estilo
titulo.style.color = 'red';
titulo.style.fontSize = '32px';
titulo.style.backgroundColor = 'yellow';

// Adicionar/remover classes
titulo.classList.add('destaque');
titulo.classList.remove('antigo');
titulo.classList.toggle('ativo');  // Liga/desliga
titulo.classList.contains('ativo');  // Verifica se tem

// Mudar atributos
const link = document.querySelector('a');
link.setAttribute('href', 'https://google.com');
link.getAttribute('href');  // Pega valor
link.removeAttribute('target');
```

### Criar e Remover Elementos

```javascript
// CRIAR
const novoDiv = document.createElement('div');
novoDiv.textContent = 'Novo elemento';
novoDiv.classList.add('card');

// ADICIONAR ao DOM
document.body.appendChild(novoDiv);  // No final do body
elemento.insertBefore(novoDiv, primeiroFilho);  // Antes de outro

// REMOVER
elemento.removeChild(filho);
filho.remove();  // Mais moderno
```

---

## 5.4 Event Listeners (Escutar Eventos)

```javascript
const botao = document.querySelector('button');

// SINTAXE BÁSICA
botao.addEventListener('click', function() {
    console.log('Clicou!');
});

// COM ARROW FUNCTION
botao.addEventListener('click', () => {
    console.log('Clicou!');
});

// COM FUNÇÃO EXTERNA
function aoClicar() {
    console.log('Clicou!');
}
botao.addEventListener('click', aoClicar);

// ACESSAR O ELEMENTO CLICADO
botao.addEventListener('click', function(event) {
    console.log(this);  // O botão
    console.log(event.target);  // Também o botão
});
```

### Tipos de Eventos

```javascript
// MOUSE
elemento.addEventListener('click', handler);       // Clique
elemento.addEventListener('dblclick', handler);    // Clique duplo
elemento.addEventListener('mouseenter', handler);  // Mouse entra
elemento.addEventListener('mouseleave', handler);  // Mouse sai
elemento.addEventListener('mousemove', handler);   // Mouse move

// TECLADO
document.addEventListener('keydown', handler);     // Tecla pressionada
document.addEventListener('keyup', handler);       // Tecla solta

// FORMULÁRIO
form.addEventListener('submit', handler);          // Envio
input.addEventListener('change', handler);         // Valor mudou
input.addEventListener('input', handler);          // Digitando
input.addEventListener('focus', handler);          // Foco no campo
input.addEventListener('blur', handler);           // Perdeu foco

// SCROLL
window.addEventListener('scroll', handler);        // Rolagem

// RESIZE
window.addEventListener('resize', handler);        // Janela redimensionada
```

---

## 5.5 Exemplos do Projeto

### A. Navegação Suave

```javascript
function addSmoothNavigation() {
    // Pega TODOS os links do menu
    const navLinks = document.querySelectorAll('.nav a');
    
    // Para cada link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Cancela comportamento padrão (pular direto)
            e.preventDefault();
            
            // Pega o ID da seção (#quemsomos → quemsomos)
            const targetId = this.getAttribute('href').substring(1);
            
            // Rola suavemente até a seção
            scrollToSection(targetId);
        });
    });
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',  // Suave
            block: 'start'       // Alinha no topo
        });
    }
}
```

### B. Modo Escuro

```javascript
function addDarkModeToggle() {
    // Cria o botão
    const darkModeToggle = document.createElement('button');
    darkModeToggle.innerHTML = '🌙';
    darkModeToggle.id = 'dark-mode-toggle';
    darkModeToggle.style.cssText = `
        position: fixed;
        top: 100px;
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
    `;
    
    // Adiciona ao body
    document.body.appendChild(darkModeToggle);
    
    // Quando clicar
    darkModeToggle.addEventListener('click', () => {
        // Liga/desliga a classe 'dark-mode' no body
        document.body.classList.toggle('dark-mode');
        
        // Muda o ícone
        const isDark = document.body.classList.contains('dark-mode');
        darkModeToggle.innerHTML = isDark ? '☀️' : '🌙';
        darkModeToggle.style.background = isDark ? '#FFD700' : '#333';
    });
}
```

### C. Intersection Observer (Animar ao Aparecer)

```javascript
function addStoryChapterAnimations() {
    // Configurações
    const observerOptions = {
        threshold: 0.2,  // Ativa quando 20% está visível
        rootMargin: '0px'
    };
    
    // Cria o observador
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Se está aparecendo na tela
            if (entry.isIntersecting) {
                // Pega todos os capítulos
                const chapters = entry.target.querySelectorAll('.story-chapter');
                
                // Anima cada um com delay diferente
                chapters.forEach((chapter, index) => {
                    chapter.style.opacity = '0';
                    chapter.style.animation = 'none';
                    
                    setTimeout(() => {
                        chapter.style.animation = '';
                        chapter.style.animationDelay = `${0.3 + index * 0.2}s`;
                    }, 50);
                });
                
                // Para de observar (já animou)
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Começa a observar a seção
    const quemSomosSection = document.querySelector('.quem-somos-section');
    if (quemSomosSection) {
        observer.observe(quemSomosSection);
    }
}
```

---

## 5.6 Arrays e Loops

```javascript
const numeros = [1, 2, 3, 4, 5];

// FOR tradicional
for (let i = 0; i < numeros.length; i++) {
    console.log(numeros[i]);
}

// FOR...OF (mais moderno)
for (const numero of numeros) {
    console.log(numero);
}

// FOREACH (método de array)
numeros.forEach((numero, index) => {
    console.log(`Índice ${index}: ${numero}`);
});

// MAP (transforma cada elemento)
const dobrados = numeros.map(num => num * 2);
// [2, 4, 6, 8, 10]

// FILTER (filtra elementos)
const pares = numeros.filter(num => num % 2 === 0);
// [2, 4]

// FIND (encontra o primeiro)
const maior3 = numeros.find(num => num > 3);
// 4

// REDUCE (acumula valor)
const soma = numeros.reduce((acc, num) => acc + num, 0);
// 15
```

---

# 6. RESPONSIVIDADE

## 6.1 Media Queries

```css
/* Estilos padrão (desktop) */
.container {
    width: 1200px;
    padding: 20px;
}

/* TABLET (até 768px) */
@media (max-width: 768px) {
    .container {
        width: 100%;
        padding: 15px;
    }
    
    .story-chapter {
        font-size: 1rem;
    }
}

/* MOBILE (até 480px) */
@media (max-width: 480px) {
    .container {
        padding: 10px;
    }
    
    .story-chapter {
        font-size: 0.9rem;
    }
    
    .timeline-container::before {
        display: none;  /* Remove linha no mobile */
    }
}

/* ORIENTAÇÃO */
@media (orientation: landscape) {
    /* Quando na horizontal */
}

@media (orientation: portrait) {
    /* Quando na vertical */
}

/* RESOLUÇÃO ALTA (Retina) */
@media (-webkit-min-device-pixel-ratio: 2),
       (min-resolution: 192dpi) {
    /* Imagens 2x para telas Retina */
}
```

---

## 6.2 Breakpoints Comuns

```css
/* Mobile First (começa do menor) */
.elemento {
    width: 100%;  /* Mobile padrão */
}

@media (min-width: 576px) {
    /* Small devices (landscape phones) */
    .elemento { width: 540px; }
}

@media (min-width: 768px) {
    /* Medium devices (tablets) */
    .elemento { width: 720px; }
}

@media (min-width: 992px) {
    /* Large devices (desktops) */
    .elemento { width: 960px; }
}

@media (min-width: 1200px) {
    /* Extra large devices (large desktops) */
    .elemento { width: 1140px; }
}
```

---

## 6.3 Técnicas Responsivas

### A. Imagens Responsivas

```css
img {
    max-width: 100%;  /* Nunca ultrapassa o container */
    height: auto;     /* Mantém proporção */
}
```

### B. Tipografia Fluida

```css
/* Usando clamp (mínimo, ideal, máximo) */
h1 {
    font-size: clamp(1.5rem, 5vw, 3rem);
    /* Min: 1.5rem, Ideal: 5% da tela, Max: 3rem */
}
```

### C. Grid Responsivo

```css
.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
}
/* Cria colunas automáticas de no mínimo 250px */
```

### D. Flexbox Responsivo

```css
.container {
    display: flex;
    flex-wrap: wrap;  /* Quebra linha quando necessário */
}

.item {
    flex: 1 1 300px;  /* Grow, shrink, base */
    /* Mínimo 300px, depois cresce igualmente */
}
```

---

## 6.4 Mobile First vs Desktop First

```css
/* MOBILE FIRST (recomendado) */
/* Estilos base para mobile */
.elemento {
    font-size: 14px;
}

/* Adiciona complexidade para telas maiores */
@media (min-width: 768px) {
    .elemento {
        font-size: 16px;
    }
}

/* DESKTOP FIRST */
/* Estilos base para desktop */
.elemento {
    font-size: 16px;
}

/* Remove complexidade para telas menores */
@media (max-width: 768px) {
    .elemento {
        font-size: 14px;
    }
}
```

**Por que Mobile First?**
- Maioria dos usuários em mobile
- Força a priorizar conteúdo essencial
- Performance melhor em dispositivos móveis

---

# 7. BOAS PRÁTICAS

## 7.1 Organização CSS

```css
/* ===========================
   1. RESET E VARIÁVEIS
   =========================== */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    --cor-primaria: #D4AF37;
    --cor-secundaria: #FFD700;
    --fonte-base: 16px;
}

/* ===========================
   2. TIPOGRAFIA
   =========================== */
body {
    font-family: Arial, sans-serif;
    font-size: var(--fonte-base);
}

/* ===========================
   3. LAYOUT GERAL
   =========================== */
.container {
    max-width: 1200px;
    margin: 0 auto;
}

/* ===========================
   4. COMPONENTES
   =========================== */
.card { ... }
.button { ... }

/* ===========================
   5. RESPONSIVIDADE
   =========================== */
@media (max-width: 768px) { ... }
```

---

## 7.2 Nomenclatura (BEM)

```html
<!-- Block__Element--Modifier -->

<div class="card">                    <!-- Block -->
    <div class="card__header">        <!-- Element -->
        <h3 class="card__title">Título</h3>
    </div>
    <div class="card__body">
        <p class="card__text">Texto</p>
    </div>
    <button class="card__button card__button--primary">
        <!-- Modifier (variação) -->
        Ação
    </button>
</div>
```

**Vantagens:**
- Clara hierarquia
- Evita conflitos de nomes
- Fácil manutenção

---

## 7.3 Performance

### CSS

```css
/* ❌ EVITAR */
* {
    transition: all 1s;  /* Pesado! */
}

div div div p {  /* Muito específico */
    color: red;
}

/* ✅ MELHOR */
.texto-destaque {
    color: red;
    transition: color 0.3s;  /* Específico */
}

/* OTIMIZAR ANIMAÇÕES */
@keyframes slide {
    from {
        /* Use transform e opacity (melhor performance) */
        transform: translateX(-100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

/* Evite animar: width, height, top, left */
```

### JavaScript

```javascript
// ❌ EVITAR (dentro de loop)
for (let i = 0; i < 1000; i++) {
    const elemento = document.querySelector('.item');  // Busca 1000x!
}

// ✅ MELHOR
const elemento = document.querySelector('.item');  // Busca 1x
for (let i = 0; i < 1000; i++) {
    // Usa elemento
}

// DEBOUNCE (evita execuções excessivas)
let timeout;
window.addEventListener('resize', () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        // Executa só depois de parar de redimensionar
        console.log('Redimensionou!');
    }, 300);
});
```

---

## 7.4 Acessibilidade

```html
<!-- SEMÂNTICA -->
<header>...</header>
<nav>...</nav>
<main>...</main>
<footer>...</footer>

<!-- ALT TEXT em imagens -->
<img src="logo.png" alt="Logo da Autêntica">

<!-- ARIA LABELS -->
<button aria-label="Fechar menu">×</button>

<!-- FOCO VISÍVEL -->
<style>
button:focus {
    outline: 2px solid blue;
    /* Nunca: outline: none; sem alternativa */
}
</style>

<!-- CONTRASTE -->
/* Mínimo 4.5:1 para texto normal */
/* Mínimo 3:1 para texto grande */

<!-- TAMANHO MÍNIMO DE TOQUE -->
<style>
button {
    min-width: 44px;
    min-height: 44px;
}
</style>
```

---

## 7.5 SEO

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <!-- TÍTULO (50-60 caracteres) -->
    <title>Autêntica - Moda Artesanal com História</title>
    
    <!-- DESCRIÇÃO (150-160 caracteres) -->
    <meta name="description" content="Conheça a história da Autêntica, marca de moda artesanal que valoriza cada detalhe e a força da mulher empreendedora.">
    
    <!-- OPEN GRAPH (redes sociais) -->
    <meta property="og:title" content="Autêntica - Nossa História">
    <meta property="og:description" content="De um sonho a uma marca consolidada">
    <meta property="og:image" content="https://site.com/imagem.jpg">
    
    <!-- FAVICON -->
    <link rel="icon" type="image/png" href="favicon.png">
</head>
<body>
    <!-- HIERARQUIA DE TÍTULOS -->
    <h1>Título Principal</h1>      <!-- Só 1 por página -->
    <h2>Subtítulo</h2>
    <h3>Sub-subtítulo</h3>
    
    <!-- LINKS DESCRITIVOS -->
    <a href="#quemsomos">Conheça nossa história</a>
    <!-- Evitar: "Clique aqui" -->
</body>
</html>
```

---

# 📚 RECURSOS PARA CONTINUAR APRENDENDO

## Documentação Oficial
- **MDN Web Docs**: https://developer.mozilla.org
- **CSS Tricks**: https://css-tricks.com
- **W3Schools**: https://www.w3schools.com

## Cursos Gratuitos
- **freeCodeCamp**: https://www.freecodecamp.org
- **Curso em Vídeo**: https://www.cursoemvideo.com
- **Rocketseat**: https://www.rocketseat.com.br

## Ferramentas Úteis
- **CodePen**: https://codepen.io (testar código)
- **Can I Use**: https://caniuse.com (compatibilidade)
- **Flexbox Froggy**: https://flexboxfroggy.com (aprender Flexbox)
- **Grid Garden**: https://cssgridgarden.com (aprender Grid)

## Extensões do VS Code
- **Live Server**: Servidor local com reload automático
- **Prettier**: Formata código automaticamente
- **Auto Rename Tag**: Renomeia tags HTML em par
- **CSS Peek**: Vai direto para definição CSS

---

# 🎯 EXERCÍCIOS PRÁTICOS

## Nível Iniciante

1. **Criar um card simples**
   - Título, imagem, texto, botão
   - Adicionar hover no botão

2. **Menu de navegação**
   - Horizontal com links
   - Hover que muda cor

3. **Formulário básico**
   - Nome, email, mensagem
   - Validação com JavaScript

## Nível Intermediário

4. **Gallery de imagens**
   - Grid responsivo
   - Efeito de zoom no hover

5. **Modal (popup)**
   - Abre ao clicar
   - Fecha com X ou fundo

6. **Tabs (abas)**
   - Troca conteúdo ao clicar
   - Animação suave

## Nível Avançado

7. **Slider de imagens**
   - Navegação com setas
   - Auto-play opcional

8. **Scroll animado**
   - Elementos aparecem ao rolar
   - Parallax effect

9. **Dark Mode completo**
   - Salva preferência (localStorage)
   - Transição suave entre modos

---

# 🚀 PROJETO FINAL SUGERIDO

Crie uma **landing page** completa com:

✅ Header fixo com navegação suave
✅ Seção hero com call-to-action
✅ Sobre nós com timeline
✅ Galeria de produtos/serviços
✅ Depoimentos com animações
✅ Formulário de contato funcional
✅ Footer com redes sociais
✅ Modo escuro
✅ Totalmente responsivo

**Bônus:**
- Scroll reveal (elementos aparecem)
- Smooth scrolling
- Animações personalizadas
- Performance otimizada

---

# 📝 CHECKLIST DE PROJETO

Antes de publicar, verifique:

**HTML**
- [ ] Semântica correta
- [ ] Meta tags preenchidas
- [ ] Alt text em imagens
- [ ] Favicon adicionado

**CSS**
- [ ] Reset aplicado
- [ ] Código organizado e comentado
- [ ] Responsivo em todos os tamanhos
- [ ] Sem erros de sintaxe

**JavaScript**
- [ ] Código limpo e comentado
- [ ] Eventos funcionando
- [ ] Sem erros no console
- [ ] Performance otimizada

**Geral**
- [ ] Testado em múltiplos navegadores
- [ ] Acessibilidade verificada
- [ ] SEO otimizado
- [ ] Carregamento rápido

---

# 🎓 CONCLUSÃO

Parabéns por chegar até aqui! 🎉

Você aprendeu:
- ✅ HTML semântico e estruturado
- ✅ CSS moderno com Flexbox
- ✅ Animações e transições
- ✅ JavaScript para interatividade
- ✅ Responsividade e media queries
- ✅ Boas práticas e performance

**Próximos passos:**
1. Pratique MUITO! Crie projetos próprios
2. Estude frameworks (React, Vue, etc)
3. Aprenda backend (Node.js, PHP, etc)
4. Contribua com projetos open-source

**Lembre-se:**
> "A melhor forma de aprender é fazendo!"

Continue estudando, experimentando e criando! 💪🚀

---

**Autor**: Guia criado para o projeto Autentika
**Data**: 2025
**Licença**: Use livremente para aprender! 📚✨


