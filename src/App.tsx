/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { MenuSection } from './components/MenuSection';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { QueueSystemModal } from './components/QueueSystemModal';
import { CustomCakeModal } from './components/CustomCakeModal';
import { StoreLocatorModal } from './components/StoreLocatorModal';
import { MemberPerksModal } from './components/MemberPerksModal';
import { BlizzardFlipDemo } from './components/BlizzardFlipDemo';
import { Footer } from './components/Footer';

import { CartItem, QueueTicket, OrderType, Order, StoreLocation } from './types';
import { Users, ShoppingBag, Sparkles, CheckCircle2 } from 'lucide-react';

export default function App() {
  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('dq_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Active Queue ticket state
  const [activeTicket, setActiveTicket] = useState<QueueTicket | null>(() => {
    try {
      const saved = localStorage.getItem('dq_queue_ticket');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Order mode state: delivery vs pickup
  const [orderType, setOrderType] = useState<OrderType>('delivery');

  // Student 10% discount state
  const [isStudentDiscountActive, setIsStudentDiscountActive] = useState<boolean>(() => {
    try {
      return localStorage.getItem('dq_student_perk') === 'true';
    } catch {
      return true; // default true for student demographic
    }
  });

  // Modals state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isQueueOpen, setIsQueueOpen] = useState(false);
  const [isCustomCakeOpen, setIsCustomCakeOpen] = useState(false);
  const [isStoresOpen, setIsStoresOpen] = useState(false);
  const [isMemberPerksOpen, setIsMemberPerksOpen] = useState(false);
  const [isUpsideDownOpen, setIsUpsideDownOpen] = useState(false);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('dq_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  // Sync ticket to localStorage
  useEffect(() => {
    try {
      if (activeTicket) {
        localStorage.setItem('dq_queue_ticket', JSON.stringify(activeTicket));
      } else {
        localStorage.removeItem('dq_queue_ticket');
      }
    } catch (e) {
      console.error(e);
    }
  }, [activeTicket]);

  // Sync student discount to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('dq_student_perk', isStudentDiscountActive ? 'true' : 'false');
    } catch (e) {
      console.error(e);
    }
  }, [isStudentDiscountActive]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Cart operations
  const handleAddToCart = (newItem: CartItem) => {
    setCartItems((prev) => {
      // If exact same item ID and configurations exists, increment quantity
      const existingIdx = prev.findIndex(
        (it) =>
          it.menuItem.id === newItem.menuItem.id &&
          it.size === newItem.size &&
          it.sweetness === newItem.sweetness &&
          JSON.stringify(it.selectedToppings) === JSON.stringify(newItem.selectedToppings) &&
          it.notes === newItem.notes
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += newItem.quantity;
        updated[existingIdx].totalPrice = updated[existingIdx].quantity * updated[existingIdx].unitPrice;
        return updated;
      }
      return [...prev, newItem];
    });

    showToast(`เพิ่ม "${newItem.menuItem.name}" ลงในตะกร้าแล้ว`);
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.cartItemId === cartItemId) {
          return {
            ...item,
            quantity: newQty,
            totalPrice: newQty * item.unitPrice,
          };
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = (order: Order) => {
    handleClearCart();
    showToast(`สั่งซื้อสำเร็จ! หมายเลขออเดอร์ #${order.id}`);
  };

  const handleSelectBranchForQueue = (branch: StoreLocation) => {
    setIsStoresOpen(false);
    setIsQueueOpen(true);
  };

  const handleToggleStudentDiscount = () => {
    const nextState = !isStudentDiscountActive;
    setIsStudentDiscountActive(nextState);
    showToast(nextState ? 'เปิดใช้งานส่วนลดนักเรียน 10%' : 'ปิดส่วนลดนักเรียน');
  };

  const handleApplyStudentDiscount = () => {
    setIsStudentDiscountActive(true);
    showToast('เปิดใช้งานส่วนลดนักเรียน 10% เรียบร้อยแล้ว!');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-stone-900 selection:bg-rose-100 selection:text-rose-900">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Header */}
      <Header
        cartItems={cartItems}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenQueue={() => setIsQueueOpen(true)}
        onOpenStores={() => setIsStoresOpen(true)}
        onOpenCakeBuilder={() => setIsCustomCakeOpen(true)}
        onOpenMemberPerks={() => setIsMemberPerksOpen(true)}
        activeTicket={activeTicket}
        orderType={orderType}
        setOrderType={setOrderType}
        isStudentDiscountActive={isStudentDiscountActive}
        onOpenUpsideDown={() => setIsUpsideDownOpen(true)}
      />

      {/* Hero Section */}
      <main className="flex-1">
        <HeroBanner
          onExploreMenu={() => {
            const el = document.getElementById('menu');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenQueue={() => setIsQueueOpen(true)}
          onOpenUpsideDown={() => setIsUpsideDownOpen(true)}
        />

        {/* Menu Section */}
        <MenuSection
          onAddToCart={handleAddToCart}
          onOpenCustomCake={() => setIsCustomCakeOpen(true)}
          onOpenUpsideDown={() => setIsUpsideDownOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenUpsideDown={() => setIsUpsideDownOpen(true)}
      />

      {/* Floating Quick Action Hub (Bottom right for mobile & desktop) */}
      {activeTicket && (
        <aside aria-label="เมนูลัด" className="fixed bottom-6 left-6 z-30 flex items-center gap-2">
          <button
            onClick={() => setIsQueueOpen(true)}
            className="px-4 py-2.5 rounded-full bg-amber-500 hover:bg-amber-600 text-stone-950 text-xs font-black shadow-lg flex items-center gap-1.5 animate-pulse"
          >
            <Users className="w-4 h-4" />
            <span>คิวของคุณ: {activeTicket.ticketNumber}</span>
          </button>
        </aside>
      )}

      {/* Modals & Drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        orderType={orderType}
        setOrderType={setOrderType}
        onProceedToCheckout={handleProceedToCheckout}
        isStudentDiscountActive={isStudentDiscountActive}
        onApplyStudentDiscount={handleApplyStudentDiscount}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        orderType={orderType}
        isStudentDiscountActive={isStudentDiscountActive}
        onOrderSuccess={handleOrderSuccess}
      />

      <QueueSystemModal
        isOpen={isQueueOpen}
        onClose={() => setIsQueueOpen(false)}
        activeTicket={activeTicket}
        setActiveTicket={setActiveTicket}
      />

      <CustomCakeModal
        isOpen={isCustomCakeOpen}
        onClose={() => setIsCustomCakeOpen(false)}
        onAddCakeToCart={handleAddToCart}
      />

      <StoreLocatorModal
        isOpen={isStoresOpen}
        onClose={() => setIsStoresOpen(false)}
        onSelectBranchForQueue={handleSelectBranchForQueue}
      />

      <MemberPerksModal
        isOpen={isMemberPerksOpen}
        onClose={() => setIsMemberPerksOpen(false)}
        isStudentDiscountActive={isStudentDiscountActive}
        onToggleStudentDiscount={handleToggleStudentDiscount}
      />

      <BlizzardFlipDemo
        isOpen={isUpsideDownOpen}
        onClose={() => setIsUpsideDownOpen(false)}
        onApplyStudentDiscount={handleApplyStudentDiscount}
      />

    </div>
  );
}
