/* Seeds for SQL table. We haven't discussed this type of file yet */
USE boston;

INSERT INTO deparments (name)
VALUES ("Administration"), ("Human Resources"), ("Marketing"), ("Customer Care"), ('IT');


INSERT into role (title, salary, department_id) VALUES ("Store Manager", 100000, 1);
INSERT into role (title, salary, department_id) VALUES ("Asst Manger", 80000, 1);
INSERT into role (title, salary, department_id) VALUES ("HR Specialist", 80000, 2);
INSERT into role (title, salary, department_id) VALUES ("Marketing Lead", 100000, 3);
INSERT into role (title, salary, department_id) VALUES ("Team Leader", 50000, 4);
INSERT into role (title, salary, department_id) VALUES ("Team Member", 35000, 4);
INSERT into role (title, salary, department_id) VALUES ("IT Manager", 100000, 5);
INSERT into role (title, salary, department_id) VALUES ("Engineer", 900000, 5);


INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Steph", "Steele", 1, null);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Jason", "Spague", 2, 1);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Lisa", "Gaye", 2, 1);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Shelly", "Long", 3, 1);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Richard", "Gabaree", 4, 1);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Doyle", "Doyle", 5, 2);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Mike", "Bepko", 6, 5);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Becca", "Romaine", 6, 5);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Tracey", "Aycock", 6, 5);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("David", "Jones", 6, 5);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Johnny", "Sprocket", 7, null);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Jimmy", "Nuetron", 8, 7);
