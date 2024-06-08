import express from "express";
import bodyParser from "body-parser";
import * as users from "./data/users.js";
import * as books from "./data/books.js"
import cors from "cors";

//const express = require('express');
//const bodyParser = require('body-parser');
const app = express();
const port = 3001;

//const db = require('./queries');
//import { getUsers, getUserById, createUser, updateUser, deleteUser, } from "./queries";
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' });
});

app.get('/users', users.getUsers);
app.get('/users/:id', users.getUserById);
app.post('/users', users.createUser);
app.put('/users/:id', users.updateUser);
app.delete('/users/:id', users.deleteUser);
app.post('/users/login', users.login);

app.get('/books', books.getBooks);
app.get('/books/:id', books.getBooksById);
app.post('/books', books.createBook);
app.put('/books/:id', books.updateBook);
app.delete('/books/:id', books.deleteBook);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});