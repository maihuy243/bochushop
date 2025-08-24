'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { ProductCard } from '@/components/ui/ProductCard';
import { Product, Collection } from '@/data/seed';

interface RelatedProductsProps {
  products: Product[];
  collection: Collection;
}

export function RelatedProducts({ products, collection }: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="mb-4">Related Products</h2>
          <p className="text-muted-foreground">
            More items from {collection.title}
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.4 }}
            >
              <Link href={`/products/${product.handle}`}>
                <ProductCard 
                  product={product} 
                  showViewButton
                  priority={index < 2}
                />
              </Link>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link 
            href={`/collections/${collection.handle}`}
            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
          >
            View All {collection.title}
            <svg 
              className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}