"use client";

import { useState } from "react";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
  onLoginClick: () => void;
}

export function Header({
  cartItemCount,
  onCartClick,
  onLoginClick,
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const navItems = [
    { name: "Trang Chủ", href: "#top", path: "/" },
    { name: "Sản phẩm", href: "#categories" },
    { name: "Thông tin", href: "#contact" },
    { name: "Liên hệ", href: "#contact" },
    {
      name: "Dịch vụ hỗ trợ",
      href: "#contact",
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href={"/"}>
            <div className="flex items-center">
              <h1 className="text-2xl text-blue-600 mr-8">BoChuStore</h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  if (item.path) {
                    router.push(item.path);
                    return;
                  }
                  const el = document.querySelector(item.href);
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
                className="hover:text-blue-600 transition-colors"
              >
                {item.name}
              </button>
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
              onClick={onLoginClick}
              className="hidden sm:flex items-center space-x-2"
            >
              <User className="w-4 h-4" />
              <span> Đăng nhập</span>
            </Button>

            {/* Cart */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onCartClick}
              className="relative"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {cartItemCount}
                </Badge>
              )}
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
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
                        <a
                          href={item.href}
                          className="block py-2 hover:text-blue-600"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.name}
                        </a>
                      </div>
                    ))}
                  </nav>

                  {/* Mobile Login */}
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => {
                      onLoginClick();
                      setIsMenuOpen(false);
                    }}
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
    </header>
  );
}
