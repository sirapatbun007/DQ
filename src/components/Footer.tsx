import React from 'react';
import { Heart, RotateCw } from 'lucide-react';

interface FooterProps {
  onOpenUpsideDown: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenUpsideDown,
}) => {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          
          {/* Brand Col (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#E11925] to-[#B30C16] flex items-center justify-center text-white font-black text-xl shadow-sm tracking-tighter">
                DQ
              </div>
              <div>
                <span className="font-extrabold text-white text-lg tracking-tight block">
                  DAIRY QUEEN
                </span>
                <span className="text-[11px] text-stone-400 tracking-wider font-medium">
                  Modern Minimalist Ice Cream Boutique
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-400 max-w-sm leading-relaxed">
              ไอศกรีมซอฟต์เสิร์ฟและบลิซซาร์ดเข้มข้น เสิร์ฟคว่ำแก้วไม่หก ราคาเริ่มต้นเพียง 19 บาท 
              ออกแบบระบบสั่งซื้อออนไลน์และจองคิวอัจฉริยะ ตอบโจทย์กลุ่มนักเรียนและคนรุ่นใหม่
            </p>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={onOpenUpsideDown}
                className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-xs text-rose-300 font-semibold border border-stone-700 flex items-center gap-1.5 transition-colors"
              >
                <RotateCw className="w-3.5 h-3.5" />
                ทดสอบกิมมิกคว่ำแก้ว
              </button>
            </div>
          </div>

          {/* Links 1: Menu Categories (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              หมวดหมู่เมนู
            </h4>
            <ul className="text-xs space-y-2 text-stone-400">
              <li><a href="#menu" className="hover:text-white transition-colors">ไอศกรีมบลิซซาร์ด (Blizzard)</a></li>
              <li><a href="#menu" className="hover:text-white transition-colors">ไอศกรีมซอฟต์เสิร์ฟ &amp; ดิปช็อก</a></li>
              <li><a href="#menu" className="hover:text-white transition-colors">เค้กไอศกรีม &amp; ระบบ Custom</a></li>
              <li><a href="#menu" className="hover:text-white transition-colors">เครื่องดื่ม มิลค์เชค &amp; น้ำปั่นป๊อป</a></li>
              <li><a href="#menu" className="hover:text-white transition-colors">เมนูเทศกาล (ข้าวเหนียวมะม่วง / บิสคอฟฟ์)</a></li>
            </ul>
          </div>

          {/* Links 2: Services & Highlights (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              บริการและจุดเด่นร้าน
            </h4>
            <div className="text-xs text-stone-400 space-y-2 leading-relaxed bg-stone-800/40 p-4 rounded-2xl border border-stone-800">
              <p>• <strong>กิมมิกเสิร์ฟคว่ำแก้ว:</strong> รับประกันความเข้มข้น ไม่หก 100%</p>
              <p>• <strong>สิทธิพิเศษนักเรียน:</strong> ส่วนลด 10% ทุกการสั่งซื้อ</p>
              <p>• <strong>สั่งเค้ก Custom:</strong> ออกแบบรสชาติและข้อความล่วงหน้า</p>
              <p>• <strong>จองคิวออนไลน์:</strong> รับบัตรคิว E-Ticket ล่วงหน้า ไม่ต้องยืนรอ</p>
            </div>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© 2026 Dairy Queen Minimalist Project. All menus and concepts implemented according to the assignment brief.</p>
          <div className="flex items-center gap-1">
            <span>Designed for Students &amp; Ice Cream Lovers</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          </div>
        </div>

      </div>
    </footer>
  );
};
