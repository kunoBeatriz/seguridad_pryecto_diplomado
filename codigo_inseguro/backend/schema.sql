--DROP TABLE IF EXISTS users;
--DROP TABLE IF EXISTS guests;


CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
);


CREATE TABLE IF NOT EXISTS guests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    table_number INTEGER,
    side TEXT, 
    obsequio TEXT
);


CREATE TABLE IF NOT EXISTS gifts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cerveza INTEGER,
    dinero INTEGER,
    presente TEXT, 
    id_guest INTEGER 
);