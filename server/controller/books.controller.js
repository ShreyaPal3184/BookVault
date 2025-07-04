import db from '../db.js';

const getBooksById = (request, response) => {
    const id = parseInt(request.params.id);

    db.query('SELECT id, name, author, category, quantity, imagename FROM books WHERE id = $1', [id], (error, results) => {
        if (error) {
            console.error("Error executing query", error.stack);
            response.status(500).json({ error: "Failed to fetch book by ID" });
        } else {
            response.status(200).json(results.rows);
        }
    });
};

const createBook = (request, response) => {
    const { name, author, category, quantity, imagename } = request.body;

    db.query(
        'INSERT INTO books (name, author, category, quantity, imagename) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [name, author, category, quantity, imagename],
        (error, results) => {
            if (error) {
                console.error("Error inserting book", error.stack);
                response.status(500).json({ error: "Failed to create book" });
            } else {
                response.status(201).send(`Book added with ID: ${results.rows[0].id}`);
            }
        }
    );
};

const updateBook = (request, response) => {
    const id = parseInt(request.params.id);
    const { name, author, category, quantity, imagename } = request.body;

    db.query(
        'UPDATE books SET name = $1, author = $2, category = $3, quantity = $4, imagename = $5 WHERE id = $6',
        [name, author, category, quantity, imagename, id],
        (error, results) => {
            if (error) {
                console.error("Error updating book", error.stack);
                response.status(500).json({ error: "Failed to update book" });
            } else {
                response.status(200).send(`Book modified with ID: ${id}`);
            }
        }
    );
};

const deleteBook = (request, response) => {
    const id = parseInt(request.params.id);

    db.query('DELETE FROM books WHERE id = $1', [id], (error, results) => {
        if (error) {
            console.error("Error deleting book", error.stack);
            response.status(500).json({ error: "Failed to delete book" });
        } else {
            response.status(200).send(`Book deleted with ID: ${id}`);
        }
    });
};

const getFiction = (request, response) => {
    db.query(`SELECT id, name, author, category, quantity, imagename FROM books WHERE category = (
        SELECT id FROM book_category WHERE name = 'Fiction') ORDER BY id ASC`, (error, results) => {
        if (error) {
            console.error("Error executing query", error.stack);
            response.status(500).json({ error: "Failed to fetch fiction books" });
        } else {
            response.status(200).json(results.rows);
        }
    });
};

const getNonFiction = (request, response) => {
    db.query(`SELECT id, name, author, category, quantity, imagename FROM books WHERE category = (
        SELECT id FROM book_category WHERE name = 'Non Fiction') ORDER BY id ASC`, (error, results) => {
        if (error) {
            console.error("Error executing query", error.stack);
            response.status(500).json({ error: "Failed to fetch non-fiction books" });
        } else {
            response.status(200).json(results.rows);
        }
    });
};

const getBooks = (request, response) => {
    db.query(`SELECT id, name, author, category, quantity FROM books`, (error, results) => {
        if (error) {
            console.error("Error executing query", error.stack);
            response.status(500).json({ error: "Error fetching books" });
        } else {
            response.status(200).json(results.rows);
        }
    });
};

const getBookRentalCount = (request, response) => {
    db.query(`SELECT book_id, name, author, COUNT(*) AS rented_count FROM booksonrent JOIN books ON booksonrent.book_id = books.id 
        GROUP BY book_id, name, author ORDER BY rented_count DESC`, 
        (error, results) => {
        if (error) {
            console.error("Error executing query", error.stack);
            response.status(500).json({ error: "Error fetching rental count" });
        } else {
            response.status(200).json(results.rows);
        }
    });
};

const getTopRentedBooks = (request, response) => {
    db.query(`SELECT book_id, name, COUNT(*) AS rental_count FROM booksonrent JOIN books ON booksonrent.book_id = books.id 
        GROUP BY book_id, name ORDER BY rental_count DESC LIMIT 5`, 
        (error, results) => {
        if (error) {
            console.error("Error executing query", error.stack);
            response.status(500).json({ error: "Error fetching top rented books" });
        } else {
            response.status(200).json(results.rows);
        }
    });
};

const getCurrentlyRentedBooks = (request, response) => {
    db.query(`
        SELECT books.id as book_id, booksonrent.user_id, books.name, books.author, booksonrent.rented_on 
        FROM booksonrent JOIN books ON booksonrent.book_id = books.id
        WHERE booksonrent.returned_on IS NULL`, 
        (error, results) => {
        if (error) {
            console.error("Error executing query", error.stack);
            response.status(500).json({ error: "Error fetching currently rented books for user" });
        } else {
            response.status(200).json(results.rows);
        }
    });
};

const getBooksByCategory = (request, response) => {
  const categoryId = request.params.categoryId;

  db.query(
    `SELECT books.id, books.name, books.author, books.quantity, book_category.category 
     FROM books 
     JOIN book_category ON books.category = book_category.id 
     WHERE book_category.id = $1 
     ORDER BY books.id ASC`,
    [categoryId],
    (error, results) => {
      if (error) {
        console.error("Error executing query", error.stack);
        response.status(500).json({ error: "Failed to fetch books by category" });
      } else {
        response.status(200).json(results.rows);
      }
    }
  );
};



export {
    getBooksById,
    createBook,
    updateBook,
    deleteBook,
    getFiction,
    getNonFiction,
    getBooks,
    getBookRentalCount,
    getCurrentlyRentedBooks,
    getTopRentedBooks,
    getBooksByCategory,
};
