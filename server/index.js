import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import userRoutes from "./routes/users.route.js";
import bookRoutes from "./routes/books.route.js";
import booksonrentRoutes from "./routes/booksonrent.route.js";

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

app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/booksonrent', booksonrentRoutes);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});