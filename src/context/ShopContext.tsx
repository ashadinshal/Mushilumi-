import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, ProductVariant, OrderDetails } from '../types';
import { PRODUCTS } from '../data/products';
import confetti from 'canvas-confetti';

interface ToastMessage {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'heart';
}

interface ShopContextType {
  cart: CartItem[];
  wishlist: string[];
  isCartOpen: boolean;
  isWishlistOpen: boolean;
  isSearchOpen: boolean;
  isCheckoutOpen: boolean;
  selectedProduct: Product | null;
  appliedPromo: string | null;
  discountAmount: number;
  promoError: string | null;
  subtotal: number;
  shippingFee: number;
  total: number;
  freeShippingThreshold: number;
  toasts: ToastMessage[];
  recentOrder: OrderDetails | null;

  addToCart: (product: Product, quantity?: number, variant?: ProductVariant, size?: string, giftWrap?: boolean, giftNote?: string) => void;
  updateQuantity: (index: number, newQty: number) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  openProductModal: (product: Product) => void;
  closeProductModal: () => void;
  openCart: () => void;
  closeCart: () => void;
  openWishlist: () => void;
  closeWishlist: () => void;
  openSearch: () => void;
  closeSearch: () => void;
  openCheckout: () => void;
  closeCheckout: () => void;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  placeOrder: (details: Omit<OrderDetails, 'orderId' | 'items' | 'subtotal' | 'shipping' | 'discount' | 'total' | 'placedAt' | 'estimatedDeliveryDate'>) => OrderDetails;
  showToast: (message: string, type?: 'success' | 'info' | 'heart') => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('moschilumii_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('moschilumii_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [recentOrder, setRecentOrder] = useState<OrderDetails | null>(() => {
    try {
      const saved = localStorage.getItem('moschilumii_last_order');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const freeShippingThreshold = 999;

  useEffect(() => {
    localStorage.setItem('moschilumii_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('moschilumii_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const showToast = (message: string, type: 'success' | 'info' | 'heart' = 'heart') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  const addToCart = (
    product: Product,
    quantity = 1,
    variant?: ProductVariant,
    size?: string,
    giftWrap = false,
    giftNote = ''
  ) => {
    const chosenVariant = variant || (product.variants.length > 0 ? product.variants[0] : undefined);
    const chosenSize = size || (product.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined);

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedVariant?.name === chosenVariant?.name &&
          item.selectedSize === chosenSize
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
          giftWrap: giftWrap || next[existingIndex].giftWrap,
          giftNote: giftNote || next[existingIndex].giftNote,
        };
        return next;
      } else {
        return [
          ...prev,
          {
            product,
            quantity,
            selectedVariant: chosenVariant,
            selectedSize: chosenSize,
            giftWrap,
            giftNote,
          },
        ];
      }
    });

    showToast(`Added ${product.name.slice(0, 24)}... to bag! ♡`, 'heart');
    setIsCartOpen(true);
  };

  const updateQuantity = (index: number, newQty: number) => {
    setCart((prev) => {
      if (newQty <= 0) {
        return prev.filter((_, i) => i !== index);
      }
      const next = [...prev];
      next[index] = { ...next[index], quantity: newQty };
      return next;
    });
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
    showToast('Removed item from bag', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from wishlist', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to your wishlist ♡', 'heart');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const openProductModal = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
  };

  // Financial calculations
  const subtotal = cart.reduce((acc, item) => {
    const itemPrice = item.product.price * item.quantity;
    const wrapPrice = item.giftWrap ? 49 * item.quantity : 0;
    return acc + itemPrice + wrapPrice;
  }, 0);

  let discountAmount = 0;
  if (appliedPromo === 'CUTE10') {
    discountAmount = Math.round(subtotal * 0.1);
  } else if (appliedPromo === 'HAPPYHEART') {
    discountAmount = Math.min(subtotal, 150);
  } else if (appliedPromo === 'FREESHIP') {
    discountAmount = 0; // handled via free shipping
  }

  const shippingFee = subtotal === 0 ? 0 : (subtotal >= freeShippingThreshold || appliedPromo === 'FREESHIP') ? 0 : 99;
  const total = Math.max(0, subtotal - discountAmount + shippingFee);

  const applyPromoCode = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === 'CUTE10') {
      setAppliedPromo('CUTE10');
      setPromoError(null);
      showToast('10% off code applied! ♡', 'success');
      return true;
    } else if (clean === 'HAPPYHEART') {
      setAppliedPromo('HAPPYHEART');
      setPromoError(null);
      showToast('₹150 off code applied! ♡', 'success');
      return true;
    } else if (clean === 'FREESHIP') {
      setAppliedPromo('FREESHIP');
      setPromoError(null);
      showToast('Free shipping coupon applied! ♡', 'success');
      return true;
    } else {
      setPromoError('Invalid coupon. Try CUTE10 or HAPPYHEART');
      return false;
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    setPromoError(null);
    showToast('Coupon removed', 'info');
  };

  const placeOrder = (details: Omit<OrderDetails, 'orderId' | 'items' | 'subtotal' | 'shipping' | 'discount' | 'total' | 'placedAt' | 'estimatedDeliveryDate'>): OrderDetails => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const orderId = `ML-${randomNum}`;

    const deliveryDays = 3;
    const estDate = new Date();
    estDate.setDate(estDate.getDate() + deliveryDays);
    const formattedDate = estDate.toLocaleDateString('en-IN', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });

    const newOrder: OrderDetails = {
      ...details,
      orderId,
      items: [...cart],
      subtotal,
      shipping: shippingFee,
      discount: discountAmount,
      promoCodeApplied: appliedPromo || undefined,
      total,
      placedAt: new Date().toLocaleDateString('en-IN', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      estimatedDeliveryDate: formattedDate
    };

    setRecentOrder(newOrder);
    localStorage.setItem('moschilumii_last_order', JSON.stringify(newOrder));
    clearCart();

    // Trigger sweet confetti!
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#D98DA4', '#ECAFC0', '#FFF5E8', '#FFE28A', '#79A871']
      });
    } catch {
      // safe fallback
    }

    return newOrder;
  };

  return (
    <ShopContext.Provider
      value={{
        cart,
        wishlist,
        isCartOpen,
        isWishlistOpen,
        isSearchOpen,
        isCheckoutOpen,
        selectedProduct,
        appliedPromo,
        discountAmount,
        promoError,
        subtotal,
        shippingFee,
        total,
        freeShippingThreshold,
        toasts,
        recentOrder,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        toggleWishlist,
        isInWishlist,
        openProductModal,
        closeProductModal,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        openWishlist: () => setIsWishlistOpen(true),
        closeWishlist: () => setIsWishlistOpen(false),
        openSearch: () => setIsSearchOpen(true),
        closeSearch: () => setIsSearchOpen(false),
        openCheckout: () => setIsCheckoutOpen(true),
        closeCheckout: () => setIsCheckoutOpen(false),
        applyPromoCode,
        removePromoCode,
        placeOrder,
        showToast,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
