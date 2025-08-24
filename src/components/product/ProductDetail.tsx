'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { ShoppingCart, Plus, Minus, Check, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Product, Collection } from '@/data/seed';
import { useCartStore } from '@/lib/cart';
import { toast } from 'sonner';

interface ProductDetailProps {
  product: Product;
  collection: Collection;
}

export function ProductDetail({ product, collection }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  
  const { addItem } = useCartStore();

  const handleAddToCart = async () => {
    setIsAdding(true);
    
    // Add multiple items based on quantity
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    
    toast.success(
      `${quantity} × ${product.title} added to cart`,
      {
        duration: 3000,
        action: {
          label: 'View Cart',
          onClick: () => {
            // This would open the cart drawer
          },
        },
      }
    );
    
    // Reset to 1 after adding
    setQuantity(1);
    
    setTimeout(() => setIsAdding(false), 500);
  };

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(prev => prev + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <section className="py-8">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {/* Main Image */}
            <div className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={product.images[selectedImage]}
                    alt={product.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedImage(index)}
                    className={`relative flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index 
                        ? 'border-primary' 
                        : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.title} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Header */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Badge variant="outline">{collection.title}</Badge>
                {product.badges?.map((badge) => (
                  <Badge 
                    key={badge} 
                    variant={badge === 'Popular' ? 'destructive' : 'secondary'}
                  >
                    {badge}
                  </Badge>
                ))}
              </div>
              
              <h1 className="text-3xl lg:text-4xl mb-4">{product.title}</h1>
              
              <div className="flex items-center gap-4 mb-4">
                <p className="text-3xl font-semibold text-primary">
                  ${product.price.toFixed(2)}
                </p>
                <span className="text-muted-foreground">
                  {product.currency}
                </span>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>SKU: {product.sku}</span>
                <span>•</span>
                <span className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                  {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                </span>
              </div>
            </div>

            {/* Description */}
            {product.description && (
              <div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {/* Quantity & Add to Cart */}
            {product.stock > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="font-medium">Quantity:</span>
                  <div className="flex items-center border rounded-lg">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={decreaseQuantity}
                      disabled={quantity <= 1}
                      className="h-10 w-10 p-0"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    
                    <span className="px-4 py-2 min-w-[60px] text-center">
                      {quantity}
                    </span>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={increaseQuantity}
                      disabled={quantity >= product.stock}
                      className="h-10 w-10 p-0"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <motion.div whileTap={{ scale: 0.98 }}>
                  <Button
                    size="lg"
                    onClick={handleAddToCart}
                    disabled={isAdding}
                    className="w-full bg-primary hover:bg-primary/90 text-white"
                  >
                    <AnimatePresence mode="wait">
                      {isAdding ? (
                        <motion.div
                          key="adding"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="flex items-center"
                        >
                          <Check className="w-5 h-5 mr-2" />
                          Added!
                        </motion.div>
                      ) : (
                        <motion.div
                          key="add"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="flex items-center"
                        >
                          <ShoppingCart className="w-5 h-5 mr-2" />
                          Add to Cart
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Button>
                </motion.div>
              </div>
            )}

            {/* Product Details Tabs */}
            <Tabs defaultValue="specifications" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="shipping">Shipping</TabsTrigger>
              </TabsList>
              
              <TabsContent value="specifications" className="mt-6">
                <div className="space-y-4">
                  {product.specs.map((spec, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex justify-between items-center py-3 border-b last:border-b-0"
                    >
                      <span className="font-medium">{spec.label}</span>
                      <span className="text-muted-foreground">{spec.value}</span>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="description" className="mt-6">
                <div className="prose prose-gray max-w-none">
                  <p>
                    {product.description || 'Detailed product description coming soon. This premium industrial component is engineered for reliability and performance in demanding applications.'}
                  </p>
                  <p>
                    Our products undergo rigorous quality testing to ensure they meet the highest industry standards. Each item comes with comprehensive documentation and technical support.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="shipping" className="mt-6">
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium mb-2">Free Shipping</h4>
                    <p className="text-sm text-muted-foreground">
                      Free standard shipping on orders over $200. Express shipping available.
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Standard Shipping (5-7 days)</span>
                      <span>Free on orders $200+</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Express Shipping (2-3 days)</span>
                      <span>$29.99</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Overnight Shipping</span>
                      <span>$49.99</span>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-medium mb-2">Return Policy</h4>
                    <p className="text-sm text-muted-foreground">
                      30-day return policy. Items must be in original condition. 
                      Customer is responsible for return shipping costs.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </section>
  );
}