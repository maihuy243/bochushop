'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ShoppingCart, User, Menu, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useCartStore } from '@/lib/cart';
import { collections } from '@/data/seed';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  const { getTotalItems, toggleCart } = useCartStore();
  const cartItemCount = getTotalItems();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Update scrolled state
      setIsScrolled(currentScrollY > 0);
      
      // Hide/show header on scroll
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { name: 'Home', href: '/' },
    { 
      name: 'Products', 
      href: '/collections',
      subItems: collections.map(collection => ({
        name: collection.title,
        href: `/collections/${collection.handle}`
      }))
    },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { 
      name: 'Support Services', 
      href: '/support',
      subItems: [
        { name: 'Technical Support', href: '/support/technical' },
        { name: 'Installation Service', href: '/support/installation' }
      ]
    }
  ];

  return (
    <motion.header
      initial={{ y: 0, opacity: 1 }}
      animate={{ 
        y: isVisible ? 0 : -100,
        opacity: isVisible ? 1 : 0 
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={`sticky top-0 z-50 bg-white border-b transition-all duration-300 ${
        isScrolled ? 'shadow-md' : 'shadow-sm'
      }`}
    >
      <div className="container mx-auto max-w-7xl px-4">
        <div className={`flex items-center justify-between transition-all duration-300 ${
          isScrolled ? 'py-2' : 'py-4'
        }`}>
          {/* Logo */}
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <Link href="/" className="text-2xl text-primary">
              BoChuStore
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                <Link 
                  href={item.href} 
                  className="flex items-center space-x-1 hover:text-primary transition-colors py-2"
                >
                  <span>{item.name}</span>
                  {item.subItems && (
                    <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                  )}
                </Link>
                
                {item.subItems && (
                  <AnimatePresence>
                    <motion.div 
                      className="absolute top-full left-0 mt-2 w-56 bg-white border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="py-2">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-4 py-2 hover:bg-gray-50 hover:text-primary transition-colors"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden md:flex items-center relative">
              <Input
                type="search"
                placeholder="Search products..."
                className="w-64 pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>

            {/* Login */}
            <Button
              variant="ghost"
              size="sm"
              className="hidden sm:flex items-center space-x-2"
            >
              <User className="w-4 h-4" />
              <span> Đăng nhập</span>
            </Button>

            {/* Cart */}
            <motion.div whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleCart}
                className="relative"
              >
                <ShoppingCart className="w-5 h-5" />
                <AnimatePresence>
                  {cartItemCount > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-2 -right-2"
                    >
                      <Badge 
                        variant="destructive" 
                        className="h-5 w-5 flex items-center justify-center p-0 text-xs"
                      >
                        {cartItemCount}
                      </Badge>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>

            {/* Mobile Menu */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-96">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  {/* Mobile Search */}
                  <div className="relative">
                    <Input
                      type="search"
                      placeholder="Search products..."
                      className="pl-10"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                  
                  {/* Mobile Navigation */}
                  <nav className="space-y-2">
                    {navItems.map((item) => (
                      <div key={item.name}>
                        <Link
                          href={item.href}
                          className="block py-2 hover:text-primary transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                        {item.subItems && (
                          <div className="ml-4 space-y-1">
                            {item.subItems.map((subItem) => (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                className="block py-1 text-sm text-gray-600 hover:text-primary transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </nav>
                  
                  {/* Mobile Login */}
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Đăng nhập
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}