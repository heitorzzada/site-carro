# DESIGN.md — Sartec Veículos Design System & Screen Specifications
> **Google Stitch Compatible Specification (`stitch.withgoogle.com`)**  
> **Brand:** Sartec Veículos  
> **Aesthetic Direction:** Automotive Luxury Showroom with Institutional Amarelo Sartec (`#FFCB06`), Deep Carbon Black, Pure White and Subtle Graphite  
> **Target Devices:** Desktop (1240px container), Tablet (768px-1024px), Mobile (<640px)

---

## 1. Design Principles & Brand Identity
- **Monochrome & Amarelo Sartec Palette:** Fundo preto carbono profundo (`#000000` / `#080808`) e superfícies grafite (`#121212` / `#181818`), tipografia nítida em branco puro (`#FFFFFF`) e cinza-claro (`#E4E4E7`), com destaques na cor institucional **Amarelo Sartec (`#FFCB06`)**.
- **Amarelo Institucional Unificado:** O antigo dourado (`#D4AF37`) foi totalmente substituído pelo **Amarelo Sartec (`#FFCB06`)**, garantindo fidelidade à marca em títulos destacados, botões primários de ação, preços, indicadores de paginação/carrossel, ícones e estados ativos. Não há mistura de paletas.
- **Canal WhatsApp Oficial:** O verde oficial do WhatsApp (`#25D366`) permanece reservado estritamente para os elementos e botões de conversão comercial desse canal.
- **Fotografia Automotiva e Proporções Reais:** Proporções 16:10 para cards do catálogo e fotos grandes com enquadramento perfeito, tratamento de fallback e sem imagens fictícias ou genéricas.
- **Showroom Digital Fluido e Responsivo:** Carrossel comercial interativo no Hero, dock de busca rápida integrado, vitrine de destaques curada, catálogo completo com filtros multi-critério em tempo real, modais rápidos, galeria com Lightbox em tela cheia e simulador financeiro transparente.

---

## 2. Design Tokens

### 2.1 Color Palette
```css
/* Core Carbon & Graphite Base */
--bg-page:              #000000; /* Preto absoluto de fundo */
--bg-surface:           #080808; /* Superfície de módulos */
--bg-card:              #121212; /* Fundo de cards e seções */
--bg-card-hover:        #181818; /* Estado de hover dos cards */
--bg-elevated:          #202020; /* Elementos flutuantes, drawers e modais */
--bg-input:             #080808; /* Campos de formulário e inputs */

/* Institutional Amarelo Sartec */
--color-accent:         #FFCB06; /* Amarelo Sartec oficial */
--color-accent-hover:   #FFE066; /* Amarelo Sartec claro / hover */
--color-accent-dark:    #DDA800; /* Amarelo Sartec escuro / ativo */
--color-accent-glow:    rgba(255, 203, 6, 0.25);
--color-accent-bg:      rgba(255, 203, 6, 0.08);
--color-accent-border:  rgba(255, 203, 6, 0.35);

/* Text & Contrast */
--text-main:            #FFFFFF; /* Títulos, preços e textos principais */
--text-secondary:       #D1D1D6; /* Descrições e legendas */
--text-muted:           #8E8E93; /* Metadados, labels e notas */

/* Borders */
--border-light:         rgba(255, 255, 255, 0.10);
--border-medium:        rgba(255, 255, 255, 0.20);
--border-focus:         var(--color-accent);
--border-accent:        var(--color-accent);

/* Functional Action (WhatsApp Only) */
--color-whatsapp:       #25D366;
--color-whatsapp-hover: #1EBE5D;
```

### 2.2 Typography
- **Headings & Badges:** `'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif` (Weights: 600, 700, 800, 900)
- **Body & Specifications:** `'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif` (Weights: 400, 500, 600, 700)
- **Scale:**
  - `Hero Title`: 2.8rem a 3.4rem (45px - 54px), line-height 1.1, weight 900
  - `Section Title`: 2.2rem (35px), line-height 1.15, weight 800
  - `Price Value`: 2.6rem (42px), line-height 1.0, weight 900
  - `Card Title`: 1.25rem (20px), weight 800
  - `Body Text`: 0.95rem (15px), line-height 1.55

### 2.3 Elevation & Shadows
- `--shadow-sm`: `0 2px 8px rgba(0, 0, 0, 0.80)`
- `--shadow-md`: `0 6px 20px rgba(0, 0, 0, 0.85)`
- `--shadow-lg`: `0 16px 40px rgba(0, 0, 0, 0.95)`
- `--shadow-modal`: `0 24px 60px rgba(0, 0, 0, 0.98)`
- `--shadow-accent-glow`: `0 0 20px rgba(255, 203, 6, 0.22)`

---

## 3. Screen Specifications & Architecture

### Screen 1: Home, Showcase & Catalog (`index.html`)

1. **Screen Loader (`#pageLoader`):**
   - Overlay em preto carbono (`#000000`).
   - Spinner circular estilizado com arco em Amarelo Sartec (`#FFCB06`), tipografia institucional e barra de carregamento progressivo suave.
2. **Topbar & Sticky Header (`.site-header`):**
   - Efeito glassmorphism escuro (`rgba(0, 0, 0, 0.94)`).
   - Informações comerciais padronizadas: endereço em Planaltina do Paraná - PR, horários de atendimento e telefone oficial `(44) 9 9148-4162`.
   - Logotipo oficial Sartec Veículos em alta definição.
   - Navegação: Início, Destaques (`#destaques`), Estoque (`#estoque`), Sobre Nós (`#sobre-nos`), Contato (`#contato`), e CTA direto no WhatsApp.
3. **Hero com Carrossel Automotivo (`.hero-section`):**
   - **4 Slides Comerciais:**
     - *Slide 1 (Conquista):* "Seu próximo carro está mais perto do que você imagina." — Toyota Corolla XEi.
     - *Slide 2 (Liberdade):* "Mais liberdade para viver seus próximos caminhos." — Chevrolet S10 High Country.
     - *Slide 3 (Nova fase):* "Uma nova conquista começa com a escolha certa." — Jeep Compass Longitude.
     - *Slide 4 (Próxima história):* "Seu próximo capítulo pode começar sobre quatro rodas." — Chevrolet Cruze LTZ.
   - **Composição Visual:** Lado esquerdo com kicker em amarelo, título imponente, texto persuasivo, lista de benefícios verificados e duplo CTA (Estoque e WhatsApp). Lado direito com imagem automotiva ampla em palco iluminado (`.hero-car-stage`) com halo perolado em Amarelo Sartec.
   - **Controles Interativos:** Setas de navegação desktop, indicadores circulares (`.hero-dot`), rotação automática confortável a cada 6,5s, pausa ao passar o cursor ou receber foco, navegação por setas do teclado e suporte completo a toque/swipe em celulares.
   - **Respeito à Acessibilidade:** Desativação automática de auto-play quando `prefers-reduced-motion` estiver ativo.
4. **Dock de Busca Rápida Integrado (`.hero-search-dock`):**
   - Posicionado horizontalmente logo abaixo do palco do carrossel, sem disputar atenção visual.
   - Campos funcionais preservados: `#heroSearchInput` e `#heroBrandSelect` conectados diretamente ao estado de filtros do catálogo e rolando suavemente para a vitrine.
5. **Faixa de Compromissos e Confiança (`.pillars-strip`):**
   - 4 compromissos reais confirmados (Procedência Verificada, Documentação Regular, Atendimento Transparente e Contato Direto via WhatsApp).
6. **Vitrine de Veículos em Destaque (`.featured-showcase-section`, `#destaques`):**
   - Apresenta 4 veículos seminovos de alta procura com ficha completa, preço em Amarelo Sartec, botão primário "Ver Detalhes" para a página local, botão "Espiar" para modal rápido e botão WhatsApp.
7. **Estoque Completo (`.catalog-section`, `#estoque`):**
   - Contador dinâmico oficial em tempo real (`#catalogCountNum`).
   - Barra lateral de filtros essenciais objetivos: **Carros** (busca textual por modelo), **Marca**, **Câmbio**, **Ano** e **Filtrar por Preço**.
   - Sincronização bidirecional com a URL via parâmetros query (`busca`, `marca`, `cambio`, `ano_min`, `ano_max`, `preco_min`, `preco_max`, `ordenar`, `pagina`).
   - Pills de filtros ativos removíveis individualmente e botão de limpeza total.
   - Drawer de filtros dedicado para dispositivos móveis com badge contador.
   - Grade de cards em 3 colunas com botões duplos: "Ver Detalhes" (página individual local `veiculo.html?id=ID`), "Espiar" (modal rápido) e WhatsApp oficial.
   - Paginação inteligente sem duplicações, com scroll suave ao topo do catálogo.
8. **Apresentação Institucional & Sobre Nós (`#sobre-nos`):**
   - Fotografia da fachada comercial da loja, dados verídicos, endereço físico e mapa interativo do Google Maps.
9. **Canais Flutuantes de Conversão (`.floating-actions-dock`):**
   - Botão Instagram oficial (`@sartec_veiculos`) e botão WhatsApp comercial padronizado com tooltips acessíveis.

---

### Screen 2: Página Individual do Veículo (`veiculo.html?id=car-XXXX`)

1. **Roteamento e Integridade dos Dados:**
   - Carregamento direto pelo parâmetro `?id=car-XXXX` a partir dos 24 veículos cadastrados em `SARTEC_VEHICLES`.
   - Tratamento amigável e gracioso para IDs ausentes ou inválidos com mensagem clara e botão para retornar ao estoque.
2. **Galeria de Fotos & Lightbox em Tela Cheia:**
   - Imagem principal de alta resolução com cursor `zoom-in` e dica visual de expansão.
   - Miniaturas interativas que respeitam a higiene de imagem única (ocultam a linha de miniaturas caso o veículo possua apenas 1 foto cadastrada, evitando redundância visual).
   - **Lightbox em Tela Cheia (`#galleryLightbox`):** Diálogo acessível (`role="dialog"`, `aria-modal="true"`) com imagem maximizada, contador de posição (ex: "Foto 1 de 4"), navegação por setas na tela e teclado (setas esquerda/direita), e fechamento por botão ou tecla `Esc`.
3. **Painel Comercial do Veículo:**
   - Tag da marca em Amarelo Sartec, modelo, versão, ano e quilometragem.
   - Preço anunciado destacado com borda de 5px em Amarelo Sartec.
   - Ficha técnica resumida e botão de rolagem suave até o simulador de financiamento.
   - Botão de negociação rápida via WhatsApp com mensagem personalizada contendo marca, modelo, ano, versão e preço do veículo.
4. **Ficha Técnica Completa (12 Células):**
   - Ano fabricação/modelo, quilometragem, câmbio, combustível, motorização, carroceria, cor, placa e portas.
5. **Lista de Equipamentos e Opcionais Reais:**
   - Chips estilizados com ícone de confirmação contendo apenas itens cadastrados e comprovados para cada modelo específico.
6. **Simulador de Financiamento Auditado e Transparente:**
   - Entrada configurável por slider e botões rápidos (20%, 30%, 40%, 50%).
   - Prazos de 12x a 60x.
   - **Taxa Ilustrativa:** Identificada explicitamente como estimativa a partir de 1,35% a.m.
   - **Disclaimer Visível (`.sim-disclaimer-box`):** Aviso obrigatório e destacado de que os valores apresentados são simulações ilustrativas e dependem de análise de crédito e perfil do comprador junto às instituições bancárias.
   - **Proteção Matemática:** Prevenção completa contra valores `NaN`, divisões por zero ou resultados inconsistentes.
   - Botão de envio da simulação estruturada diretamente para o WhatsApp comercial.
7. **Veículos Semelhantes Relacionados:**
   - Recomendações dinâmicas de 3 outros modelos da mesma marca ou categoria disponíveis no estoque local.

---

## 4. Diretrizes de Conversão e Contatos Validados
- **WhatsApp Oficial:** `(44) 9 9148-4162` (`554491484162`).
- **Instagram Oficial:** `https://www.instagram.com/sartec_veiculos/` (`@sartec_veiculos`).
- **Endereço Comercial:** Av. Espírito Santo, 114, Planaltina do Paraná - PR, CEP 87860-000.
- **E-mail:** `contato@sartecveiculos.com.br`.

---

## 5. Google Stitch Integration Instructions
Para importar e visualizar/gerar novas telas no **Google Stitch (`stitch.withgoogle.com`)**:
1. Acesse [stitch.withgoogle.com](https://stitch.withgoogle.com/).
2. Abra ou crie um projeto e importe o repositório do projeto.
3. O Stitch lerá este arquivo `DESIGN.md` como especificação canônica de design tokens, componentes e arquitetura.
4. Quaisquer novos layouts ou telas geradas seguirão estritamente a identidade Amarelo Sartec (`#FFCB06`) e o padrão escuro automotivo showroom.
