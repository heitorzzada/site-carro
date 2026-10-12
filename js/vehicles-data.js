/**
 * CATÁLOGO OFICIAL DE VEÍCULOS — SARTEC VEÍCULOS
 * Dados reais extraídos do estoque da Sartec Veículos (https://sartecveiculos.com.br/estoque/)
 * Endereço: Avenida Espírito Santo, 114, Planaltina do Paraná - PR
 * Telefone/WhatsApp oficial: (44) 9 9148-4162
 */

const SARTEC_CONFIG = {
  dealershipName: "Sartec Veículos",
  tagline: "Transparência, Segurança e Qualidade em Seminovos",
  description: "Na Sartec Veículos, nossa missão vai além de vender carros: queremos transformar a experiência de compra em algo transparente, seguro e satisfatório.",
  phone: "(44) 9 9148-4162",
  phoneRaw: "554491484162",
  email: "contato@sartecveiculos.com.br",
  address: "Avenida Espírito Santo, 114 (cruzamento com a Av. Paraná)",
  city: "Planaltina do Paraná",
  state: "PR",
  cep: "87860-000",
  hoursWeekday: "Segunda a Sexta: 08:00 às 18:00",
  hoursWeekend: "Sábado: 08:00 às 12:30",
  instagramUrl: "https://www.instagram.com/sartec_veiculos/",
  officialSiteUrl: "https://sartecveiculos.com.br",
  logoUrl: "https://sartecveiculos.com.br/wp-content/uploads/2025/07/Logo-Sartec-Veiculos-_fundo-transparente_-e1753331438782.webp",
  faviconUrl: "https://sartecveiculos.com.br/wp-content/uploads/2026/07/cropped-Sartec-Favicon-32x32.png"
};

const SARTEC_VEHICLES = [
  {
    id: "car-8450",
    brand: "CHEVROLET",
    model: "Cruze LT",
    fullName: "CHEVROLET Cruze LT",
    version: "1.8 Ecotec 16V Flex",
    year: 2014,
    km: 180000,
    kmFormatted: "180.000 km",
    price: 58900,
    priceFormatted: "R$ 58.900,00",
    transmission: "Automático",
    fuel: "Flex",
    category: "Sedan",
    color: "Prata",
    plateEnd: "8",
    doors: 4,
    images: [
      "https://sartecveiculos.com.br/wp-content/uploads/2026/10/WhatsApp-Image-2026-10-09-at-8.47.08-AM.jpeg"
    ],
    features: [
      "Ar Condicionado Digital",
      "Direção Elétrica",
      "Bancos em Couro",
      "Central Multimídia MyLink",
      "Piloto Automático",
      "Controle de Estabilidade e Tração",
      "Airbags Frontais e Laterais",
      "Freios ABS com EBD",
      "Rodas de Liga Leve Aro 17",
      "Vidros e Travas Elétricas nas 4 Portas"
    ],
    detailsUrl: "https://sartecveiculos.com.br/carro/cruze-lt/"
  },
  {
    id: "car-8443",
    brand: "CHEVROLET",
    model: "S10",
    fullName: "CHEVROLET S10",
    version: "2.8 Turbo Diesel 4x4 Cabine Dupla",
    year: 2005,
    km: 400000,
    kmFormatted: "400.000 km",
    price: 61900,
    priceFormatted: "R$ 61.900,00",
    transmission: "Manual",
    fuel: "Diesel",
    category: "Picape",
    color: "Prata",
    plateEnd: "4",
    doors: 4,
    images: [
      "https://sartecveiculos.com.br/wp-content/uploads/2026/10/WhatsApp-Image-2026-10-06-at-5.04.54-PM.jpeg"
    ],
    features: [
      "Tração 4x4 com Reduzida",
      "Motor Turbo Diesel MWM",
      "Ar Condicionado",
      "Direção Hidráulica",
      "Vidros Elétricos",
      "Travas Elétricas",
      "Capota Marítima",
      "Protetor de Caçamba",
      "Faróis de Neblina",
      "Engate Traseiro"
    ],
    detailsUrl: "https://sartecveiculos.com.br/carro/s10-3/"
  },
  {
    id: "car-8424",
    brand: "CHEVROLET",
    model: "Cruze LTZ",
    fullName: "CHEVROLET Cruze LTZ",
    version: "1.4 Turbo Ecotec Flex",
    year: 2019,
    km: 96000,
    kmFormatted: "96.000 km",
    price: 92900,
    priceFormatted: "R$ 92.900,00",
    transmission: "Automático",
    fuel: "Flex",
    category: "Sedan",
    color: "Cinza Satin Steel",
    plateEnd: "7",
    doors: 4,
    images: [
      "https://sartecveiculos.com.br/wp-content/uploads/2026/10/WhatsApp-Image-2026-10-06-at-6.37.21-PM-1.jpeg"
    ],
    features: [
      "Motor 1.4 Turbo 153cv",
      "Câmbio Automático de 6 Marchas",
      "Partida Remota na Chave Presencial",
      "Sensor de Estacionamento Dianteiro e Traseiro",
      "Câmera de Ré com Linhas Guias",
      "Bancos em Couro",
      "Multimídia MyLink com Apple CarPlay e Android Auto",
      "Alerta de Ponto Cego",
      "Faróis com Sensor Crepuscular e DRL"
    ],
    detailsUrl: "https://sartecveiculos.com.br/carro/cruze-ltz-2/"
  },
  {
    id: "car-8399",
    brand: "TOYOTA",
    model: "Hilux",
    fullName: "TOYOTA Hilux",
    version: "3.0 Turbo Diesel 4x4",
    year: 1999,
    km: 479000,
    kmFormatted: "479.000 km",
    price: 59900,
    priceFormatted: "R$ 59.900,00",
    transmission: "Manual",
    fuel: "Diesel",
    category: "Picape",
    color: "Prata",
    plateEnd: "2",
    doors: 4,
    images: [
      "https://sartecveiculos.com.br/wp-content/uploads/2026/10/WhatsApp-Image-2026-10-06-at-5.33.57-PM.jpeg"
    ],
    features: [
      "Tração 4x4 com Reduzida",
      "Motor Toyota Turbo Diesel",
      "Ar Condicionado",
      "Direção Hidráulica",
      "Vidros Elétricos",
      "Protetor de Caçamba",
      "Pneus em Bom Estado",
      "Revisada"
    ],
    detailsUrl: "https://sartecveiculos.com.br/carro/hilux/"
  },
  {
    id: "car-8379",
    brand: "VOLKSWAGEN",
    model: "Voyage",
    fullName: "VOLKSWAGEN Voyage",
    version: "1.6 Total Flex",
    year: 2010,
    km: 243000,
    kmFormatted: "243.000 km",
    price: 29990,
    priceFormatted: "R$ 29.990,00",
    transmission: "Manual",
    fuel: "Flex",
    category: "Sedan",
    color: "Prata",
    plateEnd: "9",
    doors: 4,
    images: [
      "https://sartecveiculos.com.br/wp-content/uploads/2026/10/WhatsApp-Image-2026-10-06-at-2.55.33-PM.jpeg"
    ],
    features: [
      "Motor 1.6 Flex",
      "Ar Condicionado",
      "Direção Hidráulica",
      "Vidros Elétricos Dianteiros",
      "Travas Elétricas",
      "Porta-malas de 480 Litros",
      "Econômico e Confiável"
    ],
    detailsUrl: "https://sartecveiculos.com.br/carro/voyage-2/"
  },
  {
    id: "car-8354",
    brand: "CHEVROLET",
    model: "S10",
    fullName: "CHEVROLET S10",
    version: "High Country 2.8 Turbo Diesel 4x4",
    year: 2024,
    km: 80000,
    kmFormatted: "80.000 km",
    price: 195900,
    priceFormatted: "R$ 195.900,00",
    transmission: "Automático",
    fuel: "Diesel",
    category: "Picape",
    color: "Branco Perolizado",
    plateEnd: "1",
    doors: 4,
    images: [
      "https://sartecveiculos.com.br/wp-content/uploads/2026/10/WhatsApp-Image-2026-10-05-at-3.08.48-PM.jpeg"
    ],
    features: [
      "Versão High Country Topo de Linha",
      "Motor 2.8 Turbo Diesel 200cv",
      "Câmbio Automático de 6 Marchas",
      "Tração 4x4 com Acionamento Eletrônico",
      "Bancos em Couro com Ajuste Elétrico",
      "Central Multimídia MyLink com Apple CarPlay e Android Auto",
      "Alerta de Colisão Frontal e Saída de Faixa",
      "Câmera de Ré e Sensores de Estacionamento",
      "Capota Marítima Rígida Exclusiva"
    ],
    detailsUrl: "https://sartecveiculos.com.br/carro/s10-2/"
  },
  {
    id: "car-8269",
    brand: "CHEVROLET",
    model: "Onix LTZ",
    fullName: "CHEVROLET Onix LTZ",
    version: "1.0 Turbo Flex",
    year: 2024,
    km: 83000,
    kmFormatted: "83.000 km",
    price: 86990,
    priceFormatted: "R$ 86.990,00",
    transmission: "Automático",
    fuel: "Flex",
    category: "Hatch",
    color: "Preto",
    plateEnd: "5",
    doors: 4,
    images: [
      "https://sartecveiculos.com.br/wp-content/uploads/2026/10/WhatsApp-Image-2026-10-02-at-2.29.47-PM.jpeg"
    ],
    features: [
      "Motor 1.0 Turbo 116cv",
      "Câmbio Automático de 6 Marchas",
      "Chave Presencial com Partida por Botão",
      "Carregador de Celular por Indução",
      "Central Multimídia MyLink",
      "6 Airbags (Frontais, Laterais e de Cortina)",
      "Assistente de Partida em Rampas",
      "Controle de Estabilidade e Tração"
    ],
    detailsUrl: "https://sartecveiculos.com.br/carro/onix-ltz/"
  },
  {
    id: "car-8237",
    brand: "RENAULT",
    model: "Duster",
    fullName: "RENAULT Duster",
    version: "Dynamique 1.6 16V Flex",
    year: 2016,
    km: 153000,
    kmFormatted: "153.000 km",
    price: 59900,
    priceFormatted: "R$ 59.900,00",
    transmission: "Manual",
    fuel: "Flex",
    category: "SUV",
    color: "Marrom",
    plateEnd: "3",
    doors: 4,
    images: [
      "https://sartecveiculos.com.br/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-29-at-2.23.51-PM.jpeg"
    ],
    features: [
      "Amplo Porta-malas de 475 Litros",
      "Excelente Altura do Solo",
      "Central Multimídia Media NAV",
      "Piloto Automático",
      "Sensor de Estacionamento Traseiro",
      "Faróis de Neblina",
      "Rodas de Liga Leve Aro 16",
      "Vidros Elétricos nas 4 Portas"
    ],
    detailsUrl: "https://sartecveiculos.com.br/carro/duster-2/"
  },
  {
    id: "car-8154",
    brand: "CHEVROLET",
    model: "Cruze",
    fullName: "CHEVROLET Cruze",
    version: "LT 1.8 Ecotec Flex",
    year: 2014,
    km: 203000,
    kmFormatted: "203.000 km",
    price: 63990,
    priceFormatted: "R$ 63.990,00",
    transmission: "Automático",
    fuel: "Flex",
    category: "Sedan",
    color: "Branco",
    plateEnd: "0",
    doors: 4,
    images: [
      "https://sartecveiculos.com.br/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-24-at-5.15.15-PM.jpeg"
    ],
    features: [
      "Câmbio Automático de 6 Marchas",
      "Bancos com Revestimento em Couro",
      "Central Multimídia MyLink",
      "Ar Condicionado Digital",
      "Piloto Automático",
      "Controle de Estabilidade",
      "Airbags e Freios ABS"
    ],
    detailsUrl: "https://sartecveiculos.com.br/carro/cruze-3/"
  },
  {
    id: "car-8095",
    brand: "TOYOTA",
    model: "Corolla XRS",
    fullName: "TOYOTA Corolla XRS",
    version: "2.0 Dual VVT-i Flex",
    year: 2018,
    km: 190000,
    kmFormatted: "190.000 km",
    price: 94990,
    priceFormatted: "R$ 94.990,00",
    transmission: "Automático",
    fuel: "Flex",
    category: "Sedan",
    color: "Preto",
    plateEnd: "6",
    doors: 4,
    images: [
      "https://sartecveiculos.com.br/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-23-at-11.45.00-AM-1.jpeg"
    ],
    features: [
      "Versão Esportiva XRS com Spoiler e Saias",
      "Faróis em LED com DRL",
      "Câmbio CVT com Borboletas no Volante",
      "Motor 2.0 154cv",
      "Bancos em Couro Preto com Costura Vermelha",
      "7 Airbags de Série",
      "Central Multimídia com Câmera de Ré"
    ],
    detailsUrl: "https://sartecveiculos.com.br/carro/corolla-xrs/"
  },
  {
    id: "car-8077",
    brand: "FIAT",
    model: "Toro",
    fullName: "FIAT Toro",
    version: "Freedom 1.8 Flex AT6",
    year: 2018,
    km: 178000,
    kmFormatted: "178.000 km",
    price: 94900,
    priceFormatted: "R$ 94.900,00",
    transmission: "Automático",
    fuel: "Flex",
    category: "Picape",
    color: "Vermelho",
    plateEnd: "9",
    doors: 4,
    images: [
      "https://sartecveiculos.com.br/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-23-at-4.18.48-PM.jpeg"
    ],
    features: [
      "Câmbio Automático de 6 Marchas",
      "Tampa Traseira com Abertura Lateral Dupla",
      "Direção Elétrica",
      "Controle de Tração e Estabilidade",
      "Piloto Automático",
      "Multimídia Uconnect com Câmera de Ré",
      "Capota Marítima"
    ],
    detailsUrl: "https://sartecveiculos.com.br/carro/toro-2/"
  },
  {
    id: "car-8061",
    brand: "CHEVROLET",
    model: "Prisma",
    fullName: "CHEVROLET Prisma",
    version: "LT 1.4 Flex",
    year: 2014,
    km: 160000,
    kmFormatted: "160.000 km",
    price: 48900,
    priceFormatted: "R$ 48.900,00",
    transmission: "Manual",
    fuel: "Flex",
    category: "Sedan",
    color: "Prata",
    plateEnd: "1",
    doors: 4,
    images: [
      "https://sartecveiculos.com.br/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-21-at-5.49.18-PM.jpeg"
    ],
    features: [
      "Motor 1.4 SPE/4 Flex",
      "Porta-malas Amplo de 500 Litros",
      "Ar Condicionado",
      "Direção Hidráulica",
      "Vidros Elétricos Dianteiros",
      "Travas Elétricas",
      "Freios ABS e Airbags Frontais"
    ],
    detailsUrl: "https://sartecveiculos.com.br/carro/prisma-2/"
  },
  {
    id: "car-8042",
    brand: "JEEP",
    model: "Compass",
    fullName: "JEEP Compass",
    version: "Longitude 2.0 Flex AT6",
    year: 2021,
    km: 97000,
    kmFormatted: "97.000 km",
    price: 93900,
    priceFormatted: "R$ 93.900,00",
    transmission: "Automático",
    fuel: "Flex",
    category: "SUV",
    color: "Preto",
    plateEnd: "8",
    doors: 4,
    images: [
      "https://sartecveiculos.com.br/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-21-at-3.13.04-PM.jpeg"
    ],
    features: [
      "Motor 2.0 Tigershark Flex 166cv",
      "Câmbio Automático de 6 Marchas com Paddle Shift",
      "Bancos em Couro",
      "Central Multimídia Uconnect 8.4 Polegadas",
      "Ar Condicionado Digital Dual Zone",
      "Chave Presencial Keyless Enter 'n Go",
      "Rodas de Liga Leve Aro 18",
      "Faróis em LED"
    ],
    detailsUrl: "https://sartecveiculos.com.br/carro/compass-3/"
  },
  {
    id: "car-8021",
    brand: "VOLKSWAGEN",
    model: "Jetta",
    fullName: "VOLKSWAGEN Jetta",
    version: "Comfortline 1.4 TSI Turbo",
    year: 2017,
    km: 155000,
    kmFormatted: "155.000 km",
    price: 96900,
    priceFormatted: "R$ 96.900,00",
    transmission: "Automático",
    fuel: "Gasolina Turbo",
    category: "Sedan",
    color: "Branco",
    plateEnd: "5",
    doors: 4,
    images: [
      "https://sartecveiculos.com.br/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-18-at-5.42.53-PM-1.jpeg"
    ],
    features: [
      "Motor 1.4 Turbo TSI 150cv",
      "Câmbio Automático Tiptronic de 6 Marchas",
      "Controle de Estabilidade (ESC) e Tração (ASR)",
      "Central Multimídia com App-Connect",
      "Sensores de Estacionamento Dianteiros e Traseiros",
      "Bancos em Couro",
      "Volante Multifuncional com Paddle Shift"
    ],
    detailsUrl: "https://sartecveiculos.com.br/carro/jetta/"
  },
  {
    id: "car-8002",
    brand: "CHEVROLET",
    model: "Cruze Sport",
    fullName: "CHEVROLET Cruze Sport",
    version: "Sport6 LT 1.4 Turbo Flex",
    year: 2018,
    km: 171000,
    kmFormatted: "171.000 km",
    price: 88990,
    priceFormatted: "R$ 88.990,00",
    transmission: "Automático",
    fuel: "Flex",
    category: "Hatch",
    color: "Cinza",
    plateEnd: "4",
    doors: 4,
    images: [
      "https://sartecveiculos.com.br/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-18-at-5.11.56-PM.jpeg"
    ],
    features: [
      "Motor 1.4 Turbo Ecotec 153cv",
      "Câmbio Automático de 6 Marchas",
      "Carroceria Hatch Esportiva Sport6",
      "Sistema Start/Stop",
      "Controle Eletrônico de Tração e Estabilidade",
      "Assistente de Partida em Rampas",
      "Central Multimídia MyLink",
      "Rodas de Liga Leve Aro 17"
    ],
    detailsUrl: "https://sartecveiculos.com.br/carro/cruze-sport/"
  },
  {
    id: "car-7986",
    brand: "CHEVROLET",
    model: "Astra",
    fullName: "CHEVROLET Astra",
    version: "Advantage 2.0 MPFI Flex",
    year: 2005,
    km: 280000,
    kmFormatted: "280.000 km",
    price: 29900,
    priceFormatted: "R$ 29.900,00",
    transmission: "Manual",
    fuel: "Flex",
    category: "Hatch",
    color: "Prata",
    plateEnd: "7",
    doors: 4,
    images: [
      "https://sartecveiculos.com.br/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-18-at-4.26.50-PM.jpeg"
    ],
    features: [
      "Motor 2.0 Flex 8V",
      "Ar Condicionado",
      "Direção Hidráulica",
      "Vidros Elétricos",
      "Travas Elétricas",
      "Rodas de Liga Leve Originais",
      "Faróis com Máscara Negra"
    ],
    detailsUrl: "https://sartecveiculos.com.br/carro/astra/"
  },
  {
    id: "car-7970",
    brand: "RENAULT",
    model: "Duster",
    fullName: "RENAULT Duster",
    version: "Expression 1.6 16V Flex",
    year: 2015,
    km: 144000,
    kmFormatted: "144.000 km",
    price: 53900,
    priceFormatted: "R$ 53.900,00",
    transmission: "Manual",
    fuel: "Flex",
    category: "SUV",
    color: "Prata",
    plateEnd: "2",
    doors: 4,
    images: [
      "https://sartecveiculos.com.br/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-18-at-4.02.57-PM-1.jpeg"
    ],
    features: [
      "Amplo Espaço Interno e Porta-malas",
      "Ar Condicionado",
      "Direção Hidráulica",
      "Vidros Elétricos",
      "Som Original com Bluetooth e USB",
      "Barras Longitudinais de Teto",
      "Freios ABS e Airbags Frontais"
    ],
    detailsUrl: "https://sartecveiculos.com.br/carro/duster/"
  },
  {
    id: "car-7943",
    brand: "FIAT",
    model: "Strada",
    fullName: "FIAT Strada",
    version: "Working 1.4 Fire Cabine Simples",
    year: 2015,
    km: 160000,
    kmFormatted: "160.000 km",
    price: 39990,
    priceFormatted: "R$ 39.990,00",
    transmission: "Manual",
    fuel: "Flex",
    category: "Picape",
    color: "Branco",
    plateEnd: "3",
    doors: 2,
    images: [
      "https://sartecveiculos.com.br/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-17-at-5.24.31-PM.jpeg"
    ],
    features: [
      "Motor 1.4 Fire Econômico",
      "Caçamba Grande com Protetor",
      "Ar Condicionado",
      "Direção Hidráulica",
      "Vidros Elétricos",
      "Grade Protetora de Vidro Traseiro",
      "Ideal para Trabalho"
    ],
    detailsUrl: "https://sartecveiculos.com.br/carro/strada-3/"
  },
  {
    id: "car-7533",
    brand: "VOLKSWAGEN",
    model: "Santana",
    fullName: "VOLKSWAGEN Santana",
    version: "Confort 1.8 Gasolina",
    year: 2003,
    km: 239000,
    kmFormatted: "239.000 km",
    price: 19990,
    priceFormatted: "R$ 19.990,00",
    transmission: "Manual",
    fuel: "Gasolina",
    category: "Sedan",
    color: "Prata",
    plateEnd: "6",
    doors: 4,
    images: [
      "https://sartecveiculos.com.br/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-01-at-3.11.52-PM-1.jpeg"
    ],
    features: [
      "Motor AP 1.8 Confiável",
      "Ar Condicionado",
      "Direção Hidráulica",
      "Vidros Elétricos",
      "Travas Elétricas",
      "Amplo Espaço Interno e Conforto de Rodagem"
    ],
    detailsUrl: "https://sartecveiculos.com.br/carro/santana/"
  },
  {
    id: "car-7334",
    brand: "VOLKSWAGEN",
    model: "T-Cross",
    fullName: "VOLKSWAGEN T-Cross",
    version: "200 TSI 1.0 Turbo Flex",
    year: 2021,
    km: 120000,
    kmFormatted: "120.000 km",
    price: 92900,
    priceFormatted: "R$ 92.900,00",
    transmission: "Automático",
    fuel: "Flex",
    category: "SUV",
    color: "Branco",
    plateEnd: "7",
    doors: 4,
    images: [
      "https://sartecveiculos.com.br/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-25-at-2.51.05-PM.jpeg"
    ],
    features: [
      "Motor 200 TSI Turbo Flex",
      "Câmbio Automático de 6 Marchas Tiptronic",
      "Central Multimídia VW Play de 10.1 Polegadas",
      "6 Airbags de Série",
      "Controle de Tração e Estabilidade",
      "Faróis de Neblina com Luz de Conversão",
      "Rodas de Liga Leve Aro 16",
      "Sensor de Estacionamento Traseiro"
    ],
    detailsUrl: "https://sartecveiculos.com.br/carro/t-cross-2/"
  },
  {
    id: "car-7318",
    brand: "TOYOTA",
    model: "Corolla",
    fullName: "TOYOTA Corolla",
    version: "XEi 2.0 Dynamic Force Flex",
    year: 2020,
    km: 48000,
    kmFormatted: "48.000 km",
    price: 119990,
    priceFormatted: "R$ 119.990,00",
    transmission: "Automático",
    fuel: "Flex",
    category: "Sedan",
    color: "Prata",
    plateEnd: "1",
    doors: 4,
    images: [
      "https://sartecveiculos.com.br/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-24-at-4.01.57-PM.jpeg"
    ],
    features: [
      "Motor 2.0 Dynamic Force 177cv",
      "Câmbio Direct Shift CVT de 10 Marchas",
      "Apenas 48.000 km Rodados",
      "Chave Presencial Smart Entry e Botão Start/Stop",
      "Faróis em LED com Acendimento Automático",
      "Bancos em Couro Preto",
      "Central Multimídia Toyota com Apple CarPlay e Android Auto",
      "Controle de Estabilidade e Assistente de Rampas"
    ],
    detailsUrl: "https://sartecveiculos.com.br/carro/corolla/"
  },
  {
    id: "car-7302",
    brand: "FORD",
    model: "Ecosport",
    fullName: "FORD Ecosport",
    version: "Titanium 2.0 Flex AT",
    year: 2013,
    km: 178000,
    kmFormatted: "178.000 km",
    price: 51900,
    priceFormatted: "R$ 51.900,00",
    transmission: "Automático",
    fuel: "Flex",
    category: "SUV",
    color: "Prata",
    plateEnd: "5",
    doors: 4,
    images: [
      "https://sartecveiculos.com.br/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-24-at-3.40.49-PM.jpeg"
    ],
    features: [
      "Versão Topo de Linha Titanium",
      "Motor Duratec 2.0 16V",
      "Câmbio Automático de 6 Marchas",
      "Bancos em Couro",
      "Chave Presencial com Partida no Botão Ford Power",
      "Sistema de Som SYNC com Bluetooth e Comandos de Voz",
      "Sensor de Estacionamento Traseiro",
      "Faróis de Neblina e Rodas de Liga Leve Aro 16"
    ],
    detailsUrl: "https://sartecveiculos.com.br/carro/ecosport-2/"
  },
  {
    id: "car-7286",
    brand: "TOYOTA",
    model: "Etios",
    fullName: "TOYOTA Etios",
    version: "Sedan XLS 1.5 Flex",
    year: 2018,
    km: 134000,
    kmFormatted: "134.000 km",
    price: 65990,
    priceFormatted: "R$ 65.990,00",
    transmission: "Automático",
    fuel: "Flex",
    category: "Sedan",
    color: "Prata",
    plateEnd: "4",
    doors: 4,
    images: [
      "https://sartecveiculos.com.br/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-24-at-3.01.44-PM.jpeg"
    ],
    features: [
      "Câmbio Automático Confiável",
      "Motor 1.5 Dual VVT-i Muito Econômico",
      "Porta-malas Gigante de 562 Litros",
      "Painel Digital Toyota Smart Screen",
      "Ar Condicionado",
      "Direção Elétrica",
      "Vidros Elétricos nas 4 Portas",
      "Controles de Som no Volante"
    ],
    detailsUrl: "https://sartecveiculos.com.br/carro/etios/"
  },
  {
    id: "car-7260",
    brand: "HONDA",
    model: "Civic",
    fullName: "HONDA Civic",
    version: "LXR 2.0 i-VTEC Flex",
    year: 2014,
    km: 203000,
    kmFormatted: "203.000 km",
    price: 66900,
    priceFormatted: "R$ 66.900,00",
    transmission: "Automático",
    fuel: "Flex",
    category: "Sedan",
    color: "Preto",
    plateEnd: "9",
    doors: 4,
    images: [
      "https://sartecveiculos.com.br/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-21-at-6.13.22-PM-1.jpeg"
    ],
    features: [
      "Motor 2.0 i-VTEC Flex 155cv",
      "Câmbio Automático de 5 Marchas com Borboletas no Volante",
      "Bancos com Revestimento em Couro Original",
      "Câmera de Marcha a Ré Integrada no Painel i-MID",
      "Ar Condicionado Digital Automático",
      "Piloto Automático",
      "Modo Econ de Condução Econômica",
      "Rodas de Liga Leve Aro 16 Diamantadas"
    ],
    detailsUrl: "https://sartecveiculos.com.br/carro/civic/"
  }
];

// Normalização das URLs locais para manter navegação 100% no projeto
SARTEC_VEHICLES.forEach(car => {
  car.officialExternalUrl = car.detailsUrl;
  car.detailsUrl = `veiculo.html?id=${encodeURIComponent(car.id)}`;
  car.localUrl = `veiculo.html?id=${encodeURIComponent(car.id)}`;
});

// Funções utilitárias do Catálogo
function getVehicleById(id) {
  if (!id) return null;
  return SARTEC_VEHICLES.find(car => car.id === id) || null;
}

function getFeaturedVehicles(limit = 4) {
  // Seleção de 4 destaques representativos e procurados no pátio
  const featuredIds = ["car-7318", "car-8354", "car-8042", "car-8424"];
  const list = [];
  featuredIds.forEach(id => {
    const v = getVehicleById(id);
    if (v) list.push(v);
  });
  if (list.length < limit) {
    SARTEC_VEHICLES.forEach(v => {
      if (!list.find(x => x.id === v.id) && list.length < limit) {
        list.push(v);
      }
    });
  }
  return list.slice(0, limit);
}

if (typeof window !== "undefined") {
  window.SARTEC_VEHICLES = SARTEC_VEHICLES;
  window.SARTEC_CONFIG = SARTEC_CONFIG;
  window.getVehicleById = getVehicleById;
  window.getFeaturedVehicles = getFeaturedVehicles;
}
