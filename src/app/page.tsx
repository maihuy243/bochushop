"use client"

import { toast, Toaster } from "sonner";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { CartDrawer } from "@/components/CartDrawer";
import { useCartStore } from "@/lib/cart";
import { FooterRoot } from "@/components/Footer";
import { useCategories } from "@/hooks/useCategories";


export default function App() {
  const { items, updateQuantity, removeItem, getTotalItems, toggleCart, isOpen } = useCartStore();
  const { data: categories = [] } = useCategories()


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
        
        <div id="categories">
          {categories.map((category, index) => (
            <CategoryGrid 
              key={category.id} 
              category={category} 
              index={index} 
            />
          ))}
        </div>
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