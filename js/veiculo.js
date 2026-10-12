/**
 * SARTEC VEÍCULOS — PÁGINA DEDICADA DO VEÍCULO (veiculo.js)
 * Carregamento dos dados reais do veículo por parâmetro ?id=car-XXXX,
 * galeria interativa de fotos, ficha técnica completa, veículos relacionados
 * e integração oficial de negociação via WhatsApp.
 */

(function () {
  'use strict';

  const vehicles = window.SARTEC_VEHICLES || [];
  const config = window.SARTEC_CONFIG || {};

  // Obter ID do veículo a partir da URL
  const params = new URLSearchParams(window.location.search);
  const vehicleId = params.get('id');

  // Elementos do DOM
  const notFoundEl = document.getElementById('vehicleNotFound');
  const contentEl = document.getElementById('vehicleContent');
  const pageTitle = document.getElementById('pageTitle');
  const pageMetaDesc = document.getElementById('pageMetaDesc');
  const ogTitle = document.getElementById('ogTitle');
  const ogDesc = document.getElementById('ogDesc');
  const ogImage = document.getElementById('ogImage');

  // Breadcrumbs
  const crumbBrand = document.getElementById('crumbBrand');
  const crumbModel = document.getElementById('crumbModel');

  // Showcase
  const vCategoryBadge = document.getElementById('vCategoryBadge');
  const vMainImage = document.getElementById('vMainImage');
  const vThumbnailsRow = document.getElementById('vThumbnailsRow');
  const vBrandTag = document.getElementById('vBrandTag');
  const vTitle = document.getElementById('vTitle');
  const vVersion = document.getElementById('vVersion');
  const vPrice = document.getElementById('vPrice');

  // Quick Specs
  const vQuickYear = document.getElementById('vQuickYear');
  const vQuickKm = document.getElementById('vQuickKm');
  const vQuickTransmission = document.getElementById('vQuickTransmission');
  const vQuickFuel = document.getElementById('vQuickFuel');

  // WhatsApp CTA
  const vWhatsappCtaBtn = document.getElementById('vWhatsappCtaBtn');

  // Seção Ficha Técnica & Opcionais
  const vSpecsGrid = document.getElementById('vSpecsGrid');
  const vFeaturesContainer = document.getElementById('vFeaturesContainer');

  // Seção Veículos Relacionados
  const vRelatedGrid = document.getElementById('vRelatedGrid');

  // Menu Mobile
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileNavPanel = document.getElementById('mobileNavPanel');

  if (mobileToggle && mobileNavPanel) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      mobileNavPanel.classList.toggle('open');
    });
  }

  // Buscar veículo
  const car = vehicles.find(v => v.id === vehicleId);

  if (!car) {
    if (notFoundEl) notFoundEl.style.display = 'block';
    if (contentEl) contentEl.style.display = 'none';
    const specsSection = document.getElementById('fichaTecnica');
    const relatedSection = document.getElementById('veiculosRelacionados');
    if (specsSection) specsSection.style.display = 'none';
    if (relatedSection) relatedSection.style.display = 'none';
    return;
  }

  // Veículo Encontrado: Atualizar Metadados
  const titleString = `${car.brand} ${car.model} (${car.year}) — Sartec Veículos`;
  const descString = `Confira ${car.brand} ${car.model} ${car.version || ''}, ano ${car.year}, com ${car.kmFormatted} anunciado por ${car.priceFormatted} na Sartec Veículos em Planaltina do Paraná.`;

  document.title = titleString;
  if (pageTitle) pageTitle.textContent = titleString;
  if (pageMetaDesc) pageMetaDesc.setAttribute('content', descString);
  if (ogTitle) ogTitle.setAttribute('content', titleString);
  if (ogDesc) ogDesc.setAttribute('content', descString);
  if (ogImage && car.images && car.images[0]) ogImage.setAttribute('content', car.images[0]);

  // Breadcrumbs
  if (crumbBrand) crumbBrand.textContent = car.brand;
  if (crumbModel) crumbModel.textContent = `${car.brand} ${car.model}`;

  // Cabeçalho e Título
  if (vBrandTag) vBrandTag.textContent = car.brand;
  if (vTitle) vTitle.textContent = `${car.brand} ${car.model}`;
  if (vVersion) vVersion.textContent = car.version || car.fullName || car.model;
  if (vCategoryBadge) vCategoryBadge.textContent = car.category;

  // Preço em Destaque
  if (vPrice) vPrice.textContent = car.priceFormatted;

  // Quick Specs
  if (vQuickYear) vQuickYear.textContent = car.year;
  if (vQuickKm) vQuickKm.textContent = car.kmFormatted;
  if (vQuickTransmission) vQuickTransmission.textContent = car.transmission;
  if (vQuickFuel) vQuickFuel.textContent = car.fuel;

  // WhatsApp URL Oficial Padronizada
  const phone = config.phoneRaw || '554491484162';
  const whatsappMsg = `Olá! Tenho interesse no veículo ${car.brand} ${car.model}, ano ${car.year}, anunciado por ${car.priceFormatted}. Gostaria de receber mais informações.`;
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(whatsappMsg)}`;

  if (vWhatsappCtaBtn) {
    vWhatsappCtaBtn.href = whatsappUrl;
  }

  // Galeria de Fotos
  if (vMainImage && car.images && car.images.length > 0) {
    vMainImage.src = car.images[0];
    vMainImage.alt = `${car.brand} ${car.model} ${car.year}`;

    if (vThumbnailsRow) {
      vThumbnailsRow.innerHTML = car.images.map((imgUrl, index) => `
        <img class="v-thumb ${index === 0 ? 'active' : ''}" 
             src="${imgUrl}" 
             alt="Foto ${index + 1} de ${car.brand} ${car.model}" 
             data-img="${imgUrl}">
      `).join('');

      vThumbnailsRow.querySelectorAll('.v-thumb').forEach(thumb => {
        thumb.addEventListener('click', () => {
          vThumbnailsRow.querySelectorAll('.v-thumb').forEach(t => t.classList.remove('active'));
          thumb.classList.add('active');
          vMainImage.src = thumb.dataset.img;
        });
      });
    }
  }

  // Ficha Técnica Completa (Grid Estruturado)
  if (vSpecsGrid) {
    const specsItems = [
      { k: 'Marca', v: car.brand },
      { k: 'Modelo', v: car.model },
      { k: 'Versão', v: car.version || '-' },
      { k: 'Ano Fabricação / Modelo', v: car.year },
      { k: 'Quilometragem', v: car.kmFormatted },
      { k: 'Câmbio', v: car.transmission },
      { k: 'Combustível', v: car.fuel },
      { k: 'Carroceria', v: car.category },
      { k: 'Cor', v: car.color || 'Prata' },
      { k: 'Portas', v: `${car.doors || 4} Portas` },
      { k: 'Final da Placa', v: `Final ${car.plateEnd || '8'}` },
      { k: 'Condição', v: 'Seminovo Revisado' }
    ];

    vSpecsGrid.innerHTML = specsItems.map(item => `
      <div class="specs-grid-cell">
        <span class="cell-label">${item.k}</span>
        <strong class="cell-value">${item.v}</strong>
      </div>
    `).join('');
  }

  // Equipamentos e Opcionais Confirmados
  if (vFeaturesContainer) {
    const features = car.features || [];
    if (features.length > 0) {
      vFeaturesContainer.innerHTML = features.map(f => `
        <span class="v-feature-chip">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          ${f}
        </span>
      `).join('');
    } else {
      vFeaturesContainer.innerHTML = `<span style="color:var(--text-muted); font-size:0.88rem;">Equipamentos originais de fábrica verificados.</span>`;
    }
  }

  // Veículos Relacionados (do mesmo fabricante ou categoria)
  if (vRelatedGrid) {
    const relatedCars = vehicles
      .filter(v => v.id !== car.id && (v.brand === car.brand || v.category === car.category))
      .slice(0, 3);

    if (relatedCars.length > 0) {
      vRelatedGrid.innerHTML = relatedCars.map(rel => {
        const relWaUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
          `Olá! Tenho interesse no veículo ${rel.brand} ${rel.model}, ano ${rel.year}, anunciado por ${rel.priceFormatted}. Gostaria de receber mais informações.`
        )}`;

        return `
          <article class="vehicle-card" data-id="${rel.id}">
            <a href="veiculo.html?id=${rel.id}" class="card-image-box" title="Ver detalhes do ${rel.brand} ${rel.model}">
              <span class="card-category-badge">${rel.category}</span>
              <img class="card-image" 
                   src="${rel.images[0]}" 
                   alt="${rel.brand} ${rel.model} ${rel.year}" 
                   loading="lazy">
            </a>

            <div class="card-content">
              <div class="card-header-info">
                <span class="card-brand">${rel.brand}</span>
                <h3 class="card-title">
                  <a href="veiculo.html?id=${rel.id}" style="color:inherit;">${rel.brand} ${rel.model}</a>
                </h3>
                <p class="card-version" title="${rel.version || rel.model}">${rel.version || rel.model}</p>
              </div>

              <div class="card-price-box">
                <span class="card-price-label">Preço anunciado</span>
                <div class="card-price-value">${rel.priceFormatted}</div>
              </div>

              <div class="card-specs-row">
                <div class="card-spec-item">
                  <span class="spec-name">Ano</span>
                  <span class="spec-value">${rel.year}</span>
                </div>
                <div class="card-spec-item">
                  <span class="spec-name">KM</span>
                  <span class="spec-value">${rel.kmFormatted}</span>
                </div>
                <div class="card-spec-item">
                  <span class="spec-name">Câmbio</span>
                  <span class="spec-value">${rel.transmission}</span>
                </div>
              </div>

              <div class="card-buttons">
                <a href="veiculo.html?id=${rel.id}" class="btn-card-details">
                  Ver Detalhes
                </a>
                <a href="${relWaUrl}" 
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

      // Adiciona clique no card relacionado
      vRelatedGrid.querySelectorAll('.vehicle-card').forEach(card => {
        card.addEventListener('click', (e) => {
          if (e.target.closest('.btn-card-whatsapp')) return;
          if (!e.target.closest('a')) {
            const relId = card.dataset.id;
            if (relId) {
              window.location.href = `veiculo.html?id=${relId}`;
            }
          }
        });
      });
    } else {
      vRelatedGrid.innerHTML = `
        <p style="grid-column:1/-1; color:var(--text-muted); font-size:0.95rem; text-align:center; padding:20px;">
          Explore mais opções em nosso catálogo completo.
        </p>
      `;
    }
  }

})();
