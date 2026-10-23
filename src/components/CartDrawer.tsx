import React, { useState } from 'react';
import { 
  ShoppingBag, 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  Tag, 
  Truck, 
  Store,
  CheckCircle2
} from 'lucide-react';
import { CartItem, OrderType } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  orderType: OrderType;
  setOrderType: (type: OrderType) => void;
  onProceedToCheckout: () => void;
  isStudentDiscountActive: boolean;
  onApplyStudentDiscount: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  orderType,
  setOrderType,
  onProceedToCheckout,
  isStudentDiscountActive,
  onApplyStudentDiscount,
}) => {
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
  const discountRate = isStudentDiscountActive ? 0.10 : 0;
  const discount = Math.round(subtotal * discountRate);
  const deliveryFee = orderType === 'delivery' ? (subtotal > 200 ? 0 : 30) : 0;
  const grandTotal = Math.max(0, subtotal - discount + deliveryFee);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');
    const code = promoCodeInput.trim().toUpperCase();

    if (code === 'STUDENT10' || code === 'DQ10') {
      onApplyStudentDiscount();
      setPromoSuccess('ใช้โค้ดส่วนลด 10% สำเร็จ!');
      setPromoCodeInput('');
    } else {
      setPromoError('รหัสส่วนลดไม่ถูกต้อง ลองใช้ STUDENT10');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/60 backdrop-blur-xs animate-fade-in">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] border-l border-stone-200 shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-stone-200 bg-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-stone-900 text-base">ตะกร้าสินค้าของคุณ</h3>
                <p className="text-xs text-stone-500">
                  {cartItems.length} รายการ ({orderType === 'delivery' ? 'บริการจัดส่ง' : 'รับเองที่ร้าน'})
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Delivery / Pickup switcher in drawer */}
          <div className="p-3 bg-stone-100 border-b border-stone-200 flex gap-2">
            <button
              onClick={() => setOrderType('delivery')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                orderType === 'delivery'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Truck className="w-3.5 h-3.5 text-rose-600" /> เดลิเวอรีส่งถึงบ้าน
            </button>
            <button
              onClick={() => setOrderType('pickup')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                orderType === 'pickup'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Store className="w-3.5 h-3.5 text-amber-600" /> สั่งล่วงหน้ารับที่ร้าน
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 rounded-3xl bg-stone-100 text-stone-300 flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="text-stone-600 font-bold text-sm">ยังไม่มีสินค้าในตะกร้า</p>
                <p className="text-xs text-stone-400 max-w-xs mx-auto">
                  เลือกไอศกรีมบลิซซาร์ด ซอฟต์เสิร์ฟ หรือเค้กวันเกิดเพื่อสั่งซื้อ
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 px-4 py-2 rounded-xl bg-stone-900 text-white text-xs font-semibold"
                >
                  เลือกเมนูไอศกรีม
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.cartItemId}
                  className="bg-white rounded-2xl p-3.5 border border-stone-200/90 shadow-2xs space-y-2"
                >
                  <div className="flex gap-3">
                    <img
                      src={item.menuItem.imageUrl}
                      alt={item.menuItem.name}
                      className="w-16 h-16 rounded-xl object-cover shrink-0 bg-stone-100"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-bold text-stone-900 text-xs truncate">
                          {item.menuItem.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.cartItemId)}
                          className="text-stone-400 hover:text-rose-600 p-0.5"
                          title="ลบรายการ"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Options breakdown */}
                      <div className="text-[11px] text-stone-500 space-y-0.5 mt-0.5">
                        {item.size && <div>ขนาด: {item.size}</div>}
                        {item.sweetness && <div>ความหวาน: {item.sweetness}</div>}
                        {item.selectedToppings && item.selectedToppings.length > 0 && (
                          <div>
                            ท็อปปิ้ง: {item.selectedToppings.map((t) => t.name).join(', ')}
                          </div>
                        )}
                        {item.notes && <div className="text-stone-400 italic">"{item.notes}"</div>}
                      </div>
                    </div>
                  </div>

                  {/* Quantity & Price Footer */}
                  <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs">
                    <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50">
                      <button
                        onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
                        className="p-1 hover:text-stone-900 text-stone-500"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 font-bold text-stone-800">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                        className="p-1 hover:text-stone-900 text-stone-500"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="font-extrabold text-stone-900">
                      ฿{item.totalPrice}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Bottom Checkout & Billing Section */}
          {cartItems.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-stone-200 bg-white space-y-4">
              
              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="space-y-1">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400" />
                    <input
                      type="text"
                      placeholder="โค้ดส่วนลด เช่น STUDENT10"
                      value={promoCodeInput}
                      onChange={(e) => setPromoCodeInput(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 rounded-xl border border-stone-200 text-xs uppercase text-stone-800 focus:outline-none focus:border-stone-900"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3.5 py-2 rounded-xl bg-stone-900 text-white text-xs font-semibold hover:bg-black"
                  >
                    ใช้โค้ด
                  </button>
                </div>
                {promoError && <p className="text-[11px] text-rose-600">{promoError}</p>}
                {promoSuccess && <p className="text-[11px] text-emerald-600 font-semibold">{promoSuccess}</p>}
                {isStudentDiscountActive && (
                  <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> เปิดใช้งานสิทธิ์ส่วนลดนักเรียน 10% แล้ว
                  </p>
                )}
              </form>

              {/* Bill Breakdown */}
              <div className="space-y-1.5 text-xs text-stone-600 pt-2 border-t border-stone-100">
                <div className="flex justify-between">
                  <span>ยอดรวมสินค้า</span>
                  <span>฿{subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>ส่วนลดนักเรียน 10%</span>
                    <span>-฿{discount}</span>
                  </div>
                )}
                {orderType === 'delivery' && (
                  <div className="flex justify-between">
                    <span>ค่าจัดส่ง</span>
                    <span>{deliveryFee === 0 ? 'ส่งฟรี (ครบ 200.-)' : `฿${deliveryFee}`}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-stone-200 flex justify-between items-center text-sm font-black text-stone-900">
                  <span>ยอดชำระสุทธิ</span>
                  <span className="text-lg text-rose-600">฿{grandTotal}</span>
                </div>
              </div>

              {/* Checkout Action Button */}
              <button
                onClick={onProceedToCheckout}
                className="w-full py-3.5 px-6 rounded-2xl bg-[#E11925] hover:bg-[#C9131E] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-transform active:scale-95"
              >
                <span>ดำเนินการสั่งซื้อ (Checkout ด่วน)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
