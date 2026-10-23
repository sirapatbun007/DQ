import React, { useState } from 'react';
import { MapPin, Clock, Phone, Users, Navigation, X, Check } from 'lucide-react';
import { STORE_BRANCHES } from '../data/storesData';
import { StoreLocation } from '../types';

interface StoreLocatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectBranchForQueue: (branch: StoreLocation) => void;
}

export const StoreLocatorModal: React.FC<StoreLocatorModalProps> = ({
  isOpen,
  onClose,
  onSelectBranchForQueue,
}) => {
  const [selectedStore, setSelectedStore] = useState<StoreLocation>(STORE_BRANCHES[0]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-3xl bg-[#FAF8F5] rounded-3xl shadow-2xl border border-stone-200 overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 bg-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-stone-100 text-stone-800 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-rose-600" />
            </div>
            <div>
              <h3 className="font-extrabold text-stone-900 text-base">ค้นหาสาขา Dairy Queen ใกล้คุณ</h3>
              <p className="text-xs text-stone-500">ตรวจสอบสถานะคิว เวลาเปิด-ปิด และเมนูพร้อมเสิร์ฟ</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body: Split into store list & store detail */}
        <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-y-auto">
          
          {/* Store List (5 cols) */}
          <div className="md:col-span-5 border-r border-stone-200 p-4 space-y-2.5 overflow-y-auto bg-stone-50">
            {STORE_BRANCHES.map((store) => {
              const isSelected = selectedStore.id === store.id;
              return (
                <div
                  key={store.id}
                  onClick={() => setSelectedStore(store)}
                  className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-white border-stone-900 shadow-xs'
                      : 'bg-white/70 border-stone-200 hover:bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <h4 className="font-extrabold text-stone-900 text-xs sm:text-sm">
                      {store.name}
                    </h4>
                    <span className="text-[10px] font-bold text-stone-400">
                      {store.distanceKm} กม.
                    </span>
                  </div>

                  <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                    {store.address}
                  </p>

                  <div className="mt-2.5 flex items-center justify-between text-[11px]">
                    <span className="inline-flex items-center gap-1 font-semibold text-emerald-700">
                      <Clock className="w-3 h-3" /> เปิดอยู่
                    </span>

                    <span className="inline-flex items-center gap-1 text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full font-bold">
                      <Users className="w-3 h-3" /> คิวรอ {store.currentQueue} คิว
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Store Detail (7 cols) */}
          <div className="md:col-span-7 p-6 space-y-6 bg-white flex flex-col justify-between">
            <div className="space-y-4">
              
              <div>
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                  รายละเอียดสาขาที่เลือก
                </span>
                <h3 className="text-xl font-extrabold text-stone-900 mt-1">
                  {selectedStore.name}
                </h3>
                <p className="text-xs text-stone-400">{selectedStore.nameEn}</p>
              </div>

              {/* Info Badges */}
              <div className="space-y-2.5 text-xs text-stone-600 bg-stone-50 p-4 rounded-2xl border border-stone-100">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>{selectedStore.address}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-stone-500 shrink-0" />
                  <span>เวลาเปิดให้บริการ: <strong>{selectedStore.openHours}</strong></span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-stone-500 shrink-0" />
                  <span>เบอร์โทรศัพท์สาขา: <strong>{selectedStore.phone}</strong></span>
                </div>
              </div>

              {/* Queue status banner */}
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold block">สถานะคิวหน้าร้านขณะนี้</span>
                  <span className="text-[11px] text-amber-800">
                    มีผู้รับบริการรออยู่ {selectedStore.currentQueue} คิว (ประมาณ {selectedStore.estimatedWaitMinutes} นาที)
                  </span>
                </div>
                <div className="text-2xl font-black text-amber-700">
                  {selectedStore.currentQueue} <span className="text-xs font-medium">คิว</span>
                </div>
              </div>

              {/* Features of this branch */}
              <div className="space-y-1.5 text-xs">
                <span className="font-bold text-stone-800">บริการที่มีในสาขานี้:</span>
                <div className="flex flex-wrap gap-2 text-stone-600">
                  <span className="px-2.5 py-1 rounded-lg bg-stone-100 flex items-center gap-1">
                    <Check className="w-3 h-3 text-emerald-600" /> คว่ำแก้วบลิซซาร์ด
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-stone-100 flex items-center gap-1">
                    <Check className="w-3 h-3 text-emerald-600" /> เค้กไอศกรีม Custom
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-stone-100 flex items-center gap-1">
                    <Check className="w-3 h-3 text-emerald-600" /> ซอฟต์เสิร์ฟ &amp; มิลค์เชค
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-stone-100 flex items-center gap-1">
                    <Check className="w-3 h-3 text-emerald-600" /> จองคิวออนไลน์
                  </span>
                </div>
              </div>

            </div>

            {/* Action buttons */}
            <div className="pt-4 border-t border-stone-100 flex gap-3">
              <button
                onClick={() => {
                  onSelectBranchForQueue(selectedStore);
                  onClose();
                }}
                className="flex-1 py-3 px-4 rounded-2xl bg-[#E11925] hover:bg-[#C9131E] text-white text-xs sm:text-sm font-bold shadow-xs flex items-center justify-center gap-1.5 transition-transform active:scale-95"
              >
                <Users className="w-4 h-4" />
                จองคิวออนไลน์ที่สาขานี้
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
