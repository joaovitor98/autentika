![][image1]

**CENTRO UNIVERSITÁRIO DO PLANALTO CENTRAL**

**APPARECIDO DOS SANTOS**

**ANÁLISE E DESENVOLVIMENTO DE SISTEMAS**

**Autentika**

Gama-DF

2025

ALEX ALVES NOBRE \- 0022534

DAVID VICTOR SOUSA MARINHEIRO \- 0022790

GABRIEL LUCAS ALVES DA SILVA \- 0022454

JOÃO VITOR BRANDÃO DA SILVA \- 0006479

MATHEUS NASCIMENTO CARDOSO \- 0022459

THIAGO COSTA RENOVATO \- 0022488

TULIO CÉZAR CARDOSO DA ROCHA \- 0001709

WESLEY THIAGO MATIAS XAVIER – 0022756

**Autentika**

O projeto desenvolve um site estático para a marca Autêntica usando HTML, GitHub Pages e VS Code. O objetivo é criar presença digital simples, com páginas Home, Sobre, Produtos e Contato. A solução melhora visibilidade, facilita manutenção e serve de base para evoluções futuras com CSS e JavaScript.

Orientador: prof. Wendreson de Asevedo Rossini

Gama-DF

2025

Sumário  
[**1\.**	**Introdução**	4](#introdução)

[**2\.**	**Objetivos**	4](#objetivos)

[**2.1.**	**Objetivos Gerais**	4](#objetivos-gerais)

[**2.2.**	**Objetivos Específicos**	5](#objetivos-específicos)

[**3\.**	**Metodologias**	5](#metodologias)

[**3.1.**	**Métodos e Procedimentos**	5](#métodos-e-procedimentos)

[**4\.**	**Requisitos**	5](#requisitos)

[**4.1.**	**Requisitos Funcionais**	5](#requisitos-funcionais)

[**4.2.**	**Requisitos Não-Funcionais**	6](#requisitos-não-funcionais)

[**5\.**	**Organização do Time e Hierarquia**	6](#organização-do-time-e-hierarquia)

[**6\.**	**Arquitetura do Projeto**	6](#arquitetura-do-projeto)

[**7\.**	**Problemas Identificados**	7](#problemas-identificados)

[**8\.**	**Desenvolvimento**	8](#desenvolvimento)

[**9\.**	**Resultados e Cronograma**	9](#resultados-e-cronograma)

[**9.1.**	**Resultados esperados (em marcadores):**	9](#resultados-esperados-\(em-marcadores\):)

[**9.2.**	**Cronograma (exemplo em 5 etapas):**	9](#cronograma-\(exemplo-em-5-etapas\):)

[**9.3.**	**Gestão de comunicação, riscos e stakeholders**	9](#gestão-de-comunicação,-riscos-e-stakeholders)

[**9.4.**	**Gestão de riscos.**	9](#gestão-de-riscos.)

[**10\.**	**Discussão**	9](#discussão)

[**11\.**	**Conclusão**	10](#conclusão)

[**12\.**	**Referências Bibliográficas**	11](#referências-bibliográficas)

1. **Introdução**

Este trabalho descreve, de forma objetiva e acessível, a construção de um site simples para a marca de moda Autêntica (Autentika). Como somos iniciantes, o projeto será desenvolvido exclusivamente com HTML (estrutura e conteúdo), utilizando o VS Code e um repositório no GitHub para versionamento e publicação via GitHub Pages. O foco é apresentar a história da empreendedora, expor os produtos com clareza e facilitar o contato com clientes, sem dependências avançadas ou bibliotecas complexas.

Problema/questão de pesquisa. Falta à marca um canal digital próprio, estável e fácil de manter, que comunique sua identidade e organize o portfólio de peças. Pergunta central: como criar, com HTML e ferramentas básicas, um site que represente a Autêntica e apoie o relacionamento com clientes?

Justificativa. Um site limpo, leve e de manutenção simples melhora a visibilidade, profissionaliza o atendimento e cria base para evoluções futuras (ex.: CSS externo, JavaScript, carrinho de compras). Ao limitar o escopo a HTML \+ GitHub Pages, reduzimos a curva de aprendizado e garantimos entregas rápidas, favorecendo o aprendizado do grupo.

Objetivo geral. Planejar, desenvolver e publicar um site estático em HTML, com páginas Home, Sobre, Produtos e Contato, organizado para leitura em computadores e celulares.

2. **Objetivos**  
   1. **Objetivos Gerais**

Desenvolver um site funcional e personalizado que atenda às necessidades específicas de uma cliente real, utilizando as tecnologias fundamentais da web \- HTML, CSS e JavaScript. Este projeto visa criar uma presença digital eficaz que não apenas represente adequadamente a marca, mas que também ofereça uma experiência de usuário intuitiva e atraente.

Aplicar os conhecimentos teóricos adquiridos em sala de aula em um contexto prático e real, integrando corretamente as três linguagens de desenvolvimento web: HTML para estruturação do conteúdo, CSS para estilização e design visual, e JavaScript para implementação de interatividade e dinamismo (W3C, 2022).

Promover o desenvolvimento de competências técnicas essenciais para a formação em Análise e Desenvolvimento de Sistemas, incluindo versionamento de código, responsividade para diferentes dispositivos, acessibilidade digital e princípios de design centrado no usuário (NIELSEN, 2011).

Implementar boas práticas de desenvolvimento web seguindo os padrões internacionais estabelecidos pelo World Wide Web Consortium (W3C) e as recomendações atuais de experiência do usuário, garantindo assim um produto final de qualidade técnica e profissional (SILVA, 2019).

Documentar todo o processo de desenvolvimento de forma clara e metodológica, desde a análise de requisitos até a implementação final, criando um material que evidencie a evolução do aprendizado e sirva como referência para projetos futuros.

2. **Objetivos Específicos**

Organizar o conteúdo do site usando marcação HTML semântica (como \<header\>, \<section\> e \<footer\>), definindo claramente as seções principais (Home, Sobre, Produtos e Contato).

Padronizar navegação e estilo em todas as páginas, mantendo o mesmo cabeçalho, rodapé e layout básico para que o site tenha aparência uniforme e uma experiência de uso consistente.

Implementar validações nativas do HTML5 no formulário de contato, definindo campos obrigatórios (nome e e-mail) e tipos de entrada corretos para garantir que os dados sejam preenchidos adequadamente.

Publicar o site no GitHub Pages como páginas estáticas, facilitando o acesso público ao site e a realização de atualizações futuras de forma simples.

3. **Metodologias**

Escopo. O MVP contempla quatro páginas estáticas em HTML: Home (resumo da história e proposta da marca), Sobre (trajetória completa e valores), Produtos (vitrine com fotos, descrições curtas e preços, quando aplicável) e Contato (formulário simples e links para redes sociais). Nesta fase não haverá CSS externo nem JavaScript; os estilos serão mínimos e apenas quando indispensáveis (ex.: alinhamento básico, imagens com atributos responsivos nativos do HTML). A publicação será feita pelo GitHub Pages.

1. **Métodos e Procedimentos**  
* Levantamento de conteúdo e requisitos.  
* Benchmark leve de referências do setor para inspirar organização do conteúdo.  
* Protótipo em papel (ou rascunho direto no VS Code).  
* Marcação HTML semântica.  
* Revisão entre colegas.  
* Publicação no GitHub Pages.  
* Coleta de feedback e ajustes.

Ferramentas e tecnologias. VS Code (edição), Git/GitHub (versão e publicação), GitHub Pages (hospedagem estática). Validações e acessibilidade utilizarão recursos nativos do HTML (labels, alt-text, atributos obrigatórios, títulos e listas).

Recursos. Computadores pessoais dos integrantes, conexão à internet, tempo de estudo e produção distribuídos conforme cronograma. Restrições: evitar dependências externas e manter o site fácil de editar.

4. **Requisitos**  
   1. **Requisitos Funcionais**  
* Padrão de páginas: Home, Sobre, Produtos, Contato (arquivos .html separados).  
* Cabeçalho comum com título/nome da marca e navegação entre páginas (links  
* \<a\>).  
* Seções claras por página (títulos \<h1\>–\<h3\>, parágrafos \<p\>, listas \<ul\>/\<ol\>).  
* Vitrine de produtos: figuras com \<img\> (com alt), nome do produto, breve descrição e, se houver, preço.  
* Página de Contato com formulário HTML5: nome, e-mail, mensagem (campos obrigatórios e tipos corretos).  
* Links para redes sociais e/ou WhatsApp da marca.  
* Acessibilidade básica: texto alternativo em imagens; rótulos (\<label\>) associados aos campos; hierarquia de títulos coerente; contraste legível.  
* Publicação no GitHub Pages com um README explicando como editar e atualizar conteúdo.  
  2. **Requisitos Não-Funcionais**  
* CSS externo para identidade visual completa e responsividade avançada.  
* Componentes interativos (carrossel, filtros, modais) via JavaScript.  
* Integração com carrinho/checkout.  
* Blog/novidades com arquivo de posts.  
* Métricas/analytics e SEO avançado.  
5. **Organização do Time e Hierarquia**  
* Scrum Master: Gabriel Lucas — coordenação, facilitação, organização do backlog e das revisões.  
* Back-end (Java): João Vitor — páginas Home e Sobre.  
* Front-end (HTML): Matheus Santos — páginas Produtos e Contato.  
* Resultados esperados: David Marinho.  
* Cronograma: Alex Alves.  
* Gestão de Riscos: Túlio Rocha.  
* Stakeholders e Comunicação: Thiago Renovato.  
* Padrões/Referências e Revisão final: Wesley Santiago.  
6. **Arquitetura do Projeto**

O projeto Autentika visa desenvolver uma loja online de vestidos utilizando uma stack tecnológica integrada onde o Java com Spring Boot atuará no back-end para simplificar a lógica e configuração do servidor, o MongoDB será o banco de dados NoSQL para armazenar as informações de forma flexível, e o Thymeleaf, integrado com HTML e CSS, será responsável por gerar e estilizar as páginas web no front-end.

Java \+ Spring Boot: Java é a linguagem de programação escolhida para o servidor. O Spring Boot é um framework que fornece um setup rápido e completo do aplicativo. Ele cria por padrão um servidor embarcado (como Tomcat), gerencia dependências e configuração automaticamente, reduzindo código boilerplate. Por exemplo, Spring Boot “facilita a criação de aplicações CRUD” (Spring.io). Isso significa que podemos definir um repositório de dados e ele já implementa muitas operações básicas. Com Spring MVC (parte do Spring Boot), criamos controladores em Java que respondem a requisições HTTP (como exibir um produto ou processar um pedido) e retornam páginas HTML.

Thymeleaf: É o mecanismo de template usado nas páginas. Em vez de escrever JSP ou outro template, usamos arquivos HTML com atributos do Thymeleaf para inserir variáveis Java no HTML. O Thymeleaf faz o renderizado no servidor, ou seja, ele pega dados do Java (por exemplo, detalhes de um produto) e gera o HTML final que o usuário verá. Ele se integra perfeitamente ao Spring: usamos o método do controlador para devolver o nome de uma view (arquivo .html) e o Thymeleaf processa esse template substituindo expressões.

MongoDB: O banco de dados escolhido é o MongoDB, um banco orientado a documentos (NoSQL). Diferentemente de um banco relacional, ele armazena objetos JSON, o que traz flexibilidade para modelos de dados dinâmicos (como descrições de produtos variáveis). Segundo a documentação oficial do Spring, usamos o Spring Data MongoDB para integrar com facilidade o Spring Boot ao MongoDB: podemos usar Spring Data MongoDB para construir uma aplicação que armazena e recupera dados do MongoDB, um banco de dados orientado a documentos.

HTML e CSS: Embora não sejam linguagens de programação, são essenciais para a parte visual. O HTML define o conteúdo das páginas (títulos, campos de formulário, imagens de produtos) e o CSS define estilos (cores, espaçamentos, fontes). Por exemplo, HTML é “uma linguagem de marcação que define a estrutura das páginas web, incluindo texto, imagens e links”, enquanto CSS é “uma linguagem de folhas de estilo usada para controlar o layout, aparência e design do conteúdo web, como cores e fontes”. Usaremos HTML para criar templates e CSS (e possivelmente frameworks como Bootstrap) para deixar a interface visualmente atrativa e responsiva.

7. **Problemas Identificados**  
* Falta de oportunidades locais: cidade pequena, poucas opções de emprego e mercado restrito.  
* Falta de conhecimento inicial: não sabia costurar, aprendeu do zero com ajuda de vizinha.  
* Recursos financeiros limitados: comprou a primeira máquina com o único dinheiro que tinha.  
* Curva de aprendizado: muitos erros no começo, dificuldade em adquirir experiência.  
* Crescimento lento: precisou trabalhar para outros por cerca de um ano antes de abrir a marca.  
* Necessidade de expansão: já tem marca, equipe e produção, mas sente dificuldade em ampliar e alcançar novos clientes.  
* Falta de digitalização: o negócio parece ser mais físico/local, sem forte presença online, daí a necessidade do site.  
* Segurança digital: risco de fraudes, clonagem de cartão e vazamento de dados.  
* Pagamento: carrinho abandonado, falta de opções (PIX, boleto, cartão), checkout complicado.  
* Logística: atrasos na entrega, cálculo errado do frete, devoluções complicadas.  
* Usabilidade do site: design confuso, navegação difícil, falta de responsividade em celular.  
* Concorrência: mercado de moda é saturado, difícil se destacar sem diferencial.  
* Atendimento ao cliente: demora em responder dúvidas, falta de suporte no pós-venda.  
* Experiência do consumidor: Fotos que não mostram bem o produto, falta de tabela de medidas confiável, descrições incompletas.  
* Marketing digital: sem divulgação adequada, o site pode não atrair clientes suficientes.

8. **Desenvolvimento**

O desenvolvimento do site será realizado em etapas claras, aproveitando a história da fundadora e o crescimento da marca Autêntica para inspirar o design e o conteúdo. As principais ações serão:

Planejamento e organização: Escolher um editor de código (por exemplo, Visual Studio Code) e criar a estrutura inicial do projeto em uma pasta dedicada. Elaborar um esboço do site em papel ou ferramenta de prototipagem (como Figma), definindo as páginas necessárias: Home, Sobre, Produtos e Contato. A página Home apresentará a trajetória da costureira, do aprendizado com a vizinha costureira até a criação da marca, e destacará o propósito da Autêntica. A página Sobre contará a história completa da fundadora e sua visão para a empresa. A página Produtos mostrará as peças confeccionadas, com fotos, descrições e opções de contato para encomendas. A página Contato incluirá formulário de contato e informações de contato físico ou redes sociais.

Análise de sites de referência: como inspiração, estudaremos o layout, a usabilidade e a organização de sites de moda e e‑commerce, como Zattini, Morena Rosa e Viva Dress, além de outros do setor, para identificar boas práticas de design, navegação intuitiva e apresentação de produtos. As ideias e recursos visuais desses sites servirão de base para definir a experiência do usuário no site Autêntica.

Criação da estrutura HTML: Codificar a estrutura básica de cada página usando tags semânticas como \<header\>, \<nav\>, \<main\> e \<footer\>. No cabeçalho, adicionar o logotipo e a barra de navegação para as diferentes páginas. No corpo de cada página, separar as seções (por exemplo, a história em uma \<section\> com títulos e parágrafos, e a vitrine de produtos em \<div\>s organizados). Garantir que todas as páginas compartilhem uma estrutura consistente para facilitar a navegação.

Estilização com CSS: Criar um arquivo style.css e vinculá-lo ao HTML. Definir a identidade visual do site com cores, fontes e elementos gráficos que reflitam a autenticidade e criatividade da marca. Utilizar Flexbox ou CSS Grid para organizar as seções de forma responsiva, adaptando o layout a diferentes tamanhos de tela. Aplicar media queries para garantir boa usabilidade em dispositivos móveis. Personalizar botões, menus e textos de acordo com a personalidade da marca.

Integração e interatividade: Interligar as páginas por meio dos links de navegação, garantindo uma experiência fluida para os visitantes. Adicionar componentes interativos básicos, como um formulário de contato que valide os campos com JavaScript simples ou com HTML5. Incluir uma galeria de fotos dos produtos com carrossel ou slider para destacar as peças. Se desejado, implementar um blog ou seção de notícias para compartilhar novidades da marca.

Ajustes e melhorias: Testar o site em diferentes navegadores e dispositivos, realizando ajustes no layout, nas imagens e nos tempos de carregamento. Pedir feedback aos colaboradores e potenciais clientes para refinar o design e o conteúdo. Otimizar as imagens (por exemplo, usando formatos como WebP) e incluir textos alternativos para acessibilidade. Se necessário, ajustar o cronograma de implementação, inserir novas páginas ou atualizar a paleta de cores para melhor adequação à identidade visual. 

Hospedagem e manutenção: Após finalizar o site, escolher uma opção de hospedagem estática, como GitHub Pages ou um plano básico de hospedagem, para tornar o site acessível ao público. Configurar um repositório Git para versionar o código e facilitar futuras atualizações. Monitorar o desempenho do site, atualizar o conteúdo com novos produtos e garantir que a marca Autêntica continue representada de forma fiel à sua história.

9. **Resultados e Cronograma**  
   1. **Resultados esperados (em marcadores):**  
* Site estático navegável com quatro páginas consistentes.  
* Conteúdo textual claro e imagens com alt-text.  
* Formulário de contato funcional (validações nativas do HTML5).  
* Publicação no GitHub Pages e README de manutenção.  
* Seção de produtos simples, objetiva e fácil de atualizar.  
  2. **Cronograma (exemplo em 5 etapas):**  
* Etapa 1 — Levantamento e rascunho: conteúdo, mapa do site e protótipo simples.  
* Etapa 2 — Marcação HTML das páginas: estrutura e navegação.  
* Etapa 3 — Imagens e acessibilidade: ajuste de dimensões e alt-text; revisão dos títulos.  
* Etapa 4 — Formulário de contato e revisão cruzada: validações e testes básicos.  
* Etapa 5 — Publicação no GitHub Pages e ajustes finais após feedback.  
  3. **Gestão de comunicação, riscos e stakeholders**

Gestão de comunicação. Reuniões rápidas no início e no fim de cada etapa; checklist compartilhado; registro de decisões em um arquivo LOG.md no repositório.

4. **Gestão de riscos.**  
* Imagens muito pesadas — mitigar reduzindo dimensões e usando formatos leves;  
* Inconsistência de navegação — padronizar cabeçalho/rodapé e links;  
* Problemas na publicação — seguir o passo a passo do README e checar configurações do GitHub Pages.  
* Stakeholders. Empreendedora da marca, equipe de alunos, docentes/avaliadores e futuros clientes/usuários do site.  
10. **Discussão**

A opção por HTML puro no MVP traz simplicidade, transparência e facilidade de manutenção, ao custo de menor personalização visual e ausência de interações mais ricas. Para os objetivos imediatos — contar a história da marca, expor produtos e abrir um canal de contato — os benefícios superam as limitações. O projeto também cria uma base didática para evoluções futuras, quando o grupo estiver confortável para introduzir CSS externo (identidade visual), JavaScript (interatividade) e integrações (catálogo dinâmico ou checkout).

11.   **Conclusão**

Este projeto entrega à Autêntica um primeiro passo concreto e sustentável de presença digital: um site estático, claro e publicável com HTML puro, capaz de narrar a história da marca, expor produtos de modo organizado e abrir um canal direto de contato. A decisão de limitar a tecnologia (HTML \+ VS Code \+ GitHub/GitHub Pages) não é uma limitação de valor, mas uma estratégia pedagógica e operacional: reduz custo e complexidade, acelera a publicação e favorece que toda a equipe consiga manter e evoluir o site sem dependências.

Do ponto de vista de negócio, a entrega resolve a ausência de um canal próprio (dor principal), melhora a percepção de profissionalismo e cria uma base para crescimento orgânico: com títulos bem definidos, descrições objetivas, imagens padronizadas e um formulário funcional, a marca passa a comunicar seus valores, diferenciais e catálogo de forma consistente. Do ponto de vista de equipe, o projeto consolida uma rotina de versionamento e publicação (GitHub Pages) e institui um guia de manutenção (README) que permite rotatividade saudável entre integrantes, sem perder qualidade. Para evidenciar impacto já no curto prazo, definimos metas de 15 dias após a publicação:

* Catálogo inicial com pelo menos 12 peças (nome, descrição breve, 1 foto nítida e alt descritivo).  
* Imprensa/Redes: 2 posts de lançamento que apontem para a Home e para  
* Produtos.  
* Leads: ao menos 10 mensagens recebidas via formulário (contatos reais de interesse).  
* Revisão pública: 1 rodada de feedback com 3 clientes/parceiros para ajustes de texto e fotos.  
* E, para o próximo ciclo (30–60 dias), um roteiro de evolução gradual:  
* Nível 1 (Identidade visual): introduzir CSS externo para tipografia, cores e espaçamento padronizado.  
* Nível 2 (Interatividade): adicionar JavaScript para carrossel simples e filtros de produtos.  
* Nível 3 (Comercial): integrar checkout e meios de pagamento, ou migrar a vitrine para uma plataforma leve de e-commerce mantendo a identidade do site.

Em síntese, publicamos algo que importa agora — o site mínimo funcional — e preparamos o terreno para que a Autêntica cresça com segurança, aprendendo em ciclos. A marca ganha uma vitrine oficial, com narrativa coerente e conteúdo controlado pela própria equipe; os alunos ganham um caso real de planejamento, desenvolvimento, publicação e manutenção que fecha bem este trabalho e abre o novo passo da Autêntica no ambiente digital.

O projeto para a marca Autentika optou por uma abordagem simples e eficaz, usando HTML puro, VS Code e GitHub Pages. Essa estratégia foi escolhida para reduzir a complexidade e os custos, além de acelerar a publicação do site.

Para a marca, o projeto resolve a falta de um canal digital próprio, oferecendo uma vitrine virtual clara e organizada, que eleva o profissionalismo e estabelece uma base para um crescimento futuro. Para a equipe, foi uma oportunidade de aplicar conhecimentos práticos, consolidando o uso de ferramentas como o 

GitHub Pages para versionamento e publicação. O projeto também já prevê a evolução futura com a inclusão de 

CSS e JavaScript em ciclos posteriores. Em resumo, o trabalho entrega um produto funcional que atende à necessidade imediata da marca e, ao mesmo tempo, prepara o caminho para seu crescimento digital.

12.  **Referências Bibliográficas**

MORENA ROSA. *Roupas femininas para mulheres modernas*. \[online\]. Disponível em: https://www.morenarosa.com.br/. Acesso em: 03 set. 2025\.

NIELSEN, Jakob. *Parallel & Iterative Design \+ Competitive Testing \= High Usability*. Nielsen Norman Group, 17 jan. 2011\. Disponível em: https://www.nngroup.com/articles/parallel-and-iterative-design/. Acesso em: 03 set. 2025\.

SPRING.IO. *Building an Application with Spring Boot*. \[online\]. Disponível em: https://spring.io/guides/gs/spring-boot/. Acesso em: 03 set. 2025\.

VIVA DRESS. *Loja de vestidos para festa*. \[online\]. Disponível em: https://www.vivadress.com.br/. Acesso em: 03 set. 2025\.

WORLD WIDE WEB CONSORTIUM. *CSS Snapshot 2022*. W3C Group Draft Note, 22 nov. 2022\. Disponível em: https://www.w3.org/TR/css-2022/. Acesso em: 03 set. 2025\.

ZATTINI. *Loja de moda online – roupas, calçados e acessórios*. \[online\]. Disponível em: https://www.zattini.com.br/. Acesso em: 03 set. 2025\.

[image1]: <data:image/png;base64,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>