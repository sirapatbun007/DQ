import React, { useState } from 'react';
import { 
  Users, 
  Clock, 
  MapPin, 
  QrCode, 
  CheckCircle2, 
  AlertCircle, 
  Phone, 
  User, 
  X, 
  Volume2, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { STORE_BRANCHES } from '../data/storesData';
import { QueueTicket } from '../types';

interface QueueSystemModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTicket: QueueTicket | null;
  setActiveTicket: React.Dispatch<React.SetStateAction<QueueTicket | null>>;
}

export const QueueSystemModal: React.FC<QueueSystemModalProps> = ({
  isOpen,
  onClose,
  activeTicket,
  setActiveTicket,
}) => {
  const [selectedBranchId, setSelectedBranchId] = useState(STORE_BRANCHES[0].id);
  const [partySize, setPartySize] = useState(1);
  const [queueType, setQueueType] = useState<'takeaway' | 'dine-in'>('takeaway');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [calledAlert, setCalledAlert] = useState(false);

  if (!isOpen) return null;

  const currentBranch = STORE_BRANCHES.find((b) => b.id === selectedBranchId) || STORE_BRANCHES[0];

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) return;

    // Generate ticket number like Q-024
    const randomNum = Math.floor(Math.random() * 80) + 20;
    const currentServingNum = randomNum - (currentBranch.currentQueue || 2);
    const newTicket: QueueTicket = {
      ticketNumber: `Q-${randomNum}`,
      branchId: currentBranch.id,
      branchName: currentBranch.name,
      partySize,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      type: queueType,
      currentServing: `Q-${Math.max(1, currentServingNum)}`,
      aheadOfYou: currentBranch.currentQueue,
      estimatedWaitMinutes: currentBranch.estimatedWaitMinutes,
      issuedAt: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }),
      status: 'waiting',
    };

    setActiveTicket(newTicket);
  };

  const handleSimulateCall = () => {
    if (!activeTicket) return;
    setActiveTicket({
      ...activeTicket,
      currentServing: activeTicket.ticketNumber,
      aheadOfYou: 0,
      estimatedWaitMinutes: 0,
      status: 'called',
    });
    setCalledAlert(true);
  };

  const handleCancelTicket = () => {
    setActiveTicket(null);
    setCalledAlert(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#FAF8F5] rounded-3xl shadow-2xl border border-stone-200 overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 bg-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 uppercase">
                <Sparkles className="w-3 h-3" /> ฟังก์ชันสำคัญตามความต้องการของระบบ
              </div>
              <h2 className="text-xl font-extrabold text-stone-900">
                ระบบจองคิวหน้าร้านออนไลน์
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

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          
          {/* Active Ticket Display */}
          {activeTicket ? (
            <div className="space-y-4">
              
              {/* Call alert toast banner */}
              {activeTicket.status === 'called' && (
                <div className="p-4 rounded-2xl bg-rose-600 text-white flex items-center gap-3 shadow-lg animate-bounce">
                  <Volume2 className="w-6 h-6 shrink-0" />
                  <div>
                    <h4 className="font-black text-sm">ถึงคิวของคุณแล้ว! ({activeTicket.ticketNumber})</h4>
                    <p className="text-xs text-rose-100">โปรดแสดงหน้าจอนี้ต่อพนักงานที่เคาน์เตอร์ 1</p>
                  </div>
                </div>
              )}

              {/* Physical-style E-Ticket Card */}
              <div className="relative bg-white rounded-3xl border-2 border-dashed border-stone-300 p-6 shadow-md overflow-hidden">
                
                {/* DQ Stamp Header */}
                <div className="flex items-center justify-between border-b border-stone-100 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-[#E11925] text-white flex items-center justify-center font-black text-xs">
                      DQ
                    </span>
                    <span className="font-extrabold text-stone-900 text-sm">
                      Dairy Queen Smart Queue
                    </span>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    activeTicket.status === 'called'
                      ? 'bg-emerald-100 text-emerald-800 animate-pulse'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {activeTicket.status === 'called' ? '• เรียกคิวแล้ว' : '• รอเรียกคิว'}
                  </span>
                </div>

                {/* Big Ticket Number */}
                <div className="text-center py-6">
                  <span className="text-xs text-stone-400 uppercase tracking-widest font-semibold">
                    หมายเลขบัตรคิวของคุณ
                  </span>
                  <div className="text-5xl font-black text-[#E11925] tracking-tight my-1">
                    {activeTicket.ticketNumber}
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-xs text-stone-600 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-stone-400" />
                    {activeTicket.branchName}
                  </div>
                </div>

                {/* Queue Metrics Grid */}
                <div className="grid grid-cols-2 gap-3 bg-stone-50 p-4 rounded-2xl border border-stone-100 text-center">
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase font-bold block">
                      คิวที่กำลังรับบริการ
                    </span>
                    <span className="text-lg font-extrabold text-stone-800">
                      {activeTicket.currentServing}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase font-bold block">
                      รออีกประมาณ
                    </span>
                    <span className="text-lg font-extrabold text-stone-800">
                      {activeTicket.aheadOfYou} คิว ({activeTicket.estimatedWaitMinutes} นาที)
                    </span>
                  </div>
                </div>

                {/* Ticket Details */}
                <div className="mt-4 text-xs text-stone-500 space-y-1">
                  <div className="flex justify-between">
                    <span>ชื่อผู้จอง:</span>
                    <span className="font-semibold text-stone-800">{activeTicket.customerName} ({activeTicket.partySize} ท่าน)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ประเภท:</span>
                    <span className="font-semibold text-stone-800">{activeTicket.type === 'takeaway' ? 'สั่งกลับบ้าน (Takeaway)' : 'นั่งทานที่ร้าน (Dine-in)'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>เวลาที่ออกบัตรคิว:</span>
                    <span className="font-semibold text-stone-800">{activeTicket.issuedAt} น.</span>
                  </div>
                </div>

                {/* Mock Barcode / QR */}
                <div className="mt-5 pt-4 border-t border-stone-100 flex flex-col items-center">
                  <div className="flex gap-1 h-8 items-end">
                    {[3, 1, 4, 1, 2, 4, 1, 3, 2, 5, 2, 1, 3, 4, 2, 3, 1, 4, 2].map((w, i) => (
                      <div key={i} className="bg-stone-800 h-full" style={{ width: `${w * 2}px` }} />
                    ))}
                  </div>
                  <span className="text-[10px] text-stone-400 font-mono mt-1">DQ-TICKET-{activeTicket.ticketNumber}</span>
                </div>

              </div>

              {/* Simulation Controls for testing */}
              <div className="space-y-2 pt-2">
                <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 flex items-center justify-between">
                  <span>ทดสอบระบบเรียกคิวของหน้าร้าน:</span>
                  <button
                    onClick={handleSimulateCall}
                    disabled={activeTicket.status === 'called'}
                    className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold"
                  >
                    จำลองเรียกคิวนี้ 🔔
                  </button>
                </div>

                <button
                  onClick={handleCancelTicket}
                  className="w-full py-2.5 rounded-xl border border-stone-200 text-xs text-stone-500 hover:text-stone-800 hover:bg-stone-100"
                >
                  ยกเลิกบัตรคิวนี้
                </button>
              </div>

            </div>
          ) : (
            /* Form to book a new ticket */
            <form onSubmit={handleCreateTicket} className="space-y-5">
              
              {/* Branch Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
                  1. เลือกสาขาที่ต้องการรับบริการ
                </label>
                <select
                  value={selectedBranchId}
                  onChange={(e) => setSelectedBranchId(e.target.value)}
                  className="w-full p-3 rounded-2xl border border-stone-200 bg-white text-xs font-medium text-stone-800 focus:outline-none focus:border-stone-900"
                >
                  {STORE_BRANCHES.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name} (คิวรอขณะนี้: {b.currentQueue} คิว ~{b.estimatedWaitMinutes} นาที)
                    </option>
                  ))}
                </select>

                <div className="p-3 rounded-xl bg-stone-100 text-xs text-stone-600 flex items-center justify-between">
                  <span>สถานะสาขา:</span>
                  <span className="font-bold text-emerald-700">เปิดให้บริการ • คิวว่างเร็ว</span>
                </div>
              </div>

              {/* Service Type */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
                  2. ประเภทบริการ
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setQueueType('takeaway')}
                    className={`p-3 rounded-2xl border text-xs font-bold text-center transition-all ${
                      queueType === 'takeaway'
                        ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                        : 'border-stone-200 bg-white text-stone-700'
                    }`}
                  >
                    สั่งกลับบ้าน (Takeaway)
                  </button>
                  <button
                    type="button"
                    onClick={() => setQueueType('dine-in')}
                    className={`p-3 rounded-2xl border text-xs font-bold text-center transition-all ${
                      queueType === 'dine-in'
                        ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                        : 'border-stone-200 bg-white text-stone-700'
                    }`}
                  >
                    นั่งทานที่ร้าน (Dine-in)
                  </button>
                </div>
              </div>

              {/* Party Size */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
                  3. จำนวนผู้รับบริการ (ท่าน)
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setPartySize(num)}
                      className={`flex-1 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                        partySize === num
                          ? 'border-rose-600 bg-rose-50 text-rose-800'
                          : 'border-stone-200 bg-white text-stone-600'
                      }`}
                    >
                      {num} {num === 5 ? '+' : ''}
                    </button>
                  ))}
                </div>
              </div>

              {/* Customer Contact */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
                  4. ข้อมูลติดต่อเพื่อรับการแจ้งเตือน
                </label>
                
                <div>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input
                      type="text"
                      required
                      placeholder="ชื่อผู้รับบริการ เช่น น้องมิวสิค"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-stone-200 bg-white text-xs text-stone-800 focus:outline-none focus:border-stone-900"
                    />
                  </div>
                </div>

                <div>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input
                      type="tel"
                      required
                      placeholder="เบอร์โทรศัพท์มือถือ เช่น 081-234-5678"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-stone-200 bg-white text-xs text-stone-800 focus:outline-none focus:border-stone-900"
                    />
                  </div>
                  <p className="text-[11px] text-stone-400 mt-1">
                    ระบบจะส่ง SMS / แจ้งเตือนเมื่อใกล้ถึงคิวของคุณ (ล่วงหน้า 2 คิว)
                  </p>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-2xl bg-[#E11925] hover:bg-[#C9131E] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-transform active:scale-95"
                >
                  <span>กดรับบัตรคิวออนไลน์</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
