USE work_db;

INSERT INTO department (department_name)
VALUES ("Human Resources");
INSERT INTO department (department_name)
VALUES ("Technical");
INSERT INTO department (department_name)
VALUES ("Legal");
INSERT INTO department (department_name)
VALUES ("Finance");

INSERT INTO roles (title, salary, department_id)
VALUES ("Executive Financial Advisor", 125000, 4);
INSERT INTO roles (title, salary, department_id)
VALUES ("Tech Lead", 150000, 2);
INSERT INTO roles (title, salary, department_id)
VALUES ("Human Resources Advisor", 90000, 1);
INSERT INTO roles (title, salary, department_id)
VALUES ("Legal Advisor", 200000, 3);
INSERT INTO roles (title, salary, department_id)
VALUES ("Accountant", 50000, 4);
INSERT INTO roles (title, salary, department_id)
VALUES ("Software Engineer", 100000, 2);
INSERT INTO roles (title, salary, department_id)
VALUES ("Junior Engineer", 70000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
Values ("Johny", "Appleseed", 1, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
Values ("Chris", "Hansen", 2, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
Values ("Jill", "Pill", 3, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
Values ("Phoenix", "Wright", 4, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
Values ("Mike", "Wozowski", 5, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
Values ("Jimmy", "Hill", 6, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
Values ("Clyde", "Cash", 6, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
Values ("Bojak", "Horseman", 6, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
Values ("SpongeBob", "SquarePants", 7, 2);
