-- =============================================
-- STRANGER THINGS EXPERIENCE - SETUP DO BANCO
-- Execute este SQL no Supabase SQL Editor
-- =============================================

-- Tabela de usuários (autenticação própria)
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de cidades
CREATE TABLE IF NOT EXISTS cities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  country TEXT NOT NULL,
  image_url TEXT,
  tickets_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de eventos
CREATE TABLE IF NOT EXISTS events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  city_id UUID REFERENCES cities(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  capacity INTEGER DEFAULT 100,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de reservas
CREATE TABLE IF NOT EXISTS bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  total_price NUMERIC(10, 2) NOT NULL,
  status TEXT DEFAULT 'confirmed' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de depoimentos
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  author TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- DADOS INICIAIS (SEED)
-- =============================================

-- Cidades
INSERT INTO cities (name, country, image_url, tickets_available) VALUES
  ('Sidney', 'Austrália', '/imagens/card1.webp', true),
  ('Cidade do México', 'México', '/imagens/card2.webp', true),
  ('Yas Island', 'Emirados Árabes', '/imagens/card3.webp', true),
  ('São Paulo', 'Brasil', '/imagens/card1.webp', true),
  ('Rio de Janeiro', 'Brasil', '/imagens/card2.webp', true);

-- Eventos (usando subquery para pegar os IDs das cidades)
INSERT INTO events (city_id, title, description, date, price, capacity)
SELECT id, 'Stranger Things: The Experience - Sidney', 'Uma experiência imersiva original com efeitos especiais 3D e sala de escape telecinética.', '2026-04-15', 89.90, 200
FROM cities WHERE name = 'Sidney';

INSERT INTO events (city_id, title, description, date, price, capacity)
SELECT id, 'Stranger Things: Upside Down Tour', 'Tour guiado pelo Mundo Invertido com efeitos práticos e atores.', '2026-05-20', 120.00, 150
FROM cities WHERE name = 'Sidney';

INSERT INTO events (city_id, title, description, date, price, capacity)
SELECT id, 'Stranger Things: La Experiencia', 'Experiência interativa com cenários recriados da série.', '2026-04-10', 75.50, 180
FROM cities WHERE name = 'Cidade do México';

INSERT INTO events (city_id, title, description, date, price, capacity)
SELECT id, 'Stranger Things: Desert Experience', 'Experiência noturna no deserto com projeções e efeitos especiais.', '2026-06-01', 150.00, 100
FROM cities WHERE name = 'Yas Island';

INSERT INTO events (city_id, title, description, date, price, capacity)
SELECT id, 'Stranger Things: A Experiência SP', 'Mergulhe no universo de Stranger Things em São Paulo.', '2026-05-15', 69.90, 250
FROM cities WHERE name = 'São Paulo';

INSERT INTO events (city_id, title, description, date, price, capacity)
SELECT id, 'Stranger Things: Mundo Invertido RJ', 'Experiência imersiva no Rio de Janeiro.', '2026-06-20', 79.90, 200
FROM cities WHERE name = 'Rio de Janeiro';

-- Depoimentos
INSERT INTO testimonials (author, content, image_url) VALUES
  ('The New York Times', 'Guests are immersed into an original "Stranger Things" storyline...[it] combines the special effects of a 3D Universal Studios ride with a telekinetic escape room.', '/imagens/img-dep1.webp'),
  ('Entertainment Weekly', 'A must-see experience for fans of the show. The attention to detail is incredible and the immersive technology is top-notch.', '/imagens/img-dep2.webp'),
  ('Variety', 'One of the best immersive experiences we have ever attended. The combination of practical effects and digital technology creates something truly magical.', '/imagens/img-dep3.webp');

-- =============================================
-- PERMISSÕES (Row Level Security)
-- =============================================

-- Habilitar RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Políticas públicas (leitura liberada)
CREATE POLICY "Cities são públicas" ON cities FOR SELECT USING (true);
CREATE POLICY "Events são públicos" ON events FOR SELECT USING (true);
CREATE POLICY "Testimonials são públicos" ON testimonials FOR SELECT USING (true);

-- Políticas de users (service role gerencia)
CREATE POLICY "Service role gerencia users" ON users USING (true) WITH CHECK (true);

-- Políticas de bookings (service role gerencia)
CREATE POLICY "Service role gerencia bookings" ON bookings USING (true) WITH CHECK (true);
