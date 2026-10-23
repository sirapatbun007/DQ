import React from 'react';
import { 
  ShoppingBag, 
  Users, 
  MapPin, 
  Sparkles, 
  GraduationCap, 
  Cake,
  Menu as MenuIcon,
  X
} from 'lucide-react';
import { CartItem, QueueTicket, OrderType } from '../types';

interface HeaderProps {
  cartItems: CartItem[];
  onOpenCart: () => void;
  onOpenQueue: () => void;
  onOpenStores: () => void;
  onOpenCakeBuilder: () => void;
  onOpenMemberPerks: () => void;
  activeTicket: QueueTicket | null;
  orderType: OrderType;
  setOrderType: (type: OrderType) => void;
  isStudentDiscountActive: boolean;
  onOpenUpsideDown: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartItems,
  onOpenCart,
  onOpenQueue,
  onOpenStores,
  onOpenCakeBuilder,
  onOpenMemberPerks,
  activeTicket,
  orderType,
  setOrderType,
  isStudentDiscountActive,
  onOpenUpsideDown,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F5]/90 backdrop-blur-md border-b border-stone-200/80 transition-all">
      {/* Top Notice Bar: Student Discount & Upside Down Highlight */}
      <div className="bg-stone-900 text-stone-200 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap">
            <span className="inline-flex items-center gap-1 font-medium text-rose-300">
              <Sparkles className="w-3.5 h-3.5" /> เอกลักษณ์เสิร์ฟคว่ำแก้วไม่หก
            </span>
            <span className="text-stone-500">•</span>
            <span className="text-stone-300">
              สิทธิพิเศษนักเรียน/นักศึกษา รับส่วนลด 10% ทุกบิล
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button 
              onClick={onOpenUpsideDown}
              className="text-stone-300 hover:text-white underline underline-offset-2 flex items-center gap-1 text-[11px] transition-colors"
            >
              ทดลองคว่ำแก้วดูสิ!
            </button>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Brand Mark (Minimalist DQ) */}
          <div className="flex items-center gap-6">
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#E11925] to-[#B30C16] flex items-center justify-center text-white font-extrabold text-xl shadow-sm tracking-tighter group-hover:scale-105 transition-transform">
                DQ
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold tracking-tight text-lg text-stone-900 leading-tight">
                  DAIRY QUEEN
                </span>
                <span className="text-[10px] tracking-widest text-stone-500 uppercase font-medium">
                  Modern Minimalist Ice Cream Boutique
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 pl-4">
              <a 
                href="#menu" 
                className="px-3.5 py-2 text-sm font-medium text-stone-700 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors"
              >
                เมนูทั้งหมด
              </a>
              <button 
                onClick={onOpenQueue} 
                className="px-3.5 py-2 text-sm font-medium text-stone-700 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors flex items-center gap-1.5"
              >
                <Users className="w-4 h-4 text-stone-500" />
                จองคิวหน้าร้าน
                {activeTicket && (
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 animate-pulse">
                    คิว #{activeTicket.ticketNumber}
                  </span>
                )}
              </button>
              <button 
                onClick={onOpenCakeBuilder}
                className="px-3.5 py-2 text-sm font-medium text-stone-700 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors flex items-center gap-1.5"
              >
                <Cake className="w-4 h-4 text-rose-500" />
                ออกแบบเค้กวันเกิด
              </button>
              <button 
                onClick={onOpenStores}
                className="px-3.5 py-2 text-sm font-medium text-stone-700 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors flex items-center gap-1.5"
              >
                <MapPin className="w-4 h-4 text-stone-500" />
                ค้นหาสาขา
              </button>
            </nav>
          </div>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Delivery / Pickup Switch */}
            <div className="hidden md:flex items-center bg-stone-200/70 p-0.5 rounded-xl text-xs font-medium">
              <button
                onClick={() => setOrderType('delivery')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  orderType === 'delivery'
                    ? 'bg-white text-stone-900 shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                เดลิเวอรี
              </button>
              <button
                onClick={() => setOrderType('pickup')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  orderType === 'pickup'
                    ? 'bg-white text-stone-900 shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                รับที่ร้าน
              </button>
            </div>

            {/* Student Perk Badge Trigger */}
            <button
              onClick={onOpenMemberPerks}
              className={`p-2 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 border ${
                isStudentDiscountActive
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : 'bg-stone-100 text-stone-700 border-stone-200 hover:bg-stone-200/60'
              }`}
              title="สิทธิพิเศษสมาชิก & บัตรนักเรียน"
            >
              <GraduationCap className="w-4 h-4 text-rose-600" />
              <span className="hidden sm:inline">
                {isStudentDiscountActive ? 'ลดนักเรียน 10%' : 'สิทธิ์นักเรียน'}
              </span>
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 bg-[#E11925] hover:bg-[#C9131E] text-white px-3.5 py-2 rounded-xl font-medium text-sm shadow-xs transition-transform active:scale-95"
              aria-label="ตะกร้าสินค้า"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">ตะกร้า</span>
              {totalItemCount > 0 && (
                <span className="bg-white text-[#E11925] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItemCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-600 hover:text-stone-900 rounded-lg hover:bg-stone-100"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-[#FBF9F5] px-4 pt-3 pb-6 space-y-2 shadow-lg">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200 mb-2">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              โหมดการสั่งซื้อ
            </span>
            <div className="flex items-center bg-stone-200 p-0.5 rounded-lg text-xs font-medium">
              <button
                onClick={() => setOrderType('delivery')}
                className={`px-3 py-1 rounded-md ${
                  orderType === 'delivery' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600'
                }`}
              >
                เดลิเวอรี
              </button>
              <button
                onClick={() => setOrderType('pickup')}
                className={`px-3 py-1 rounded-md ${
                  orderType === 'pickup' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600'
                }`}
              >
                รับที่ร้าน
              </button>
            </div>
          </div>

          <a 
            href="#menu" 
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-stone-800 rounded-lg hover:bg-stone-100"
          >
            เมนูทั้งหมด
          </a>
          <button 
            onClick={() => { setMobileMenuOpen(false); onOpenQueue(); }}
            className="w-full text-left flex items-center justify-between px-3 py-2 text-base font-medium text-stone-800 rounded-lg hover:bg-stone-100"
          >
            <span className="flex items-center gap-2">
              <Users className="w-5 h-5 text-stone-500" /> จองคิวหน้าร้าน
            </span>
            {activeTicket && (
              <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">
                #{activeTicket.ticketNumber}
              </span>
            )}
          </button>
          <button 
            onClick={() => { setMobileMenuOpen(false); onOpenCakeBuilder(); }}
            className="w-full text-left flex items-center gap-2 px-3 py-2 text-base font-medium text-stone-800 rounded-lg hover:bg-stone-100"
          >
            <Cake className="w-5 h-5 text-rose-500" /> ออกแบบเค้กวันเกิด Custom
          </button>
          <button 
            onClick={() => { setMobileMenuOpen(false); onOpenStores(); }}
            className="w-full text-left flex items-center gap-2 px-3 py-2 text-base font-medium text-stone-800 rounded-lg hover:bg-stone-100"
          >
            <MapPin className="w-5 h-5 text-stone-500" /> ค้นหาสาขาใกล้ฉัน
          </button>
          <button 
            onClick={() => { setMobileMenuOpen(false); onOpenUpsideDown(); }}
            className="w-full text-left flex items-center gap-2 px-3 py-2 text-base font-medium text-stone-800 rounded-lg hover:bg-stone-100"
          >
            <Sparkles className="w-5 h-5 text-amber-500" /> ทดลองคว่ำแก้วบลิซซาร์ด
          </button>
        </div>
      )}
    </header>
  );
};
