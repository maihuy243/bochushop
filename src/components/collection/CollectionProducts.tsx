import { motion } from "motion/react";
import { Product } from "../../data/products";
import { SimpleProductCard } from "../ui/SimpleProductCard";
import Link from "next/link";

interface CollectionProductsProps {
  products: Product[];
}

export function CollectionProducts({ products }: CollectionProductsProps) {
  if (products.length === 0) {
    return (
      <div className="container mx-auto max-w-7xl px-4 py-16 text-center">
        <p className="text-gray-500">Không có sản phẩm nào !</p>
      </div>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <SimpleProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
