"use client"

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { TopBar } from "../TopBar";
import { Header } from "../Header";
import { ProductDetailWithVariants } from "../product/ProductDetailWithVariants";
import { FooterRoot } from "../Footer";
import { CartDrawer } from "../CartDrawer";
import { getProductByHandle, Product } from "../../data/products";
import { useCartStore } from "../../lib/cart";

interface ProductPageProps {
  handle: string;
}

export function ProductPageComponent({ handle }: ProductPageProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const { items, addItem, updateQuantity, removeItem, getTotalItems, toggleCart, isOpen } = useCartStore();

  useEffect(() => {
    const foundProduct = getProductByHandle(handle);
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      toast.error("Product not found");
    }
  }, [handle]);

  const handleLoginClick = () => {
    toast.info("Chức năng đăng nhập sẽ được triển khai tại đây");
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500">Đang tải...</p>
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
        <ProductDetailWithVariants 
          product={product}
          onAddToCart={addItem}
        />
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