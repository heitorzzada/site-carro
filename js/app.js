/**
 * SARTEC VEÍCULOS — SISTEMA PRINCIPAL DA VITRINE E CONVERSÃO (app.js)
 * Conexão com SARTEC_STORE (localStorage), Super Busca Dupla, Quiz do Carro Ideal,
 * Comparador Lado a Lado, Favoritos, Prova Social Regional e Leads de Troca.
 */

(function () {
  'use strict';

  // Obter repositório de dados persistente
  const store = window.SARTEC_STORE || {
    getVehicles: () => window.SARTEC_VEHICLES || [],
    getFavorites: () => [],
    toggleFavorite: () => false,
    isFavorite: () => false,
    getCompareList: () => [],
    toggleCompare: () => false,
    isComparing: () => false,
    addLead: () => {},
    formatCurrency: val => `R$ ${Number(val).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
    formatKm: val => `${Number(val).toLocaleString('pt-BR')} km`,
    calculateInstallment: (p, d, m) => Math.round(((p - d) * 1.35) / m)
  };

  // Estado da Aplicação
  const state = {
    vehicles: store.getVehicles(),
    config: window.SARTEC_CONFIG || {},
    filters: {
      search: '',
      brand: '',
      model: '',
      minPrice: '',
      maxPrice: '',
      minYear: '',
      maxYear: '',
      maxKm: '',
      transmission: '',
      fuel: '',
      category: '',
      maxBudgetInstallment: null,
      budgetDownPayment: 20000
    },
    sortBy: 'default',
    currentPage: 1,
    itemsPerPage: 9,
    activeVehicle: null,
    quizStep: 1,
    quizAnswers: {
      objective: null,
      maxInstallment: null,
      transmission: null
    }
  };

  // Cache de Elementos do DOM
  const dom = {
    // Header & Topbar
    mobileToggle: document.getElementById('mobileToggle'),
    mobileNavPanel: document.getElementById('mobileNavPanel'),
    topbarFavCount: document.getElementById('topbarFavCount'),
    topbarCompareCount: document.getElementById('topbarCompareCount'),
    btnOpenFavorites: document.getElementById('btnOpenFavorites'),
    btnOpenCompare: document.getElementById('btnOpenCompare'),
    btnOpenQuiz: document.getElementById('btnOpenQuiz'),
    btnBannerOpenQuiz: document.getElementById('btnBannerOpenQuiz'),

    // Hero & Carrossel Comercial
    heroSearchInput: document.getElementById('heroSearchInput'),
    heroBrandSelect: document.getElementById('heroBrandSelect'),
    heroQuickForm: document.getElementById('heroQuickForm'),
    heroTrack: document.getElementById('heroCarouselTrack'),
    heroPrevBtn: document.getElementById('heroPrevBtn'),
    heroNextBtn: document.getElementById('heroNextBtn'),
    heroDots: document.getElementById('heroDots'),
    heroContainer: document.querySelector('.hero-carousel-container'),

    // Super Busca Dupla (Abas)
    tabBtnSmartSearch: document.getElementById('tabBtnSmartSearch'),
    tabBtnBudgetSearch: document.getElementById('tabBtnBudgetSearch'),
    panelSmartSearch: document.getElementById('panelSmartSearch'),
    panelBudgetSearch: document.getElementById('panelBudgetSearch'),
    budgetInstallmentSlider: document.getElementById('budgetInstallmentSlider'),
    budgetInstallmentDisplay: document.getElementById('budgetInstallmentDisplay'),
    budgetDownPaymentSlider: document.getElementById('budgetDownPaymentSlider'),
    budgetDownPaymentDisplay: document.getElementById('budgetDownPaymentDisplay'),
    budgetMatchCount: document.getElementById('budgetMatchCount'),
    btnApplyBudgetFilter: document.getElementById('btnApplyBudgetFilter'),

    // Vitrine de Veículos em Destaque
    featuredGrid: document.getElementById('featuredGrid'),

    // Catálogo & Contadores
    catalogCountNum: document.getElementById('catalogCountNum'),
    catalogGrid: document.getElementById('catalogGrid'),
    activeFiltersBar: document.getElementById('activeFiltersBar'),
    activeFiltersList: document.getElementById('activeFiltersList'),
    paginationWrapper: document.getElementById('paginationWrapper'),
    sortSelect: document.getElementById('sortSelect'),

    // Filtros Desktop (Sidebar)
    filterSearch: document.getElementById('filterSearch'),
    filterBrand: document.getElementById('filterBrand'),
    filterCategory: document.getElementById('filterCategory'),
    filterTransmission: document.getElementById('filterTransmission'),
    filterFuel: document.getElementById('filterFuel'),
    filterMinYear: document.getElementById('filterMinYear'),
    filterMaxYear: document.getElementById('filterMaxYear'),
    filterMinPrice: document.getElementById('filterMinPrice'),
    filterMaxPrice: document.getElementById('filterMaxPrice'),
    filterMaxKm: document.getElementById('filterMaxKm'),
    btnClearFilters: document.getElementById('btnClearFilters'),

    // Mobile Filtros Drawer
    btnOpenMobileFilters: document.getElementById('btnOpenMobileFilters'),
    mobileFiltersBadge: document.getElementById('mobileFiltersBadge'),
    mobileFiltersDrawer: document.getElementById('mobileFiltersDrawer'),
    btnCloseMobileFilters: document.getElementById('btnCloseMobileFilters'),
    btnApplyMobileFilters: document.getElementById('btnApplyMobileFilters'),
    btnClearMobileFilters: document.getElementById('btnClearMobileFilters'),
    mFilterSearch: document.getElementById('mFilterSearch'),
    mFilterBrand: document.getElementById('mFilterBrand'),
    mFilterCategory: document.getElementById('mFilterCategory'),
    mFilterTransmission: document.getElementById('mFilterTransmission'),
    mFilterFuel: document.getElementById('mFilterFuel'),
    mFilterMinYear: document.getElementById('mFilterMinYear'),
    mFilterMaxYear: document.getElementById('mFilterMaxYear'),
    mFilterMinPrice: document.getElementById('mFilterMinPrice'),
    mFilterMaxPrice: document.getElementById('mFilterMaxPrice'),
    mFilterMaxKm: document.getElementById('mFilterMaxKm'),

    // Modal de Detalhes Rápido
    modalBackdrop: document.getElementById('vehicleModal'),
    modalCloseBtn: document.getElementById('modalCloseBtn'),
    modalFullDetailsBtn: document.getElementById('modalFullDetailsBtn'),
    modalMainImg: document.getElementById('modalMainImg'),
    modalThumbnails: document.getElementById('modalThumbnails'),
    modalBrand: document.getElementById('modalBrand'),
    modalTitle: document.getElementById('modalTitle'),
    modalVersion: document.getElementById('modalVersion'),
    modalPrice: document.getElementById('modalPrice'),
    modalSpecYear: document.getElementById('modalSpecYear'),
    modalSpecKm: document.getElementById('modalSpecKm'),
    modalSpecTransmission: document.getElementById('modalSpecTransmission'),
    modalSpecFuel: document.getElementById('modalSpecFuel'),
    modalSpecCategory: document.getElementById('modalSpecCategory'),
    modalSpecColor: document.getElementById('modalSpecColor'),
    modalSpecPlate: document.getElementById('modalSpecPlate'),
    modalSpecDoors: document.getElementById('modalSpecDoors'),
    modalFeaturesList: document.getElementById('modalFeaturesList'),
    modalWhatsappBtn: document.getElementById('modalWhatsappBtn'),
    modalRelatedGrid: document.getElementById('modalRelatedGrid'),

    // Modais Interativos: Quiz, Comparar, Favoritos e Toast
    quizModal: document.getElementById('quizModal'),
    btnQuizClose: document.getElementById('btnQuizClose'),
    quizStepContainer: document.getElementById('quizStepContainer'),
    quizResultContainer: document.getElementById('quizResultContainer'),
    quizProgressFill: document.getElementById('quizProgressFill'),
    quizStepBadge: document.getElementById('quizStepBadge'),
    quizQuestionTitle: document.getElementById('quizQuestionTitle'),
    quizOptionsList: document.getElementById('quizOptionsList'),
    quizMatchedVehiclesGrid: document.getElementById('quizMatchedVehiclesGrid'),
    btnRestartQuiz: document.getElementById('btnRestartQuiz'),

    compareModal: document.getElementById('compareModal'),
    btnCompareClose: document.getElementById('btnCompareClose'),
    compareContentWrapper: document.getElementById('compareContentWrapper'),

    favoritesModal: document.getElementById('favoritesModal'),
    btnFavoritesClose: document.getElementById('btnFavoritesClose'),
    favoritesListWrapper: document.getElementById('favoritesListWrapper'),

    socialProofToast: document.getElementById('socialProofToast'),
    toastAvatar: document.getElementById('toastAvatar'),
    toastTitle: document.getElementById('toastTitle'),
    toastDesc: document.getElementById('toastDesc'),
    btnDismissToast: document.getElementById('btnDismissToast'),

    // Seção de Troca & Radar
    tabBtnTradeIn: document.getElementById('tabBtnTradeIn'),
    tabBtnCarHunter: document.getElementById('tabBtnCarHunter'),
    tradeInForm: document.getElementById('tradeInForm'),
    hunterForm: document.getElementById('hunterForm'),
    tradeTargetCar: document.getElementById('tradeTargetCar')
  };

  // Helper para URL do WhatsApp oficial padronizada
  function buildWhatsAppUrl(car) {
    const phone = '5544991484162';
    if (!car) {
      const generalText = 'Olá! Gostaria de consultar informações sobre os veículos disponíveis no estoque da Sartec Veículos em Planaltina do Paraná.';
      return `https://wa.me/${phone}?text=${encodeURIComponent(generalText)}`;
    }
    const message = `Olá! Gostaria de simular financiamento e obter mais detalhes do ${car.brand} ${car.model} (${car.yearModel || car.year}), anunciado por ${car.priceFormatted || store.formatCurrency(car.price)} na Sartec Veículos.`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  }

  // ==========================================================================
  // CARROSSEL COMERCIAL DO HERO
  // ==========================================================================
  function initHeroCarousel() {
    const track = dom.heroTrack;
    if (!track) return;
    const slides = Array.from(track.querySelectorAll('.hero-slide'));
    const dots = dom.heroDots ? Array.from(dom.heroDots.querySelectorAll('.hero-dot')) : [];
    const prevBtn = dom.heroPrevBtn;
    const nextBtn = dom.heroNextBtn;
    const container = dom.heroContainer;

    if (slides.length === 0) return;

    let currentIndex = 0;
    let autoTimer = null;
    const AUTO_INTERVAL = 6500;

    function goToSlide(index) {
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;
      currentIndex = index;

      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentIndex);
      });
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
        dot.setAttribute('aria-selected', i === currentIndex ? 'true' : 'false');
      });
    }

    function nextSlide() {
      goToSlide(currentIndex + 1);
    }
    function prevSlide() {
      goToSlide(currentIndex - 1);
    }

    function startTimer() {
      if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      stopTimer();
      autoTimer = setInterval(nextSlide, AUTO_INTERVAL);
    }

    function stopTimer() {
      if (autoTimer) {
        clearInterval(autoTimer);
        autoTimer = null;
      }
    }

    function restartTimer() {
      stopTimer();
      startTimer();
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        restartTimer();
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        restartTimer();
      });
    }

    if (container) {
      container.addEventListener('mouseenter', stopTimer);
      container.addEventListener('mouseleave', startTimer);
      container.addEventListener('focusin', stopTimer);
      container.addEventListener('focusout', startTimer);
    }

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        goToSlide(idx);
        restartTimer();
      });
    });

    goToSlide(0);
    startTimer();
  }

  // ==========================================================================
  // RENDERIZAÇÃO DE CARD DE VEÍCULO DE ALTA CONVERSÃO
  // ==========================================================================
  function generateVehicleCardHtml(car) {
    const isFav = store.isFavorite(car.id);
    const isComp = store.isComparing(car.id);
    const waUrl = buildWhatsAppUrl(car);

    // Estimativa de parcela mensal em 48x (entrada de 20%)
    const downPayment = Math.round(car.price * 0.25);
    const monthlyEst = store.calculateInstallment(car.price, downPayment, 48, 1.35);

    // Badges
    const statusClass = car.status === 'vendido' ? 'status-vendido' : (car.status === 'reservado' ? 'status-reservado' : 'status-disponivel');
    const statusLabel = car.status === 'vendido' ? 'Vendido' : (car.status === 'reservado' ? 'Reservado' : 'Disponível');
    const specialBadge = car.specialBadge || (car.price < (car.fipePrice || 0) ? `R$ ${(car.fipePrice - car.price).toLocaleString('pt-BR')} Abaixo da FIPE` : 'Periciado com Garantia');

    // Comparativo FIPE
    const showFipe = car.fipePrice && car.fipePrice > car.price;
    const fipeHtml = showFipe
      ? `<div class="card-fipe-compare"><del>FIPE: ${store.formatCurrency(car.fipePrice)}</del><span class="card-fipe-discount">Economia de ${store.formatCurrency(car.fipePrice - car.price)}</span></div>`
      : `<div class="card-fipe-compare" style="color:#25D366; font-weight:600;">✓ Laudo Cautelar 100% Aprovado</div>`;

    const imageSrc = (car.images && car.images[0]) ? car.images[0] : 'img/hero-bg.jpg';
    const viewsCount = car.viewsToday || Math.floor(25 + (car.price % 35));

    return `
      <article class="vehicle-card" data-id="${car.id}">
        <div class="card-media-wrapper">
          <span class="card-status-badge ${statusClass}">${statusLabel}</span>
          <span class="card-special-badge">${specialBadge}</span>
          
          <img class="card-vehicle-img" 
               src="${imageSrc}" 
               alt="${car.fullName || car.brand + ' ' + car.model}" 
               loading="lazy" 
               onerror="this.onerror=null; this.src='img/hero-bg.jpg';">

          <div class="card-micro-proof">
            <span>🔥 ${viewsCount} pessoas viram hoje</span>
          </div>

          <div class="card-quick-actions">
            <button type="button" class="btn-card-icon ${isFav ? 'active' : ''}" data-action="favorite" data-id="${car.id}" title="${isFav ? 'Remover dos Favoritos' : 'Favoritar este carro'}">
              ❤️
            </button>
            <button type="button" class="btn-card-icon ${isComp ? 'comparing' : ''}" data-action="compare" data-id="${car.id}" title="${isComp ? 'Remover da comparação' : 'Comparar lado a lado'}">
              ⚖️
            </button>
          </div>
        </div>

        <div class="card-body-content">
          <div class="card-header-meta">
            <span class="card-brand-tag">${car.brand}</span>
            <span class="card-category-tag">${car.category} • ${car.color || 'Prata'}</span>
          </div>

          <h3 class="card-car-title">
            <a href="veiculo.html?id=${car.id}" style="color:inherit; text-decoration:none;">${car.model}</a>
          </h3>
          <p class="card-car-version" title="${car.version || ''}">${car.version || car.fullName || ''}</p>

          <div class="card-specs-row">
            <div class="card-spec-item">
              <span class="spec-label">Ano</span>
              <span class="spec-val">${car.yearModel || car.year}</span>
            </div>
            <div class="card-spec-item">
              <span class="spec-label">KM</span>
              <span class="spec-val">${car.kmFormatted || store.formatKm(car.km)}</span>
            </div>
            <div class="card-spec-item">
              <span class="spec-label">Câmbio</span>
              <span class="spec-val">${car.transmission}</span>
            </div>
          </div>

          <div class="card-pricing-block">
            ${fipeHtml}
            <div class="card-main-price">${car.priceFormatted || store.formatCurrency(car.price)}</div>
            <div class="card-installment-estimate">
              ou Entrada + <strong>48x de ${store.formatCurrency(monthlyEst)}</strong>
            </div>
          </div>

          <div class="card-actions-grid">
            <a href="veiculo.html?id=${car.id}" class="btn-card-details">
              Ver Detalhes & Simular
            </a>
            <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn-card-whatsapp">
              Simular no WhatsApp
            </a>
          </div>
        </div>
      </article>
    `;
  }

  // ==========================================================================
  // VITRINE DE VEÍCULOS EM DESTAQUE (4 VEÍCULOS PRINCIPAIS)
  // ==========================================================================
  function renderFeaturedVehicles() {
    if (!dom.featuredGrid) return;
    const all = store.getVehicles();
    // Prioriza Cruze LTZ 2019, Renegade 2018, S10 Diesel 2005 e Voyage 1.6 MSI 2016
    const priorityIds = ['car-cruze-ltz-2019', 'car-renegade-long-2018', 'car-s10-diesel-2005', 'car-voyage-16-2016'];
    let featured = [];

    priorityIds.forEach(id => {
      const v = all.find(c => c.id === id);
      if (v) featured.push(v);
    });

    if (featured.length < 4) {
      all.forEach(v => {
        if (!featured.find(f => f.id === v.id) && featured.length < 4) {
          featured.push(v);
        }
      });
    }

    dom.featuredGrid.innerHTML = featured.map(car => generateVehicleCardHtml(car)).join('');
    bindCardInteractions(dom.featuredGrid);
  }

  // ==========================================================================
  // ATIVAÇÃO DE CLICKS E INTERAÇÕES NOS CARDS
  // ==========================================================================
  function bindCardInteractions(containerEl) {
    if (!containerEl) return;

    // Favoritar
    containerEl.querySelectorAll('[data-action="favorite"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        const id = btn.dataset.id;
        const added = store.toggleFavorite(id);
        btn.classList.toggle('active', added);
        updateTopCounters();
      });
    });

    // Comparar
    containerEl.querySelectorAll('[data-action="compare"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        const id = btn.dataset.id;
        const added = store.toggleCompare(id);
        btn.classList.toggle('comparing', added);
        updateTopCounters();
        if (added) {
          openCompareModal();
        }
      });
    });
  }

  function updateTopCounters() {
    const favs = store.getFavorites();
    const comps = store.getCompareList();
    if (dom.topbarFavCount) dom.topbarFavCount.textContent = favs.length;
    if (dom.topbarCompareCount) dom.topbarCompareCount.textContent = comps.length;
  }

  // ==========================================================================
  // SUPER BUSCA DUPLA: ABA 1 E ABA 2 (PARCELA DO BOLSO)
  // ==========================================================================
  function initDualSearchTabs() {
    if (!dom.tabBtnSmartSearch || !dom.tabBtnBudgetSearch) return;

    dom.tabBtnSmartSearch.addEventListener('click', () => {
      dom.tabBtnSmartSearch.classList.add('active');
      dom.tabBtnBudgetSearch.classList.remove('active');
      dom.panelSmartSearch.classList.add('active');
      dom.panelBudgetSearch.classList.remove('active');
    });

    dom.tabBtnBudgetSearch.addEventListener('click', () => {
      dom.tabBtnBudgetSearch.classList.add('active');
      dom.tabBtnSmartSearch.classList.remove('active');
      dom.panelBudgetSearch.classList.add('active');
      dom.panelSmartSearch.classList.remove('active');
      updateBudgetCalculations();
    });

    // Sliders de Parcela e Entrada
    if (dom.budgetInstallmentSlider) {
      dom.budgetInstallmentSlider.addEventListener('input', (e) => {
        const val = Number(e.target.value);
        if (dom.budgetInstallmentDisplay) {
          dom.budgetInstallmentDisplay.textContent = `Até ${store.formatCurrency(val)} / mês`;
        }
        updateBudgetCalculations();
      });
    }

    if (dom.budgetDownPaymentSlider) {
      dom.budgetDownPaymentSlider.addEventListener('input', (e) => {
        const val = Number(e.target.value);
        if (dom.budgetDownPaymentDisplay) {
          dom.budgetDownPaymentDisplay.textContent = `${store.formatCurrency(val)} de entrada`;
        }
        updateBudgetCalculations();
      });
    }

    if (dom.btnApplyBudgetFilter) {
      dom.btnApplyBudgetFilter.addEventListener('click', () => {
        const maxInst = Number(dom.budgetInstallmentSlider.value);
        const downPay = Number(dom.budgetDownPaymentSlider.value);
        state.filters.maxBudgetInstallment = maxInst;
        state.filters.budgetDownPayment = downPay;
        state.currentPage = 1;
        renderCatalog();
        scrollToCatalogTop();
      });
    }
  }

  function updateBudgetCalculations() {
    if (!dom.budgetInstallmentSlider || !dom.budgetDownPaymentSlider) return;
    const maxInst = Number(dom.budgetInstallmentSlider.value);
    const downPay = Number(dom.budgetDownPaymentSlider.value);
    const all = store.getVehicles();

    // Filtra veículos cujo valor de parcela 48x fica dentro do orçamento
    const matches = all.filter(car => {
      const pmt = store.calculateInstallment(car.price, downPay, 48, 1.35);
      return pmt <= maxInst;
    });

    if (dom.budgetMatchCount) {
      dom.budgetMatchCount.textContent = `${matches.length} veículos encontrados que cabem no seu bolso!`;
    }
  }

  // ==========================================================================
  // FILTRAGEM E RENDERIZAÇÃO DO CATÁLOGO GERAL
  // ==========================================================================
  function getFilteredVehicles() {
    let list = store.getVehicles();
    const f = state.filters;

    list = list.filter(car => {
      // Busca textual
      if (f.search) {
        const q = f.search.toLowerCase().trim();
        const searchCorpus = `${car.brand} ${car.model} ${car.version || ''} ${car.fullName || ''} ${car.category} ${car.color || ''}`.toLowerCase();
        if (!searchCorpus.includes(q)) return false;
      }
      // Marca
      if (f.brand && car.brand.toLowerCase() !== f.brand.toLowerCase()) return false;
      // Categoria
      if (f.category && car.category.toLowerCase() !== f.category.toLowerCase()) return false;
      // Câmbio
      if (f.transmission && car.transmission.toLowerCase() !== f.transmission.toLowerCase()) return false;
      // Combustível
      if (f.fuel && car.fuel.toLowerCase() !== f.fuel.toLowerCase()) return false;
      // Anos
      if (f.minYear && car.year < parseInt(f.minYear, 10)) return false;
      if (f.maxYear && car.year > parseInt(f.maxYear, 10)) return false;
      // Preços
      if (f.minPrice && car.price < parseFloat(f.minPrice)) return false;
      if (f.maxPrice && car.price > parseFloat(f.maxPrice)) return false;
      // Quilometragem
      if (f.maxKm && car.km > parseInt(f.maxKm, 10)) return false;

      // Filtro especial de Parcela do Bolso
      if (f.maxBudgetInstallment) {
        const pmt = store.calculateInstallment(car.price, f.budgetDownPayment || 20000, 48, 1.35);
        if (pmt > f.maxBudgetInstallment) return false;
      }

      return true;
    });

    // Ordenação
    switch (state.sortBy) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'year-desc':
        list.sort((a, b) => b.year - a.year);
        break;
      case 'km-asc':
        list.sort((a, b) => a.km - b.km);
        break;
      default:
        break;
    }

    return list;
  }

  function renderCatalog() {
    if (!dom.catalogGrid) return;
    const filteredList = getFilteredVehicles();
    const totalCount = filteredList.length;

    if (dom.catalogCountNum) {
      dom.catalogCountNum.textContent = totalCount;
    }

    renderActiveFilters(totalCount);

    if (totalCount === 0) {
      dom.catalogGrid.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1; padding: 48px; text-align: center; background:#111; border-radius:14px; border:1px solid rgba(255,255,255,0.08);">
          <div style="font-size:3rem; margin-bottom:12px;">🔍</div>
          <h3 style="font-family:var(--font-heading); color:#FFF; font-size:1.5rem; margin-bottom:8px;">Nenhum veículo encontrado com estes critérios</h3>
          <p style="color:#A1A1AA; max-width:500px; margin:0 auto 20px;">Tente ajustar a faixa de preço ou parcela mensal, ou limpe os filtros para ver todo o pátio da Sartec Veículos.</p>
          <button type="button" class="btn-primary" id="btnEmptyReset" style="margin:0 auto;">
            Ver Todo o Estoque (${store.getVehicles().length} Veículos)
          </button>
        </div>
      `;
      const resetBtn = document.getElementById('btnEmptyReset');
      if (resetBtn) resetBtn.addEventListener('click', clearAllFilters);
      if (dom.paginationWrapper) dom.paginationWrapper.innerHTML = '';
      return;
    }

    // Paginação
    const totalPages = Math.ceil(totalCount / state.itemsPerPage);
    if (state.currentPage > totalPages) state.currentPage = totalPages;
    if (state.currentPage < 1) state.currentPage = 1;

    const startIndex = (state.currentPage - 1) * state.itemsPerPage;
    const pageItems = filteredList.slice(startIndex, startIndex + state.itemsPerPage);

    dom.catalogGrid.innerHTML = pageItems.map(car => generateVehicleCardHtml(car)).join('');
    bindCardInteractions(dom.catalogGrid);
    renderPagination(totalPages);
  }

  function renderActiveFilters() {
    if (!dom.activeFiltersBar || !dom.activeFiltersList) return;
    const activeList = [];
    const f = state.filters;

    if (f.search) activeList.push({ key: 'search', label: `Busca: "${f.search}"` });
    if (f.brand) activeList.push({ key: 'brand', label: `Marca: ${f.brand}` });
    if (f.transmission) activeList.push({ key: 'transmission', label: `Câmbio: ${f.transmission}` });
    if (f.minYear) activeList.push({ key: 'minYear', label: `Ano a partir de ${f.minYear}` });
    if (f.maxYear) activeList.push({ key: 'maxYear', label: `Ano até ${f.maxYear}` });
    if (f.minPrice) activeList.push({ key: 'minPrice', label: `Preço Mín: R$ ${Number(f.minPrice).toLocaleString('pt-BR')}` });
    if (f.maxPrice) activeList.push({ key: 'maxPrice', label: `Preço Máx: R$ ${Number(f.maxPrice).toLocaleString('pt-BR')}` });
    if (f.maxBudgetInstallment) activeList.push({ key: 'maxBudgetInstallment', label: `Parcela até ${store.formatCurrency(f.maxBudgetInstallment)}/mês` });

    if (dom.mobileFiltersBadge) {
      dom.mobileFiltersBadge.textContent = activeList.length;
      dom.mobileFiltersBadge.style.display = activeList.length > 0 ? 'inline-block' : 'none';
    }

    if (activeList.length === 0) {
      dom.activeFiltersBar.style.display = 'none';
      dom.activeFiltersList.innerHTML = '';
      return;
    }

    dom.activeFiltersBar.style.display = 'flex';
    dom.activeFiltersList.innerHTML = activeList.map(item => `
      <span class="filter-pill">
        ${item.label}
        <button type="button" class="filter-pill-remove" data-filter-key="${item.key}" aria-label="Remover filtro ${item.label}">
          ✕
        </button>
      </span>
    `).join('');

    dom.activeFiltersList.querySelectorAll('.filter-pill-remove').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.filterKey;
        if (key in state.filters) {
          state.filters[key] = '';
          state.currentPage = 1;
          renderCatalog();
        }
      });
    });
  }

  function renderPagination(totalPages) {
    if (!dom.paginationWrapper) return;
    if (totalPages <= 1) {
      dom.paginationWrapper.innerHTML = '';
      return;
    }

    let html = `
      <button type="button" class="btn-page" id="btnPagePrev" ${state.currentPage === 1 ? 'disabled' : ''} aria-label="Página Anterior">
        ‹
      </button>
    `;
    for (let p = 1; p <= totalPages; p++) {
      html += `
        <button type="button" class="btn-page ${p === state.currentPage ? 'active' : ''}" data-page="${p}" aria-label="Ir para página ${p}">
          ${p}
        </button>
      `;
    }
    html += `
      <button type="button" class="btn-page" id="btnPageNext" ${state.currentPage === totalPages ? 'disabled' : ''} aria-label="Próxima Página">
        ›
      </button>
    `;

    dom.paginationWrapper.innerHTML = html;

    dom.paginationWrapper.querySelectorAll('.btn-page[data-page]').forEach(btn => {
      btn.addEventListener('click', () => {
        state.currentPage = parseInt(btn.dataset.page, 10);
        renderCatalog();
        scrollToCatalogTop();
      });
    });

    const btnPrev = document.getElementById('btnPagePrev');
    if (btnPrev) {
      btnPrev.addEventListener('click', () => {
        if (state.currentPage > 1) {
          state.currentPage--;
          renderCatalog();
          scrollToCatalogTop();
        }
      });
    }

    const btnNext = document.getElementById('btnPageNext');
    if (btnNext) {
      btnNext.addEventListener('click', () => {
        if (state.currentPage < totalPages) {
          state.currentPage++;
          renderCatalog();
          scrollToCatalogTop();
        }
      });
    }
  }

  function clearAllFilters() {
    state.filters = {
      search: '',
      brand: '',
      model: '',
      minPrice: '',
      maxPrice: '',
      minYear: '',
      maxYear: '',
      maxKm: '',
      transmission: '',
      fuel: '',
      category: '',
      maxBudgetInstallment: null,
      budgetDownPayment: 20000
    };
    state.currentPage = 1;
    if (dom.heroSearchInput) dom.heroSearchInput.value = '';
    if (dom.heroBrandSelect) dom.heroBrandSelect.value = '';
    if (dom.filterSearch) dom.filterSearch.value = '';
    if (dom.filterBrand) dom.filterBrand.value = '';
    renderCatalog();
  }

  function scrollToCatalogTop() {
    const el = document.getElementById('estoque');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Preenchimento de Opções dos Filtros
  function populateFilterOptions() {
    const list = store.getVehicles();
    const brands = [...new Set(list.map(v => v.brand))].sort();
    const categories = [...new Set(list.map(v => v.category))].sort();
    const years = [...new Set(list.map(v => v.year))].sort((a, b) => b - a);

    const brandOpts = `<option value="">Todas as Marcas</option>` + brands.map(b => `<option value="${b}">${b}</option>`).join('');
    if (dom.filterBrand) dom.filterBrand.innerHTML = brandOpts;
    if (dom.heroBrandSelect) dom.heroBrandSelect.innerHTML = brandOpts;
    if (dom.mFilterBrand) dom.mFilterBrand.innerHTML = brandOpts;

    const catOpts = `<option value="">Todas as Carrocerias</option>` + categories.map(c => `<option value="${c}">${c}</option>`).join('');
    if (dom.filterCategory) dom.filterCategory.innerHTML = catOpts;
    if (dom.mFilterCategory) dom.mFilterCategory.innerHTML = catOpts;

    const yrOpts = years.map(y => `<option value="${y}">${y}</option>`).join('');
    if (dom.filterMinYear) dom.filterMinYear.innerHTML = `<option value="">Ano Mínimo</option>` + yrOpts;
    if (dom.filterMaxYear) dom.filterMaxYear.innerHTML = `<option value="">Ano Máximo</option>` + yrOpts;

    // Preenche select do formulário de troca
    if (dom.tradeTargetCar) {
      dom.tradeTargetCar.innerHTML = `<option value="">Selecione o veículo da loja que você deseja...</option>` +
        list.map(c => `<option value="${c.brand} ${c.model} (${c.year}) - ${c.priceFormatted || store.formatCurrency(c.price)}">${c.brand} ${c.model} (${c.year}) — ${c.priceFormatted || store.formatCurrency(c.price)}</option>`).join('');
    }
  }

  // ==========================================================================
  // QUIZ INTERATIVO "DESCUBRA SEU CARRO IDEAL EM 30 SEGUNDOS"
  // ==========================================================================
  const QUIZ_QUESTIONS = [
    {
      step: 1,
      badge: "Pergunta 1 de 3",
      title: "Qual o seu objetivo principal ao trocar ou comprar de carro?",
      options: [
        {
          key: "economia",
          icon: "⛽",
          title: "Economia no Dia a Dia & Manutenção Barata",
          desc: "Carro para trabalhar, rodar na cidade ou aplicativo com baixíssimo consumo."
        },
        {
          key: "familia",
          icon: "👨‍👩‍👧‍👦",
          title: "Conforto & Espaço para a Família",
          desc: "Porta-malas grande, ar-condicionado eficiente e bancos confortáveis para viagens."
        },
        {
          key: "trabalho_agro",
          icon: "🌾",
          title: "Trabalho Pesado, Agro & Estrada de Terra",
          desc: "Picape robusta a diesel ou alta, tração e força para carregar peso."
        },
        {
          key: "primeiro_carro",
          icon: "🔑",
          title: "Primeiro Carro Acessível / Parcela que Cabe no Bolso",
          desc: "Entrada facilitada e parcelas enxutas para sair do transporte público."
        }
      ]
    },
    {
      step: 2,
      badge: "Pergunta 2 de 3",
      title: "Qual faixa de parcela mensal fica mais confortável para o seu orçamento?",
      options: [
        {
          key: "ate_800",
          icon: "💵",
          title: "Até R$ 800 / mês",
          desc: "Parcelas super acessíveis com financiamento facilitado."
        },
        {
          key: "ate_1300",
          icon: "💳",
          title: "De R$ 800 a R$ 1.300 / mês",
          desc: "Excelente equilíbrio entre ano recente e prestação equilibrada."
        },
        {
          key: "ate_2000",
          icon: "💎",
          title: "De R$ 1.300 a R$ 2.000 / mês",
          desc: "Para sedans médios, SUVs ou picapes completas com motor turbo."
        },
        {
          key: "acima_2000",
          icon: "⭐",
          title: "Acima de R$ 2.000 / mês ou Pagamento À Vista",
          desc: "Modelos topo de linha com máxima tecnologia e status."
        }
      ]
    },
    {
      step: 3,
      badge: "Pergunta 3 de 3",
      title: "Qual a sua preferência em relação ao câmbio?",
      options: [
        {
          key: "automatico",
          icon: "🕹️",
          title: "Automático obrigatório",
          desc: "Não abro mão do conforto de não ter que trocar marcha no trânsito."
        },
        {
          key: "manual",
          icon: "⚙️",
          title: "Manual (Mecânico)",
          desc: "Prefiro câmbio manual pelo controle e economia de combustível."
        },
        {
          key: "tanto_faz",
          icon: "🤝",
          title: "Tanto faz, o que for melhor negócio!",
          desc: "Priorizo o estado de conservação, procedência e custo-benefício."
        }
      ]
    }
  ];

  function openQuizModal() {
    if (!dom.quizModal) return;
    state.quizStep = 1;
    state.quizAnswers = { objective: null, maxInstallment: null, transmission: null };
    if (dom.quizStepContainer) dom.quizStepContainer.style.display = 'block';
    if (dom.quizResultContainer) dom.quizResultContainer.style.display = 'none';
    renderQuizStep(1);
    dom.quizModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeQuizModal() {
    if (!dom.quizModal) return;
    dom.quizModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  function renderQuizStep(stepNum) {
    const q = QUIZ_QUESTIONS.find(item => item.step === stepNum);
    if (!q) return;

    if (dom.quizProgressFill) {
      dom.quizProgressFill.style.width = `${(stepNum / 3) * 100}%`;
    }
    if (dom.quizStepBadge) dom.quizStepBadge.textContent = q.badge;
    if (dom.quizQuestionTitle) dom.quizQuestionTitle.textContent = q.title;

    if (dom.quizOptionsList) {
      dom.quizOptionsList.innerHTML = q.options.map(opt => `
        <div class="quiz-option-card" data-opt-key="${opt.key}">
          <div class="quiz-option-icon">${opt.icon}</div>
          <div class="quiz-option-info">
            <h4>${opt.title}</h4>
            <p>${opt.desc}</p>
          </div>
        </div>
      `).join('');

      dom.quizOptionsList.querySelectorAll('.quiz-option-card').forEach(card => {
        card.addEventListener('click', () => {
          const key = card.dataset.optKey;
          handleQuizSelection(stepNum, key);
        });
      });
    }
  }

  function handleQuizSelection(stepNum, key) {
    if (stepNum === 1) state.quizAnswers.objective = key;
    if (stepNum === 2) state.quizAnswers.maxInstallment = key;
    if (stepNum === 3) state.quizAnswers.transmission = key;

    if (stepNum < 3) {
      state.quizStep++;
      renderQuizStep(state.quizStep);
    } else {
      calculateAndShowQuizResults();
    }
  }

  function calculateAndShowQuizResults() {
    if (dom.quizStepContainer) dom.quizStepContainer.style.display = 'none';
    if (dom.quizResultContainer) dom.quizResultContainer.style.display = 'block';

    const all = store.getVehicles();
    const ans = state.quizAnswers;

    // Algoritmo de compatibilidade
    const scored = all.map(car => {
      let score = 50;

      // Objetivo
      if (ans.objective === 'economia' && (car.fuel === 'Flex' && (car.model.includes('Voyage') || car.model.includes('Cruze') || car.model.includes('Onix')))) score += 30;
      if (ans.objective === 'familia' && (car.category === 'Sedan' || car.category === 'SUV')) score += 30;
      if (ans.objective === 'trabalho_agro' && (car.category === 'Picape' || car.fuel === 'Diesel')) score += 40;
      if (ans.objective === 'primeiro_carro' && car.price < 50000) score += 35;

      // Câmbio
      if (ans.transmission === 'automatico' && car.transmission === 'Automático') score += 20;
      if (ans.transmission === 'manual' && car.transmission === 'Manual') score += 20;
      if (ans.transmission === 'tanto_faz') score += 15;

      // Parcela
      if (ans.maxInstallment === 'ate_800' && car.price < 40000) score += 25;
      if (ans.maxInstallment === 'ate_1300' && car.price >= 40000 && car.price <= 70000) score += 25;
      if (ans.maxInstallment === 'ate_2000' && car.price > 70000) score += 25;

      return { car, score };
    });

    scored.sort((a, b) => b.score - a.score);
    const topMatches = scored.slice(0, 2).map(s => s.car);

    if (dom.quizMatchedVehiclesGrid) {
      dom.quizMatchedVehiclesGrid.innerHTML = topMatches.map(car => generateVehicleCardHtml(car)).join('');
      bindCardInteractions(dom.quizMatchedVehiclesGrid);
    }
  }

  // ==========================================================================
  // MODAL COMPARADOR LADO A LADO (ATÉ 3 CARROS)
  // ==========================================================================
  function openCompareModal() {
    if (!dom.compareModal || !dom.compareContentWrapper) return;
    const compareIds = store.getCompareList();
    const cars = compareIds.map(id => store.getVehicleById(id)).filter(Boolean);

    if (cars.length === 0) {
      dom.compareContentWrapper.innerHTML = `
        <div style="text-align:center; padding:30px; color:#A1A1AA;">
          <p>Você ainda não selecionou veículos para comparar.</p>
          <p style="font-size:0.85rem; margin-top:6px;">Clique no ícone <strong>⚖️</strong> nos cards dos carros para compará-los lado a lado!</p>
        </div>
      `;
    } else {
      dom.compareContentWrapper.innerHTML = `
        <div style="overflow-x:auto;">
          <table class="compare-modal-table">
            <thead>
              <tr>
                <th style="width:160px;">Especificação</th>
                ${cars.map(c => `
                  <th>
                    <div style="font-size:1.1rem; color:#FFF; font-weight:800;">${c.brand} ${c.model}</div>
                    <div style="color:var(--color-accent); font-size:1.25rem; font-weight:900; margin:6px 0;">${c.priceFormatted || store.formatCurrency(c.price)}</div>
                    <button type="button" class="btn-card-icon" data-remove-compare="${c.id}" style="margin:0 auto;" title="Remover da comparação">✕</button>
                  </th>
                `).join('')}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Ano / Modelo</td>
                ${cars.map(c => `<td><strong>${c.yearModel || c.year}</strong></td>`).join('')}
              </tr>
              <tr>
                <td>Quilometragem</td>
                ${cars.map(c => `<td>${c.kmFormatted || store.formatKm(c.km)}</td>`).join('')}
              </tr>
              <tr>
                <td>Câmbio</td>
                ${cars.map(c => `<td>${c.transmission}</td>`).join('')}
              </tr>
              <tr>
                <td>Combustível</td>
                ${cars.map(c => `<td>${c.fuel}</td>`).join('')}
              </tr>
              <tr>
                <td>Tabela FIPE Oficial</td>
                ${cars.map(c => `<td>${c.fipeFormatted || store.formatCurrency(c.fipePrice || c.price * 1.03)}</td>`).join('')}
              </tr>
              <tr>
                <td>Consumo Estimado</td>
                ${cars.map(c => `<td>${c.consumption || '10,5 km/l cidade | 13,8 km/l estrada'}</td>`).join('')}
              </tr>
              <tr>
                <td>Destaques do Veículo</td>
                ${cars.map(c => `<td><span style="font-size:0.8rem; color:#E4E4E7;">${c.specialBadge || 'Periciado 100%'}</span></td>`).join('')}
              </tr>
              <tr>
                <td>Ação Comercial</td>
                ${cars.map(c => `
                  <td>
                    <a href="veiculo.html?id=${c.id}" class="btn-card-details" style="margin-bottom:6px; display:inline-block;">Ver Detalhes</a><br>
                    <a href="${buildWhatsAppUrl(c)}" target="_blank" class="btn-card-whatsapp" style="display:inline-block; font-size:0.75rem; padding:6px 12px;">Negociar WhatsApp</a>
                  </td>
                `).join('')}
              </tr>
            </tbody>
          </table>
        </div>
      `;

      dom.compareContentWrapper.querySelectorAll('[data-remove-compare]').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.dataset.removeCompare;
          store.toggleCompare(id);
          updateTopCounters();
          openCompareModal();
        });
      });
    }

    dom.compareModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeCompareModal() {
    if (!dom.compareModal) return;
    dom.compareModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  // ==========================================================================
  // MODAL FAVORITOS
  // ==========================================================================
  function openFavoritesModal() {
    if (!dom.favoritesModal || !dom.favoritesListWrapper) return;
    const favIds = store.getFavorites();
    const cars = favIds.map(id => store.getVehicleById(id)).filter(Boolean);

    if (cars.length === 0) {
      dom.favoritesListWrapper.innerHTML = `
        <div style="text-align:center; padding:30px; color:#A1A1AA;">
          <p>Você ainda não favoritou nenhum carro.</p>
          <p style="font-size:0.85rem; margin-top:6px;">Clique no coração <strong>❤️</strong> nos cards dos veículos para salvá-los aqui!</p>
        </div>
      `;
    } else {
      dom.favoritesListWrapper.innerHTML = cars.map(c => `
        <div style="display:flex; align-items:center; justify-content:space-between; background:#181818; padding:12px 16px; border-radius:10px; border:1px solid rgba(255,255,255,0.08);">
          <div style="display:flex; align-items:center; gap:12px;">
            <img src="${(c.images && c.images[0]) || 'img/hero-bg.jpg'}" alt="${c.model}" style="width:60px; height:45px; object-fit:cover; border-radius:6px;">
            <div>
              <h4 style="color:#FFF; font-size:0.95rem; margin:0;">${c.brand} ${c.model}</h4>
              <span style="color:var(--color-accent); font-weight:800; font-size:1rem;">${c.priceFormatted || store.formatCurrency(c.price)}</span>
            </div>
          </div>
          <div style="display:flex; align-items:center; gap:8px;">
            <a href="veiculo.html?id=${c.id}" class="btn-card-details" style="padding:6px 12px; font-size:0.78rem;">Ver</a>
            <a href="${buildWhatsAppUrl(c)}" target="_blank" class="btn-card-whatsapp" style="padding:6px 12px; font-size:0.78rem;">WhatsApp</a>
            <button type="button" class="btn-card-icon active" data-remove-fav="${c.id}" title="Remover">✕</button>
          </div>
        </div>
      `).join('');

      dom.favoritesListWrapper.querySelectorAll('[data-remove-fav]').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.dataset.removeFav;
          store.toggleFavorite(id);
          updateTopCounters();
          openFavoritesModal();
        });
      });
    }

    dom.favoritesModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeFavoritesModal() {
    if (!dom.favoritesModal) return;
    dom.favoritesModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  // ==========================================================================
  // PROVA SOCIAL REGIONAL FLUTUANTE (NOTIFICAÇÕES TOAST)
  // ==========================================================================
  const SOCIAL_NOTIFICATIONS = [
    { city: "Carlos de Paranavaí - PR", action: "acabou de simular financiamento do Jeep Renegade Longitude" },
    { city: "Marcos de Planaltina do PR", action: "agendou visita para ver o Voyage 1.6 MSI" },
    { city: "Juliana de Nova Londrina - PR", action: "favoritou o Chevrolet Cruze LTZ 1.4 Turbo" },
    { city: "Roberto de Loanda - PR", action: "solicitou avaliação de usado na troca para a S10 Cabine Dupla" },
    { city: "Anderson de Santa Isabel do Ivaí - PR", action: "fez proposta de compra no Voyage 1.0 VHT" },
    { city: "Patrícia de Terra Rica - PR", action: "consultou taxa de aprovação para sedan automático" }
  ];

  let toastIndex = 0;
  function triggerSocialProofToast() {
    if (!dom.socialProofToast || !dom.toastTitle || !dom.toastDesc) return;
    const item = SOCIAL_NOTIFICATIONS[toastIndex % SOCIAL_NOTIFICATIONS.length];
    toastIndex++;

    dom.toastTitle.textContent = item.city;
    dom.toastDesc.textContent = item.action;
    dom.socialProofToast.classList.add('visible');

    setTimeout(() => {
      dom.socialProofToast.classList.remove('visible');
    }, 6000);
  }

  function initSocialProofToasts() {
    setTimeout(triggerSocialProofToast, 4000);
    setInterval(triggerSocialProofToast, 18000);

    if (dom.btnDismissToast && dom.socialProofToast) {
      dom.btnDismissToast.addEventListener('click', () => {
        dom.socialProofToast.classList.remove('visible');
      });
    }
  }

  // ==========================================================================
  // FORMULÁRIO DE TROCA E RADAR CAÇADOR DE VEÍCULOS
  // ==========================================================================
  function initTradeInForms() {
    if (dom.tabBtnTradeIn && dom.tabBtnCarHunter && dom.tradeInForm && dom.hunterForm) {
      dom.tabBtnTradeIn.addEventListener('click', () => {
        dom.tabBtnTradeIn.classList.add('active');
        dom.tabBtnCarHunter.classList.remove('active');
        dom.tradeInForm.style.display = 'grid';
        dom.hunterForm.style.display = 'none';
      });

      dom.tabBtnCarHunter.addEventListener('click', () => {
        dom.tabBtnCarHunter.classList.add('active');
        dom.tabBtnTradeIn.classList.remove('active');
        dom.hunterForm.style.display = 'grid';
        dom.tradeInForm.style.display = 'none';
      });

      // Submit Troca
      dom.tradeInForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const currentCar = document.getElementById('tradeCurrentCar').value;
        const year = document.getElementById('tradeYear').value;
        const km = document.getElementById('tradeKm').value;
        const targetCar = document.getElementById('tradeTargetCar').value;
        const name = document.getElementById('tradeName').value;
        const city = document.getElementById('tradeCity').value;
        const phone = document.getElementById('tradePhone').value;

        // Salva lead no CRM
        store.addLead({
          name,
          city,
          phone,
          phoneRaw: phone.replace(/\D/g, ''),
          vehicleName: targetCar || "Veículo Sartec",
          type: "proposta_troca",
          hasTradeIn: true,
          tradeInDetails: `${currentCar} (${year}) - ${km}`,
          notes: `Proposta de troca enviada pelo formulário da vitrine. Quer avaliar seu ${currentCar} para comprar ${targetCar}.`
        });

        // Envia para o WhatsApp da loja
        const msg = `Olá Sartec Veículos! Gostaria de uma avaliação para dar meu carro na troca:\n\n*Meu Carro Atual:* ${currentCar}\n*Ano:* ${year}\n*KM:* ${km}\n*Tenho interesse em:* ${targetCar}\n*Meu Nome:* ${name}\n*Cidade:* ${city}`;
        window.open(`https://wa.me/5544991484162?text=${encodeURIComponent(msg)}`, '_blank');
        alert("Sua proposta foi registrada no sistema da Sartec e direcionada para o WhatsApp do nosso avaliador!");
        dom.tradeInForm.reset();
      });

      // Submit Radar Caçador
      dom.hunterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const model = document.getElementById('hunterDesiredModel').value;
        const minYear = document.getElementById('hunterMinYear').value;
        const maxPrice = document.getElementById('hunterMaxPrice').value;
        const name = document.getElementById('hunterName').value;
        const city = document.getElementById('hunterCity').value;
        const phone = document.getElementById('hunterPhone').value;

        store.addLead({
          name,
          city,
          phone,
          phoneRaw: phone.replace(/\D/g, ''),
          vehicleName: `Radar: ${model}`,
          type: "radar_cacador",
          notes: `Cliente encomendou modelo pelo Radar Caçador: ${model}, ano mínimo ${minYear || 'Indiferente'}, valor até ${maxPrice || 'A combinar'}.`
        });

        const msg = `Olá Sartec Veículos! Gostaria de encomendar um modelo pelo Radar Caçador:\n\n*Modelo Procurado:* ${model}\n*Ano Mínimo:* ${minYear || 'Tanto faz'}\n*Preço Máximo:* ${maxPrice || 'A combinar'}\n*Meu Nome:* ${name}\n*Cidade:* ${city}`;
        window.open(`https://wa.me/5544991484162?text=${encodeURIComponent(msg)}`, '_blank');
        alert("Radar Caçador ativado com sucesso! Avisaremos assim que o modelo entrar em nosso estoque.");
        dom.hunterForm.reset();
      });
    }
  }

  // ==========================================================================
  // CONFIGURAÇÃO GERAL DE EVENT LISTENERS
  // ==========================================================================
  function setupEventListeners() {
    // Menu Mobile
    if (dom.mobileToggle && dom.mobileNavPanel) {
      dom.mobileToggle.addEventListener('click', () => {
        dom.mobileToggle.classList.toggle('active');
        dom.mobileNavPanel.classList.toggle('open');
      });
    }

    // Busca Rápida Hero
    if (dom.heroQuickForm) {
      dom.heroQuickForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (dom.heroSearchInput) state.filters.search = dom.heroSearchInput.value;
        if (dom.heroBrandSelect) state.filters.brand = dom.heroBrandSelect.value;
        state.currentPage = 1;
        renderCatalog();
        scrollToCatalogTop();
      });
    }

    // Sidebar Filtros Desktop
    if (dom.filterSearch) {
      let searchTimer;
      dom.filterSearch.addEventListener('input', (e) => {
        clearTimeout(searchTimer);
        searchTimer = setTimeout(() => {
          state.filters.search = e.target.value;
          state.currentPage = 1;
          renderCatalog();
        }, 220);
      });
    }

    if (dom.filterBrand) {
      dom.filterBrand.addEventListener('change', (e) => {
        state.filters.brand = e.target.value;
        state.currentPage = 1;
        renderCatalog();
      });
    }

    if (dom.filterCategory) {
      dom.filterCategory.addEventListener('change', (e) => {
        state.filters.category = e.target.value;
        state.currentPage = 1;
        renderCatalog();
      });
    }

    if (dom.filterTransmission) {
      dom.filterTransmission.addEventListener('change', (e) => {
        state.filters.transmission = e.target.value;
        state.currentPage = 1;
        renderCatalog();
      });
    }

    if (dom.filterMinPrice) {
      dom.filterMinPrice.addEventListener('change', (e) => {
        state.filters.minPrice = e.target.value;
        state.currentPage = 1;
        renderCatalog();
      });
    }

    if (dom.filterMaxPrice) {
      dom.filterMaxPrice.addEventListener('change', (e) => {
        state.filters.maxPrice = e.target.value;
        state.currentPage = 1;
        renderCatalog();
      });
    }

    if (dom.btnClearFilters) {
      dom.btnClearFilters.addEventListener('click', clearAllFilters);
    }

    if (dom.sortSelect) {
      dom.sortSelect.addEventListener('change', (e) => {
        state.sortBy = e.target.value;
        renderCatalog();
      });
    }

    // Abertura de Modais
    if (dom.btnOpenFavorites) dom.btnOpenFavorites.addEventListener('click', openFavoritesModal);
    if (dom.btnFavoritesClose) dom.btnFavoritesClose.addEventListener('click', closeFavoritesModal);

    if (dom.btnOpenCompare) dom.btnOpenCompare.addEventListener('click', openCompareModal);
    if (dom.btnCompareClose) dom.btnCompareClose.addEventListener('click', closeCompareModal);

    if (dom.btnOpenQuiz) dom.btnOpenQuiz.addEventListener('click', openQuizModal);
    if (dom.btnBannerOpenQuiz) dom.btnBannerOpenQuiz.addEventListener('click', openQuizModal);
    if (dom.btnQuizClose) dom.btnQuizClose.addEventListener('click', closeQuizModal);
    if (dom.btnRestartQuiz) dom.btnRestartQuiz.addEventListener('click', openQuizModal);

    // Escuta atualizações de estoque (feitas por exemplo no painel Admin)
    window.addEventListener('sartec:vehicles-updated', () => {
      state.vehicles = store.getVehicles();
      populateFilterOptions();
      renderFeaturedVehicles();
      renderCatalog();
    });
  }

  // ==========================================================================
  // INICIALIZAÇÃO DA APLICAÇÃO
  // ==========================================================================
  function init() {
    initHeroCarousel();
    initDualSearchTabs();
    populateFilterOptions();
    renderFeaturedVehicles();
    renderCatalog();
    updateTopCounters();
    initSocialProofToasts();
    initTradeInForms();
    setupEventListeners();

    const loader = document.getElementById('pageLoader');
    if (loader) {
      setTimeout(() => loader.classList.add('loaded'), 250);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
