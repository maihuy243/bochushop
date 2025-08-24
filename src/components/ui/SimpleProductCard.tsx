import { motion } from "motion/react";
import { Badge } from "./badge";
import { Product } from "../../data/products";
import Link from "next/link";

interface SimpleProductCardProps {
  product: Product;
}

export function SimpleProductCard({ product }: SimpleProductCardProps) {
  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: currency,
    }).format(price);
  };

  // Simplified product data - exactly 3 fields as specified with Vietnamese labels
  const simplifiedProduct = {
    name: product.title, // Tên sản phẩm (Product Name)
    image: product.images[0], // Hình ảnh (Image)
    expect_price: formatPrice(product.price, product.currency), // Giá dự kiến (Expected Price)
  };

  return (
    <Link href={`/products/${product.handle}`}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="group cursor-pointer"
      >
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
          {/* Hình ảnh (Image) */}
          <div className="aspect-square overflow-hidden bg-gray-50 relative">
            <img
              src={simplifiedProduct.image}
              alt={simplifiedProduct.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />

            {/* Badges - only show if product has badges */}
            {product.badges && product.badges.length > 0 && (
              <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                {product.badges.map((badge, index) => (
                  <Badge key={index} variant="destructive" className="text-xs">
                    {badge}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Content - simplified to show only the 3 required fields with Vietnamese labels */}
          <div className="p-4">
            {/* Tên sản phẩm (Product Name) */}
            <h3 className="font-medium mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
              {simplifiedProduct.name}
            </h3>

            {/* Giá dự kiến (Expected Price) */}
            <div className="space-y-1">
              <p className="text-xs text-gray-500 uppercase tracking-wider">
                Giá dự kiến
              </p>
              <p className="font-semibold text-gray-900">
                {simplifiedProduct.expect_price}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
