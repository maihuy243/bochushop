'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { ProductCard } from '@/components/ui/ProductCard';
import { Collection, Product } from '@/data/seed';
import { cn } from '@/lib/utils';

interface ProductSectionProps {
  collection: Collection;
  products: Product[];
  className?: string;
}

export function ProductSection({ collection, products, className }: ProductSectionProps) {
  return (
    <section className={cn('relative', className)}>
      <div className="container mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="mb-4">{collection.title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {collection.description}
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
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
              <Link href={`/collections/${collection.handle}`}>
                <ProductCard 
                  product={product} 
                  showViewButton
                  priority={index < 4} // Optimize loading for first 4 images
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