/**
 * SARTEC VEÍCULOS — APLICAÇÃO E SISTEMA DE ESTOQUE
 * Filtros em tempo real, sincronização com URL, paginação, cards otimizados,
 * modal de detalhes com veículos relacionados e integração direta com WhatsApp.
 */

(function () {
  'use strict';

  // Estado da Aplicação
  const state = {
    vehicles: window.SARTEC_VEHICLES || [],
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
      category: ''
    },
    sortBy: 'default',
    currentPage: 1,
    itemsPerPage: 9,
    activeVehicle: null
  };

  // Cache de Elementos do DOM
  const dom = {
    // Header & Mobile
    mobileToggle: document.getElementById('mobileToggle'),
    mobileNavPanel: document.getElementById('mobileNavPanel'),

    // Hero & Carrossel Comercial
    heroSearchInput: document.getElementById('heroSearchInput'),
    heroBrandSelect: document.getElementById('heroBrandSelect'),
    heroQuickForm: document.getElementById('heroQuickForm'),
    heroTrack: document.getElementById('heroCarouselTrack'),
    heroPrevBtn: document.getElementById('heroPrevBtn'),
    heroNextBtn: document.getElementById('heroNextBtn'),
    heroDots: document.getElementById('heroDots'),
    heroContainer: document.querySelector('.hero-carousel-container'),

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

    // Modal de Detalhes
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
    modalRelatedGrid: document.getElementById('modalRelatedGrid')
  };

  // Helper para URL do WhatsApp oficial padronizada
  function buildWhatsAppUrl(car) {
    const phone = state.config.phoneRaw || '554491484162';
    if (!car) {
      const generalText = 'Olá! Gostaria de consultar informações sobre os veículos disponíveis no estoque da Sartec Veículos.';
      return `https://wa.me/${phone}?text=${encodeURIComponent(generalText)}`;
    }
    const message = `Olá! Tenho interesse no veículo ${car.brand} ${car.model}, ano ${car.year}, anunciado por ${car.priceFormatted}. Gostaria de receber mais informações.`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  }

  // Sincronização de Filtros com Parâmetros da URL
  function loadFiltersFromURL() {
    const params = new URLSearchParams(window.location.search);
    if (params.has('busca')) state.filters.search = params.get('busca');
    if (params.has('marca')) state.filters.brand = params.get('marca');
    if (params.has('carroceria')) state.filters.category = params.get('carroceria');
    if (params.has('cambio')) state.filters.transmission = params.get('cambio');
    if (params.has('combustivel')) state.filters.fuel = params.get('combustivel');
    if (params.has('ano_min')) state.filters.minYear = params.get('ano_min');
    if (params.has('ano_max')) state.filters.maxYear = params.get('ano_max');
    if (params.has('preco_min')) state.filters.minPrice = params.get('preco_min');
    if (params.has('preco_max')) state.filters.maxPrice = params.get('preco_max');
    if (params.has('km_max')) state.filters.maxKm = params.get('km_max');
    if (params.has('ordenar')) state.sortBy = params.get('ordenar');
    if (params.has('pagina')) state.currentPage = parseInt(params.get('pagina'), 10) || 1;

    syncFormControlsWithState();
  }

  function updateURL() {
    const params = new URLSearchParams();
    if (state.filters.search) params.set('busca', state.filters.search);
    if (state.filters.brand) params.set('marca', state.filters.brand);
    if (state.filters.transmission) params.set('cambio', state.filters.transmission);
    if (state.filters.minYear) params.set('ano_min', state.filters.minYear);
    if (state.filters.maxYear) params.set('ano_max', state.filters.maxYear);
    if (state.filters.minPrice) params.set('preco_min', state.filters.minPrice);
    if (state.filters.maxPrice) params.set('preco_max', state.filters.maxPrice);
    if (state.sortBy !== 'default') params.set('ordenar', state.sortBy);
    if (state.currentPage > 1) params.set('pagina', state.currentPage);

    const query = params.toString();
    const newRelativePathQuery = window.location.pathname + (query ? '?' + query : '');
    window.history.replaceState(null, '', newRelativePathQuery);
  }

  function syncFormControlsWithState() {
    // Desktop
    if (dom.filterSearch) dom.filterSearch.value = state.filters.search;
    if (dom.filterBrand) dom.filterBrand.value = state.filters.brand;
    if (dom.filterCategory) dom.filterCategory.value = state.filters.category;
    if (dom.filterTransmission) dom.filterTransmission.value = state.filters.transmission;
    if (dom.filterFuel) dom.filterFuel.value = state.filters.fuel;
    if (dom.filterMinYear) dom.filterMinYear.value = state.filters.minYear;
    if (dom.filterMaxYear) dom.filterMaxYear.value = state.filters.maxYear;
    if (dom.filterMinPrice) dom.filterMinPrice.value = state.filters.minPrice;
    if (dom.filterMaxPrice) dom.filterMaxPrice.value = state.filters.maxPrice;
    if (dom.filterMaxKm) dom.filterMaxKm.value = state.filters.maxKm;
    if (dom.sortSelect) dom.sortSelect.value = state.sortBy;

    // Mobile Drawer
    if (dom.mFilterSearch) dom.mFilterSearch.value = state.filters.search;
    if (dom.mFilterBrand) dom.mFilterBrand.value = state.filters.brand;
    if (dom.mFilterCategory) dom.mFilterCategory.value = state.filters.category;
    if (dom.mFilterTransmission) dom.mFilterTransmission.value = state.filters.transmission;
    if (dom.mFilterFuel) dom.mFilterFuel.value = state.filters.fuel;
    if (dom.mFilterMinYear) dom.mFilterMinYear.value = state.filters.minYear;
    if (dom.mFilterMaxYear) dom.mFilterMaxYear.value = state.filters.maxYear;
    if (dom.mFilterMinPrice) dom.mFilterMinPrice.value = state.filters.minPrice;
    if (dom.mFilterMaxPrice) dom.mFilterMaxPrice.value = state.filters.maxPrice;
    if (dom.mFilterMaxKm) dom.mFilterMaxKm.value = state.filters.maxKm;
  }

  // ==========================================================================
  // CARROSSEL COMERCIAL DO HERO (SEÇÃO 4 DO BRIEFING)
  // ==========================================================================
  function initHeroCarousel() {
    const track = dom.heroTrack;
    if (!track) return;

    const slides = track.querySelectorAll('.hero-slide');
    if (!slides || slides.length === 0) return;

    const prevBtn = dom.heroPrevBtn;
    const nextBtn = dom.heroNextBtn;
    const dotsContainer = dom.heroDots;
    const container = dom.heroContainer;

    let currentIndex = 0;
    let autoTimer = null;
    const slideCount = slides.length;
    const AUTO_INTERVAL = 6500; // 6.5 segundos para leitura confortável e sem pressa

    // Geração dinâmica dos dots de paginação
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      for (let i = 0; i < slideCount; i++) {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = `hero-dot ${i === 0 ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Ir para o slide ${i + 1} de ${slideCount}`);
        dot.setAttribute('data-slide-index', i);
        dot.addEventListener('click', () => {
          goToSlide(i);
          restartTimer();
        });
        dotsContainer.appendChild(dot);
      }
    }

    function updateDots() {
      if (!dotsContainer) return;
      const dots = dotsContainer.querySelectorAll('.hero-dot');
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
        dot.setAttribute('aria-current', idx === currentIndex ? 'true' : 'false');
      });
    }

    function goToSlide(index) {
      if (index < 0) {
        currentIndex = slideCount - 1;
      } else if (index >= slideCount) {
        currentIndex = 0;
      } else {
        currentIndex = index;
      }
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      slides.forEach((s, idx) => {
        s.classList.toggle('active', idx === currentIndex);
      });
      updateDots();
    }

    function nextSlide() {
      goToSlide(currentIndex + 1);
    }

    function prevSlide() {
      goToSlide(currentIndex - 1);
    }

    function startTimer() {
      if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }
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

      let touchStartX = 0;
      let touchEndX = 0;

      container.addEventListener('touchstart', (e) => {
        stopTimer();
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      container.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchEndX - touchStartX;
        if (Math.abs(diff) > 40) {
          if (diff < 0) {
            nextSlide();
          } else {
            prevSlide();
          }
        }
        startTimer();
      }, { passive: true });

      container.setAttribute('tabindex', '0');
      container.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          prevSlide();
          restartTimer();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          nextSlide();
          restartTimer();
        }
      });
    }

    goToSlide(0);
    startTimer();
  }

  // ==========================================================================
  // VITRINE DE VEÍCULOS EM DESTAQUE (SEÇÃO 5 DO BRIEFING)
  // ==========================================================================
  function renderFeaturedVehicles() {
    if (!dom.featuredGrid) return;

    let featuredList = [];
    if (typeof window.getFeaturedVehicles === 'function') {
      featuredList = window.getFeaturedVehicles(4);
    }
    if (!featuredList || featuredList.length === 0) {
      const topIds = ['car-8451', 'car-8453', 'car-8456', 'car-8450'];
      featuredList = topIds.map(id => state.vehicles.find(v => v.id === id)).filter(Boolean);
      if (featuredList.length < 4) {
        featuredList = state.vehicles.slice(0, 4);
      }
    }

    dom.featuredGrid.innerHTML = featuredList.map(car => {
      const waUrl = buildWhatsAppUrl(car);
      return `
        <article class="vehicle-card" data-id="${car.id}">
          <a href="veiculo.html?id=${car.id}" class="card-image-box" title="Ver detalhes de ${car.brand} ${car.model}">
            <span class="card-category-badge">${car.category}</span>
            <img class="card-image" 
                 src="${car.images[0]}" 
                 alt="${car.brand} ${car.model} ${car.year}"
                 loading="lazy"
                 width="400"
                 height="250"
                 onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80';">
          </a>

          <div class="card-content">
            <div class="card-header-info">
              <span class="card-brand">${car.brand}</span>
              <h3 class="card-title">
                <a href="veiculo.html?id=${car.id}" style="color:inherit;">${car.brand} ${car.model}</a>
              </h3>
              <p class="card-version" title="${car.version || car.fullName}">${car.version || car.model}</p>
            </div>

            <div class="card-price-box">
              <span class="card-price-label">Preço anunciado</span>
              <div class="card-price-value">${car.priceFormatted}</div>
            </div>

            <div class="card-specs-row">
              <div class="card-spec-item">
                <span class="spec-name">Ano</span>
                <span class="spec-value">${car.year}</span>
              </div>
              <div class="card-spec-item">
                <span class="spec-name">KM</span>
                <span class="spec-value">${car.kmFormatted}</span>
              </div>
              <div class="card-spec-item">
                <span class="spec-name">Câmbio</span>
                <span class="spec-value">${car.transmission}</span>
              </div>
            </div>

            <div class="card-buttons">
              <a href="veiculo.html?id=${car.id}" class="btn-card-details" title="Acessar página completa de ${car.brand} ${car.model}">
                Ver Detalhes
              </a>
              <button type="button" class="btn-card-quickview" data-quickview-id="${car.id}" aria-label="Visualização rápida de ${car.brand} ${car.model}" title="Visualização rápida">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
                Espiar
              </button>
              <a href="${waUrl}" 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 class="btn-card-whatsapp"
                 title="Negociar pelo WhatsApp">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.2.662.589 1.221.771 1.394.858.173.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.289.13.332.202.043.073.043.419-.101.824z"/>
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </article>
      `;
    }).join('');

    dom.featuredGrid.querySelectorAll('.btn-card-quickview').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const carId = btn.dataset.quickviewId;
        if (carId) openVehicleModal(carId);
      });
    });

    dom.featuredGrid.querySelectorAll('.vehicle-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.btn-card-whatsapp') || e.target.closest('.btn-card-quickview')) return;
        if (!e.target.closest('a')) {
          const carId = card.dataset.id;
          if (carId) window.location.href = `veiculo.html?id=${carId}`;
        }
      });
    });
  }

  // Preenchimento Dinâmico de Opções dos Filtros
  function populateFilterOptions() {
    const brands = [...new Set(state.vehicles.map(v => v.brand))].sort();
    const categories = [...new Set(state.vehicles.map(v => v.category))].sort();
    const years = [...new Set(state.vehicles.map(v => v.year))].sort((a, b) => b - a);

    // Marca
    const brandOptions = `<option value="">Todas as Marcas</option>` +
      brands.map(b => `<option value="${b}">${b}</option>`).join('');
    if (dom.filterBrand) dom.filterBrand.innerHTML = brandOptions;
    if (dom.heroBrandSelect) dom.heroBrandSelect.innerHTML = brandOptions;
    if (dom.mFilterBrand) dom.mFilterBrand.innerHTML = brandOptions;

    // Carroceria
    const catOptions = `<option value="">Todas as Carrocerias</option>` +
      categories.map(c => `<option value="${c}">${c}</option>`).join('');
    if (dom.filterCategory) dom.filterCategory.innerHTML = catOptions;
    if (dom.mFilterCategory) dom.mFilterCategory.innerHTML = catOptions;

    // Anos
    const yearOptions = years.map(y => `<option value="${y}">${y}</option>`).join('');
    if (dom.filterMinYear) {
      dom.filterMinYear.innerHTML = `<option value="">Ano Mínimo</option>` + yearOptions;
    }
    if (dom.filterMaxYear) {
      dom.filterMaxYear.innerHTML = `<option value="">Ano Máximo</option>` + yearOptions;
    }
    if (dom.mFilterMinYear) {
      dom.mFilterMinYear.innerHTML = `<option value="">Ano Mínimo</option>` + yearOptions;
    }
    if (dom.mFilterMaxYear) {
      dom.mFilterMaxYear.innerHTML = `<option value="">Ano Máximo</option>` + yearOptions;
    }
  }

  // Filtragem e Ordenação
  function getFilteredVehicles() {
    const { search, brand, category, transmission, fuel, minYear, maxYear, minPrice, maxPrice, maxKm } = state.filters;
    const searchLower = search.toLowerCase().trim();

    let list = state.vehicles.filter(car => {
      // Busca geral textual
      if (searchLower) {
        const fullString = `${car.brand} ${car.model} ${car.fullName} ${car.version} ${car.year} ${car.category}`.toLowerCase();
        if (!fullString.includes(searchLower)) return false;
      }
      // Marca
      if (brand && car.brand !== brand) return false;
      // Carroceria
      if (category && car.category !== category) return false;
      // Câmbio
      if (transmission && car.transmission !== transmission) return false;
      // Combustível
      if (fuel && car.fuel !== fuel) return false;
      // Ano mínimo
      if (minYear && car.year < parseInt(minYear, 10)) return false;
      // Ano máximo
      if (maxYear && car.year > parseInt(maxYear, 10)) return false;
      // Preço mínimo
      if (minPrice && car.price < parseFloat(minPrice)) return false;
      // Preço máximo
      if (maxPrice && car.price > parseFloat(maxPrice)) return false;
      // Quilometragem máxima
      if (maxKm && car.km > parseInt(maxKm, 10)) return false;

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
        // Ordem natural do estoque
        break;
    }

    return list;
  }

  // Atualização das Pills de Filtros Ativos
  function renderActiveFilters(count) {
    if (!dom.activeFiltersBar || !dom.activeFiltersList) return;

    const activeList = [];
    const f = state.filters;

    if (f.search) activeList.push({ key: 'search', label: `Carro: "${f.search}"` });
    if (f.brand) activeList.push({ key: 'brand', label: `Marca: ${f.brand}` });
    if (f.transmission) activeList.push({ key: 'transmission', label: `Câmbio: ${f.transmission}` });
    if (f.minYear) activeList.push({ key: 'minYear', label: `Ano a partir de ${f.minYear}` });
    if (f.maxYear) activeList.push({ key: 'maxYear', label: `Ano até ${f.maxYear}` });
    if (f.minPrice) activeList.push({ key: 'minPrice', label: `Preço Mín: R$ ${Number(f.minPrice).toLocaleString('pt-BR')}` });
    if (f.maxPrice) activeList.push({ key: 'maxPrice', label: `Preço Máx: R$ ${Number(f.maxPrice).toLocaleString('pt-BR')}` });

    // Atualiza badge mobile
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
          syncFormControlsWithState();
          applyFilters();
        }
      });
    });
  }

  // Renderização dos Cards na Vitrine
  function renderCatalog() {
    const filteredList = getFilteredVehicles();
    const totalCount = filteredList.length;

    // Atualiza contador oficial no topo da vitrine
    if (dom.catalogCountNum) {
      dom.catalogCountNum.textContent = totalCount;
    }

    renderActiveFilters(totalCount);

    // Estado de busca sem resultados
    if (totalCount === 0) {
      dom.catalogGrid.innerHTML = `
        <div class="empty-state">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <h3>Nenhum veículo encontrado</h3>
          <p>Não encontramos nenhum veículo correspondente aos filtros selecionados. Tente ajustar os parâmetros ou limpar os filtros para ver todas as opções.</p>
          <button type="button" class="btn-primary" id="btnEmptyReset">
            Ver Todos os Veículos (${state.vehicles.length})
          </button>
        </div>
      `;
      const btnEmptyReset = document.getElementById('btnEmptyReset');
      if (btnEmptyReset) {
        btnEmptyReset.addEventListener('click', clearAllFilters);
      }
      if (dom.paginationWrapper) dom.paginationWrapper.innerHTML = '';
      return;
    }

    // Paginação: Cálculo de Fatias
    const totalPages = Math.ceil(totalCount / state.itemsPerPage);
    if (state.currentPage > totalPages) state.currentPage = totalPages;
    if (state.currentPage < 1) state.currentPage = 1;

    const startIndex = (state.currentPage - 1) * state.itemsPerPage;
    const pageItems = filteredList.slice(startIndex, startIndex + state.itemsPerPage);

    // Render dos Cards
    dom.catalogGrid.innerHTML = pageItems.map(car => {
      const waUrl = buildWhatsAppUrl(car);
      return `
        <article class="vehicle-card" data-id="${car.id}">
          <a href="veiculo.html?id=${car.id}" class="card-image-box" title="Ver detalhes de ${car.brand} ${car.model}">
            <span class="card-category-badge">${car.category}</span>
            <img class="card-image" 
                 src="${car.images[0]}" 
                 alt="${car.brand} ${car.model} ${car.year}"
                 loading="lazy"
                 width="400"
                 height="250"
                 onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80';">
          </a>

          <div class="card-content">
            <div class="card-header-info">
              <span class="card-brand">${car.brand}</span>
              <h3 class="card-title">
                <a href="veiculo.html?id=${car.id}" style="color:inherit;">${car.brand} ${car.model}</a>
              </h3>
              <p class="card-version" title="${car.version || car.fullName}">${car.version || car.model}</p>
            </div>

            <!-- 2. Preço em Destaque Visual Imediato -->
            <div class="card-price-box">
              <span class="card-price-label">Preço anunciado</span>
              <div class="card-price-value">${car.priceFormatted}</div>
            </div>

            <!-- 3. Especificações Técnicas Compactas -->
            <div class="card-specs-row">
              <div class="card-spec-item">
                <span class="spec-name">Ano</span>
                <span class="spec-value">${car.year}</span>
              </div>
              <div class="card-spec-item">
                <span class="spec-name">KM</span>
                <span class="spec-value">${car.kmFormatted}</span>
              </div>
              <div class="card-spec-item">
                <span class="spec-name">Câmbio</span>
                <span class="spec-value">${car.transmission}</span>
              </div>
            </div>

            <!-- 4. Ações: Ver Detalhes (Página Individual Local), Espiar (Modal Rápido) & WhatsApp Oficial -->
            <div class="card-buttons">
              <a href="veiculo.html?id=${car.id}" class="btn-card-details" title="Acessar página completa de ${car.brand} ${car.model}">
                Ver Detalhes
              </a>
              <button type="button" class="btn-card-quickview" data-quickview-id="${car.id}" aria-label="Visualização rápida de ${car.brand} ${car.model}" title="Visualização rápida">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
                Espiar
              </button>
              <a href="${waUrl}" 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 class="btn-card-whatsapp"
                 title="Negociar pelo WhatsApp">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.2.662.589 1.221.771 1.394.858.173.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.289.13.332.202.043.073.043.419-.101.824z"/>
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </article>
      `;
    }).join('');

    // Listeners nos botões de espiar/modal rápido
    dom.catalogGrid.querySelectorAll('.btn-card-quickview').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const carId = btn.dataset.quickviewId;
        if (carId) openVehicleModal(carId);
      });
    });

    // Listener para navegação ao clicar no card do veículo
    dom.catalogGrid.querySelectorAll('.vehicle-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.btn-card-whatsapp') || e.target.closest('.btn-card-quickview')) return;
        if (!e.target.closest('a')) {
          const carId = card.dataset.id;
          if (carId) {
            window.location.href = `veiculo.html?id=${carId}`;
          }
        }
      });
    });

    renderPagination(totalPages);
  }

  // Renderização dos Controles de Paginação
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

    // Listeners de paginação
    dom.paginationWrapper.querySelectorAll('.btn-page[data-page]').forEach(btn => {
      btn.addEventListener('click', () => {
        state.currentPage = parseInt(btn.dataset.page, 10);
        updateURL();
        renderCatalog();
        scrollToCatalogTop();
      });
    });

    const btnPrev = document.getElementById('btnPagePrev');
    if (btnPrev) {
      btnPrev.addEventListener('click', () => {
        if (state.currentPage > 1) {
          state.currentPage--;
          updateURL();
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
          updateURL();
          renderCatalog();
          scrollToCatalogTop();
        }
      });
    }
  }

  function scrollToCatalogTop() {
    const catalogEl = document.getElementById('estoque');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Aplicação Geral de Filtros
  function applyFilters() {
    state.currentPage = 1;
    updateURL();
    renderCatalog();
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
      category: ''
    };
    state.sortBy = 'default';
    state.currentPage = 1;

    syncFormControlsWithState();
    updateURL();
    renderCatalog();
  }

  // ==========================================================================
  // MODAL / DETALHES DO VEÍCULO COM VEÍCULOS RELACIONADOS
  // ==========================================================================

  function openVehicleModal(vehicleId) {
    const car = state.vehicles.find(v => v.id === vehicleId);
    if (!car) return;

    state.activeVehicle = car;

    // Informações Básicas
    dom.modalBrand.textContent = car.brand;
    dom.modalTitle.textContent = `${car.brand} ${car.model}`;
    dom.modalVersion.textContent = car.version || car.model;
    dom.modalPrice.textContent = car.priceFormatted;

    // Imagem Principal
    dom.modalMainImg.src = car.images[0];
    dom.modalMainImg.alt = `${car.brand} ${car.model}`;

    // Miniaturas da Galeria (apenas exibidas se houver mais de 1 foto real)
    if (dom.modalThumbnails) {
      if (car.images && car.images.length > 1) {
        dom.modalThumbnails.style.display = 'flex';
        dom.modalThumbnails.innerHTML = car.images.map((imgUrl, index) => `
          <img class="thumb-item ${index === 0 ? 'active' : ''}" 
               src="${imgUrl}" 
               alt="Miniatura ${index + 1}"
               data-img="${imgUrl}">
        `).join('');

        dom.modalThumbnails.querySelectorAll('.thumb-item').forEach(thumb => {
          thumb.addEventListener('click', () => {
            dom.modalThumbnails.querySelectorAll('.thumb-item').forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
            dom.modalMainImg.src = thumb.dataset.img;
          });
        });
      } else {
        dom.modalThumbnails.style.display = 'none';
        dom.modalThumbnails.innerHTML = '';
      }
    }

    // Ficha Técnica Completa
    dom.modalSpecYear.textContent = car.year;
    dom.modalSpecKm.textContent = car.kmFormatted;
    dom.modalSpecTransmission.textContent = car.transmission;
    dom.modalSpecFuel.textContent = car.fuel;
    dom.modalSpecCategory.textContent = car.category;
    dom.modalSpecColor.textContent = car.color || 'Prata';
    dom.modalSpecPlate.textContent = `Final ${car.plateEnd || '8'}`;
    dom.modalSpecDoors.textContent = `${car.doors || 4} Portas`;

    // Equipamentos / Opcionais Reais
    if (dom.modalFeaturesList) {
      dom.modalFeaturesList.innerHTML = (car.features || []).map(f => `
        <span class="feature-chip">✓ ${f}</span>
      `).join('');
    }

    // Link para a Página Completa do Anúncio Local
    if (dom.modalFullDetailsBtn) {
      dom.modalFullDetailsBtn.href = `veiculo.html?id=${car.id}`;
    }

    // WhatsApp CTA Padronizado Oficial
    const waUrl = buildWhatsAppUrl(car);
    dom.modalWhatsappBtn.href = waUrl;

    // Veículos Relacionados (do mesmo fabricante ou categoria)
    if (dom.modalRelatedGrid) {
      const related = state.vehicles
        .filter(v => v.id !== car.id && (v.brand === car.brand || v.category === car.category))
        .slice(0, 3);

      if (related.length > 0) {
        dom.modalRelatedGrid.innerHTML = related.map(rel => `
          <div class="related-card-mini" data-id="${rel.id}">
            <img class="related-mini-thumb" src="${rel.images[0]}" alt="${rel.fullName}">
            <div>
              <div class="related-mini-title">${rel.brand} ${rel.model}</div>
              <div class="related-mini-price">${rel.priceFormatted}</div>
            </div>
          </div>
        `).join('');

        dom.modalRelatedGrid.querySelectorAll('.related-card-mini').forEach(relBtn => {
          relBtn.addEventListener('click', () => {
            openVehicleModal(relBtn.dataset.id);
          });
        });
      } else {
        dom.modalRelatedGrid.innerHTML = `<p style="font-size:0.85rem; color:var(--text-muted);">Nenhum outro veículo similar no momento.</p>`;
      }
    }

    // Exibição do Modal
    dom.modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeVehicleModal() {
    dom.modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
    state.activeVehicle = null;
  }

  // ==========================================================================
  // CONFIGURAÇÃO DOS LISTENERS DE EVENTOS
  // ==========================================================================

  function setupEventListeners() {
    // Busca por Texto no Catálogo (com debounce)
    let searchTimer;
    if (dom.filterSearch) {
      dom.filterSearch.addEventListener('input', (e) => {
        clearTimeout(searchTimer);
        searchTimer = setTimeout(() => {
          state.filters.search = e.target.value;
          applyFilters();
        }, 220);
      });
    }

    // Selects da Barra Lateral
    if (dom.filterBrand) {
      dom.filterBrand.addEventListener('change', (e) => {
        state.filters.brand = e.target.value;
        applyFilters();
      });
    }

    if (dom.filterCategory) {
      dom.filterCategory.addEventListener('change', (e) => {
        state.filters.category = e.target.value;
        applyFilters();
      });
    }

    if (dom.filterTransmission) {
      dom.filterTransmission.addEventListener('change', (e) => {
        state.filters.transmission = e.target.value;
        applyFilters();
      });
    }

    if (dom.filterFuel) {
      dom.filterFuel.addEventListener('change', (e) => {
        state.filters.fuel = e.target.value;
        applyFilters();
      });
    }

    if (dom.filterMinYear) {
      dom.filterMinYear.addEventListener('change', (e) => {
        state.filters.minYear = e.target.value;
        applyFilters();
      });
    }

    if (dom.filterMaxYear) {
      dom.filterMaxYear.addEventListener('change', (e) => {
        state.filters.maxYear = e.target.value;
        applyFilters();
      });
    }

    if (dom.filterMinPrice) {
      dom.filterMinPrice.addEventListener('change', (e) => {
        state.filters.minPrice = e.target.value;
        applyFilters();
      });
    }

    if (dom.filterMaxPrice) {
      dom.filterMaxPrice.addEventListener('change', (e) => {
        state.filters.maxPrice = e.target.value;
        applyFilters();
      });
    }

    if (dom.filterMaxKm) {
      dom.filterMaxKm.addEventListener('change', (e) => {
        state.filters.maxKm = e.target.value;
        applyFilters();
      });
    }

    // Ordenação
    if (dom.sortSelect) {
      dom.sortSelect.addEventListener('change', (e) => {
        state.sortBy = e.target.value;
        applyFilters();
      });
    }

    // Limpar Filtros
    if (dom.btnClearFilters) {
      dom.btnClearFilters.addEventListener('click', clearAllFilters);
    }

    // Hero Busca Rápida Form
    if (dom.heroQuickForm) {
      dom.heroQuickForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const keyword = dom.heroSearchInput ? dom.heroSearchInput.value : '';
        const brand = dom.heroBrandSelect ? dom.heroBrandSelect.value : '';

        state.filters.search = keyword;
        state.filters.brand = brand;
        syncFormControlsWithState();
        applyFilters();
        scrollToCatalogTop();
      });
    }

    // Modal Fechamento
    if (dom.modalCloseBtn) {
      dom.modalCloseBtn.addEventListener('click', closeVehicleModal);
    }

    if (dom.modalBackdrop) {
      dom.modalBackdrop.addEventListener('click', (e) => {
        if (e.target === dom.modalBackdrop) {
          closeVehicleModal();
        }
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeVehicleModal();
        closeMobileFiltersDrawer();
      }
    });

    // Mobile Menu
    if (dom.mobileToggle && dom.mobileNavPanel) {
      dom.mobileToggle.addEventListener('click', () => {
        dom.mobileToggle.classList.toggle('active');
        dom.mobileNavPanel.classList.toggle('open');
      });

      dom.mobileNavPanel.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
          dom.mobileToggle.classList.remove('active');
          dom.mobileNavPanel.classList.remove('open');
        });
      });
    }

    // Mobile Filters Drawer
    if (dom.btnOpenMobileFilters) {
      dom.btnOpenMobileFilters.addEventListener('click', openMobileFiltersDrawer);
    }
    if (dom.btnCloseMobileFilters) {
      dom.btnCloseMobileFilters.addEventListener('click', closeMobileFiltersDrawer);
    }
    if (dom.btnApplyMobileFilters) {
      dom.btnApplyMobileFilters.addEventListener('click', () => {
        applyFilters();
        closeMobileFiltersDrawer();
        scrollToCatalogTop();
      });
    }
    if (dom.btnClearMobileFilters) {
      dom.btnClearMobileFilters.addEventListener('click', () => {
        clearAllFilters();
        closeMobileFiltersDrawer();
      });
    }

    // Listeners diretos para controles do Mobile Drawer
    if (dom.mFilterSearch) {
      let mSearchTimer;
      dom.mFilterSearch.addEventListener('input', (e) => {
        clearTimeout(mSearchTimer);
        mSearchTimer = setTimeout(() => {
          state.filters.search = e.target.value;
          if (dom.filterSearch) dom.filterSearch.value = e.target.value;
          applyFilters();
        }, 220);
      });
    }
    if (dom.mFilterBrand) {
      dom.mFilterBrand.addEventListener('change', (e) => {
        state.filters.brand = e.target.value;
        if (dom.filterBrand) dom.filterBrand.value = e.target.value;
        applyFilters();
      });
    }
    if (dom.mFilterCategory) {
      dom.mFilterCategory.addEventListener('change', (e) => {
        state.filters.category = e.target.value;
        if (dom.filterCategory) dom.filterCategory.value = e.target.value;
        applyFilters();
      });
    }
    if (dom.mFilterTransmission) {
      dom.mFilterTransmission.addEventListener('change', (e) => {
        state.filters.transmission = e.target.value;
        if (dom.filterTransmission) dom.filterTransmission.value = e.target.value;
        applyFilters();
      });
    }
    if (dom.mFilterFuel) {
      dom.mFilterFuel.addEventListener('change', (e) => {
        state.filters.fuel = e.target.value;
        if (dom.filterFuel) dom.filterFuel.value = e.target.value;
        applyFilters();
      });
    }
    if (dom.mFilterMinYear) {
      dom.mFilterMinYear.addEventListener('change', (e) => {
        state.filters.minYear = e.target.value;
        if (dom.filterMinYear) dom.filterMinYear.value = e.target.value;
        applyFilters();
      });
    }
    if (dom.mFilterMaxYear) {
      dom.mFilterMaxYear.addEventListener('change', (e) => {
        state.filters.maxYear = e.target.value;
        if (dom.filterMaxYear) dom.filterMaxYear.value = e.target.value;
        applyFilters();
      });
    }
    if (dom.mFilterMinPrice) {
      dom.mFilterMinPrice.addEventListener('change', (e) => {
        state.filters.minPrice = e.target.value;
        if (dom.filterMinPrice) dom.filterMinPrice.value = e.target.value;
        applyFilters();
      });
    }
    if (dom.mFilterMaxPrice) {
      dom.mFilterMaxPrice.addEventListener('change', (e) => {
        state.filters.maxPrice = e.target.value;
        if (dom.filterMaxPrice) dom.filterMaxPrice.value = e.target.value;
        applyFilters();
      });
    }
    if (dom.mFilterMaxKm) {
      dom.mFilterMaxKm.addEventListener('change', (e) => {
        state.filters.maxKm = e.target.value;
        if (dom.filterMaxKm) dom.filterMaxKm.value = e.target.value;
        applyFilters();
      });
    }
  }

  function openMobileFiltersDrawer() {
    if (dom.mobileFiltersDrawer) {
      dom.mobileFiltersDrawer.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMobileFiltersDrawer() {
    if (dom.mobileFiltersDrawer) {
      dom.mobileFiltersDrawer.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  // ==========================================================================
  // GERENCIAMENTO DA TELA DE CARREGAMENTO & INICIALIZAÇÃO
  // ==========================================================================
  function hidePageLoader() {
    const loader = document.getElementById('pageLoader');
    if (loader) {
      setTimeout(() => {
        loader.classList.add('loaded');
      }, 250);
    }
  }

  function init() {
    initHeroCarousel();
    renderFeaturedVehicles();
    populateFilterOptions();
    loadFiltersFromURL();
    setupEventListeners();
    renderCatalog();
    hidePageLoader();
  }

  window.addEventListener('load', hidePageLoader);
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(hidePageLoader, 400);
  }

  init();

  // Expor funções públicas se necessário
  window.sartecApp = {
    openModal: openVehicleModal,
    clearFilters: clearAllFilters,
    state: state
  };

})();
