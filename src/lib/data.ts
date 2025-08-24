import { 
  collections, 
  products, 
  getCollectionByHandle, 
  getProductByHandle, 
  getProductsByCollection,
  searchProducts,
  filterProductsByTags,
  sortProducts,
  type Collection,
  type Product 
} from '@/data/seed';

// Simulate API delays for realistic loading states
const SIMULATE_DELAY = 100;

export async function getAllCollections(): Promise<Collection[]> {
  await new Promise(resolve => setTimeout(resolve, SIMULATE_DELAY));
  return collections;
}

export async function getCollection(handle: string): Promise<Collection | null> {
  await new Promise(resolve => setTimeout(resolve, SIMULATE_DELAY));
  return getCollectionByHandle(handle) || null;
}

export async function getProduct(handle: string): Promise<Product | null> {
  await new Promise(resolve => setTimeout(resolve, SIMULATE_DELAY));
  return getProductByHandle(handle) || null;
}

export async function getCollectionProducts(
  collectionId: string,
  {
    search = '',
    tags = [],
    sortBy = 'featured' as 'featured' | 'price-asc' | 'price-desc' | 'latest',
    page = 1,
    limit = 12
  } = {}
): Promise<{
  products: Product[];
  totalProducts: number;
  totalPages: number;
  currentPage: number;
}> {
  await new Promise(resolve => setTimeout(resolve, SIMULATE_DELAY));
  
  let filteredProducts = getProductsByCollection(collectionId);
  
  // Apply search
  if (search) {
    filteredProducts = searchProducts(search, collectionId);
  }
  
  // Apply tag filters
  if (tags.length > 0) {
    filteredProducts = filterProductsByTags(filteredProducts, tags);
  }
  
  // Apply sorting
  filteredProducts = sortProducts(filteredProducts, sortBy);
  
  // Apply pagination
  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
  
  return {
    products: paginatedProducts,
    totalProducts,
    totalPages,
    currentPage: page
  };
}

export async function getRelatedProducts(productId: string, collectionId: string, limit = 4): Promise<Product[]> {
  await new Promise(resolve => setTimeout(resolve, SIMULATE_DELAY));
  
  const collectionProducts = getProductsByCollection(collectionId);
  const filteredProducts = collectionProducts.filter(product => product.id !== productId);
  
  // Shuffle and return limited results
  const shuffled = filteredProducts.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, limit);
}

export async function getAllTags(collectionId?: string): Promise<string[]> {
  await new Promise(resolve => setTimeout(resolve, SIMULATE_DELAY));
  
  const relevantProducts = collectionId 
    ? getProductsByCollection(collectionId)
    : products;
    
  const allTags = relevantProducts.flatMap(product => product.tags);
  const uniqueTags = [...new Set(allTags)];
  
  return uniqueTags.sort();
}

export async function getFeaturedProducts(limit = 8): Promise<Product[]> {
  await new Promise(resolve => setTimeout(resolve, SIMULATE_DELAY));
  
  // Get products with badges first, then fill with others
  const withBadges = products.filter(product => product.badges && product.badges.length > 0);
  const withoutBadges = products.filter(product => !product.badges || product.badges.length === 0);
  
  const featured = [...withBadges, ...withoutBadges].slice(0, limit);
  return featured;
}

// Utility functions for generating metadata
export function generateProductMetadata(product: Product) {
  return {
    title: `${product.title} | BoChuStore`,
    description: product.description || `${product.title} - ${product.price} ${product.currency}. High-quality industrial equipment and components.`,
    openGraph: {
      title: product.title,
      description: product.description || `${product.title} - Premium industrial equipment`,
      images: product.images.slice(0, 1),
      type: 'product' as const,
    },
    other: {
      'product:price:amount': product.price.toString(),
      'product:price:currency': product.currency,
      'product:availability': product.stock > 0 ? 'in stock' : 'out of stock',
    }
  };
}

export function generateCollectionMetadata(collection: Collection) {
  return {
    title: `${collection.title} | BoChuStore`,
    description: collection.description,
    openGraph: {
      title: collection.title,
      description: collection.description,
      images: [collection.heroImage],
      type: 'website' as const,
    }
  };
}

// Generate JSON-LD structured data for SEO
export function generateProductJsonLd(product: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description || product.title,
    sku: product.sku,
    image: product.images,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: product.currency,
      availability: product.stock > 0 
        ? 'https://schema.org/InStock' 
        : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'BoChuStore'
      }
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'BoChuStore'
    }
  };
}