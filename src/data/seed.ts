import { Product, products } from "./products";

export interface Collection {
  id: string;
  handle: string;
  title: string;
  hero_image: string;
  description: string;
}


export function getProductByHandle(handle: string, products: Product[] = []): Product | undefined {
  return products.find(product => product.handle === handle);
}

export function getProductsByCollection(collection_id: string): Product[] {
  return products.filter(product => product.collection_id === collection_id);
}

export function searchProducts(query: string, collection_id?: string): Product[] {
  const searchIn = collection_id 
    ? getProductsByCollection(collection_id)
    : products;
    
  if (!query.trim()) return searchIn;
  
  const searchTerms = query.toLowerCase().split(' ');
  
  return searchIn.filter(product => {
    const searchableText = [
      product.title,
      product.description || '',
      ...product.specs.map(spec => `${spec.label} ${spec.value}`)
    ].join(' ').toLowerCase();
    
    return searchTerms.every(term => searchableText.includes(term));
  });
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