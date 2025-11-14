-- Script de données de test pour AutoLink
-- Ce script est exécuté automatiquement au démarrage si spring.jpa.hibernate.ddl-auto=create ou create-drop

-- Insertion d'utilisateurs de test
-- Les mots de passe sont hashés avec BCrypt: "password" = $2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy

INSERT INTO users (first_name, last_name, email, password, phone, role, is_verified, city, created_at, updated_at)
VALUES 
  ('Jean', 'Dupont', 'jean.dupont@email.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '+221 33 123 45 67', 'BUYER', true, 'Dakar', NOW(), NOW()),
  ('Marie', 'Diop', 'marie.diop@email.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '+221 33 987 65 43', 'SELLER', true, 'Dakar', NOW(), NOW()),
  ('Amadou', 'Sarr', 'amadou.sarr@email.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '+221 33 555 44 33', 'SUPERVISOR', true, 'Dakar', NOW(), NOW()),
  ('Fatou', 'Ndiaye', 'fatou.ndiaye@email.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '+221 33 111 22 33', 'SELLER', true, 'Thiès', NOW(), NOW()),
  ('Ibrahima', 'Ba', 'ibrahima.ba@email.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '+221 33 444 55 66', 'BUYER', false, 'Kaolack', NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Insertion de véhicules de test
INSERT INTO vehicles (make, model, year, price, rental_price_per_day, rental_price_per_week, rental_price_per_month, mileage, fuel_type, transmission, seats, doors, color, condition, is_rental, description, city, latitude, longitude, available_from, available_to, pickup_location, views, favorites_count, is_active, user_id, created_at, updated_at)
VALUES 
  -- Véhicules à vendre
  ('Toyota', 'Corolla', 2022, 8500000, NULL, NULL, NULL, 15000, 'ESSENCE', 'AUTOMATIQUE', 5, 4, 'Blanc', 'Excellent', false, 
   'Véhicule en excellent état, parfaitement entretenu. Première main, tous les entretiens effectués chez le concessionnaire officiel Toyota. Système de navigation intégré, climatisation automatique, vitres électriques.', 
   'Dakar', 14.7167, -17.4677, NULL, NULL, NULL, 245, 18, true, 
   (SELECT id FROM users WHERE email = 'marie.diop@email.com'), NOW(), NOW()),
  
  ('Peugeot', '3008', 2023, 12000000, NULL, NULL, NULL, 5000, 'ESSENCE', 'AUTOMATIQUE', 5, 5, 'Noir', 'Excellent', false,
   'SUV Peugeot 3008 en excellent état, très peu kilométré. Toutes les options, toit ouvrant panoramique, système audio premium.',
   'Dakar', 14.7167, -17.4677, NULL, NULL, NULL, 189, 12, true,
   (SELECT id FROM users WHERE email = 'marie.diop@email.com'), NOW(), NOW()),
  
  ('Hyundai', 'Tucson', 2023, 9500000, NULL, NULL, NULL, 12000, 'ESSENCE', 'AUTOMATIQUE', 5, 5, 'Bleu', 'Excellent', false,
   'Hyundai Tucson 2023, très bon état. Climatisation, GPS, caméra de recul, régulateur de vitesse.',
   'Dakar', 14.7167, -17.4677, NULL, NULL, NULL, 156, 8, true,
   (SELECT id FROM users WHERE email = 'fatou.ndiaye@email.com'), NOW(), NOW()),
  
  ('Kia', 'Sportage', 2023, 7800000, NULL, NULL, NULL, 6000, 'ESSENCE', 'AUTOMATIQUE', 5, 5, 'Gris', 'Excellent', false,
   'Kia Sportage 2023, état impeccable. Première main, garantie constructeur encore valable.',
   'Thiès', 14.7833, -16.9167, NULL, NULL, NULL, 98, 5, true,
   (SELECT id FROM users WHERE email = 'fatou.ndiaye@email.com'), NOW(), NOW()),
  
  ('Mercedes-Benz', 'Classe C', 2022, 18000000, NULL, NULL, NULL, 18000, 'DIESEL', 'AUTOMATIQUE', 5, 4, 'Noir', 'Très bon', false,
   'Mercedes Classe C 2022, véhicule de prestige en très bon état. Intérieur cuir, toutes les options.',
   'Dakar', 14.7167, -17.4677, NULL, NULL, NULL, 312, 25, true,
   (SELECT id FROM users WHERE email = 'marie.diop@email.com'), NOW(), NOW()),
  
  -- Véhicules à louer
  ('Toyota', 'Hilux', 2023, 0, 35000, 200000, 700000, 8000, 'DIESEL', 'MANUELLE', 5, 4, 'Gris', 'Excellent', true,
   'Toyota Hilux 2023, parfait pour les déplacements longue distance. Très robuste et fiable. Disponible pour location courte ou longue durée.',
   'Thiès', 14.7833, -16.9167, '2024-01-01', '2024-12-31', 'Thiès, Sénégal', 167, 14, true,
   (SELECT id FROM users WHERE email = 'marie.diop@email.com'), NOW(), NOW()),
  
  ('Renault', 'Duster', 2021, 0, 25000, 150000, 550000, 25000, 'DIESEL', 'MANUELLE', 5, 5, 'Rouge', 'Très bon', true,
   'Renault Duster 2021, SUV robuste idéal pour les routes sénégalaises. Disponible immédiatement.',
   'Kaolack', 14.1500, -16.0833, '2024-01-01', '2024-12-31', 'Kaolack, Sénégal', 134, 9, true,
   (SELECT id FROM users WHERE email = 'fatou.ndiaye@email.com'), NOW(), NOW()),
  
  ('Nissan', 'Navara', 2021, 0, 30000, 180000, 650000, 30000, 'DIESEL', 'MANUELLE', 5, 4, 'Blanc', 'Très bon', true,
   'Nissan Navara 2021, pick-up confortable et spacieux. Parfait pour les familles et les professionnels.',
   'Ziguinchor', 12.5833, -16.2667, '2024-01-01', '2024-12-31', 'Ziguinchor, Sénégal', 89, 6, true,
   (SELECT id FROM users WHERE email = 'marie.diop@email.com'), NOW(), NOW()),
  
  ('Mercedes-Benz', 'Classe C', 2022, 0, 45000, 280000, 950000, 18000, 'DIESEL', 'AUTOMATIQUE', 5, 4, 'Noir', 'Excellent', true,
   'Mercedes Classe C 2022 de luxe disponible à la location. Confort premium, toutes les options.',
   'Dakar', 14.7167, -17.4677, '2024-01-01', '2024-12-31', 'Dakar, Sénégal', 201, 18, true,
   (SELECT id FROM users WHERE email = 'marie.diop@email.com'), NOW(), NOW()),
  
  ('BMW', 'X5', 2023, 0, 50000, 300000, 1000000, 5000, 'ESSENCE', 'AUTOMATIQUE', 7, 5, 'Blanc', 'Excellent', true,
   'BMW X5 2023, SUV de luxe 7 places. Parfait pour les familles nombreuses. Disponible à la location.',
   'Dakar', 14.7167, -17.4677, '2024-01-01', '2024-12-31', 'Dakar, Sénégal', 178, 15, true,
   (SELECT id FROM users WHERE email = 'marie.diop@email.com'), NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Insertion d'images pour les véhicules
INSERT INTO vehicle_images (vehicle_id, image_url)
SELECT v.id, image_url
FROM vehicles v
CROSS JOIN (
  VALUES 
    ('https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&h=600&fit=crop'),
    ('https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop'),
    ('https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=600&fit=crop'),
    ('https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop'),
    ('https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&h=600&fit=crop')
) AS images(image_url)
WHERE v.make = 'Toyota' AND v.model = 'Corolla'
ON CONFLICT DO NOTHING;

-- Insertion de caractéristiques pour les véhicules
INSERT INTO vehicle_features (vehicle_id, feature)
SELECT v.id, feature
FROM vehicles v
CROSS JOIN (
  VALUES 
    ('Climatisation automatique'),
    ('Système de navigation'),
    ('Bluetooth'),
    ('Vitres électriques'),
    ('Rétroviseurs électriques'),
    ('Airbags multiples'),
    ('ABS'),
    ('ESP'),
    ('Contrôle de stabilité'),
    ('Régulateur de vitesse'),
    ('Ordinateur de bord'),
    ('Radio CD/MP3'),
    ('Caméra de recul'),
    ('Toit ouvrant'),
    ('Sièges en cuir')
) AS features(feature)
WHERE v.id IN (SELECT id FROM vehicles LIMIT 3)
ON CONFLICT DO NOTHING;

-- Insertion de favoris de test
INSERT INTO favorites (user_id, vehicle_id, created_at)
SELECT 
  u.id,
  v.id,
  NOW()
FROM users u
CROSS JOIN vehicles v
WHERE u.email = 'jean.dupont@email.com'
  AND v.id IN (SELECT id FROM vehicles WHERE is_rental = false LIMIT 2)
ON CONFLICT DO NOTHING;

-- Mise à jour du compteur de favoris
UPDATE vehicles v
SET favorites_count = (
  SELECT COUNT(*) 
  FROM favorites f 
  WHERE f.vehicle_id = v.id
);

