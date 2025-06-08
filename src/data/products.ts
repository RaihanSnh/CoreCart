import { Product } from '../store/useStore';

export const products: Product[] = [
  // AMD Processors
  {
    id: 'amd-ryzen-9-9950x',
    name: 'AMD Ryzen 9 9950X',
    price: 9000000,
    originalPrice: 10000000,
    image: 'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg',
    category: 'processors',
    brand: 'AMD',
    description: 'High-performance 16-core, 32-thread processor with advanced Zen 4 architecture. Perfect for gaming, content creation, and professional workloads.',
    specifications: {
      'Cores': '16',
      'Threads': '32',
      'Base Clock': '4.3 GHz',
      'Boost Clock': '5.7 GHz',
      'Cache': '80MB',
      'TDP': '170W',
      'Socket': 'AM5'
    },
    rating: 4.8,
    reviews: 245,
    inStock: true,
    discount: 10
  },
  {
    id: 'amd-ryzen-7-9800x',
    name: 'AMD Ryzen 7 9800X',
    price: 7500000,
    originalPrice: 8500000,
    image: 'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg',
    category: 'processors',
    brand: 'AMD',
    description: '8-core, 16-thread processor delivering exceptional performance for gaming and productivity tasks.',
    specifications: {
      'Cores': '8',
      'Threads': '16',
      'Base Clock': '4.5 GHz',
      'Boost Clock': '5.7 GHz',
      'Cache': '40MB',
      'TDP': '120W',
      'Socket': 'AM5'
    },
    rating: 4.7,
    reviews: 189,
    inStock: true,
    discount: 12
  },
  {
    id: 'amd-ryzen-5-7950x',
    name: 'AMD Ryzen 5 7950X',
    price: 5500000,
    image: 'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg',
    category: 'processors',
    brand: 'AMD',
    description: '6-core, 12-thread processor offering great value for mainstream gaming and productivity.',
    specifications: {
      'Cores': '6',
      'Threads': '12',
      'Base Clock': '4.5 GHz',
      'Boost Clock': '5.7 GHz',
      'Cache': '38MB',
      'TDP': '105W',
      'Socket': 'AM5'
    },
    rating: 4.6,
    reviews: 156,
    inStock: true
  },

  // Intel Processors
  {
    id: 'intel-i9-14900k',
    name: 'Intel Core i9-14900K',
    price: 10500000,
    originalPrice: 11500000,
    image: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg',
    category: 'processors',
    brand: 'Intel',
    description: 'Flagship Intel processor with 24 cores and 32 threads. Ultimate performance for gaming and professional applications.',
    specifications: {
      'Cores': '24 (8P+16E)',
      'Threads': '32',
      'Base Clock': '3.2 GHz',
      'Boost Clock': '6.0 GHz',
      'Cache': '36MB',
      'TDP': '125W',
      'Socket': 'LGA1700'
    },
    rating: 4.9,
    reviews: 312,
    inStock: true,
    discount: 9
  },
  {
    id: 'intel-i7-14700k',
    name: 'Intel Core i7-14700K',
    price: 8500000,
    image: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg',
    category: 'processors',
    brand: 'Intel',
    description: '20-core processor with excellent gaming and multitasking performance.',
    specifications: {
      'Cores': '20 (8P+12E)',
      'Threads': '28',
      'Base Clock': '3.4 GHz',
      'Boost Clock': '5.6 GHz',
      'Cache': '33MB',
      'TDP': '125W',
      'Socket': 'LGA1700'
    },
    rating: 4.7,
    reviews: 198,
    inStock: true
  },
  {
    id: 'intel-i5-14500k',
    name: 'Intel Core i5-14500K',
    price: 6000000,
    image: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg',
    category: 'processors',
    brand: 'Intel',
    description: 'Mid-range processor perfect for gaming and everyday computing tasks.',
    specifications: {
      'Cores': '14 (6P+8E)',
      'Threads': '20',
      'Base Clock': '3.5 GHz',
      'Boost Clock': '5.1 GHz',
      'Cache': '24MB',
      'TDP': '125W',
      'Socket': 'LGA1700'
    },
    rating: 4.5,
    reviews: 143,
    inStock: true
  },

  // Graphics Cards
  {
    id: 'rtx-4090',
    name: 'NVIDIA GeForce RTX 4090',
    price: 25000000,
    originalPrice: 27000000,
    image: 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg',
    category: 'graphics-cards',
    brand: 'NVIDIA',
    description: 'The ultimate graphics card for 4K gaming and professional content creation.',
    specifications: {
      'CUDA Cores': '16384',
      'Base Clock': '2230 MHz',
      'Boost Clock': '2520 MHz',
      'Memory': '24GB GDDR6X',
      'Memory Bus': '384-bit',
      'TDP': '450W'
    },
    rating: 4.9,
    reviews: 567,
    inStock: true,
    discount: 7
  },
  {
    id: 'rtx-4080',
    name: 'NVIDIA GeForce RTX 4080',
    price: 18000000,
    image: 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg',
    category: 'graphics-cards',
    brand: 'NVIDIA',
    description: 'High-end graphics card for excellent 4K gaming performance.',
    specifications: {
      'CUDA Cores': '9728',
      'Base Clock': '2205 MHz',
      'Boost Clock': '2505 MHz',
      'Memory': '16GB GDDR6X',
      'Memory Bus': '256-bit',
      'TDP': '320W'
    },
    rating: 4.8,
    reviews: 423,
    inStock: true
  },
  {
    id: 'rx-7900xtx',
    name: 'AMD Radeon RX 7900 XTX',
    price: 16000000,
    originalPrice: 17500000,
    image: 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg',
    category: 'graphics-cards',
    brand: 'AMD',
    description: 'Powerful AMD graphics card with excellent 4K gaming capabilities.',
    specifications: {
      'Stream Processors': '6144',
      'Game Clock': '2300 MHz',
      'Boost Clock': '2500 MHz',
      'Memory': '24GB GDDR6',
      'Memory Bus': '384-bit',
      'TDP': '355W'
    },
    rating: 4.7,
    reviews: 298,
    inStock: true,
    discount: 9
  },

  // Motherboards
  {
    id: 'asus-rog-x670e',
    name: 'ASUS ROG Crosshair X670E Hero',
    price: 8500000,
    image: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg',
    category: 'motherboards',
    brand: 'ASUS',
    description: 'Premium AM5 motherboard with advanced features for enthusiasts.',
    specifications: {
      'Socket': 'AM5',
      'Chipset': 'X670E',
      'Memory': 'DDR5-6400+',
      'PCIe': '5.0 x16',
      'USB': '3.2 Gen 2x2',
      'WiFi': 'WiFi 6E'
    },
    rating: 4.8,
    reviews: 156,
    inStock: true
  },
  {
    id: 'msi-z790-gaming',
    name: 'MSI MPG Z790 Gaming Plus',
    price: 4500000,
    image: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg',
    category: 'motherboards',
    brand: 'MSI',
    description: 'Feature-rich Z790 motherboard for Intel 13th gen processors.',
    specifications: {
      'Socket': 'LGA1700',
      'Chipset': 'Z790',
      'Memory': 'DDR5-7200+',
      'PCIe': '5.0 x16',
      'USB': '3.2 Gen 2',
      'WiFi': 'WiFi 6'
    },
    rating: 4.6,
    reviews: 234,
    inStock: true
  },

  // Memory
  {
    id: 'corsair-ddr5-32gb',
    name: 'Corsair Vengeance DDR5-6000 32GB',
    price: 3500000,
    originalPrice: 4000000,
    image: 'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg',
    category: 'memory',
    brand: 'Corsair',
    description: 'High-performance DDR5 memory kit for gaming and productivity.',
    specifications: {
      'Capacity': '32GB (2x16GB)',
      'Speed': 'DDR5-6000',
      'Latency': 'CL30',
      'Voltage': '1.35V',
      'Heat Spreader': 'Yes'
    },
    rating: 4.7,
    reviews: 189,
    inStock: true,
    discount: 12
  },

  // Storage
  {
    id: 'samsung-980-pro-2tb',
    name: 'Samsung 980 PRO 2TB NVMe SSD',
    price: 4500000,
    image: 'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg',
    category: 'storage',
    brand: 'Samsung',
    description: 'Ultra-fast PCIe 4.0 NVMe SSD for gaming and professional workloads.',
    specifications: {
      'Capacity': '2TB',
      'Interface': 'PCIe 4.0 x4',
      'Sequential Read': '7,000 MB/s',
      'Sequential Write': '6,900 MB/s',
      'Form Factor': 'M.2 2280'
    },
    rating: 4.9,
    reviews: 445,
    inStock: true
  }
];

export const categories = [
  { id: 'processors', name: 'Processors', icon: '🔧' },
  { id: 'graphics-cards', name: 'Graphics Cards', icon: '🎮' },
  { id: 'motherboards', name: 'Motherboards', icon: '🔌' },
  { id: 'memory', name: 'Memory', icon: '💾' },
  { id: 'storage', name: 'Storage', icon: '💿' },
  { id: 'cooling', name: 'Cooling', icon: '❄️' },
  { id: 'power-supplies', name: 'Power Supplies', icon: '⚡' },
  { id: 'cases', name: 'Cases', icon: '📦' }
];

export const brands = ['AMD', 'Intel', 'NVIDIA', 'ASUS', 'MSI', 'Corsair', 'Samsung', 'Gigabyte'];