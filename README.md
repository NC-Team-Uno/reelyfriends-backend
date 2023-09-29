# ReelyFriends

This API was created to serve as the backend for our ReelyFriends full-stack react native application. It uses Mongoose and Express to connects to a MongoDB Atlas database.

## Table of Contents

- [Demo](#demo)
- [Description](#description)
- [Getting Started](#getting-started)
  - [Minimum requirements](#minimum-requirements)
  - [Installation](#installation)
  - [Setting Up the Database](#setting-up-the-database)
  - [Running Tests](#running-tests)
- [Contact](#contact)

## Demo

View the hosted version of the project at: https://reelyfriends-api-mnnh.onrender.com/users

## Description

There are several endpoints available for the API:

/users - All users who have an account in the app
/users/username - A specific user
/groups - All groups currently in the app, made up of users
/groups/groupname - A specific group

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Minimum requirements

Before you begin, ensure you have Node.js [v20.5.0] installed and access to your MongoDB Atlas database:

### Installation

1. Clone the repository:

```bash
git clone https://github.com/NC-Team-Uno/reelyfriends-backend
```

2. Install dependencies:

```bash
npm install
```

### Setting up the database

1. You will need to create a .env file: '.env'. Add a 'DATABASE_URL=' variable (for tests add a second variable 'TEST_DATABASE_URL'), and assign it the correct url that points to your database.

2. Create and seed the database:

```bash
 npm run seed
```

### Running tests

To run tests:

```bash
npm test
```

### Contact: 

GitHub

- [Kieran-McDonagh](https://github.com/Kieran-McDonagh)
- [Hayden Exley](https://github.com/haydenexley/)
- [andraimoraru](https://github.com/andraimoraru)
- [i786m](https://github.com/i786m)
- [SulaHancock](https://github.com/SulaHancock)
- [ViktoriiaPavliukh](https://github.com/ViktoriiaPavliukh)
