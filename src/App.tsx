import React, { useState, useEffect } from "react";
import { 
  Leaf, 
  ShoppingBag, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Sliders, 
  Settings, 
  RefreshCw, 
  Database, 
  Terminal, 
  Plus, 
  Trash2, 
  Check, 
  Info, 
  Volume2, 
  VolumeX, 
  ChevronRight, 
  Menu, 
  X, 
  User, 
  TrendingUp, 
  DollarSign, 
  MessageSquare, 
  FileText, 
  Send, 
  Sun, 
  Moon, 
  Lock, 
  Wifi, 
  WifiOff, 
  Bell, 
  Eye, 
  ListRestart, 
  CloudLightning,
  AlertCircle
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from "recharts";
import { Product, Order, Feedback, Tip, SystemSettings, BackupRecord, AnalyticsData, ApiEndpoint, Language, UserRole } from "./types";

// Dynamic translation bundle
const t = {
  ru: {
    brand: "ЭкоРост",
    subtitle: "Инновационные удобрения от производителя",
    slogan: "Здоровая почва — богатый урожай",
    navAbout: "О компании",
    navProducts: "Наши продукты",
    navCatalog: "Купить / Заказать",
    navPartners: "Партнерам",
    navTips: "Полезные советы",
    navAdmin: "Панель управления",
    navApi: "Разработчикам",
    lang: "English version",
    cart: "Корзина",
    emptyCart: "Ваша корзина пуста",
    checkoutTitle: "Оформить заказ",
    feedbackTitle: "Обратная связь",
    feedbackSub: "Возникли вопросы? Оставьте заявку, и мы ответим в течение 15 минут!",
    name: "Ваше имя",
    phone: "Номер телефона",
    email: "Электронная почта",
    message: "Сообщение или вопрос",
    submitOrder: "Разместить заказ",
    submitFeedback: "Отправить сообщение",
    total: "Итого",
    rub: "руб.",
    pcs: "шт.",
    inStock: "В наличии",
    outOfStock: "Ожидается поступление",
    price: "Цена",
    composition: "Состав",
    dosage: "Способ применения",
    aboutText1: "Научно-производственное объединение «ЭкоРост» более 15 лет разрабатывает и производит экологически чистые органоминеральные и хелатные удобрения. Наша миссия — предоставить агрономам и садоводам высокотехнологичные решения, которые повышают урожайность сельскохозяйственных культур до 40% без вреда для экологии земли.",
    aboutText2: "Собственная лаборатория позволяет нам синтезировать микроэлементы в хелатной форме с биодоступностью более 90%. Мы контролируем каждую партию на предмет чистоты сырья и полного отсутствия тяжелых металлов.",
    yearsActive: "15+ лет разработок",
    satisfiedClients: "10,000+ хозяйств",
    hectaresTreated: "150к+ га обработано",
    productCategories: "Категории продуктов",
    partnerTitle: "Станьте партнером ЭкоРост",
    partnerSub: "Специальные условия для дилеров, фермерских хозяйств и оптовых баз",
    partnerBen1: "Доставка авто- и ЖД-транспортом по всей России",
    partnerBen2: "Индивидуальные рецептуры под ваши анализы почв",
    partnerBen3: "Полный пакет сертификационной документации",
    partnerBen4: "Обучение персонала и выезд агронома на замеры",
    clientsLogo: "Наши клиенты и партнеры",
    analyticsTitle: "Дашборд аналитики (Реальное время)",
    analyticsTotalRev: "Выручка за месяц",
    analyticsOrders: "Оформлено заказов",
    analyticsViews: "Посещения сайта",
    adminTitle: "Панель управления ЭкоРост",
    adminRole: "Текущая роль",
    adminAuth: "Двухфакторная аутентификация",
    adminAuthActive: "2FA Активна",
    adminAddProduct: "Добавить продукт",
    adminAddTip: "Добавить совет",
    adminSettings: "Настройки интеграций",
    adminBackups: "Резервное копирование и синхронизация",
    offlineMode: "Автономный режим",
    offlineActive: "Вы работаете в офлайн-режиме",
    offlineSync: "Данные будут синхронизированы при восстановлении сети",
    orderSuccess: "Заказ успешно оформлен!",
    feedbackSuccess: "Сообщение успешно отправлено!",
    tgReady: "Telegram интеграция активна",
    tgNotConfigured: "Telegram в демо-режиме (нажмите для настройки)",
    seoHead: "Поисковая SEO оптимизация",
    apiDocTitle: "Документация API для интеграции",
    pushTitle: "Push-уведомления",
    backupNow: "Создать бэкап в реальном времени",
    backupsList: "Список системных бэкапов",
    restore: "Восстановить из этого бэкапа",
    notifNewOrder: "Новый заказ зарегистрирован в системе",
    notifNewFB: "Новый отзыв получен с формы обратной связи"
  },
  en: {
    brand: "EcoGrow",
    subtitle: "Innovative Fertilizers from Manufacturer",
    slogan: "Healthy Soil — Bountiful Harvest",
    navAbout: "About Us",
    navProducts: "Our Products",
    navCatalog: "Buy / Place Order",
    navPartners: "For Partners",
    navTips: "Useful Tips",
    navAdmin: "Control Panel",
    navApi: "For Developers",
    lang: "Русская версия",
    cart: "Cart",
    emptyCart: "Your cart is empty",
    checkoutTitle: "Place Your Order",
    feedbackTitle: "Feedback Form",
    feedbackSub: "Have questions? Submit the form and we'll reply within 15 minutes!",
    name: "Your Name",
    phone: "Phone Number",
    email: "Email Address",
    message: "Message or Question",
    submitOrder: "Submit Order",
    submitFeedback: "Send Message",
    total: "Total",
    rub: "RUB",
    pcs: "pcs",
    inStock: "In Stock",
    outOfStock: "Out of Stock",
    price: "Price",
    composition: "Composition",
    dosage: "Application",
    aboutText1: "NPO EcoGrow has been developing and manufacturing environmentally friendly organo-mineral and chelated fertilizers for over 15 years. Our mission is to provide agronomists and farmers with high-tech solutions that increase yields by up to 40% without damaging soil ecology.",
    aboutText2: "Our custom laboratory allows synthesizing microelements in chelated form with bio-availability exceeding 90%. We guarantee zero heavy metals and pristine raw ingredients in every batch.",
    yearsActive: "15+ Years Active",
    satisfiedClients: "10,000+ Farms served",
    hectaresTreated: "150k+ Ha Treated",
    productCategories: "Product Categories",
    partnerTitle: "Become an EcoGrow Partner",
    partnerSub: "Special conditions for distributors, farming unions and wholesale hubs",
    partnerBen1: "Rail and truck shipping across key continental hubs",
    partnerBen2: "Custom recipes tailored to your precise soil analysis",
    partnerBen3: "Full certification and chemical compliance papers",
    partnerBen4: "Ongoing agronomic training and soil testing field tours",
    clientsLogo: "Our Clients & Partners",
    analyticsTitle: "Analytics Dashboard (Realtime)",
    analyticsTotalRev: "Monthly Revenue",
    analyticsOrders: "Orders Completed",
    analyticsViews: "Website Traffic",
    adminTitle: "EcoGrow Control Center",
    adminRole: "Current Role",
    adminAuth: "Two-Factor Authentication",
    adminAuthActive: "2FA Active",
    adminAddProduct: "Add New Product",
    adminAddTip: "Add New Article",
    adminSettings: "Integration API Settings",
    adminBackups: "Real-time Backups & Sync",
    offlineMode: "Offline Mode",
    offlineActive: "Running on Client Storage (Offline Cache)",
    offlineSync: "Pending changes will sync automatically once connection is restored",
    orderSuccess: "Order registered successfully!",
    feedbackSuccess: "Message dispatched!",
    tgReady: "Telegram sync active",
    tgNotConfigured: "Telegram simulator mode (Click to edit credentials)",
    seoHead: "SEO Search Visibility Engine",
    apiDocTitle: "System API Documentation",
    pushTitle: "System Push Messages",
    backupNow: "Trigger Instant Backup",
    backupsList: "Available System Snapshots",
    restore: "Restore databases from this",
    notifNewOrder: "New order has been recorded into the persistent store",
    notifNewFB: "New feedback request dispatched by client"
  }
};

const STATS_COLORS = ["#2D4A35", "#D2B48C", "#8B4513", "#5C2E2B"];

export default function App() {
  // Localization & Theme
  const [lang, setLang] = useState<Language>("ru");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  
  // Responsive navigation bar toggle
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Core Data States
  const [products, setProducts] = useState<Product[]>([]);
  const [tips, setTips] = useState<Tip[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [backups, setBackups] = useState<BackupRecord[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [settings, setSettings] = useState<SystemSettings>({
    salesEmail: "sales@ecorost-fertilizer.ru",
    telegramBotToken: "",
    telegramChatId: "",
    autoBackupEnabled: true,
    backupIntervalMinutes: 5
  });

  // UI state controllers
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [cart, setCart] = useState<{ [productId: string]: number }>({});
  const [checkoutName, setCheckoutName] = useState("");
  const [checkoutEmail, setCheckoutEmail] = useState("");
  const [checkoutPhone, setCheckoutPhone] = useState("");
  const [checkoutSuccess, setCheckoutSuccess] = useState<string | null>(null);
  const [submittingCheckout, setSubmittingCheckout] = useState(false);

  const [feedbackName, setFeedbackName] = useState("");
  const [feedbackEmail, setFeedbackEmail] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackSuccess, setFeedbackSuccess] = useState<string | null>(null);
  const [submittingFeedback, setSubmittingFeedback] = useState(false);

  // Network offline mode simulation state
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [offlinePendingOrders, setOfflinePendingOrders] = useState<any[]>([]);

  // RBAC Admin State
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState<UserRole>("admin");
  const [twoFactorToken, setTwoFactorToken] = useState("");
  const [isTwoFactorVerified, setIsTwoFactorVerified] = useState(true); // default true for simple user simulation, toggles verification state
  
  // Admin CRUD temp forms
  const [newProdNameRu, setNewProdNameRu] = useState("");
  const [newProdNameEn, setNewProdNameEn] = useState("");
  const [newProdDescRu, setNewProdDescRu] = useState("");
  const [newProdDescEn, setNewProdDescEn] = useState("");
  const [newProdPrice, setNewProdPrice] = useState<number>(1000);
  const [newProdCatRu, setNewProdCatRu] = useState("Жидкие удобрения");
  const [newProdCatEn, setNewProdCatEn] = useState("Liquid fertilizers");
  const [newProdDosageRu, setNewProdDosageRu] = useState("");
  const [newProdDosageEn, setNewProdDosageEn] = useState("");
  const [newProdCompRu, setNewProdCompRu] = useState("");
  const [newProdCompEn, setNewProdCompEn] = useState("");
  const [newProdImg, setNewProdImg] = useState("");

  const [newTipTitleRu, setNewTipTitleRu] = useState("");
  const [newTipTitleEn, setNewTipTitleEn] = useState("");
  const [newTipTextRu, setNewTipTextRu] = useState("");
  const [newTipTextEn, setNewTipTextEn] = useState("");
  const [newTipCatRu, setNewTipCatRu] = useState("");
  const [newTipCatEn, setNewTipCatEn] = useState("");

  // Live Settings edit
  const [settingsSalesEmail, setSettingsSalesEmail] = useState("");
  const [settingsBotToken, setSettingsBotToken] = useState("");
  const [settingsChatId, setSettingsChatId] = useState("");

  // Push notifications UI elements
  const [pushNotifications, setPushNotifications] = useState<{ id: string; text: string; time: string }[]>([]);
  const [isNotificationSoundEnabled, setIsNotificationSoundEnabled] = useState(false);

  // Is API drawer details expanded
  const [isApiDocOpen, setIsApiDocOpen] = useState(false);

  // SEO dynamic simulation
  const [seoSearchRank, setSeoSearchRank] = useState(98);
  const [seoFriendlyUrls, setSeoFriendlyUrls] = useState([
    { path: "/organic-nitrogen", label: "ЭкоАзот Премиум (Liquid Nitrogen Fertilizer)" },
    { path: "/granulated-bio-humus", label: "ПочвоАктив Био (Soil Reconstruction)" },
    { path: "/potassium-sweet-fruits", label: "ФитоКалий Максимум (Root Active Potassium)" }
  ]);

  // Sync / Load Initial App Data
  useEffect(() => {
    fetchProducts();
    fetchTips();
    fetchFeedbacks();
    fetchOrders();
    fetchBackups();
    fetchSettings();
    fetchAnalytics();

    // Trigger hit counter view on server for stats
    fetch("/api/analytics/view", { method: "POST" }).then(() => fetchAnalytics());

    // Setup periodic automatic backup checker notification
    const interval = setInterval(() => {
      if (!isOfflineMode) {
        fetchBackups();
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [isOfflineMode]);

  // Synchronize dynamic settings inputs
  useEffect(() => {
    if (settings) {
      setSettingsSalesEmail(settings.salesEmail);
      setSettingsBotToken(settings.telegramBotToken);
      setSettingsChatId(settings.telegramChatId);
    }
  }, [settings]);

  // Data fetching functions
  const fetchProducts = async () => {
    try {
      const r = await fetch("/api/products");
      if (r.ok) {
        const data = await r.json();
        setProducts(data);
        localStorage.setItem("cached_products", JSON.stringify(data));
      }
    } catch (e) {
      const cached = localStorage.getItem("cached_products");
      if (cached) setProducts(JSON.parse(cached));
    }
  };

  const fetchTips = async () => {
    try {
      const r = await fetch("/api/tips");
      if (r.ok) {
        const data = await r.json();
        setTips(data);
        localStorage.setItem("cached_tips", JSON.stringify(data));
      }
    } catch (e) {
      const cached = localStorage.getItem("cached_tips");
      if (cached) setTips(JSON.parse(cached));
    }
  };

  const fetchOrders = async () => {
    try {
      const r = await fetch("/api/orders");
      if (r.ok) {
        const data = await r.json();
        setOrders(data);
      }
    } catch (e) {
      console.log("Network unreachable, using offline store views.");
    }
  };

  const fetchFeedbacks = async () => {
    try {
      const r = await fetch("/api/feedback");
      if (r.ok) {
        const data = await r.json();
        setFeedbacks(data);
      }
    } catch (e) {
      console.log("Could not view messages offline");
    }
  };

  const fetchBackups = async () => {
    try {
      const r = await fetch("/api/backups");
      if (r.ok) {
        const data = await r.json();
        setBackups(data);
      }
    } catch (e) {
      console.log("Backups index offline");
    }
  };

  const fetchSettings = async () => {
    try {
      const r = await fetch("/api/settings");
      if (r.ok) {
        const data = await r.json();
        setSettings(data);
      }
    } catch (e) {
      console.log("Settings offline");
    }
  };

  const fetchAnalytics = async () => {
    try {
      const r = await fetch("/api/analytics");
      if (r.ok) {
        const data = await r.json();
        setAnalytics(data);
      }
    } catch (e) {
      console.log("Analytics data offline");
    }
  };

  // Dispatch a simulated Push message to system screen
  const addPushNotification = (text: string) => {
    const freshNotif = {
      id: Date.now().toString(),
      text,
      time: new Date().toLocaleTimeString()
    };
    setPushNotifications(prev => [freshNotif, ...prev.slice(0, 4)]);
    if (isNotificationSoundEnabled) {
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = "sine";
        osc.frequency.setValueAtTime(580, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.15);
      } catch (e) {
        console.log("Audio notallowed");
      }
    }
  };

  // Add / reduce quantities from shopping basket list
  const updateCart = (productId: string, delta: number) => {
    setCart(prev => {
      const current = prev[productId] || 0;
      const next = current + delta;
      if (next <= 0) {
        const updated = { ...prev };
        delete updated[productId];
        return updated;
      }
      return { ...prev, [productId]: next };
    });
  };

  // Clean shopping cart
  const clearCart = () => setCart({});

  // Calculations
  const getCartTotalAmount = () => {
    return Object.entries(cart).reduce((total, [prodId, qty]) => {
      const match = products.find(p => p.id === prodId);
      const count = Number(qty);
      return total + (match ? match.price * count : 0);
    }, 0);
  };

  // Submit checkout order
  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkoutName || !checkoutEmail || !checkoutPhone) {
      alert("Заполните обязательные поля!");
      return;
    }
    setSubmittingCheckout(true);

    const itemsList = Object.entries(cart).map(([prodId, qty]) => {
      const match = products.find(p => p.id === prodId);
      return {
        productId: prodId,
        productName: match ? (lang === "ru" ? match.name_ru : match.name_en) : "Unknown product",
        quantity: qty,
        price: match ? match.price : 0
      };
    });

    const totalMoney = getCartTotalAmount();

    const orderData = {
      clientName: checkoutName,
      email: checkoutEmail,
      phone: checkoutPhone,
      items: itemsList,
      totalAmount: totalMoney
    };

    if (isOfflineMode) {
      // Simulate successful local caching persistence
      const simulatedId = "ORD-OFFLINE-" + Math.floor(10000 + Math.random() * 90000);
      const offlineOrder = {
        ...orderData,
        id: simulatedId,
        status: 'pending' as const,
        createdAt: new Date().toISOString(),
        isOfflineSaved: true
      };
      setOfflinePendingOrders(prev => [...prev, offlineOrder]);
      setCart({});
      setCheckoutSuccess(lang === "ru" ? "Заказ сохранен локально во встроенной базе данных! Мы синхронизируем его при восстановлении сети." : "Order cached in local secure storage. It will sync automatically as soon as internet connection resumes.");
      addPushNotification(`Офлайн-режим: заказ ${simulatedId} сохранен на устройстве`);
      setSubmittingCheckout(false);
      return;
    }

    try {
      const r = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData)
      });
      const result = await r.json();
      if (r.ok) {
        setCart({});
        setCheckoutName("");
        setCheckoutEmail("");
        setCheckoutPhone("");
        setCheckoutSuccess(lang === "ru" ? result.message_ru : result.message_en);
        addPushNotification(`${t[lang].notifNewOrder}: #${result.orderId}`);
        fetchOrders(); // refresh admin view
        fetchAnalytics(); // update dashboard KPIs
      } else {
        alert(result.error || "Order failed");
      }
    } catch (err) {
      alert("Сетевая ошибка. Переводим ваше устройство в офлайн-режим.");
      setIsOfflineMode(true);
    } finally {
      setSubmittingCheckout(false);
    }
  };

  // Submit dynamic feedback form response
  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackName || !feedbackEmail || !feedbackMessage) return;
    setSubmittingFeedback(true);

    try {
      const r = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: feedbackName,
          email: feedbackEmail,
          message: feedbackMessage
        })
      });
      const res = await r.json();
      if (r.ok) {
        setFeedbackName("");
        setFeedbackEmail("");
        setFeedbackMessage("");
        setFeedbackSuccess(lang === "ru" ? res.message_ru : res.message_en);
        addPushNotification(`${t[lang].notifNewFB} от ${feedbackName}`);
        fetchFeedbacks();
        fetchAnalytics();
      }
    } catch (err) {
      // Offline fallback alert
      setFeedbackSuccess(lang === "ru" ? "Сообщение поставлено в очередь на отправку. Вы в офлайн-режиме!" : "Message queued to sync!");
      setIsOfflineMode(true);
    } finally {
      setSubmittingFeedback(false);
    }
  };

  // Trigger manual instant database backup in server storage
  const handleTriggerBackup = async () => {
    try {
      const r = await fetch("/api/backups/trigger", { method: "POST" });
      const res = await r.json();
      if (r.ok) {
        addPushNotification(lang === "ru" ? "Новая резервная копия успешно сформирована!" : "Incremental system snapshot generated!");
        fetchBackups();
        fetchAnalytics();
      }
    } catch (e) {
      alert("Backup sequence failed offline");
    }
  };

  // Restore database tables from state backups
  const handleRestoreBackup = async (filename: string) => {
    if (!confirm(lang === "ru" ? `Восстановить систему из бекапа ${filename}?` : `Are you sure to restore dataset from snapshot ${filename}?`)) return;
    try {
      const r = await fetch("/api/backups/restore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename })
      });
      const res = await r.json();
      if (r.ok) {
        alert(res.message);
        addPushNotification(`База данных восстановлена: ${filename}`);
        // reload stats
        fetchProducts();
        fetchTips();
        fetchOrders();
        fetchFeedbacks();
        fetchAnalytics();
      }
    } catch (e) {
      alert("Restore error");
    }
  };

  // Add Product (Admin Action)
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentRole === "manager") {
      alert("У менеджеров нет прав на добавление/редактирование номенклатурных позиций.");
      return;
    }
    if (!newProdNameRu || !newProdNameEn || !newProdPrice) {
      alert("Fill names & price");
      return;
    }

    const payload = {
      name_ru: newProdNameRu,
      name_en: newProdNameEn,
      description_ru: newProdDescRu,
      description_en: newProdDescEn,
      price: Number(newProdPrice),
      image: newProdImg || "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=400",
      category_ru: newProdCatRu,
      category_en: newProdCatEn,
      dosage_ru: newProdDosageRu,
      dosage_en: newProdDosageEn,
      composition_ru: newProdCompRu,
      composition_en: newProdCompEn,
      inStock: true
    };

    try {
      const r = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (r.ok) {
        addPushNotification(`Добавлен продукт: ${newProdNameRu}`);
        // Reset states
        setNewProdNameRu("");
        setNewProdNameEn("");
        setNewProdDescRu("");
        setNewProdDescEn("");
        setNewProdPrice(1000);
        setNewProdDosageRu("");
        setNewProdDosageEn("");
        setNewProdCompRu("");
        setNewProdCompEn("");
        setNewProdImg("");
        fetchProducts();
      }
    } catch (e) {
      alert("Fail add product");
    }
  };

  // Delete product action (Admin / Moderator)
  const handleDeleteProduct = async (id: string) => {
    if (currentRole === "manager") {
      alert("Для этой роли действие заблокировано!");
      return;
    }
    if (!confirm("Удалить этот продукт из каталога?")) return;
    try {
      const r = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (r.ok) {
        addPushNotification(`Удален товар ID ${id}`);
        fetchProducts();
      }
    } catch (e) {
      alert("Error deleting product");
    }
  };

  // Change order status action (Staff)
  const handleChangeOrderStatus = async (orderId: string, newStatus: any) => {
    try {
      const r = await fetch(`/api/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
      if (r.ok) {
        addPushNotification(`Заказ ${orderId} обновлен: ${newStatus}`);
        fetchOrders();
      }
    } catch (e) {
      console.log("Error status update");
    }
  };

  // Add helpful tip (Admin Action)
  const handleAddTip = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentRole === "manager") {
      alert("Уровень прав 'Менеджер' не имеет доступа.");
      return;
    }
    if (!newTipTitleRu || !newTipTitleEn || !newTipTextRu || !newTipTextEn) {
      alert("Заполните текст статей");
      return;
    }

    const payload = {
      title_ru: newTipTitleRu,
      title_en: newTipTitleEn,
      text_ru: newTipTextRu,
      text_en: newTipTextEn,
      category_ru: newTipCatRu || "Общее",
      category_en: newTipCatEn || "General"
    };

    try {
      const r = await fetch("/api/tips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (r.ok) {
        addPushNotification(`Добавлена статья: ${newTipTitleRu}`);
        setNewTipTitleRu("");
        setNewTipTitleEn("");
        setNewTipTextRu("");
        setNewTipTextEn("");
        setNewTipCatRu("");
        setNewTipCatEn("");
        fetchTips();
      }
    } catch (e) {
      alert("Error adding tip content");
    }
  };

  // Delete tip
  const handleDeleteTip = async (id: string) => {
    if (currentRole === "manager") return;
    try {
      const r = await fetch(`/api/tips/${id}`, { method: "DELETE" });
      if (r.ok) {
        fetchTips();
      }
    } catch (e) {
      console.log("Delete tip offline error");
    }
  };

  // Save Settings Config
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const r = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          salesEmail: settingsSalesEmail,
          telegramBotToken: settingsBotToken,
          telegramChatId: settingsChatId
        })
      });
      if (r.ok) {
        alert(lang === "ru" ? "Настройки успешно сохранены!" : "Configuration synced successfully!");
        fetchSettings();
      }
    } catch (e) {
      alert("Settings offline error");
    }
  };

  // Test current configuration integration with Telegram Bot message simulation
  const handleTestTelegram = async () => {
    try {
      const r = await fetch("/api/telegram-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          testToken: settingsBotToken,
          testChatId: settingsChatId
        })
      });
      const res = await r.json();
      if (r.ok) {
        alert(lang === "ru" ? "Канал протестирован. Чат получил уведомление!" : "Integration verified! Check Telegram chat.");
        addPushNotification("Успешный тест Telegram API");
      } else {
        alert(`Ошибка ответа API: ${res.error}`);
      }
    } catch (e: any) {
      alert(`Сетевой сбой при тестировании: ${e.message}`);
    }
  };

  // Sync offline orders when back online
  const handleSyncOfflineData = () => {
    if (offlinePendingOrders.length === 0) {
      alert("Нет отложенных офлайн-заказов для синхронизации.");
      return;
    }
    setIsOfflineMode(false);
    // process and dispatch sequentially
    Promise.all(
      offlinePendingOrders.map(async (order) => {
        try {
          const r = await fetch("/api/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              clientName: order.clientName,
              email: order.email,
              phone: order.phone,
              items: order.items,
              totalAmount: order.totalAmount
            })
          });
          return r.ok;
        } catch (e) {
          return false;
        }
      })
    ).then((results) => {
      const successCount = results.filter(Boolean).length;
      alert(`Синхронизация завершена! Успешно передано: ${successCount} из ${offlinePendingOrders.length} заказов.`);
      setOfflinePendingOrders([]);
      fetchOrders();
      fetchAnalytics();
    });
  };

  // Category listing filter list
  const categoriesList = Array.from(
    new Set(
      products.map(p => (lang === "ru" ? p.category_ru : p.category_en))
    )
  );

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === "dark" ? "bg-[#122016] text-[#F0EBE0]" : "bg-[#F0EBE0] text-[#2D4A35]"}`}>
      
      {/* Dynamic SEO Head simulation visualizer overlay */}
      <div className="bg-[#2D4A35] text-white text-xs py-2 px-4 flex justify-between items-center z-50 relative border-b border-[#F0EBE0]/10">
        <div className="flex items-center gap-2">
          <Leaf className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span className="font-mono tracking-wider opacity-90">SEO Visibility: {seoSearchRank}% Optimum</span>
          <div className="hidden lg:flex items-center gap-2 ml-4 border-l border-white/20 pl-4">
            <span className="opacity-65">Friendly SEO Slugs:</span>
            {seoFriendlyUrls.map((u, i) => (
              <span key={i} className="bg-white/10 px-2 py-0.5 rounded text-[10px] text-amber-200">
                {u.path}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsOfflineMode(!isOfflineMode)}
            className={`flex items-center gap-1.5 px-2 py-1 rounded transition-colors text-[11px] ${isOfflineMode ? 'bg-red-500 text-white animate-pulse' : 'bg-green-700/60 text-emerald-100'}`}
            title="Переключить симуляцию отсутствия интернета"
          >
            {isOfflineMode ? (
              <>
                <WifiOff className="w-3.5 h-3.5" />
                <span>Offline active</span>
              </>
            ) : (
              <>
                <Wifi className="w-3.5 h-3.5" />
                <span>Online sync</span>
              </>
            )}
          </button>

          <button 
            onClick={() => setIsApiDocOpen(!isApiDocOpen)} 
            className="hover:text-amber-300 underline font-mono text-[11px] transition-all flex items-center gap-1"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>API Docs</span>
          </button>

          <button 
            onClick={() => setLang(lang === "ru" ? "en" : "ru")} 
            className="bg-[#F0EBE0] text-[#2D4A35] font-bold px-2 py-0.5 rounded text-[11px] tracking-wide hover:opacity-90"
          >
            {t[lang].lang}
          </button>
          
          <button 
            onClick={() => setTheme(theme === "light" ? "dark" : "light")} 
            className="p-1 rounded bg-white/10 hover:bg-white/20"
          >
            {theme === "light" ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Main Beautiful Header Navigation */}
      <header className={`sticky top-0 z-40 border-b transition-all ${theme === "dark" ? "bg-[#122016]/95 border-[#2D4A35]/50" : "bg-[#F0EBE0]/95 border-[#2D4A35]/20"} backdrop-blur`}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-[#2D4A35] text-[#F0EBE0] rounded-full flex items-center justify-center font-serif text-xl italic font-bold">
              Э
            </div>
            <div>
              <span className="text-xl font-serif font-black tracking-tight uppercase block leading-none">
                {t[lang].brand}
              </span>
              <span className="text-[10px] tracking-wider uppercase opacity-60">
                {lang === "ru" ? "УДОБРЕНИЯ ОТ ЗАВОДА" : "PREMIUM FERTILIZERS"}
              </span>
            </div>
          </a>

          {/* Desktop Links navbar */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold tracking-wide">
            <a href="#about" className="hover:opacity-75 transition-opacity text-[#2D4A35] dark:text-[#F0EBE0]">
              {t[lang].navAbout}
            </a>
            <a href="#products" className="hover:opacity-75 transition-opacity text-[#2D4A35] dark:text-[#F0EBE0]">
              {t[lang].navProducts}
            </a>
            <a href="#catalog" className="hover:opacity-75 transition-opacity text-[#2D4A35] dark:text-[#F0EBE0]">
              {t[lang].navCatalog}
            </a>
            <a href="#partners" className="hover:opacity-75 transition-opacity text-[#2D4A35] dark:text-[#F0EBE0]">
              {t[lang].navPartners}
            </a>
            <a href="#tips" className="hover:opacity-75 transition-opacity text-[#2D4A35] dark:text-[#F0EBE0]">
              {t[lang].navTips}
            </a>
            <button 
              onClick={() => setIsAdminPanelOpen(!isAdminPanelOpen)} 
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2D4A35] text-[#F0EBE0] dark:bg-[#F0EBE0] dark:text-[#2D4A35] rounded-lg text-xs hover:scale-105 transition-transform"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>{t[lang].navAdmin}</span>
            </button>
          </nav>

          <div className="flex items-center gap-3">
            {/* Direct access to Cart Button overlay (floating counter) */}
            <a href="#cart" className="relative p-2.5 rounded-full bg-[#2D4A35]/10 hover:bg-[#2D4A35]/20 transition-all text-[#2D4A35] dark:text-[#F0EBE0] dark:bg-white/10 dark:hover:bg-white/20">
              <ShoppingBag className="w-5 h-5" />
              {Object.keys(cart).length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white font-mono font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                  {Object.values(cart).reduce((a: any, b: any) => Number(a) + Number(b), 0)}
                </span>
              )}
            </a>

            {/* Mobile menu navigation button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="md:hidden p-2 text-[#2D4A35] dark:text-[#F0EBE0]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu sidebar */}
        {mobileMenuOpen && (
          <div className={`md:hidden px-4 pt-2 pb-6 border-t ${theme === "dark" ? "bg-[#122016] border-t-[#2D4A35]/30" : "bg-[#F0EBE0] border-[#2D4A35]/20"}`}>
            <nav className="flex flex-col gap-4 text-base font-semibold pt-2">
              <a 
                href="#about" 
                onClick={() => setMobileMenuOpen(false)}
                className="hover:opacity-75 text-[#2D4A35] dark:text-[#F0EBE0]"
              >
                {t[lang].navAbout}
              </a>
              <a 
                href="#products" 
                onClick={() => setMobileMenuOpen(false)}
                className="hover:opacity-75 text-[#2D4A35] dark:text-[#F0EBE0]"
              >
                {t[lang].navProducts}
              </a>
              <a 
                href="#catalog" 
                onClick={() => setMobileMenuOpen(false)}
                className="hover:opacity-75 text-[#2D4A35] dark:text-[#F0EBE0]"
              >
                {t[lang].navCatalog}
              </a>
              <a 
                href="#partners" 
                onClick={() => setMobileMenuOpen(false)}
                className="hover:opacity-75 text-[#2D4A35] dark:text-[#F0EBE0]"
              >
                {t[lang].navPartners}
              </a>
              <a 
                href="#tips" 
                onClick={() => setMobileMenuOpen(false)}
                className="hover:opacity-75 text-[#2D4A35] dark:text-[#F0EBE0]"
              >
                {t[lang].navTips}
              </a>
              <div className="h-px bg-[#2D4A35]/20 w-full my-1"></div>
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsAdminPanelOpen(true);
                }} 
                className="w-full flex items-center justify-center gap-1.5 px-4 py-2 bg-[#2D4A35] text-[#F0EBE0] rounded-xl text-sm"
              >
                <Sliders className="w-4 h-4" />
                <span>{t[lang].navAdmin}</span>
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Offline Status notification banner if active */}
      {isOfflineMode && (
        <div className="bg-red-600 text-white text-center py-2.5 px-4 text-xs font-semibold tracking-wide flex items-center justify-center gap-2 animate-pulse">
          <WifiOff className="w-4 h-4" />
          <span>{t[lang].offlineActive}. </span>
          <span className="hidden sm:inline opacity-90">{t[lang].offlineSync}.</span>
          <button 
            onClick={handleSyncOfflineData} 
            className="underline bg-white/20 hover:bg-white/30 text-white font-bold ml-4 px-3 py-1 rounded text-[11px]"
          >
            Синхронизировать сейчас (orders: {offlinePendingOrders.length})
          </button>
        </div>
      )}

      {/* Primary Banner Hero Block with Natural Tones colors & elegant branding */}
      <section className="relative overflow-hidden py-20 lg:py-32 border-b border-[#2D4A35]/20">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          {/* Natural organic pattern vector background */}
          <div className="absolute right-0 top-0 w-96 h-96 rounded-full bg-[#2D4A35] filter blur-3xl"></div>
          <div className="absolute left-10 bottom-10 w-80 h-80 rounded-full bg-[#8B4513] filter blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#2D4A35] text-[#F0EBE0] text-xs font-mono tracking-widest uppercase">
              🌿 {lang === "ru" ? "100% Экологично & Безопасно" : "100% ECO SECURE & ORGANIC"}
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif font-black tracking-tight leading-tight text-[#2D4A35] dark:text-white">
              {t[lang].slogan}
            </h1>

            <p className="text-lg opacity-85 leading-relaxed max-w-xl">
              {lang === "ru" 
                ? "Инновационные органические и жидкие азотные удобрения «ЭкоРост» обеспечивают максимальную биодоступность NPK формулы для здорового роста и обильного урожая."
                : "Innovative EcoGrow organo-mineral formulas maximize bioactive NPK absorption, guaranteeing lush plant development and stellar culinary grade harvest yields."
              }
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a 
                href="#catalog" 
                className="bg-[#2D4A35] text-[#F0EBE0] hover:bg-opacity-90 font-serif font-bold py-4 px-8 rounded-xl text-center shadow-lg hover:scale-102 transition-transform uppercase tracking-wider text-sm"
              >
                {lang === "ru" ? "Перейти к заказу 👇" : "Browse & Order Now 👇"}
              </a>
              <a 
                href="#about" 
                className="border-2 border-[#2D4A35] hover:bg-[#2D4A35] hover:text-[#F0EBE0] text-[#2D4A35] dark:border-[#F0EBE0] dark:text-[#F0EBE0] dark:hover:bg-[#F0EBE0] dark:hover:text-[#2D4A35] font-bold py-4 px-8 rounded-xl text-center transition-all text-sm uppercase tracking-wider"
              >
                {t[lang].navAbout}
              </a>
            </div>

            {/* Quick trust metrics */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#2D4A35]/10 dark:border-[#F0EBE0]/10 max-w-md text-center">
              <div>
                <p className="text-2xl sm:text-3xl font-serif font-bold text-[#2D4A35] dark:text-white">15+</p>
                <p className="text-[10px] uppercase tracking-wide opacity-75">{lang === "ru" ? "Лет опыта" : "Years Experience"}</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-serif font-bold text-[#2D4A35] dark:text-white">+40%</p>
                <p className="text-[10px] uppercase tracking-wide opacity-75">{lang === "ru" ? "К урожаю" : "Yield Increase"}</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-serif font-bold text-[#2D4A35] dark:text-white">100%</p>
                <p className="text-[10px] uppercase tracking-wide opacity-75">{lang === "ru" ? "Биогарантия" : "Pure Organic"}</p>
              </div>
            </div>
          </div>

          {/* Graphical/Promo section side column featuring actual products catalog snapshot */}
          <div className="lg:col-span-5 relative">
            <div className={`p-6 rounded-3xl shadow-2xl transition-colors border ${theme === "dark" ? "bg-[#1E3526] border-white/10" : "bg-white/70 border-[#2D4A35]/10"}`}>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-mono opacity-60">FEATURED PRODUCT</span>
                <span className="px-2.5 py-0.5 text-[10px] font-bold bg-[#F0EBE0] text-[#2D4A35] rounded">RECOMMENDED</span>
              </div>
              
              <img 
                src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=400" 
                alt="Product feature"
                className="w-full h-48 object-cover rounded-2xl mb-4 shadow"
              />

              <h3 className="text-xl font-bold font-serif mb-1">
                {lang === "ru" ? "ЭкоАзот Премиум (NPK 30-5-3)" : "EcoNitrogen Premium"}
              </h3>
              
              <p className="text-xs opacity-75 line-clamp-2 mb-4">
                {lang === "ru" 
                  ? "Специализированное комплексное жидкое удобрение для ускорения метаболизма растений, увеличения индекса листовой пластины."
                  : "Liquid organic nitrogen formulation centered on L-amino complexes for massive green boost."
                }
              </p>

              <div className="flex justify-between items-center">
                <span className="text-xl font-serif font-bold">1200 {t[lang].rub}</span>
                <a 
                  href="#catalog"
                  className="bg-[#2D4A35] text-[#F0EBE0] hover:opacity-90 px-4 py-2 rounded-lg text-sm font-semibold tracking-wider transition-all"
                >
                  {lang === "ru" ? "КУПИТЬ" : "ORDER"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 1. SECTION: About Company */}
      <section id="about" className="py-20 border-b border-[#2D4A35]/10 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-4">
            <h2 className="text-4xl font-serif font-black text-[#2D4A35] dark:text-white">
              {t[lang].navAbout}
            </h2>
            <div className="w-16 h-1 bg-[#2D4A35] dark:bg-[#F0EBE0]"></div>
            <p className="text-base leading-relaxed opacity-85">
              {t[lang].aboutText1}
            </p>
            <p className="text-base leading-relaxed opacity-85 italic">
              {t[lang].aboutText2}
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className={`p-6 rounded-2xl border ${theme === "dark" ? "bg-white/5 border-white/10" : "bg-white/40 border-[#2D4A35]/10"}`}>
              <span className="p-3 bg-[#2D4A35] text-[#F0EBE0] rounded-xl inline-block mb-3">
                <Leaf className="w-6 h-6" />
              </span>
              <h4 className="text-lg font-serif font-bold mb-2">{lang === "ru" ? "Чистая микробиология" : "Pristine Ecology"}</h4>
              <p className="text-xs opacity-75">
                {lang === "ru" 
                  ? "Микробиологические добавки восстанавливают истощенные каменистые и песчаные слои." 
                  : "Eco-compatible bacteria stimulate degraded carbon structures and subsoil roots."}
              </p>
            </div>

            <div className={`p-6 rounded-2xl border ${theme === "dark" ? "bg-white/5 border-white/10" : "bg-white/40 border-[#2D4A35]/10"}`}>
              <span className="p-3 bg-[#2D4A35] text-[#F0EBE0] rounded-xl inline-block mb-3">
                <ShieldCheck className="w-6 h-6" />
              </span>
              <h4 className="text-lg font-serif font-bold mb-2">{lang === "ru" ? "Хелатирование 98%" : "Chelate Bioavailability"}</h4>
              <p className="text-xs opacity-75">
                {lang === "ru" 
                  ? "Полное усвоение питательных веществ без засоления грунта или химического токсикоза." 
                  : "Advanced chelated elements bypass classic standard lock-ups inside dry limestone."}
              </p>
            </div>

            {/* Quick facts display */}
            <div className="sm:col-span-2 bg-[#2D4A35] text-[#F0EBE0] p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <p className="text-lg font-serif font-bold">{t[lang].hectaresTreated}</p>
                <p className="text-[11px] opacity-75">{lang === "ru" ? "Пахотных угодий улучшено нашими агрономами" : "Arable regions enhanced across Eastern Europe"}</p>
              </div>
              <div className="h-px sm:h-12 w-full sm:w-px bg-white/20"></div>
              <div>
                <p className="text-lg font-serif font-bold">{t[lang].yearsActive}</p>
                <p className="text-[11px] opacity-75">{lang === "ru" ? "Ведущих лабораторных исследований" : "Innovative formulations released annually"}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SECTION: Our Products (Description and Features Showcase) */}
      <section id="products" className="py-20 bg-[#2D4A35]/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <h2 className="text-4xl font-serif font-black">{t[lang].navProducts}</h2>
            <p className="text-sm opacity-80 uppercase tracking-widest">{lang === "ru" ? "Технологичные решения для любых культур" : "Custom nutrients formulated for organic agrocomplexes"}</p>
            <div className="w-20 h-1 bg-[#2D4A35] mx-auto"></div>
          </div>

          {/* Grid detailing product benefits dynamically */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={`p-8 rounded-2xl border ${theme === "dark" ? "bg-white/5 border-white/10" : "bg-white/80 border-[#2D4A35]/15"} shadow-sm`}>
              <div className="w-12 h-12 bg-[#2D4A35] text-[#F0EBE0] rounded-xl flex items-center justify-center mb-5">
                <span className="font-bold">01</span>
              </div>
              <h3 className="text-xl font-serif font-bold mb-3">{lang === "ru" ? "Азотные жидкие комплексы" : "Liquid Nitrogen Complexes"}</h3>
              <p className="text-sm opacity-80 leading-relaxed">
                {lang === "ru" 
                  ? "Для стремительного старта побегов, обогащения листа белками и ускорения деления живых клеток. Рекомендовано для зерновых, томатов и яблоневых садов."
                  : "Perfect for rapid leafy growth, high protein enrichment, and plant metabolic boost. Essential for young plants."
                }
              </p>
            </div>

            <div className={`p-8 rounded-2xl border ${theme === "dark" ? "bg-white/5 border-white/10" : "bg-white/80 border-[#2D4A35]/15"} shadow-sm`}>
              <div className="w-12 h-12 bg-[#2D4A35] text-[#F0EBE0] rounded-xl flex items-center justify-center mb-5">
                <span className="font-bold">02</span>
              </div>
              <h3 className="text-xl font-serif font-bold mb-3">{lang === "ru" ? "Органический сухой гумус" : "Dry Organic Granules"}</h3>
              <p className="text-sm opacity-80 leading-relaxed">
                {lang === "ru" 
                  ? "Фирменные ферментированные микробиологические гранулы долговечного удержания. Обеспечивают рыхлость грунта и влагоудержание в засуху."
                  : "Long-release microbial formulation ideal for general root tilling. Enriches soil structure, preserving vital hydration."
                }
              </p>
            </div>

            <div className={`p-8 rounded-2xl border ${theme === "dark" ? "bg-white/5 border-white/10" : "bg-white/80 border-[#2D4A35]/15"} shadow-sm`}>
              <div className="w-12 h-12 bg-[#2D4A35] text-[#F0EBE0] rounded-xl flex items-center justify-center mb-5">
                <span className="font-bold">03</span>
              </div>
              <h3 className="text-xl font-serif font-bold mb-3">{lang === "ru" ? "Хелатированное Бор-Железо" : "Chelated Boron-Iron"}</h3>
              <p className="text-sm opacity-80 leading-relaxed">
                {lang === "ru" 
                  ? "Революционная формула против хлороза листьев. Линейная подкормка по листу усваивается мгновенно и повышает сладость плодов."
                  : "Stops chlorosis instantly. Delivers target micro-nutrients via immediate molecular structures directly to cell walls."
                }
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SECTION: Catalog Block with interactive shopping basket & immediate order placement */}
      <section id="catalog" className="py-20 max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <h2 className="text-4xl font-serif font-black text-[#2D4A35] dark:text-white">
              {lang === "ru" ? "Каталог продукции и Заказ" : "Product Catalog & Checkout"}
            </h2>
            <p className="text-sm opacity-75 mt-1">
              {lang === "ru" ? "Выберите подходящие удобрения и оформите расчет стоимости прямо сейчас" : "Select required fertilizers and place your purchase calculation directly on site"}
            </p>
          </div>

          {/* Category Quick Filter */}
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => setSelectedCategory("All")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${selectedCategory === "All" ? "bg-[#2D4A35] text-[#F0EBE0]" : "bg-[#2D4A35]/10 hover:bg-[#2D4A35]/20 text-[#2D4A35] dark:bg-white/10 dark:text-[#F0EBE0]"}`}
            >
              {lang === "ru" ? "Все виды" : "All Categories"}
            </button>
            {categoriesList.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${selectedCategory === cat ? "bg-[#2D4A35] text-[#F0EBE0]" : "bg-[#2D4A35]/10 hover:bg-[#2D4A35]/20 text-[#2D4A35] dark:bg-white/10 dark:text-[#F0EBE0]"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Products Grid list */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {products
              .filter(p => selectedCategory === "All" || (lang === "ru" ? p.category_ru : p.category_en) === selectedCategory)
              .map((product) => (
                <div 
                  key={product.id}
                  className={`border rounded-2xl overflow-hidden p-5 flex flex-col justify-between transition-all hover:shadow-xl ${theme === "dark" ? "bg-[#1E3526] border-white/10" : "bg-white/60 border-[#2D4A35]/10"}`}
                >
                  <div>
                    {/* Visual product container placeholder targeting quick loading times */}
                    <div className="w-full h-44 bg-[#2D4A35]/5 rounded-xl mb-4 overflow-hidden relative">
                      <img 
                        src={product.image || "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=400"} 
                        alt={product.name_ru}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-2.5 right-2.5 bg-[#2D4A35] text-[#F0EBE0] text-[10px] uppercase font-mono px-2 py-0.5 rounded">
                        {lang === "ru" ? product.category_ru : product.category_en}
                      </span>
                    </div>

                    <h3 className="text-xl font-serif font-black text-[#2D4A35] dark:text-white mb-2">
                      {lang === "ru" ? product.name_ru : product.name_en}
                    </h3>

                    <p className="text-xs opacity-80 leading-relaxed mb-4 line-clamp-3">
                      {lang === "ru" ? product.description_ru : product.description_en}
                    </p>

                    <div className="space-y-1.5 mb-4 text-xs font-mono opacity-90">
                      <div className="flex justify-between border-b border-dashed border-[#2D4A35]/10 pb-1">
                        <span className="opacity-60">{t[lang].composition}:</span>
                        <span className="font-bold text-right truncate max-w-xs">{lang === "ru" ? product.composition_ru : product.composition_en}</span>
                      </div>
                      <div className="flex justify-between border-b border-dashed border-[#2D4A35]/10 pb-1">
                        <span className="opacity-60">{t[lang].dosage}:</span>
                        <span className="font-bold text-right truncate max-w-xs">{lang === "ru" ? product.dosage_ru : product.dosage_en}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#2D4A35]/10 dark:border-white/10 flex justify-between items-center">
                    <div>
                      <span className="text-[10px] opacity-60 block uppercase">{t[lang].price}</span>
                      <span className="text-2xl font-serif font-bold text-[#2D4A35] dark:text-white">
                        {product.price} {t[lang].rub}
                      </span>
                    </div>

                    {cart[product.id] ? (
                      <div className="flex items-center bg-[#2D4A35] text-[#F0EBE0] rounded-xl overflow-hidden shadow">
                        <button 
                          onClick={() => updateCart(product.id, -1)}
                          className="px-3 py-2 hover:bg-black/20 text-lg font-bold"
                        >
                          -
                        </button>
                        <span className="px-3 font-bold font-mono">{cart[product.id]}</span>
                        <button 
                          onClick={() => updateCart(product.id, 1)}
                          className="px-3 py-2 hover:bg-black/20 text-lg font-bold"
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => updateCart(product.id, 1)}
                        className="bg-[#2D4A35] hover:bg-opacity-95 text-[#F0EBE0] dark:bg-[#F0EBE0] dark:text-[#2D4A35] font-bold px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Купить</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
          </div>

          {/* Secure Interactive Shopping Cart & Sales Order form */}
          <div id="cart" className="lg:col-span-4">
            <div className={`p-6 rounded-2xl border sticky top-24 shadow-2xl ${theme === "dark" ? "bg-[#1E3526] border-[#2D4A35]" : "bg-white border-2 border-[#2D4A35]"}`}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-serif font-bold text-[#2D4A35] dark:text-white flex items-center gap-2">
                  <ShoppingBag className="w-6 h-6" />
                  <span>{t[lang].cart}</span>
                </h3>
                {Object.keys(cart).length > 0 && (
                  <button 
                    onClick={clearCart} 
                    className="text-xs opacity-60 hover:opacity-100 hover:text-red-500 underline uppercase"
                  >
                    Clear
                  </button>
                )}
              </div>

              {Object.keys(cart).length === 0 ? (
                <div className="text-center py-10 opacity-60">
                  <Leaf className="w-10 h-10 mx-auto text-[#2D4A35] dark:text-[#F0EBE0] mb-2 opacity-30" />
                  <p className="text-sm">{t[lang].emptyCart}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="max-h-48 overflow-y-auto space-y-3 pr-1">
                    {Object.entries(cart).map(([prodId, qty]) => {
                      const match = products.find(p => p.id === prodId);
                      if (!match) return null;
                      return (
                        <div key={prodId} className="flex justify-between items-center text-xs pb-2 border-b border-dashed border-[#2D4A35]/15">
                          <div>
                            <p className="font-bold">{lang === "ru" ? match.name_ru : match.name_en}</p>
                            <p className="opacity-60">{match.price} {t[lang].rub} × {qty} {t[lang].pcs}</p>
                          </div>
                          <div className="flex gap-1">
                            <button 
                              onClick={() => updateCart(prodId, -1)}
                              className="px-2 py-0.5 bg-[#2D4A35]/10 rounded font-bold"
                            >
                              -
                            </button>
                            <span className="font-bold px-1.5">{qty}</span>
                            <button 
                              onClick={() => updateCart(prodId, 1)}
                              className="px-2 py-0.5 bg-[#2D4A35]/10 rounded font-bold"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-3 border-t border-[#2D4A35]/20 flex justify-between items-center text-lg">
                    <span className="font-bold">{t[lang].total}:</span>
                    <span className="font-serif font-black text-2xl text-[#2D4A35] dark:text-white">
                      {getCartTotalAmount()} {t[lang].rub}
                    </span>
                  </div>

                  {/* Checkout Form */}
                  <div className="pt-4 border-t border-[#2D4A35]/10">
                    <h4 className="text-xs uppercase tracking-widest font-bold opacity-70 mb-3">
                      {t[lang].checkoutTitle}
                    </h4>

                    {checkoutSuccess ? (
                      <div className="bg-green-600/10 border border-green-600 text-green-700 p-3 rounded-lg text-xs space-y-2">
                        <p className="font-bold">{checkoutSuccess}</p>
                        <button 
                          onClick={() => setCheckoutSuccess(null)} 
                          className="underline uppercase text-[10px] font-bold tracking-wider hover:opacity-80 block"
                        >
                          Оформить новый заказ
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleOrderSubmit} className="space-y-3">
                        <div>
                          <label className="text-[10px] uppercase font-bold opacity-60 block mb-1">
                            {t[lang].name} *
                          </label>
                          <input 
                            type="text" 
                            required
                            value={checkoutName}
                            onChange={(e) => setCheckoutName(e.target.value)}
                            placeholder="Иван Петров"
                            className="w-full bg-[#2D4A35]/5 border border-[#2D4A35]/20 rounded-lg p-2.5 text-xs focus:outline-none focus:border-[#2D4A35] transition-colors"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] uppercase font-bold opacity-60 block mb-1">
                            {t[lang].phone} *
                          </label>
                          <input 
                            type="tel" 
                            required
                            value={checkoutPhone}
                            onChange={(e) => setCheckoutPhone(e.target.value)}
                            placeholder="+7 (900) 000-00-00"
                            className="w-full bg-[#2D4A35]/5 border border-[#2D4A35]/20 rounded-lg p-2.5 text-xs focus:outline-none focus:border-[#2D4A35] transition-colors"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] uppercase font-bold opacity-60 block mb-1">
                            {t[lang].email} *
                          </label>
                          <input 
                            type="email" 
                            required
                            value={checkoutEmail}
                            onChange={(e) => setCheckoutEmail(e.target.value)}
                            placeholder="sales@agro-organic.ru"
                            className="w-full bg-[#2D4A35]/5 border border-[#2D4A35]/20 rounded-lg p-2.5 text-xs focus:outline-none focus:border-[#2D4A35] transition-colors"
                          />
                        </div>

                        <div className="bg-amber-100 dark:bg-[#122016] border border-amber-500/30 p-2.5 rounded-lg text-[10px] flex items-start gap-1.5 opacity-90">
                          <Lock className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                          <span>
                            {lang === "ru" 
                              ? "Ваши PII персональные данные шифруются в базе данных по протоколу AES-256." 
                              : "Active PII data is stored encrypted utilizing advanced cryptographic layers."}
                          </span>
                        </div>

                        <button 
                          type="submit"
                          disabled={submittingCheckout}
                          className="w-full bg-[#2D4A35] text-[#F0EBE0] hover:opacity-95 font-serif font-bold py-3.5 rounded-xl text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2"
                        >
                          {submittingCheckout ? (
                            <RefreshCw className="w-4 h-4 animate-spin" />
                          ) : (
                            <>
                              <Send className="w-3.5 h-3.5" />
                              <span>{t[lang].submitOrder}</span>
                            </>
                          )}
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* 4. SECTION: For Partners (Block Partners) */}
      <section id="partners" className="py-20 bg-[#2D4A35] text-[#F0EBE0] relative overflow-hidden">
        <div className="absolute right-0 bottom-0 pointer-events-none opacity-10">
          <Leaf className="w-80 h-80 text-white" />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-mono bg-white/10 text-amber-200 px-3.5 py-1.5 rounded-full uppercase tracking-widest">
              💼 B2B PARTNERSHIP OPPORTUNITIES
            </span>
            <h2 className="text-4xl lg:text-5xl font-serif font-black leading-tight">
              {t[lang].partnerTitle}
            </h2>
            <p className="opacity-80 text-sm leading-relaxed max-w-xl">
              {t[lang].partnerSub}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex gap-2 items-start">
                <Check className="w-5 h-5 text-amber-300 mt-1 flex-shrink-0" />
                <span className="text-xs">{t[lang].partnerBen1}</span>
              </div>
              <div className="flex gap-2 items-start">
                <Check className="w-5 h-5 text-amber-300 mt-1 flex-shrink-0" />
                <span className="text-xs">{t[lang].partnerBen2}</span>
              </div>
              <div className="flex gap-2 items-start">
                <Check className="w-5 h-5 text-amber-300 mt-1 flex-shrink-0" />
                <span className="text-xs">{t[lang].partnerBen3}</span>
              </div>
              <div className="flex gap-2 items-start">
                <Check className="w-5 h-5 text-amber-300 mt-1 flex-shrink-0" />
                <span className="text-xs">{t[lang].partnerBen4}</span>
              </div>
            </div>

            {/* Simulated Partner Companies Logotypes bar */}
            <div className="pt-6 border-t border-white/10">
              <p className="text-[10px] uppercase tracking-widest text-[#F0EBE0]/60 mb-3">{t[lang].clientsLogo}</p>
              <div className="grid grid-cols-4 gap-4 text-center text-xs font-mono tracking-widest text-amber-200">
                <div className="bg-white/5 py-2.5 rounded border border-white/10 uppercase">AGRO_SOYUZ</div>
                <div className="bg-white/5 py-2.5 rounded border border-white/10 uppercase">ECO_FARM</div>
                <div className="bg-white/5 py-2.5 rounded border border-white/10 uppercase">RUS_SEMENA</div>
                <div className="bg-white/5 py-2.5 rounded border border-white/10 uppercase">BIO_AGRO</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-[#F0EBE0] text-[#2D4A35] p-8 rounded-2xl shadow-2xl space-y-4">
            <h3 className="text-2xl font-serif font-bold">Оставить заявку на сотрудничество</h3>
            <p className="text-xs opacity-75">
              Индивидуальное предложение будет выслано на указанную почту в течение 1 часа.
            </p>

            {feedbackSuccess ? (
              <div className="bg-green-700 text-white p-4 rounded-xl text-xs font-bold">
                {feedbackSuccess}
              </div>
            ) : (
              <form onSubmit={handleFeedbackSubmit} className="space-y-4 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase font-bold opacity-60 block mb-1">{t[lang].name} *</label>
                    <input 
                      type="text" 
                      required
                      value={feedbackName}
                      onChange={(e) => setFeedbackName(e.target.value)}
                      placeholder="Алексей"
                      className="w-full bg-white/60 border border-[#2D4A35]/20 rounded-xl p-3 text-xs focus:outline-none focus:border-[#2D4A35]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-bold opacity-60 block mb-1">{t[lang].email} *</label>
                    <input 
                      type="email" 
                      required
                      value={feedbackEmail}
                      onChange={(e) => setFeedbackEmail(e.target.value)}
                      placeholder="partner@com.ru"
                      className="w-full bg-white/60 border border-[#2D4A35]/20 rounded-xl p-3 text-xs focus:outline-none focus:border-[#2D4A35]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold opacity-60 block mb-1">{t[lang].message} *</label>
                  <textarea 
                    rows={3}
                    required
                    value={feedbackMessage}
                    onChange={(e) => setFeedbackMessage(e.target.value)}
                    placeholder="Добрый день! Интересует закупка 20 тонн удобрений."
                    className="w-full bg-white/60 border border-[#2D4A35]/20 rounded-xl p-3 text-xs focus:outline-none focus:border-[#2D4A35]"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={submittingFeedback}
                  className="w-full bg-[#2D4A35] text-[#F0EBE0] hover:opacity-95 font-serif font-black py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
                >
                  {submittingFeedback ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Отправить коммерческий запрос</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 5. SECTION: Useful recommendations & tips (Block tips) */}
      <section id="tips" className="py-20 max-w-7xl mx-auto px-4 border-b border-[#2D4A35]/10">
        <div className="text-center max-w-xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-mono opacity-60 block uppercase tracking-widest">ECOGROW KNOWLEDGE</span>
          <h2 className="text-4xl font-serif font-black">{t[lang].navTips}</h2>
          <div className="w-20 h-1 bg-[#2D4A35] mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tips.map((tip) => (
            <article 
              key={tip.id}
              className={`p-6 rounded-2xl border transition-all hover:scale-102 flex flex-col justify-between ${theme === "dark" ? "bg-[#1E3526] border-white/10" : "bg-white/50 border-[#2D4A35]/10"}`}
            >
              <div>
                <div className="flex justify-between items-center text-[10px] font-mono opacity-60 mb-3">
                  <span>{lang === "ru" ? tip.category_ru : tip.category_en}</span>
                  <span>{tip.readTime}</span>
                </div>

                <h3 className="text-lg font-serif font-black text-[#2D4A35] dark:text-white mb-2 leading-snug">
                  {lang === "ru" ? tip.title_ru : tip.title_en}
                </h3>

                <p className="text-xs opacity-80 leading-relaxed mb-4">
                  {lang === "ru" ? tip.text_ru : tip.text_en}
                </p>
              </div>

              <div className="pt-3 border-t border-[#2D4A35]/10 font-mono text-[10px] text-[#2D4A35]/60 dark:text-[#F0EBE0]/60 block uppercase">
                {lang === "ru" ? `Опубликовано: ${tip.publishDate}` : `Posted: ${tip.publishDate}`}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Real-time Push Notifications alert center block */}
      <section className="bg-amber-100 dark:bg-[#1f090e] border-y border-amber-300/30 py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-1">
            <span className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-800 dark:text-amber-300">
              <Bell className="w-4 h-4 text-amber-600 animate-swing" />
              <span>{t[lang].pushTitle} (Система симуляции обновлений)</span>
            </span>
            <p className="text-xs opacity-75">
              Включите воспроизведение звука, чтобы протестировать сигнальное оповещение о новых заказах и письмах.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsNotificationSoundEnabled(!isNotificationSoundEnabled)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors ${isNotificationSoundEnabled ? 'bg-amber-800 text-amber-100' : 'bg-transparent border border-amber-800/20 text-[#2D4A35] dark:text-[#F0EBE0]'}`}
            >
              {isNotificationSoundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span>{isNotificationSoundEnabled ? "Звук Вкл." : "Без звука"}</span>
            </button>

            <button
              onClick={() => addPushNotification("Тестовое уведомление: Линейный бэкап базы данных выполнен успешно в реальном времени.")}
              className="bg-amber-800 hover:bg-amber-900 text-[#F0EBE0] px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all"
            >
              Тест алерта
            </button>
          </div>
        </div>

        {pushNotifications.length > 0 && (
          <div className="max-w-2xl mx-auto mt-4 px-4 space-y-2">
            {pushNotifications.map((n) => (
              <div key={n.id} className="bg-[#2D4A35] text-[#F0EBE0] p-3 rounded-xl text-xs flex justify-between items-center animate-fade-in shadow-md">
                <span className="font-medium">{n.text}</span>
                <span className="text-[10px] opacity-60 font-mono">{n.time}</span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 6. ADMIN PANEL PANEL OVERLAY (Drawer / Module inside page for seamless user experience) */}
      {isAdminPanelOpen && (
        <section className={`py-12 border-b border-[#2D4A35]/20 ${theme === "dark" ? "bg-[#122016]" : "bg-white/40"}`}>
          <div className="max-w-7xl mx-auto px-4">
            
            {/* Header control bar */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-[#2D4A35]/20 pb-4 mb-6 gap-4">
              <div>
                <h2 className="text-3xl font-serif font-black text-[#2D4A35] dark:text-white flex items-center gap-2">
                  <Sliders className="w-8 h-8 text-[#2D4A35] dark:text-[#F0EBE0]" />
                  <span>{t[lang].adminTitle}</span>
                </h2>
                <p className="text-xs opacity-75 mt-1 font-mono">
                  Role-Based Access Control Console • Persistent Database Administration
                </p>
              </div>

              {/* Role selection & mock 2FA authenticator toggle */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="bg-[#2D4A35]/10 rounded-xl p-1.5 flex gap-1">
                  {(["admin", "moderator", "manager"] as UserRole[]).map((role) => (
                    <button
                      key={role}
                      onClick={() => setCurrentRole(role)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold uppercase transition-all ${currentRole === role ? "bg-[#2D4A35] text-[#F0EBE0]" : "opacity-60 text-[#2D4A35]"}`}
                    >
                      {role === "admin" ? "Admin" : role === "moderator" ? "Moderator" : "Manager"}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2 border bg-[#2D4A35]/5 rounded-xl p-1.5 px-3">
                  <Lock className="w-3.5 h-3.5 text-amber-700" />
                  <span className="text-[10px] font-mono font-bold uppercase">{t[lang].adminAuth}:</span>
                  <button 
                    onClick={() => setIsTwoFactorVerified(!isTwoFactorVerified)}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${isTwoFactorVerified ? 'bg-green-600 text-white' : 'bg-red-500 text-white'}`}
                  >
                    {isTwoFactorVerified ? t[lang].adminAuthActive : "Inactive"}
                  </button>
                </div>

                <button 
                  onClick={() => setIsAdminPanelOpen(false)}
                  className="bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold"
                >
                  Закрыть x
                </button>
              </div>
            </div>

            {/* Check Authorization level constraints block */}
            {!isTwoFactorVerified ? (
              <div className="bg-amber-100 dark:bg-black/40 border border-amber-600 p-8 rounded-2xl text-center space-y-4 max-w-md mx-auto">
                <Lock className="w-12 h-12 text-amber-700 mx-auto" />
                <h3 className="text-xl font-serif font-black">Требуется двухфакторная аутентификация</h3>
                <p className="text-xs opacity-80">
                  Система безопасности ЭкоРост защищает персональные данные клиентов и реестр поставок. Введите проверочный код из вашего Authenticator приложения:
                </p>
                <div className="flex gap-2 max-w-xs mx-auto">
                  <input 
                    type="text" 
                    value={twoFactorToken}
                    onChange={(e) => setTwoFactorToken(e.target.value)}
                    placeholder="123456"
                    className="w-full bg-white border border-[#2D4A35]/20 rounded-lg p-2.5 text-center font-mono focus:outline-none"
                  />
                  <button 
                    onClick={() => {
                      if (twoFactorToken === "123456" || twoFactorToken.length > 2) {
                        setIsTwoFactorVerified(true);
                        addPushNotification("Администратор успешно прошел 2FA аутентификацию");
                      } else {
                        alert("Неверный код безопасности");
                      }
                    }}
                    className="bg-[#2D4A35] text-[#F0EBE0] px-4 py-2 rounded-lg text-xs font-bold"
                  >
                    Verify
                  </button>
                </div>
                <p className="text-[10px] opacity-60">Для демонстрационного прохождения введите любой 3-значный код.</p>
              </div>
            ) : (
              <div className="space-y-8">
                
                {/* SYSTEM ANALYTICS MONITORING KPI DASHBOARD */}
                <div className={`p-6 rounded-2xl border ${theme === "dark" ? "bg-[#1E3526] border-white/10" : "bg-white border-[#2D4A35]/10"}`}>
                  <h3 className="text-xl font-serif font-bold text-[#2D4A35] dark:text-white mb-4">
                    {t[lang].analyticsTitle}
                  </h3>

                  {analytics ? (
                    <div>
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
                        <div className="bg-[#2D4A35]/5 p-4 rounded-xl border border-[#2D4A35]/10 text-center">
                          <Eye className="w-5 h-5 mx-auto text-[#2D4A35] opacity-75 mb-1" />
                          <p className="text-xs opacity-75 uppercase text-[10px]">{t[lang].analyticsViews}</p>
                          <p className="text-2xl font-serif font-black">{analytics.currentStats.totalViews}</p>
                        </div>
                        <div className="bg-[#2D4A35]/5 p-4 rounded-xl border border-[#2D4A35]/10 text-center">
                          <ShoppingBag className="w-5 h-5 mx-auto text-[#2D4A35] opacity-75 mb-1" />
                          <p className="text-xs opacity-75 uppercase text-[10px]">{t[lang].analyticsOrders}</p>
                          <p className="text-2xl font-serif font-black">{analytics.currentStats.totalOrders}</p>
                        </div>
                        <div className="bg-[#2D4A35]/5 p-4 rounded-xl border border-[#2D4A35]/10 text-center">
                          <DollarSign className="w-5 h-5 mx-auto text-[#2D4A35] opacity-75 mb-1" />
                          <p className="text-xs opacity-75 uppercase text-[10px]">{t[lang].analyticsTotalRev}</p>
                          <p className="text-2xl font-serif font-black">{analytics.currentStats.totalRevenue} {t[lang].rub}</p>
                        </div>
                        <div className="bg-[#2D4A35]/5 p-4 rounded-xl border border-[#2D4A35]/10 text-center">
                          <TrendingUp className="w-5 h-5 mx-auto text-[#2D4A35] opacity-75 mb-1" />
                          <p className="text-xs opacity-75 uppercase text-[10px]">{lang === "ru" ? "Веб Конверсия" : "Web Conversion"}</p>
                          <p className="text-2xl font-serif font-black">{analytics.currentStats.conversionRate}%</p>
                        </div>
                      </div>

                      {/* Diagnostic interactive charts using Recharts library */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="h-64 bg-white/20 p-4 rounded-xl border border-dashed border-[#2D4A35]/20">
                          <p className="text-xs font-bold opacity-75 mb-2">{lang === "ru" ? "Динамика посещений и заказов (Daily)" : "Daily Traffic analytics"}</p>
                          <ResponsiveContainer width="100%" height="85%">
                            <AreaChart data={analytics.dailyViews}>
                              <defs>
                                <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#2D4A35" stopOpacity={0.8}/>
                                  <stop offset="95%" stopColor="#2D4A35" stopOpacity={0}/>
                                </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                              <XAxis dataKey="date" tick={{fontSize: 10}} />
                              <YAxis tick={{fontSize: 10}} />
                              <Tooltip />
                              <Area type="monotone" dataKey="views" name="Просмотры" stroke="#2D4A35" fillOpacity={1} fill="url(#viewsGrad)" />
                              <Area type="monotone" dataKey="orders" name="Заказы" stroke="#D2B48C" fill="#D2B48C" />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>

                        <div className="h-64 bg-white/20 p-4 rounded-xl border border-dashed border-[#2D4A35]/20">
                          <p className="text-xs font-bold opacity-75 mb-2">{lang === "ru" ? "Доли продаж по категориям товаров" : "Sales shares by category"}</p>
                          <ResponsiveContainer width="100%" height="85%">
                            <BarChart data={analytics.categorySales}>
                              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                              <XAxis dataKey="name" tick={{fontSize: 9}} />
                              <YAxis tick={{fontSize: 10}} />
                              <Tooltip />
                              <Bar dataKey="value" name="Доля %" fill="#2D4A35">
                                {analytics.categorySales.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={STATS_COLORS[index % STATS_COLORS.length]} />
                                ))}
                              </Bar>
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs opacity-60">Загрузка аналитических индикаторов...</p>
                  )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Database operations, Backups & Real-time Recovery systems */}
                  <div className={`p-6 rounded-2xl border ${theme === "dark" ? "bg-[#1E3526] border-white/10" : "bg-white border-[#2D4A35]/10"} space-y-4`}>
                    <div className="flex justify-between items-center pb-2 border-b">
                      <h4 className="font-serif font-black text-lg flex items-center gap-1.5">
                        <Database className="w-5 h-5" />
                        <span>{t[lang].adminBackups}</span>
                      </h4>
                      <span className="bg-[#2D4A35] text-[#F0EBE0] px-2 py-0.5 rounded text-[10px] font-mono">
                        REAL-TIME ACTIVE
                      </span>
                    </div>

                    <p className="text-xs opacity-80">
                      Система осуществляет непрерывные бэкапы при изменении товаров, контрактов или цен. Также вы можете принудительно инициировать моментальный слепок всей системы или восстановить предыдущее состояние.
                    </p>

                    <button
                      onClick={handleTriggerBackup}
                      className="bg-[#2D4A35] text-[#F0EBE0] hover:opacity-90 font-bold px-4 py-2.5 rounded-lg text-xs uppercase tracking-wide flex items-center gap-1.5 transition-all text-center"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{t[lang].backupNow}</span>
                    </button>

                    <div className="space-y-2 pt-2">
                      <h5 className="text-[10px] uppercase font-bold tracking-widest opacity-60">
                        {t[lang].backupsList}
                      </h5>

                      {backups.length === 0 ? (
                        <p className="text-xs opacity-50 italic">Снимков системы пока нет.</p>
                      ) : (
                        <div className="max-h-48 overflow-y-auto space-y-2 pr-1 font-mono text-xs">
                          {backups.map((bak) => (
                            <div key={bak.filename} className="bg-[#2D4A35]/5 p-2 rounded-lg flex justify-between items-center border">
                              <div>
                                <p className="font-bold text-[11px] truncate max-w-xs">{bak.filename}</p>
                                <p className="text-[9px] opacity-60">Размер: {(bak.size / 1024).toFixed(2)} KB • {new Date(bak.timestamp).toLocaleTimeString()}</p>
                              </div>
                              <button 
                                onClick={() => handleRestoreBackup(bak.filename)}
                                className="bg-[#2D4A35] text-[#F0EBE0] px-2 py-1 rounded text-[10px] font-sans font-bold hover:bg-opacity-95 text-xs inline-flex items-center gap-1"
                              >
                                <ListRestart className="w-3 h-3" />
                                <span>{lang === "ru" ? "Откатить" : "Restore"}</span>
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Settings Integration panel (Sales notifications & telegram bot credentials setup) */}
                  <div className={`p-6 rounded-2xl border ${theme === "dark" ? "bg-[#1E3526] border-white/10" : "bg-white border-[#2D4A35]/10"}`}>
                    <div className="pb-2 border-b mb-4">
                      <h4 className="font-serif font-black text-lg flex items-center gap-1.5">
                        <Settings className="w-5 h-5" />
                        <span>{t[lang].adminSettings}</span>
                      </h4>
                    </div>

                    <form onSubmit={handleSaveSettings} className="space-y-4">
                      <div>
                        <label className="text-[10px] uppercase font-bold opacity-60 block mb-1">
                          Email отдела продаж (для заказов клиентов)
                        </label>
                        <input 
                          type="email" 
                          value={settingsSalesEmail}
                          onChange={(e) => setSettingsSalesEmail(e.target.value)}
                          className="w-full bg-[#2D4A35]/5 border rounded-lg p-2.5 text-xs text-left"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] uppercase font-bold opacity-60 block mb-1">
                            Telegram Bot Token
                          </label>
                          <input 
                            type="password" 
                            value={settingsBotToken}
                            onChange={(e) => setSettingsBotToken(e.target.value)}
                            placeholder="712345678:ABC..."
                            className="w-full bg-[#2D4A35]/5 border rounded-lg p-2.5 text-xs"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] uppercase font-bold opacity-60 block mb-1">
                            Telegram Chat ID
                          </label>
                          <input 
                            type="text" 
                            value={settingsChatId}
                            onChange={(e) => setSettingsChatId(e.target.value)}
                            placeholder="98765432"
                            className="w-full bg-[#2D4A35]/5 border rounded-lg p-2.5 text-xs text-mono"
                          />
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button 
                          type="submit"
                          className="bg-[#2D4A35] text-[#F0EBE0] hover:opacity-95 font-bold px-4 py-2.5 rounded-lg text-xs uppercase tracking-wide flex-1 text-center"
                        >
                          Сохранить параметры
                        </button>
                        <button 
                          type="button"
                          onClick={handleTestTelegram}
                          className="border border-[#2D4A35] hover:bg-[#2D4A35] hover:text-white px-4 py-2.5 rounded-lg text-xs font-bold text-center block"
                        >
                          Сделать тестовую отправку в Telegram
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                {/* Database Data tables Management: Orders Registry (Secure decrypted view) */}
                <div className={`p-6 rounded-2xl border ${theme === "dark" ? "bg-[#1E3526] border-white/10" : "bg-white border-[#2D4A35]/10"}`}>
                  <h4 className="font-serif font-black text-lg mb-4 flex items-center gap-1.5">
                    <FileText className="w-5 h-5" />
                    <span>Поступившие заказы ({orders.length})</span>
                  </h4>

                  {orders.length === 0 ? (
                    <p className="text-xs opacity-60 italic py-4">Заказов в системе пока нет.</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-[#2D4A35]/20 opacity-60">
                            <th className="py-2">Заказ</th>
                            <th className="py-2">Клиент</th>
                            <th className="py-2">Элементы</th>
                            <th className="py-2">Итого</th>
                            <th className="py-2">Статус</th>
                            <th className="py-2">Время</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#2D4A35]/10">
                          {orders.map((o) => (
                            <tr key={o.id}>
                              <td className="py-3 font-bold font-mono text-[#2D4A35] dark:text-white">{o.id}</td>
                              <td className="py-3">
                                <p className="font-semibold">{o.clientName}</p>
                                <p className="opacity-60">{o.email} / {o.phone}</p>
                              </td>
                              <td className="py-3">
                                <ul className="list-disc list-inside">
                                  {o.items?.map((item, idx) => (
                                    <li key={idx} className="text-[11px] truncate">
                                      {item.productName} (x{item.quantity})
                                    </li>
                                  ))}
                                </ul>
                              </td>
                              <td className="py-3 font-serif font-bold text-base">{o.totalAmount} {t[lang].rub}</td>
                              <td className="py-3">
                                <select
                                  value={o.status}
                                  onChange={(e) => handleChangeOrderStatus(o.id, e.target.value)}
                                  className="bg-transparent border rounded p-1 text-[11px]"
                                >
                                  <option value="pending">Ожидает</option>
                                  <option value="processing">В обработке</option>
                                  <option value="shipped">Отгружен</option>
                                  <option value="completed">Выполнен</option>
                                  <option value="cancelled">Отменен</option>
                                </select>
                              </td>
                              <td className="py-3 font-mono text-[10px] opacity-60">
                                {new Date(o.createdAt).toLocaleString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                {/* Feedbacks message requests log */}
                <div className={`p-6 rounded-2xl border ${theme === "dark" ? "bg-[#1E3526] border-white/10" : "bg-white border-[#2D4A35]/10"}`}>
                  <h4 className="font-serif font-black text-lg mb-4 flex items-center gap-1.5 font-bold">
                    <MessageSquare className="w-5 h-5" />
                    <span>Заявки обратной связи ({feedbacks.length})</span>
                  </h4>

                  {feedbacks.length === 0 ? (
                    <p className="text-xs opacity-60 italic">Заявок нет.</p>
                  ) : (
                    <div className="space-y-4">
                      {feedbacks.map((f) => (
                        <div key={f.id} className="p-4 bg-[#2D4A35]/5 rounded-xl text-xs space-y-2 border">
                          <div className="flex justify-between">
                            <span className="font-bold">{f.name} ({f.email})</span>
                            <span className="font-mono text-[10px] opacity-60">{new Date(f.createdAt).toLocaleString()}</span>
                          </div>
                          <p className="italic opacity-85">"{f.message}"</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Content Management Form: CRUD Add New Products to DB Catalogue */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className={`p-6 rounded-2xl border ${theme === "dark" ? "bg-[#1E3526] border-white/10" : "bg-white border-[#2D4A35]/10"}`}>
                    <h4 className="font-serif font-bold text-lg mb-4">{t[lang].adminAddProduct}</h4>
                    {currentRole === "manager" ? (
                      <div className="text-xs text-red-500 bg-red-500/10 p-3 rounded-lg flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        <span>Менеджеры не имеют достаточных прав редактирования. Смените роль на Admin.</span>
                      </div>
                    ) : (
                      <form onSubmit={handleAddProduct} className="space-y-4 text-xs">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="font-bold block mb-1">Название (RU) *</label>
                            <input type="text" required value={newProdNameRu} onChange={(e) => setNewProdNameRu(e.target.value)} placeholder="АминАктив" className="w-full bg-[#2D4A35]/5 border rounded p-2" />
                          </div>
                          <div>
                            <label className="font-bold block mb-1">Name (EN) *</label>
                            <input type="text" required value={newProdNameEn} onChange={(e) => setNewProdNameEn(e.target.value)} placeholder="AminActive" className="w-full bg-[#2D4A35]/5 border rounded p-2" />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="font-bold block mb-1 font-mono">Цена (RUB) *</label>
                            <input type="number" required value={newProdPrice} onChange={(e) => setNewProdPrice(Number(e.target.value))} className="w-full bg-[#2D4A35]/5 border rounded p-2" />
                          </div>
                          <div>
                            <label className="font-bold block mb-1">Категория (RU)</label>
                            <input type="text" value={newProdCatRu} onChange={(e) => setNewProdCatRu(e.target.value)} className="w-full bg-[#2D4A35]/5 border rounded p-2" />
                          </div>
                        </div>

                        <div>
                          <label className="font-bold block mb-1">Ссылка на фото товара</label>
                          <input type="text" value={newProdImg} onChange={(e) => setNewProdImg(e.target.value)} placeholder="https://unsplash.com/..." className="w-full bg-[#2D4A35]/5 border rounded p-2" />
                        </div>

                        <div>
                          <label className="font-bold block mb-1">Описание (RU)</label>
                          <textarea rows={2} value={newProdDescRu} onChange={(e) => setNewProdDescRu(e.target.value)} className="w-full bg-[#2D4A35]/5 border rounded p-2" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="font-bold block mb-1">Состав (RU)</label>
                            <input type="text" value={newProdCompRu} onChange={(e) => setNewProdCompRu(e.target.value)} placeholder="Азот N-30%, Бор" className="w-full bg-[#2D4A35]/5 border rounded p-2" />
                          </div>
                          <div>
                            <label className="font-bold block mb-1">Расход / Способ (RU)</label>
                            <input type="text" value={newProdDosageRu} onChange={(e) => setNewProdDosageRu(e.target.value)} placeholder="10мл на 10л" className="w-full bg-[#2D4A35]/5 border rounded p-2" />
                          </div>
                        </div>

                        <button type="submit" className="w-full bg-[#2D4A35] text-[#F0EBE0] py-2.5 rounded font-serif font-bold hover:opacity-90">
                          {t[lang].adminAddProduct}
                        </button>
                      </form>
                    )}

                    {/* Delete and view actual list control */}
                    <div className="mt-6 border-t pt-4 space-y-2">
                      <p className="font-bold text-xs uppercase text-[#2D4A35]/60">Существующие продукты в базе (кликните для удаления):</p>
                      <div className="space-y-1 max-h-40 overflow-y-auto">
                        {products.map(p => (
                          <div key={p.id} className="flex justify-between items-center text-xs p-1.5 bg-[#2D4A35]/5 rounded">
                            <span>{p.name_ru} — <b>{p.price} руб.</b></span>
                            <button onClick={() => handleDeleteProduct(p.id)} className="text-red-500 hover:text-red-700">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Add helpful Tip Content Article */}
                  <div className={`p-6 rounded-2xl border ${theme === "dark" ? "bg-[#1E3526] border-white/10" : "bg-white border-[#2D4A35]/10"}`}>
                    <h4 className="font-serif font-bold text-lg mb-4">{t[lang].adminAddTip}</h4>
                    {currentRole === "manager" ? (
                      <p className="text-xs text-red-500">Менеджеры не имеют прав на публикацию статей.</p>
                    ) : (
                      <form onSubmit={handleAddTip} className="space-y-4 text-xs">
                        <div>
                          <label className="font-bold block mb-1 font-serif">Заголовок статьи (RU) *</label>
                          <input type="text" required value={newTipTitleRu} onChange={(e) => setNewTipTitleRu(e.target.value)} placeholder="Как ухаживать за яблоней" className="w-full bg-[#2D4A35]/5 border rounded p-2" />
                        </div>
                        <div>
                          <label className="font-bold block mb-1">Title (EN) *</label>
                          <input type="text" required value={newTipTitleEn} onChange={(e) => setNewTipTitleEn(e.target.value)} placeholder="Apple plant care" className="w-full bg-[#2D4A35]/5 border rounded p-2" />
                        </div>

                        <div>
                          <label className="font-bold block mb-1">Текст статьи (RU) *</label>
                          <textarea rows={4} required value={newTipTextRu} onChange={(e) => setNewTipTextRu(e.target.value)} className="w-full bg-[#2D4A35]/5 border rounded p-2" />
                        </div>
                        <div>
                          <label className="font-bold block mb-1">Content (EN) *</label>
                          <textarea rows={2} required value={newTipTextEn} onChange={(e) => setNewTipTextEn(e.target.value)} className="w-full bg-[#2D4A35]/5 border rounded p-2" />
                        </div>

                        <button type="submit" className="w-full bg-[#2D4A35] text-[#F0EBE0] py-2.5 rounded font-serif font-bold">
                          {t[lang].adminAddTip}
                        </button>
                      </form>
                    )}

                    <div className="mt-4 border-t pt-4">
                      <p className="text-xs uppercase font-bold opacity-60 mb-2">Статьи в базе:</p>
                      <div className="max-h-36 overflow-y-auto space-y-1">
                        {tips.map(t => (
                          <div key={t.id} className="flex justify-between text-xs p-1 bg-black/5 rounded">
                            <span className="truncate max-w-xs">{t.title_ru}</span>
                            <button onClick={() => handleDeleteTip(t.id)} className="text-red-500">删除</button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )}
          </div>
        </section>
      )}

      {/* 7. DEV & STAKEHOLDERS API DOCUMENTATION DRAWER (Full Spec for third party clients) */}
      {isApiDocOpen && (
        <section className="bg-black text-amber-100 p-8 font-mono text-xs border-t-2 border-amber-400">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex justify-between items-center border-b border-amber-400/20 pb-4">
              <div>
                <h3 className="text-xl font-bold flex items-center gap-2 text-white font-mono">
                  <Terminal className="w-6 h-6 text-amber-400" />
                  <span>{t[lang].apiDocTitle}</span>
                </h3>
                <p className="text-[10px] opacity-75">
                  ЭкоРост RESTful JSON API v1 • Base Path: {window.location.origin}/api
                </p>
              </div>
              <button 
                onClick={() => setIsApiDocOpen(false)} 
                className="bg-amber-400 text-black px-3 py-1 font-bold rounded"
              >
                Close Docs x
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-zinc-900 p-4 rounded border border-amber-400/10">
                <p className="text-white font-bold text-sm mb-2">🚀 System Architecture Summary</p>
                <p className="opacity-80">
                  All Client PII (emails, names, phones) is encrypted at-rest using AES-256 stateful wrappers before file commits. Integrated with real-time Telegram event loop bot.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#111] p-4 rounded border">
                  <span className="bg-green-700 text-white px-2 py-0.5 rounded text-[10px]">GET</span>
                  <span className="font-bold text-amber-200 ml-2">/api/products</span>
                  <p className="opacity-75 mt-2">Returns active catalog collection with dosage & composition specs.</p>
                </div>

                <div className="bg-[#111] p-4 rounded border">
                  <span className="bg-blue-700 text-white px-2 py-0.5 rounded text-[10px]">POST</span>
                  <span className="font-bold text-amber-200 ml-2">/api/orders</span>
                  <p className="opacity-75 mt-2">Registers client fertilizer order, triggers Telegram notify, and encrypts customer info.</p>
                </div>

                <div className="bg-[#111] p-4 rounded border">
                  <span className="bg-blue-700 text-white px-2 py-0.5 rounded text-[10px]">POST</span>
                  <span className="font-bold text-amber-200 ml-2">/api/feedback</span>
                  <p className="opacity-75 mt-2">Receives partnership letters, sends sales alerts, keeps records encrypted.</p>
                </div>

                <div className="bg-[#111] p-4 rounded border">
                  <span className="bg-purple-700 text-white px-2 py-0.5 rounded text-[10px]">POST</span>
                  <span className="font-bold text-amber-200 ml-2">/api/backups/restore</span>
                  <p className="opacity-75 mt-2">Restores main tables back from pre-defined JSON systems database states.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Aesthetic Footer Bar */}
      <footer className={`py-12 border-t ${theme === "dark" ? "bg-[#122016]/70 border-[#2D4A35]/40" : "bg-white/40 border-[#2D4A35]/10"}`}>
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="font-serif font-black text-xl text-[#2D4A35] dark:text-white uppercase">
              {t[lang].brand}
            </h4>
            <p className="text-xs opacity-60">
              © 2026 НПО «ЭкоРост». Все права защищены.
            </p>
            <p className="text-[10px] font-mono opacity-50">
              Coffee Bean & Almond Styled • Real-time DB Backups • SECURE AES-256 Storage
            </p>
          </div>

          <div className="flex flex-wrap justify-between gap-6 text-xs font-semibold">
            <a href="#about" className="hover:underline">{t[lang].navAbout}</a>
            <a href="#products" className="hover:underline">{t[lang].navProducts}</a>
            <a href="#catalog" className="hover:underline">{t[lang].navCatalog}</a>
            <a href="#partners" className="hover:underline">{t[lang].navPartners}</a>
            <a href="#tips" className="hover:underline">{t[lang].navTips}</a>
          </div>

          <div className="text-right text-xs space-y-1">
            <p className="flex items-center gap-1 opacity-75">
              <Mail className="w-3.5 h-3.5" />
              <span>sales@ecorost-fertilizer.ru</span>
            </p>
            <p className="flex items-center gap-1 opacity-75">
              <Phone className="w-3.5 h-3.5" />
              <span>+7 (800) 555-32-14</span>
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
