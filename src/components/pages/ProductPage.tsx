"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Header } from "../Header";
import { ProductDetailWithVariants } from "../product/ProductDetailWithVariants";
import { FooterRoot } from "../Footer";
import { CartDrawer } from "../CartDrawer";
import { getProductByHandle, Product } from "../../data/products";
import { useCartStore } from "../../lib/cart";
import { CollectionProducts } from "../collection/CollectionProducts";
import { useFlatProducts } from "@/hooks/useAllProduct";

interface ProductPageProps {
  handle: string;
}

export function ProductPageComponent({ handle }: ProductPageProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const {
    items,
    addItem,
    updateQuantity,
    removeItem,
    getTotalItems,
    toggleCart,
    isOpen,
  } = useCartStore();
  const { data: products } = useFlatProducts()

  useEffect(() => {
    const foundProduct = getProductByHandle(handle, products || []);
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      toast.error("Product not found");
    }
  }, [handle, products?.length]);

  function pickRandom<T>(items: T[], n = 4): T[] {
    if (n >= items.length) return [...items];
    const arr = items.slice();
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.slice(0, n);
  }

  const productSuggest = useMemo<Product[]>(() => {
    if (!products?.length) return [];
    const pool = product?.product_id
      ? products.filter((p) => p?.product_id !== product?.product_id) // bỏ sản phẩm đang xem (nếu có)
      : products;

    const take = Math.min(4, pool.length);
    return pickRandom(pool, take);
  }, [products, product]);

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
        <ProductDetailWithVariants product={product} onAddToCart={addItem} />
        <CollectionProducts products={productSuggest} />
      </main>

      <FooterRoot />

      <CartDrawer
        isOpen={isOpen}
        onClose={() => useCartStore.setState({ isOpen: false })}
        items={items}
        onUpdateQuantity={(
          productId: string,
          sizeLabel: string,
          quantity: number
        ) => updateQuantity(productId, sizeLabel, quantity)}
        onRemoveItem={(productId: string, sizeLabel: string) =>
          removeItem(productId, sizeLabel)
        }
      />
    </div>
  );
}
