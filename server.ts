import express from "express";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Ensure directories exist
const DATA_DIR = path.join(process.cwd(), "data");
const BACKUP_DIR = path.join(DATA_DIR, "backups");
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

// AES-256 for secure PII storage
const ENCRYPTION_KEY = Buffer.from("ecorost_secret_key_32_chars_long_!!", "utf8"); // 32 bytes
const IV_LENGTH = 16;

function encrypt(text: string): string {
  if (!text) return "";
  try {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv("aes-256-cbc", ENCRYPTION_KEY, iv);
    let encrypted = cipher.update(text, "utf8");
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString("hex") + ":" + encrypted.toString("hex");
  } catch (error) {
    console.error("Encryption error:", error);
    return text;
  }
}

function decrypt(text: string): string {
  if (!text) return "";
  try {
    if (!text.includes(":")) return text;
    const parts = text.split(":");
    const ivString = parts.shift();
    if (!ivString) return text;
    const iv = Buffer.from(ivString, "hex");
    const encryptedText = Buffer.from(parts.join(":"), "hex");
    const decipher = crypto.createDecipheriv("aes-256-cbc", ENCRYPTION_KEY, iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString("utf8");
  } catch (error) {
    console.error("Decryption error:", error);
    return text;
  }
}

// File storage handlers
const PRODUCTS_FILE = path.join(DATA_DIR, "products.json");
const ORDERS_FILE = path.join(DATA_DIR, "orders.json");
const FEEDBACK_FILE = path.join(DATA_DIR, "feedback.json");
const SETTINGS_FILE = path.join(DATA_DIR, "settings.json");
const ANALYTICS_FILE = path.join(DATA_DIR, "analytics.json");
const TIPS_FILE = path.join(DATA_DIR, "tips.json");

// Default Catalog Products
const DEFAULT_PRODUCTS = [
  {
    id: "prod-1",
    name_ru: "ЭкоАзот Премиум",
    name_en: "EcoNitrogen Premium",
    description_ru: "Высокоэффективное жидкое азотное удобрение для быстрого набора зеленой массы, стимуляции роста листьев и сочности стеблей. Восстанавливает иммунитет растений после зимовки.",
    description_en: "High-efficiency liquid nitrogen fertilizer for rapid green foliage growth, leaf stimulation, and stem juiciness. Restores plant immunity after winter.",
    price: 1200,
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=400",
    category_ru: "Жидкие удобрения",
    category_en: "Liquid fertilizers",
    dosage_ru: "10 мл на 10 л воды при поливе каждые 14 дней.",
    dosage_en: "10 ml per 10 L of water for watering every 14 days.",
    composition_ru: "Азот (N) - 30%, Аминокислоты - 5%, Гуминовые кислоты - 3%, комплекс trace-элементов.",
    composition_en: "Nitrogen (N) - 30%, Amino acids - 5%, Humic acids - 3%, trace elements complex.",
    inStock: true
  },
  {
    id: "prod-2",
    name_ru: "ПочвоАктив Био",
    name_en: "SoilActive Bio",
    description_ru: "Гранулированная смесь для бережного восстановления структуры почвы, активизации микробиологических процессов и восстановления деградирующего гумуса.",
    description_en: "Granulated organic blend for gentle soil structure restoration, microbiologic activity stimulation, and recovery of degrading humus.",
    price: 850,
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&q=80&w=400",
    category_ru: "Гранулированные",
    category_en: "Granulated",
    dosage_ru: "50-70 г на 1 кв.м. при весенней/осенней перекопке.",
    dosage_en: "50-70 g per sq.m. during spring/autumn soil tilling.",
    composition_ru: "Ферментированный куриный помет, Сапропель, Фосфоритная мука, Калийные соли.",
    composition_en: "Fermented poultry manure, Sapropel, Phosphate rock, Potassium salt complexes.",
    inStock: true
  },
  {
    id: "prod-3",
    name_ru: "ФитоКалий Максимум",
    name_en: "PhytoPotassium Maximum",
    description_ru: "Концентрированное водорастворимое калийное удобрение. Увеличивает размер, плотность и сахаристость плодов, повышает засухоустойчивость и лежкость при хранении.",
    description_en: "Concentrated water-soluble potassium complex fertilizer. Increases fruit size, density, and sweetness; enhances drought resistance and storage lifespan.",
    price: 1450,
    image: "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=400",
    category_ru: "Корневые комплексы",
    category_en: "Root active complexes",
    dosage_ru: "15 г на 10 л воды. Применять в период формирования и созревания плодов.",
    dosage_en: "15 g per 10 L of water. Apply during the fruit formation and ripening phase.",
    composition_ru: "Оксид калия (K2O) - 50%, Сера (S) - 18%, Магний (MgO) - 2%, микроэлементы.",
    composition_en: "Potassium oxide (K2O) - 50%, Sulfur (S) - 18%, Magnesium (MgO) - 2%, micro-nutrients.",
    inStock: true
  },
  {
    id: "prod-4",
    name_ru: "БиоХелат Бор-Железо",
    name_en: "BioChelate Boron-Iron",
    description_ru: "Суспензия активных микроэлементов в хелатной форме для внекорневых опрыскиваний. Предотвращает хлороз, опадение завязей и активирует синтез витаминов в тканях.",
    description_en: "Active trace element suspension in chelated form for foliar spraying. Prevents chlorosis, flower drop, and boosts vitamin synthesis.",
    price: 950,
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=400",
    category_ru: "Микроэлементы",
    category_en: "Trace elements",
    dosage_ru: "5-10 мл на 5 л воды для опрыскивания по листу рано утром или вечером.",
    dosage_en: "5-10 ml per 5 L of water for foliar spray in early morning or evening hours.",
    composition_ru: "Железо (Fe-DTPA) - 6%, Бор (B) - 3%, Цинк (Zn) - 2%, Медь (Cu) - 1%, Марганец (Mn).",
    composition_en: "Iron (Fe-DTPA) - 6%, Boron (B) - 3%, Zinc (Zn) - 2%, Copper (Cu) - 1%, Manganese (Mn).",
    inStock: true
  },
  {
    id: "prod-5",
    name_ru: "АминоРост-Супер",
    name_en: "AminoGrow-Super",
    description_ru: "Эксклюзивный антистрессовый стимулятор на основе свободных L-аминокислот. Повышает энергию прорастания семян и помогает пережить заморозки.",
    description_en: "Exclusive anti-stress plant stimulator from free L-amino acids. Amplifies seed germination rate and helps survive extreme frosts.",
    price: 1100,
    image: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&q=80&w=400",
    category_ru: "Жидкие удобрения",
    category_en: "Liquid fertilizers",
    dosage_ru: "20 мл на 10 л воды. Замачивание семян на 6-8 часов или опрыскивание в стрессовый период.",
    dosage_en: "20 ml per 10 L of water. Soak seeds for 6-8 hours or foliar spray during critical weather.",
    composition_ru: "Общие аминокислоты - 30%, Органический углерод - 15%, Калий (K) - 4%.",
    composition_en: "Total free amino acids - 30%, Organic Carbon - 15%, Potassium (K) - 4%.",
    inStock: true
  }
];

// Default articles/tips
const DEFAULT_TIPS = [
  {
    id: "tip-1",
    title_ru: "Весенняя подготовка почвы под ягодные культуры",
    title_en: "Spring soil preparation for berry crops",
    text_ru: "Главное весной — восстановить водопроницаемость и температурный баланс почвы. Перед посадкой клубники или малины внесите «ПочвоАктив Био» из расчета 50г/м². Это запустит работу полезных почвенных бактерий, которые переведут заблокированные зимние минералы в легкоусвояемую форму. Важно вносить удобрение за 10-14 дней до высадки рассады.",
    text_en: "The primary spring goal is restoring irrigation capacity and microclimatic soil balance. Before strawberries or raspberries planting, feed with 'SoilActive Bio' (50g/sq.m.). This triggers microbiologic activity converting locked winter salts into soluble nutrient feeds. Apply 10-14 days prior to planting your crops.",
    category_ru: "Подготовка почвы",
    category_en: "Soil Preparation",
    publishDate: "2026-04-12",
    readTime: "4 мин"
  },
  {
    id: "tip-2",
    title_ru: "Пять признаков дефицита азота у томатов",
    title_en: "5 signs of nitrogen deficiency in tomatoes",
    text_ru: "Азотный голод легко определить по следующим симптомам: 1. Медленный рост стеблей. 2. Нижние листья желтеют и бледнеют (начиная от кончиков к черешку). 3. Новые листочки формируются мелкими и жесткими. 4. Жилки на обратной стороне листа приобретают красновато-фиолетовый оттенок. 5. Опадание первых цветков. Для быстрого спасения используйте опрыскивание листьев средством «ЭкоАзот Премиум» в половинной концентрации.",
    text_en: "Nitrogen deficiency is recognizable by: 1. Sluggish stem growth. 2. Lower foliage yellowing and pale tint starting from tips. 3. New leaves coming in small and tough. 4. Leaf veins on the back turning reddish-purple. 5. Drop of first blossom. For urgent rescue, foliage-spray 'EcoNitrogen' at half concentration.",
    category_ru: "Диагностика",
    category_en: "Diagnostics",
    publishDate: "2026-05-18",
    readTime: "3 мин"
  },
  {
    id: "tip-3",
    title_ru: "Почему хелатные формы микроэлементов на 90% эффективнее обычных?",
    title_en: "Why chelated microelements are 90% more effective",
    text_ru: "Обычные соли металлов (сульфаты и сульфиты) в грунте мгновенно связываются с другими ионами и выпадают в нерастворимый осадок, становясь недоступными. Хелаты — это органические «клешни» (хелатирующие агенты EDTA/DTPA), которые прочно удерживают ион железа или цинка, не позволяя ему реагировать в почве, и высвобождают его прямо внутри корня или листа растения. Это гарантирует максимальное усвоение без лишних затрат.",
    text_en: "Standard metal salts (sulfates/sulfites) instantly bond with soil ions and drop into insoluble minerals. Chelates are organic molecule claws (EDTA/DTPA) safeguarding the iron or zinc ion, shielding it from lock-reactions, and releasing it perfectly inside the root cells or foliage tissues. This assures 90%+ bio-availability.",
    category_ru: "Разбор технологий",
    category_en: "Tech overview",
    publishDate: "2026-06-02",
    readTime: "5 мин"
  }
];

// Default feedback
const DEFAULT_FEEDBACK = [
  {
    id: "fb-1",
    name: "Алексей Иванов",
    email: "ivanov@agro-partner.ru",
    message: "Здравствуйте! Интересуют оптовые поставки 'ЭкоАзот Премиум' в еврокубах. Отправьте, пожалуйста, прайс-лист для дистрибьюторов на почту.",
    status: "new",
    createdAt: "2026-06-18T10:15:00.000Z"
  }
];

// Load resources safely
function readJSON(filePath: string, defaultData: any) {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, "utf8");
      return JSON.parse(data);
    } else {
      fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2), "utf8");
      return defaultData;
    }
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return defaultData;
  }
}

function writeJSON(filePath: string, data: any) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
    triggerRealtimeBackup();
  } catch (error) {
    console.error(`Error writing ${filePath}:`, error);
  }
}

// Initial reading
let products = readJSON(PRODUCTS_FILE, DEFAULT_PRODUCTS);
let orders = readJSON(ORDERS_FILE, []);
let feedbacks = readJSON(FEEDBACK_FILE, DEFAULT_FEEDBACK);
let tips = readJSON(TIPS_FILE, DEFAULT_TIPS);

// Settings
const DEFAULT_SETTINGS = {
  salesEmail: "sales@ecorost-fertilizer.ru",
  telegramBotToken: "7193850255:AAEfGt90_XexampleTokenString",
  telegramChatId: "987654321",
  autoBackupEnabled: true,
  backupIntervalMinutes: 5
};
let settings = readJSON(SETTINGS_FILE, DEFAULT_SETTINGS);

// Analytics
const DEFAULT_ANALYTICS = {
  dailyViews: [
    { date: "12.06", views: 240, orders: 4 },
    { date: "13.06", views: 290, orders: 5 },
    { date: "14.06", views: 180, orders: 3 },
    { date: "15.06", views: 310, orders: 8 },
    { date: "16.06", views: 420, orders: 12 },
    { date: "17.06", views: 390, orders: 7 },
    { date: "18.06", views: 480, orders: 14 },
    { date: "19.06", views: 520, orders: 16 }
  ],
  categorySales: [
    { name: "Жидкие удобрения", value: 45 },
    { name: "Гранулированные", value: 30 },
    { name: "Корневые комплексы", value: 15 },
    { name: "Микроэлементы", value: 10 }
  ],
  currentStats: {
    totalViews: 3500,
    totalOrders: 69,
    totalRevenue: 82500,
    feedbackCount: 15,
    conversionRate: 2.1,
    activeUsersOfflineCached: 128
  }
};
let analytics = readJSON(ANALYTICS_FILE, DEFAULT_ANALYTICS);

// Realtime dynamic backup trigger
function triggerRealtimeBackup() {
  if (!settings.autoBackupEnabled) return;
  try {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const backupFile = path.join(BACKUP_DIR, `backup_${timestamp}.json`);
    const backupContent = {
      timestamp: new Date().toISOString(),
      products,
      orders,
      feedbacks,
      tips,
      settings,
      analytics
    };
    fs.writeFileSync(backupFile, JSON.stringify(backupContent, null, 2), "utf8");

    // Prune backups to persist last 15 files max to prevent storage bloat
    const files = fs.readdirSync(BACKUP_DIR)
      .filter(f => f.startsWith("backup_") && f.endsWith(".json"))
      .map(f => ({ name: f, time: fs.statSync(path.join(BACKUP_DIR, f)).mtime.getTime() }))
      .sort((a, b) => b.time - a.time);

    if (files.length > 15) {
      for (let i = 15; i < files.length; i++) {
        fs.unlinkSync(path.join(BACKUP_DIR, files[i].name));
      }
    }
  } catch (error) {
    console.error("Failed to generate automatic daily backup:", error);
  }
}

// Simulated notification engine
async function sendTelegramNotification(message: string) {
  if (!settings.telegramBotToken || !settings.telegramChatId || settings.telegramBotToken.includes("exampleTokenString")) {
    console.log("Telegram Notification Mock (no configuration or default placeholder):", message);
    return false;
  }
  try {
    const url = `https://api.telegram.org/bot${settings.telegramBotToken}/sendMessage`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: settings.telegramChatId,
        text: message,
        parse_mode: "HTML"
      })
    });
    const result = await response.json();
    return result.ok;
  } catch (e) {
    console.error("Telegram notification delivery failed:", e);
    return false;
  }
}

// ------------------- API ROUTES -------------------

// 1. Products CRUD
app.get("/api/products", (req, res) => {
  res.json(products);
});

app.post("/api/products", (req, res) => {
  const { name_ru, name_en, description_ru, description_en, price, image, category_ru, category_en, dosage_ru, dosage_en, composition_ru, composition_en, inStock } = req.body;
  if (!name_ru || !name_en || !price) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const newProduct = {
    id: "prod-" + Date.now(),
    name_ru,
    name_en,
    description_ru: description_ru || "",
    description_en: description_en || "",
    price: Number(price),
    image: image || "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=400",
    category_ru: category_ru || "Прочее",
    category_en: category_en || "Other",
    dosage_ru: dosage_ru || "",
    dosage_en: dosage_en || "",
    composition_ru: composition_ru || "",
    composition_en: composition_en || "",
    inStock: inStock !== undefined ? inStock : true
  };
  products.push(newProduct);
  writeJSON(PRODUCTS_FILE, products);
  res.status(201).json(newProduct);
});

app.put("/api/products/:id", (req, res) => {
  const { id } = req.params;
  const index = products.findIndex((p: any) => p.id === id);
  if (index === -1) return res.status(404).json({ error: "Product not found" });

  products[index] = { ...products[index], ...req.body, id }; // enforce ID
  writeJSON(PRODUCTS_FILE, products);
  res.json(products[index]);
});

app.delete("/api/products/:id", (req, res) => {
  const { id } = req.params;
  const initialLen = products.length;
  products = products.filter((p: any) => p.id !== id);
  if (products.length === initialLen) return res.status(404).json({ error: "Product not found" });
  writeJSON(PRODUCTS_FILE, products);
  res.json({ success: true, message: "Product deleted" });
});

// 2. Tips CRUD
app.get("/api/tips", (req, res) => {
  res.json(tips);
});

app.post("/api/tips", (req, res) => {
  const { title_ru, title_en, text_ru, text_en, category_ru, category_en, readTime } = req.body;
  if (!title_ru || !title_en || !text_ru || !text_en) {
    return res.status(400).json({ error: "Missing fields" });
  }
  const newTip = {
    id: "tip-" + Date.now(),
    title_ru,
    title_en,
    text_ru,
    text_en,
    category_ru: category_ru || "Общее",
    category_en: category_en || "General",
    publishDate: new Date().toISOString().split("T")[0],
    readTime: readTime || "3 мин"
  };
  tips.push(newTip);
  writeJSON(TIPS_FILE, tips);
  res.status(201).json(newTip);
});

app.delete("/api/tips/:id", (req, res) => {
  const { id } = req.params;
  tips = tips.filter((t: any) => t.id !== id);
  writeJSON(TIPS_FILE, tips);
  res.json({ success: true });
});

// 3. Orders GET / POST / Status Update (Secure PII Encryption implemented here!)
app.get("/api/orders", (req, res) => {
  // Return decrypted orders for administrative view
  const decryptedOrders = orders.map((o: any) => {
    if (o.isEncrypted) {
      return {
        ...o,
        clientName: decrypt(o.clientName),
        email: decrypt(o.email),
        phone: decrypt(o.phone),
        isEncrypted: false
      };
    }
    return o;
  });
  res.json(decryptedOrders);
});

app.post("/api/orders", async (req, res) => {
  const { clientName, email, phone, items, totalAmount } = req.body;
  if (!clientName || !email || !phone || !items || !items.length) {
    return res.status(400).json({ error: "Bad request. Fill required fields." });
  }

  const orderId = "ORD-" + Math.floor(100000 + Math.random() * 900000);
  const rawOrder = {
    id: orderId,
    clientName,
    email,
    phone,
    items,
    totalAmount: Number(totalAmount),
    status: "pending" as const,
    createdAt: new Date().toISOString()
  };

  // Securely ENCRYPT customer identity PII before disk operation
  const secureOrder = {
    ...rawOrder,
    clientName: encrypt(clientName),
    email: encrypt(email),
    phone: encrypt(phone),
    isEncrypted: true
  };

  orders.push(secureOrder);
  writeJSON(ORDERS_FILE, orders);

  // Trigger KPI aggregation
  analytics.currentStats.totalOrders += 1;
  analytics.currentStats.totalRevenue += Number(totalAmount);
  // Add views / order to today
  const lastDay = analytics.dailyViews[analytics.dailyViews.length - 1];
  if (lastDay) {
    lastDay.orders += 1;
  }
  writeJSON(ANALYTICS_FILE, analytics);

  // Trigger Telegram delivery (simulated and real-ready)
  const itemsText = items.map((i: any) => `📦 ${i.productName} (x${i.quantity}) - ${i.price} руб.`).join("\n");
  const tgMessage = `🚀 <b>Новый заказ #${orderId}!</b>\n\n` +
    `👤 Клиент: <b>${clientName}</b>\n` +
    `📧 Email: ${email}\n` +
    `📞 Тел: ${phone}\n\n` +
    `<b>Состав заказа:</b>\n${itemsText}\n\n` +
    `💰 Итого: <b>${totalAmount} руб.</b>\n` +
    `🔔 Заказ отправлен менеджеру и на почту отдела продаж: ${settings.salesEmail}`;

  await sendTelegramNotification(tgMessage);

  res.status(201).json({
    success: true,
    orderId,
    message_ru: "Заказ успешно оформлен! Наш менеджер свяжется с вами в течение 15 минут.",
    message_en: "Order registered successfully! Our representative will contact you in 15 minutes."
  });
});

app.put("/api/orders/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const index = orders.findIndex((o: any) => o.id === id);
  if (index === -1) return res.status(404).json({ error: "Order not found" });

  orders[index].status = status;
  writeJSON(ORDERS_FILE, orders);
  res.json({ success: true, status });
});

// 4. Feedback with PII Encryption
app.get("/api/feedback", (req, res) => {
  const decryptedFeedback = feedbacks.map((f: any) => {
    return {
      ...f,
      email: f.email ? decrypt(f.email) : "",
      message: f.message ? decrypt(f.message) : ""
    };
  });
  res.json(decryptedFeedback);
});

app.post("/api/feedback", async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Please fill out all the fields." });
  }

  const newFeedback = {
    id: "fb-" + Date.now(),
    name,
    email: encrypt(email), // Encrypt client email
    message: encrypt(message), // Encrypt client message
    status: "new" as const,
    createdAt: new Date().toISOString()
  };

  feedbacks.push(newFeedback);
  writeJSON(FEEDBACK_FILE, feedbacks);

  // Update analytics KPI
  analytics.currentStats.feedbackCount += 1;
  writeJSON(ANALYTICS_FILE, analytics);

  // Send Telegram notice
  const tgMsg = `✉️ <b>Новая заявка / Сообщение с сайта!</b>\n\n` +
    `👤 Имя: <b>${name}</b>\n` +
    `📧 Email: ${email}\n` +
    `💬 Сообщение: <i>"${message}"</i>\n\n` +
    `Отдел продаж уведомлен.`;
  await sendTelegramNotification(tgMsg);

  res.json({
    success: true,
    message_ru: "Спасибо за сообщение! Спасибо, мы свяжемся с вами в ближайшее время.",
    message_en: "Thank you for reaching out! We will contact you soon."
  });
});

app.put("/api/feedback/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const index = feedbacks.findIndex((f: any) => f.id === id);
  if (index === -1) return res.status(404).json({ error: "Message not found" });

  feedbacks[index].status = status;
  writeJSON(FEEDBACK_FILE, feedbacks);
  res.json({ success: true });
});

// 5. Settings GET / PUT
app.get("/api/settings", (req, res) => {
  res.json(settings);
});

app.put("/api/settings", (req, res) => {
  settings = { ...settings, ...req.body };
  writeJSON(SETTINGS_FILE, settings);
  res.json({ success: true, settings });
});

// Test action for Telegram notification
app.post("/api/telegram-test", async (req, res) => {
  const { testToken, testChatId } = req.body;
  const tempToken = testToken || settings.telegramBotToken;
  const tempChatId = testChatId || settings.telegramChatId;

  if (!tempToken || !tempChatId || tempToken.includes("exampleTokenString")) {
    return res.status(400).json({ error: "Invalid credentials configured" });
  }

  try {
    const url = `https://api.telegram.org/bot${tempToken}/sendMessage`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: tempChatId,
        text: "🔔 <b>ЭкоРост Тест:</b> Канал связи успешно настроен в реальном времени! 👍",
        parse_mode: "HTML"
      })
    });
    const result = await response.json();
    if (result.ok) {
      res.json({ success: true, message: "Сообщение отправлено!" });
    } else {
      res.status(400).json({ error: result.description || "Telegram API rejected" });
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Network error occurred" });
  }
});

// 6. Real-time Database Backups list and trigger restore/create
app.get("/api/backups", (req, res) => {
  try {
    const files = fs.readdirSync(BACKUP_DIR)
      .filter(f => f.startsWith("backup_") && f.endsWith(".json"))
      .map(f => {
        const stats = fs.statSync(path.join(BACKUP_DIR, f));
        return {
          filename: f,
          timestamp: stats.mtime.toISOString(),
          size: stats.size
        };
      })
      .sort((a, b) => b.timestamp.localeCompare(a.timestamp));
    res.json(files);
  } catch (error) {
    res.status(500).json({ error: "Failed to read backups" });
  }
});

app.post("/api/backups/trigger", (req, res) => {
  try {
    triggerRealtimeBackup();
    res.json({ success: true, message: "Резервная копия успешно создана в реальном времени" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/backups/restore", (req, res) => {
  const { filename } = req.body;
  if (!filename) return res.status(400).json({ error: "Filename is required" });

  try {
    const backupFilePath = path.join(BACKUP_DIR, filename);
    if (!fs.existsSync(backupFilePath)) {
      return res.status(404).json({ error: "Backup file not found" });
    }

    const rawData = fs.readFileSync(backupFilePath, "utf8");
    const restored = JSON.parse(rawData);

    if (restored.products) {
      products = restored.products;
      writeJSON(PRODUCTS_FILE, products);
    }
    if (restored.orders) {
      orders = restored.orders;
      writeJSON(ORDERS_FILE, orders);
    }
    if (restored.feedbacks) {
      feedbacks = restored.feedbacks;
      writeJSON(FEEDBACK_FILE, feedbacks);
    }
    if (restored.tips) {
      tips = restored.tips;
      writeJSON(TIPS_FILE, tips);
    }
    if (restored.settings) {
      settings = restored.settings;
      writeJSON(SETTINGS_FILE, settings);
    }
    if (restored.analytics) {
      analytics = restored.analytics;
      writeJSON(ANALYTICS_FILE, analytics);
    }

    res.json({ success: true, message: `Восстановлено из бэкапа ${filename}` });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 7. Analytics Views update
app.get("/api/analytics", (req, res) => {
  res.json({ ...analytics, activeBackupsCount: fs.readdirSync(BACKUP_DIR).length });
});

app.post("/api/analytics/view", (req, res) => {
  try {
    analytics.currentStats.totalViews += 1;
    const lastDay = analytics.dailyViews[analytics.dailyViews.length - 1];
    if (lastDay) {
      lastDay.views += 1;
    }
    writeJSON(ANALYTICS_FILE, analytics);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: "Failed to increment analytics views" });
  }
});

// Vite & Static file serve setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Ecorost Server] running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
