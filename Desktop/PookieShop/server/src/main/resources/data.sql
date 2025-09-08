-- PookieShop seed (60 products) with category-matching images via loremflickr.com
-- Safe on H2: clears and re-inserts deterministic data.

DELETE FROM product;

-- ===== MUGS (1–6) =====
INSERT INTO product (id, name, description, price, category, image_url) VALUES
(1,  'Cozy Bear Mug A', 'Warm ceramic mug for cozy evenings.', 349.00, 'Mugs', 'https://loremflickr.com/800/600/mug,coffee?lock=1'),
(2,  'Cozy Bear Mug B', 'Pastel mug with soft matte finish.',   299.00, 'Mugs', 'https://loremflickr.com/800/600/mug,coffee?lock=2'),
(3,  'Cozy Bear Mug C', 'Large mug for long study sessions.',   399.00, 'Mugs', 'https://loremflickr.com/800/600/mug,coffee?lock=3'),
(4,  'Cozy Bear Mug D', 'Speckled glaze, rounded handle.',      329.00, 'Mugs', 'https://loremflickr.com/800/600/mug,coffee?lock=4'),
(5,  'Cozy Bear Mug E', 'Fluted edge, adorable vibe.',          369.00, 'Mugs', 'https://loremflickr.com/800/600/mug,coffee?lock=5'),
(6,  'Cozy Bear Mug F', 'Classic cream mug with bear emboss.',  349.00, 'Mugs', 'https://loremflickr.com/800/600/mug,coffee?lock=6');

-- ===== HOODIES (7–12) =====
INSERT INTO product (id, name, description, price, category, image_url) VALUES
(7,  'Cozy Bear Hoodie A', 'Super soft fleece hoodie.',       1299.00, 'Hoodies', 'https://loremflickr.com/800/600/hoodie,clothes?lock=7'),
(8,  'Cozy Bear Hoodie B', 'Pastel rose colorway.',           1199.00, 'Hoodies', 'https://loremflickr.com/800/600/hoodie,clothes?lock=8'),
(9,  'Cozy Bear Hoodie C', 'Peach with cream accents.',       1299.00, 'Hoodies', 'https://loremflickr.com/800/600/hoodie,clothes?lock=9'),
(10, 'Cozy Bear Hoodie D', 'Oversized comfy fit.',            1399.00, 'Hoodies', 'https://loremflickr.com/800/600/hoodie,clothes?lock=10'),
(11, 'Cozy Bear Hoodie E', 'Embroidered bear ears.',          1499.00, 'Hoodies', 'https://loremflickr.com/800/600/hoodie,clothes?lock=11'),
(12, 'Cozy Bear Hoodie F', 'Limited peach/cream edition.',    1599.00, 'Hoodies', 'https://loremflickr.com/800/600/hoodie,clothes?lock=12');

-- ===== TOTES (13–18) =====
INSERT INTO product (id, name, description, price, category, image_url) VALUES
(13, 'Pastel Tote - Rose',  'Canvas tote in rose.',           499.00, 'Totes', 'https://loremflickr.com/800/600/tote,bag?lock=13'),
(14, 'Pastel Tote - Peach', 'Canvas tote in peach.',          499.00, 'Totes', 'https://loremflickr.com/800/600/tote,bag?lock=14'),
(15, 'Pastel Tote - Cream', 'Sturdy cream tote.',             549.00, 'Totes', 'https://loremflickr.com/800/600/tote,bag?lock=15'),
(16, 'Pastel Tote - Sage',  'Soft sage color.',               549.00, 'Totes', 'https://loremflickr.com/800/600/tote,bag?lock=16'),
(17, 'Pastel Tote - Honey', 'Honey accent straps.',           599.00, 'Totes', 'https://loremflickr.com/800/600/tote,bag?lock=17'),
(18, 'Pastel Tote - Sky',   'Sky blue cute tote.',            499.00, 'Totes', 'https://loremflickr.com/800/600/tote,bag?lock=18');

-- ===== CANDLES (19–24) =====
INSERT INTO product (id, name, description, price, category, image_url) VALUES
(19, 'Warm Glow Candle A', 'Vanilla & honey notes.',          399.00, 'Candles', 'https://loremflickr.com/800/600/candle,aroma?lock=19'),
(20, 'Warm Glow Candle B', 'Peach cream scent.',              449.00, 'Candles', 'https://loremflickr.com/800/600/candle,aroma?lock=20'),
(21, 'Warm Glow Candle C', 'Lavender evening.',               449.00, 'Candles', 'https://loremflickr.com/800/600/candle,aroma?lock=21'),
(22, 'Warm Glow Candle D', 'Sandalwood comfort.',             399.00, 'Candles', 'https://loremflickr.com/800/600/candle,aroma?lock=22'),
(23, 'Warm Glow Candle E', 'Apple & cinnamon.',               449.00, 'Candles', 'https://loremflickr.com/800/600/candle,aroma?lock=23'),
(24, 'Warm Glow Candle F', 'Snowy pine morning.',             399.00, 'Candles', 'https://loremflickr.com/800/600/candle,aroma?lock=24');

-- ===== TOYS (25–30) =====
INSERT INTO product (id, name, description, price, category, image_url) VALUES
(25, 'Pookie Plush Mini A', 'Pocket-sized plush bear.',       599.00, 'Toys', 'https://loremflickr.com/800/600/teddy,bear,plush?lock=25'),
(26, 'Pookie Plush Mini B', 'Pastel pink plush.',             599.00, 'Toys', 'https://loremflickr.com/800/600/teddy,bear,plush?lock=26'),
(27, 'Pookie Plush Mini C', 'Pastel blue plush.',             599.00, 'Toys', 'https://loremflickr.com/800/600/teddy,bear,plush?lock=27'),
(28, 'Pookie Plush Mini D', 'Cream bear with bow.',           649.00, 'Toys', 'https://loremflickr.com/800/600/teddy,bear,plush?lock=28'),
(29, 'Pookie Plush Mini E', 'Honey hat plush.',               699.00, 'Toys', 'https://loremflickr.com/800/600/teddy,bear,plush?lock=29'),
(30, 'Pookie Plush Mini F', 'Birthday edition.',              749.00, 'Toys', 'https://loremflickr.com/800/600/teddy,bear,plush?lock=30');

-- ===== STATIONERY (31–36) =====
INSERT INTO product (id, name, description, price, category, image_url) VALUES
(31, 'Honeycomb Notebook A', '160 pages dotted.',             279.00, 'Stationery', 'https://loremflickr.com/800/600/notebook,stationery?lock=31'),
(32, 'Honeycomb Notebook B', 'Pastel cover - rose.',          249.00, 'Stationery', 'https://loremflickr.com/800/600/notebook,stationery?lock=32'),
(33, 'Honeycomb Notebook C', 'Pastel cover - peach.',         249.00, 'Stationery', 'https://loremflickr.com/800/600/notebook,stationery?lock=33'),
(34, 'Honeycomb Notebook D', 'Cream hardcover.',              299.00, 'Stationery', 'https://loremflickr.com/800/600/notebook,stationery?lock=34'),
(35, 'Honeycomb Notebook E', 'Sage softcover.',               229.00, 'Stationery', 'https://loremflickr.com/800/600/notebook,stationery?lock=35'),
(36, 'Honeycomb Notebook F', 'Sky blue softcover.',           229.00, 'Stationery', 'https://loremflickr.com/800/600/notebook,stationery?lock=36');

-- ===== KITCHEN (37–42) =====
INSERT INTO product (id, name, description, price, category, image_url) VALUES
(37, 'Honey Drizzle Spoon A', 'Wooden honey dipper.',         179.00, 'Kitchen', 'https://loremflickr.com/800/600/kitchen,spoon?lock=37'),
(38, 'Honey Drizzle Spoon B', 'Bee pattern handle.',          199.00, 'Kitchen', 'https://loremflickr.com/800/600/kitchen,spoon?lock=38'),
(39, 'Honey Drizzle Spoon C', 'Mini dipper set.',             249.00, 'Kitchen', 'https://loremflickr.com/800/600/kitchen,spoon?lock=39'),
(40, 'Cozy Bear Coaster A',  'Cork coaster set of 4.',        299.00, 'Kitchen', 'https://loremflickr.com/800/600/coaster,tea?lock=40'),
(41, 'Cozy Bear Coaster B',  'Pastel pattern set.',           299.00, 'Kitchen', 'https://loremflickr.com/800/600/coaster,tea?lock=41'),
(42, 'Cozy Bear Coaster C',  'Cream minimalist set.',         299.00, 'Kitchen', 'https://loremflickr.com/800/600/coaster,tea?lock=42');

-- ===== DECOR (43–48) =====
INSERT INTO product (id, name, description, price, category, image_url) VALUES
(43, 'Honeycomb Wall Decor A', 'Hexagon wall art.',           899.00, 'Decor', 'https://loremflickr.com/800/600/home,decor?lock=43'),
(44, 'Honeycomb Wall Decor B', 'Wooden honey shades.',        999.00, 'Decor', 'https://loremflickr.com/800/600/home,decor?lock=44'),
(45, 'Cozy Throw Blanket A',   'Cream knit blanket.',         1099.00, 'Decor', 'https://loremflickr.com/800/600/blanket,cozy?lock=45'),
(46, 'Cozy Throw Blanket B',   'Sage knit blanket.',          1199.00, 'Decor', 'https://loremflickr.com/800/600/blanket,cozy?lock=46'),
(47, 'Pookie Art Print A',     'A4 matte print.',             349.00, 'Decor', 'https://loremflickr.com/800/600/poster,print?lock=47'),
(48, 'Pookie Art Print B',     'A3 matte print.',             449.00, 'Decor', 'https://loremflickr.com/800/600/poster,print?lock=48');

-- ===== ACCESSORIES (49–54) =====
INSERT INTO product (id, name, description, price, category, image_url) VALUES
(49, 'Bear Ears Headband A', 'Soft plush ears.',              299.00, 'Accessories', 'https://loremflickr.com/800/600/hairband,accessory?lock=49'),
(50, 'Bear Ears Headband B', 'Pastel rose ears.',             299.00, 'Accessories', 'https://loremflickr.com/800/600/hairband,accessory?lock=50'),
(51, 'Bear Ears Headband C', 'Pastel peach ears.',            299.00, 'Accessories', 'https://loremflickr.com/800/600/hairband,accessory?lock=51'),
(52, 'Honey Pin Set A',       'Enamel pins set.',             349.00, 'Accessories', 'https://loremflickr.com/800/600/pin,badge?lock=52'),
(53, 'Honey Pin Set B',       'Pookie & paw pins.',           399.00, 'Accessories', 'https://loremflickr.com/800/600/pin,badge?lock=53'),
(54, 'Honey Pin Set C',       'Mini icon pack.',              349.00, 'Accessories', 'https://loremflickr.com/800/600/pin,badge?lock=54');

-- ===== BAGS (55–60) =====
INSERT INTO product (id, name, description, price, category, image_url) VALUES
(55, 'Pookie Canvas Bag A', 'Compact crossbody.',            999.00, 'Bags', 'https://loremflickr.com/800/600/bag,canvas?lock=55'),
(56, 'Pookie Canvas Bag B', 'Mini shoulder bag.',           1099.00, 'Bags', 'https://loremflickr.com/800/600/bag,canvas?lock=56'),
(57, 'Pookie Canvas Bag C', 'Everyday carry.',               1199.00, 'Bags', 'https://loremflickr.com/800/600/bag,canvas?lock=57'),
(58, 'Pookie Canvas Bag D', 'Weekender tote.',               1299.00, 'Bags', 'https://loremflickr.com/800/600/bag,canvas?lock=58'),
(59, 'Pookie Canvas Bag E', 'Sling with pockets.',           1099.00, 'Bags', 'https://loremflickr.com/800/600/bag,canvas?lock=59'),
(60, 'Pookie Canvas Bag F', 'Minimal cream sling.',           999.00, 'Bags', 'https://loremflickr.com/800/600/bag,canvas?lock=60');
