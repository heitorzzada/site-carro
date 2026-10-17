/**
 * SARTEC VEÍCULOS — PÁGINA INDIVIDUAL DO VEÍCULO (veiculo.js)
 * Conexão com SARTEC_STORE, Termômetro FIPE, Certificado Cautelar,
 * Simulador com Probabilidade de Aprovação, Reserva 24h e Vídeo Ao Vivo.
 */

(function () {
  'use strict';

  const store = window.SARTEC_STORE || {
    getVehicleById: id => (window.SARTEC_VEHICLES || []).find(v => v.id === id),
    getVehicles: () => window.SARTEC_VEHICLES || [],
    formatCurrency: val => `R$ ${Number(val).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
    formatKm: val => `${Number(val).toLocaleString('pt-BR')} km`,
    calculateInstallment: (p, d, m, r) => {
      const principal = Math.max(0, p - d);
      const i = (r || 1.35) / 100;
      const factor = Math.pow(1 + i, m);
      return Math.round(principal * ((i * factor) / (factor - 1)));
    },
    addLead: () => {}
  };

  // Obter ID do veículo a partir da URL
  const params = new URLSearchParams(window.location.search);
  const vehicleId = params.get('id');

  // Cache de Elementos
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

  // Showcase Header & Badges
  const vStatusBadge = document.getElementById('vStatusBadge');
  const vSpecialBadge = document.getElementById('vSpecialBadge');
  const vBrandTag = document.getElementById('vBrandTag');
  const vTitle = document.getElementById('vTitle');
  const vVersion = document.getElementById('vVersion');
  const vPrice = document.getElementById('vPrice');

  // Ações Rápidas
  const btnRequestLiveVideo = document.getElementById('btnRequestLiveVideo');
  const btnOpenReserveModal = document.getElementById('btnOpenReserveModal');
  const reserveModal = document.getElementById('reserveModal');
  const btnReserveClose = document.getElementById('btnReserveClose');
  const reserveForm = document.getElementById('reserveForm');

  // Termômetro FIPE
  const vFipeEconomyTag = document.getElementById('vFipeEconomyTag');
  const vFipeBarFill = document.getElementById('vFipeBarFill');
  const vFipeSartecLabel = document.getElementById('vFipeSartecLabel');
  const vFipeOfficialLabel = document.getElementById('vFipeOfficialLabel');

  // Galeria & Imagens
  const vMainImage = document.getElementById('vMainImage');
  const vThumbnailsRow = document.getElementById('vThumbnailsRow');
  const vCategoryBadge = document.getElementById('vCategoryBadge');

  // Quick Specs
  const vQuickYear = document.getElementById('vQuickYear');
  const vQuickKm = document.getElementById('vQuickKm');
  const vQuickTransmission = document.getElementById('vQuickTransmission');
  const vQuickFuel = document.getElementById('vQuickFuel');
  const vWhatsappCtaBtn = document.getElementById('vWhatsappCtaBtn');

  // Ficha Técnica & Opcionais
  const vSpecsGrid = document.getElementById('vSpecsGrid');
  const vFeaturesContainer = document.getElementById('vFeaturesContainer');

  // Consumo & Custos
  const vConsumpCity = document.getElementById('vConsumpCity');
  const vConsumpHighway = document.getElementById('vConsumpHighway');
  const vConsumpMonthlyCost = document.getElementById('vConsumpMonthlyCost');

  // Simulador de Financiamento
  const simVehiclePrice = document.getElementById('simVehiclePrice');
  const simDownPaymentRange = document.getElementById('simDownPaymentRange');
  const simDownPaymentInput = document.getElementById('simDownPaymentInput');
  const simDownPaymentPct = document.getElementById('simDownPaymentPct');
  const simPresetChips = document.getElementById('simPresetChips');
  const simTermSelector = document.getElementById('simTermSelector');
  const simResultMonths = document.getElementById('simResultMonths');
  const simResultInstallment = document.getElementById('simResultInstallment');
  const simResultFinanced = document.getElementById('simResultFinanced');
  const simResultDownPayment = document.getElementById('simResultDownPayment');
  const simCheckTradeIn = document.getElementById('simCheckTradeIn');
  const simCheckCnh = document.getElementById('simCheckCnh');
  const approvalMeterTag = document.getElementById('approvalMeterTag');
  const approvalMeterFill = document.getElementById('approvalMeterFill');
  const simLeadName = document.getElementById('simLeadName');
  const simLeadCity = document.getElementById('simLeadCity');
  const simLeadPhone = document.getElementById('simLeadPhone');
  const btnSubmitFinancingLead = document.getElementById('btnSubmitFinancingLead');

  // Veículos Relacionados
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

  // Buscar Veículo
  const car = store.getVehicleById(vehicleId);

  if (!car) {
    if (notFoundEl) notFoundEl.style.display = 'block';
    if (contentEl) contentEl.style.display = 'none';
    const specsSection = document.getElementById('fichaTecnica');
    const calcSection = document.getElementById('consumptionCalcSection');
    const simSection = document.getElementById('simuladorFinanciamento');
    const relatedSection = document.getElementById('veiculosRelacionados');
    if (specsSection) specsSection.style.display = 'none';
    if (calcSection) calcSection.style.display = 'none';
    if (simSection) simSection.style.display = 'none';
    if (relatedSection) relatedSection.style.display = 'none';
    return;
  }

  // Atualizar Metadados SEO
  const titleString = `${car.brand} ${car.model} (${car.yearModel || car.year}) — Sartec Veículos`;
  const descString = `Confira ${car.fullName || car.brand + ' ' + car.model}, ano ${car.yearModel || car.year}, periciado e anunciado por ${car.priceFormatted || store.formatCurrency(car.price)} na Sartec Veículos em Planaltina do Paraná.`;

  document.title = titleString;
  if (pageTitle) pageTitle.textContent = titleString;
  if (pageMetaDesc) pageMetaDesc.setAttribute('content', descString);
  if (ogTitle) ogTitle.setAttribute('content', titleString);
  if (ogDesc) ogDesc.setAttribute('content', descString);
  if (ogImage && car.images && car.images[0]) ogImage.setAttribute('content', car.images[0]);

  // Breadcrumbs
  if (crumbBrand) crumbBrand.textContent = car.brand;
  if (crumbModel) crumbModel.textContent = `${car.brand} ${car.model}`;

  // Header & Status
  if (vBrandTag) vBrandTag.textContent = car.brand;
  if (vTitle) vTitle.textContent = `${car.brand} ${car.model}`;
  if (vVersion) vVersion.textContent = car.version || car.fullName || car.model;
  if (vCategoryBadge) vCategoryBadge.textContent = car.category;
  if (vPrice) vPrice.textContent = car.priceFormatted || store.formatCurrency(car.price);

  if (vStatusBadge) {
    vStatusBadge.className = `card-status-badge ${car.status === 'vendido' ? 'status-vendido' : (car.status === 'reservado' ? 'status-reservado' : 'status-disponivel')}`;
    vStatusBadge.textContent = car.status === 'vendido' ? 'Vendido' : (car.status === 'reservado' ? 'Reservado' : 'Disponível no Pátio');
  }

  if (vSpecialBadge) {
    vSpecialBadge.textContent = car.specialBadge || (car.fipePrice && car.fipePrice > car.price ? `R$ ${(car.fipePrice - car.price).toLocaleString('pt-BR')} Abaixo da FIPE` : 'Perícia 100% Aprovada');
  }

  // Galeria
  const images = (car.images && car.images.length > 0) ? car.images : ['img/hero-bg.jpg'];
  if (vMainImage) {
    vMainImage.src = images[0];
    vMainImage.alt = `${car.brand} ${car.model}`;
    vMainImage.onerror = () => { vMainImage.src = 'img/hero-bg.jpg'; };
  }

  if (vThumbnailsRow) {
    if (images.length > 1) {
      vThumbnailsRow.innerHTML = images.map((img, idx) => `
        <button type="button" class="gallery-thumb ${idx === 0 ? 'active' : ''}" data-idx="${idx}" aria-label="Ver foto ${idx + 1}">
          <img src="${img}" alt="Miniatura ${idx + 1}" onerror="this.src='img/hero-bg.jpg';">
        </button>
      `).join('');

      vThumbnailsRow.querySelectorAll('.gallery-thumb').forEach(btn => {
        btn.addEventListener('click', () => {
          vThumbnailsRow.querySelectorAll('.gallery-thumb').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const idx = parseInt(btn.dataset.idx, 10);
          if (vMainImage && images[idx]) {
            vMainImage.src = images[idx];
          }
        });
      });
    } else {
      vThumbnailsRow.style.display = 'none';
    }
  }

  // Quick Specs
  if (vQuickYear) vQuickYear.textContent = car.yearModel || car.year;
  if (vQuickKm) vQuickKm.textContent = car.kmFormatted || store.formatKm(car.km);
  if (vQuickTransmission) vQuickTransmission.textContent = car.transmission;
  if (vQuickFuel) vQuickFuel.textContent = car.fuel;

  // Termômetro FIPE
  const fipeVal = car.fipePrice || Math.round(car.price * 1.035);
  const diffFipe = fipeVal - car.price;
  if (vFipeSartecLabel) vFipeSartecLabel.textContent = `Preço Sartec: ${car.priceFormatted || store.formatCurrency(car.price)}`;
  if (vFipeOfficialLabel) vFipeOfficialLabel.textContent = `Média FIPE: ${store.formatCurrency(fipeVal)}`;
  if (diffFipe > 0) {
    if (vFipeEconomyTag) vFipeEconomyTag.textContent = `R$ ${diffFipe.toLocaleString('pt-BR')} Abaixo da FIPE`;
    if (vFipeBarFill) vFipeBarFill.style.width = '78%';
  } else {
    if (vFipeEconomyTag) vFipeEconomyTag.textContent = `Valor Justo de Mercado`;
    if (vFipeBarFill) vFipeBarFill.style.width = '95%';
  }

  // Botões de Negociação
  const baseWaMsg = `Olá! Tenho muito interesse no ${car.brand} ${car.model} (${car.yearModel || car.year}) anunciado por ${car.priceFormatted || store.formatCurrency(car.price)} na Sartec Veículos.`;
  if (vWhatsappCtaBtn) {
    vWhatsappCtaBtn.href = `https://wa.me/5544991484162?text=${encodeURIComponent(baseWaMsg)}`;
  }

  if (btnRequestLiveVideo) {
    btnRequestLiveVideo.addEventListener('click', () => {
      const msg = `Olá Sartec! Poderiam gravar e me enviar um vídeo ao vivo do ${car.brand} ${car.model} (${car.yearModel || car.year}) mostrando detalhes do exterior e interior no pátio?`;
      window.open(`https://wa.me/5544991484162?text=${encodeURIComponent(msg)}`, '_blank');
    });
  }

  // Modal de Reserva por 24h
  if (btnOpenReserveModal && reserveModal) {
    btnOpenReserveModal.addEventListener('click', () => {
      reserveModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }
  if (btnReserveClose && reserveModal) {
    btnReserveClose.addEventListener('click', () => {
      reserveModal.classList.remove('open');
      document.body.style.overflow = '';
    });
  }
  if (reserveForm) {
    reserveForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('reserveName').value;
      const city = document.getElementById('reserveCity').value;
      const phone = document.getElementById('reservePhone').value;

      store.addLead({
        name,
        city,
        phone,
        phoneRaw: phone.replace(/\D/g, ''),
        vehicleId: car.id,
        vehicleName: `${car.brand} ${car.model} (${car.year})`,
        vehiclePrice: car.price,
        type: "reserva_prioridade",
        status: "novas_simulacoes",
        notes: `Cliente solicitou reserva de prioridade por 24h para o veículo ${car.brand} ${car.model}.`
      });

      const msg = `Olá! Gostaria de confirmar o bloqueio de prioridade por 24h para o veículo:\n\n*Veículo:* ${car.brand} ${car.model} (${car.year})\n*Preço:* ${car.priceFormatted || store.formatCurrency(car.price)}\n*Nome:* ${name}\n*Cidade:* ${city}\n*WhatsApp:* ${phone}`;
      window.open(`https://wa.me/5544991484162?text=${encodeURIComponent(msg)}`, '_blank');
      alert("Solicitação de reserva registrada com sucesso no sistema da loja!");
      reserveModal.classList.remove('open');
      document.body.style.overflow = '';
      reserveForm.reset();
    });
  }

  // Ficha Técnica Completa
  if (vSpecsGrid) {
    const specs = [
      { label: "Marca", val: car.brand },
      { label: "Modelo", val: car.model },
      { label: "Versão", val: car.version || car.fullName || car.model },
      { label: "Ano Fabricação/Modelo", val: car.yearModel || car.year },
      { label: "Quilometragem", val: car.kmFormatted || store.formatKm(car.km) },
      { label: "Câmbio", val: car.transmission },
      { label: "Combustível", val: car.fuel },
      { label: "Carroceria", val: car.category },
      { label: "Cor Oficial", val: car.color || "Prata" },
      { label: "Final da Placa", val: car.plateEnd ? `Final ${car.plateEnd}` : "Consultar" },
      { label: "Número de Portas", val: `${car.doors || 4} Portas` },
      { label: "Garantia", val: "Motor e Câmbio com Laudo Cautelar" }
    ];

    vSpecsGrid.innerHTML = specs.map(s => `
      <div class="spec-cell">
        <span class="label">${s.label}</span>
        <span class="val">${s.val}</span>
      </div>
    `).join('');
  }

  // Opcionais
  if (vFeaturesContainer) {
    const features = car.features || [
      "Ar-condicionado",
      "Direção Hidráulica/Elétrica",
      "Vidros Elétricos",
      "Travas Elétricas",
      "Freios ABS",
      "Airbags",
      "Laudo Cautelar Aprovado"
    ];

    vFeaturesContainer.innerHTML = features.map(f => `
      <span class="feature-chip">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
        ${f}
      </span>
    `).join('');
  }

  // Consumo & Custos
  if (vConsumpCity && vConsumpHighway && vConsumpMonthlyCost) {
    const consumpRaw = car.consumption || "11,2 km/l cidade | 14,0 km/l estrada";
    const parts = consumpRaw.split('|');
    const cityText = parts[0] ? parts[0].trim() : "11,2 km/l cidade";
    const hwyText = parts[1] ? parts[1].trim() : "14,0 km/l estrada";

    vConsumpCity.textContent = cityText;
    vConsumpHighway.textContent = hwyText;

    // Extrai número médio para cálculo
    const match = cityText.match(/(\d+[\.,]\d+|\d+)/);
    const kmL = match ? parseFloat(match[1].replace(',', '.')) : 11.0;
    const litersFor1000km = 1000 / kmL;
    const costMonth = litersFor1000km * 5.95; // R$ 5,95 litro gasolina/etanol médio
    vConsumpMonthlyCost.textContent = store.formatCurrency(costMonth);
  }

  // ==========================================================================
  // SIMULADOR GAMIFICADO COM TERMÔMETRO DE APROVAÇÃO
  // ==========================================================================
  let currentDownPayment = Math.round(car.price * 0.3);
  let currentMonths = 48;

  if (simVehiclePrice) simVehiclePrice.textContent = car.priceFormatted || store.formatCurrency(car.price);
  if (simDownPaymentRange) {
    simDownPaymentRange.max = car.price;
    simDownPaymentRange.value = currentDownPayment;
  }
  if (simDownPaymentInput) {
    simDownPaymentInput.value = currentDownPayment.toLocaleString('pt-BR');
  }

  function updateSimulation() {
    const price = car.price;
    const down = Math.min(price, Math.max(0, currentDownPayment));
    const financed = Math.max(0, price - down);
    const pct = Math.round((down / price) * 100);

    if (simDownPaymentPct) simDownPaymentPct.textContent = `${pct}%`;
    if (simResultMonths) simResultMonths.textContent = `${currentMonths}x de`;
    if (simResultFinanced) simResultFinanced.textContent = store.formatCurrency(financed);
    if (simResultDownPayment) simResultDownPayment.textContent = store.formatCurrency(down);

    // Parcela mensal via Tabela Price (1.35% a.m.)
    const installment = store.calculateInstallment(price, down, currentMonths, 1.35);
    if (simResultInstallment) simResultInstallment.textContent = store.formatCurrency(installment);

    // Termômetro Dinâmico de Aprovação
    let score = 55;
    score += Math.min(25, Math.round(pct * 0.5)); // + até 25% pela entrada
    if (simCheckTradeIn && simCheckTradeIn.checked) score += 25; // +25% pela troca
    if (simCheckCnh && simCheckCnh.checked) score += 15; // +15% CNH
    score = Math.min(98, score);

    if (approvalMeterFill) {
      approvalMeterFill.style.width = `${score}%`;
      if (score >= 90) {
        approvalMeterFill.style.background = 'linear-gradient(90deg, #F59E0B 0%, #25D366 100%)';
      } else if (score >= 75) {
        approvalMeterFill.style.background = 'linear-gradient(90deg, #F59E0B 0%, var(--color-accent) 100%)';
      } else {
        approvalMeterFill.style.background = '#F59E0B';
      }
    }

    if (approvalMeterTag) {
      if (score >= 90) {
        approvalMeterTag.textContent = `Altíssima — ${score}% Pré-Aprovável pelos bancos parceiros!`;
        approvalMeterTag.style.color = '#25D366';
      } else if (score >= 75) {
        approvalMeterTag.textContent = `Alta — ${score}% de Chance de Aprovação`;
        approvalMeterTag.style.color = 'var(--color-accent)';
      } else {
        approvalMeterTag.textContent = `Média — ${score}% de Aprovação (Aumente a entrada ou inclua troca)`;
        approvalMeterTag.style.color = '#F59E0B';
      }
    }
  }

  if (simDownPaymentRange) {
    simDownPaymentRange.addEventListener('input', (e) => {
      currentDownPayment = parseInt(e.target.value, 10);
      if (simDownPaymentInput) simDownPaymentInput.value = currentDownPayment.toLocaleString('pt-BR');
      updateSimulation();
    });
  }

  if (simDownPaymentInput) {
    simDownPaymentInput.addEventListener('input', (e) => {
      const clean = e.target.value.replace(/\D/g, '');
      currentDownPayment = clean ? parseInt(clean, 10) : 0;
      if (simDownPaymentRange) simDownPaymentRange.value = currentDownPayment;
      updateSimulation();
    });
  }

  if (simPresetChips) {
    simPresetChips.querySelectorAll('.preset-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        simPresetChips.querySelectorAll('.preset-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const pct = parseInt(chip.dataset.pct, 10);
        currentDownPayment = Math.round(car.price * (pct / 100));
        if (simDownPaymentRange) simDownPaymentRange.value = currentDownPayment;
        if (simDownPaymentInput) simDownPaymentInput.value = currentDownPayment.toLocaleString('pt-BR');
        updateSimulation();
      });
    });
  }

  if (simTermSelector) {
    simTermSelector.querySelectorAll('.term-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        simTermSelector.querySelectorAll('.term-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentMonths = parseInt(btn.dataset.months, 10);
        updateSimulation();
      });
    });
  }

  if (simCheckTradeIn) simCheckTradeIn.addEventListener('change', updateSimulation);
  if (simCheckCnh) simCheckCnh.addEventListener('change', updateSimulation);

  // Envio da Proposta de Financiamento
  if (btnSubmitFinancingLead) {
    btnSubmitFinancingLead.addEventListener('click', () => {
      const name = simLeadName ? simLeadName.value.trim() : '';
      const city = simLeadCity ? simLeadCity.value.trim() : '';
      const phone = simLeadPhone ? simLeadPhone.value.trim() : '';

      if (!name || !phone) {
        alert("Por favor, preencha seu Nome e WhatsApp para gerar sua ficha de aprovação.");
        if (simLeadName) simLeadName.focus();
        return;
      }

      const installment = store.calculateInstallment(car.price, currentDownPayment, currentMonths, 1.35);
      const hasTrade = simCheckTradeIn ? simCheckTradeIn.checked : false;
      const hasCnh = simCheckCnh ? simCheckCnh.checked : false;

      // Salva Lead completo no localStorage
      store.addLead({
        name,
        city: city || "Região Noroeste do PR",
        phone,
        phoneRaw: phone.replace(/\D/g, ''),
        vehicleId: car.id,
        vehicleName: `${car.brand} ${car.model} (${car.year})`,
        vehiclePrice: car.price,
        downPayment: currentDownPayment,
        installmentsCount: currentMonths,
        installmentValue: installment,
        hasTradeIn: hasTrade,
        hasCnh: hasCnh,
        type: hasTrade ? "proposta_troca" : "simulador_financiamento",
        status: "novas_simulacoes",
        notes: `Simulação de ${currentMonths}x de ${store.formatCurrency(installment)} com entrada de ${store.formatCurrency(currentDownPayment)}.`
      });

      // Abre WhatsApp com Ficha Estruturada
      const msg = `*FICHA DE PROPOSTA DE FINANCIAMENTO — SARTEC VEÍCULOS*\n\n` +
        `*Veículo de Interesse:* ${car.brand} ${car.model} (${car.yearModel || car.year})\n` +
        `*Valor do Carro:* ${car.priceFormatted || store.formatCurrency(car.price)}\n` +
        `*Entrada Proposta:* ${store.formatCurrency(currentDownPayment)}\n` +
        `*Plano Desejado:* ${currentMonths}x de ${store.formatCurrency(installment)}\n` +
        `*Veículo na Troca:* ${hasTrade ? 'SIM (Desejo avaliar)' : 'Não'}\n` +
        `*Possui CNH:* ${hasCnh ? 'Sim' : 'Não'}\n\n` +
        `*Dados do Solicitante:*\n` +
        `*Nome:* ${name}\n` +
        `*Cidade:* ${city || 'Planaltina do PR e região'}\n` +
        `*WhatsApp:* ${phone}\n\n` +
        `_Solicito análise e pré-aprovação bancária junto à equipe comercial da Sartec._`;

      window.open(`https://wa.me/5544991484162?text=${encodeURIComponent(msg)}`, '_blank');
    });
  }

  updateSimulation();

  // ==========================================================================
  // VEÍCULOS RELACIONADOS
  // ==========================================================================
  if (vRelatedGrid) {
    const all = store.getVehicles();
    let related = all.filter(v => v.id !== car.id && (v.category === car.category || v.brand === car.brand));
    if (related.length < 3) {
      all.forEach(v => {
        if (v.id !== car.id && !related.find(r => r.id === v.id) && related.length < 3) {
          related.push(v);
        }
      });
    }

    vRelatedGrid.innerHTML = related.slice(0, 3).map(rel => `
      <article class="vehicle-card" data-id="${rel.id}">
        <div class="card-media-wrapper">
          <span class="card-status-badge status-disponivel">Disponível</span>
          <span class="card-special-badge">${rel.specialBadge || 'Periciado 100%'}</span>
          <img class="card-vehicle-img" src="${(rel.images && rel.images[0]) || 'img/hero-bg.jpg'}" alt="${rel.model}" onerror="this.src='img/hero-bg.jpg';">
        </div>
        <div class="card-body-content">
          <div class="card-header-meta">
            <span class="card-brand-tag">${rel.brand}</span>
            <span class="card-category-tag">${rel.category}</span>
          </div>
          <h3 class="card-car-title"><a href="veiculo.html?id=${rel.id}" style="color:inherit; text-decoration:none;">${rel.brand} ${rel.model}</a></h3>
          <p class="card-car-version">${rel.version || rel.fullName || ''}</p>
          <div class="card-pricing-block" style="margin-top:12px;">
            <div class="card-main-price">${rel.priceFormatted || store.formatCurrency(rel.price)}</div>
          </div>
          <div class="card-actions-grid" style="margin-top:10px;">
            <a href="veiculo.html?id=${rel.id}" class="btn-card-details">Ver Detalhes</a>
            <a href="https://wa.me/5544991484162?text=${encodeURIComponent('Olá! Tenho interesse no ' + rel.brand + ' ' + rel.model + ' da Sartec.')}" target="_blank" class="btn-card-whatsapp">WhatsApp</a>
          </div>
        </div>
      </article>
    `).join('');
  }

  // Remove Loader
  const loader = document.getElementById('pageLoader');
  if (loader) {
    setTimeout(() => loader.classList.add('loaded'), 250);
  }
})();
