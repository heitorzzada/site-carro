/**
 * SARTEC VEÍCULOS — BASE DE DADOS OFICIAL E MOTOR DE PERSISTÊNCIA
 * Concessionária: Sartec Veículos (Planaltina do Paraná - PR)
 * Endereço: Avenida Espírito Santo, 114 (Cruzamento com Av. Paraná) – Centro, Planaltina do Paraná – PR, CEP 87860-000
 * WhatsApp Oficial: 5544991484162 | Exibição: (44) 9 9148-4162
 * E-mail: contato@sartecveiculos.com.br
 * Cidades Atendidas: Planaltina do Paraná, Paranavaí, Loanda, Santa Isabel do Ivaí, Nova Londrina, Terra Rica e Noroeste do PR
 */

(function () {
  'use strict';

  // Chaves de Armazenamento Local
  const STORAGE_KEYS = {
    VEHICLES: 'sartec_vehicles_v2',
    LEADS: 'sartec_leads_v2',
    FAVORITES: 'sartec_favorites_v2',
    COMPARE: 'sartec_compare_v2',
    CONFIG: 'sartec_config_v2'
  };

  // Configuração Padrão da Concessionária
  const DEFAULT_CONFIG = {
    dealershipName: "Sartec Veículos",
    tagline: "Transparência, Segurança e Qualidade em Seminovos",
    description: "Referência em seminovos periciados no Noroeste do Paraná. Comprar na Sartec é ter a certeza de procedência auditada, garantia real e financiamento com as menores taxas.",
    phone: "(44) 9 9148-4162",
    phoneRaw: "5544991484162",
    email: "contato@sartecveiculos.com.br",
    address: "Avenida Espírito Santo, 114 (Cruzamento com Av. Paraná)",
    neighborhood: "Centro",
    city: "Planaltina do Paraná",
    state: "PR",
    cep: "87860-000",
    hoursWeekday: "Segunda a Sexta: 08:00 às 18:00",
    hoursWeekend: "Sábado: 08:00 às 12:30",
    instagramUrl: "https://www.instagram.com/sartec_veiculos/",
    officialSiteUrl: "https://sartecveiculos.com.br",
    logoUrl: "https://sartecveiculos.com.br/wp-content/uploads/2025/07/Logo-Sartec-Veiculos-_fundo-transparente_-e1753331438782.webp",
    faviconUrl: "https://sartecveiculos.com.br/wp-content/uploads/2026/07/cropped-Sartec-Favicon-32x32.png",
    defaultInterestRate: 1.35, // 1.35% a.m. estimativa ilustrativa
    serviceCities: [
      "Planaltina do Paraná",
      "Paranavaí",
      "Loanda",
      "Santa Isabel do Ivaí",
      "Nova Londrina",
      "Terra Rica",
      "Amaporã",
      "Gaira",
      "Maringá e Noroeste do PR"
    ]
  };

  // Estoque Inicial Oficial com Dados Ricos de Conversão e Financeiros Internos
  const INITIAL_VEHICLES = [
    {
      id: "car-cruze-ltz-2019",
      brand: "CHEVROLET",
      model: "Cruze LTZ",
      fullName: "Chevrolet Cruze LTZ 1.4 Turbo 16V Aut.",
      version: "1.4 Turbo 16V Flex Aut.",
      year: 2019,
      yearModel: "2019/2019",
      km: 96000,
      price: 92900,
      fipePrice: 95400,
      acquisitionCost: 81000,
      prepCost: 1400,
      transmission: "Automático",
      fuel: "Flex",
      category: "Sedan",
      color: "Branco Summit",
      plateEnd: "7",
      doors: 4,
      specialBadge: "R$ 2.500 Abaixo da FIPE",
      status: "disponivel", // disponivel | reservado | vendido
      daysInStock: 12,
      demandScore: "Alta (19 interessados esta semana)",
      consumption: "11,2 km/l cidade | 14,0 km/l estrada",
      viewsToday: 42,
      images: [
        "https://sartecveiculos.com.br/wp-content/uploads/2026/10/WhatsApp-Image-2026-10-06-at-6.37.21-PM-1.jpeg"
      ],
      features: [
        "Bancos em Couro Premium com Ajuste",
        "Central Multimídia MyLink com Apple CarPlay e Android Auto",
        "Câmara de Marcha-atrás com Linhas Guias Ativas",
        "Keyless (Abertura e Partida por Botão na Chave)",
        "6 Airbags (Frontais, Laterais e Cortina)",
        "Acabamento Interior Soft-Touch Premium",
        "Laudo Cautelar 100% Aprovado sem Sinistro",
        "Controle de Tração e Estabilidade",
        "Faróis com Sensor Crepuscular e Luz Diurna em LED",
        "Piloto Automático e Limitador de Velocidade"
      ],
      summary: "Sedan premium impecável com motor 1.4 Turbo potente e surpreendentemente econômico. Interior sofisticado com bancos em couro, multimídia MyLink e segurança máxima com 6 airbags. Totalmente periciado e com valor R$ 2.500 abaixo da tabela FIPE.",
      featured: true
    },
    {
      id: "car-renegade-long-2018",
      brand: "JEEP",
      model: "Renegade Longitude",
      fullName: "Jeep Renegade Longitude 1.8 16V Aut.",
      version: "1.8 16V Flex Aut. 6M",
      year: 2018,
      yearModel: "2018/2018",
      km: 152000,
      price: 68900,
      fipePrice: 71200,
      acquisitionCost: 59500,
      prepCost: 1800,
      transmission: "Automático",
      fuel: "Flex",
      category: "SUV",
      color: "Prata Billet",
      plateEnd: "8",
      doors: 4,
      specialBadge: "SUV Mais Procurado",
      status: "disponivel",
      daysInStock: 18,
      demandScore: "Muito Alta (24 interessados)",
      consumption: "9,5 km/l cidade | 12,1 km/l estrada",
      viewsToday: 57,
      images: [
        "https://sartecveiculos.com.br/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-21-at-3.13.04-PM.jpeg"
      ],
      features: [
        "Ar-condicionado Digital Dual Zone",
        "Travão de Mão Eletrónico com Acionamento Automático",
        "Central Multimídia com Apple CarPlay e Android Auto",
        "Paddle Shifts (Borboletas para troca de marcha no volante)",
        "Controle de Tração (TC) e Estabilidade (ESC)",
        "Sem Leilão, Sem Sinistro com Laudo Cautelar Aprovado",
        "Bancos com Revestimento Confortável",
        "Rodas de Liga Leve Originais Aro 17",
        "Sensor de Estacionamento com Alerta Sonoro e Visual",
        "Piloto Automático Integrado ao Volante"
      ],
      summary: "O SUV mais desejado do Brasil na versão Longitude. Altura de rodagem imponente para estradas de terra ou asfalto, conforto do ar digital dual zone e câmbio automático de 6 marchas com paddle shift. Oportunidade com preço abaixo da FIPE.",
      featured: true
    },
    {
      id: "car-s10-diesel-2005",
      brand: "CHEVROLET",
      model: "S10 Cabine Dupla",
      fullName: "Chevrolet S10 Cabine Dupla 2.8 Turbo Diesel",
      version: "2.8 Turbo Diesel 4x4 Cabine Dupla",
      year: 2005,
      yearModel: "2005/2005",
      km: 400000,
      price: 61900,
      fipePrice: 62800,
      acquisitionCost: 52000,
      prepCost: 2100,
      transmission: "Manual",
      fuel: "Diesel",
      category: "Picape",
      color: "Prata",
      plateEnd: "4",
      doors: 4,
      specialBadge: "Isenta de IPVA no PR",
      status: "disponivel",
      daysInStock: 46, // Gera alerta de giro no Admin (>40 dias)
      demandScore: "Ideal para Trabalho/Agro",
      consumption: "10,0 km/l cidade | 12,8 km/l estrada",
      viewsToday: 38,
      images: [
        "https://sartecveiculos.com.br/wp-content/uploads/2026/10/WhatsApp-Image-2026-10-06-at-5.04.54-PM.jpeg"
      ],
      features: [
        "Lendário Motor MWM 2.8 Turbo Diesel de Alta Durabilidade",
        "Cabine Dupla Espaçosa para 5 Passageiros",
        "Ar-condicionado Gela Muito Forte",
        "Direção Hidráulica Leve e Confortável",
        "Capota Marítima Nova Instalada",
        "Protetor de Caçamba Resistente",
        "Vidros e Travas Elétricas",
        "Engate Traseiro Reforçado para Reboque",
        "Estrutura Íntegra e Robusta",
        "Isenção Total de IPVA no Estado do Paraná"
      ],
      summary: "Verdadeiro trator para o agronegócio e estradas do Noroeste do PR. Equipada com o consagrado motor MWM 2.8 Turbo Diesel mecânico, famoso pela manutenção barata e durabilidade lendária. Além de econômica, é isenta de IPVA no Paraná.",
      featured: true
    },
    {
      id: "car-cruze-lt-2014",
      brand: "CHEVROLET",
      model: "Cruze LT",
      fullName: "Chevrolet Cruze LT 1.8 16V Ecotec Aut.",
      version: "1.8 16V Ecotec Flex Aut.",
      year: 2014,
      yearModel: "2014/2014",
      km: 180000,
      price: 58900,
      fipePrice: 59900,
      acquisitionCost: 50000,
      prepCost: 1200,
      transmission: "Automático",
      fuel: "Flex",
      category: "Sedan",
      color: "Cinza",
      plateEnd: "8",
      doors: 4,
      specialBadge: "Conforto Automático",
      status: "disponivel",
      daysInStock: 22,
      demandScore: "11 interessados",
      consumption: "9,8 km/l cidade | 13,2 km/l estrada",
      viewsToday: 29,
      images: [
        "https://sartecveiculos.com.br/wp-content/uploads/2026/10/WhatsApp-Image-2026-10-09-at-8.47.08-AM.jpeg"
      ],
      features: [
        "Bancos em Couro Nobre",
        "Piloto Automático no Volante",
        "Direção Elétrica Progressiva",
        "Rodas de Liga Leve Aro 17 Originais",
        "Porta-malas Gigante de 450 Litros",
        "Periciado com Garantia Real da Loja",
        "Ar-condicionado Digital Automático",
        "Central Multimídia MyLink com Bluetooth",
        "Freios ABS com EBD nas 4 Rodas",
        "Controle de Estabilidade e Tração"
      ],
      summary: "Excelente custo-benefício para quem procura um sedan médio automático, confortável e imponente por menos de R$ 60 mil. Bancos em couro, ar digital, amplo porta-malas e procedência periciada com garantia de motor e câmbio.",
      featured: false
    },
    {
      id: "car-voyage-16-2016",
      brand: "VOLKSWAGEN",
      model: "Voyage 1.6 MSI",
      fullName: "Volkswagen Voyage 1.6 MSI Total Flex",
      version: "1.6 MSI Total Flex 4P",
      year: 2016,
      yearModel: "2016/2016",
      km: 90000,
      price: 49990,
      fipePrice: 51200,
      acquisitionCost: 42000,
      prepCost: 950,
      transmission: "Manual",
      fuel: "Flex",
      category: "Sedan",
      color: "Branco",
      plateEnd: "3",
      doors: 4,
      specialBadge: "Raridade: Baixa KM",
      status: "disponivel",
      daysInStock: 7,
      demandScore: "🔥 Campeão de Cliques",
      consumption: "11,8 km/l cidade | 14,5 km/l estrada",
      viewsToday: 68,
      images: [
        "https://sartecveiculos.com.br/wp-content/uploads/2026/10/WhatsApp-Image-2026-10-06-at-2.55.33-PM.jpeg"
      ],
      features: [
        "Apenas 90.000 km Originais Comprovados",
        "Motor 1.6 MSI Forte, Ágil e Muito Econômico",
        "Completo de Fábrica (Ar, Direção, Vidros e Travas)",
        "4 Pneus Novos com Excelente Aderência",
        "Sistema de Som com Conexão Bluetooth e USB",
        "Chave Canivete com Alarme e Abertura Remota",
        "Porta-malas Amplo de 480 Litros",
        "Laudo Cautelar Aprovado sem Apontamentos",
        "Manutenção Simples e Peças Super Acessíveis",
        "Documentação 100% em Dia para Transferência"
      ],
      summary: "Raridade no mercado de seminovos: ano 2016 com apenas 90.000 km rodados. Motor 1.6 MSI muito confiável, suspensão firme, 4 pneus novos e porta-malas espaçoso. O carro ideal para a família ou para quem roda muito com baixo consumo.",
      featured: true
    },
    {
      id: "car-voyage-10-2010",
      brand: "VOLKSWAGEN",
      model: "Voyage 1.0 VHT",
      fullName: "Volkswagen Voyage 1.0 VHT Total Flex",
      version: "1.0 VHT Total Flex 4P",
      year: 2010,
      yearModel: "2010/2010",
      km: 247000,
      price: 25990,
      fipePrice: 27900,
      acquisitionCost: 19800,
      prepCost: 1100,
      transmission: "Manual",
      fuel: "Flex",
      category: "Sedan",
      color: "Prata",
      plateEnd: "9",
      doors: 4,
      specialBadge: "Parcela que Cabe no Bolso",
      status: "disponivel",
      daysInStock: 5,
      demandScore: "🔥 31 simulações recentes",
      consumption: "12,5 km/l cidade | 15,2 km/l estrada",
      viewsToday: 74,
      images: [
        "https://sartecveiculos.com.br/wp-content/uploads/2026/10/WhatsApp-Image-2026-10-06-at-2.55.33-PM.jpeg"
      ],
      features: [
        "Oportunidade Acessível com Garantia da Loja",
        "Entrada Super Facilitada (Aceita Moto ou Cartão)",
        "Motor 1.0 VHT Econômico e Confiável",
        "Direção Hidráulica Confortável",
        "Vidros Elétricos Dianteiros",
        "Travas Elétricas e Alarme",
        "Porta-malas Enorme para Viagens",
        "Manutenção Extremamente Barata",
        "Documentação Toda em Dia para Transferência Imediata",
        "Financiamento com Parcelas a partir de R$ 590/mês"
      ],
      summary: "A porta de entrada ideal para conquistar seu carro próprio. Um sedan robusto, econômico e com a manutenção mais barata do mercado. Parcela que cabe no bolso, garantia da Sartec Veículos e transferência desimpedida.",
      featured: true
    },
    {
      id: "car-hilux-1999",
      brand: "TOYOTA",
      model: "Hilux",
      fullName: "Toyota Hilux 3.0 Turbo Diesel 4x4",
      version: "3.0 Turbo Diesel 4x4 Cabine Dupla",
      year: 1999,
      yearModel: "1999/1999",
      km: 479000,
      price: 59900,
      fipePrice: 61500,
      acquisitionCost: 49000,
      prepCost: 2400,
      transmission: "Manual",
      fuel: "Diesel",
      category: "Picape",
      color: "Prata",
      plateEnd: "2",
      doors: 4,
      specialBadge: "Lenda Indestrutível Toyota",
      status: "disponivel",
      daysInStock: 31,
      demandScore: "Alta procura rural",
      consumption: "9,8 km/l cidade | 12,0 km/l estrada",
      viewsToday: 33,
      images: [
        "https://sartecveiculos.com.br/wp-content/uploads/2026/10/WhatsApp-Image-2026-10-06-at-5.33.57-PM.jpeg"
      ],
      features: [
        "Tração 4x4 com Reduzida Mecânica Funcional",
        "Motor Toyota 3.0 Turbo Diesel Conhecido pela Resistência",
        "Ar-condicionado e Direção Hidráulica",
        "Vidros Elétricos nas 4 Portas",
        "Protetor de Caçamba e Capota",
        "Pneus Todo-Terreno em Bom Estado",
        "Totalmente Revisada de Suspensão e Freios",
        "Isenta de IPVA no Paraná",
        "Estrutura Firme Pronta para Qualquer Estrada Rural"
      ],
      summary: "A reputação de ser indestrutível: Toyota Hilux 3.0 Turbo Diesel com tração 4x4 mecânica e reduzida. O veículo perfeito para sítio, fazenda e estrada pesada sem desvalorização.",
      featured: false
    },
    {
      id: "car-corolla-xrs-2018",
      brand: "TOYOTA",
      model: "Corolla XRS",
      fullName: "Toyota Corolla XRS 2.0 Dual VVT-i Flex",
      version: "2.0 Dual VVT-i Flex CVT",
      year: 2018,
      yearModel: "2018/2018",
      km: 190000,
      price: 94990,
      fipePrice: 97800,
      acquisitionCost: 83000,
      prepCost: 1500,
      transmission: "Automático",
      fuel: "Flex",
      category: "Sedan",
      color: "Preto Perolizado",
      plateEnd: "6",
      doors: 4,
      specialBadge: "Versão Esportiva Exclusiva",
      status: "disponivel",
      daysInStock: 14,
      demandScore: "Muito Alta (Corolla Líder)",
      consumption: "10,6 km/l cidade | 13,8 km/l estrada",
      viewsToday: 51,
      images: [
        "https://sartecveiculos.com.br/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-23-at-11.45.00-AM-1.jpeg"
      ],
      features: [
        "Versão Esportiva XRS com Spoilers e Saias Laterais",
        "Faróis Full LED com DRL Integrado",
        "Câmbio CVT com Simulação de 7 Marchas e Borboletas no Volante",
        "Motor 2.0 de 154cv Forte e Durável",
        "Bancos em Couro Preto com Costuras Vermelhas Esportivas",
        "7 Airbags de Série (Inclusive de Joelho)",
        "Central Multimídia Toyota com Câmera de Ré",
        "Piloto Automático e Chave Presencial Smart Entry",
        "Laudo Cautelar 100% Aprovado"
      ],
      summary: "O equilíbrio perfeito entre a confiabilidade mecânica do Toyota Corolla e a esportividade da versão XRS. Faróis em LED, 7 airbags, acabamento em couro com costura esportiva e a liquidez inigualável de um Corolla seminovo periciado.",
      featured: true
    },
    {
      id: "car-toro-freedom-2018",
      brand: "FIAT",
      model: "Toro Freedom",
      fullName: "Fiat Toro Freedom 1.8 Flex AT6",
      version: "Freedom 1.8 16V Flex Aut. 6M",
      year: 2018,
      yearModel: "2018/2018",
      km: 178000,
      price: 94900,
      fipePrice: 96900,
      acquisitionCost: 82500,
      prepCost: 1600,
      transmission: "Automático",
      fuel: "Flex",
      category: "Picape",
      color: "Vermelho Tribal",
      plateEnd: "9",
      doors: 4,
      specialBadge: "Design e Espaço Moderno",
      status: "disponivel",
      daysInStock: 19,
      demandScore: "Alta procura família/lazer",
      consumption: "9,6 km/l cidade | 12,2 km/l estrada",
      viewsToday: 44,
      images: [
        "https://sartecveiculos.com.br/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-23-at-4.18.48-PM.jpeg"
      ],
      features: [
        "Câmbio Automático de 6 Marchas Confortável",
        "Tampa Traseira com Abertura Lateral Dupla Patenteada",
        "Direção Elétrica Ultra-Leve",
        "Controle de Tração e Estabilidade",
        "Central Multimídia Uconnect com Câmera de Ré",
        "Piloto Automático Integrado",
        "Capota Marítima e Protetor de Caçamba",
        "Rodas de Liga Leve Originais Aro 16",
        "Suspensão Traseira Multilink Confortável como um Sedan"
      ],
      summary: "A picape que une o conforto de condução de um SUV à versatilidade de uma caçamba espaçosa. Excelente para quem viaja em família, roda na cidade e precisa de caçamba no fim de semana.",
      featured: false
    },
    {
      id: "car-onix-ltz-2024",
      brand: "CHEVROLET",
      model: "Onix LTZ",
      fullName: "Chevrolet Onix LTZ 1.0 Turbo Flex Aut.",
      version: "1.0 Turbo Flex Aut. 6M",
      year: 2024,
      yearModel: "2024/2024",
      km: 83000,
      price: 86990,
      fipePrice: 89500,
      acquisitionCost: 76000,
      prepCost: 900,
      transmission: "Automático",
      fuel: "Flex",
      category: "Hatch",
      color: "Preto Ouro Negro",
      plateEnd: "5",
      doors: 4,
      specialBadge: "Seminovo Recente / Garantia",
      status: "disponivel",
      daysInStock: 9,
      demandScore: "🔥 28 interessados ativos",
      consumption: "13,1 km/l cidade | 16,7 km/l estrada",
      viewsToday: 62,
      images: [
        "https://sartecveiculos.com.br/wp-content/uploads/2026/10/WhatsApp-Image-2026-10-02-at-2.29.47-PM.jpeg"
      ],
      features: [
        "Motor 1.0 Turbo 116cv de Excelente Retomada",
        "Câmbio Automático de 6 Marchas Suave",
        "Chave Presencial com Partida por Botão",
        "Carregador de Celular por Indução",
        "Central Multimídia MyLink com Wi-Fi Nativo",
        "6 Airbags de Série (5 Estrelas no Latin NCAP)",
        "Assistente de Partida em Rampas (Hill Holder)",
        "Consumo Excepcional de até 16,7 km/l na Estrada",
        "Único Dono com Manual e Chave Reserva"
      ],
      summary: "Hatch moderno ano 2024 na versão LTZ Turbo. Tecnologia de ponta com carregador sem fio, multimídia conectada, câmbio automático e nota máxima em segurança. Economia impressionante com potência turbo quando você precisa ultrapassar.",
      featured: true
    }
  ];

  // Leads Iniciais Realistas para Demonstração de Alto Impacto no CRM Kanban
  const INITIAL_LEADS = [
    {
      id: "lead-101",
      name: "Carlos Mendes de Oliveira",
      city: "Paranavaí - PR",
      phone: "(44) 9 9872-3341",
      phoneRaw: "5544998723341",
      vehicleId: "car-renegade-long-2018",
      vehicleName: "Jeep Renegade Longitude 1.8 Aut.",
      vehiclePrice: 68900,
      type: "proposta_troca",
      status: "proposta_troca", // novas_simulacoes | proposta_troca | analise_bancaria | visita_agendada | vendido
      downPayment: 25000,
      installmentsCount: 48,
      installmentValue: 1280,
      hasTradeIn: true,
      tradeInDetails: "Hyundai HB20 1.0 Comfort 2017/2018 - 84.000 km, segundo dono",
      hasCnh: true,
      scoreProbability: "97% (Altíssima Pré-Aprovado)",
      notes: "Cliente deseja ver o Renegade na sexta-feira. Avaliação prévia do HB20 em torno de R$ 42.000.",
      createdAt: "2026-10-15T14:32:00.000Z"
    },
    {
      id: "lead-102",
      name: "Marcos Vinicius Rezende",
      city: "Planaltina do Paraná - PR",
      phone: "(44) 9 9123-4567",
      phoneRaw: "5544991234567",
      vehicleId: "car-voyage-16-2016",
      vehicleName: "Volkswagen Voyage 1.6 MSI",
      vehiclePrice: 49990,
      type: "visita_agendada",
      status: "visita_agendada",
      downPayment: 20000,
      installmentsCount: 36,
      installmentValue: 1090,
      hasTradeIn: false,
      tradeInDetails: "",
      hasCnh: true,
      scoreProbability: "92% (Alta)",
      notes: "Agendou visita para sábado às 10h da manhã no pátio da Sartec. Já avisado para trazer documentos.",
      createdAt: "2026-10-16T09:15:00.000Z"
    },
    {
      id: "lead-103",
      name: "Dra. Juliana Soares",
      city: "Nova Londrina - PR",
      phone: "(44) 9 9765-8822",
      phoneRaw: "5544997658822",
      vehicleId: "car-cruze-ltz-2019",
      vehicleName: "Chevrolet Cruze LTZ 1.4 Turbo Aut.",
      vehiclePrice: 92900,
      type: "analise_bancaria",
      status: "analise_bancaria",
      downPayment: 35000,
      installmentsCount: 48,
      installmentValue: 1620,
      hasTradeIn: false,
      tradeInDetails: "",
      hasCnh: true,
      scoreProbability: "98% (Excelente perfil)",
      notes: "Ficha enviada ao Banco Santander e BV Financeira. Aguardando liberação formal da taxa de 1,29% a.m.",
      createdAt: "2026-10-16T11:40:00.000Z"
    },
    {
      id: "lead-104",
      name: "Roberto Carlos da Silva (Agro)",
      city: "Loanda - PR",
      phone: "(44) 9 9911-2233",
      phoneRaw: "5544999112233",
      vehicleId: "car-s10-diesel-2005",
      vehicleName: "Chevrolet S10 Cabine Dupla 2.8 Diesel",
      vehiclePrice: 61900,
      type: "novas_simulacoes",
      status: "novas_simulacoes",
      downPayment: 30000,
      installmentsCount: 24,
      installmentValue: 1680,
      hasTradeIn: false,
      tradeInDetails: "",
      hasCnh: true,
      scoreProbability: "89% (Alta)",
      notes: "Produtor rural em Loanda. Quer picape a diesel para rodar na fazenda. Prefere pagar parcela semestral ou safra se possível.",
      createdAt: "2026-10-16T16:20:00.000Z"
    },
    {
      id: "lead-105",
      name: "Fernando Henrique Gomes",
      city: "Santa Isabel do Ivaí - PR",
      phone: "(44) 9 9844-5511",
      phoneRaw: "5544998445511",
      vehicleId: "car-voyage-10-2010",
      vehicleName: "Volkswagen Voyage 1.0 VHT",
      vehiclePrice: 25990,
      type: "vendido",
      status: "vendido",
      downPayment: 10000,
      installmentsCount: 36,
      installmentValue: 620,
      hasTradeIn: true,
      tradeInDetails: "Honda CG 160 Fan 2020",
      hasCnh: true,
      scoreProbability: "100% Concluído",
      notes: "Negócio fechado e entregue com sucesso! Cliente pegou a chave com tanque cheio e fez foto para o Instagram.",
      createdAt: "2026-10-14T17:10:00.000Z"
    }
  ];

  // ========================================================================
  // UTILITÁRIOS E FORMATAÇÃO RIGOROSA
  // ========================================================================

  /**
   * Formata número para moeda Real: R$ XX.XXX,00
   */
  function formatCurrency(value) {
    if (value === null || value === undefined || isNaN(value)) {
      return "R$ 0,00";
    }
    const num = Number(value);
    return num.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  /**
   * Formata quilometragem: XX.XXX km
   */
  function formatKm(value) {
    if (value === null || value === undefined || isNaN(value)) {
      return "0 km";
    }
    const num = Math.round(Number(value));
    return `${num.toLocaleString('pt-BR')} km`;
  }

  /**
   * Cálculo de Parcela de Financiamento (Tabela Price)
   */
  function calculateInstallment(totalPrice, downPayment, months, monthlyRatePercent) {
    const principal = Math.max(0, (totalPrice || 0) - (downPayment || 0));
    if (principal <= 0) return 0;
    const n = parseInt(months, 10) || 48;
    const i = (parseFloat(monthlyRatePercent) || 1.35) / 100;
    
    // Fórmula Tabela Price: PMT = P * [i*(1+i)^n] / [(1+i)^n - 1]
    const factor = Math.pow(1 + i, n);
    const pmt = principal * ((i * factor) / (factor - 1));
    return Math.round(pmt);
  }

  // ========================================================================
  // REPOSITÓRIO LOCAL COM SUPORTE A LOCALSTORAGE E RESET
  // ========================================================================

  function getLocalJson(key, defaultVal) {
    try {
      const data = localStorage.getItem(key);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.warn(`[SartecStore] Erro ao ler ${key} do localStorage:`, e);
    }
    return defaultVal;
  }

  function setLocalJson(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn(`[SartecStore] Erro ao salvar ${key} no localStorage:`, e);
    }
  }

  // Obter estoque completo sincronizado
  function getVehicles() {
    let list = getLocalJson(STORAGE_KEYS.VEHICLES, null);
    if (!list || !Array.isArray(list) || list.length === 0) {
      list = JSON.parse(JSON.stringify(INITIAL_VEHICLES));
      setLocalJson(STORAGE_KEYS.VEHICLES, list);
    }
    // Assegura campos calculados e formatação padrão
    list.forEach(car => {
      car.priceFormatted = formatCurrency(car.price);
      car.kmFormatted = formatKm(car.km);
      car.fipeFormatted = formatCurrency(car.fipePrice || car.price * 1.03);
      car.localUrl = `veiculo.html?id=${encodeURIComponent(car.id)}`;
      car.detailsUrl = car.localUrl;
      // Lucro projetado
      const totalCost = (car.acquisitionCost || 0) + (car.prepCost || 0);
      car.profit = car.price - totalCost;
      car.profitMargin = car.price > 0 ? ((car.profit / car.price) * 100).toFixed(1) : 0;
    });
    return list;
  }

  function saveVehicles(vehicles) {
    setLocalJson(STORAGE_KEYS.VEHICLES, vehicles);
    // Dispara evento global para sincronização entre abas/componentes
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('sartec:vehicles-updated', { detail: { vehicles } }));
    }
  }

  function getVehicleById(id) {
    if (!id) return null;
    const list = getVehicles();
    return list.find(v => v.id === id) || null;
  }

  function updateVehicle(id, updates) {
    const list = getVehicles();
    const index = list.findIndex(v => v.id === id);
    if (index === -1) return null;
    list[index] = { ...list[index], ...updates };
    saveVehicles(list);
    return list[index];
  }

  function addVehicle(newCar) {
    const list = getVehicles();
    const id = newCar.id || `car-${Date.now()}`;
    const vehicle = {
      ...newCar,
      id,
      daysInStock: newCar.daysInStock || 1,
      status: newCar.status || 'disponivel',
      viewsToday: newCar.viewsToday || 12
    };
    list.unshift(vehicle);
    saveVehicles(list);
    return vehicle;
  }

  function deleteVehicle(id) {
    let list = getVehicles();
    list = list.filter(v => v.id !== id);
    saveVehicles(list);
  }

  // ========================================================================
  // GESTÃO DE LEADS E CRM
  // ========================================================================

  function getLeads() {
    let leads = getLocalJson(STORAGE_KEYS.LEADS, null);
    if (!leads || !Array.isArray(leads) || leads.length === 0) {
      leads = JSON.parse(JSON.stringify(INITIAL_LEADS));
      setLocalJson(STORAGE_KEYS.LEADS, leads);
    }
    return leads;
  }

  function saveLeads(leads) {
    setLocalJson(STORAGE_KEYS.LEADS, leads);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('sartec:leads-updated', { detail: { leads } }));
    }
  }

  function addLead(leadData) {
    const leads = getLeads();
    const newLead = {
      id: `lead-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: leadData.status || (leadData.type === 'proposta_troca' ? 'proposta_troca' : 'novas_simulacoes'),
      ...leadData
    };
    leads.unshift(newLead);
    saveLeads(leads);
    return newLead;
  }

  function updateLeadStatus(leadId, newStatus) {
    const leads = getLeads();
    const target = leads.find(l => l.id === leadId);
    if (target) {
      target.status = newStatus;
      saveLeads(leads);
      return target;
    }
    return null;
  }

  // ========================================================================
  // FAVORITOS E COMPARADOR
  // ========================================================================

  function getFavorites() {
    return getLocalJson(STORAGE_KEYS.FAVORITES, []);
  }

  function toggleFavorite(id) {
    let favs = getFavorites();
    const index = favs.indexOf(id);
    let added = false;
    if (index >= 0) {
      favs.splice(index, 1);
    } else {
      favs.push(id);
      added = true;
    }
    setLocalJson(STORAGE_KEYS.FAVORITES, favs);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('sartec:favorites-updated', { detail: { favorites: favs, id, added } }));
    }
    return added;
  }

  function isFavorite(id) {
    return getFavorites().includes(id);
  }

  function getCompareList() {
    return getLocalJson(STORAGE_KEYS.COMPARE, []);
  }

  function toggleCompare(id) {
    let list = getCompareList();
    const index = list.indexOf(id);
    let added = false;
    if (index >= 0) {
      list.splice(index, 1);
    } else {
      if (list.length >= 3) {
        list.shift(); // Mantém no máximo 3 veículos lado a lado
      }
      list.push(id);
      added = true;
    }
    setLocalJson(STORAGE_KEYS.COMPARE, list);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('sartec:compare-updated', { detail: { compare: list, id, added } }));
    }
    return added;
  }

  function isComparing(id) {
    return getCompareList().includes(id);
  }

  // ========================================================================
  // CONFIGURAÇÃO GERAL
  // ========================================================================

  function getConfig() {
    const cfg = getLocalJson(STORAGE_KEYS.CONFIG, null);
    if (!cfg) {
      setLocalJson(STORAGE_KEYS.CONFIG, DEFAULT_CONFIG);
      return DEFAULT_CONFIG;
    }
    return { ...DEFAULT_CONFIG, ...cfg };
  }

  function saveConfig(cfg) {
    setLocalJson(STORAGE_KEYS.CONFIG, cfg);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('sartec:config-updated', { detail: { config: cfg } }));
    }
  }

  // ========================================================================
  // RESTAURAR DEMO ORIGINAL (FALLBACK TOTAL)
  // ========================================================================

  function resetDemoData() {
    try {
      localStorage.removeItem(STORAGE_KEYS.VEHICLES);
      localStorage.removeItem(STORAGE_KEYS.LEADS);
      localStorage.removeItem(STORAGE_KEYS.FAVORITES);
      localStorage.removeItem(STORAGE_KEYS.COMPARE);
      localStorage.removeItem(STORAGE_KEYS.CONFIG);
      
      setLocalJson(STORAGE_KEYS.VEHICLES, INITIAL_VEHICLES);
      setLocalJson(STORAGE_KEYS.LEADS, INITIAL_LEADS);
      setLocalJson(STORAGE_KEYS.CONFIG, DEFAULT_CONFIG);
      setLocalJson(STORAGE_KEYS.FAVORITES, []);
      setLocalJson(STORAGE_KEYS.COMPARE, []);

      console.log("[SartecStore] Dados originais de demonstração restaurados com sucesso.");
      return true;
    } catch (e) {
      console.error("[SartecStore] Falha ao resetar dados:", e);
      return false;
    }
  }

  // Carrega imediatamente os veículos disponíveis
  const currentVehicles = getVehicles();

  // Compatibilidade com código legado e novos módulos
  const SartecStore = {
    KEYS: STORAGE_KEYS,
    CONFIG: getConfig(),
    DEFAULT_CONFIG,
    INITIAL_VEHICLES,
    INITIAL_LEADS,
    formatCurrency,
    formatKm,
    calculateInstallment,
    getVehicles,
    saveVehicles,
    getVehicleById,
    updateVehicle,
    addVehicle,
    deleteVehicle,
    getLeads,
    saveLeads,
    addLead,
    updateLeadStatus,
    getFavorites,
    toggleFavorite,
    isFavorite,
    getCompareList,
    toggleCompare,
    isComparing,
    getConfig,
    saveConfig,
    resetDemoData
  };

  if (typeof window !== 'undefined') {
    window.SARTEC_STORE = SartecStore;
    window.SARTEC_CONFIG = SartecStore.CONFIG;
    window.SARTEC_VEHICLES = currentVehicles;
    window.getVehicleById = getVehicleById;
    window.formatCurrency = formatCurrency;
    window.formatKm = formatKm;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = SartecStore;
  }
})();
