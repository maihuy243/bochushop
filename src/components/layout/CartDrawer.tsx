'use client';

import { motion, AnimatePresence } from 'motion/react';
import { Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useCartStore } from '@/lib/cart';

export function CartDrawer() {
  const { 
    items, 
    isOpen, 
    setCartOpen, 
    updateQuantity, 
    removeItem, 
    getTotalItems, 
    getTotalPrice 
  } = useCartStore();

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    updateQuantity(productId, quantity);
  };

  const handleRemoveItem = (productId: string) => {
    removeItem(productId);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setCartOpen}>
      <SheetContent side="right" className="w-full sm:w-96 flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Shopping Cart
            {totalItems > 0 && (
              <Badge variant="secondary">{totalItems}</Badge>
            )}
          </SheetTitle>
        </SheetHeader>
        
        <div className="flex-1 flex flex-col">
          {items.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-1 flex items-center justify-center text-center"
            >
              <div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                >
                  <ShoppingCart className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                </motion.div>
                <p className="text-gray-500 mb-4">Your cart is empty</p>
                <Button
                  variant="outline"
                  onClick={() => setCartOpen(false)}
                >
                  Continue Shopping
                </Button>
              </div>
            </motion.div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 space-y-4 overflow-y-auto mt-6">
                <AnimatePresence mode="popLayout">
                  {items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100, scale: 0.8 }}
                      transition={{ 
                        delay: index * 0.1,
                        type: 'spring',
                        stiffness: 200,
                        damping: 20
                      }}
                      layout
                      className="flex gap-3 p-3 border rounded-lg bg-white"
                    >
                      <div className="relative w-16 h-16 rounded overflow-hidden bg-gray-100">
                        <Image
                          src={item.images[0]}
                          alt={item.title}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm line-clamp-2 mb-2">
                          {item.title}
                        </h4>
                        
                        <div className="flex items-center justify-between">
                          <p className="text-primary font-medium">
                            ${item.price.toFixed(2)}
                          </p>
                          
                          <div className="flex items-center gap-2">
                            <motion.div whileTap={{ scale: 0.9 }}>
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-8 h-8 p-0"
                                onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                            </motion.div>
                            
                            <motion.span 
                              key={item.quantity}
                              initial={{ scale: 1.2 }}
                              animate={{ scale: 1 }}
                              className="w-8 text-center text-sm font-medium"
                            >
                              {item.quantity}
                            </motion.span>
                            
                            <motion.div whileTap={{ scale: 0.9 }}>
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-8 h-8 p-0"
                                onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </motion.div>
                            
                            <motion.div whileTap={{ scale: 0.9 }}>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="w-8 h-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                                onClick={() => handleRemoveItem(item.id)}
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              
              <Separator className="my-4" />
              
              {/* Cart Summary */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-4"
              >
                <div className="flex justify-between items-center">
                  <span className="text-lg">Total:</span>
                  <motion.span 
                    key={totalPrice}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    className="text-lg font-semibold text-primary"
                  >
                    ${totalPrice.toFixed(2)}
                  </motion.span>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    asChild
                    onClick={() => setCartOpen(false)}
                  >
                    <Link href="/cart">View Cart</Link>
                  </Button>
                  
                  <motion.div whileTap={{ scale: 0.95 }}>
                    <Button
                      className="w-full bg-primary hover:bg-primary/90"
                      asChild
                    >
                      <Link href="/checkout">Checkout</Link>
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}