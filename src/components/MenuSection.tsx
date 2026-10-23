import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Sparkles, 
  Plus, 
  RotateCw, 
  Flame, 
  X, 
  Check, 
  ShoppingBag,
  SlidersHorizontal,
  Cake
} from 'lucide-react';
import { MenuItem, MenuCategory, CartItem } from '../types';
import { MENU_ITEMS } from '../data/menuData';

interface MenuSectionProps {
  onAddToCart: (item: CartItem) => void;
  onOpenCustomCake: () => void;
  onOpenUpsideDown: () => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  onAddToCart,
  onOpenCustomCake,
  onOpenUpsideDown,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Modal for customizing item before adding to cart
  const [activeItem, setActiveItem] = useState<MenuItem | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedSweetness, setSelectedSweetness] = useState<string>('');
  const [selectedToppings, setSelectedToppings] = useState<{ name: string; price: number }[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const [specialNotes, setSpecialNotes] = useState<string>('');

  const categories = [
    { id: 'all', label: 'ทั้งหมด' },
    { id: 'blizzard', label: 'บลิซซาร์ด (คว่ำแก้ว)' },
    { id: 'soft-serve', label: 'ซอฟต์เสิร์ฟ & ซันเดย์' },
    { id: 'ice-cream-cake', label: 'เค้กไอศกรีม' },
    { id: 'beverage', label: 'เครื่องดื่ม & มิลค์เชค' },
    { id: 'seasonal', label: 'เมนูเทศกาล' },
  ] as const;

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category match
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Search query match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesEn = item.nameEn.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        if (!matchesName && !matchesEn && !matchesDesc) return false;
      }
      // Tag filter
      if (selectedTag) {
        if (!item.tags?.includes(selectedTag)) return false;
      }
      return true;
    });
  }, [selectedCategory, searchQuery, selectedTag]);

  // Open customize modal
  const handleOpenCustomize = (item: MenuItem) => {
    if (item.id === 'cake-custom-builder') {
      onOpenCustomCake();
      return;
    }
    setActiveItem(item);
    setSelectedSize(item.sizes ? item.sizes[0].name : '');
    setSelectedSweetness(item.sweetnessLevels ? item.sweetnessLevels[item.sweetnessLevels.length - 1] : '');
    setSelectedToppings([]);
    setQuantity(1);
    setSpecialNotes('');
  };

  // Calculate customized unit price
  const calculateItemUnitPrice = (item: MenuItem) => {
    let price = item.price;
    if (item.sizes && selectedSize) {
      const sizeObj = item.sizes.find((s) => s.name === selectedSize);
      if (sizeObj) price += sizeObj.extraPrice;
    }
    const toppingsTotal = selectedToppings.reduce((acc, t) => acc + t.price, 0);
    return price + toppingsTotal;
  };

  const handleConfirmAddToCart = () => {
    if (!activeItem) return;
    const unitPrice = calculateItemUnitPrice(activeItem);
    const cartItem: CartItem = {
      cartItemId: `${activeItem.id}-${Date.now()}`,
      menuItem: activeItem,
      size: selectedSize || undefined,
      sweetness: selectedSweetness || undefined,
      selectedToppings: selectedToppings.length > 0 ? selectedToppings : undefined,
      notes: specialNotes.trim() || undefined,
      quantity,
      unitPrice,
      totalPrice: unitPrice * quantity,
    };
    onAddToCart(cartItem);
    setActiveItem(null);
  };

  const toggleTopping = (topping: { name: string; price: number }) => {
    if (selectedToppings.some((t) => t.name === topping.name)) {
      setSelectedToppings(selectedToppings.filter((t) => t.name !== topping.name));
    } else {
      setSelectedToppings([...selectedToppings, topping]);
    }
  };

  return (
    <section id="menu" className="py-12 sm:py-16 bg-[#FBF9F5] border-t border-stone-200/70 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-200/80 text-stone-800 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-rose-600" />
              เมนูทั้งหมดตามเอกสาร Brief
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              เลือกอร่อยกับเมนูโปรดของคุณ
            </h2>
            <p className="text-stone-500 text-sm mt-1 max-w-xl">
              รสชาติต้นตำรับ บลิซซาร์ดคว่ำแก้ว ซอฟต์เสิร์ฟเริ่มต้น 19.- เครื่องดื่มสดชื่น และเค้กวันเกิดสั่งทำพิเศษ
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              placeholder="ค้นหา เช่น โอรีโอ, มัทฉะ, คิทแคท..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-stone-200 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all shadow-2xs"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Categories Tab Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none mb-6">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id as MenuCategory);
                  setSelectedTag(null);
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200/80 hover:bg-stone-50'
                }`}
              >
                {cat.id === 'blizzard' && <RotateCw className="w-3.5 h-3.5 text-rose-400" />}
                {cat.id === 'seasonal' && <Sparkles className="w-3.5 h-3.5 text-amber-400" />}
                {cat.id === 'ice-cream-cake' && <Cake className="w-3.5 h-3.5 text-rose-400" />}
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Quick Tag Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 text-xs">
          <span className="text-stone-400 flex items-center gap-1 shrink-0 font-medium">
            <SlidersHorizontal className="w-3 h-3" /> ตัวกรอง:
          </span>
          {['ยอดนิยม', 'คว่ำแก้วได้', 'เมนูเทศกาล', 'เริ่มต้น 19.-'].map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              className={`px-3 py-1 rounded-full font-medium transition-colors ${
                selectedTag === tag
                  ? 'bg-rose-100 text-rose-800 border border-rose-300'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200 border border-transparent'
              }`}
            >
              {tag}
            </button>
          ))}
          {selectedTag && (
            <button
              onClick={() => setSelectedTag(null)}
              className="text-stone-400 hover:text-stone-600 underline text-[11px] ml-1"
            >
              ล้างตัวกรอง
            </button>
          )}
        </div>

        {/* Custom Cake Banner Promo */}
        {selectedCategory === 'all' || selectedCategory === 'ice-cream-cake' ? (
          <div className="mb-8 p-6 rounded-3xl bg-gradient-to-r from-rose-50 via-amber-50 to-orange-50 border border-rose-200/80 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xs">
            <div className="flex items-center gap-4 text-left">
              <div className="w-12 h-12 rounded-2xl bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                <Cake className="w-6 h-6" />
              </div>
              <div>
                <span className="inline-block px-2 py-0.5 rounded-full bg-rose-200/80 text-rose-900 text-[10px] font-bold uppercase mb-1">
                  ฟังก์ชันตามสรุปส่วนที่ 4 &amp; 5
                </span>
                <h3 className="font-extrabold text-stone-900 text-base sm:text-lg">
                  ระบบสั่งเค้กไอศกรีมแบบ Customize ล่วงหน้า
                </h3>
                <p className="text-xs text-stone-600 max-w-lg">
                  ออกแบบเค้กวันเกิดในสไตล์ของคุณเอง เลือกรสชาติ ชั้นฟัดจ์คุกกี้ครั้นช์ และพิมพ์ข้อความอวยพรบนหน้าเค้กได้สดๆ
                </p>
              </div>
            </div>
            <button
              onClick={onOpenCustomCake}
              className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-black text-white text-xs sm:text-sm font-bold shadow-xs whitespace-nowrap transition-transform active:scale-95"
            >
              เริ่มออกแบบเค้กทันที →
            </button>
          </div>
        ) : null}

        {/* Menu Cards Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-stone-200">
            <p className="text-stone-500 font-medium text-sm">ไม่พบรายการเมนูที่ตรงกับคำค้นหา "{searchQuery}"</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setSelectedTag(null); }}
              className="mt-3 text-rose-600 hover:underline text-xs font-semibold"
            >
              ดูเมนูทั้งหมด
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-3xl border border-stone-200/80 hover:border-stone-300 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden"
              >
                {/* Image & Badges */}
                <div className="relative h-48 w-full bg-stone-100 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Top-left Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
                    {item.isSeasonal && (
                      <span className="px-2.5 py-1 rounded-full bg-amber-500 text-stone-950 text-[10px] font-black shadow-xs flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> เมนูเทศกาล
                      </span>
                    )}
                    {item.canUpsideDown && (
                      <button
                        onClick={(e) => { e.stopPropagation(); onOpenUpsideDown(); }}
                        className="px-2.5 py-1 rounded-full bg-rose-600/90 hover:bg-rose-700 text-white text-[10px] font-bold shadow-xs flex items-center gap-1 backdrop-blur-xs transition-colors"
                      >
                        <RotateCw className="w-3 h-3" /> คว่ำแก้วได้
                      </button>
                    )}
                    {item.isPopular && !item.isSeasonal && (
                      <span className="px-2.5 py-1 rounded-full bg-stone-900/90 text-white text-[10px] font-bold shadow-xs flex items-center gap-1 backdrop-blur-xs">
                        <Flame className="w-3 h-3 text-amber-400" /> ยอดฮิต
                      </span>
                    )}
                  </div>

                  {/* Calories Badge */}
                  {item.calories && (
                    <div className="absolute bottom-2.5 left-3 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-white text-[10px] font-medium">
                      {item.calories} kcal
                    </div>
                  )}

                  {/* Price Tag */}
                  <div className="absolute bottom-2.5 right-3 px-2.5 py-1 rounded-xl bg-white/95 backdrop-blur-xs text-stone-900 font-extrabold text-sm shadow-xs">
                    ฿{item.price}
                    {item.originalPrice && (
                      <span className="ml-1 text-[11px] text-stone-400 font-normal line-through">
                        ฿{item.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-extrabold text-stone-900 text-base group-hover:text-rose-700 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs text-stone-400 font-medium mb-2">{item.nameEn}</p>
                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom Action Area */}
                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                    <div className="text-[11px] text-stone-500 font-medium">
                      {item.sizes ? `${item.sizes.length} ขนาด` : 'ขนาดมาตรฐาน'}
                    </div>

                    <button
                      onClick={() => handleOpenCustomize(item)}
                      className="px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-[#E11925] text-white text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      {item.id === 'cake-custom-builder' ? 'ออกแบบเค้ก' : 'เลือก / สั่งซื้อ'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Item Customization Modal */}
      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-stone-100 flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-stone-900 text-lg">{activeItem.name}</h3>
                <p className="text-xs text-stone-500">{activeItem.nameEn}</p>
              </div>
              <button
                onClick={() => setActiveItem(null)}
                className="p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Customization Options */}
            <div className="p-5 sm:p-6 space-y-6 overflow-y-auto flex-1">
              
              {/* Product Hero Snapshot */}
              <div className="flex gap-4 items-center bg-stone-50 p-3.5 rounded-2xl border border-stone-100">
                <img
                  src={activeItem.imageUrl}
                  alt={activeItem.name}
                  className="w-16 h-16 rounded-xl object-cover shrink-0"
                />
                <div className="text-xs space-y-0.5">
                  <p className="font-bold text-stone-900">{activeItem.name}</p>
                  <p className="text-stone-500">{activeItem.description}</p>
                  <p className="text-rose-700 font-bold">ราคาเริ่มต้น ฿{activeItem.price}</p>
                </div>
              </div>

              {/* Sizes */}
              {activeItem.sizes && activeItem.sizes.length > 0 && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
                    เลือกขนาด (Size)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {activeItem.sizes.map((size) => {
                      const isSelected = selectedSize === size.name;
                      return (
                        <button
                          key={size.name}
                          onClick={() => setSelectedSize(size.name)}
                          className={`p-3 rounded-xl border text-xs text-left font-medium flex items-center justify-between transition-all ${
                            isSelected
                              ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                              : 'border-stone-200 text-stone-700 hover:border-stone-300 bg-stone-50/50'
                          }`}
                        >
                          <span>{size.name}</span>
                          <span className={isSelected ? 'text-stone-300' : 'text-stone-500'}>
                            {size.extraPrice > 0 ? `+฿${size.extraPrice}` : size.extraPrice < 0 ? `-฿${Math.abs(size.extraPrice)}` : 'รวม'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Sweetness Level */}
              {activeItem.sweetnessLevels && activeItem.sweetnessLevels.length > 0 && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
                    ระดับความหวาน (Sweetness Level)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {activeItem.sweetnessLevels.map((lvl) => {
                      const isSelected = selectedSweetness === lvl;
                      return (
                        <button
                          key={lvl}
                          onClick={() => setSelectedSweetness(lvl)}
                          className={`p-2.5 rounded-xl border text-xs font-medium text-center transition-all ${
                            isSelected
                              ? 'border-rose-600 bg-rose-50 text-rose-800 font-bold'
                              : 'border-stone-200 text-stone-700 hover:border-stone-300'
                          }`}
                        >
                          {lvl}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Extra Toppings */}
              {activeItem.toppings && activeItem.toppings.length > 0 && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
                    เพิ่มท็อปปิ้งพิเศษ (Extra Toppings)
                  </label>
                  <div className="space-y-1.5">
                    {activeItem.toppings.map((top) => {
                      const isChecked = selectedToppings.some((t) => t.name === top.name);
                      return (
                        <button
                          key={top.name}
                          type="button"
                          onClick={() => toggleTopping(top)}
                          className={`w-full p-3 rounded-xl border text-xs flex items-center justify-between transition-colors ${
                            isChecked
                              ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-semibold'
                              : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <div className={`w-4 h-4 rounded-md border flex items-center justify-center ${
                              isChecked ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-stone-300'
                            }`}>
                              {isChecked && <Check className="w-3 h-3" />}
                            </div>
                            <span>{top.name}</span>
                          </div>
                          <span>+฿{top.price}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Special Instructions */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
                  รายละเอียดเพิ่มเติม (Notes)
                </label>
                <input
                  type="text"
                  placeholder="เช่น แยกน้ำแข็ง, ขอช้อนเพิ่ม 2 คัน..."
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-800 focus:outline-none focus:border-stone-900"
                />
              </div>

            </div>

            {/* Modal Bottom Actions */}
            <div className="p-4 sm:p-5 border-t border-stone-100 bg-stone-50 flex items-center justify-between gap-4">
              {/* Quantity Picker */}
              <div className="flex items-center border border-stone-300 rounded-xl bg-white shadow-2xs">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-stone-600 hover:text-stone-900 font-bold"
                >
                  -
                </button>
                <span className="px-2 text-xs font-extrabold text-stone-900 min-w-6 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 text-stone-600 hover:text-stone-900 font-bold"
                >
                  +
                </button>
              </div>

              {/* Add to Cart button */}
              <button
                onClick={handleConfirmAddToCart}
                className="flex-1 py-3 px-5 rounded-2xl bg-[#E11925] hover:bg-[#C9131E] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-95"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>เพิ่มลงในตะกร้า</span>
                <span>• ฿{calculateItemUnitPrice(activeItem) * quantity}</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
