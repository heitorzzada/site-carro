/**
 * SARTEC VEÍCULOS — SISTEMA ADMINISTRATIVO SAAS DO LOJISTA (admin.js)
 * Dashboard Financeiro & DRE, Gestão de Estoque em 1 Clique, CRM Kanban de Vendas,
 * Estúdio de Marketing (Stories 9:16, Copywriting, Etiquetas A4 com QR Code) e Reset Demo.
 */

(function () {
  'use strict';

  const store = window.SARTEC_STORE;
  if (!store) {
    console.error("[SartecAdmin] SARTEC_STORE não encontrado.");
    return;
  }

  // Estado Local do Admin
  const adminState = {
    currentTab: 'tabDashboard',
    selectedCarId: null,
    storyTheme: 'oferta', // oferta | novo | vendido
    stockSearchQuery: ''
  };

  // Cache de Elementos do DOM
  const dom = {
    tabs: document.querySelectorAll('.admin-tab-btn'),
    tabContents: document.querySelectorAll('.admin-tab-content'),

    // KPIs Dashboard
    kpiRevenue: document.getElementById('kpiRevenue'),
    kpiCountVehicles: document.getElementById('kpiCountVehicles'),
    kpiInvested: document.getElementById('kpiInvested'),
    kpiProfit: document.getElementById('kpiProfit'),
    kpiMarginMeta: document.getElementById('kpiMarginMeta'),
    kpiLeadsCount: document.getElementById('kpiLeadsCount'),
    alertCapitalParadoBox: document.getElementById('alertCapitalParadoBox'),
    alertParadoTitle: document.getElementById('alertParadoTitle'),
    alertParadoDesc: document.getElementById('alertParadoDesc'),
    btnAlertaCriarArte: document.getElementById('btnAlertaCriarArte'),
    dreTableBody: document.getElementById('dreTableBody'),

    // Gestão de Estoque
    stockTableBody: document.getElementById('stockTableBody'),
    adminStockSearch: document.getElementById('adminStockSearch'),
    btnAdminAddCar: document.getElementById('btnAdminAddCar'),
    btnAdminAddCar2: document.getElementById('btnAdminAddCar2'),

    // Modal Cadastrar Veículo
    modalAddVehicle: document.getElementById('modalAddVehicle'),
    btnCloseAddVehicle: document.getElementById('btnCloseAddVehicle'),
    btnCancelAddVehicle: document.getElementById('btnCancelAddVehicle'),
    formAddVehicle: document.getElementById('formAddVehicle'),
    btnAutoFillFipe: document.getElementById('btnAutoFillFipe'),
    btnGenerateAiCopy: document.getElementById('btnGenerateAiCopy'),

    // CRM Kanban
    colNovasSimulacoes: document.getElementById('colNovasSimulacoes'),
    colPropostasTroca: document.getElementById('colPropostasTroca'),
    colAnaliseBancaria: document.getElementById('colAnaliseBancaria'),
    colVisitaAgendada: document.getElementById('colVisitaAgendada'),
    colVendidoConcluido: document.getElementById('colVendidoConcluido'),
    countColNovas: document.getElementById('countColNovas'),
    countColTroca: document.getElementById('countColTroca'),
    countColAnalise: document.getElementById('countColAnalise'),
    countColVisita: document.getElementById('countColVisita'),
    countColVendido: document.getElementById('countColVendido'),

    // Modal Ficha Bancária
    modalBankProposal: document.getElementById('modalBankProposal'),
    btnCloseBankProposal: document.getElementById('btnCloseBankProposal'),
    bankProposalText: document.getElementById('bankProposalText'),
    btnCopyBankProposal: document.getElementById('btnCopyBankProposal'),
    btnSendBankProposalWa: document.getElementById('btnSendBankProposalWa'),

    // Estúdio de Marketing
    marketingVehicleSelect: document.getElementById('marketingVehicleSelect'),
    storyMockup: document.getElementById('storyMockup'),
    storyThemeBadge: document.getElementById('storyThemeBadge'),
    storyBrand: document.getElementById('storyBrand'),
    storyTitle: document.getElementById('storyTitle'),
    storyYear: document.getElementById('storyYear'),
    storyKm: document.getElementById('storyKm'),
    storyTrans: document.getElementById('storyTrans'),
    storyPrice: document.getElementById('storyPrice'),
    storyInstallment: document.getElementById('storyInstallment'),
    btnDownloadStory: document.getElementById('btnDownloadStory'),
    copyTextArea: document.getElementById('copyTextArea'),
    btnCopyText: document.getElementById('btnCopyText'),
    btnPrintSticker: document.getElementById('btnPrintSticker'),
    qrCodeImg: document.getElementById('qrCodeImg'),
    stickerPreviewTitle: document.getElementById('stickerPreviewTitle'),
    stickerPreviewSubtitle: document.getElementById('stickerPreviewSubtitle'),
    printSheetContainer: document.getElementById('printSheetContainer'),
    printSheetContent: document.getElementById('printSheetContent'),

    // Configurações
    storeSettingsForm: document.getElementById('storeSettingsForm'),
    cfgDealershipName: document.getElementById('cfgDealershipName'),
    cfgPhone: document.getElementById('cfgPhone'),
    cfgEmail: document.getElementById('cfgEmail'),
    cfgAddress: document.getElementById('cfgAddress'),
    cfgInterestRate: document.getElementById('cfgInterestRate'),
    btnResetDemoData: document.getElementById('btnResetDemoData')
  };

  // ==========================================================================
  // NAVEGAÇÃO POR ABAS DO PAINEL ADMIN
  // ==========================================================================
  function switchTab(tabId) {
    adminState.currentTab = tabId;
    dom.tabs.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabId);
    });
    dom.tabContents.forEach(content => {
      content.style.display = content.id === tabId ? 'block' : 'none';
    });

    if (tabId === 'tabDashboard') renderDashboard();
    if (tabId === 'tabStock') renderStockTable();
    if (tabId === 'tabKanban') renderKanban();
    if (tabId === 'tabMarketing') renderMarketingStudio();
    if (tabId === 'tabSettings') loadSettings();
  }

  // ==========================================================================
  // 1. DASHBOARD FINANCEIRO E DRE GERAL
  // ==========================================================================
  function renderDashboard() {
    const vehicles = store.getVehicles();
    const leads = store.getLeads();

    // Veículos em pátio (disponíveis ou reservados)
    const available = vehicles.filter(v => v.status !== 'vendido');
    const totalRevenue = available.reduce((acc, v) => acc + (v.price || 0), 0);
    const totalInvested = available.reduce((acc, v) => acc + (v.acquisitionCost || 0) + (v.prepCost || 0), 0);
    const totalProfit = totalRevenue - totalInvested;
    const avgMargin = totalRevenue > 0 ? ((totalProfit / totalRevenue) * 100).toFixed(1) : 0;

    if (dom.kpiRevenue) dom.kpiRevenue.textContent = store.formatCurrency(totalRevenue);
    if (dom.kpiCountVehicles) dom.kpiCountVehicles.textContent = `${available.length} veículos em pátio ativo`;
    if (dom.kpiInvested) dom.kpiInvested.textContent = store.formatCurrency(totalInvested);
    if (dom.kpiProfit) dom.kpiProfit.textContent = store.formatCurrency(totalProfit);
    if (dom.kpiMarginMeta) dom.kpiMarginMeta.textContent = `Margem Média Projetada: ${avgMargin}%`;
    if (dom.kpiLeadsCount) dom.kpiLeadsCount.textContent = leads.length;

    // Alerta de Capital Parado (>40 dias)
    const stalledCar = vehicles.find(v => (v.daysInStock || 0) >= 40 && v.status !== 'vendido');
    if (stalledCar && dom.alertCapitalParadoBox) {
      dom.alertCapitalParadoBox.style.display = 'flex';
      const costBlocked = (stalledCar.acquisitionCost || 0) + (stalledCar.prepCost || 0);
      if (dom.alertParadoTitle) dom.alertParadoTitle.textContent = `⚠️ Alerta de Capital Parado: ${stalledCar.fullName || stalledCar.brand + ' ' + stalledCar.model}`;
      if (dom.alertParadoDesc) dom.alertParadoDesc.textContent = `Este veículo está há ${stalledCar.daysInStock} dias no pátio com ${store.formatCurrency(costBlocked)} imobilizados. Recomendação: criar oferta promocional no Estúdio de Marketing.`;
      
      if (dom.btnAlertaCriarArte) {
        dom.btnAlertaCriarArte.onclick = () => {
          adminState.selectedCarId = stalledCar.id;
          switchTab('tabMarketing');
        };
      }
    } else if (dom.alertCapitalParadoBox) {
      dom.alertCapitalParadoBox.style.display = 'none';
    }

    // Tabela DRE
    if (dom.dreTableBody) {
      dom.dreTableBody.innerHTML = vehicles.map(car => {
        const totalCost = (car.acquisitionCost || 0) + (car.prepCost || 0);
        const profit = car.price - totalCost;
        const margin = car.price > 0 ? ((profit / car.price) * 100).toFixed(1) : 0;
        const profitColor = profit >= 0 ? '#25D366' : '#EF4444';
        const daysStalled = car.daysInStock || 1;
        const stalledWarning = daysStalled >= 40 ? `<span style="color:#EF4444; font-weight:800;" title="Veículo parado há mais de 40 dias">⚠️ ${daysStalled} dias</span>` : `${daysStalled} dias`;

        return `
          <tr>
            <td>
              <strong>${car.brand} ${car.model}</strong>
              <div style="font-size:0.75rem; color:#8E8E93;">${car.version || ''}</div>
            </td>
            <td>${car.yearModel || car.year}</td>
            <td style="font-weight:800; color:var(--color-accent);">${store.formatCurrency(car.price)}</td>
            <td style="color:#A1A1AA;">${store.formatCurrency(car.fipePrice || car.price * 1.03)}</td>
            <td>
              <div>${store.formatCurrency(totalCost)}</div>
              <div style="font-size:0.7rem; color:#71717A;">Aq: ${store.formatCurrency(car.acquisitionCost || 0)} | Prep: ${store.formatCurrency(car.prepCost || 0)}</div>
            </td>
            <td style="font-weight:800; color:${profitColor};">${store.formatCurrency(profit)}</td>
            <td style="font-weight:700;">${margin}%</td>
            <td>${stalledWarning}</td>
            <td>
              <select class="table-status-select" data-id="${car.id}">
                <option value="disponivel" ${car.status === 'disponivel' ? 'selected' : ''}>🟢 Disponível</option>
                <option value="reservado" ${car.status === 'reservado' ? 'selected' : ''}>🟡 Reservado</option>
                <option value="vendido" ${car.status === 'vendido' ? 'selected' : ''}>🔴 Vendido</option>
              </select>
            </td>
            <td>
              <button type="button" class="btn-secondary" style="padding:4px 8px; font-size:0.72rem;" onclick="window.sartecAdmin.openMarketingFor('${car.id}')">
                Criar Arte
              </button>
            </td>
          </tr>
        `;
      }).join('');

      // Status Switchers da Tabela DRE
      dom.dreTableBody.querySelectorAll('.table-status-select').forEach(sel => {
        sel.addEventListener('change', (e) => {
          const carId = sel.dataset.id;
          const newStatus = e.target.value;
          store.updateVehicle(carId, { status: newStatus });
          renderDashboard();
        });
      });
    }
  }

  // ==========================================================================
  // 2. GESTÃO DE ESTOQUE
  // ==========================================================================
  function renderStockTable() {
    if (!dom.stockTableBody) return;
    let list = store.getVehicles();

    if (adminState.stockSearchQuery) {
      const q = adminState.stockSearchQuery.toLowerCase();
      list = list.filter(c => `${c.brand} ${c.model} ${c.version || ''}`.toLowerCase().includes(q));
    }

    dom.stockTableBody.innerHTML = list.map(car => `
      <tr>
        <td>
          <div class="table-car-cell">
            <img src="${(car.images && car.images[0]) || 'img/hero-bg.jpg'}" alt="${car.model}" class="table-car-thumb">
            <div>
              <strong>${car.brand} ${car.model}</strong>
              <div style="font-size:0.75rem; color:#8E8E93;">${car.category} • ${car.color || 'Prata'}</div>
            </div>
          </div>
        </td>
        <td style="font-size:0.8rem; color:#D1D1D6;">${car.version || car.fullName || ''}</td>
        <td>${car.yearModel || car.year}</td>
        <td>${car.kmFormatted || store.formatKm(car.km)}</td>
        <td>
          <strong style="color:var(--color-accent); font-size:0.95rem;">${store.formatCurrency(car.price)}</strong>
          <button type="button" class="btn-card-icon" style="width:24px; height:24px; font-size:0.7rem; display:inline-flex; vertical-align:middle; margin-left:6px;" title="Editar Preço" onclick="window.sartecAdmin.quickEditPrice('${car.id}')">
            ✏️
          </button>
        </td>
        <td>
          <select class="table-status-select" data-id="${car.id}">
            <option value="disponivel" ${car.status === 'disponivel' ? 'selected' : ''}>🟢 Disponível</option>
            <option value="reservado" ${car.status === 'reservado' ? 'selected' : ''}>🟡 Reservado</option>
            <option value="vendido" ${car.status === 'vendido' ? 'selected' : ''}>🔴 Vendido</option>
          </select>
        </td>
        <td>
          <span style="font-size:0.75rem; color:#25D366; font-weight:700;">${car.demandScore || '🔥 Alta procura'}</span>
        </td>
        <td style="text-align:right;">
          <div style="display:inline-flex; gap:6px;">
            <a href="veiculo.html?id=${car.id}" target="_blank" class="btn-secondary" style="padding:4px 8px; font-size:0.75rem; color:#FFF;" title="Ver anúncio público">
              Ver Anúncio
            </a>
            <button type="button" class="btn-primary" style="padding:4px 8px; font-size:0.75rem;" onclick="window.sartecAdmin.openMarketingFor('${car.id}')" title="Gerar arte e etiqueta">
              Estúdio
            </button>
            <button type="button" class="btn-card-icon" style="width:28px; height:28px; color:#EF4444;" title="Excluir do Estoque" onclick="window.sartecAdmin.deleteCar('${car.id}')">
              🗑️
            </button>
          </div>
        </td>
      </tr>
    `).join('');

    // Listeners nos Status Selectors
    dom.stockTableBody.querySelectorAll('.table-status-select').forEach(sel => {
      sel.addEventListener('change', (e) => {
        const carId = sel.dataset.id;
        const newStatus = e.target.value;
        store.updateVehicle(carId, { status: newStatus });
      });
    });
  }

  // ==========================================================================
  // 3. CRM KANBAN DE VENDAS & LEADS
  // ==========================================================================
  function renderKanban() {
    const leads = store.getLeads();

    // Colunas
    const cols = {
      novas_simulacoes: dom.colNovasSimulacoes,
      proposta_troca: dom.colPropostasTroca,
      analise_bancaria: dom.colAnaliseBancaria,
      visita_agendada: dom.colVisitaAgendada,
      vendido: dom.colVendidoConcluido
    };

    // Limpar colunas
    Object.values(cols).forEach(col => { if (col) col.innerHTML = ''; });

    const counts = {
      novas_simulacoes: 0,
      proposta_troca: 0,
      analise_bancaria: 0,
      visita_agendada: 0,
      vendido: 0
    };

    leads.forEach(lead => {
      const colStatus = lead.status || 'novas_simulacoes';
      if (counts[colStatus] !== undefined) counts[colStatus]++;
      const targetCol = cols[colStatus] || cols.novas_simulacoes;
      if (!targetCol) return;

      const card = document.createElement('div');
      card.className = 'kanban-lead-card';
      
      const tradeHtml = lead.hasTradeIn && lead.tradeInDetails
        ? `<div style="color:#F59E0B; font-weight:700; margin-top:4px;">🚗 Troca: ${lead.tradeInDetails}</div>`
        : '';

      const installmentHtml = lead.installmentsCount && lead.installmentValue
        ? `<div>Plano: <strong>${lead.installmentsCount}x de ${store.formatCurrency(lead.installmentValue)}</strong> (Entrada: ${store.formatCurrency(lead.downPayment || 0)})</div>`
        : '';

      const cleanPhone = lead.phone ? lead.phone.replace(/\D/g, '') : '';
      const waLink = cleanPhone
        ? `https://wa.me/55${cleanPhone}?text=${encodeURIComponent('Olá ' + lead.name + '! Aqui é da equipe comercial da Sartec Veículos em Planaltina do Paraná. Recebi sua proposta para o ' + (lead.vehicleName || 'veículo') + ' e gostaria de dar continuidade ao seu atendimento.')}`
        : '#';

      card.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:flex-start;">
          <div class="lead-client-name">${lead.name}</div>
          <span style="font-size:0.7rem; color:#71717A;">${lead.city || 'Região'}</span>
        </div>
        <div class="lead-vehicle-tag">🚘 ${lead.vehicleName || 'Veículo Sartec'}</div>
        
        <div class="lead-details-box">
          ${installmentHtml}
          ${tradeHtml}
          <div style="font-size:0.7rem; color:#71717A; margin-top:4px;">WhatsApp: ${lead.phone || 'Não informado'}</div>
          ${lead.notes ? `<div style="margin-top:6px; font-style:italic; color:#D1D1D6;">"${lead.notes}"</div>` : ''}
        </div>

        <div style="margin-bottom:8px;">
          <label style="font-size:0.68rem; color:#8E8E93; display:block; margin-bottom:2px;">Mover Etapa:</label>
          <select class="table-status-select" style="width:100%; font-size:0.75rem;" data-lead-id="${lead.id}">
            <option value="novas_simulacoes" ${colStatus === 'novas_simulacoes' ? 'selected' : ''}>🔔 Novas Simulações</option>
            <option value="proposta_troca" ${colStatus === 'proposta_troca' ? 'selected' : ''}>🚗 Propostas com Troca</option>
            <option value="analise_bancaria" ${colStatus === 'analise_bancaria' ? 'selected' : ''}>🏦 Em Análise Bancária</option>
            <option value="visita_agendada" ${colStatus === 'visita_agendada' ? 'selected' : ''}>📍 Visita no Pátio</option>
            <option value="vendido" ${colStatus === 'vendido' ? 'selected' : ''}>🤝 Vendido / Fechado</option>
          </select>
        </div>

        <div class="lead-card-actions">
          <a href="${waLink}" target="_blank" class="btn-card-whatsapp" style="flex:1; padding:6px 10px; font-size:0.75rem;">
            🟢 Chamar no Whats
          </a>
          <button type="button" class="btn-secondary" style="padding:6px 10px; font-size:0.75rem; color:#FFF;" onclick="window.sartecAdmin.openBankProposal('${lead.id}')" title="Gerar ficha para correspondente bancário">
            📄 Ficha Banco
          </button>
        </div>
      `;

      targetCol.appendChild(card);
    });

    // Atualiza contadores
    if (dom.countColNovas) dom.countColNovas.textContent = counts.novas_simulacoes;
    if (dom.countColTroca) dom.countColTroca.textContent = counts.proposta_troca;
    if (dom.countColAnalise) dom.countColAnalise.textContent = counts.analise_bancaria;
    if (dom.countColVisita) dom.countColVisita.textContent = counts.visita_agendada;
    if (dom.countColVendido) dom.countColVendido.textContent = counts.vendido;

    // Listeners de movimentação de status no Kanban
    document.querySelectorAll('.kanban-cards-list select[data-lead-id]').forEach(sel => {
      sel.addEventListener('change', (e) => {
        const leadId = sel.dataset.leadId;
        const newStatus = e.target.value;
        store.updateLeadStatus(leadId, newStatus);
        renderKanban();
      });
    });
  }

  // ==========================================================================
  // 4. ESTÚDIO DE MARKETING AUTOMÁTICO
  // ==========================================================================
  function renderMarketingStudio() {
    const vehicles = store.getVehicles();
    if (vehicles.length === 0) return;

    if (!adminState.selectedCarId || !vehicles.find(v => v.id === adminState.selectedCarId)) {
      adminState.selectedCarId = vehicles[0].id;
    }

    // Preenche seletor de veículos se vazio
    if (dom.marketingVehicleSelect) {
      dom.marketingVehicleSelect.innerHTML = vehicles.map(v => `
        <option value="${v.id}" ${v.id === adminState.selectedCarId ? 'selected' : ''}>
          ${v.brand} ${v.model} (${v.yearModel || v.year}) — ${v.priceFormatted || store.formatCurrency(v.price)}
        </option>
      `).join('');

      dom.marketingVehicleSelect.onchange = (e) => {
        adminState.selectedCarId = e.target.value;
        updateMarketingPreview();
      };
    }

    updateMarketingPreview();
  }

  function updateMarketingPreview() {
    const car = store.getVehicleById(adminState.selectedCarId);
    if (!car) return;

    // Atualiza Mockup do Story (9:16)
    if (dom.storyMockup) {
      const imgSrc = (car.images && car.images[0]) || 'img/hero-bg.jpg';
      dom.storyMockup.style.backgroundImage = `url('${imgSrc}')`;
    }

    // Tema Visual do Story
    if (dom.storyThemeBadge) {
      if (adminState.storyTheme === 'oferta') {
        dom.storyThemeBadge.textContent = '🔥 OFERTA ESPECIAL';
        dom.storyThemeBadge.style.borderColor = 'var(--color-accent)';
        dom.storyThemeBadge.style.color = 'var(--color-accent)';
      } else if (adminState.storyTheme === 'novo') {
        dom.storyThemeBadge.textContent = '🚘 NOVO NO ESTOQUE';
        dom.storyThemeBadge.style.borderColor = '#3B82F6';
        dom.storyThemeBadge.style.color = '#3B82F6';
      } else if (adminState.storyTheme === 'vendido') {
        dom.storyThemeBadge.textContent = '🤝 VENDIDO COM SUCESSO!';
        dom.storyThemeBadge.style.borderColor = '#25D366';
        dom.storyThemeBadge.style.color = '#25D366';
      }
    }

    if (dom.storyBrand) dom.storyBrand.textContent = car.brand;
    if (dom.storyTitle) dom.storyTitle.textContent = `${car.brand} ${car.model}`;
    if (dom.storyYear) dom.storyYear.textContent = `Ano: ${car.yearModel || car.year}`;
    if (dom.storyKm) dom.storyKm.textContent = car.kmFormatted || store.formatKm(car.km);
    if (dom.storyTrans) dom.storyTrans.textContent = car.transmission;
    if (dom.storyPrice) dom.storyPrice.textContent = car.priceFormatted || store.formatCurrency(car.price);
    
    const downPay = Math.round(car.price * 0.3);
    const inst48 = store.calculateInstallment(car.price, downPay, 48, 1.35);
    if (dom.storyInstallment) {
      dom.storyInstallment.textContent = `ou Entrada de ${store.formatCurrency(downPay)} + 48x de ${store.formatCurrency(inst48)}`;
    }

    // Gerador de Copy Comercial para Redes Sociais
    if (dom.copyTextArea) {
      dom.copyTextArea.value = `🚗 ${car.fullName || car.brand + ' ' + car.model} (${car.yearModel || car.year})\n\n` +
        `🔥 OPORTUNIDADE EXCLUSIVA NA SARTEC VEÍCULOS!\n\n` +
        `• Quilometragem: ${car.kmFormatted || store.formatKm(car.km)}\n` +
        `• Câmbio: ${car.transmission}\n` +
        `• Combustível: ${car.fuel}\n` +
        `• Cor: ${car.color || 'Prata'}\n` +
        `• Destaque: ${car.specialBadge || '100% Periciado sem leilão/sinistro'}\n` +
        `• Consumo: ${car.consumption || 'Excelente autonomia'}\n\n` +
        `💰 Valor: ${car.priceFormatted || store.formatCurrency(car.price)} (Abaixo da Tabela FIPE!)\n` +
        `💳 Plano facilitado: Entrada + 48x de ${store.formatCurrency(inst48)}\n` +
        `🚗 Aceitamos seu carro ou moto na troca com avaliação justa!\n\n` +
        `📍 Endereço: Av. Espírito Santo, 114 – Planaltina do Paraná - PR\n` +
        `📲 Fale direto com nossa equipe: (44) 9 9148-4162\n\n` +
        `#sartecveiculos #seminovos #planaltinadopr #paranavai #loanda #carrospr #seminovospericiados`;
    }

    // Mini Preview da Etiqueta e QR Code
    if (dom.stickerPreviewTitle) dom.stickerPreviewTitle.textContent = `${car.brand} ${car.model} (${car.yearModel || car.year})`;
    if (dom.stickerPreviewSubtitle) dom.stickerPreviewSubtitle.textContent = `${car.kmFormatted || store.formatKm(car.km)} • ${car.transmission} • ${car.priceFormatted || store.formatCurrency(car.price)}`;
    
    // QR Code Dinâmico apontando para a página do veículo
    const currentOrigin = window.location.origin || '';
    const currentPath = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/'));
    const carSimUrl = `${currentOrigin}${currentPath}/veiculo.html?id=${encodeURIComponent(car.id)}`;
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(carSimUrl)}`;
    
    if (dom.qrCodeImg) {
      dom.qrCodeImg.src = qrUrl;
    }
  }

  // Impressão da Etiqueta A4 com QR Code
  function printVehicleSticker(carId) {
    const car = store.getVehicleById(carId || adminState.selectedCarId);
    if (!car || !dom.printSheetContent || !dom.printSheetContainer) return;

    const currentOrigin = window.location.origin || '';
    const currentPath = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/'));
    const carSimUrl = `${currentOrigin}${currentPath}/veiculo.html?id=${encodeURIComponent(car.id)}`;
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(carSimUrl)}`;
    const downPay = Math.round(car.price * 0.3);
    const inst48 = store.calculateInstallment(car.price, downPay, 48, 1.35);

    dom.printSheetContent.innerHTML = `
      <div style="border: 4px solid #000; padding: 30px; font-family: 'Plus Jakarta Sans', sans-serif;">
        <!-- Cabeçalho da Etiqueta -->
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:3px solid #000; padding-bottom:16px; margin-bottom:20px;">
          <div>
            <h1 style="font-family:'Outfit', sans-serif; font-size:2.4rem; margin:0; text-transform:uppercase; letter-spacing:1px; line-height:1;">SARTEC VEÍCULOS</h1>
            <p style="margin:4px 0 0; font-size:0.95rem; font-weight:700;">PLANALTINA DO PARANÁ - PR • TELEFONE / WHATSAPP: (44) 9 9148-4162</p>
          </div>
          <div style="text-align:right;">
            <span style="background:#000; color:#FFF; font-weight:900; padding:8px 16px; border-radius:4px; font-size:1.1rem; display:inline-block;">
              100% PERICIADO
            </span>
          </div>
        </div>

        <!-- Título do Veículo -->
        <div style="margin-bottom:20px;">
          <span style="font-size:1.2rem; font-weight:800; color:#555; text-transform:uppercase;">${car.brand}</span>
          <h2 style="font-family:'Outfit', sans-serif; font-size:2.8rem; margin:2px 0 6px; text-transform:uppercase; line-height:1.1;">
            ${car.model}
          </h2>
          <p style="font-size:1.25rem; color:#333; margin:0; font-weight:600;">${car.version || car.fullName || ''}</p>
        </div>

        <!-- Bloco Principal de Preço e Financiamento -->
        <div style="background:#F4F4F5; border:2px solid #000; padding:20px; border-radius:8px; margin-bottom:24px; display:flex; justify-content:space-between; align-items:center;">
          <div>
            <span style="font-size:1rem; font-weight:700; text-transform:uppercase; color:#555;">PREÇO À VISTA / NEGOCIADO</span>
            <div style="font-family:'Outfit', sans-serif; font-size:3.2rem; font-weight:900; line-height:1; margin-top:4px;">
              ${car.priceFormatted || store.formatCurrency(car.price)}
            </div>
            <div style="font-size:1rem; font-weight:700; margin-top:6px; color:#166534;">
              ${car.specialBadge || 'Consulte condições de troca com avaliação justa'}
            </div>
          </div>
          <div style="text-align:right; border-left:2px solid #D4D4D8; padding-left:24px;">
            <span style="font-size:0.9rem; font-weight:700; color:#555;">SIMULAÇÃO SUGERIDA</span>
            <div style="font-size:1.35rem; font-weight:900; margin-top:4px;">
              Entrada: ${store.formatCurrency(downPay)}
            </div>
            <div style="font-size:1.45rem; font-weight:900; color:#000;">
              + 48x de ${store.formatCurrency(inst48)}
            </div>
          </div>
        </div>

        <!-- Grid de Especificações e QR Code -->
        <div style="display:grid; grid-template-columns: 1fr 220px; gap:24px; align-items:center; margin-bottom:24px;">
          <div>
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:12px; font-size:1.05rem;">
              <div style="border-bottom:1px solid #CCC; padding-bottom:6px;"><strong>Ano Fabricação/Modelo:</strong> ${car.yearModel || car.year}</div>
              <div style="border-bottom:1px solid #CCC; padding-bottom:6px;"><strong>Quilometragem:</strong> ${car.kmFormatted || store.formatKm(car.km)}</div>
              <div style="border-bottom:1px solid #CCC; padding-bottom:6px;"><strong>Câmbio:</strong> ${car.transmission}</div>
              <div style="border-bottom:1px solid #CCC; padding-bottom:6px;"><strong>Combustível:</strong> ${car.fuel}</div>
              <div style="border-bottom:1px solid #CCC; padding-bottom:6px;"><strong>Cor:</strong> ${car.color || 'Prata'}</div>
              <div style="border-bottom:1px solid #CCC; padding-bottom:6px;"><strong>Garantia:</strong> Motor e Câmbio</div>
            </div>

            <div style="margin-top:16px; font-size:0.9rem; color:#444;">
              <strong>Equipamentos de Destaque:</strong> ${car.features ? car.features.slice(0, 6).join(' • ') : 'Ar-condicionado, Direção, Vidros elétricos, Freios ABS, Airbags.'}
            </div>
          </div>

          <!-- Bloco do QR Code de Pátio -->
          <div style="text-align:center; border:2px dashed #000; padding:12px; border-radius:8px;">
            <img src="${qrUrl}" alt="QR Code do Veículo" style="width:160px; height:160px; display:block; margin:0 auto;">
            <strong style="display:block; font-size:0.85rem; margin-top:6px; text-transform:uppercase;">
              APONTE A CÂMERA
            </strong>
            <span style="font-size:0.75rem; color:#555;">
              Simule o financiamento agora no seu celular!
            </span>
          </div>
        </div>

        <!-- Rodapé de Garantia e Confiança -->
        <div style="border-top:2px solid #000; padding-top:12px; display:flex; justify-content:space-between; font-size:0.85rem; font-weight:700;">
          <span>✓ Sem Registro de Sinistro ou Leilão</span>
          <span>✓ Quilometragem Real Auditada</span>
          <span>✓ Avenida Espírito Santo, 114 – Planaltina do PR</span>
        </div>
      </div>
    `;

    dom.printSheetContainer.style.display = 'block';
    window.print();
    setTimeout(() => { dom.printSheetContainer.style.display = 'none'; }, 1000);
  }

  // ==========================================================================
  // 5. CONFIGURAÇÕES & MODAIS
  // ==========================================================================
  function loadSettings() {
    const cfg = store.getConfig();
    if (dom.cfgDealershipName) dom.cfgDealershipName.value = cfg.dealershipName || "Sartec Veículos";
    if (dom.cfgPhone) dom.cfgPhone.value = cfg.phone || "(44) 9 9148-4162";
    if (dom.cfgEmail) dom.cfgEmail.value = cfg.email || "contato@sartecveiculos.com.br";
    if (dom.cfgAddress) dom.cfgAddress.value = cfg.address || "Avenida Espírito Santo, 114 – Planaltina do Paraná - PR";
    if (dom.cfgInterestRate) dom.cfgInterestRate.value = cfg.defaultInterestRate || 1.35;
  }

  // ==========================================================================
  // EVENT LISTENERS & INICIALIZAÇÃO DO ADMIN
  // ==========================================================================
  function initAdmin() {
    // Navegação por Abas
    dom.tabs.forEach(btn => {
      btn.addEventListener('click', () => {
        const tabId = btn.dataset.tab;
        switchTab(tabId);
      });
    });

    // Filtro de Busca de Estoque
    if (dom.adminStockSearch) {
      dom.adminStockSearch.addEventListener('input', (e) => {
        adminState.stockSearchQuery = e.target.value;
        renderStockTable();
      });
    }

    // Modal Cadastrar Veículo
    const openAddModal = () => {
      if (dom.modalAddVehicle) {
        dom.modalAddVehicle.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    };
    const closeAddModal = () => {
      if (dom.modalAddVehicle) {
        dom.modalAddVehicle.classList.remove('open');
        document.body.style.overflow = '';
      }
    };

    if (dom.btnAdminAddCar) dom.btnAdminAddCar.addEventListener('click', openAddModal);
    if (dom.btnAdminAddCar2) dom.btnAdminAddCar2.addEventListener('click', openAddModal);
    if (dom.btnCloseAddVehicle) dom.btnCloseAddVehicle.addEventListener('click', closeAddModal);
    if (dom.btnCancelAddVehicle) dom.btnCancelAddVehicle.addEventListener('click', closeAddModal);

    // Auto-Preencher com dados FIPE simulados
    if (dom.btnAutoFillFipe) {
      dom.btnAutoFillFipe.addEventListener('click', () => {
        document.getElementById('addBrand').value = 'CHEVROLET';
        document.getElementById('addModel').value = 'Tracker Premier';
        document.getElementById('addVersion').value = '1.2 Turbo 12V Flex Aut.';
        document.getElementById('addYear').value = '2021/2021';
        document.getElementById('addKm').value = '48000';
        document.getElementById('addPrice').value = '104900';
        document.getElementById('addFipe').value = '108500';
        document.getElementById('addCost').value = '92000';
        document.getElementById('addPrep').value = '1400';
        document.getElementById('addTransmission').value = 'Automático';
        document.getElementById('addFuel').value = 'Flex';
        document.getElementById('addCategory').value = 'SUV';
        document.getElementById('addColor').value = 'Branco Perolizado';
        document.getElementById('addBadge').value = 'R$ 3.600 Abaixo da FIPE';
        document.getElementById('addSummary').value = 'SUV moderno, teto solar panorâmico, alerta de colisão frontal e apenas 48.000 km rodados. Periciado e com garantia.';
      });
    }

    // Gerador de Descrição IA
    if (dom.btnGenerateAiCopy) {
      dom.btnGenerateAiCopy.addEventListener('click', () => {
        const brand = document.getElementById('addBrand').value || 'Veículo';
        const model = document.getElementById('addModel').value || 'Seminovo';
        const year = document.getElementById('addYear').value || 'Ano recente';
        const km = document.getElementById('addKm').value || 'Baixa KM';
        
        document.getElementById('addSummary').value = `Oportunidade de alta procedência na Sartec Veículos: ${brand} ${model} (${year}) com apenas ${km} km rodados. 100% periciado com laudo cautelar aprovado, sem sinistro ou leilão. Conforto, segurança e excelente valor de revenda. Aceitamos seu usado na troca com avaliação justa.`;
      });
    }

    // Submit do Cadastro de Veículo
    if (dom.formAddVehicle) {
      dom.formAddVehicle.addEventListener('submit', (e) => {
        e.preventDefault();
        const brand = document.getElementById('addBrand').value.trim();
        const model = document.getElementById('addModel').value.trim();
        const version = document.getElementById('addVersion').value.trim();
        const yearModel = document.getElementById('addYear').value.trim();
        const year = parseInt(yearModel, 10) || 2020;
        const km = parseInt(document.getElementById('addKm').value, 10) || 0;
        const price = parseFloat(document.getElementById('addPrice').value) || 0;
        const fipePrice = parseFloat(document.getElementById('addFipe').value) || Math.round(price * 1.03);
        const acquisitionCost = parseFloat(document.getElementById('addCost').value) || Math.round(price * 0.82);
        const prepCost = parseFloat(document.getElementById('addPrep').value) || 1200;
        const transmission = document.getElementById('addTransmission').value;
        const fuel = document.getElementById('addFuel').value;
        const category = document.getElementById('addCategory').value;
        const color = document.getElementById('addColor').value.trim() || 'Prata';
        const specialBadge = document.getElementById('addBadge').value.trim() || 'Seminovo com Garantia';
        const imageUrl = document.getElementById('addImageUrl').value.trim() || 'img/hero-bg.jpg';
        const summary = document.getElementById('addSummary').value.trim();

        store.addVehicle({
          brand,
          model,
          fullName: `${brand} ${model} ${version}`,
          version,
          year,
          yearModel,
          km,
          price,
          fipePrice,
          acquisitionCost,
          prepCost,
          transmission,
          fuel,
          category,
          color,
          specialBadge,
          summary,
          status: 'disponivel',
          daysInStock: 1,
          demandScore: '🔥 Recém-chegado ao Pátio',
          images: [imageUrl],
          features: [
            "Ar-condicionado",
            "Direção Assistida",
            "Vidros e Travas Elétricas",
            "Multimídia com Conexão Bluetooth",
            "Freios ABS e Airbags Frontais",
            "Laudo Cautelar 100% Aprovado"
          ]
        });

        alert("Veículo cadastrado e publicado com sucesso na vitrine da Sartec Veículos!");
        closeAddModal();
        dom.formAddVehicle.reset();
        renderDashboard();
        renderStockTable();
      });
    }

    // Tema dos Stories no Estúdio de Marketing
    document.querySelectorAll('[data-story-theme]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-story-theme]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        adminState.storyTheme = btn.dataset.storyTheme;
        updateMarketingPreview();
      });
    });

    // Copiar Texto de Copy Comercial
    if (dom.btnCopyText && dom.copyTextArea) {
      dom.btnCopyText.addEventListener('click', () => {
        dom.copyTextArea.select();
        navigator.clipboard.writeText(dom.copyTextArea.value);
        dom.btnCopyText.textContent = "✓ Copiado com Sucesso!";
        setTimeout(() => { dom.btnCopyText.textContent = "📋 Copiar Texto Completo"; }, 2000);
      });
    }

    // Download Mockup Story
    if (dom.btnDownloadStory) {
      dom.btnDownloadStory.addEventListener('click', () => {
        alert("Dica de Publicação: A arte 9:16 está perfeitamente alinhada para screenshot em tela cheia no celular ou postagem nos Stories do Instagram / Status do WhatsApp da Sartec!");
      });
    }

    // Imprimir Etiqueta A4 de Pátio
    if (dom.btnPrintSticker) {
      dom.btnPrintSticker.addEventListener('click', () => {
        printVehicleSticker(adminState.selectedCarId);
      });
    }

    // Modal Proposta Bancária
    if (dom.btnCloseBankProposal && dom.modalBankProposal) {
      dom.btnCloseBankProposal.addEventListener('click', () => {
        dom.modalBankProposal.classList.remove('open');
        document.body.style.overflow = '';
      });
    }

    if (dom.btnCopyBankProposal && dom.bankProposalText) {
      dom.btnCopyBankProposal.addEventListener('click', () => {
        navigator.clipboard.writeText(dom.bankProposalText.textContent);
        dom.btnCopyBankProposal.textContent = "✓ Dados Copiados!";
        setTimeout(() => { dom.btnCopyBankProposal.textContent = "📋 Copiar Dados da Ficha"; }, 2000);
      });
    }

    // Salvar Configurações
    if (dom.storeSettingsForm) {
      dom.storeSettingsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        store.saveConfig({
          dealershipName: dom.cfgDealershipName.value.trim(),
          phone: dom.cfgPhone.value.trim(),
          phoneRaw: dom.cfgPhone.value.replace(/\D/g, ''),
          email: dom.cfgEmail.value.trim(),
          address: dom.cfgAddress.value.trim(),
          defaultInterestRate: parseFloat(dom.cfgInterestRate.value) || 1.35
        });
        alert("Configurações atualizadas com sucesso!");
      });
    }

    // Resetar Demonstração
    if (dom.btnResetDemoData) {
      dom.btnResetDemoData.addEventListener('click', () => {
        if (confirm("Deseja realmente restaurar os dados originais da demonstração? O estoque oficial (6 veículos) e os 5 leads regionais serão recarregados.")) {
          store.resetDemoData();
          alert("Dados da demonstração restaurados!");
          window.location.reload();
        }
      });
    }

    // Render Inicial
    renderDashboard();
  }

  // APIs Globais do Admin
  window.sartecAdmin = {
    openMarketingFor: (carId) => {
      adminState.selectedCarId = carId;
      switchTab('tabMarketing');
    },
    quickEditPrice: (carId) => {
      const car = store.getVehicleById(carId);
      if (!car) return;
      const newPriceStr = prompt(`Digite o novo preço para ${car.brand} ${car.model} (Atual: ${store.formatCurrency(car.price)}):`, car.price);
      if (newPriceStr !== null) {
        const newPrice = parseFloat(newPriceStr.replace(/\./g, '').replace(',', '.'));
        if (!isNaN(newPrice) && newPrice > 0) {
          store.updateVehicle(carId, { price: newPrice });
          renderDashboard();
          renderStockTable();
        }
      }
    },
    deleteCar: (carId) => {
      const car = store.getVehicleById(carId);
      if (confirm(`Excluir permanentemente o ${car ? car.brand + ' ' + car.model : 'veículo'} do estoque?`)) {
        store.deleteVehicle(carId);
        renderDashboard();
        renderStockTable();
      }
    },
    openBankProposal: (leadId) => {
      const lead = store.getLeads().find(l => l.id === leadId);
      if (!lead || !dom.modalBankProposal || !dom.bankProposalText) return;

      const proposal = `*FICHA CADASTRAL PARA ANÁLISE BANCÁRIA — SARTEC VEÍCULOS*\n` +
        `Data: ${new Date().toLocaleDateString('pt-BR')}\n` +
        `Origem: Planaltina do Paraná - PR\n\n` +
        `1. DADOS DO PROPONENTE:\n` +
        `• Nome Completo: ${lead.name}\n` +
        `• Cidade/UF: ${lead.city || 'Planaltina do PR / Região'}\n` +
        `• Telefone/WhatsApp: ${lead.phone}\n` +
        `• CNH Informada: ${lead.hasCnh ? 'Sim' : 'Não'}\n\n` +
        `2. DADOS DO VEÍCULO DA OPERAÇÃO:\n` +
        `• Veículo: ${lead.vehicleName || 'Consulte veículo'}\n` +
        `• Valor de Venda: ${store.formatCurrency(lead.vehiclePrice || 0)}\n\n` +
        `3. CONDIÇÕES DO FINANCIAMENTO:\n` +
        `• Entrada: ${store.formatCurrency(lead.downPayment || 0)}\n` +
        `• Prazo Solicitado: ${lead.installmentsCount || 48} meses\n` +
        `• Parcela Estimada: ${store.formatCurrency(lead.installmentValue || 0)}\n` +
        `• Veículo na Troca: ${lead.hasTradeIn ? (lead.tradeInDetails || 'Sim') : 'Não'}\n\n` +
        `Favor retornar com limites pré-aprovados nos bancos Santander, BV Financeira ou Pan.`;

      dom.bankProposalText.textContent = proposal;

      if (dom.btnSendBankProposalWa) {
        dom.btnSendBankProposalWa.onclick = () => {
          window.open(`https://wa.me/?text=${encodeURIComponent(proposal)}`, '_blank');
        };
      }

      dom.modalBankProposal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAdmin);
  } else {
    initAdmin();
  }
})();
