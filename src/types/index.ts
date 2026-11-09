export type Category = 
  | 'all'
  | 'crochet'
  | 'baby'
  | 'couple'
  | 'lifestyle'
  | 'hampers'
  | 'accessories';

export interface ProductVariant {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: Category;
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  rating: number;
  reviewCount: number;
  badge?: 'Bestseller' | 'Handmade' | 'New' | 'Limited Run' | 'Couple Set' | 'Gift Pick';
  shortDescription: string;
  fullDescription: string;
  materials: string;
  dimensions?: string;
  careInstructions?: string;
  stock: number;
  inStock: boolean;
  variants: ProductVariant[];
  sizes?: string[];
  image: string;
  secondaryImage?: string;
  tags: string[];
  giftRecipient: ('her' | 'him' | 'couple' | 'baby' | 'bestie')[];
  giftOccasion: ('birthday' | 'anniversary' | 'valentines' | 'just_because')[];
  artisanNote?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: ProductVariant;
  selectedSize?: string;
  giftWrap?: boolean;
  giftNote?: string;
}

export interface CustomerReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  productName: string;
  location: string;
  avatarBg: string;
}

export interface DeliveryEstimate {
  pincode: string;
  city: string;
  state: string;
  deliveryDays: number;
  estimatedDate: string;
  isAvailable: boolean;
  freeShippingQualified: boolean;
}

export interface OrderDetails {
  orderId: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  promoCodeApplied?: string;
  total: number;
  paymentMethod: 'upi' | 'card' | 'cod' | 'netbanking';
  placedAt: string;
  estimatedDeliveryDate: string;
}
