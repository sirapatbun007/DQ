import React, { useState } from 'react';
import { Cake, Sparkles, Calendar, Clock, MapPin, X, Check, Heart } from 'lucide-react';
import { STORE_BRANCHES } from '../data/storesData';
import { CartItem } from '../types';

interface CustomCakeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCakeToCart: (item: CartItem) => void;
}

export const CustomCakeModal: React.FC<CustomCakeModalProps> = ({
  isOpen,
  onClose,
  onAddCakeToCart,
}) => {
  const [cakeSize, setCakeSize] = useState<'6-inch' | '8-inch' | '10-inch'>('8-inch');
  const [cakeShape, setCakeShape] = useState<'round' | 'heart' | 'square'>('round');
  const [baseFlavor, setBaseFlavor] = useState('วานิลลาครีมมี่นมสด');
  const [topFlavor, setTopFlavor] = useState('โอรีโอบลิซซาร์ด');
  const [centerLayer, setCenterLayer] = useState('ฟัดจ์และคุกกี้ครัมเบิลกรุบกรอบ (Signature)');
  const [pipingColor, setPipingColor] = useState<'rose' | 'chocolate' | 'blue' | 'cream'>('rose');
  const [customMessage, setCustomMessage] = useState('Happy Birthday 🎉');
  const [candleCount, setCandleCount] = useState<number>(5);
  const [pickupDate, setPickupDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2); // Default 2 days in advance
    return d.toISOString().split('T')[0];
  });
  const [pickupTime, setPickupTime] = useState<string>('14:00');
  const [storeBranch, setStoreBranch] = useState<string>(STORE_BRANCHES[0].name);

  if (!isOpen) return null;

  const sizePrices = {
    '6-inch': 399,
    '8-inch': 499,
    '10-inch': 699,
  };

  const currentPrice = sizePrices[cakeSize];

  const handleAddToCart = () => {
    const cakeCartItem: CartItem = {
      cartItemId: `custom-cake-${Date.now()}`,
      menuItem: {
        id: 'custom-cake-preorder',
        name: `เค้กไอศกรีม Custom (${cakeSize === '6-inch' ? '6 นิ้ว' : cakeSize === '8-inch' ? '8 นิ้ว' : '10 นิ้ว'})`,
        nameEn: `Custom Ice Cream Cake (${cakeShape})`,
        category: 'ice-cream-cake',
        price: currentPrice,
        description: `ข้อความ: "${customMessage}" | ฐาน: ${baseFlavor} | บน: ${topFlavor} | ไส้กลาง: ${centerLayer} | รับวันที่: ${pickupDate} ${pickupTime}น. ที่สาขา ${storeBranch}`,
        imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop&q=80',
        tags: ['สั่งทำล่วงหน้า', 'เค้กวันเกิด Custom'],
      },
      size: `${cakeSize} (${cakeShape})`,
      notes: `ข้อความหน้าเค้ก: "${customMessage}", เทียน ${candleCount} เล่ม, รับที่ ${storeBranch} วันที่ ${pickupDate} เวลา ${pickupTime}`,
      quantity: 1,
      unitPrice: currentPrice,
      totalPrice: currentPrice,
    };

    onAddCakeToCart(cakeCartItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#FAF8F5] rounded-3xl shadow-2xl border border-stone-200 overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-stone-200 bg-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <Cake className="w-5 h-5" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-600 uppercase">
                <Sparkles className="w-3 h-3" /> จุดเด่นตามสรุปส่วนที่ 4 &amp; 5 ของ Brief
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900">
                ระบบสั่งเค้กไอศกรีม Customize ล่วงหน้า
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body: Left is preview, Right is step options */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-y-auto">
          
          {/* Left Column: Live Visual Cake Preview (4 cols) */}
          <div className="lg:col-span-5 p-6 bg-stone-100/70 border-r border-stone-200 flex flex-col items-center justify-center text-center">
            
            <span className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-4">
              พรีวิวหน้าเค้กของคุณ (Live Preview)
            </span>

            {/* Simulated 3D / Layered Cake Visual */}
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center">
              
              {/* Outer Plate */}
              <div className="absolute inset-0 bg-white rounded-full shadow-lg border-4 border-stone-200" />
              
              {/* Cake Body Shape */}
              <div
                className={`relative w-44 h-44 sm:w-48 sm:h-48 transition-all duration-300 flex flex-col items-center justify-center p-4 text-center shadow-inner ${
                  cakeShape === 'heart'
                    ? 'rounded-3xl rotate-45 transform scale-90'
                    : cakeShape === 'square'
                    ? 'rounded-2xl'
                    : 'rounded-full'
                } ${
                  pipingColor === 'rose'
                    ? 'bg-rose-100 border-4 border-rose-300'
                    : pipingColor === 'chocolate'
                    ? 'bg-amber-950/20 border-4 border-amber-900'
                    : pipingColor === 'blue'
                    ? 'bg-sky-100 border-4 border-sky-300'
                    : 'bg-amber-50 border-4 border-amber-200'
                }`}
              >
                {/* Center message styling */}
                <div className={cakeShape === 'heart' ? '-rotate-45' : ''}>
                  <div className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                    DQ Ice Cream
                  </div>
                  <div className="font-serif italic font-bold text-base sm:text-lg text-stone-800 break-words px-2 leading-tight">
                    {customMessage || 'ข้อความบนเค้ก'}
                  </div>
                  <div className="text-[10px] text-stone-500 mt-1 font-medium">
                    {topFlavor}
                  </div>
                </div>
              </div>

              {/* Candles indicator */}
              <div className="absolute -top-1 flex items-center justify-center gap-1 z-20">
                {Array.from({ length: Math.min(candleCount, 8) }).map((_, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <span className="w-1.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                    <span className="w-1 h-3 bg-red-400 rounded-xs" />
                  </div>
                ))}
              </div>

            </div>

            {/* Cake Layer Architecture breakdown */}
            <div className="w-full mt-6 bg-white p-3.5 rounded-2xl border border-stone-200 text-left text-xs space-y-1.5">
              <div className="flex justify-between text-stone-500">
                <span>ขนาดเค้ก:</span>
                <span className="font-bold text-stone-800">
                  {cakeSize === '6-inch' ? '6 นิ้ว (4-6 ท่าน)' : cakeSize === '8-inch' ? '8 นิ้ว (8-10 ท่าน)' : '10 นิ้ว (12-16 ท่าน)'}
                </span>
              </div>
              <div className="flex justify-between text-stone-500">
                <span>ชั้นบน:</span>
                <span className="font-semibold text-stone-800">{topFlavor}</span>
              </div>
              <div className="flex justify-between text-stone-500">
                <span>ไส้กลาง:</span>
                <span className="font-semibold text-stone-800">{centerLayer}</span>
              </div>
              <div className="flex justify-between text-stone-500">
                <span>ฐานล่าง:</span>
                <span className="font-semibold text-stone-800">{baseFlavor}</span>
              </div>
              <div className="pt-2 border-t border-stone-100 flex justify-between items-center text-sm font-extrabold text-stone-900">
                <span>ราคารวม:</span>
                <span className="text-rose-600 text-base">฿{currentPrice}</span>
              </div>
            </div>

          </div>

          {/* Right Column: Customizer Controls (7 cols) */}
          <div className="lg:col-span-7 p-6 space-y-6">
            
            {/* Step 1: Size & Shape */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
                1. เลือกขนาดและรูปทรงเค้ก
              </label>
              
              {/* Size Buttons */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: '6-inch', label: '6 นิ้ว', desc: '4-6 ท่าน', price: '฿399' },
                  { id: '8-inch', label: '8 นิ้ว (ฮิต)', desc: '8-10 ท่าน', price: '฿499' },
                  { id: '10-inch', label: '10 นิ้ว', desc: '12-16 ท่าน', price: '฿699' },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setCakeSize(s.id as any)}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      cakeSize === s.id
                        ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                        : 'border-stone-200 bg-white hover:border-stone-300 text-stone-800'
                    }`}
                  >
                    <div className="text-xs font-extrabold">{s.label}</div>
                    <div className={`text-[10px] ${cakeSize === s.id ? 'text-stone-300' : 'text-stone-500'}`}>{s.desc}</div>
                    <div className="text-xs font-bold mt-1 text-rose-500">{s.price}</div>
                  </button>
                ))}
              </div>

              {/* Shape Buttons */}
              <div className="flex gap-2">
                {[
                  { id: 'round', label: 'ทรงกลมคลาสสิก' },
                  { id: 'heart', label: 'ทรงหัวใจ ❤️' },
                  { id: 'square', label: 'ทรงสี่เหลี่ยม' },
                ].map((shp) => (
                  <button
                    key={shp.id}
                    onClick={() => setCakeShape(shp.id as any)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
                      cakeShape === shp.id
                        ? 'border-rose-600 bg-rose-50 text-rose-800 font-bold'
                        : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    {shp.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Ice Cream Flavors */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
                2. เลือกรสชาติไอศกรีม (2 ชั้น)
              </label>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Top Layer */}
                <div>
                  <span className="text-[11px] text-stone-500 font-medium block mb-1">ชั้นบน (Top Layer)</span>
                  <select
                    value={topFlavor}
                    onChange={(e) => setTopFlavor(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-200 bg-white text-xs font-medium text-stone-800 focus:outline-none focus:border-stone-900"
                  >
                    <option value="โอรีโอบลิซซาร์ด">โอรีโอ บลิซซาร์ด (Oreo)</option>
                    <option value="คิทแคท บลิซซาร์ด">คิทแคท บลิซซาร์ด (KitKat)</option>
                    <option value="ช็อกโกแลต เอ็กซ์ตรีม">ช็อกโกแลต เอ็กซ์ตรีม (Choco)</option>
                    <option value="สตรอว์เบอร์รีชีสเค้ก">สตรอว์เบอร์รีชีสเค้ก</option>
                    <option value="มัทฉะกรีนทีแท้">มัทฉะกรีนทีแท้</option>
                  </select>
                </div>

                {/* Base Layer */}
                <div>
                  <span className="text-[11px] text-stone-500 font-medium block mb-1">ฐานล่าง (Base Layer)</span>
                  <select
                    value={baseFlavor}
                    onChange={(e) => setBaseFlavor(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-200 bg-white text-xs font-medium text-stone-800 focus:outline-none focus:border-stone-900"
                  >
                    <option value="วานิลลาครีมมี่นมสด">วานิลลาครีมมี่นมสด</option>
                    <option value="ช็อกโกแลตฟัดจ์เข้มข้น">ช็อกโกแลตฟัดจ์เข้มข้น</option>
                    <option value="มัทฉะนมสด">มัทฉะนมสด</option>
                    <option value="มะม่วงน้ำดอกไม้">มะม่วงน้ำดอกไม้ (Seasonal)</option>
                  </select>
                </div>
              </div>

              {/* Center Layer */}
              <div>
                <span className="text-[11px] text-stone-500 font-medium block mb-1">ชั้นไส้กลาง (Center Layer)</span>
                <select
                  value={centerLayer}
                  onChange={(e) => setCenterLayer(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-200 bg-white text-xs font-medium text-stone-800 focus:outline-none focus:border-stone-900"
                >
                  <option value="ฟัดจ์และคุกกี้ครัมเบิลกรุบกรอบ (Signature)">
                    ฟัดจ์และคุกกี้ครัมเบิลกรุบกรอบ (Signature Fudge Crunch)
                  </option>
                  <option value="สตรอว์เบอร์รีเพียวเร่และก้อนชีสเค้ก">
                    สตรอว์เบอร์รีเพียวเร่และก้อนชีสเค้ก (Strawberry Cheesecake Center)
                  </option>
                  <option value="คาราเมลทอฟฟี่และบราวนี่หนึบ">
                    คาราเมลทอฟฟี่และบราวนี่หนึบ (Toffee Brownie Center)
                  </option>
                </select>
              </div>
            </div>

            {/* Step 3: Message & Candles */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
                3. ข้อความหน้าเค้กและเทียนวันเกิด
              </label>

              <div>
                <span className="text-[11px] text-stone-500 font-medium block mb-1">ข้อความเขียนหน้าเค้ก (ฟรี)</span>
                <input
                  type="text"
                  maxLength={35}
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder="เช่น Happy Birthday Ploy 🎂"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white text-xs text-stone-800 focus:outline-none focus:border-stone-900"
                />
              </div>

              {/* Piping Color and Candles */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[11px] text-stone-500 font-medium block mb-1">โทนสีขอบครีม</span>
                  <div className="flex gap-2">
                    {[
                      { id: 'rose', bg: 'bg-rose-500' },
                      { id: 'chocolate', bg: 'bg-amber-900' },
                      { id: 'blue', bg: 'bg-sky-500' },
                      { id: 'cream', bg: 'bg-amber-200' },
                    ].map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setPipingColor(c.id as any)}
                        className={`w-7 h-7 rounded-full ${c.bg} border-2 ${
                          pipingColor === c.id ? 'border-stone-900 ring-2 ring-stone-900/20 scale-110' : 'border-transparent'
                        } transition-transform`}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[11px] text-stone-500 font-medium block mb-1">จำนวนเทียนวันเกิด (เล่ม)</span>
                  <input
                    type="number"
                    min={0}
                    max={50}
                    value={candleCount}
                    onChange={(e) => setCandleCount(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white text-xs font-medium text-stone-800"
                  />
                </div>
              </div>
            </div>

            {/* Step 4: Pickup Date, Time & Branch */}
            <div className="space-y-3 pt-2 border-t border-stone-200">
              <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
                4. วันเวลานัดรับและสาขา
              </label>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div>
                  <span className="text-[11px] text-stone-500 font-medium block mb-1 flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> วันที่นัดรับ
                  </span>
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-200 bg-white text-xs text-stone-800"
                  />
                </div>

                <div>
                  <span className="text-[11px] text-stone-500 font-medium block mb-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> เวลานัดรับ
                  </span>
                  <input
                    type="time"
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-200 bg-white text-xs text-stone-800"
                  />
                </div>

                <div>
                  <span className="text-[11px] text-stone-500 font-medium block mb-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> สาขาที่รับ
                  </span>
                  <select
                    value={storeBranch}
                    onChange={(e) => setStoreBranch(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-200 bg-white text-xs text-stone-800"
                  >
                    {STORE_BRANCHES.map((b) => (
                      <option key={b.id} value={b.name}>{b.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Modal Bottom CTA */}
        <div className="p-4 sm:p-5 border-t border-stone-200 bg-white flex items-center justify-between gap-4">
          <div>
            <span className="text-xs text-stone-400 block">ยอดรวมค่าเค้ก Custom</span>
            <span className="text-xl font-extrabold text-stone-900">฿{currentPrice}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 text-xs font-semibold"
            >
              ยกเลิก
            </button>
            <button
              onClick={handleAddToCart}
              className="px-6 py-2.5 rounded-xl bg-[#E11925] hover:bg-[#C9131E] text-white text-xs sm:text-sm font-bold shadow-xs flex items-center gap-2 transition-transform active:scale-95"
            >
              <Check className="w-4 h-4" />
              ยืนยันแบบเค้ก &amp; ใส่ตะกร้า
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
