# Note Taker
![GitHub license](https://img.shields.io/badge/Made%20by-%40Eng.JordanNaei-orange)
![License](https://img.shields.io/badge/License-ISC-blue.svg "License Badge")

# Description
In this project we created an interfaces that make it easy for non-developers to view and interact with information stored in databases. 

## User Story

As a business owner
I want to be able to view and manage the departments, roles, and employees in my company
So that I can organize and plan my business

## Acceptance Criteria

Add departments, roles, employees (Pass)
View departments, roles, employees (Pass)
View employees by manager (Pass)
Delete departments, roles, and employees (Pass)
iew the total utilized budget of a department(Fail)

# Application Functionalities illustration video
![Git](Assets/app.gif)
[Video Link](https://drive.google.com/file/d/1c2nS3zIwf2QqYfQfTVau4YpzGzX5bUUJ/view)


# Installation
1- Ensure initilazing the application with nmp i, to include all dependent modules included in the package.json file.

# Database Design
Design the following database schema containing three tables:

* **department**:

  * **id** - INT PRIMARY KEY
  * **name** - VARCHAR(30) to hold department name

* **role**:

  * **id** - INT PRIMARY KEY
  * **title** -  VARCHAR(30) to hold role title
  * **salary** -  DECIMAL to hold role salary
  * **department_id** -  INT to hold reference to department role belongs to

* **employee**:

  * **id** - INT PRIMARY KEY
  * **first_name** - VARCHAR(30) to hold employee first name
  * **last_name** - VARCHAR(30) to hold employee last name
  * **role_id** - INT to hold reference to role employee has
  * **manager_id** - INT to hold reference to another employee that manager of the current employee. This field may be null if the employee has no 

# Test
Minimal testing has been conducted due to limited capacity

# Repository

- [Project Repo](https://github.com/JordanNaei/employeeTracker)

