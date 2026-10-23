import React from 'react';
import { GraduationCap, Award, Sparkles, CheckCircle2, Gift, X, Star } from 'lucide-react';

interface MemberPerksModalProps {
  isOpen: boolean;
  onClose: () => void;
  isStudentDiscountActive: boolean;
  onToggleStudentDiscount: () => void;
}

export const MemberPerksModal: React.FC<MemberPerksModalProps> = ({
  isOpen,
  onClose,
  isStudentDiscountActive,
  onToggleStudentDiscount,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-[#FAF8F5] rounded-3xl shadow-2xl border border-stone-200 overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 bg-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-stone-900 text-base">สิทธิพิเศษสมาชิก &amp; นักเรียน</h3>
              <p className="text-xs text-stone-500">ตอบโจทย์กลุ่มเป้าหมายวัย 15-22 ปี ตาม Brief</p>
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
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          
          {/* Virtual Student Card */}
          <div className="relative bg-gradient-to-br from-stone-900 to-stone-800 text-white rounded-3xl p-5 shadow-lg overflow-hidden border border-stone-700">
            <div className="absolute top-0 right-0 -mr-6 -mt-6 w-28 h-28 bg-rose-600/30 rounded-full blur-xl" />
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-[#E11925] flex items-center justify-center font-black text-xs">
                  DQ
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-stone-300">
                  Student Club Pass
                </span>
              </div>
              <span className="text-xs font-mono text-stone-400">ID: ST-2026-9921</span>
            </div>

            <div className="space-y-1 mb-4">
              <span className="text-[11px] text-stone-400 font-medium">ชื่อสมาชิกนักเรียน</span>
              <h4 className="text-lg font-bold tracking-tight">น้องมิวสิค (ม.ปลาย)</h4>
              <p className="text-xs text-stone-300">โรงเรียนเตรียมอุดมศึกษา / จุฬาลงกรณ์</p>
            </div>

            <div className="pt-3 border-t border-stone-700/80 flex items-center justify-between text-xs">
              <div>
                <span className="text-[10px] text-stone-400 block">คะแนนสะสม DQ Points</span>
                <span className="font-bold text-amber-400 text-sm flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400" /> 140 คะแนน
                </span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                สถานะ: ยืนยันสิทธิ์แล้ว
              </span>
            </div>
          </div>

          {/* Student 10% Discount Switch */}
          <div className="p-4 rounded-2xl bg-white border border-stone-200 space-y-3 shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-stone-900">
                  รับส่วนลดนักเรียน 10% ทุกออเดอร์
                </h4>
                <p className="text-[11px] text-stone-500">
                  {isStudentDiscountActive ? 'กำลังใช้งาน (หักส่วนลดในตะกร้าอัตโนมัติ)' : 'คลิกเพื่อเปิดใช้งานส่วนลด'}
                </p>
              </div>

              <button
                onClick={onToggleStudentDiscount}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isStudentDiscountActive ? 'bg-emerald-600' : 'bg-stone-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isStudentDiscountActive ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {isStudentDiscountActive && (
              <div className="text-[11px] text-emerald-700 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200 flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                สิทธิ์ส่วนลด 10% พร้อมใช้งานในตะกร้าสินค้าทันที
              </div>
            )}
          </div>

          {/* Loyalty Rewards to Redeem */}
          <div className="space-y-2.5">
            <span className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
              ของรางวัลที่สามารถแลกได้ (Redeem)
            </span>

            {[
              { title: 'ฟรี! ท็อปปิ้งโอรีโอบด 1 ช็อต', points: 40, icon: Sparkles },
              { title: 'ฟรี! โคนซอฟต์เสิร์ฟมินิ (มูลค่า 19.-)', points: 80, icon: Gift },
              { title: 'คูปองส่วนลด 30.- สำหรับบลิซซาร์ด', points: 100, icon: Award },
            ].map((reward, i) => (
              <div
                key={i}
                className="bg-white p-3 rounded-2xl border border-stone-200 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                    <reward.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-stone-900 block">{reward.title}</span>
                    <span className="text-[10px] text-stone-400">ใช้ {reward.points} DQ Points</span>
                  </div>
                </div>

                <button className="px-3 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-[11px]">
                  แลกรางวัล
                </button>
              </div>
            ))}
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-200 bg-white text-center">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-stone-900 text-white text-xs font-bold hover:bg-black"
          >
            ปิดหน้าต่าง
          </button>
        </div>

      </div>
    </div>
  );
};
