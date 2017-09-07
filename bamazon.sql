DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
	id INTEGER(10) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(40),
	department_name VARCHAR(40),
	price INTEGER(10),
	stock_quantity INTEGER(10),
	primary key(id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Floppy Green Hat', 'Clothing', 15, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Green Tunic', 'Clothing', 45, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Master Sword', 'Weapons', 500, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Hookshot', 'Weapons', 350, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Ocarina', 'Items', 80, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Bottle', 'Items', 5, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Steel Boots', 'Items', 350, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Bomb Bag', 'Items', 25, 7);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Boomerang', 'Weapons', 40, 11);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Lantern', 'Items', 50, 17);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Bow', 'Weapons', 20, 8);

SELECT * FROM products;
