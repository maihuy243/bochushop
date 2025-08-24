export interface Collection {
  id: string;
  handle: string;
  title: string;
  heroImage: string;
  description: string;
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  price: number;
  currency: string;
  images: string[];
  specs: { label: string; value: string }[];
  badges?: string[];
  sku: string;
  stock: number;
  collectionId: string;
  tags: string[];
  description?: string;
}

export const collections: Collection[] = [
  {
    id: 'lens-series',
    handle: 'lens-series',
    title: 'Lens Series',
    heroImage: 'https://picsum.photos/seed/lens-hero/1200/400',
    description: 'High-precision optical components for industrial laser applications. Our lens series offers superior clarity and durability.'
  },
  {
    id: 'nozzle-series', 
    handle: 'nozzle-series',
    title: 'Nozzle Series',
    heroImage: 'https://picsum.photos/seed/nozzle-hero/1200/400',
    description: 'Advanced nozzle systems engineered for optimal performance in cutting and welding applications.'
  },
  {
    id: 'spare-parts',
    handle: 'spare-parts',
    title: 'Spare Parts & Consumables',
    heroImage: 'https://picsum.photos/seed/parts-hero/1200/400',
    description: 'Essential components and consumables to keep your industrial equipment running at peak performance.'
  }
];

export const products: Product[] = [
  // Lens Series Products
  {
    id: 'lens-001',
    handle: 'upper-protection-lens',
    title: 'Upper Protection Lens',
    price: 89.99,
    currency: 'USD',
    images: [
      'https://picsum.photos/seed/lens-001-1/800/800',
      'https://picsum.photos/seed/lens-001-2/800/800',
      'https://picsum.photos/seed/lens-001-3/800/800'
    ],
    specs: [
      { label: 'Material', value: 'Quartz Glass' },
      { label: 'Diameter', value: '25.4mm' },
      { label: 'Thickness', value: '3.0mm' },
      { label: 'Coating', value: 'AR Coated' }
    ],
    badges: ['Popular'],
    sku: 'UPL-001',
    stock: 45,
    collectionId: 'lens-series',
    tags: ['protection', 'quartz', 'coated'],
    description: 'Premium upper protection lens designed for high-power laser applications.'
  },
  {
    id: 'lens-002',
    handle: 'focus-cartridge',
    title: 'Focus Cartridge Assembly',
    price: 156.50,
    currency: 'USD',
    images: [
      'https://picsum.photos/seed/lens-002-1/800/800',
      'https://picsum.photos/seed/lens-002-2/800/800'
    ],
    specs: [
      { label: 'Focal Length', value: '127mm' },
      { label: 'Material', value: 'ZnSe' },
      { label: 'Thread', value: 'M32x0.75' },
      { label: 'Operating Temp', value: '-40°C to +200°C' }
    ],
    sku: 'FCA-002',
    stock: 23,
    collectionId: 'lens-series',
    tags: ['focus', 'cartridge', 'znse'],
    description: 'High-precision focus cartridge for optimal beam control and cutting performance.'
  },
  {
    id: 'lens-003',
    handle: 'lower-protection-lens',
    title: 'Lower Protection Lens',
    price: 67.25,
    currency: 'USD',
    images: [
      'https://picsum.photos/seed/lens-003-1/800/800',
      'https://picsum.photos/seed/lens-003-2/800/800'
    ],
    specs: [
      { label: 'Material', value: 'Borosilicate Glass' },
      { label: 'Diameter', value: '20mm' },
      { label: 'Thickness', value: '2.0mm' }
    ],
    badges: ['Best Seller'],
    sku: 'LPL-003',
    stock: 67,
    collectionId: 'lens-series',
    tags: ['protection', 'borosilicate'],
    description: 'Durable lower protection lens for debris shielding in cutting applications.'
  },
  {
    id: 'lens-004',
    handle: 'collimating-lens',
    title: 'Collimating Lens',
    price: 234.80,
    currency: 'USD',
    images: [
      'https://picsum.photos/seed/lens-004-1/800/800',
      'https://picsum.photos/seed/lens-004-2/800/800',
      'https://picsum.photos/seed/lens-004-3/800/800'
    ],
    specs: [
      { label: 'Focal Length', value: '50mm' },
      { label: 'Material', value: 'ZnSe' },
      { label: 'Beam Diameter', value: '8mm' },
      { label: 'Wavelength', value: '10.6µm' }
    ],
    sku: 'CL-004',
    stock: 12,
    collectionId: 'lens-series',
    tags: ['collimating', 'znse', 'precision'],
    description: 'Precision collimating lens for beam shaping and parallel light generation.'
  },
  {
    id: 'lens-005',
    handle: 'beam-expander-lens',
    title: 'Beam Expander Lens',
    price: 198.75,
    currency: 'USD',
    images: [
      'https://picsum.photos/seed/lens-005-1/800/800',
      'https://picsum.photos/seed/lens-005-2/800/800'
    ],
    specs: [
      { label: 'Expansion Ratio', value: '3x' },
      { label: 'Input Beam', value: '2-6mm' },
      { label: 'Material', value: 'ZnSe' },
      { label: 'Mount', value: 'C-Mount' }
    ],
    sku: 'BEL-005',
    stock: 18,
    collectionId: 'lens-series',
    tags: ['expander', 'beam', 'mount'],
    description: 'High-quality beam expander for increasing beam diameter while maintaining collimation.'
  },
  {
    id: 'lens-006',
    handle: 'focusing-lens-assembly',
    title: 'Focusing Lens Assembly',
    price: 312.40,
    currency: 'USD',
    images: [
      'https://picsum.photos/seed/lens-006-1/800/800',
      'https://picsum.photos/seed/lens-006-2/800/800',
      'https://picsum.photos/seed/lens-006-3/800/800'
    ],
    specs: [
      { label: 'Focal Length', value: '190.5mm' },
      { label: 'Material', value: 'ZnSe' },
      { label: 'Clear Aperture', value: '38mm' },
      { label: 'Coating', value: 'AR/AR' }
    ],
    badges: ['Professional'],
    sku: 'FLA-006',
    stock: 8,
    collectionId: 'lens-series',
    tags: ['focusing', 'assembly', 'professional'],
    description: 'Complete focusing lens assembly for industrial laser cutting systems.'
  },
  {
    id: 'lens-007',
    handle: 'protective-glass-plate',
    title: 'Protective Glass Plate',
    price: 45.60,
    currency: 'USD',
    images: [
      'https://picsum.photos/seed/lens-007-1/800/800'
    ],
    specs: [
      { label: 'Material', value: 'Tempered Glass' },
      { label: 'Dimensions', value: '50x50x5mm' },
      { label: 'Surface Quality', value: '60-40' }
    ],
    sku: 'PGP-007',
    stock: 156,
    collectionId: 'lens-series',
    tags: ['protection', 'glass', 'plate'],
    description: 'Durable protective glass plate for equipment safety and visibility.'
  },
  {
    id: 'lens-008',
    handle: 'precision-focus-unit',
    title: 'Precision Focus Unit',
    price: 278.90,
    currency: 'USD',
    images: [
      'https://picsum.photos/seed/lens-008-1/800/800',
      'https://picsum.photos/seed/lens-008-2/800/800'
    ],
    specs: [
      { label: 'Travel Range', value: '25mm' },
      { label: 'Resolution', value: '0.01mm' },
      { label: 'Material', value: 'Anodized Aluminum' },
      { label: 'Thread', value: 'M32x0.75' }
    ],
    sku: 'PFU-008',
    stock: 15,
    collectionId: 'lens-series',
    tags: ['precision', 'focus', 'aluminum'],
    description: 'High-precision focus adjustment unit with micro-step control.'
  },

  // Nozzle Series Products
  {
    id: 'nozzle-001',
    handle: '2d-nozzle-head',
    title: '2D Nozzle Head',
    price: 145.30,
    currency: 'USD',
    images: [
      'https://picsum.photos/seed/nozzle-001-1/800/800',
      'https://picsum.photos/seed/nozzle-001-2/800/800'
    ],
    specs: [
      { label: 'Orifice Diameter', value: '1.5mm' },
      { label: 'Material', value: 'Brass' },
      { label: 'Thread', value: 'M16x1.0' },
      { label: 'Working Pressure', value: '15 bar' }
    ],
    badges: ['Popular'],
    sku: '2DNH-001',
    stock: 34,
    collectionId: 'nozzle-series',
    tags: ['2d', 'brass', 'cutting'],
    description: 'Standard 2D nozzle head for general cutting applications.'
  },
  {
    id: 'nozzle-002',
    handle: 'angled-tube-nozzle',
    title: 'Angled Tube Nozzle',
    price: 98.75,
    currency: 'USD',
    images: [
      'https://picsum.photos/seed/nozzle-002-1/800/800',
      'https://picsum.photos/seed/nozzle-002-2/800/800'
    ],
    specs: [
      { label: 'Angle', value: '15°' },
      { label: 'Length', value: '45mm' },
      { label: 'Material', value: 'Stainless Steel' },
      { label: 'Inner Diameter', value: '2.0mm' }
    ],
    sku: 'ATN-002',
    stock: 28,
    collectionId: 'nozzle-series',
    tags: ['angled', 'tube', 'steel'],
    description: 'Angled nozzle design for hard-to-reach cutting areas.'
  },
  {
    id: 'nozzle-003',
    handle: 'high-precision-nozzle',
    title: 'High-Precision Nozzle',
    price: 187.60,
    currency: 'USD',
    images: [
      'https://picsum.photos/seed/nozzle-003-1/800/800',
      'https://picsum.photos/seed/nozzle-003-2/800/800',
      'https://picsum.photos/seed/nozzle-003-3/800/800'
    ],
    specs: [
      { label: 'Tolerance', value: '±0.005mm' },
      { label: 'Surface Finish', value: 'Ra 0.2' },
      { label: 'Material', value: 'Tungsten Carbide' },
      { label: 'Coating', value: 'DLC' }
    ],
    badges: ['Premium'],
    sku: 'HPN-003',
    stock: 12,
    collectionId: 'nozzle-series',
    tags: ['precision', 'tungsten', 'premium'],
    description: 'Ultra-precise nozzle for high-accuracy cutting operations.'
  },
  {
    id: 'nozzle-004',
    handle: 'multi-direction-nozzle',
    title: 'Multi-Direction Nozzle',
    price: 223.45,
    currency: 'USD',
    images: [
      'https://picsum.photos/seed/nozzle-004-1/800/800',
      'https://picsum.photos/seed/nozzle-004-2/800/800'
    ],
    specs: [
      { label: 'Directions', value: '8-way' },
      { label: 'Rotation', value: '360°' },
      { label: 'Material', value: 'Titanium Alloy' },
      { label: 'Operating Temp', value: 'Up to 500°C' }
    ],
    sku: 'MDN-004',
    stock: 9,
    collectionId: 'nozzle-series',
    tags: ['multi-direction', 'titanium', 'rotation'],
    description: 'Versatile multi-directional nozzle for complex cutting patterns.'
  },
  {
    id: 'nozzle-005',
    handle: 'calibrated-nozzle-set',
    title: 'Calibrated Nozzle Set',
    price: 356.80,
    currency: 'USD',
    images: [
      'https://picsum.photos/seed/nozzle-005-1/800/800',
      'https://picsum.photos/seed/nozzle-005-2/800/800'
    ],
    specs: [
      { label: 'Set Size', value: '5 pieces' },
      { label: 'Diameters', value: '0.8, 1.0, 1.2, 1.5, 2.0mm' },
      { label: 'Calibration', value: 'Factory Certified' },
      { label: 'Material', value: 'Hardened Steel' }
    ],
    badges: ['Value Pack'],
    sku: 'CNS-005',
    stock: 16,
    collectionId: 'nozzle-series',
    tags: ['set', 'calibrated', 'certified'],
    description: 'Complete set of factory-calibrated nozzles for various applications.'
  },
  {
    id: 'nozzle-006',
    handle: 'adjustable-flow-nozzle',
    title: 'Adjustable Flow Nozzle',
    price: 167.25,
    currency: 'USD',
    images: [
      'https://picsum.photos/seed/nozzle-006-1/800/800',
      'https://picsum.photos/seed/nozzle-006-2/800/800'
    ],
    specs: [
      { label: 'Flow Range', value: '0.5-5.0 L/min' },
      { label: 'Adjustment', value: 'Continuous' },
      { label: 'Material', value: 'Nickel-plated Brass' },
      { label: 'Connection', value: '1/4" NPT' }
    ],
    sku: 'AFN-006',
    stock: 22,
    collectionId: 'nozzle-series',
    tags: ['adjustable', 'flow', 'continuous'],
    description: 'Variable flow nozzle with continuous adjustment capability.'
  },

  // Spare Parts & Consumables
  {
    id: 'parts-001',
    handle: 'ceramic-body',
    title: 'Ceramic Body',
    price: 78.50,
    currency: 'USD',
    images: [
      'https://picsum.photos/seed/parts-001-1/800/800',
      'https://picsum.photos/seed/parts-001-2/800/800'
    ],
    specs: [
      { label: 'Material', value: 'Al2O3 Ceramic' },
      { label: 'Purity', value: '99.5%' },
      { label: 'Dimensions', value: '40x25x15mm' },
      { label: 'Tolerance', value: '±0.1mm' }
    ],
    sku: 'CB-001',
    stock: 87,
    collectionId: 'spare-parts',
    tags: ['ceramic', 'body', 'alumina'],
    description: 'High-purity ceramic body component for thermal insulation.'
  },
  {
    id: 'parts-002',
    handle: 'ceramic-lock-ring',
    title: 'Ceramic Lock Ring',
    price: 34.25,
    currency: 'USD',
    images: [
      'https://picsum.photos/seed/parts-002-1/800/800'
    ],
    specs: [
      { label: 'Inner Diameter', value: '12mm' },
      { label: 'Outer Diameter', value: '20mm' },
      { label: 'Material', value: 'ZrO2 Ceramic' },
      { label: 'Hardness', value: 'HV 1200' }
    ],
    badges: ['Best Seller'],
    sku: 'CLR-002',
    stock: 145,
    collectionId: 'spare-parts',
    tags: ['ceramic', 'ring', 'zirconia'],
    description: 'Durable ceramic lock ring for secure component mounting.'
  },
  {
    id: 'parts-003',
    handle: 'rf-cable-assembly',
    title: 'RF Cable Assembly',
    price: 123.75,
    currency: 'USD',
    images: [
      'https://picsum.photos/seed/parts-003-1/800/800',
      'https://picsum.photos/seed/parts-003-2/800/800'
    ],
    specs: [
      { label: 'Length', value: '2 meters' },
      { label: 'Impedance', value: '50 Ohm' },
      { label: 'Connectors', value: 'SMA Male/Female' },
      { label: 'Frequency Range', value: 'DC-18 GHz' }
    ],
    sku: 'RCA-003',
    stock: 56,
    collectionId: 'spare-parts',
    tags: ['rf', 'cable', 'sma'],
    description: 'High-frequency RF cable assembly for signal transmission.'
  },
  {
    id: 'parts-004',
    handle: 'spring-seal-kit',
    title: 'Spring Seal Kit',
    price: 45.90,
    currency: 'USD',
    images: [
      'https://picsum.photos/seed/parts-004-1/800/800'
    ],
    specs: [
      { label: 'Kit Contents', value: '10 seals + springs' },
      { label: 'Material', value: 'Viton + Stainless Steel' },
      { label: 'Temperature Range', value: '-40°C to +200°C' },
      { label: 'Pressure Rating', value: '20 bar' }
    ],
    sku: 'SSK-004',
    stock: 73,
    collectionId: 'spare-parts',
    tags: ['spring', 'seal', 'viton'],
    description: 'Complete seal kit with springs for maintenance operations.'
  },
  {
    id: 'parts-005',
    handle: 'signal-amplifier',
    title: 'Signal Amplifier',
    price: 289.60,
    currency: 'USD',
    images: [
      'https://picsum.photos/seed/parts-005-1/800/800',
      'https://picsum.photos/seed/parts-005-2/800/800',
      'https://picsum.photos/seed/parts-005-3/800/800'
    ],
    specs: [
      { label: 'Gain', value: '30 dB' },
      { label: 'Frequency Range', value: '1-6 GHz' },
      { label: 'Power Supply', value: '12V DC' },
      { label: 'Noise Figure', value: '2.5 dB' }
    ],
    badges: ['Professional'],
    sku: 'SA-005',
    stock: 19,
    collectionId: 'spare-parts',
    tags: ['amplifier', 'signal', 'professional'],
    description: 'High-performance signal amplifier for communication systems.'
  },
  {
    id: 'parts-006',
    handle: 'remote-control-unit',
    title: 'Remote Control Unit',
    price: 198.30,
    currency: 'USD',
    images: [
      'https://picsum.photos/seed/parts-006-1/800/800',
      'https://picsum.photos/seed/parts-006-2/800/800'
    ],
    specs: [
      { label: 'Range', value: '100 meters' },
      { label: 'Frequency', value: '2.4 GHz' },
      { label: 'Battery Life', value: '6 months' },
      { label: 'Channels', value: '8' }
    ],
    sku: 'RCU-006',
    stock: 31,
    collectionId: 'spare-parts',
    tags: ['remote', 'control', 'wireless'],
    description: 'Wireless remote control unit for equipment operation.'
  },
  {
    id: 'parts-007',
    handle: 'cutting-head-assembly',
    title: 'Cutting Head Assembly',
    price: 445.80,
    currency: 'USD',
    images: [
      'https://picsum.photos/seed/parts-007-1/800/800',
      'https://picsum.photos/seed/parts-007-2/800/800',
      'https://picsum.photos/seed/parts-007-3/800/800'
    ],
    specs: [
      { label: 'Max Power', value: '3kW' },
      { label: 'Focal Length', value: '127mm' },
      { label: 'Assist Gas', value: 'N2/O2/Air' },
      { label: 'Material Thickness', value: 'Up to 25mm' }
    ],
    badges: ['Industrial'],
    sku: 'CHA-007',
    stock: 7,
    collectionId: 'spare-parts',
    tags: ['cutting', 'head', 'industrial'],
    description: 'Complete cutting head assembly for industrial laser systems.'
  },
  {
    id: 'parts-008',
    handle: 'control-software-license',
    title: 'Control Software License',
    price: 567.25,
    currency: 'USD',
    images: [
      'https://picsum.photos/seed/parts-008-1/800/800'
    ],
    specs: [
      { label: 'License Type', value: 'Single User' },
      { label: 'Support Period', value: '1 Year' },
      { label: 'Updates', value: 'Included' },
      { label: 'Platforms', value: 'Windows 10/11' }
    ],
    sku: 'CSL-008',
    stock: 25,
    collectionId: 'spare-parts',
    tags: ['software', 'license', 'control'],
    description: 'Professional control software with full feature access.'
  },
  {
    id: 'parts-009',
    handle: 'precision-bearing-set',
    title: 'Precision Bearing Set',
    price: 156.40,
    currency: 'USD',
    images: [
      'https://picsum.photos/seed/parts-009-1/800/800',
      'https://picsum.photos/seed/parts-009-2/800/800'
    ],
    specs: [
      { label: 'Bearing Type', value: 'Deep Grove Ball' },
      { label: 'Precision Grade', value: 'ABEC-7' },
      { label: 'Material', value: 'Chrome Steel' },
      { label: 'Set Contents', value: '4 bearings' }
    ],
    sku: 'PBS-009',
    stock: 42,
    collectionId: 'spare-parts',
    tags: ['bearing', 'precision', 'steel'],
    description: 'High-precision bearing set for smooth operation.'
  },
  {
    id: 'parts-010',
    handle: 'temperature-sensor',
    title: 'Temperature Sensor',
    price: 87.65,
    currency: 'USD',
    images: [
      'https://picsum.photos/seed/parts-010-1/800/800'
    ],
    specs: [
      { label: 'Type', value: 'Thermocouple K' },
      { label: 'Range', value: '-200°C to +1000°C' },
      { label: 'Accuracy', value: '±0.5°C' },
      { label: 'Response Time', value: '1 second' }
    ],
    sku: 'TS-010',
    stock: 68,
    collectionId: 'spare-parts',
    tags: ['temperature', 'sensor', 'thermocouple'],
    description: 'Accurate temperature sensor for process monitoring.'
  },
  {
    id: 'parts-011',
    handle: 'calibration-tool-kit',
    title: 'Calibration Tool Kit',
    price: 234.50,
    currency: 'USD',
    images: [
      'https://picsum.photos/seed/parts-011-1/800/800',
      'https://picsum.photos/seed/parts-011-2/800/800'
    ],
    specs: [
      { label: 'Tools Included', value: '12 pieces' },
      { label: 'Calibration Standard', value: 'NIST Traceable' },
      { label: 'Case Material', value: 'Aluminum' },
      { label: 'Warranty', value: '2 years' }
    ],
    sku: 'CTK-011',
    stock: 18,
    collectionId: 'spare-parts',
    tags: ['calibration', 'tool', 'nist'],
    description: 'Complete calibration tool kit with NIST traceability.'
  },
  {
    id: 'parts-012',
    handle: 'safety-interlock-module',
    title: 'Safety Interlock Module',
    price: 178.90,
    currency: 'USD',
    images: [
      'https://picsum.photos/seed/parts-012-1/800/800',
      'https://picsum.photos/seed/parts-012-2/800/800'
    ],
    specs: [
      { label: 'Safety Rating', value: 'SIL 3' },
      { label: 'Inputs', value: '8 digital' },
      { label: 'Outputs', value: '4 relay' },
      { label: 'Response Time', value: '<10ms' }
    ],
    badges: ['Safety'],
    sku: 'SIM-012',
    stock: 35,
    collectionId: 'spare-parts',
    tags: ['safety', 'interlock', 'sil3'],
    description: 'Safety-rated interlock module for equipment protection.'
  }
];

export function getCollectionByHandle(handle: string): Collection | undefined {
  return collections.find(collection => collection.handle === handle);
}

export function getProductByHandle(handle: string): Product | undefined {
  return products.find(product => product.handle === handle);
}

export function getProductsByCollection(collectionId: string): Product[] {
  return products.filter(product => product.collectionId === collectionId);
}

export function searchProducts(query: string, collectionId?: string): Product[] {
  const searchIn = collectionId 
    ? getProductsByCollection(collectionId)
    : products;
    
  if (!query.trim()) return searchIn;
  
  const searchTerms = query.toLowerCase().split(' ');
  
  return searchIn.filter(product => {
    const searchableText = [
      product.title,
      product.description || '',
      ...product.tags,
      ...product.specs.map(spec => `${spec.label} ${spec.value}`)
    ].join(' ').toLowerCase();
    
    return searchTerms.every(term => searchableText.includes(term));
  });
}

export function filterProductsByTags(products: Product[], tags: string[]): Product[] {
  if (tags.length === 0) return products;
  
  return products.filter(product => 
    tags.some(tag => product.tags.includes(tag))
  );
}

export function sortProducts(products: Product[], sortBy: 'featured' | 'price-asc' | 'price-desc' | 'latest'): Product[] {
  const sorted = [...products];
  
  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'latest':
      return sorted.reverse(); // Assume products array is ordered by creation date
    case 'featured':
    default:
      // Prioritize badges like 'Popular', 'Best Seller', etc.
      return sorted.sort((a, b) => {
        const aHasBadge = a.badges && a.badges.length > 0;
        const bHasBadge = b.badges && b.badges.length > 0;
        if (aHasBadge && !bHasBadge) return -1;
        if (!aHasBadge && bHasBadge) return 1;
        return 0;
      });
  }
}