import React from 'react';
import { Sparkles, ArrowRight, Clock, ShieldCheck, RotateCw } from 'lucide-react';

interface HeroBannerProps {
  onExploreMenu: () => void;
  onOpenQueue: () => void;
  onOpenUpsideDown: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onExploreMenu,
  onOpenQueue,
  onOpenUpsideDown,
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-14 lg:py-16 bg-gradient-to-b from-[#FBF9F5] via-[#F6F1EA] to-[#FBF9F5]">
      {/* Subtle organic background blur spheres */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-rose-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Student & Minimal Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900/5 border border-stone-300 text-stone-800 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              <span>ไอศกรีมมินิมอล • สั่งเดลิเวอรี &amp; จองคิวหน้าร้านได้ทันที</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-stone-900 tracking-tight leading-[1.15]">
                ความเข้มข้นระดับตำนาน{' '}
                <span className="relative whitespace-nowrap text-[#E11925]">
                  เสิร์ฟคว่ำแก้ว
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-rose-300 -z-10" viewBox="0 0 100 20" preserveAspectRatio="none">
                    <path d="M0,15 Q50,0 100,15" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                  </svg>
                </span>{' '}
                ไม่หก
              </h1>
              <p className="text-base sm:text-lg text-stone-600 max-w-xl font-normal leading-relaxed">
                สัมผัสเนื้อไอศกรีมซอฟต์เสิร์ฟแท้เนียนนุ่มและบลิซซาร์ดปั่นแน่นท็อปปิ้ง 
                ราคาสบายกระเป๋าเริ่มต้น 19.- ตอบโจทย์เพื่อนๆ นักเรียน ดับร้อนทันใจ ไม่ต้องทนรอคิวนาน
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreMenu}
                className="px-6 py-3.5 rounded-2xl bg-[#E11925] hover:bg-[#C9131E] text-white font-semibold text-sm shadow-md shadow-rose-600/20 flex items-center gap-2 hover:-translate-y-0.5 transition-all"
              >
                สั่งซื้อออนไลน์ทันที
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenQueue}
                className="px-5 py-3.5 rounded-2xl bg-white hover:bg-stone-50 border border-stone-200 text-stone-800 font-semibold text-sm shadow-xs flex items-center gap-2 hover:-translate-y-0.5 transition-all"
              >
                <Clock className="w-4 h-4 text-stone-500" />
                จองคิวหน้าร้านออนไลน์
              </button>

              <button
                onClick={onOpenUpsideDown}
                className="px-5 py-3.5 rounded-2xl bg-amber-50 hover:bg-amber-100 border border-amber-200/80 text-amber-900 font-medium text-sm flex items-center gap-2 transition-all"
              >
                <RotateCw className="w-4 h-4 text-amber-700 animate-spin-slow" />
                กิมมิกคว่ำแก้ว (ลองเล่น)
              </button>
            </div>

            {/* 3 Pillars from the student brief */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-stone-200/70">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-stone-900 font-bold text-sm">
                  <RotateCw className="w-4 h-4 text-rose-600" />
                  คว่ำแก้วก่อนส่ง
                </div>
                <p className="text-xs text-stone-500">
                  รับประกันความเข้มข้น 100% ไม่หลุดแก้ว
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-stone-900 font-bold text-sm">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  ราคาย่อมเยา
                </div>
                <p className="text-xs text-stone-500">
                  โคนเริ่มต้น 19.- คุ้มค่าน้องนักเรียน
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-stone-900 font-bold text-sm">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  เมนูเทศกาลใหม่
                </div>
                <p className="text-xs text-stone-500">
                  รสชาติกระแสนิยม ข้าวเหนียวมะม่วง / บิสคอฟฟ์
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Aesthetic Hero Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              
              {/* Product Showcase Card */}
              <div className="relative rounded-3xl bg-white p-5 shadow-xl shadow-stone-200/60 border border-stone-200/80 overflow-hidden">
                <div className="relative h-72 sm:h-80 rounded-2xl overflow-hidden bg-stone-100">
                  <img
                    src="https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&auto=format&fit=crop&q=80"
                    alt="Signature Oreo Blizzard"
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Floating Badge on Image */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-stone-900 shadow-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Signature Oreo Blizzard
                  </div>

                  <div className="absolute bottom-3 right-3 bg-stone-950/85 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold text-white shadow-sm flex items-center gap-1">
                    ฿49 <span className="line-through text-stone-400 font-normal text-[10px]">฿55</span>
                  </div>
                </div>

                {/* Card Sub-info */}
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-stone-900 text-sm">โอรีโอ บลิซซาร์ด ซิกเนเจอร์</h3>
                    <p className="text-xs text-stone-500">ซอฟต์เสิร์ฟนมสดผสมชิ้นโอรีโอกรอบเข้มข้น</p>
                  </div>
                  <button
                    onClick={onOpenUpsideDown}
                    className="text-xs font-semibold bg-rose-50 text-rose-700 hover:bg-rose-100 px-3 py-2 rounded-xl border border-rose-200 transition-colors flex items-center gap-1"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    ทดสอบคว่ำแก้ว
                  </button>
                </div>
              </div>

              {/* Floating Testimonial / Mini Card */}
              <div className="absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-lg border border-stone-200 text-xs max-w-[210px] hidden sm:block">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-[10px]">
                    DQ
                  </div>
                  <span className="font-semibold text-stone-800">Upside Down Guarantee</span>
                </div>
                <p className="text-[11px] text-stone-500">
                  ถ้าคว่ำแล้วหก เสิร์ฟให้ใหม่ทันทีฟรี 1 แก้ว!
                </p>
              </div>


            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
