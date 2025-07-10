import db from "../db.js";

const getBooksById = (request, response) => {
  const id = parseInt(request.params.id);

  db.query(
    "SELECT id, name, author, category, quantity, imagename FROM books WHERE id = $1",
    [id],
    (error, results) => {
      if (error) {
        console.error("Error executing query", error.stack);
        response.status(500).json({ error: "Failed to fetch book by ID" });
      } else {
        response.status(200).json(results.rows);
      }
    }
  );
};

const addBook = (request, response) => {
  const { name, author, category, quantity, imagename } = request.body;

  db.query(
    "INSERT INTO books (name, author, category, quantity, imagename) VALUES ($1, $2, $3, $4, $5) RETURNING *",
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
    "UPDATE books SET name = $1, author = $2, category = $3, quantity = $4, imagename = $5 WHERE id = $6",
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

  db.query("DELETE FROM books WHERE id = $1", [id], (error, results) => {
    if (error) {
      console.error("Error deleting book", error.stack);
      response.status(500).json({ error: "Failed to delete book" });
    } else {
      response.status(200).send(`Book deleted with ID: ${id}`);
    }
  });
};

const getFiction = (request, response) => {
  db.query(
    `SELECT id, name, author, category, quantity, imagename FROM books WHERE category = (
        SELECT id FROM book_category WHERE name = 'Fiction') ORDER BY id ASC`,
    (error, results) => {
      if (error) {
        console.error("Error executing query", error.stack);
        response.status(500).json({ error: "Failed to fetch fiction books" });
      } else {
        response.status(200).json(results.rows);
      }
    }
  );
};

const getNonFiction = (request, response) => {
  db.query(
    `SELECT id, name, author, category, quantity, imagename FROM books WHERE category = (
        SELECT id FROM book_category WHERE name = 'Non Fiction') ORDER BY id ASC`,
    (error, results) => {
      if (error) {
        console.error("Error executing query", error.stack);
        response
          .status(500)
          .json({ error: "Failed to fetch non-fiction books" });
      } else {
        response.status(200).json(results.rows);
      }
    }
  );
};

const getBooks = (request, response) => {
  db.query(
    `SELECT b.id, b.name, b.author, bc.category, b.quantity, b.imagename 
     FROM books AS b 
     JOIN book_category AS bc ON b.category = bc.id`,
    (error, results) => {
      if (error) {
        console.error("Error executing query", error.stack);
        response.status(500).json({ error: "Error fetching books" });
      } else {
        response.status(200).json(results.rows);
      }
    }
  );
};

// const getBooks = (request, response) => {
//   const { title, author, genre, available } = request.query;

//   let baseQuery = `
//     SELECT b.id, b.name, b.author, bc.category, b.quantity, b.imagename, b.available 
//     FROM books AS b 
//     JOIN book_category AS bc ON b.category = bc.id
//     WHERE 1 = 1
//   `;

//   const queryParams = [];

//   if (title) {
//     queryParams.push(`%${title}%`);
//     baseQuery += ` AND b.name ILIKE $${queryParams.length}`;
//   }
//   if (author) {
//     queryParams.push(`%${author}%`);
//     baseQuery += ` AND b.author ILIKE $${queryParams.length}`;
//   }
//   if (genre) {
//     queryParams.push(genre);
//     baseQuery += ` AND bc.category = $${queryParams.length}`;
//   }
//   if (available !== undefined) {
//     queryParams.push(available === "true");
//     baseQuery += ` AND b.quantity > 0`;
//   }

//   db.query(baseQuery, queryParams, (error, results) => {
//     if (error) {
//       console.error("Error executing query", error.stack);
//       response.status(500).json({ error: "Error fetching books" });
//     } else {
//       response.status(200).json(results.rows);
//     }
//   });
// };



const getBookRentalCount = (request, response) => {
  db.query(
    `SELECT book_id, name, author, COUNT(*) AS rented_count FROM booksonrent JOIN books ON booksonrent.book_id = books.id 
        GROUP BY book_id, name, author ORDER BY rented_count DESC`,
    (error, results) => {
      if (error) {
        console.error("Error executing query", error.stack);
        response.status(500).json({ error: "Error fetching rental count" });
      } else {
        response.status(200).json(results.rows);
      }
    }
  );
};

const getTopRentedBooks = (request, response) => {
  db.query(
    `SELECT 
       book_id, 
       name, 
       author, 
       imagename, 
       COUNT(*) AS rental_count 
     FROM booksonrent 
     JOIN books ON booksonrent.book_id = books.id 
     GROUP BY book_id, name, author, imagename 
     ORDER BY rental_count DESC 
     LIMIT 5`,
    (error, results) => {
      if (error) {
        console.error("Error executing query", error.stack);
        response.status(500).json({ error: "Error fetching top rented books" });
      } else {
        response.status(200).json(results.rows);
      }
    }
  );
};


const getCurrentlyRentedBooks = (request, response) => {
  db.query(
    `
        SELECT books.id as book_id, booksonrent.user_id, books.name, books.author, booksonrent.rented_on 
        FROM booksonrent JOIN books ON booksonrent.book_id = books.id
        WHERE booksonrent.returned_on IS NULL`,
    (error, results) => {
      if (error) {
        console.error("Error executing query", error.stack);
        response
          .status(500)
          .json({ error: "Error fetching currently rented books for user" });
      } else {
        response.status(200).json(results.rows);
      }
    }
  );
};

const getBookCategory = (request, response) => {
  db.query(`SELECT category FROM book_category`, (error, results) => {
    if (error) {
      console.error("Error executing query", error.stack);
      response.status(500).json({ error: "Failed to fetch book categories" });
    } else {
      response.status(200).json(results.rows);
    }
  });
};


const getBooksByCategory = (request, response) => {
  const categoryName = request.params.categoryName; // Get category name from URL params

  db.query(
    `SELECT books.id, books.name, books.author, books.quantity, books.imagename, book_category.category 
     FROM books 
     JOIN book_category ON books.category = book_category.id 
     WHERE book_category.category = $1 
     ORDER BY books.id ASC`,
    [categoryName],
    (error, results) => {
      if (error) {
        console.error("Error executing query", error.stack);
        response
          .status(500)
          .json({ error: "Failed to fetch books by category" });
      } else {
        response.status(200).json(results.rows);
      }
    }
  );
};

export {
  getBooksById,
  addBook,
  updateBook,
  deleteBook,
  getFiction,
  getNonFiction,
  getBooks,
  getBookRentalCount,
  getCurrentlyRentedBooks,
  getTopRentedBooks,
  getBookCategory,
  getBooksByCategory,
};
