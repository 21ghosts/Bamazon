DROP DATABASE IF EXISTS bamazon_db;
CREATE database bamazon_db;
USE bamazon_db;

CREATE TABLE products (
    item_id INT(10) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(5,2) NOT NULL,
    stock_count INT(10) NOT NULL,
    PRIMARY KEY (item_id),
);

INSERT INTO products (product_name, department_name, price, stock_count)
VALUE 
('Sliding Door','Millworks', 200.98, 47),
('Treated 2x4','Building Materials', 3.25, 800),
('Washing Machine','Appliances', 300.00, 82),
('Knockout Rose','Nursery', 16.47, 250),
('Premium Mulch','Nursery', 3.99, 623),
('Cat5 Cable','Rough Electrical', 19.00, 250),
('Porter-cable Drill','Tools', 47.00, 190),
('Deck Nails','Hardware', 16.21, 300),
('Table Saw','Tools', 149.98, 40),
('Jacuzzi Bath','Fashion Plumbing', 768.00, 150);

SELECT * FROM products;

