"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ShoppingCart,
  MessageCircle,
} from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Breadcrumbs } from "../ui/Breadcrumbs";
import {
  Product,
  ProductSize,
} from "../../data/products";
import { useRouter } from "next/navigation";

// cấu hình link tài khoản của bạn
export const ZALO_LINK = "https://zalo.me/0929687997"; // số VN ở dạng +84 / 84
export const WHATSAPP_LINK = "https://wa.me/84901234567"; // E.164, không có dấu +
export const TELEGRAM_LINK = "https://t.me/your_username"; // username Telegram

interface ProductDetailWithVariantsProps {
  product: Product;
  onAddToCart: (product: Product, size: ProductSize) => void;
}

export function ProductDetailWithVariants({
  product,
  onAddToCart,
}: ProductDetailWithVariantsProps) {
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const router = useRouter();

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: currency,
    }).format(price);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Vui lòng chọn kích cỡ");
      return;
    }
    onAddToCart(product, selectedSize);
  };

  const handleBackClick = () => {
    router.back();
  };

  const breadcrumbItems = [
    {
      label: "Trang chủ",
      onClick: () => router.push("/"),
    },
    {
      label: product.title,
      active: true,
    },
  ];

  const currentPrice = selectedSize?.price || product.price;
  const isOutOfStock = selectedSize
    ? selectedSize.stock === 0
    : product.stock === 0;
  const lowStock = selectedSize
    ? selectedSize.stock <= 5 && selectedSize.stock > 0
    : product.stock <= 5 && product.stock > 0;

  return (
    <div className="min-h-screen bg-white">
      {/* Header with breadcrumbs and back button */}
      <div className="container mx-auto max-w-7xl px-4 py-4">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            {/* Main Image */}
            <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden">
              <img
                src={product.images[selectedImageIndex]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${index === selectedImageIndex
                        ? "border-blue-500"
                        : "border-gray-200 hover:border-gray-300"
                      }`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Huy hiệu (Badges) */}
            {product.badges && product.badges.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {product.badges.map((badge, index) => (
                  <Badge key={index} variant="destructive">
                    {badge}
                  </Badge>
                ))}
              </div>
            )}

            {/* Tên sản phẩm (Title) và Giá (Price) */}
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-2xl font-bold">
                  {formatPrice(currentPrice, product.currency)}
                </span>
                {selectedSize && selectedSize.price !== product.price && (
                  <span className="text-lg text-gray-500 line-through">
                    {formatPrice(product.price, product.currency)}
                  </span>
                )}
              </div>

              {/* Stock Status */}
              {isOutOfStock && (
                <div className="text-red-600 font-medium mb-4">Hết hàng</div>
              )}
              {lowStock && (
                <div className="text-orange-600 font-medium mb-4">
                  Chỉ còn {selectedSize?.stock || product.stock} sản phẩm
                </div>
              )}
            </div>

            {/* Mô tả sản phẩm (Description) */}
            {product.description && (
              <div>
                <h3 className="font-medium mb-2">Mô tả sản phẩm</h3>
                <div className="prose prose-gray max-w-none">
                  <p>{product.description}</p>
                </div>
              </div>
            )}

            {/* Mã sản phẩm (SKU) và Tồn kho (Stock) */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Mã sản phẩm (SKU):</span>
                <div className="font-medium">{product.sku}</div>
              </div>
              <div>
                <span className="text-gray-600">Tồn kho:</span>
                <div className="font-medium">
                  {selectedSize?.stock || product.stock}
                </div>
              </div>
            </div>

            {/* Kích cỡ (Size Selection) */}
            {product.size && product.size.length > 0 && (
              <div className="space-y-3">
                <label className="block font-medium">Kích cỡ</label>
                <div className="grid grid-cols-3 gap-2">
                  {product.size.map((size) => (
                    <motion.button
                      key={size.label}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedSize(size)}
                      disabled={size.stock === 0}
                      className={`p-3 border rounded-lg text-sm font-medium transition-colors ${selectedSize?.label === size.label
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : size.stock === 0
                            ? "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                    >
                      <div>{size.label}</div>
                      <div className="text-xs">
                        {formatPrice(size.price, product.currency)}
                      </div>
                      {size.stock === 0 && (
                        <div className="text-xs text-red-500">Hết hàng</div>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Thông số kỹ thuật (Specs) */}
            {product.specs && product.specs.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-medium">Thông số kỹ thuật</h3>
                <div className="grid grid-cols-1 gap-2 text-sm">
                  {product.specs.map((spec, index) => (
                    <div
                      key={index}
                      className="flex justify-between py-2 border-b border-gray-100"
                    >
                      <span className="text-gray-600">{spec.label}:</span>
                      <span className="font-medium">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleAddToCart}
                disabled={isOutOfStock || !selectedSize}
                size="lg"
                className="flex-1"
              >
                <ShoppingCart size={20} className="mr-2" />
                Thêm vào giỏ hàng
              </Button>

              {/* Zalo */}
              <Button variant="secondary" className="bg-blue-400 text-white hover:text-black hover:bg-blue-500" size="lg" asChild>
                <a href={ZALO_LINK} target="_blank" rel="noopener noreferrer">
                  <MessageCircle size={20} className="mr-2" />
                  Zalo
                </a>
              </Button>
              {/* 
              <Button variant="outline" size="lg" asChild disabled={true}>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Phone size={20} className="mr-2" />
                  WhatsApp
                </a>
              </Button>

              <Button variant="outline" size="lg" asChild disabled={true}>
                <a
                  href={TELEGRAM_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Send size={20} className="mr-2" />
                  Telegram
                </a>
              </Button> */}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
