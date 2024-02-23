CREATE DATABASE Condominio;

use Condominio;

CREATE TABLE auth  (
	id INT AUTO_INCREMENT  PRIMARY KEY NOT NULL,
	name VARCHAR(70) NOT NULL,
	login VARCHAR(100) NOT NULL UNIQUE,
	password VARCHAR(255) NOT NULL,
	permission VARCHAR(50) NOT NULL DEFAULT 'user',
	timestamp_col TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	
);

CREATE TABLE locations  (
	id INT AUTO_INCREMENT  PRIMARY KEY NOT NULL,
	location_name VARCHAR(100) NOT NULL UNIQUE,
	status VARCHAR(40) DEFAULT 'void',
	timestamp_col TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	
);

CREATE TABLE notices  (
	id INT AUTO_INCREMENT  PRIMARY KEY NOT NULL,
	title VARCHAR(100) NOT NULL,
	body TEXT,
	author INT NOT NULL,
	timestamp_col TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	
	FOREIGN KEY (author) REFERENCES auth(id)
	
);


CREATE TABLE housings  (
	id INT AUTO_INCREMENT  PRIMARY KEY NOT NULL,
	owner_full_name VARCHAR(100) NOT NULL,
	owner_cpf VARCHAR(11) NOT NULL UNIQUE ,
	owner_birthday DATE,
	authId INT NOT NULL,
	locationId INT,
	timestamp_col TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	
	FOREIGN KEY (locationId) REFERENCES locations(id),
	FOREIGN KEY (authId) REFERENCES auth(id)

);


CREATE TABLE requests  (
	id INT AUTO_INCREMENT  PRIMARY KEY NOT NULL,
	title VARCHAR(100) NOT NULL,
	description TEXT NOT NULL,
	status VARCHAR(30) NOT NULL DEFAULT 'pending',
	housingId INT NOT NULL,
	timestamp_col TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	
	
	FOREIGN KEY (housingId) REFERENCES housings(id)
	
);

CREATE TABLE peoples  (
	id INT AUTO_INCREMENT  PRIMARY KEY NOT NULL,
	full_name VARCHAR(100) NOT NULL,
	cpf VARCHAR(11) NOT NULL UNIQUE,
	type VARCHAR(30) NOT NULL DEFAULT 'resident',
	pathDocument VARCHAR(255),
	housingId INT NOT NULL,
	timestamp_col TIMESTAMP DEFAULT CURRENT_TIMESTAMP,	
	
	FOREIGN KEY (housingId) REFERENCES housings(id)
	
);

CREATE TABLE finances (
	id INT AUTO_INCREMENT  PRIMARY KEY NOT NULL,
	description VARCHAR(60) NOT NULL,
	reference VARCHAR(6) NOT NULL,
	value FLOAT NOT NULL,
	status VARCHAR(30) NOT NULL DEFAULT 'pending',
	housingId INT NOT NULL,
	timestamp_col TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	
	FOREIGN KEY (housingId) REFERENCES housings(id)
	
);

