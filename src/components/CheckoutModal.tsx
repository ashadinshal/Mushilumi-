import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Truck,
  CreditCard,
  QrCode,
  Banknote,
  CheckCircle2,
  ArrowRight,
  ChevronLeft,
  Copy,
  Printer,
  Sparkles,
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { OrderDetails } from '../types';
import { MascotBunny } from './MascotBunny';
import { ProductArtwork } from './ProductArtwork';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    closeCheckout,
    cart,
    subtotal,
    shippingFee,
    discountAmount,
    total,
    appliedPromo,
    placeOrder,
    showToast,
  } = useShop();

  const [step, setStep] = useState<'details' | 'payment' | 'confirmed'>('details');
  const [completedOrder, setCompletedOrder] = useState<OrderDetails | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: 'Maharashtra',
    pincode: '',
    paymentMethod: 'upi' as 'upi' | 'card' | 'cod' | 'netbanking',
  });

  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  if (!isCheckoutOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.address || !formData.pincode) {
      showToast('Please fill out all delivery address fields ♡', 'info');
      return;
    }
    setStep('payment');
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    const order = placeOrder({
      customerName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city || 'Mumbai',
      state: formData.state,
      pincode: formData.pincode,
      paymentMethod: formData.paymentMethod,
    });

    setCompletedOrder(order);
    setStep('confirmed');
  };

  const handleFinish = () => {
    closeCheckout();
    setStep('details');
    setCompletedOrder(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#573B35]/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-[#FCE8E2] max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col relative">
        
        {/* Header */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-xs px-6 py-4 border-b border-[#EFE7DE] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-heading text-lg font-medium text-[#453430]">
              {step === 'confirmed' ? 'Order Celebration' : 'Express Checkout'}
            </span>
            {step !== 'confirmed' && (
              <span className="text-xs text-[#8C6A64] font-light">
                · {step === 'details' ? 'Step 1 of 2: Shipping' : 'Step 2 of 2: Payment'}
              </span>
            )}
          </div>

          <button
            onClick={closeCheckout}
            aria-label="Close checkout"
            className="p-1.5 rounded-full text-[#8C6A64] hover:text-[#453430] hover:bg-[#FAF7F2] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STEP 1: SHIPPING DETAILS */}
        {step === 'details' && (
          <form onSubmit={handleDetailsSubmit} className="p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between bg-[#FAF7F2] p-4 rounded-2xl border border-[#EFE7DE]">
              <div>
                <p className="font-heading text-sm font-medium text-[#453430]">
                  Order Total: ₹{total.toLocaleString('en-IN')}
                </p>
                <p className="text-xs text-[#8C6A64] font-light">
                  {cart.length} items in bag · {shippingFee === 0 ? 'Free Shipping Included' : `₹${shippingFee} Standard Shipping`}
                </p>
              </div>
              <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#C97A91] border border-[#EFE7DE]">
                <Truck className="w-4 h-4" />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-heading text-xs font-semibold text-[#453430] uppercase tracking-wider">
                1. Contact & Customer Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-medium text-[#453430] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Aanya Sharma"
                    className="w-full px-3.5 py-2 rounded-xl border border-[#EFE7DE] bg-[#FAF7F2] text-xs font-light text-[#453430] focus:outline-hidden focus:border-[#C97A91] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#453430] mb-1">
                    WhatsApp / Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="10-digit mobile number"
                    className="w-full px-3.5 py-2 rounded-xl border border-[#EFE7DE] bg-[#FAF7F2] text-xs font-light text-[#453430] focus:outline-hidden focus:border-[#C97A91] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#453430] mb-1">
                  Email Address (for order tracking receipt) *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="aanya@example.com"
                  className="w-full px-3.5 py-2 rounded-xl border border-[#EFE7DE] bg-[#FAF7F2] text-xs font-light text-[#453430] focus:outline-hidden focus:border-[#C97A91] focus:bg-white"
                />
              </div>

              <h3 className="font-heading text-xs font-semibold text-[#453430] uppercase tracking-wider pt-2">
                2. Doorstep Delivery Address
              </h3>

              <div>
                <label className="block text-xs font-medium text-[#453430] mb-1">
                  Street Address & Flat / House / Landmark *
                </label>
                <input
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Flat 402, Sunshine Apts, Linking Road"
                  className="w-full px-3.5 py-2 rounded-xl border border-[#EFE7DE] bg-[#FAF7F2] text-xs font-light text-[#453430] focus:outline-hidden focus:border-[#C97A91] focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#453430] mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Mumbai"
                    className="w-full px-3.5 py-2 rounded-xl border border-[#EFE7DE] bg-[#FAF7F2] text-xs font-light text-[#453430] focus:outline-hidden focus:border-[#C97A91] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#453430] mb-1">
                    State
                  </label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full px-2.5 py-2 rounded-xl border border-[#EFE7DE] text-xs font-light text-[#453430] bg-[#FAF7F2] focus:outline-hidden focus:border-[#C97A91] focus:bg-white"
                  >
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Delhi">Delhi NCR</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="West Bengal">West Bengal</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Other">Other States</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#453430] mb-1">
                    PIN Code *
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    required
                    maxLength={6}
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="400050"
                    className="w-full px-3.5 py-2 rounded-xl border border-[#EFE7DE] bg-[#FAF7F2] text-xs font-light text-[#453430] focus:outline-hidden focus:border-[#C97A91] focus:bg-white"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#EFE7DE] flex items-center justify-between">
              <span className="text-xs text-[#8C6A64] font-light">
                🔒 No account needed · Fast guest checkout
              </span>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-full bg-[#C97A91] hover:bg-[#B66980] text-white font-heading font-medium text-xs tracking-wide transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <span>Continue to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: PAYMENT METHOD */}
        {step === 'payment' && (
          <form onSubmit={handlePlaceOrder} className="p-6 sm:p-8 space-y-6">
            <button
              type="button"
              onClick={() => setStep('details')}
              className="inline-flex items-center gap-1 text-xs text-[#8C6A64] hover:text-[#453430] font-medium font-heading cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to Shipping Address</span>
            </button>

            {/* Order Summary Snapshot */}
            <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#EFE7DE] space-y-2 text-xs font-light text-[#8C6A64]">
              <div className="flex justify-between font-medium text-[#453430]">
                <span>Delivering to:</span>
                <span>{formData.fullName} ({formData.pincode})</span>
              </div>
              <div className="flex justify-between">
                <span>Subtotal ({cart.length} items):</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#79A871] font-medium">
                  <span>Coupon &apos;{appliedPromo}&apos; Discount:</span>
                  <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span>
              </div>
              <div className="flex justify-between text-sm font-medium font-heading text-[#453430] pt-2 border-t border-[#EFE7DE]">
                <span>Total Payable:</span>
                <span className="text-[#C97A91]">₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3">
              <h3 className="font-heading text-xs font-semibold text-[#453430] uppercase tracking-wider">
                Select Payment Mode
              </h3>

              {/* UPI Option */}
              <label
                className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                  formData.paymentMethod === 'upi'
                    ? 'border-[#C97A91] bg-[#FAF7F2]'
                    : 'border-[#EFE7DE] bg-white'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="upi"
                  checked={formData.paymentMethod === 'upi'}
                  onChange={handleChange}
                  className="mt-1 text-[#C97A91] accent-[#C97A91]"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <QrCode className="w-4 h-4 text-[#C97A91]" />
                    <span className="font-heading font-medium text-xs text-[#453430]">
                      Instant UPI / QR Code (Google Pay, PhonePe, Paytm)
                    </span>
                  </div>
                  <p className="text-[11px] text-[#8C6A64] font-light mt-0.5">
                    Fastest checkout · Zero transaction fees
                  </p>

                  {formData.paymentMethod === 'upi' && (
                    <div className="mt-3 p-3 bg-white rounded-xl border border-[#EFE7DE] text-xs space-y-2">
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="Enter your VPA (e.g. yourname@okaxis)"
                        className="w-full p-2 border border-[#EFE7DE] rounded-lg text-xs font-light focus:border-[#C97A91] outline-hidden"
                      />
                      <p className="text-[10px] text-[#79A871] font-medium">
                        Instant payment verification enabled
                      </p>
                    </div>
                  )}
                </div>
              </label>

              {/* Card Option */}
              <label
                className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                  formData.paymentMethod === 'card'
                    ? 'border-[#C97A91] bg-[#FAF7F2]'
                    : 'border-[#EFE7DE] bg-white'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={formData.paymentMethod === 'card'}
                  onChange={handleChange}
                  className="mt-1 text-[#C97A91] accent-[#C97A91]"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-[#C97A91]" />
                    <span className="font-heading font-medium text-xs text-[#453430]">
                      Credit / Debit Card (Visa, Mastercard, RuPay)
                    </span>
                  </div>

                  {formData.paymentMethod === 'card' && (
                    <div className="mt-3 p-3 bg-white rounded-xl border border-[#EFE7DE] text-xs space-y-2.5">
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="16-Digit Card Number"
                        maxLength={19}
                        className="w-full p-2 border border-[#EFE7DE] rounded-lg text-xs font-light outline-hidden focus:border-[#C97A91]"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="MM / YY"
                          maxLength={5}
                          className="w-full p-2 border border-[#EFE7DE] rounded-lg text-xs font-light outline-hidden focus:border-[#C97A91]"
                        />
                        <input
                          type="password"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          placeholder="CVV"
                          maxLength={4}
                          className="w-full p-2 border border-[#EFE7DE] rounded-lg text-xs font-light outline-hidden focus:border-[#C97A91]"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </label>

              {/* Cash On Delivery */}
              <label
                className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                  formData.paymentMethod === 'cod'
                    ? 'border-[#C97A91] bg-[#FAF7F2]'
                    : 'border-[#EFE7DE] bg-white'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={formData.paymentMethod === 'cod'}
                  onChange={handleChange}
                  className="mt-1 text-[#C97A91] accent-[#C97A91]"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <Banknote className="w-4 h-4 text-[#79A871]" />
                    <span className="font-heading font-medium text-xs text-[#453430]">
                      Cash on Delivery (COD)
                    </span>
                  </div>
                  <p className="text-[11px] text-[#8C6A64] font-light mt-0.5">
                    Pay with cash or UPI QR at your doorstep upon arrival.
                  </p>
                </div>
              </label>
            </div>

            {/* Place Order CTA */}
            <div className="pt-4 border-t border-[#EFE7DE] flex items-center justify-between">
              <span className="text-xs text-[#79A871] font-medium flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" />
                <span>Bank-grade 256-bit encryption</span>
              </span>

              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-[#453430] hover:bg-[#322522] text-[#FAF7F2] font-heading font-medium text-xs transition-transform active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <span>Complete Order · ₹{total.toLocaleString('en-IN')} ♡</span>
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: ORDER CONFIRMED CELEBRATION */}
        {step === 'confirmed' && completedOrder && (
          <div className="p-6 sm:p-8 text-center space-y-6">
            
            {/* Mascot Celebrating Animation */}
            <div className="w-28 h-28 mx-auto animate-float">
              <MascotBunny pose="celebrate" size={110} />
            </div>

            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-medium font-heading text-[#79A871] bg-[#EAF2E8] px-3 py-1 rounded-full">
                <CheckCircle2 className="w-4 h-4" />
                <span>Order Successfully Confirmed!</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-medium font-heading text-[#453430] tracking-tight pt-2">
                Yay, {completedOrder.customerName} ♡
              </h2>
              <p className="text-xs sm:text-sm text-[#8C6A64] font-light max-w-md mx-auto leading-relaxed">
                Our studio artisans have received your order and are already hand-wrapping your treasures with love, parchment wrap, and sweet ribbons.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="bg-[#FAF7F2] rounded-2xl border border-[#EFE7DE] p-5 text-left text-xs font-light text-[#8C6A64] space-y-3 max-w-lg mx-auto">
              <div className="flex items-center justify-between border-b border-[#EFE7DE] pb-2.5">
                <div>
                  <span className="text-[10px] uppercase font-medium text-[#8C6A64] tracking-wider">Order Number</span>
                  <p className="font-heading text-sm font-medium text-[#453430]">{completedOrder.orderId}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-medium text-[#8C6A64] tracking-wider">Estimated Arrival</span>
                  <p className="font-heading text-xs font-medium text-[#79A871]">{completedOrder.estimatedDeliveryDate}</p>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-2 py-1">
                {completedOrder.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs">
                    <span className="truncate max-w-[70%] text-[#453430]">
                      {item.quantity}× {item.product.name}
                    </span>
                    <span className="font-medium tabular-nums text-[#453430]">
                      ₹{((item.product.price + (item.giftWrap ? 49 : 0)) * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#EFE7DE] pt-2.5 space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Shipping Address:</span>
                  <span className="font-normal text-right max-w-[60%] text-[#453430]">
                    {completedOrder.address}, {completedOrder.city} - {completedOrder.pincode}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Payment Mode:</span>
                  <span className="font-medium uppercase text-[#453430]">{completedOrder.paymentMethod}</span>
                </div>
                <div className="flex justify-between text-sm font-medium font-heading text-[#453430] pt-1">
                  <span>Total Paid:</span>
                  <span className="text-[#C97A91]">₹{completedOrder.total.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Final Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => window.print()}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-[#EFE7DE] bg-white text-[#453430] text-xs font-medium font-heading hover:bg-[#FAF7F2] flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Printer className="w-4 h-4 text-[#8C6A64]" />
                <span>Print Receipt</span>
              </button>

              <button
                onClick={handleFinish}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#C97A91] hover:bg-[#B66980] text-white text-xs font-medium font-heading cursor-pointer flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Continue Shopping Cute Finds</span>
                <span>♡</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
