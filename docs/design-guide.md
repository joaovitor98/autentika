# Guia de Design – Tema Natal (Claro)

## Tipografia
- Primária: "Yusei Magic", Segoe UI, Helvetica Neue, Arial, sans-serif
- Títulos/Logo: "Zen Antique Soft", Times New Roman, serif
- Legibilidade: line-height 1.6; peso consistente por nível; uso de sombras apenas quando necessário para contraste

## Cores
- Ícones (referência terceira imagem): #0d0d0d
- Texto em áreas claras do Natal: #0d0d0d
- Acentos: Verde #0f7b2d, Vermelho #c21d1d, Ouro #FFD700
- Variáveis: --natal-primary: #0f7b2d; --natal-text-on-light: #0d0d0d; --color-white: #FFFFFF

## Aplicação
- Em modo claro do Natal, textos principais usam --natal-text-on-light
- Em header/gradientes escuros, textos permanecem brancos para contraste
- Links em modo claro seguem --natal-text-on-light; hover utiliza vermelho #c21d1d

## Fallback
- Fontes possuem pilhas com alternativas nativas do sistema
- Caso webfonts indisponíveis, renderiza com fontes de sistema mantendo proporções

## Acessibilidade
- Contraste alvo ≥ 4.5:1 para corpo de texto
- Testes automatizados disponíveis via parâmetro `?natalA11y=1`