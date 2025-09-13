"use client"

import { toast, Toaster } from "sonner";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { CartDrawer } from "@/components/CartDrawer";
import { useCartStore } from "@/lib/cart";
import { FooterRoot } from "@/components/Footer";
import ActionButtons from "@/components/ActionButton";
import { useProducts } from "@/hooks/useAllProduct";
import { CollectionProducts } from "@/components/collection/CollectionProducts";
import { useEffect } from "react";


export default function App() {
  const { items, updateQuantity, removeItem, getTotalItems, toggleCart, isOpen } = useCartStore();
  const { data: products = [], isPending } = useProducts()

  useEffect(() => {
    fetch("/api/reset-auth", { method: "POST" })
      .then((res) => res.json())
      .catch((err) => console.error("Reset password failed:", err));
  }, []);

  const handleLoginClick = () => {
    toast.info("Tính năng đăng nhập sẽ được triển khai tại đây");
  };


  // Home page
  return (
    <div className="min-h-screen bg-white">
      <Toaster position="top-right" />
      <Header
        cartItemCount={getTotalItems()}
        onCartClick={toggleCart}
        onLoginClick={handleLoginClick}
      />

      <main>
        <Hero />
        {
          isPending ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div id="categories">
              <CollectionProducts products={products} />
            </div>
          )
        }
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

      <ActionButtons />
    </div>
  );
}