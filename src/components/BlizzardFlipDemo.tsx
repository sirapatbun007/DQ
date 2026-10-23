import React, { useState } from 'react';
import { RotateCw, Sparkles, CheckCircle2, Copy, X } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BlizzardFlipDemoProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyStudentDiscount: () => void;
}

export const BlizzardFlipDemo: React.FC<BlizzardFlipDemoProps> = ({
  isOpen,
  onClose,
  onApplyStudentDiscount,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedFlavor, setSelectedFlavor] = useState<'oreo' | 'matcha' | 'choco' | 'mango'>('oreo');
  const [hasCompleted, setHasCompleted] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleFlipToggle = () => {
    const nextState = !isFlipped;
    setIsFlipped(nextState);

    if (nextState) {
      // Fire confetti when successfully flipped upside-down
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#E11925', '#0054A6', '#FFD166', '#06D6A0'],
      });
      setHasCompleted(true);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText('STUDENT10');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const flavorColors = {
    oreo: {
      cream: 'bg-[#EDE7DE]',
      spots: 'bg-stone-800',
      label: 'โอรีโอ บลิซซาร์ด (Oreo)',
      spoon: 'bg-red-600',
    },
    matcha: {
      cream: 'bg-[#8CA879]',
      spots: 'bg-[#5C754B]',
      label: 'มัทฉะ บลิซซาร์ด (Matcha)',
      spoon: 'bg-red-600',
    },
    choco: {
      cream: 'bg-[#5C3A21]',
      spots: 'bg-[#311D11]',
      label: 'ช็อกโกแลต เอ็กซ์ตรีม (Choco)',
      spoon: 'bg-red-600',
    },
    mango: {
      cream: 'bg-[#FFCC5C]',
      spots: 'bg-[#4B8B3B]',
      label: 'ข้าวเหนียวมะม่วง (Seasonal Mango)',
      spoon: 'bg-red-600',
    },
  };

  const current = flavorColors[selectedFlavor];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#FAF8F5] rounded-3xl shadow-2xl border border-stone-200 overflow-hidden p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-1 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" /> กิมมิกเอกลักษณ์ประจำร้าน (ตาม Brief)
          </div>
          <h2 className="text-2xl font-extrabold text-stone-900">
            ทดลองเสิร์ฟ "คว่ำแก้วบลิซซาร์ด"
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 max-w-xs mx-auto">
            พิสูจน์ความเข้มข้น แน่นหนึบของเนื้อไอศกรีมแท้ ถ้าคว่ำแล้วหก เสิร์ฟฟรีแก้วใหม่ทันที!
          </p>
        </div>

        {/* Flavor Selector */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {(['oreo', 'matcha', 'choco', 'mango'] as const).map((flavor) => (
            <button
              key={flavor}
              onClick={() => {
                setSelectedFlavor(flavor);
                setIsFlipped(false);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                selectedFlavor === flavor
                  ? 'bg-stone-900 text-white shadow-xs font-semibold'
                  : 'bg-stone-200/80 text-stone-700 hover:bg-stone-300/80'
              }`}
            >
              {flavor === 'oreo' ? 'โอรีโอ' : flavor === 'matcha' ? 'มัทฉะ' : flavor === 'choco' ? 'ช็อกโก้' : 'มะม่วง'}
            </button>
          ))}
        </div>

        {/* Interactive Cup Stage */}
        <div className="h-64 sm:h-72 flex items-center justify-center relative bg-gradient-to-b from-stone-100 to-stone-200/60 rounded-2xl border border-stone-200/80 overflow-hidden">
          
          {/* Floor grid / shadow for perspective */}
          <div className="absolute bottom-6 w-32 h-6 bg-stone-400/25 rounded-full blur-md" />

          {/* Cup Assembly */}
          <div
            className={`transition-all duration-700 transform cursor-pointer flex flex-col items-center select-none ${
              isFlipped ? 'rotate-180 -translate-y-4' : 'rotate-0'
            }`}
            onClick={handleFlipToggle}
          >
            {/* The Red DQ Spoon */}
            <div className={`w-3 h-16 ${current.spoon} rounded-t-full shadow-inner transform -rotate-6 translate-y-3 z-10 transition-transform ${isFlipped ? 'scale-y-95' : ''}`} />

            {/* Ice cream top mound */}
            <div className={`w-28 h-10 ${current.cream} rounded-t-3xl shadow-sm relative overflow-hidden flex items-center justify-center`}>
              {/* Texture chunks */}
              <div className={`absolute w-3 h-3 rounded-full ${current.spots} opacity-70 top-2 left-4`} />
              <div className={`absolute w-2 h-2 rounded-full ${current.spots} opacity-70 top-3 right-6`} />
              <div className={`absolute w-2.5 h-2.5 rounded-full ${current.spots} opacity-60 bottom-1 left-10`} />
              <div className="text-[10px] font-bold tracking-tight text-stone-700/60 uppercase">DQ Soft Serve</div>
            </div>

            {/* Cup Body (Trapezoid cup) */}
            <div className="relative w-32 h-36 bg-gradient-to-b from-white via-[#FCFAFA] to-stone-100 border-2 border-stone-300 rounded-b-2xl shadow-md overflow-hidden flex flex-col items-center justify-center">
              
              {/* Cup DQ Ribbon */}
              <div className="w-14 h-9 rounded-xl bg-gradient-to-br from-[#E11925] to-[#B30C16] flex items-center justify-center shadow-xs">
                <span className="text-white font-black text-sm tracking-tighter">DQ</span>
              </div>
              <span className="text-[9px] font-bold text-stone-400 uppercase tracking-widest mt-1">Blizzard®</span>
              
              <div className="absolute bottom-2 text-[8px] text-stone-400 font-mono">
                {isFlipped ? '100% NO SPILL' : 'UPRIGHT'}
              </div>
            </div>
          </div>

          {/* Flip Status Banner */}
          <div className="absolute top-3 right-3">
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition-all ${
                isFlipped
                  ? 'bg-emerald-600 text-white shadow-xs animate-bounce'
                  : 'bg-stone-300 text-stone-700'
              }`}
            >
              {isFlipped ? '✓ คว่ำสำเร็จ ไม่หก 100%!' : 'สถานะ: ปกติ'}
            </span>
          </div>

        </div>

        {/* Action Button */}
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={handleFlipToggle}
            className="w-full py-3.5 px-6 rounded-2xl bg-[#E11925] hover:bg-[#C9131E] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-transform active:scale-95"
          >
            <RotateCw className={`w-4 h-4 ${isFlipped ? 'rotate-180' : ''} transition-transform`} />
            {isFlipped ? 'หมุนแก้วกลับสู่ท่าปกติ' : 'คลิกเพื่อทดสอบ "คว่ำแก้ว" (Upside Down)'}
          </button>
        </div>

        {/* Reward Card when completed */}
        {hasCompleted && (
          <div className="mt-4 p-4 rounded-2xl bg-amber-50 border border-amber-200/90 flex flex-col sm:flex-row items-center justify-between gap-3 animate-fade-in">
            <div className="flex items-center gap-2.5 text-left">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <p className="text-xs font-bold text-amber-950">
                  ยินดีด้วย! คุณได้รับโค้ดส่วนลดนักเรียน 10%
                </p>
                <p className="text-[11px] text-amber-800">
                  ใช้โค้ด <span className="font-mono font-bold text-rose-700">STUDENT10</span> เพื่อลดทันทีทุกเมนู
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleCopyCode}
                className="px-3 py-1.5 rounded-xl bg-white border border-amber-300 text-amber-900 text-xs font-semibold hover:bg-amber-100/50 flex items-center gap-1 transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
                {copied ? 'คัดลอกแล้ว!' : 'คัดลอกโค้ด'}
              </button>
              <button
                onClick={() => {
                  onApplyStudentDiscount();
                  onClose();
                }}
                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors"
              >
                ใช้ส่วนลดเลย
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
