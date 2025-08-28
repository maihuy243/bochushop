"use client"

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Header } from "../Header";
import { CollectionHero } from "../collection/CollectionHero";
import { CollectionProducts } from "../collection/CollectionProducts";
import { CartDrawer } from "../CartDrawer";
import { getCollectionByHandle, getProductsByCollection, Collection, Product } from "../../data/products";
import { useCartStore } from "../../lib/cart";
import { FooterRoot } from "../Footer";
import { useCategories } from "@/hooks/useCategories";
import { useFlatProducts } from "@/hooks/useAllProduct";

interface CollectionPageProps {
  handle: string;
}

export function CollectionPageComponent({ handle }: CollectionPageProps) {
  const [collection, setCollection] = useState<Collection | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const { items, updateQuantity, removeItem, getTotalItems, toggleCart, isOpen } = useCartStore();
  const { data: categories = [] } = useCategories()
  const { data: dataAllProducts } = useFlatProducts()

  useEffect(() => {
    const foundCollection = getCollectionByHandle(handle, categories);
    if (foundCollection) {
      setCollection(foundCollection);
      const collectionProducts = getProductsByCollection(foundCollection.id, dataAllProducts || []);
      setProducts(collectionProducts);
    } else {
      // toast.error("Collection not found");
    }
  }, [handle, categories.length]);

  const handleLoginClick = () => {
    toast.info("Login functionality would be implemented here");
  };

  if (!collection) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header 
        cartItemCount={getTotalItems()}
        onCartClick={toggleCart}
        onLoginClick={handleLoginClick}
      />
      
      <main>
        <CollectionHero collection={collection} productCount={products.length} />
        <CollectionProducts products={products} />
      </main>
      
      <FooterRoot />
      
      <CartDrawer
        isOpen={isOpen}
        onClose={() => useCartStore.setState({ isOpen: false })}
        items={items}
        onUpdateQuantity={(productId: string, sizeLabel: string, quantity: number) => 
          updateQuantity(productId, sizeLabel, quantity)
        }
        onRemoveItem={(productId: string, sizeLabel: string) => 
          removeItem(productId, sizeLabel)
        }
      />
    </div>
  );
}