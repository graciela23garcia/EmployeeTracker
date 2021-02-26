USE employeesDB;
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mark", "Johnnson", 3, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Macie", "Sean", 2, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Martha", "Lauren", 1, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Barista", 10000, 1)
INSERT INTO role (title, salary, department_id)
VALUES ("Coffee Stand Manager", 20000, 1)
INSERT INTO role (title, salary, department_id)
VALUES ("Barista2", 30000, 1)
INSERT INTO department (name)
VALUES ("Coffee Stand")
