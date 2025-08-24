import { useState } from "react";
import { ProductDetailWithVariants } from "./product/ProductDetailWithVariants";
import { Button } from "./ui/button";
import { lensProducts, Product, Variant } from "../data/products";
import { useCartStore } from "../lib/cart";
import { ArrowLeft } from "lucide-react";

export function ProductDemo() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { addItem } = useCartStore();

  const handleAddVariantToCart = (variant: Variant, quantity: number) => {
    if (selectedProduct) {
      addItem(selectedProduct, variant, quantity);
    }
  };

  if (!selectedProduct) {
    return (
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <h2 className="text-2xl mb-6">Product Detail Demo</h2>
        <p className="text-muted-foreground mb-6">
          Click on any product below to see the new variant selection functionality:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lensProducts.slice(0, 6).map((product) => (
            <div 
              key={product.id} 
              className="border rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedProduct(product)}
            >
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h3 className="font-medium mb-2">{product.name}</h3>
              <p className="text-blue-600">From ${product.price}</p>
              <p className="text-sm text-gray-500 mt-1">
                {product.variants.length} sizes available
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="container mx-auto max-w-7xl px-4 py-4">
        <Button 
          variant="outline" 
          onClick={() => setSelectedProduct(null)}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Products
        </Button>
      </div>
      
      <ProductDetailWithVariants
        product={selectedProduct}
        onAddToCart={handleAddVariantToCart}
      />
    </div>
  );
}