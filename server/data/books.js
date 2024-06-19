import db from './db.js';

const getBooks = (request, response) => {
  db.query('SELECT id,name,author,genre,quantity,imagename FROM books ORDER BY name ASC', (error, results) => {
    if (error) {
        console.error("Error executing query", error.stack);
    }
    else {
        response.status(200).json(results.rows);
    }
    //db.end();
  });
};

const getBooksById = (request, response) => {
    const id = parseInt(request.params.id);
  
    db.query('SELECT id,name,author,genre,quantity,imagename FROM books WHERE id = $1', [id], (error, results) => {
      if (error) {
          console.error("Error executing query", error.stack);
      } else {
          response.status(200).json(results.rows);
      }
    });
};

const createBook = (request, response) => {
  const { name, author, genre, quantity } = request.body;

  db.query(
    'INSERT INTO books (name, author, genre, quantity, imagename) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [name, author, genre, quantity, imagename],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Book added with ID: ${results.rows[0].id}`);
    }
  );
};

const updateBook = (request, response) => {
  const id = parseInt(request.params.id);
  const { name, author, genre, quantity } = request.body;

  db.query(
    'UPDATE books SET name = $1, author = $2, genre = $3, quantity = $4, imagename=$5 WHERE id = $6',
    [name, author, genre, quantity, imagename, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Book modified with ID: ${id}`);
    }
  );
};

const deleteBook = (request, response) => {
  const id = parseInt(request.params.id);

  db.query('DELETE FROM books WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Book deleted with ID: ${id}`);
  });
};

const getFiction = (request, response) => {
  db.query("SELECT id, name, author, genre, quantity, imagename FROM books WHERE genre = 'Fiction' ORDER BY id ASC", (error, results) => {
    if (error) {
      console.error("Error executing query", error.stack);
      response.status(500).json({ error: "Failed to fetch fiction books" });
    } else {
      response.status(200).json(results.rows);
    }
  });
};

const getNonFiction = (request, response) => {
  db.query("SELECT id, name, author, genre, quantity, imagename FROM books WHERE genre = 'Non Fiction' ORDER BY id ASC", (error, results) => {
    if (error) {
      console.error("Error executing query", error.stack);
      response.status(500).json({ error: "Failed to fetch fiction books" });
    } else {
      response.status(200).json(results.rows);
    }
  });
};

export {getBooks, getBooksById, createBook, updateBook, deleteBook, getFiction, getNonFiction};