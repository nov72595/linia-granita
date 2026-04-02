import 'dotenv/config';
import { PrismaClient } from '../app/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { faker } from '@faker-js/faker';

faker.seed(42);

const adapter = new PrismaPg({
  connectionString: process.env.DIRECT_URL || process.env.DATABASE_URL!,
  ssl: { rejectUnauthorized: false },
});
const prisma = new PrismaClient({ adapter });

// ─── Constants ──────────────────────────────────────────

const OBLASTS: Record<string, string[]> = {
  'Минская': ['Минский', 'Борисовский', 'Молодечненский', 'Солигорский', 'Слуцкий', 'Смолевичский'],
  'Брестская': ['Брестский', 'Барановичский', 'Пинский', 'Кобринский'],
  'Витебская': ['Витебский', 'Оршанский', 'Полоцкий', 'Новополоцкий'],
  'Гомельская': ['Гомельский', 'Мозырский', 'Жлобинский', 'Речицкий'],
  'Гродненская': ['Гродненский', 'Лидский', 'Слонимский', 'Волковысский'],
  'Могилевская': ['Могилевский', 'Бобруйский', 'Осиповичский', 'Горецкий'],
};

const OBLAST_KEYS = Object.keys(OBLASTS);

function randomLocation() {
  const oblast = faker.helpers.arrayElement(OBLAST_KEYS);
  const raion = faker.helpers.arrayElement(OBLASTS[oblast]);
  return { oblast, raion };
}

function belarusPhone(): string {
  const code = faker.helpers.arrayElement(['29', '33', '44', '25']);
  return `+375${code}${faker.string.numeric(7)}`;
}

function ruDate(d: Date): string {
  return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
}

function pastDate(daysBack = 180): Date {
  return faker.date.recent({ days: daysBack });
}

// ─── Image pools (stable Unsplash photo IDs) ───────────

const CAR_IMAGES = [
  'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1533473359331-2f218e7988bf?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1616422285623-13ff0162193c?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1525609004556-c46c6c5104b8?w=800&h=600&fit=crop',
];

const TRUCK_IMAGES = [
  'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1586191582056-30bf5b1c33c3?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1562674022-3df7b9e8c3e7?w=800&h=600&fit=crop',
];

const CATEGORY_IMAGES: Record<string, string[]> = {
  realty: [
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
  ],
  computers: [
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=800&h=600&fit=crop',
  ],
  phones: [
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=800&h=600&fit=crop',
  ],
  electronics: [
    'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&h=600&fit=crop',
  ],
  appliances: [
    'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=800&h=600&fit=crop',
  ],
  furniture: [
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&h=600&fit=crop',
  ],
  sport: [
    'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=600&fit=crop',
  ],
  kids: [
    'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=800&h=600&fit=crop',
  ],
  animals: [
    'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&h=600&fit=crop',
  ],
};

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop';

function imageForCategory(cat: string): string {
  const pool = CATEGORY_IMAGES[cat];
  if (pool?.length) return faker.helpers.arrayElement(pool);
  return FALLBACK_IMG;
}

// ─── Business company templates ─────────────────────────

const BUSINESS_TEMPLATES: { prefix: string; category: string; suffix: string }[] = [
  { prefix: 'АвтоХаус', category: 'auto', suffix: '' },
  { prefix: 'АвтоМир', category: 'auto', suffix: '' },
  { prefix: 'АвтоТрейд', category: 'auto', suffix: '' },
  { prefix: 'АвтоСервис', category: 'auto', suffix: '' },
  { prefix: 'МоторЛэнд', category: 'auto', suffix: '' },
  { prefix: 'Электросила', category: 'electronics', suffix: '' },
  { prefix: 'ТехноПарк', category: 'electronics', suffix: '' },
  { prefix: 'Техномаркет', category: 'appliances', suffix: '' },
  { prefix: 'Домотехника', category: 'appliances', suffix: '' },
  { prefix: 'Мебельград', category: 'furniture', suffix: '' },
  { prefix: 'МебельХаус', category: 'furniture', suffix: '' },
  { prefix: 'Стройка', category: 'repair', suffix: '' },
  { prefix: 'СтройМаг', category: 'repair', suffix: '' },
  { prefix: 'Зоомир', category: 'animals', suffix: '' },
  { prefix: 'Спортмастер', category: 'sport', suffix: '' },
  { prefix: 'Детский мир', category: 'kids', suffix: '' },
  { prefix: 'ФэшнСтрит', category: 'women', suffix: '' },
  { prefix: 'Риэлт-Сервис', category: 'realty', suffix: '' },
  { prefix: 'Цифровой дом', category: 'computers', suffix: '' },
  { prefix: 'МобиТех', category: 'phones', suffix: '' },
];

const CITIES = ['Минск', 'Брест', 'Гродно', 'Витебск', 'Гомель', 'Могилёв', 'Бобруйск', 'Барановичи', 'Борисов', 'Пинск', 'Орша', 'Мозырь', 'Лида', 'Солигорск', 'Молодечно'];

const FIRST_NAMES_M = ['Александр', 'Дмитрий', 'Максим', 'Андрей', 'Сергей', 'Артём', 'Иван', 'Николай', 'Павел', 'Михаил', 'Владислав', 'Кирилл', 'Евгений', 'Олег', 'Денис', 'Виктор', 'Роман', 'Егор', 'Алексей', 'Игорь'];
const FIRST_NAMES_F = ['Анна', 'Мария', 'Екатерина', 'Ольга', 'Наталья', 'Елена', 'Ирина', 'Татьяна', 'Светлана', 'Юлия', 'Дарья', 'Виктория', 'Алина', 'Полина', 'Ксения', 'Валерия', 'Марина', 'Кристина', 'Диана', 'Вероника'];
const LAST_NAMES_M = ['Иванов', 'Петров', 'Сидоров', 'Козлов', 'Новиков', 'Морозов', 'Волков', 'Соколов', 'Лебедев', 'Кузнецов', 'Попов', 'Смирнов', 'Васильев', 'Михайлов', 'Фёдоров', 'Тарасов', 'Белов', 'Комаров', 'Орлов', 'Киселёв'];
const LAST_NAMES_F = ['Иванова', 'Петрова', 'Сидорова', 'Козлова', 'Новикова', 'Морозова', 'Волкова', 'Соколова', 'Лебедева', 'Кузнецова', 'Попова', 'Смирнова', 'Васильева', 'Михайлова', 'Фёдорова', 'Тарасова', 'Белова', 'Комарова', 'Орлова', 'Киселёва'];

function randomName(): string {
  const male = faker.datatype.boolean();
  const first = faker.helpers.arrayElement(male ? FIRST_NAMES_M : FIRST_NAMES_F);
  const last = faker.helpers.arrayElement(male ? LAST_NAMES_M : LAST_NAMES_F);
  return `${first} ${last}`;
}

// ─── Listing generation data ────────────────────────────

const TRANSMISSIONS = ['механика', 'автомат', 'робот', 'вариатор'];
const FUEL_TYPES = ['бензин', 'дизель', 'гибрид', 'электро', 'газ/бензин'];
const DRIVE_TYPES = ['передний', 'задний', 'полный'];
const COLORS = ['чёрный', 'белый', 'серый', 'серебристый', 'синий', 'красный', 'зелёный', 'бежевый', 'коричневый'];
const BODY_TYPES = ['седан', 'хэтчбек', 'универсал', 'кроссовер', 'внедорожник', 'минивэн', 'купе', 'лифтбек'];

const CAR_DESCRIPTIONS = [
  'Автомобиль в отличном состоянии, один владелец, вся история обслуживания у официального дилера. Не бит, не крашен, без ДТП. Комплектация максимальная: кожаный салон, климат-контроль, парктроники, камера заднего вида.',
  'Продаю свой автомобиль, второй хозяин по ПТС. Регулярное ТО, масло менялось каждые 10 тыс. км. Зимняя резина на дисках в подарок. Возможен торг при осмотре. Обмен не интересует.',
  'Машина в идеальном техническом состоянии. Двигатель и коробка работают безупречно. Кузов без коррозии, антикор обработка каждый год. Салон чистый, без прожогов и потёртостей.',
  'Автомобиль полностью обслужен, готов к эксплуатации. Новые тормозные колодки, свежее масло, фильтры заменены. Подвеска в отличном состоянии. Реальному покупателю — хороший торг.',
  'Продажа от первого владельца. Куплен у официального дилера, все ТО по регламенту. Пробег оригинальный, подтверждён сервисной книжкой. Комплект зимних шин включён в стоимость.',
  'Ухоженный автомобиль, гаражное хранение. Полный электропакет, мультимедиа с навигацией, подогрев сидений и руля. Без вложений — садись и езжай. Возможен обмен с вашей доплатой.',
  'Срочная продажа в связи с переездом. Автомобиль на ходу, всё работает исправно. Кондиционер заправлен, ABS, ESP. Свежая диагностика — без замечаний. Торг уместен.',
  'Полная комплектация: панорамная крыша, адаптивный круиз-контроль, мёртвые зоны, LED-оптика. Состояние нового автомобиля при цене б/у. Проверка по любой базе приветствуется.',
];

interface SubCatSpec {
  category: string;
  subcategory: string;
  titles: string[];
  descTemplates: string[];
  priceRange: [number, number];
}

const REGULAR_SUBCATS: SubCatSpec[] = [
  { category: 'realty', subcategory: 'realty-flat', titles: ['1-комн. квартира, {area} м²', '2-комн. квартира, {area} м²', '3-комн. квартира, {area} м²', 'Студия {area} м², новостройка'], descTemplates: ['Свежий ремонт, мебель, техника. Рядом школа, магазины, остановка. Тихий двор, парковка.', 'Отличная планировка, высокие потолки. Балкон застеклён, санузел раздельный.'], priceRange: [45000, 250000] },
  { category: 'realty', subcategory: 'realty-house', titles: ['Дом {area} м², участок {lot} соток', 'Коттедж {area} м² в пригороде'], descTemplates: ['Все коммуникации подведены: газ, вода, канализация. Баня, гараж, ухоженный участок.', 'Кирпичный дом, 2 этажа. Тёплый пол, камин, сауна. Ландшафтный дизайн.'], priceRange: [60000, 400000] },
  { category: 'realty', subcategory: 'realty-rent', titles: ['Аренда 1-комн., центр, {price}$/мес', 'Аренда 2-комн., {price}$/мес'], descTemplates: ['Полностью меблирована, бытовая техника, Wi-Fi. Рядом метро.'], priceRange: [300, 1500] },
  { category: 'services', subcategory: 'services-repair', titles: ['Ремонт квартир под ключ', 'Укладка плитки, ламината', 'Штукатурка, шпатлёвка стен'], descTemplates: ['Опыт более 10 лет, портфолио по запросу. Работаем по договору, гарантия на все виды работ.'], priceRange: [20, 200] },
  { category: 'services', subcategory: 'services-transport', titles: ['Грузоперевозки по Минску и РБ', 'Переезд квартиры/офиса', 'Доставка стройматериалов'], descTemplates: ['Газель, грузчики в комплекте. Аккуратно, быстро, недорого. Работаем без выходных.'], priceRange: [30, 300] },
  { category: 'services', subcategory: 'services-it', titles: ['Настройка ПК, ноутбуков', 'Создание сайтов на заказ', 'Ремонт компьютеров, выезд'], descTemplates: ['Быстрая диагностика, установка Windows, удаление вирусов. Выезд по городу бесплатный.'], priceRange: [15, 500] },
  { category: 'appliances', subcategory: 'appl-wash', titles: ['Стиральная машина Samsung {model}', 'Стиральная машина LG {model}', 'Стиральная машина Bosch {model}'], descTemplates: ['Инверторный двигатель, загрузка 7-9 кг. В отличном состоянии, без ремонтов. Доставка по городу.'], priceRange: [200, 1500] },
  { category: 'appliances', subcategory: 'appl-fridge', titles: ['Холодильник Bosch {model}', 'Холодильник Atlant {model}', 'Холодильник Samsung {model}'], descTemplates: ['No Frost, двухкамерный, энергокласс A+. Тихий, вместительный, отлично морозит.'], priceRange: [300, 2000] },
  { category: 'appliances', subcategory: 'appl-kitchen', titles: ['Мультиварка Redmond', 'Микроволновая печь Samsung', 'Блендер Bosch'], descTemplates: ['Отличное состояние, все функции работают. Полный комплект.'], priceRange: [30, 400] },
  { category: 'computers', subcategory: 'comp-laptop', titles: ['MacBook Pro 14" M3 Pro', 'ASUS ROG Strix G16', 'Lenovo ThinkPad X1 Carbon', 'HP Pavilion 15', 'Acer Nitro 5 RTX 4060'], descTemplates: ['Ноутбук в отличном состоянии, батарея держит весь день. Без царапин, клавиатура идеальная.', 'Мощный ноутбук для работы и игр. SSD, 16 ГБ RAM. Коробка, зарядка в комплекте.'], priceRange: [400, 6000] },
  { category: 'computers', subcategory: 'comp-desktop', titles: ['Игровой ПК RTX {gpu}', 'Офисный компьютер i5', 'Рабочая станция Ryzen 9'], descTemplates: ['Собран из качественных комплектующих. Тихий, производительный. Все игры на ультра.'], priceRange: [300, 5000] },
  { category: 'computers', subcategory: 'comp-parts', titles: ['Видеокарта RTX {gpu}', 'Процессор Intel i7-{gen}', 'Оперативная память DDR5 32GB', 'SSD Samsung 980 Pro 1TB'], descTemplates: ['Оригинал, гарантия. Работает без нареканий. Проверка при покупке.'], priceRange: [50, 2500] },
  { category: 'phones', subcategory: 'phone-smart', titles: ['iPhone 15 Pro Max 256GB', 'Samsung Galaxy S24 Ultra', 'Xiaomi 14 Pro', 'iPhone 14 128GB', 'Google Pixel 8 Pro', 'Samsung Galaxy A54'], descTemplates: ['Телефон в идеальном состоянии, АКБ {bat}%. Полный комплект: коробка, зарядка, чек.', 'Оригинал, проверка по IMEI. Без ремонтов, Face ID / сканер работает отлично.'], priceRange: [150, 4000] },
  { category: 'phones', subcategory: 'phone-tablet', titles: ['iPad Air M2 13"', 'Samsung Galaxy Tab S9', 'iPad Pro 11" M4', 'Xiaomi Pad 6'], descTemplates: ['Планшет как новый, экран без царапин. Чехол в комплекте.'], priceRange: [200, 3000] },
  { category: 'phones', subcategory: 'phone-watch', titles: ['Apple Watch Ultra 2', 'Samsung Galaxy Watch 6', 'Xiaomi Watch S3'], descTemplates: ['Умные часы в отличном состоянии. Зарядка, коробка. АКБ держит отлично.'], priceRange: [80, 1800] },
  { category: 'electronics', subcategory: 'elec-tv', titles: ['Телевизор Samsung 65" QLED 4K', 'LG OLED 55"', 'Телевизор Xiaomi 50" 4K'], descTemplates: ['Яркий, контрастный экран. Smart TV, Wi-Fi, Bluetooth. Пульт, документы.'], priceRange: [300, 4000] },
  { category: 'electronics', subcategory: 'elec-game', titles: ['PlayStation 5 Slim + 2 геймпада', 'Xbox Series X 1TB', 'Nintendo Switch OLED'], descTemplates: ['Приставка в отличном состоянии, всё работает. Игры в подарок.'], priceRange: [300, 1800] },
  { category: 'electronics', subcategory: 'elec-headphones', titles: ['AirPods Pro 2 USB-C', 'Sony WH-1000XM5', 'JBL Tune 770NC'], descTemplates: ['Наушники с активным шумоподавлением. Звук чистый, АКБ отличная.'], priceRange: [40, 600] },
  { category: 'men', subcategory: 'men-top', titles: ['Пуховик The North Face', 'Куртка Columbia Omni-Heat', 'Парка зимняя мужская'], descTemplates: ['Оригинал, размер {size}. Носил один сезон, состояние отличное.'], priceRange: [50, 500] },
  { category: 'men', subcategory: 'men-shoes', titles: ['Кроссовки Nike Air Max 90', 'Ботинки Dr. Martens 1460', 'Кроссовки Adidas Ultraboost'], descTemplates: ['Оригинал, размер {shoeSize}. Без дефектов, удобная колодка.'], priceRange: [40, 350] },
  { category: 'women', subcategory: 'women-dress', titles: ['Платье Mango миди', 'Платье Zara вечернее', 'Сарафан H&M лето 2025'], descTemplates: ['Размер {size}, надевалось пару раз. Ткань приятная, не мнётся.'], priceRange: [20, 300] },
  { category: 'women', subcategory: 'women-bags', titles: ['Сумка Michael Kors', 'Рюкзак Guess', 'Клатч Furla'], descTemplates: ['Оригинал, кожа. Цвет универсальный, подходит под всё.'], priceRange: [50, 500] },
  { category: 'beauty', subcategory: 'beauty-perfume', titles: ['Tom Ford Oud Wood 100 мл', 'Dior Sauvage EDP', 'Chanel Bleu de Chanel'], descTemplates: ['Оригинал, батч проверяется. Остаток ~{ml} мл. Стойкость отличная.'], priceRange: [40, 350] },
  { category: 'beauty', subcategory: 'beauty-hair', titles: ['Фен Dyson Supersonic', 'Утюжок ghd Gold', 'Плойка BaByliss Pro'], descTemplates: ['Профессиональный прибор в отличном состоянии. Быстрый нагрев, бережёт волосы.'], priceRange: [30, 700] },
  { category: 'kids', subcategory: 'kids-toys', titles: ['Конструктор LEGO Technic', 'Набор Playmobil', 'Кукла Barbie Dreamhouse'], descTemplates: ['Новый, в упаковке. Отличный подарок для ребёнка. Развивает моторику и фантазию.'], priceRange: [15, 200] },
  { category: 'kids', subcategory: 'kids-stroller', titles: ['Коляска Cybex Priam 3 в 1', 'Коляска Anex e/type', 'Прогулочная Yoyo2'], descTemplates: ['Коляска в отличном состоянии, полный комплект. Люлька, прогулочный блок, дождевик.'], priceRange: [200, 1500] },
  { category: 'kids', subcategory: 'kids-clothes', titles: ['Комбинезон Reima Tec зимний', 'Куртка Kerry 116 см', 'Комплект одежды 0-6 мес'], descTemplates: ['Качественная детская одежда, состояние хорошее. Подходит на указанный размер.'], priceRange: [10, 150] },
  { category: 'furniture', subcategory: 'furn-living', titles: ['Диван угловой IKEA Friheten', 'Кресло-реклайнер кожаное', 'Диван 3-местный велюр'], descTemplates: ['Удобный, раскладной механизм. Ткань без пятен. Самовывоз или доставка за ваш счёт.'], priceRange: [150, 2000] },
  { category: 'furniture', subcategory: 'furn-bedroom', titles: ['Кровать 160x200 + матрас', 'Комод IKEA Malm', 'Шкаф-купе на заказ'], descTemplates: ['Мебель в хорошем состоянии, без сколов. Разбор и вынос — помогу.'], priceRange: [80, 1500] },
  { category: 'furniture', subcategory: 'furn-kitchen', titles: ['Кухня МДФ эмаль 3 м', 'Стол обеденный раздвижной', 'Барные стулья 4 шт.'], descTemplates: ['Красивая, функциональная мебель для кухни. Фурнитура Blum/Hettich.'], priceRange: [50, 3500] },
  { category: 'home', subcategory: 'home-textile', titles: ['Комплект постельного белья сатин', 'Одеяло пуховое 200x220', 'Шторы блэкаут на заказ'], descTemplates: ['Качественный текстиль для дома. Приятный к телу, не линяет, не садится.'], priceRange: [15, 200] },
  { category: 'home', subcategory: 'home-decor', titles: ['Картина на холсте 80x120', 'Ваза стеклянная дизайнерская', 'Зеркало в раме 60x90'], descTemplates: ['Стильный элемент декора для вашего интерьера. Ручная работа.'], priceRange: [10, 300] },
  { category: 'repair', subcategory: 'repair-tools', titles: ['Перфоратор Bosch GBH 2-26', 'Шуруповёрт Makita 18V', 'Набор инструментов 108 предметов'], descTemplates: ['Профессиональный инструмент, работает отлично. Кейс в комплекте.'], priceRange: [30, 500] },
  { category: 'repair', subcategory: 'repair-materials', titles: ['Ламинат 33 класс, {area} м²', 'Плитка керамогранит 60x60', 'Обои виниловые 10 рулонов'], descTemplates: ['Остаток после ремонта. Качественный материал, цена ниже магазинной.'], priceRange: [20, 500] },
  { category: 'garden', subcategory: 'garden-tech', titles: ['Газонокосилка Husqvarna', 'Триммер Stihl FS 55', 'Мотоблок Нева МБ-2'], descTemplates: ['Садовая техника в рабочем состоянии. Обслужена, готова к сезону.'], priceRange: [80, 1000] },
  { category: 'garden', subcategory: 'garden-plants', titles: ['Саженцы голубики 3 года', 'Туи Смарагд 120 см', 'Рассада клубники 50 шт.'], descTemplates: ['Здоровые, крепкие растения. Выращены в Беларуси, адаптированы к нашему климату.'], priceRange: [5, 100] },
  { category: 'sport', subcategory: 'sport-fitness', titles: ['Беговая дорожка складная', 'Гантели разборные 2x20 кг', 'Эллиптический тренажёр'], descTemplates: ['Тренажёр для дома в отличном состоянии. Компактный, тихий.'], priceRange: [50, 1500] },
  { category: 'sport', subcategory: 'sport-bikes', titles: ['Велосипед Merida Big.Nine', 'Горный Trek Marlin 7', 'Городской велосипед Cube'], descTemplates: ['Велосипед в хорошем состоянии, всё переключается чётко. Гидравлика, амортизация.'], priceRange: [100, 2000] },
  { category: 'sport', subcategory: 'sport-outdoor', titles: ['Палатка 4-местная Tramp', 'Спальный мешок -15°С', 'Рюкзак туристический 80 л'], descTemplates: ['Туристическое снаряжение отличного качества. Проверено в походах.'], priceRange: [30, 500] },
  { category: 'work', subcategory: 'work-vacancy', titles: ['Повар в ресторан, Минск', 'Менеджер по продажам', 'Водитель категории С', 'Продавец-консультант'], descTemplates: ['Полная занятость, официальное оформление. Стабильная зарплата, соцпакет.'], priceRange: [800, 4000] },
  { category: 'work', subcategory: 'work-resume', titles: ['Веб-разработчик React/Next.js', 'Бухгалтер, опыт 10 лет', 'Дизайнер интерьеров'], descTemplates: ['Ищу работу по специальности. Опыт, портфолио, рекомендации — всё есть.'], priceRange: [1000, 5000] },
  { category: 'wedding', subcategory: 'wed-dress', titles: ['Свадебное платье А-силуэт', 'Свадебное платье рыбка'], descTemplates: ['Платье в идеальном состоянии, надевалось один раз. Химчистка сделана.'], priceRange: [200, 1500] },
  { category: 'wedding', subcategory: 'wed-photo', titles: ['Свадебный фотограф + видеограф', 'Фотограф на свадьбу, пакет «Весь день»'], descTemplates: ['Профессиональная съёмка: 500+ фото, клип, raw-файлы. Портфолио по запросу.'], priceRange: [300, 1500] },
  { category: 'animals', subcategory: 'anim-dogs', titles: ['Щенок золотистого ретривера', 'Щенок немецкой овчарки', 'Щенок лабрадора'], descTemplates: ['Привит, документы, клеймо. Родители — чемпионы. Здоров, активен.'], priceRange: [200, 1000] },
  { category: 'animals', subcategory: 'anim-cats', titles: ['Котёнок мейн-кун', 'Котёнок британский', 'Котёнок шотландский вислоухий'], descTemplates: ['Приучен к лотку и когтеточке. Ласковый, игривый. Вет. паспорт.'], priceRange: [100, 600] },
  { category: 'animals', subcategory: 'anim-goods', titles: ['Корм Royal Canin 15 кг', 'Когтеточка-домик большая', 'Переноска для собак'], descTemplates: ['Товар для животных. Новый / в отличном состоянии.'], priceRange: [10, 200] },
];

const PARTS_TITLES = [
  'Двигатель {brand} {engine}', 'Коробка передач {brand} {trans}', 'Фары {brand} LED',
  'Бампер передний {brand}', 'Радиатор охлаждения {brand}', 'Стартер {brand}',
  'Генератор {brand}', 'Тормозные колодки Brembo', 'Амортизаторы Bilstein',
  'Комплект ГРМ Gates', 'Рулевая рейка {brand}', 'Турбина {brand}',
  'АКПП {brand} {trans}', 'Катализатор {brand}', 'Интеркулер {brand}',
];

const PARTS_DESCRIPTIONS = [
  'Контрактная запчасть, пробег до 100 тыс. км. Гарантия 30 дней. Отправка по РБ.',
  'Оригинальная деталь, снята с разбора. Состояние хорошее, проверена.',
  'Новый аналог высокого качества. Подходит на модели {brand}. Артикул по запросу.',
  'Б/у в отличном состоянии. Установка возможна на нашем СТО. Доставка по городу.',
];

const TIRES_TITLES = [
  'Шины Michelin Pilot Sport 5 {size}', 'Шины Continental PremiumContact 6 {size}',
  'Шины Bridgestone Turanza T005 {size}', 'Шины Nokian Hakkapeliitta R5 {size}',
  'Диски BBS SR {rim}" 5x112', 'Диски OZ Racing {rim}"', 'Диски MAK Milano {rim}"',
];

// ─── Main seed logic ────────────────────────────────────

async function main() {
  console.log('🌱 Shukai Marketplace Seeder\n');

  // ── Phase 1: Users ────────────────────────────────────
  console.log('👤 Phase 1: Creating 1000 users...');

  const existingUserCount = await prisma.user.count();
  if (existingUserCount >= 500) {
    console.log(`   ⏭  Already ${existingUserCount} users in DB, skipping user creation.\n`);
  } else {
    const passwordHash = '$2b$10$K4GxGhZsNOjIqxB7XZJX8Oq5mVbJ7IlU3HcCkE1hFMj2VRhZwjKe';

    const personalUsers = Array.from({ length: 800 }, (_, i) => {
      const name = randomName();
      const city = faker.helpers.arrayElement(CITIES);
      return {
        email: `user${i + 1}@shukai.test`,
        name,
        passwordHash,
        type: 'PERSONAL' as const,
        phone: belarusPhone(),
        city,
        verified: faker.datatype.boolean(0.7),
      };
    });

    const businessUsers = Array.from({ length: 200 }, (_, i) => {
      const tmpl = BUSINESS_TEMPLATES[i % BUSINESS_TEMPLATES.length];
      const city = faker.helpers.arrayElement(CITIES);
      const companyName = `${tmpl.prefix} ${city}`;
      return {
        email: `biz${i + 1}@shukai.test`,
        name: randomName(),
        passwordHash,
        type: 'BUSINESS' as const,
        phone: belarusPhone(),
        city,
        companyName,
        unp: faker.string.numeric(9),
        description: `Официальный магазин «${companyName}». Широкий ассортимент, доставка по всей Беларуси. Гарантия на весь товар.`,
        companyAddress: `г. ${city}, ул. ${faker.helpers.arrayElement(['Ленина', 'Советская', 'Победы', 'Мира', 'Калинина', 'Пушкина', 'Гагарина', 'Комсомольская'])}, ${faker.number.int({ min: 1, max: 150 })}`,
        businessCategory: tmpl.category,
        verified: faker.datatype.boolean(0.8),
        schedule: 'Пн-Пт 9:00-18:00, Сб 10:00-15:00',
      };
    });

    const BATCH = 200;
    for (let i = 0; i < personalUsers.length; i += BATCH) {
      await prisma.user.createMany({ data: personalUsers.slice(i, i + BATCH), skipDuplicates: true });
      process.stdout.write(`   PERSONAL ${Math.min(i + BATCH, personalUsers.length)}/${personalUsers.length}\r`);
    }
    console.log('');
    for (let i = 0; i < businessUsers.length; i += BATCH) {
      await prisma.user.createMany({ data: businessUsers.slice(i, i + BATCH), skipDuplicates: true });
      process.stdout.write(`   BUSINESS ${Math.min(i + BATCH, businessUsers.length)}/${businessUsers.length}\r`);
    }
    console.log('\n   ✅ 1000 users created.\n');
  }

  // Fetch all user IDs
  const allUsers = await prisma.user.findMany({ select: { id: true, type: true, businessCategory: true } });
  const personalIds = allUsers.filter(u => u.type === 'PERSONAL').map(u => u.id);
  const businessMap = new Map<string, string[]>();
  for (const u of allUsers.filter(u => u.type === 'BUSINESS')) {
    const cat = u.businessCategory ?? 'general';
    if (!businessMap.has(cat)) businessMap.set(cat, []);
    businessMap.get(cat)!.push(u.id);
  }
  const allUserIds = allUsers.map(u => u.id);

  function authorForCategory(cat: string): string {
    const bizIds = businessMap.get(cat);
    if (bizIds?.length && faker.datatype.boolean(0.6)) {
      return faker.helpers.arrayElement(bizIds);
    }
    return faker.helpers.arrayElement(allUserIds);
  }

  // ── Phase 2: Auto-world listings (300) ─────────────────
  console.log('🚗 Phase 2: Creating 300 auto-world listings...');

  const existingAutoCount = await prisma.listing.count({ where: { category: 'auto' } });
  if (existingAutoCount >= 200) {
    console.log(`   ⏭  Already ${existingAutoCount} auto listings, skipping.\n`);
  } else {
    const carBrands = await prisma.carBrand.findMany({
      include: { models: { include: { generations: true } } },
    });

    const carModelsFlat = carBrands.flatMap(b =>
      b.models
        .filter(m => m.vehicleType === 'car')
        .flatMap(m =>
          m.generations.length > 0
            ? m.generations.map(g => ({ brandId: b.id, brandName: b.name, modelId: m.id, modelName: m.name, genId: g.id as string | null, yearFrom: g.yearFrom, yearTo: g.yearTo ?? 2026, bodyType: g.bodyType }))
            : [{ brandId: b.id, brandName: b.name, modelId: m.id, modelName: m.name, genId: null as string | null, yearFrom: 2010, yearTo: 2025, bodyType: null as string | null }]
        )
    );

    const truckModelsFlat = carBrands.flatMap(b =>
      b.models
        .filter(m => m.vehicleType === 'truck' || m.vehicleType === 'bus')
        .map(m => ({ brandId: b.id, brandName: b.name, modelId: m.id, modelName: m.name, vehicleType: m.vehicleType }))
    );

    const autoListings: Parameters<typeof prisma.listing.create>[0]['data'][] = [];

    // 200 cars
    const carsToCreate = Math.min(200, carModelsFlat.length > 0 ? 200 : 0);
    for (let i = 0; i < carsToCreate; i++) {
      const car = faker.helpers.arrayElement(carModelsFlat);
      const minYear = Math.max(car.yearFrom, 2005);
      const maxYear = Math.max(Math.min(car.yearTo, 2025), minYear);
      const year = faker.number.int({ min: minYear, max: maxYear });
      const mileage = faker.number.int({ min: 1000, max: 300000 });
      const engineVol = faker.helpers.arrayElement([1.4, 1.6, 1.8, 2.0, 2.2, 2.5, 3.0, 3.5]);
      const { oblast, raion } = randomLocation();

      autoListings.push({
        title: `${car.brandName} ${car.modelName}, ${year}`,
        description: faker.helpers.arrayElement(CAR_DESCRIPTIONS),
        price: faker.number.int({ min: 2000, max: 50000 }),
        image: faker.helpers.arrayElement(CAR_IMAGES),
        images: faker.helpers.arrayElements(CAR_IMAGES, { min: 2, max: 5 }),
        views: faker.number.int({ min: 5, max: 2000 }),
        date: ruDate(pastDate()),
        active: true,
        isVip: faker.datatype.boolean(0.08),
        oblast, raion,
        category: 'auto',
        subcategory: 'auto-cars',
        carBrandId: car.brandId,
        carModelId: car.modelId,
        carGenerationId: car.genId,
        year,
        mileage,
        transmission: faker.helpers.arrayElement(TRANSMISSIONS),
        fuelType: faker.helpers.arrayElement(FUEL_TYPES),
        engineVolume: engineVol,
        bodyType: car.bodyType ?? faker.helpers.arrayElement(BODY_TYPES),
        driveType: faker.helpers.arrayElement(DRIVE_TYPES),
        color: faker.helpers.arrayElement(COLORS),
        authorId: authorForCategory('auto'),
      });
    }

    // 30 trucks
    for (let i = 0; i < 30; i++) {
      const truck = truckModelsFlat.length > 0 ? faker.helpers.arrayElement(truckModelsFlat) : null;
      const { oblast, raion } = randomLocation();
      autoListings.push({
        title: truck ? `${truck.brandName} ${truck.modelName}, ${faker.number.int({ min: 2010, max: 2025 })}` : `Грузовик ${faker.number.int({ min: 2010, max: 2025 })} года`,
        description: 'Грузовой автомобиль в рабочем состоянии. Двигатель, коробка — без нареканий. Документы в порядке, техосмотр пройден.',
        price: faker.number.int({ min: 8000, max: 80000 }),
        image: faker.helpers.arrayElement(TRUCK_IMAGES),
        images: faker.helpers.arrayElements(TRUCK_IMAGES, { min: 1, max: 3 }),
        views: faker.number.int({ min: 5, max: 500 }),
        date: ruDate(pastDate()),
        active: true,
        oblast, raion,
        category: 'auto',
        subcategory: 'auto-truck',
        carBrandId: truck?.brandId,
        carModelId: truck?.modelId,
        authorId: authorForCategory('auto'),
      });
    }

    // 40 parts
    for (let i = 0; i < 40; i++) {
      const brandName = carBrands.length ? faker.helpers.arrayElement(carBrands).name : 'Universal';
      const tmpl = faker.helpers.arrayElement(PARTS_TITLES)
        .replace('{brand}', brandName)
        .replace('{engine}', faker.helpers.arrayElement(['N57D30', 'M57', 'TFSI 2.0', 'TSI 1.8', 'CDAB', 'G4KD']))
        .replace('{trans}', faker.helpers.arrayElement(['ZF 6HP', 'DSG7', 'Aisin', 'CVT', 'МКПП-6']));
      const desc = faker.helpers.arrayElement(PARTS_DESCRIPTIONS).replace('{brand}', brandName);
      const { oblast, raion } = randomLocation();

      autoListings.push({
        title: tmpl,
        description: desc,
        price: faker.number.int({ min: 20, max: 5000 }),
        image: FALLBACK_IMG,
        images: [],
        views: faker.number.int({ min: 2, max: 300 }),
        date: ruDate(pastDate()),
        active: true,
        oblast, raion,
        category: 'auto',
        subcategory: 'auto-parts',
        partCategory: faker.helpers.arrayElement(['двигатель', 'трансмиссия', 'кузов', 'подвеска', 'электрика', 'тормоза']),
        partName: tmpl,
        authorId: authorForCategory('auto'),
      });
    }

    // 20 tires
    for (let i = 0; i < 20; i++) {
      const size = faker.helpers.arrayElement(['205/55 R16', '225/45 R17', '235/55 R18', '245/40 R19', '195/65 R15']);
      const rim = faker.helpers.arrayElement(['16', '17', '18', '19']);
      const tmpl = faker.helpers.arrayElement(TIRES_TITLES).replace('{size}', size).replace('{rim}', rim);
      const { oblast, raion } = randomLocation();

      autoListings.push({
        title: tmpl,
        description: 'Комплект 4 шт. Состояние отличное, остаток протектора 6+ мм. Без грыж, порезов, латок.',
        price: faker.number.int({ min: 100, max: 2000 }),
        image: FALLBACK_IMG,
        images: [],
        views: faker.number.int({ min: 3, max: 200 }),
        date: ruDate(pastDate()),
        active: true,
        oblast, raion,
        category: 'auto',
        subcategory: 'auto-tires',
        authorId: authorForCategory('auto'),
      });
    }

    // 10 accessories
    for (let i = 0; i < 10; i++) {
      const titles = ['Видеорегистратор Xiaomi 70mai', 'Чехлы на сиденья экокожа', 'Автомагнитола 2DIN Android', 'Набор автоинструментов', 'Багажник на крышу универсальный', 'Компрессор автомобильный', 'Автохолодильник 20 л', 'Пусковое устройство Jump Starter', 'Коврики в салон 3D', 'LED-лампы H7 комплект'];
      const { oblast, raion } = randomLocation();
      autoListings.push({
        title: titles[i],
        description: 'Автоаксессуар в отличном состоянии. Полный комплект, инструкция. Отправка по РБ.',
        price: faker.number.int({ min: 20, max: 500 }),
        image: FALLBACK_IMG,
        images: [],
        views: faker.number.int({ min: 5, max: 150 }),
        date: ruDate(pastDate()),
        active: true,
        oblast, raion,
        category: 'auto',
        subcategory: 'auto-accessories',
        authorId: authorForCategory('auto'),
      });
    }

    // Insert auto listings in batches
    for (let i = 0; i < autoListings.length; i += 100) {
      const batch = autoListings.slice(i, i + 100);
      await prisma.listing.createMany({ data: batch as any[] });
      process.stdout.write(`   Auto listings ${Math.min(i + 100, autoListings.length)}/${autoListings.length}\r`);
    }
    console.log('\n   ✅ 300 auto listings created.\n');
  }

  // ── Phase 3: Regular listings (700) ────────────────────
  console.log('📦 Phase 3: Creating 700 regular listings...');

  const existingRegCount = await prisma.listing.count({ where: { NOT: { category: 'auto' } } });
  if (existingRegCount >= 500) {
    console.log(`   ⏭  Already ${existingRegCount} regular listings, skipping.\n`);
  } else {
    const regularListings: Parameters<typeof prisma.listing.create>[0]['data'][] = [];
    const PER_SUBCAT = Math.ceil(700 / REGULAR_SUBCATS.length);

    for (const spec of REGULAR_SUBCATS) {
      const count = Math.min(PER_SUBCAT, 700 - regularListings.length);
      if (count <= 0) break;

      for (let i = 0; i < count; i++) {
        const titleTmpl = faker.helpers.arrayElement(spec.titles);
        const title = titleTmpl
          .replace('{area}', String(faker.number.int({ min: 30, max: 250 })))
          .replace('{lot}', String(faker.number.int({ min: 6, max: 30 })))
          .replace('{price}', String(faker.number.int({ min: 300, max: 1200 })))
          .replace('{model}', faker.string.alphanumeric(6).toUpperCase())
          .replace('{gpu}', faker.helpers.arrayElement(['4060', '4060 Ti', '4070', '4070 Ti', '4080', '3060']))
          .replace('{gen}', faker.helpers.arrayElement(['13700K', '14700K', '12600K']))
          .replace('{size}', faker.helpers.arrayElement(['S', 'M', 'L', 'XL']))
          .replace('{shoeSize}', String(faker.number.int({ min: 39, max: 46 })))
          .replace('{bat}', String(faker.number.int({ min: 85, max: 100 })))
          .replace('{ml}', String(faker.number.int({ min: 40, max: 90 })))
          .replace('{rim}', faker.helpers.arrayElement(['16', '17', '18']));

        const desc = faker.helpers.arrayElement(spec.descTemplates)
          .replace('{brand}', faker.helpers.arrayElement(['BMW', 'VW', 'Audi', 'Mercedes']));

        const { oblast, raion } = randomLocation();
        const price = faker.number.int({ min: spec.priceRange[0], max: spec.priceRange[1] });

        regularListings.push({
          title,
          description: desc,
          price,
          image: imageForCategory(spec.category),
          images: [imageForCategory(spec.category)],
          views: faker.number.int({ min: 3, max: 1500 }),
          date: ruDate(pastDate()),
          active: true,
          isVip: faker.datatype.boolean(0.05),
          oblast, raion,
          category: spec.category,
          subcategory: spec.subcategory,
          authorId: authorForCategory(spec.category),
        });
      }
    }

    // Shuffle for variety
    for (let i = regularListings.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [regularListings[i], regularListings[j]] = [regularListings[j], regularListings[i]];
    }

    // Insert in batches
    for (let i = 0; i < regularListings.length; i += 100) {
      const batch = regularListings.slice(i, i + 100);
      await prisma.listing.createMany({ data: batch as any[] });
      process.stdout.write(`   Regular listings ${Math.min(i + 100, regularListings.length)}/${regularListings.length}\r`);
    }
    console.log('\n   ✅ 700 regular listings created.\n');
  }

  // ── Summary ────────────────────────────────────────────
  const totalUsers = await prisma.user.count();
  const totalListings = await prisma.listing.count();
  const autoCount = await prisma.listing.count({ where: { category: 'auto' } });
  const regCount = totalListings - autoCount;

  console.log('═══════════════════════════════════════');
  console.log(`  Пользователи : ${totalUsers}`);
  console.log(`  Объявления   : ${totalListings}`);
  console.log(`    ├─ Авто    : ${autoCount}`);
  console.log(`    └─ Прочие  : ${regCount}`);
  console.log('═══════════════════════════════════════');
  console.log('🎉 Маркетплейс готов к работе!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
