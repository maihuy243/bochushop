import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { Button } from "./ui/button";
import { CartItem } from "../lib/cart";
import { motion, AnimatePresence } from "motion/react";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, sizeLabel: string, quantity: number) => void;
  onRemoveItem: (productId: string, sizeLabel: string) => void;
}

export function CartDrawer({ 
  isOpen, 
  onClose, 
  items, 
  onUpdateQuantity, 
  onRemoveItem 
}: CartDrawerProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.size.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="flex items-center gap-2">
                <ShoppingBag size={20} />
                Cart ({getTotalItems()})
              </h2>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X size={20} />
              </Button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {items.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingBag size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={`${item.product.id}-${item.size.label}`}
                      layout
                      className="flex gap-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium line-clamp-2 mb-1">
                          {item.product.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          Size: {item.size.label}
                        </p>
                        <p className="font-semibold">
                          {formatPrice(item.size.price)}
                        </p>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onRemoveItem(item.product.id, item.size.label)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <X size={16} />
                        </Button>
                        
                        <div className="flex items-center gap-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onUpdateQuantity(item.product.id, item.size.label, item.quantity - 1)}
                            className="w-8 h-8 p-0"
                          >
                            <Minus size={12} />
                          </Button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onUpdateQuantity(item.product.id, item.size.label, item.quantity + 1)}
                            className="w-8 h-8 p-0"
                          >
                            <Plus size={12} />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-lg">
                    {formatPrice(getTotalPrice())}
                  </span>
                </div>
                
                <Button className="w-full" size="lg">
                  Checkout
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}