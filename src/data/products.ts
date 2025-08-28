export interface Variant {
  id: string;
  size: string; // e.g., S / M / L or 10mm / 12mm / 14mm
  price: number;
  currency: "USD" | "VND";
  sku: string;
  stock: number; // 0 => out of stock
  compareAtPrice?: number; // optional strike-through
}

export interface ProductSize {
  label: string;
  price: number;
  sku: string;
  stock: number;
}

export interface Product {
  product_id: string;
  handle: string;
  title: string;
  price: number;
  currency: string;
  images: string[];
  specs: { label: string; value: string }[];
  badges?: string[];
  sku: string;
  stock: number;
  collection_id: string;
  description?: string;
  size: ProductSize[];
}

export interface Collection {
  id: string;
  handle: string;
  title: string;
  hero_image: string;
}

export interface ParentCategory {
  id: string;
  title: string;
  description: string;
  collections: Collection[];
}

export const products: Product[] = [];

export const getProductsByCollection = (collection_id: string, products: Product[]): Product[] => {
  return products.filter((product) => product.collection_id === collection_id);
};

export const getProductByHandle = (handle: string,  products: Product[]): Product | undefined => {
  return products.find((product) => product.product_id === handle);
};

export const getCollectionByHandle = (
  handle: string,
  data: ParentCategory[] = []
): Collection | undefined => {
  return data
    .flatMap((category) => category.collections)
    .find((collection) => collection.id === handle);
};
