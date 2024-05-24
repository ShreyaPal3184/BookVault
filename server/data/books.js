import db from './db.js';

const getBooks = (request, response) => {
  db.query('SELECT id,name,author,genre,quantity FROM books ORDER BY id ASC', (error, results) => {
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
  
    db.query('SELECT id,name,author,genre,quantity FROM books WHERE id = $1', [id], (error, results) => {
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
    'INSERT INTO books (name, author, genre, quantity) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, author, genre, quantity],
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
    'UPDATE books SET name = $1, author = $2, genre = $3, quantity = $4 WHERE id = $5',
    [name, author, genre, quantity, id],
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


export {getBooks, getBooksById, createBook, updateBook, deleteBook};