-- scripts/init-sqlite.sql

-- Create continents table
CREATE TABLE IF NOT EXISTS continents (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  code VARCHAR(2) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create countries table
CREATE TABLE IF NOT EXISTS countries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  code VARCHAR(2) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  native_name VARCHAR(100),
  capital VARCHAR(100),
  continent_id INTEGER NOT NULL,
  population BIGINT,
  area_km2 DECIMAL(15,2),
  currency_code VARCHAR(3),
  phone_code VARCHAR(10),
  tld VARCHAR(10),
  is_active BOOLEAN DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  deleted_at DATETIME,
  FOREIGN KEY (continent_id) REFERENCES continents(id)
);

-- Insert continents
INSERT OR IGNORE INTO continents (code, name) VALUES 
  ('AF', 'Africa'),
  ('AN', 'Antarctica'),
  ('AS', 'Asia'),
  ('EU', 'Europe'),
  ('NA', 'North America'),
  ('OC', 'Oceania'),
  ('SA', 'South America');

-- Insert countries
INSERT OR IGNORE INTO countries (code, name, native_name, capital, continent_id, population, area_km2, currency_code, phone_code, tld) VALUES
  ('NG', 'Nigeria', 'Nigeria', 'Abuja', 1, 206139589, 923768, 'NGN', '+234', '.ng'),
  ('ZA', 'South Africa', 'South Africa', 'Pretoria', 1, 59308690, 1221037, 'ZAR', '+27', '.za'),
  ('EG', 'Egypt', 'مصر', 'Cairo', 1, 102334404, 1002450, 'EGP', '+20', '.eg'),
  ('KE', 'Kenya', 'Kenya', 'Nairobi', 1, 53771296, 580367, 'KES', '+254', '.ke'),
  ('GH', 'Ghana', 'Ghana', 'Accra', 1, 31072940, 238533, 'GHS', '+233', '.gh'),
  ('IN', 'India', 'भारत', 'New Delhi', 3, 1380004385, 3287263, 'INR', '+91', '.in'),
  ('CN', 'China', '中国', 'Beijing', 3, 1439323776, 9596961, 'CNY', '+86', '.cn'),
  ('JP', 'Japan', '日本', 'Tokyo', 3, 126476461, 377975, 'JPY', '+81', '.jp'),
  ('KR', 'South Korea', '대한민국', 'Seoul', 3, 51780579, 100210, 'KRW', '+82', '.kr'),
  ('ID', 'Indonesia', 'Indonesia', 'Jakarta', 3, 273523615, 1904569, 'IDR', '+62', '.id'),
  ('GB', 'United Kingdom', 'United Kingdom', 'London', 4, 67886011, 243610, 'GBP', '+44', '.uk'),
  ('DE', 'Germany', 'Deutschland', 'Berlin', 4, 83783942, 357022, 'EUR', '+49', '.de'),
  ('FR', 'France', 'France', 'Paris', 4, 65273511, 640679, 'EUR', '+33', '.fr'),
  ('IT', 'Italy', 'Italia', 'Rome', 4, 60461826, 301340, 'EUR', '+39', '.it'),
  ('ES', 'Spain', 'España', 'Madrid', 4, 46754778, 505992, 'EUR', '+34', '.es'),
  ('US', 'United States', 'United States', 'Washington D.C.', 5, 331002651, 9833517, 'USD', '+1', '.us'),
  ('CA', 'Canada', 'Canada', 'Ottawa', 5, 37742154, 9984670, 'CAD', '+1', '.ca'),
  ('MX', 'Mexico', 'México', 'Mexico City', 5, 128932753, 1964375, 'MXN', '+52', '.mx'),
  ('BR', 'Brazil', 'Brasil', 'Brasília', 7, 212559417, 8515767, 'BRL', '+55', '.br'),
  ('AR', 'Argentina', 'Argentina', 'Buenos Aires', 7, 45195774, 2780400, 'ARS', '+54', '.ar'),
  ('CL', 'Chile', 'Chile', 'Santiago', 7, 19116201, 756102, 'CLP', '+56', '.cl'),
  ('AU', 'Australia', 'Australia', 'Canberra', 6, 25499884, 7692024, 'AUD', '+61', '.au'),
  ('NZ', 'New Zealand', 'New Zealand', 'Wellington', 6, 4822233, 268838, 'NZD', '+64', '.nz');