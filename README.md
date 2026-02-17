# Legumifruit

## Overview

Legumifruit is a fullstack web application designed to help users discover seasonal fruits and vegetables.

The project was initially developed as a final-year project during my apprenticeship, with the objective of building a complete application combining API design, backend logic and frontend integration.

The application is designed to be scalable and could evolve into a broader platform including blog articles, additional content sections and new features related to seasonal food and nutrition.

---

## Goals

- Provide a clear overview of seasonal fruits and vegetables
- Build a complete fullstack application from API to frontend
- Structure a scalable backend architecture
- Practice real-world API consumption and data management
- Ensure maintainable and modular code organization

---

## Tech Stack

### Backend
- Symfony
- API Platform
- PHP
- MySQL

### Frontend
- React
- JavaScript
- SCSS

### Tools
- Webpack
- Git

---

## Features

- Seasonal fruits and vegetables listing
- API-driven architecture
- CRUD operations via API Platform
- Frontend consumption of REST endpoints
- Responsive interface
- Structured backend entities and migrations

---

## Technical Focus

This project focuses on:

- Designing and exposing a REST API using API Platform
- Separating backend and frontend responsibilities
- Managing data persistence and migrations
- Structuring a scalable Symfony project
- Connecting a React frontend to a Symfony API
- Maintaining clean and organized project architecture

---

## Project Structure

- /src → Symfony backend logic
- /assets → Frontend resources
- /migrations → Database migrations
- /public → Public assets
- /config → Symfony configuration

---

## Installation

```bash
git clone https://github.com/robinPoncon/Legumifruit.git
cd Legumifruit
```

### Backend

```bash
composer install
symfony server:start
```

### Frontend

```bash
npm install
npm run dev
```

