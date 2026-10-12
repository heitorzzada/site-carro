# DESIGN.md — Sartec Veículos Design System & Screen Specifications
> **Google Stitch Compatible Specification (`stitch.withgoogle.com`)**  
> **Brand:** Sartec Veículos  
> **Aesthetic Direction:** Strict Monochrome Luxury Automotive (Preto Absoluto & Branco Puro)  
> **Target Devices:** Desktop (1240px container), Tablet (768px-1024px), Mobile (<640px)

---

## 1. Design Principles & Vibe
- **Pure Monochrome High-Contrast:** A deep carbon black (`#000000` / `#0A0A0A`) background paired with crisp pure white typography (`#FFFFFF`) and platinum accents (`#E4E4E7`). 
- **Functional Exception:** The only non-monochrome accent is the official WhatsApp green (`#25D366`), dedicated solely to commercial conversion buttons.
- **Precision Automotive Ergonomics:** Large titles in geometric modern sans (*Outfit*), clean technical data grids, high-contrast price cards, and interactive loan calculators.
- **Seamless Loading Experience:** Smooth initial screen loader (`#pageLoader`) with rotating pulse spinner and progressive loading bar.

---

## 2. Design Tokens

### 2.1 Color Palette
```css
/* Core Monochrome Tokens */
--bg-page:           #000000; /* Preto absoluto de fundo */
--bg-surface:        #0A0A0A; /* Superfície de módulos */
--bg-card:           #121212; /* Fundo de cards e seções */
--bg-card-hover:     #1A1A1A; /* Estado de hover */
--bg-elevated:       #202020; /* Elementos flutuantes / modais */
--bg-input:          #080808; /* Campos de formulário */

/* Text & Contrast */
--text-main:         #FFFFFF; /* Títulos, preços e textos principais */
--text-secondary:    #A1A1AA; /* Descrições e legendas */
--text-muted:        #71717A; /* Metadados e rótulos secundários */

/* Borders */
--border-light:      rgba(255, 255, 255, 0.10);
--border-medium:     rgba(255, 255, 255, 0.20);
--border-focus:      #FFFFFF;
--border-accent:     #FFFFFF;

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
   - Circular spinner + uppercase letterspaced text `SARTEC VEÍCULOS` + horizontal bar.
   - Fades out cleanly on window load.
2. **Topbar & Sticky Header (`.site-header`):**
   - Glassmorphic black background (`rgba(0, 0, 0, 0.94)`).
   - Official Sartec logo, desktop nav links, WhatsApp direct CTA button.
3. **Hero Section (`.hero-section`):**
   - Cinematic automotive backdrop overlay with gradient.
   - Title *"Encontre seu próximo carro"*.
   - Quick search card with brand filter and instant redirect to catalog.
4. **Pillars Strip (`.pillars-strip`):**
   - 3 verified commitments: Procedência, Atendimento Transparente, WhatsApp Direto.
5. **Inventory Catalog (`.catalog-section`):**
   - Sticky sidebar filter panel: Search, Brand, Body Type, Transmission, Fuel, Year, Price range.
   - Active filter pills with instant remove action.
   - 3-column vehicle grid (`.vehicles-grid`) with:
     - 16:10 real vehicle photo.
     - Pure White category badge (`.card-category-badge`).
     - Title, version, price card, and 3 quick specs (Year, Mileage, Gearbox).
     - Action buttons: Pure White **"Ver Detalhes"** button (routes to `veiculo.html?id=ID`) + Black/Green WhatsApp button.
6. **Showroom & About Section (`.about-section`):**
   - Physical showroom address in Planaltina do Paraná, business hours, and embedded Google Maps.
7. **Floating Dock (`.floating-actions-dock`):**
   - Instagram button (Black with White border) + WhatsApp button (Green).

---

### Screen 2: Dedicated Vehicle Detail & Simulator (`veiculo.html?id=car-XXXX`)
1. **Screen Loader (`#pageLoader`):**
   - Instant loading transition on entering any car's dedicated page.
2. **Breadcrumbs (`.vehicle-breadcrumbs`):**
   - `Início / Estoque / [Marca] / [Modelo]`
3. **Showcase Layout (`.vehicle-showcase-layout`):**
   - **Left Column (Gallery):**
     - Large main photo (16:10) with category badge.
     - Interactive thumbnail carousel (`.gallery-thumbs-row`) with click-to-preview.
     - Trust badges: Procedência Garantida, Documentação 100% Regular.
   - **Right Column (Commercial Box):**
     - Brand tag, vehicle full title, and version.
     - Highlight price card (`.v-price-card`): Price in pure white, financing terms.
     - Simulator shortcut button (`.v-simulator-shortcut`): Scrolls directly to calculator.
     - 4-grid quick specifications (Year, Mileage, Transmission, Fuel).
     - Prominent WhatsApp negotiation CTA button with pre-filled message.
4. **Full Technical Specifications (`.vehicle-specs-section`):**
   - 12 structured cells: Marca, Modelo, Versão, Ano/Modelo, Quilometragem, Câmbio, Combustível, Carroceria, Cor, Portas, Placa, Condição.
   - Verified equipment chips container with checkmarks.
5. **Interactive Financing Simulator (`.financing-calculator-section`):**
   - Dynamic real-time calculation based on the vehicle's specific price:
     - **Valor da Entrada:** Range slider + text input + quick percentage chips (20%, 30%, 40%, 50%).
     - **Prazo de Parcelas:** 12x, 24x, 36x, 48x, 60x.
     - **Cálculo da Parcela:** Price formula calculation with estimated monthly rate.
     - **Resumo:** Valor Financiado, Entrada Calculada, Total Estimado.
     - **WhatsApp CTA:** Button *"Enviar Simulação para Análise no WhatsApp"* with pre-filled parameters.
6. **Related Vehicles (`.related-section`):**
   - 3 matching vehicles from the real 24-car inventory.

---

## 4. Google Stitch Integration Instructions
To import and view/generate additional screens in **Google Stitch (`stitch.withgoogle.com`)**:
1. Open [stitch.withgoogle.com](https://stitch.withgoogle.com/).
2. Create or open a project and import the repository: `https://github.com/heitorzzada/site-carro`.
3. Stitch will automatically read this `DESIGN.md` file as the system specification.
4. Any new screen prompts (e.g. *"Create a Trade-In evaluation screen in the same monochrome style"*) will automatically adhere to these tokens, color palette, and component patterns.
