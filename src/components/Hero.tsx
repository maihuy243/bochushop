'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id='top' className="relative h-96 md:h-[500px] bg-gray-900 flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://www.bochu.store/cdn/shop/files/bochu11.jpg?v=1754457827&width=2000')`,
          transform: `translateY(${scrollY * 0.3}px)`,
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-4xl md:text-6xl mb-4"
        >
          Dịch Vụ Toàn Cầu Tiêu Dùng Gốc
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
        >
          Thiết bị công nghiệp và linh kiện chính xác chuyên nghiệp cho nhu cầu kinh doanh của bạn
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg"
            onClick={scrollToProducts}
          >
            Xem Sản Phẩm
          </Button>
        </motion.div>
      </div>
    </section>
  );
}