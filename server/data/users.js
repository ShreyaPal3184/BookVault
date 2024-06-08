//import pg from "pg";
//
////const Pool = require('pg').Pool;
//const db = new pg.Client({
//  user: 'postgres',
//  host: 'localhost',
//  database: 'BookVault',
//  password: 'ShreyaPSQL',
//  port: 5432,
//});

import db from './db.js';

const getUsers = (request, response) => {
  db.query('SELECT id,name,email FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
        console.error("Error executing query", error.stack);
    }
    else {
        response.status(200).json(results.rows);
    }
    //db.end();
  });
};

const getUserById = (request, response) => {
  const id = parseInt(request.params.id);

  db.query('SELECT id,name,email,password FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
        console.error("Error executing query", error.stack);
    } else {
        response.status(200).json(results.rows);
    }
    //db.end();
  });
};

const createUser = (request, response) => {
  const { name, email, password } = request.body;

  db.query(
    'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
    [name, email, password],
    (error, results) => {
      if (error) {
        response.status(500).send(`User not created`);
      }
      response.status(201).send(`User added with ID: ${results.rows[0].id}`);
    }
  );
};

const updateUser = (request, response) => {
  const id = parseInt(request.params.id);
  const { name, email } = request.body;

  db.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with ID: ${id}`);
    }
  );
};

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id);

  db.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`User deleted with ID: ${id}`);
  });
};

const login = (request, response) => {
  const { email, password } = request.body;

  db.query(
    'SELECT id from users WHERE email = $1 and password = $2', [email, password], (error, results) => {
      if (error) {
        throw error;
      } else if (results.rows.length > 0) {
        response.status(200).send(`Login successful`);
      } else {
        response.status(401).send(`Login failed`);
      }
    }
  );
};

export {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  login
};