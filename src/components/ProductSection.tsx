import { ProductCard } from "./ProductCard";
import { Product } from "../data/products";

interface ProductSectionProps {
  title: string;
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export function ProductSection({ title, products, onAddToCart }: ProductSectionProps) {
  return (
    <section className="py-16">
      <div className="container mx-auto max-w-7xl px-4">
        <h2 className="text-3xl mb-8 text-center">{title}</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
}