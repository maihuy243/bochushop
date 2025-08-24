import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Variant } from '../data/products';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(
  price: number,
  currency = 'USD',
  locale = 'en-US'
): string {
  if (currency === 'VND') {
    return price.toLocaleString('vi-VN') + ' ₫';
  }
  
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(price);
}

export function formatDate(
  date: Date | string,
  locale = 'en-US',
  options: Intl.DateTimeFormatOptions = {}
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  };
  
  return new Intl.DateTimeFormat(locale, defaultOptions).format(dateObj);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + '...';
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function generateSearchParams(params: Record<string, string | number | boolean | null | undefined>): URLSearchParams {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      searchParams.set(key, String(value));
    }
  });
  
  return searchParams;
}

export function parseSearchParams(searchParams: URLSearchParams): Record<string, string> {
  const params: Record<string, string> = {};
  
  searchParams.forEach((value, key) => {
    params[key] = value;
  });
  
  return params;
}

// Variant utility functions
export function getMinPrice(variants: Variant[]): number {
  return Math.min(...variants.map(v => v.price));
}

export function getMaxPrice(variants: Variant[]): number {
  return Math.max(...variants.map(v => v.price));
}

export function formatVariantPrice(variant: Variant): string {
  return formatPrice(variant.price, variant.currency);
}

export function isVariantInStock(variant: Variant): boolean {
  return variant.stock > 0;
}

export function getVariantById(variants: Variant[], variantId: string): Variant | undefined {
  return variants.find(v => v.id === variantId);
}

export function getVariantBySize(variants: Variant[], size: string): Variant | undefined {
  return variants.find(v => v.size === size);
}

export function getStockStatus(variant: Variant): { status: 'in-stock' | 'low-stock' | 'out-of-stock'; label: string; count?: number } {
  if (variant.stock === 0) {
    return { status: 'out-of-stock', label: 'Out of stock' };
  } else if (variant.stock <= 5) {
    return { status: 'low-stock', label: 'Low stock', count: variant.stock };
  } else {
    return { status: 'in-stock', label: 'In stock', count: variant.stock };
  }
}