'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import Image from 'next/image';
import { ShoppingCart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/data/seed';
import { useCartStore } from '@/lib/cart';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  showViewButton?: boolean;
  priority?: boolean;
  className?: string;
}

export function ProductCard({ 
  product, 
  showViewButton = false, 
  priority = false,
  className 
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast.success(`${product.title} added to cart`, {
      duration: 2000,
    });
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn('h-full', className)}
    >
      <Card className="group cursor-pointer transition-all duration-200 hover:shadow-lg rounded-2xl overflow-hidden h-full">
        <CardContent className="p-0 h-full flex flex-col">
          {/* Product Image */}
          <div className="relative aspect-square overflow-hidden bg-gray-100">
            <Image
              src={product.images[0]}
              alt={product.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              priority={priority}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
            
            {/* Badges */}
            {product.badges && product.badges.length > 0 && (
              <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                {product.badges.map((badge) => (
                  <Badge 
                    key={badge} 
                    variant={badge === 'Popular' ? 'destructive' : 'secondary'}
                    className="text-xs"
                  >
                    {badge}
                  </Badge>
                ))}
              </div>
            )}
            
            {/* Stock indicator */}
            {product.stock <= 5 && product.stock > 0 && (
              <div className="absolute top-3 right-3">
                <Badge variant="outline" className="bg-white/90 text-xs">
                  Only {product.stock} left
                </Badge>
              </div>
            )}
            
            {product.stock === 0 && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Badge variant="destructive">Out of Stock</Badge>
              </div>
            )}
            
            {/* Hover overlay with action buttons */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/20 flex items-center justify-center gap-2"
                >
                  {showViewButton && (
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 20, opacity: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <Button
                        size="sm"
                        variant="secondary"
                        className="bg-white/90 hover:bg-white"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                    </motion.div>
                  )}
                  
                  {product.stock > 0 && (
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 20, opacity: 0 }}
                      transition={{ delay: 0.15 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        size="sm"
                        onClick={handleAddToCart}
                        className="bg-primary hover:bg-primary/90 text-white"
                      >
                        <ShoppingCart className="w-4 h-4 mr-1" />
                        Add
                      </Button>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Product Info */}
          <div className="p-4 flex-1 flex flex-col">
            <h3 className="mb-2 line-clamp-2 min-h-[3rem] flex-1">
              {product.title}
            </h3>
            
            <div className="flex items-center justify-between mt-auto">
              <div>
                <p className="text-xl text-primary font-semibold">
                  ${product.price.toFixed(2)}
                </p>
                <p className="text-xs text-muted-foreground">
                  SKU: {product.sku}
                </p>
              </div>
              
              {!showViewButton && product.stock > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: isHovered ? 1 : 0, 
                    scale: isHovered ? 1 : 0.8 
                  }}
                  transition={{ duration: 0.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    size="sm"
                    onClick={handleAddToCart}
                    className="bg-primary hover:bg-primary/90 text-white"
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}