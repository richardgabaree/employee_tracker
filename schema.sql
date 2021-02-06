create database employeetracker_db;

use employeetracker_db;

create table department (
id integer(20) auto_increment not null primary key,
name varchar(30)
);

create table employee (
id int(20) auto_increment primary key not null,
first_name varchar(30),
last_name varchar(30),
role_id integer(20),
manager_id integer(30)
);

create table role (
id int(20) auto_increment primary key not null,
title varchar(30),
salary decimal,
department_id integer(20)
);