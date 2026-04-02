import 'dotenv/config';
import { PrismaClient } from '../app/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
  connectionString: process.env.DIRECT_URL || process.env.DATABASE_URL!,
  ssl: { rejectUnauthorized: false },
});
const prisma = new PrismaClient({ adapter });

const PLACEHOLDER_IMG = 'https://placehold.co/600x400/1e293b/64748b?text=Shukai';

const LOCATIONS: { oblast: string; raion: string }[] = [
  { oblast: 'Минская', raion: 'Минский' },
  { oblast: 'Минская', raion: 'Борисовский' },
  { oblast: 'Минская', raion: 'Молодечненский' },
  { oblast: 'Минская', raion: 'Солигорский' },
  { oblast: 'Брестская', raion: 'Брестский' },
  { oblast: 'Брестская', raion: 'Барановичский' },
  { oblast: 'Брестская', raion: 'Пинский' },
  { oblast: 'Витебская', raion: 'Витебский' },
  { oblast: 'Витебская', raion: 'Оршанский' },
  { oblast: 'Витебская', raion: 'Полоцкий' },
  { oblast: 'Гомельская', raion: 'Гомельский' },
  { oblast: 'Гомельская', raion: 'Мозырский' },
  { oblast: 'Гомельская', raion: 'Жлобинский' },
  { oblast: 'Гродненская', raion: 'Гродненский' },
  { oblast: 'Гродненская', raion: 'Лидский' },
  { oblast: 'Могилевская', raion: 'Могилевский' },
  { oblast: 'Могилевская', raion: 'Бобруйский' },
];

function loc(i: number) {
  return LOCATIONS[i % LOCATIONS.length];
}

function today() {
  return new Date().toLocaleDateString('ru-RU');
}

interface FakeListing {
  title: string;
  description: string;
  price: number;
  category: string;
  subcategory: string;
  isVip?: boolean;
  sku?: string;
}

const LISTINGS: FakeListing[] = [
  // ═══ auto ═══
  { title: 'BMW X5 xDrive30d, 2019', description: 'Полный привод, кожаный салон, панорама. Один владелец, обслуживание у дилера.', price: 78900, category: 'auto', subcategory: 'auto-cars' },
  { title: 'Volkswagen Polo 1.6 MPI, 2021', description: 'Автомат, кондиционер, мультимедиа. Пробег 34 тыс. км.', price: 32500, category: 'auto', subcategory: 'auto-cars' },
  { title: 'Geely Coolray 1.5T, 2023', description: 'Турбо, полный фарш, камера 360. Гарантия ещё год.', price: 42000, category: 'auto', subcategory: 'auto-cars', isVip: true },
  { title: 'Двигатель N57D30 BMW 3.0d', description: 'Контрактный, пробег 98 тыс. км. Гарантия 30 дней.', price: 4200, category: 'auto', subcategory: 'auto-parts' },
  { title: 'Комплект тормозных колодок Brembo', description: 'Передние, керамика. Подходит на BMW 3/5 серии.', price: 180, category: 'auto', subcategory: 'auto-parts' },
  { title: 'Шины Michelin Pilot Sport 5 225/45 R18', description: 'Комплект 4 шт., новые, 2024 год выпуска.', price: 960, category: 'auto', subcategory: 'auto-tires' },
  { title: 'Диски BBS SR 17" 5x112', description: 'Оригинал, б/у, идеальное состояние. Без шин.', price: 1400, category: 'auto', subcategory: 'auto-tires' },
  { title: 'Honda CBR600RR, 2018', description: '15 тыс. км, полный обвес, тюнинг выхлопа.', price: 18500, category: 'auto', subcategory: 'auto-moto' },
  { title: 'Yamaha YZF-R1, 2020', description: 'Электроника, трекшн-контроль, ABS. Один владелец.', price: 29000, category: 'auto', subcategory: 'auto-moto' },
  { title: 'МАЗ 5440 тягач, 2017', description: 'Двигатель Cummins, коробка ZF, спальник. На ходу.', price: 45000, category: 'auto', subcategory: 'auto-truck' },
  { title: 'МАЗ 103 автобус, 2015', description: 'Городской, 100 мест, дизель. Техосмотр пройден.', price: 35000, category: 'auto', subcategory: 'auto-bus' },
  { title: 'Прицеп Schmitz Cargobull, 2019', description: 'Тент, грузоподъёмность 20 т, оси SAF.', price: 22000, category: 'auto', subcategory: 'auto-trailer' },
  { title: 'Видеорегистратор Xiaomi 70mai A800S', description: '4K, GPS, Wi-Fi. Новый, в упаковке.', price: 210, category: 'auto', subcategory: 'auto-accessories' },
  { title: 'Чехлы на сиденья экокожа универсальные', description: 'Черные с красной строчкой. Полный комплект.', price: 95, category: 'auto', subcategory: 'auto-accessories' },

  // ═══ realty ═══
  { title: '2-комн. квартира, 54 м², ул. Притыцкого', description: 'Свежий ремонт, мебель, техника. Рядом метро Каменная Горка.', price: 128000, category: 'realty', subcategory: 'realty-flat' },
  { title: '1-комн. квартира, 38 м², Новая Боровая', description: 'Студия, 9 этаж, вид на парк. Отделка от застройщика.', price: 89000, category: 'realty', subcategory: 'realty-flat', isVip: true },
  { title: 'Дом 180 м², участок 15 соток', description: 'Газ, вода, канализация. Баня, гараж на 2 авто.', price: 195000, category: 'realty', subcategory: 'realty-house' },
  { title: 'Коттедж 240 м², Ратомка', description: 'Кирпич, 3 уровня, сауна, бассейн. Ландшафт.', price: 310000, category: 'realty', subcategory: 'realty-house' },
  { title: 'Комната 18 м² в 3-комн. квартире', description: 'Центр города, тихие соседи, ремонт.', price: 28000, category: 'realty', subcategory: 'realty-room' },
  { title: 'Офис 120 м², бизнес-центр «Титан»', description: 'Open space, парковка, охрана 24/7.', price: 185000, category: 'realty', subcategory: 'realty-commercial' },
  { title: 'Участок 25 соток, д. Колодищи', description: 'ИЖС, коммуникации по границе. 5 км от МКАД.', price: 42000, category: 'realty', subcategory: 'realty-land' },
  { title: 'Аренда 2-комн., Немига, 650$/мес', description: 'Полностью меблирована, Wi-Fi, парковка.', price: 650, category: 'realty', subcategory: 'realty-rent' },

  // ═══ services ═══
  { title: 'Ремонт квартир под ключ', description: 'Штукатурка, плитка, ламинат, электрика. Опыт 12 лет. Портфолио по запросу.', price: 50, category: 'services', subcategory: 'services-repair' },
  { title: 'Укладка плитки, мозаика', description: 'Ванные, кухни, балконы. Быстро, качественно. Стаж 8 лет.', price: 35, category: 'services', subcategory: 'services-repair' },
  { title: 'Грузоперевозки по Минску и РБ', description: 'Газель, грузчики. Квартирные переезды, доставка мебели.', price: 80, category: 'services', subcategory: 'services-transport' },
  { title: 'Уборка квартир и офисов', description: 'Генеральная, поддерживающая, после ремонта. Свои средства.', price: 60, category: 'services', subcategory: 'services-cleaning' },
  { title: 'Репетитор математики, ЦТ/ЦЭ', description: 'Подготовка к ЦТ — 90+ баллов. Индивидуально, онлайн/оффлайн.', price: 40, category: 'services', subcategory: 'services-tutor' },
  { title: 'Маникюр, педикюр, наращивание', description: 'Гель-лак, дизайн. Сертифицированный мастер. Стерильность.', price: 45, category: 'services', subcategory: 'services-beauty' },
  { title: 'Настройка компьютера, удаление вирусов', description: 'Windows, драйвера, Wi-Fi. Выезд на дом. Быстро.', price: 30, category: 'services', subcategory: 'services-it' },

  // ═══ appliances ═══
  { title: 'Стиральная машина Samsung WW80J5410', description: '8 кг, инвертор, 1400 об/мин. Идеальное состояние.', price: 580, category: 'appliances', subcategory: 'appl-wash', sku: 'WW80J5410' },
  { title: 'Стиральная машина LG F2V5GS0W', description: '10.5 кг, пар, Wi-Fi. Гарантия 1 год.', price: 890, category: 'appliances', subcategory: 'appl-wash', sku: 'F2V5GS0W' },
  { title: 'Холодильник Bosch KGN39XW27R', description: 'No Frost, 366 л, инверторный компрессор. Белый.', price: 1350, category: 'appliances', subcategory: 'appl-fridge', sku: 'KGN39XW27R' },
  { title: 'Холодильник Atlant ХМ 4624-101', description: '347 л, двухкамерный, A+. Беларусь.', price: 750, category: 'appliances', subcategory: 'appl-fridge', sku: 'XM4624' },
  { title: 'Мультиварка Redmond RMC-M92S', description: '45 программ, 5 л, керамическая чаша.', price: 120, category: 'appliances', subcategory: 'appl-kitchen', sku: 'RMC-M92S' },
  { title: 'Кондиционер Gree Bora GWH09AAB', description: 'Инвертор, 25 м², Wi-Fi, тихий режим. Монтаж в подарок.', price: 1100, category: 'appliances', subcategory: 'appl-climate', sku: 'GWH09AAB' },
  { title: 'Робот-пылесос Xiaomi Roborock S8 Pro', description: 'Лидар, влажная уборка, самоочистка. Новый.', price: 1200, category: 'appliances', subcategory: 'appl-vacuum', sku: 'S8-PRO' },

  // ═══ computers ═══
  { title: 'MacBook Pro 14" M3 Pro, 18/512', description: 'Space Black, AppleCare+ до 2027. Как новый.', price: 5200, category: 'computers', subcategory: 'comp-laptop', sku: 'MBP14-M3P' },
  { title: 'ASUS ROG Strix G16, RTX 4070', description: 'i7-13650HX, 16 ГБ, 512 SSD, 165 Гц. Игровой.', price: 3800, category: 'computers', subcategory: 'comp-laptop', sku: 'G614JU' },
  { title: 'Игровой ПК: RTX 4080 / i9-13900K', description: '32 ГБ DDR5, 2 ТБ SSD, корпус с подсветкой.', price: 4500, category: 'computers', subcategory: 'comp-desktop', isVip: true },
  { title: 'Монитор LG UltraGear 27GP850-B', description: '27", QHD, 165 Гц, Nano IPS, HDR400.', price: 780, category: 'computers', subcategory: 'comp-monitor', sku: '27GP850' },
  { title: 'Видеокарта NVIDIA RTX 4060 Ti 8GB', description: 'MSI Gaming X, новая, гарантия 3 года.', price: 1100, category: 'computers', subcategory: 'comp-parts', sku: 'RTX4060TI' },
  { title: 'Клавиатура Keychron K8 Pro', description: 'Механика, Gateron Pro Brown, RGB, Bluetooth.', price: 180, category: 'computers', subcategory: 'comp-periphery', sku: 'K8P-BRN' },

  // ═══ phones ═══
  { title: 'iPhone 15 Pro Max 256GB Natural Titanium', description: 'Полный комплект, гарантия 10 мес. Идеал.', price: 3200, category: 'phones', subcategory: 'phone-smart', isVip: true },
  { title: 'Samsung Galaxy S24 Ultra 512GB', description: 'S Pen, камера 200 Мп, AI-функции. Новый.', price: 3500, category: 'phones', subcategory: 'phone-smart' },
  { title: 'Xiaomi 14 Pro 12/256', description: 'Leica, Snapdragon 8 Gen 3, AMOLED 120 Гц.', price: 1600, category: 'phones', subcategory: 'phone-smart' },
  { title: 'iPad Air M2 13" 256GB Wi-Fi', description: 'Starlight, как новый, чехол в комплекте.', price: 1800, category: 'phones', subcategory: 'phone-tablet' },
  { title: 'Чехол MagSafe кожаный iPhone 15 Pro', description: 'Оригинал Apple, цвет Ink. Новый, запечатан.', price: 65, category: 'phones', subcategory: 'phone-accessory', sku: 'MHKA3' },
  { title: 'Apple Watch Ultra 2, 49mm', description: 'Титан, Alpine Loop, GPS + Cellular.', price: 1600, category: 'phones', subcategory: 'phone-watch' },

  // ═══ electronics ═══
  { title: 'Телевизор Samsung QE65QN85C Neo QLED', description: '65", 4K, 120 Гц, HDR10+, Smart TV. Гарантия.', price: 2800, category: 'electronics', subcategory: 'elec-tv', sku: 'QE65QN85C' },
  { title: 'Телевизор LG OLED55C3 55"', description: 'OLED, 4K, Dolby Vision, webOS 23.', price: 2200, category: 'electronics', subcategory: 'elec-tv', sku: 'OLED55C3' },
  { title: 'Колонка JBL PartyBox 310', description: '240 Вт, Bluetooth, подсветка, караоке.', price: 750, category: 'electronics', subcategory: 'elec-audio', sku: 'PB310' },
  { title: 'Sony Alpha A7 IV Body', description: '33 Мп, 4K 60p, автофокус по глазам. Пробег 8 тыс.', price: 4200, category: 'electronics', subcategory: 'elec-photo' },
  { title: 'PlayStation 5 Slim + 2 геймпада', description: 'Прошивка последняя, диск 1 ТБ. Игры в подарок.', price: 1300, category: 'electronics', subcategory: 'elec-game', isVip: true },
  { title: 'AirPods Pro 2 с USB-C', description: 'Шумоподавление, пространственный звук. Новые.', price: 450, category: 'electronics', subcategory: 'elec-headphones', sku: 'MTJV3' },

  // ═══ men ═══
  { title: 'Пуховик The North Face 700 Fill', description: 'Размер L, чёрный. Оригинал, носил 1 сезон.', price: 280, category: 'men', subcategory: 'men-top', sku: 'TNF-700' },
  { title: 'Кроссовки Nike Air Max 90, 43 размер', description: 'Белые, оригинал, идеальное состояние.', price: 150, category: 'men', subcategory: 'men-shoes', sku: 'AM90-WHT' },
  { title: "Джинсы Levi's 501 Original, 32/32", description: 'Классика, тёмно-синие. Новые с бирками.', price: 95, category: 'men', subcategory: 'men-casual', sku: 'LEVI501' },
  { title: 'Спортивный костюм Adidas Tiro 23', description: 'Размер M, чёрный/белый. Оригинал.', price: 110, category: 'men', subcategory: 'men-sport', sku: 'TIRO23' },

  // ═══ women ═══
  { title: 'Пальто Max Mara, шерсть, 44 размер', description: 'Бежевое, классический крой. Носила пару раз.', price: 450, category: 'women', subcategory: 'women-top' },
  { title: 'Ботильоны Zara, 38 размер', description: 'Чёрная кожа, каблук 7 см. Новые.', price: 85, category: 'women', subcategory: 'women-shoes' },
  { title: 'Платье Mango миди, цветочный принт', description: 'Размер S, лето 2025. С биркой.', price: 65, category: 'women', subcategory: 'women-dress' },
  { title: 'Сумка Michael Kors Jet Set', description: 'Кожа, цвет пудра. Оригинал, чек есть.', price: 190, category: 'women', subcategory: 'women-bags' },

  // ═══ beauty ═══
  { title: 'Крем La Roche-Posay Effaclar Duo+', description: '40 мл, запечатан. Срок до 2027.', price: 28, category: 'beauty', subcategory: 'beauty-care', sku: 'LRP-ED' },
  { title: 'Массажёр для тела Theragun Mini', description: 'Перкуссионный, 3 режима. Как новый.', price: 180, category: 'beauty', subcategory: 'beauty-body', sku: 'TG-MINI' },
  { title: 'Фен Dyson Supersonic HD08', description: 'Никель/медь, полный комплект насадок.', price: 650, category: 'beauty', subcategory: 'beauty-hair', sku: 'HD08-NK' },
  { title: 'Парфюм Tom Ford Oud Wood, 100 мл', description: 'Оригинал, остаток ~85 мл. Батч проверен.', price: 220, category: 'beauty', subcategory: 'beauty-perfume' },

  // ═══ kids ═══
  { title: 'Комбинезон Reima Tec, 92 размер', description: 'Зимний, -25°С, мембрана. Состояние отличное.', price: 75, category: 'kids', subcategory: 'kids-clothes' },
  { title: 'Конструктор LEGO Technic 42151', description: 'Bugatti Bolide, 905 деталей. Новый, запечатан.', price: 85, category: 'kids', subcategory: 'kids-toys', sku: '42151' },
  { title: 'Коляска Cybex Priam 4.0 3 в 1', description: 'Цвет Deep Black. Люлька, прогулка, автокресло.', price: 1200, category: 'kids', subcategory: 'kids-stroller' },
  { title: 'Кроватка-трансформер Можга Кристина', description: 'Бук, маятник, 3 уровня дна. До 5 лет.', price: 280, category: 'kids', subcategory: 'kids-furniture' },

  // ═══ furniture ═══
  { title: 'Диван угловой IKEA Friheten', description: 'Раскладной, с ящиком, ткань серая. Год использования.', price: 650, category: 'furniture', subcategory: 'furn-living' },
  { title: 'Кресло-реклайнер кожаное', description: 'Натуральная кожа, цвет коньяк. Механизм отлично работает.', price: 480, category: 'furniture', subcategory: 'furn-living' },
  { title: 'Кровать IKEA Malm 160x200 + матрас', description: 'Дуб, с ящиками. Матрас Hovag пружинный.', price: 520, category: 'furniture', subcategory: 'furn-bedroom' },
  { title: 'Кухня на заказ, фасады МДФ эмаль', description: 'Белая, 3.2 м, с техникой Bosch. Демонтаж, доставка.', price: 2800, category: 'furniture', subcategory: 'furn-kitchen' },
  { title: 'Стол письменный IKEA Bekant 160x80', description: 'Белый, регулируемая высота. Идеал.', price: 250, category: 'furniture', subcategory: 'furn-office' },

  // ═══ home ═══
  { title: 'Комплект постельного белья сатин', description: 'Двуспальный, хлопок 100%. Нежно-голубой.', price: 45, category: 'home', subcategory: 'home-textile', sku: 'BED-SAT' },
  { title: 'Картина на холсте «Абстракция», 80x120', description: 'Ручная работа, акрил. Красивые тона.', price: 120, category: 'home', subcategory: 'home-decor' },
  { title: 'Набор кастрюль Tefal Ingenio, 10 шт.', description: 'Антипригарное, съёмная ручка. Новый.', price: 180, category: 'home', subcategory: 'home-kitchen', sku: 'TF-ING10' },
  { title: 'Люстра подвесная LED, 60 см', description: 'Три режима света, пульт ДУ. Современный дизайн.', price: 95, category: 'home', subcategory: 'home-lighting' },

  // ═══ repair ═══
  { title: 'Перфоратор Bosch GBH 2-26 DRE', description: '800 Вт, 3 режима, SDS-Plus. Кейс, свёрла.', price: 210, category: 'repair', subcategory: 'repair-tools', sku: 'GBH226' },
  { title: 'Шуруповёрт Makita DDF484Z', description: '18V, бесщёточный, без АКБ. Новый.', price: 160, category: 'repair', subcategory: 'repair-tools', sku: 'DDF484Z' },
  { title: 'Ламинат Kronospan Дуб Натуральный 8 мм', description: '25 м², 33 класс, с фаской. Остаток со стройки.', price: 240, category: 'repair', subcategory: 'repair-materials' },
  { title: 'Унитаз Cersanit Carina подвесной', description: 'Безободковый, инсталляция Geberit в комплекте.', price: 350, category: 'repair', subcategory: 'repair-sanitary', sku: 'CARINA-K' },
  { title: 'Электрощиток в сборе на 24 модуля', description: 'ABB, автоматы, УЗО. Готовый для квартиры.', price: 280, category: 'repair', subcategory: 'repair-electric' },

  // ═══ garden ═══
  { title: 'Саженцы голубики Блюкроп, 3 года', description: '5 шт., высота 60 см. Крупноплодная.', price: 50, category: 'garden', subcategory: 'garden-plants' },
  { title: 'Секатор Fiskars PowerGear X L', description: 'Контактный, до 26 мм. Новый, в блистере.', price: 45, category: 'garden', subcategory: 'garden-tools', sku: 'PGX-L' },
  { title: 'Газонокосилка Husqvarna LC 140', description: 'Бензиновая, 40 см, мульчирование. Б/у 1 сезон.', price: 380, category: 'garden', subcategory: 'garden-tech' },

  // ═══ sport ═══
  { title: 'Беговая дорожка Xiaomi WalkingPad R2', description: 'Складная, до 12 км/ч, приложение Mi Fit.', price: 520, category: 'sport', subcategory: 'sport-fitness', sku: 'WP-R2' },
  { title: 'Палатка Tramp Mountain 4 V2', description: '4-местная, водостойкость 6000 мм. Новая.', price: 250, category: 'sport', subcategory: 'sport-outdoor' },
  { title: 'Велосипед Merida Big.Nine 200, рама 19"', description: '29", Shimano Deore, гидравлика. 2023 год.', price: 850, category: 'sport', subcategory: 'sport-bikes' },
  { title: 'Сноуборд Burton Custom 158 + крепления', description: 'All-mountain, средняя жёсткость. Сезон каталки.', price: 420, category: 'sport', subcategory: 'sport-winter' },
  { title: 'Коллекция монет СССР, 50 шт.', description: 'Юбилейные рубли 1965–1991. Альбом.', price: 300, category: 'sport', subcategory: 'sport-collect' },

  // ═══ work ═══
  { title: 'Повар в ресторан, Минск', description: 'Полная занятость, ЗП от 2500 BYN. Питание, график 2/2.', price: 2500, category: 'work', subcategory: 'work-vacancy' },
  { title: 'Менеджер по продажам, удалёнка', description: 'CRM, холодные звонки. Оклад + % от сделок.', price: 1800, category: 'work', subcategory: 'work-vacancy' },
  { title: 'Веб-разработчик, React/Next.js', description: '5 лет опыта, портфолио. Ищу проекты от 3000 BYN.', price: 3000, category: 'work', subcategory: 'work-resume' },
  { title: 'Курьер на своём авто, подработка', description: 'Доставка по Минску, свободный график. Выплаты ежедневно.', price: 80, category: 'work', subcategory: 'work-freelance' },

  // ═══ wedding ═══
  { title: 'Свадебное платье Pronovias, 42 размер', description: 'Кружево, А-силуэт, шлейф. Надевалось 1 раз.', price: 800, category: 'wedding', subcategory: 'wed-dress' },
  { title: 'Оформление свадьбы «под ключ»', description: 'Цветы, арка, рассадка, декор зала. От 500 BYN.', price: 500, category: 'wedding', subcategory: 'wed-decor' },
  { title: 'Свадебный фотограф + видеограф', description: 'Пакет «Весь день»: 500+ фото, клип, сырые видео.', price: 700, category: 'wedding', subcategory: 'wed-photo' },
  { title: 'Банкетный зал «Кристалл», 80 гостей', description: 'Центр города, кухня, караоке, парковка.', price: 1500, category: 'wedding', subcategory: 'wed-venue' },

  // ═══ animals ═══
  { title: 'Щенок золотистого ретривера', description: 'Мальчик, 3 мес., привит, документы РКФ.', price: 600, category: 'animals', subcategory: 'anim-dogs' },
  { title: 'Щенок немецкой овчарки, 2 мес.', description: 'Родители — чемпионы. Клеймо, паспорт.', price: 450, category: 'animals', subcategory: 'anim-dogs' },
  { title: 'Котёнок мейн-кун, рыжий мрамор', description: 'Девочка, 4 мес., привита, приучена к лотку.', price: 350, category: 'animals', subcategory: 'anim-cats' },
  { title: 'Попугай корелла, ручной', description: '8 мес., поёт, садится на руку. С клеткой.', price: 80, category: 'animals', subcategory: 'anim-birds' },
  { title: 'Аквариум Juwel Rio 180 + тумба', description: '180 л, фильтр, LED. Рыбки в подарок.', price: 320, category: 'animals', subcategory: 'anim-fish' },
  { title: 'Корм Royal Canin Maxi Adult 15 кг', description: 'Для крупных пород. Срок до 2027. Запечатан.', price: 85, category: 'animals', subcategory: 'anim-goods', sku: 'RC-MAXI' },
];

async function main() {
  console.log('📦 Seeding fake listings...\n');

  let seedUser = await prisma.user.findFirst({ where: { email: 'seed@shukai.by' } });
  if (!seedUser) {
    seedUser = await prisma.user.create({
      data: {
        email: 'seed@shukai.by',
        name: 'Shukai Demo',
        passwordHash: '$2b$10$placeholder',
        type: 'PERSONAL',
        phone: '+375291234567',
        city: 'Минск',
      },
    });
    console.log('  👤 Created seed user\n');
  }

  let created = 0;

  for (let i = 0; i < LISTINGS.length; i++) {
    const l = LISTINGS[i];
    const { oblast, raion } = loc(i);

    const existing = await prisma.listing.findFirst({
      where: { title: l.title, authorId: seedUser.id },
    });
    if (existing) {
      console.log(`  ⏭  "${l.title}" — already exists`);
      continue;
    }

    await prisma.listing.create({
      data: {
        title: l.title,
        description: l.description,
        price: l.price,
        image: PLACEHOLDER_IMG,
        images: [PLACEHOLDER_IMG],
        views: Math.floor(Math.random() * 500) + 10,
        rating: 0,
        date: today(),
        active: true,
        isVip: l.isVip ?? false,
        oblast,
        raion,
        category: l.category,
        subcategory: l.subcategory,
        sku: l.sku ?? null,
        authorId: seedUser.id,
      },
    });
    created++;
  }

  console.log(`\n✅ Done! Created ${created} listings (${LISTINGS.length - created} skipped as duplicates)`);

  const byCat = new Map<string, number>();
  for (const l of LISTINGS) {
    byCat.set(l.category, (byCat.get(l.category) ?? 0) + 1);
  }
  console.log('\n📊 By category:');
  for (const [cat, count] of [...byCat.entries()].sort((a, b) => b[1] - a[1])) {
    console.log(`   ${cat}: ${count}`);
  }
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
