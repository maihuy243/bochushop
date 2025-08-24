import { accessoryCategories } from "./collection-acessory";
import { lensCategory } from "./collection-lens";
import { nozzlesCategories } from "./collection-nozzles";
import { accessoryProducts } from "./products/acessory";
import { lensProducts } from "./products/lens";
import { nozzlesProducts } from "./products/nozzles";

export interface ProductSize {
  label: string;
  price: number;
  sku: string;
  stock: number;
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
  description?: string;
  sizes: ProductSize[];
}

export interface Collection {
  id: string;
  handle: string;
  title: string;
  heroImage: string;
}

export interface ParentCategory {
  id: string;
  title: string;
  description: string;
  collections: Collection[];
}



export const parentCategories: ParentCategory[] = [
  lensCategory,
  nozzlesCategories,
  accessoryCategories,
];

export const products: Product[] = [...lensProducts, ...nozzlesProducts, ...accessoryProducts];

export const getProductsByCollection = (collectionId: string): Product[] => {
  return products.filter((product) => product.collectionId === collectionId);
};

export const getProductByHandle = (handle: string): Product | undefined => {
  return products.find((product) => product.handle === handle);
};

export const getCollectionByHandle = (
  handle: string
): Collection | undefined => {
  return parentCategories
    .flatMap((category) => category.collections)
    .find((collection) => collection.handle === handle);
};
