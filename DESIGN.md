# DESIGN.md — Sartec Veículos Design System & Screen Specifications
> **Google Stitch Compatible Specification (`stitch.withgoogle.com`)**  
> **Brand:** Sartec Veículos  
> **Aesthetic Direction:** Luxury Monochrome Automotive with Refined Gold Accents (Preto Absoluto, Branco Puro & Dourado Nobre)  
> **Target Devices:** Desktop (1240px container), Tablet (768px-1024px), Mobile (<640px)

---

## 1. Design Principles & Vibe
- **Pure Monochrome High-Contrast Base:** A deep carbon black (`#000000` / `#0A0A0A`) background paired with crisp pure white typography (`#FFFFFF`) and platinum accents (`#E4E4E7`).
- **Luxury Gold Accents (`#D4AF37`):** Refined touches of metallic champagne/gold applied to key highlights, badges, section titles, price displays, active indicators, and interactive cards to impart a showroom luxury feel without breaking the dark contrast.
- **Functional Exception:** The official WhatsApp green (`#25D366`) remains strictly dedicated solely to commercial conversion buttons.
- **Precision Automotive Ergonomics:** Large titles in geometric modern sans (*Outfit*), clean technical data grids, high-contrast price cards, and interactive loan calculators.
- **Seamless Loading Experience:** Smooth initial screen loader (`#pageLoader`) with rotating gold pulse spinner and progressive loading bar.

---

## 2. Design Tokens

### 2.1 Color Palette
```css
/* Core Monochrome Base */
--bg-page:              #000000; /* Preto absoluto de fundo */
--bg-surface:           #0A0A0A; /* Superfície de módulos */
--bg-card:              #121212; /* Fundo de cards e seções */
--bg-card-hover:        #1A1A1A; /* Estado de hover */
--bg-elevated:          #202020; /* Elementos flutuantes / modais */
--bg-input:             #080808; /* Campos de formulário */

/* Luxury Gold Accents */
--color-gold:           #D4AF37; /* Dourado nobre principal */
--color-gold-light:     #F6E7B0; /* Dourado claro / champagne */
--color-gold-dark:      #B8860B; /* Dourado escuro / âmbar */
--color-gold-gradient:  linear-gradient(135deg, #F6E7B0 0%, #D4AF37 50%, #AA820A 100%);
--border-gold:          rgba(212, 175, 55, 0.35);
--border-gold-strong:   rgba(212, 175, 55, 0.65);
--shadow-gold-glow:     0 0 16px rgba(212, 175, 55, 0.25);

/* Text & Contrast */
--text-main:            #FFFFFF; /* Títulos, preços e textos principais */
--text-secondary:       #A1A1AA; /* Descrições e legendas */
--text-muted:           #71717A; /* Metadados e rótulos secundários */

/* Borders */
--border-light:         rgba(255, 255, 255, 0.10);
--border-medium:        rgba(255, 255, 255, 0.20);
--border-focus:         var(--color-gold);
--border-accent:        var(--color-gold);

/* Functional Action (WhatsApp Only) */
--color-whatsapp:       #25D366;
--color-whatsapp-hover: #1EBE5D;
```

### 2.2 Typography
- **Headings & Badges:** `'Outfit', sans-serif` (Weights: 600, 700, 800, 900)
- **Body & Specifications:** `'Plus Jakarta Sans', sans-serif` (Weights: 400, 500, 600, 700)
- **Scale:**
  - `Hero Title`: 3.3rem (52px), line-height 1.1, weight 900
  - `Section Title`: 2.3rem (36px), line-height 1.15, weight 900
  - `Price Value`: 2.7rem (43px), line-height 1.0, weight 900
  - `Card Title`: 1.25rem (20px), weight 800
  - `Body Text`: 0.95rem (15px), line-height 1.55

### 2.3 Elevation & Shadows
- `--shadow-sm`: `0 2px 8px rgba(0, 0, 0, 0.80)`
- `--shadow-md`: `0 6px 20px rgba(0, 0, 0, 0.85)`
- `--shadow-lg`: `0 16px 40px rgba(0, 0, 0, 0.95)`
- `--shadow-modal`: `0 24px 60px rgba(0, 0, 0, 0.98)`

---

## 3. Screen Specifications

### Screen 1: Home & Catalog (`index.html`)
1. **Screen Loader (`#pageLoader`):**
   - Fullscreen `#000000` overlay.
   - Circular spinner com topo dourado + texto `SARTEC VEÍCULOS` + barra de progresso em gradiente dourado (`--color-gold-gradient`).
   - Fades out cleanly on window load.
2. **Topbar & Sticky Header (`.site-header`):**
   - Glassmorphic black background (`rgba(0, 0, 0, 0.94)`).
   - Ícones de localização/horário com sutil cor dourada (`--color-gold`).
   - Official Sartec logo, links de navegação com indicador ativo dourado, botão CTA direto no WhatsApp.
3. **Hero Section (`.hero-section`):**
   - Cinematic automotive backdrop overlay with gradient.
   - Tag de destaque dourada *"Showroom de Seminovos"*.
   - Palavra em destaque no título com gradiente/cor dourada (*"seu próximo carro"*).
   - Quick search card com borda superior dourada (`3px solid var(--color-gold)`).
4. **Pillars Strip (`.pillars-strip`):**
   - 3 verified commitments com caixas de ícone estilizadas com borda e preenchimento dourado (`rgba(212, 175, 55, 0.08)`).
5. **Inventory Catalog (`.catalog-section`):**
   - Título de seção com barra lateral dourada (`4px solid var(--color-gold)`).
   - Contador de estoque com cápsula em borda dourada e numeral destacado em ouro.
   - Sticky sidebar filter panel com topo dourado e tags de filtros ativos com borda dourada.
   - 3-column vehicle grid (`.vehicles-grid`) com:
     - 16:10 real vehicle photo.
     - Pure White category badge (`.card-category-badge`) com borda fina dourada.
     - Tag da marca em tipografia dourada (`.card-brand`).
     - Card de preço com borda esquerda dourada e valor contrastante.
     - Ficha técnica rápida em 3 colunas (Ano, Km, Câmbio).
     - Hover com brilho perolado dourado (`--shadow-gold-glow`).
     - Botão Branco **"Ver Detalhes"** com borda dourada (navega para `veiculo.html?id=ID`) + Botão Preto/Verde WhatsApp.
6. **Showroom & About Section (`.about-section`):**
   - Citação em destaque com borda dourada e ícones de contato em dourado.
   - Physical showroom address in Planaltina do Paraná, business hours, and embedded Google Maps.
7. **Floating Dock (`.floating-actions-dock`):**
   - Instagram button (Preto com borda dourada e glow no hover) + WhatsApp button (Oficial Verde).

---

### Screen 2: Dedicated Vehicle Detail & Simulator (`veiculo.html?id=car-XXXX`)
1. **Screen Loader (`#pageLoader`):**
   - Transição imediata de carregamento com spinner e barra de progresso dourada.
2. **Breadcrumbs (`.vehicle-breadcrumbs`):**
   - `Início / Estoque / [Marca] / [Modelo]` com o modelo destacado em dourado nobre.
3. **Showcase Layout (`.vehicle-showcase-layout`):**
   - **Left Column (Gallery):**
     - Foto principal de alta resolução com badge de categoria.
     - Carrossel de miniaturas com borda ativa dourada brilhante.
     - Badges de confiança (Procedência Garantida / Documentação 100% Regular) com ícones dourados.
   - **Right Column (Commercial Box):**
     - Tag da marca em cápsula dourada nobre.
     - Título e versão completa do veículo.
     - **Card de Preço em Destaque:** Borda esquerda dourada de 5px, preço em fonte grande em dourado nobre com suave glow (`--color-gold`).
     - **Atalho para o Simulador:** Botão estilizado com ícone e texto dourado que rola suavemente até a calculadora.
     - 4 especificações rápidas em caixas de dados técnicas.
     - Botão de Negociação WhatsApp com mensagem pré-formatada do veículo.
4. **Full Technical Specifications (`.vehicle-specs-section`):**
   - Título de seção com barra lateral dourada.
   - 12 structured cells com borda esquerda dourada.
   - Chips de equipamentos verificados com ícone de checkmark dourado.
5. **Interactive Financing Simulator (`.financing-calculator-section`):**
   - Badge *"Crédito & Condições"* em dourado com fundo translúcido.
   - **Valor da Entrada:** Slider interativo com track dourado, input de moeda e chips rápidos (20%, 30%, 40%, 50%) com estado ativo em dourado.
   - **Prazo de Parcelas:** Botões de prazo (12x a 60x) com seleção ativa dourada.
   - **Painel de Resultados:** Borda esquerda dourada, destaque da parcela estimada em valor grande dourado (`--color-gold`).
   - **Resumo:** Valor Financiado, Entrada Calculada, Total Estimado a Prazo.
   - **WhatsApp CTA:** Botão comercial direto *"Enviar Simulação para Análise no WhatsApp"* com todos os parâmetros calculados prontos para envio.
6. **Related Vehicles (`.related-section`):**
   - 3 opções recomendadas com cards interativos no mesmo padrão visual preto, branco e dourado.

---

## 4. Google Stitch Integration Instructions
To import and view/generate additional screens in **Google Stitch (`stitch.withgoogle.com`)**:
1. Open [stitch.withgoogle.com](https://stitch.withgoogle.com/).
2. Create or open a project and import the repository: `https://github.com/heitorzzada/site-carro`.
3. Stitch will automatically read this `DESIGN.md` file as the system specification.
4. Any new screen prompts (e.g. *"Create a Trade-In evaluation screen in the same monochrome style"*) will automatically adhere to these tokens, color palette, and component patterns.
