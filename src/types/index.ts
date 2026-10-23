export type MenuCategory = 
  | 'all'
  | 'blizzard'
  | 'soft-serve'
  | 'ice-cream-cake'
  | 'beverage'
  | 'seasonal';

export interface MenuItem {
  id: string;
  name: string;
  nameEn: string;
  category: MenuCategory;
  price: number;
  originalPrice?: number;
  description: string;
  imageUrl: string;
  isPopular?: boolean;
  isSeasonal?: boolean;
  isBlizzard?: boolean;
  canUpsideDown?: boolean;
  sizes?: { name: string; extraPrice: number }[];
  toppings?: { name: string; price: number }[];
  sweetnessLevels?: string[];
  calories?: number;
  tags?: string[];
}

export interface CartItem {
  cartItemId: string;
  menuItem: MenuItem;
  size?: string;
  sweetness?: string;
  selectedToppings?: { name: string; price: number }[];
  notes?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export type OrderType = 'delivery' | 'pickup';

export interface Order {
  id: string;
  items: CartItem[];
  orderType: OrderType;
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  customerName: string;
  customerPhone: string;
  address?: string;
  storeBranch?: string;
  pickupTime?: string;
  paymentMethod: 'promptpay' | 'credit' | 'cash';
  status: 'pending' | 'preparing' | 'ready' | 'completed';
  createdAt: string;
}

export interface QueueTicket {
  ticketNumber: string;
  branchId: string;
  branchName: string;
  partySize: number;
  customerName: string;
  customerPhone: string;
  type: 'takeaway' | 'dine-in';
  currentServing: string;
  aheadOfYou: number;
  estimatedWaitMinutes: number;
  issuedAt: string;
  status: 'waiting' | 'called' | 'completed' | 'cancelled';
}

export interface StoreLocation {
  id: string;
  name: string;
  nameEn: string;
  address: string;
  openHours: string;
  phone: string;
  distanceKm: number;
  currentQueue: number;
  estimatedWaitMinutes: number;
  hasSnacks?: boolean;
  coordinates: { lat: number; lng: number };
}

export interface CustomCakeOrder {
  cakeSize: '6-inch' | '8-inch' | '10-inch';
  cakeShape: 'round' | 'heart' | 'square';
  baseFlavor: string;
  topFlavor: string;
  centerLayer: string;
  pipingColor: string;
  customMessage: string;
  candleCount: number;
  pickupDate: string;
  pickupTime: string;
  storeBranch: string;
  specialInstructions?: string;
  customerName: string;
  customerPhone: string;
  totalPrice: number;
}
