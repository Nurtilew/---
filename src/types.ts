export type Language = 'ru' | 'en';

export type UserRole = 'admin' | 'moderator' | 'manager';

export interface Product {
  id: string;
  name_ru: string;
  name_en: string;
  description_ru: string;
  description_en: string;
  price: number;
  image: string;
  category_ru: string;
  category_en: string;
  dosage_ru: string;
  dosage_en: string;
  composition_ru: string;
  composition_en: string;
  inStock: boolean;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  clientName: string;
  email: string;
  phone: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'completed' | 'cancelled';
  createdAt: string;
  isEncrypted?: boolean;
}

export interface Tip {
  id: string;
  title_ru: string;
  title_en: string;
  text_ru: string;
  text_en: string;
  category_ru: string;
  category_en: string;
  publishDate: string;
  readTime: string;
}

export interface Feedback {
  id: string;
  name: string;
  email: string;
  message: string;
  status: 'new' | 'replied' | 'archived';
  createdAt: string;
}

export interface SystemSettings {
  salesEmail: string;
  telegramBotToken: string;
  telegramChatId: string;
  autoBackupEnabled: boolean;
  backupIntervalMinutes: number;
}

export interface BackupRecord {
  filename: string;
  timestamp: string;
  size: number;
}

export interface AnalyticsData {
  dailyViews: { date: string; views: number; orders: number }[];
  categorySales: { name: string; value: number }[];
  currentStats: {
    totalViews: number;
    totalOrders: number;
    totalRevenue: number;
    feedbackCount: number;
    conversionRate: number;
    activeUsersOfflineCached: number;
  };
}

export interface ApiEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  description_ru: string;
  description_en: string;
  parameters?: string;
  response?: string;
}
