import React, { useState } from 'react';
import { 
  CheckCircle2, 
  X, 
  QrCode, 
  CreditCard, 
  Banknote, 
  MapPin, 
  Phone, 
  User, 
  ArrowRight, 
  Package, 
  Clock, 
  Store,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem, OrderType, Order } from '../types';
import { STORE_BRANCHES } from '../data/storesData';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  orderType: OrderType;
  isStudentDiscountActive: boolean;
  onOrderSuccess: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  orderType,
  isStudentDiscountActive,
  onOrderSuccess,
}) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [address, setAddress] = useState('');
  const [selectedBranch, setSelectedBranch] = useState(STORE_BRANCHES[0].name);
  const [pickupTime, setPickupTime] = useState('14:30');
  const [paymentMethod, setPaymentMethod] = useState<'promptpay' | 'credit' | 'cash'>('promptpay');
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);
  const [orderStage, setOrderStage] = useState<'preparing' | 'ready' | 'completed'>('preparing');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
  const discountRate = isStudentDiscountActive ? 0.10 : 0;
  const discount = Math.round(subtotal * discountRate);
  const deliveryFee = orderType === 'delivery' ? (subtotal > 200 ? 0 : 30) : 0;
  const total = Math.max(0, subtotal - discount + deliveryFee);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) return;

    const newOrder: Order = {
      id: `DQ-${Math.floor(100000 + Math.random() * 900000)}`,
      items: cartItems,
      orderType,
      subtotal,
      discount,
      deliveryFee,
      total,
      customerName,
      customerPhone,
      address: orderType === 'delivery' ? address : undefined,
      storeBranch: orderType === 'pickup' ? selectedBranch : undefined,
      pickupTime: orderType === 'pickup' ? pickupTime : undefined,
      paymentMethod,
      status: 'preparing',
      createdAt: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }),
    };

    setCreatedOrder(newOrder);
    setStep('success');
    onOrderSuccess(newOrder);

    // Confetti celebration
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.5 },
      colors: ['#E11925', '#0054A6', '#FFD166'],
    });
  };

  const advanceOrderStage = () => {
    if (orderStage === 'preparing') setOrderStage('ready');
    else if (orderStage === 'ready') setOrderStage('completed');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#FAF8F5] rounded-3xl shadow-2xl border border-stone-200 overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 bg-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-xs">
              DQ
            </div>
            <div>
              <h3 className="font-extrabold text-stone-900 text-base">
                {step === 'form' ? 'เช็กเอาต์ด่วน (Quick Checkout)' : 'สถานะคำสั่งซื้อ'}
              </h3>
              <p className="text-[11px] text-stone-500">
                {step === 'form' ? 'เสร็จสิ้นใน 1 หน้า ไม่ต้องกรอกซับซ้อน' : `หมายเลขออเดอร์ #${createdOrder?.id}`}
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

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto">
          {step === 'form' ? (
            <form onSubmit={handleSubmitOrder} className="space-y-5">
              
              {/* Order Mode Summary Badge */}
              <div className="p-3 bg-stone-100 rounded-2xl flex items-center justify-between text-xs">
                <span className="font-medium text-stone-600">ประเภทคำสั่งซื้อ:</span>
                <span className="font-extrabold text-stone-900 flex items-center gap-1">
                  {orderType === 'delivery' ? '🛵 จัดส่งเดลิเวอรี' : '🏬 รับเองที่หน้าร้าน'}
                </span>
              </div>

              {/* Customer Contact */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
                  1. ข้อมูลผู้สั่งซื้อ
                </label>
                
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    type="text"
                    required
                    placeholder="ชื่อผู้สั่ง เช่น มิวสิค หรือ คุณพลอย"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-stone-200 bg-white text-xs text-stone-800 focus:outline-none focus:border-stone-900"
                  />
                </div>

                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    type="tel"
                    required
                    placeholder="เบอร์โทรศัพท์ (สำหรับไรเดอร์หรือร้านโทรแจ้ง)"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-stone-200 bg-white text-xs text-stone-800 focus:outline-none focus:border-stone-900"
                  />
                </div>
              </div>

              {/* Destination: Delivery Address or Branch Pickup */}
              {orderType === 'delivery' ? (
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
                    2. ที่อยู่สำหรับจัดส่ง
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-stone-400" />
                    <textarea
                      required
                      rows={2}
                      placeholder="บ้านเลขที่, ชื่อคอนโด/หอพัก, ซอย, ถนน หรือจุดสังเกต..."
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-stone-200 bg-white text-xs text-stone-800 focus:outline-none focus:border-stone-900"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
                    2. สาขาและเวลานัดรับ
                  </label>
                  
                  <select
                    value={selectedBranch}
                    onChange={(e) => setSelectedBranch(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-200 bg-white text-xs font-medium text-stone-800"
                  >
                    {STORE_BRANCHES.map((b) => (
                      <option key={b.id} value={b.name}>{b.name}</option>
                    ))}
                  </select>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-stone-500 shrink-0">เวลานัดรับโดยประมาณ:</span>
                    <input
                      type="time"
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      className="p-2 rounded-xl border border-stone-200 bg-white text-xs text-stone-800"
                    />
                  </div>
                </div>
              )}

              {/* Payment Method */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
                  3. ช่องทางการชำระเงิน
                </label>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('promptpay')}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      paymentMethod === 'promptpay'
                        ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                        : 'border-stone-200 bg-white text-stone-700'
                    }`}
                  >
                    <QrCode className="w-5 h-5 mx-auto mb-1 text-rose-500" />
                    <span className="text-xs font-bold block">พร้อมเพย์ QR</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('credit')}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      paymentMethod === 'credit'
                        ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                        : 'border-stone-200 bg-white text-stone-700'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 mx-auto mb-1 text-sky-500" />
                    <span className="text-xs font-bold block">บัตรเครดิต</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cash')}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      paymentMethod === 'cash'
                        ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                        : 'border-stone-200 bg-white text-stone-700'
                    }`}
                  >
                    <Banknote className="w-5 h-5 mx-auto mb-1 text-emerald-500" />
                    <span className="text-xs font-bold block">เงินสด</span>
                  </button>
                </div>

                {/* PromptPay QR Preview if selected */}
                {paymentMethod === 'promptpay' && (
                  <div className="mt-3 p-4 bg-white rounded-2xl border border-stone-200 flex items-center gap-4">
                    <div className="w-20 h-20 bg-stone-100 rounded-xl border border-stone-300 flex items-center justify-center p-1 shrink-0">
                      <QrCode className="w-16 h-16 text-stone-800" />
                    </div>
                    <div className="text-xs space-y-1">
                      <p className="font-extrabold text-stone-900">ไทยพร้อมเพย์ (PromptPay)</p>
                      <p className="text-stone-500">สแกนชำระเงินอัตโนมัติ ยอด ฿{total}</p>
                      <span className="inline-block text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">
                        ฟรีค่าธรรมเนียม
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Bill Summary */}
              <div className="p-4 bg-stone-100/70 rounded-2xl text-xs space-y-1 text-stone-600">
                <div className="flex justify-between">
                  <span>จำนวน:</span>
                  <span className="font-semibold text-stone-900">{cartItems.length} รายการ</span>
                </div>
                <div className="flex justify-between font-extrabold text-sm text-stone-900 pt-2 border-t border-stone-200">
                  <span>ยอดชำระทั้งหมด:</span>
                  <span className="text-rose-600 text-base">฿{total}</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-2xl bg-[#E11925] hover:bg-[#C9131E] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-transform active:scale-95"
              >
                <span>ยืนยันการสั่งซื้อ • ฿{total}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </form>
          ) : (
            /* Order Success & Live Status Tracker */
            <div className="space-y-6 text-center">
              
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-xl font-black text-stone-900">
                  สั่งซื้อสำเร็จเรียบร้อย!
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  หมายเลขออเดอร์ของคุณคือ <span className="font-bold text-rose-600">#{createdOrder?.id}</span>
                </p>
              </div>

              {/* Live Status Progress Bar */}
              <div className="bg-white p-5 rounded-3xl border border-stone-200 text-left space-y-4 shadow-xs">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-stone-800">สถานะคำสั่งซื้อ</span>
                  <span className="font-extrabold text-rose-600">
                    {orderStage === 'preparing' && 'กำลังเตรียมไอศกรีม 🍦'}
                    {orderStage === 'ready' && (orderType === 'delivery' ? 'ไรเดอร์กำลังจัดส่ง 🛵' : 'พร้อมรับที่สาขาแล้ว 🏬')}
                    {orderStage === 'completed' && 'เสร็จสิ้นสมบูรณ์ ✨'}
                  </span>
                </div>

                {/* Step Indicators */}
                <div className="grid grid-cols-3 gap-2">
                  <div className={`h-2 rounded-full ${orderStage === 'preparing' || orderStage === 'ready' || orderStage === 'completed' ? 'bg-[#E11925]' : 'bg-stone-200'}`} />
                  <div className={`h-2 rounded-full ${orderStage === 'ready' || orderStage === 'completed' ? 'bg-[#E11925]' : 'bg-stone-200'}`} />
                  <div className={`h-2 rounded-full ${orderStage === 'completed' ? 'bg-emerald-500' : 'bg-stone-200'}`} />
                </div>

                <div className="text-[11px] text-stone-500 space-y-1 pt-2 border-t border-stone-100">
                  <div className="flex justify-between">
                    <span>ผู้สั่ง:</span>
                    <span className="font-semibold text-stone-800">{createdOrder?.customerName} ({createdOrder?.customerPhone})</span>
                  </div>
                  <div className="flex justify-between">
                    <span>เวลาสั่ง:</span>
                    <span className="font-semibold text-stone-800">{createdOrder?.createdAt} น.</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ยอดชำระ:</span>
                    <span className="font-semibold text-stone-800">฿{createdOrder?.total} ({createdOrder?.paymentMethod})</span>
                  </div>
                </div>

                {/* Simulate advance status */}
                <div className="pt-2 flex justify-between items-center">
                  <span className="text-[10px] text-stone-400">ระบบจำลองความคืบหน้า:</span>
                  <button
                    onClick={advanceOrderStage}
                    disabled={orderStage === 'completed'}
                    className="text-xs bg-stone-100 hover:bg-stone-200 px-3 py-1 rounded-lg text-stone-700 font-semibold disabled:opacity-40"
                  >
                    {orderStage === 'preparing' ? 'จำลอง: พร้อมจัดส่ง →' : orderStage === 'ready' ? 'จำลอง: ลูกค้ารับแล้ว →' : 'เสร็จสมบูรณ์แล้ว'}
                  </button>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-3 px-6 rounded-2xl bg-stone-900 text-white font-bold text-xs sm:text-sm hover:bg-black transition-all"
              >
                กลับสู่หน้าร้าน
              </button>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
