import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Product } from "../data/products";
import { getMinPrice, formatPrice } from "../lib/utils";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  // Get the minimum price from variants, fallback to product.price
  const minPrice = product.variants && product.variants.length > 0 
    ? getMinPrice(product.variants)
    : product.price;
  
  const currency = product.variants && product.variants.length > 0 
    ? product.variants[0].currency 
    : 'USD';

  return (
    <Card className="group cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 rounded-xl overflow-hidden">
      <CardContent className="p-0">
        {/* Product Image */}
        <div className="aspect-square overflow-hidden bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        
        {/* Product Info */}
        <div className="p-4">
          <h3 className="mb-2 line-clamp-2 min-h-[3rem]">
            {product.name}
          </h3>
          
          <div className="flex items-center justify-between">
            <p className="text-xl text-blue-600">
              {product.variants && product.variants.length > 1 
                ? `From ${formatPrice(minPrice, currency)}`
                : formatPrice(minPrice, currency)
              }
            </p>
            
            <Button
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <ShoppingCart className="w-4 h-4 mr-1" />
              Add
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}