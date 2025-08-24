'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { Mail, MapPin, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

 function Footer() {
  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    
    if (email) {
      toast.success('Cảm ơn bạn đã đăng ký nhận bản tin!');
      (e.target as HTMLFormElement).reset();
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto max-w-7xl px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Info Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl mb-6">Thông tin liên hệ</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-1 text-blue-400 flex-shrink-0" />
                <div>
                  <p>123 Industrial Avenue</p>
                  <p>Manufacturing District</p>
                  <p>Tech City, TC 12345</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <a href="mailto:contact@BoChuStore.com" className="hover:text-blue-400 transition-colors">
                  contact@BoChuStore.com
                </a>
              </div>
              
              <div className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <a href="https://wa.me/15551234567" className="hover:text-blue-400 transition-colors">
                  WhatsApp: +1 (555) 123-4567
                </a>
              </div>
            </div>
          </motion.div>

          {/* Policies Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-xl mb-6">Chính sách</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="hover:text-blue-400 transition-colors">Liên hệ với chúng tôi</Link></li>
              <li><Link href="/" className="hover:text-blue-400 transition-colors">Chính sách bảo mật</Link></li>
              <li><Link href="/" className="hover:text-blue-400 transition-colors">Điều khoản dịch vụ</Link></li>
            </ul>
          </motion.div>

          {/* Shop All Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl mb-6">Danh mục</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="hover:text-blue-400 transition-colors">Trang chủ</Link></li>
              <li><Link href="/" className="hover:text-blue-400 transition-colors">Bộ sưu tập Lens</Link></li>
              <li><Link href="/" className="hover:text-blue-400 transition-colors">Bộ sưu tập Nozzle</Link></li>
              <li><Link href="/" className="hover:text-blue-400 transition-colors">Bộ sưu tập Phụ tùng</Link></li>
              <li><Link href="/" className="hover:text-blue-400 transition-colors">Dịch vụ Hỗ trợ</Link></li>
            </ul>
          </motion.div>

          {/* Newsletter Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-xl mb-6">Bản tin</h3>
            <p className="text-gray-300 mb-4">
              Theo dõi để nhận thông tin về các sản phẩm mới nhất và ưu đãi đặc biệt!
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <Input
                type="email"
                name="email"
                placeholder="Nhập email của bạn"
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                required
              />
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90"
              >
                Đăng ký
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;