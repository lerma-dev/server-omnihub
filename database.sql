-- creacion de la base de datos
create database omnihub_db;
use omnihub_db;

-- creacion de la tabla usuarios
create table users(
  id_user int primary key auto_increment,
  nombre varchar(50) not null,
  apellido varchar(50) not null,
  correo varchar(100) not null,
  contrasena varchar(255) not null
);

-- creacion de la tabla para el catálogo de productos
CREATE TABLE productos (
  id_producto INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  descripcion VARCHAR(100),
  categoria VARCHAR(100),
  imagen VARCHAR(255),
  precio DECIMAL(10, 2) NOT NULL,
  stock INT
);

-- procedimiento almcendo para "Register"
DELIMITER //
CREATE PROCEDURE sp_register_user(
  IN p_name varchar(50),
  IN p_lastname varchar(50),
  IN p_email varchar(100),
  IN p_password varchar(255)
)
BEGIN
  INSERT INTO users (nombre, apellido, correo, contrasena) VALUES
  (p_name, p_lastname, p_email, p_password);
END //
DELIMITER ;

-- procedimiento almcendo para "Login"
DELIMITER //
CREATE PROCEDURE sp_login_user(IN p_email varchar(100))
BEGIN
  SELECT id_user, nombre, correo, contrasena
  FROM users
  WHERE correo = p_email;
END //
DELIMITER ;

-- procedimiento almcendo para el "Stock"
DELIMITER //
CREATE PROCEDURE sp_update_stock(IN p_id INT)
BEGIN
  UPDATE productos 
  SET stock = stock - 1 
  WHERE id_producto = p_id
  AND stock > 0;
END //
DELIMITER ;


-- inserciones de productos
INSERT INTO productos (nombre, descripcion, categoria, imagen, precio, stock) VALUES
('Tarjeta Regalo Netflix $500 MXN', 
'Acceso ilimitado a tus series y películas favoritas en 4K. Válido para cuentas nuevas o existentes.', 
'Tarjetas de Regalo', 'https://http2.mlstatic.com/D_NQ_NP_881407-MLM51955587935_102022-O.webp', 500.00, 50),

('Spotify Premium - 3 Meses', 
'Disfruta de música sin anuncios y modo offline. El regalo perfecto para los amantes del audio.', 
'Streaming', 'https://http2.mlstatic.com/D_NQ_NP_872863-MLM78096311087_072024-O.webp', 345.00, 100),

('Xbox Game Pass Ultimate', 
'Acceso a más de 100 juegos de alta calidad y membresía de EA Play incluida por 1 mes.', 
'Videojuegos', 'https://www.codigi.mx/wp-content/uploads/2022/09/XBOX-GAME-PASS-ULTIMATE-COVER.jpg', 249.00, 30),

('Crunchyroll Fan - 12 Meses', 
'Disfruta del mejor anime sin publicidad, directamente desde Japón, en todos tus dispositivos.', 
'Streaming', 'https://http2.mlstatic.com/D_NQ_NP_868431-MLM103274719422_012026-O.webp', 1250.00, 15),

('Steam Wallet Code $20 USD', 
'Añade fondos a tu cartera de Steam y compra los mejores títulos durante las rebajas de temporada.', 
'Videojuegos', 'https://m.media-amazon.com/images/I/51pXuK9eosL._AC_UF350,350_QL50_.jpg', 420.00, 25);