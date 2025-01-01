import db from '../db.js';

const getByUserId = (request, response) => {
    const id = parseInt(request.params.id);

    db.query('select r.id as r_id, u.id as u_id, u.name, b.id as b_id, b.name, b.imagename from booksonrent r, users u, books b where r.user_id = u.id and r.book_id = b.id and r.user_id = $1 and r.returned_on is null',
        [id], (error, results) => {
            if (error) {
                console.error("Error executing query", error.stack);
            } else {
                response.status(200).json(results.rows);
            }
        }
    )
}

// const rentBook = (request, response) => {
//     const { user_id, book_id } = request.body;

//     db.query('INSERT INTO booksonrent (user_id, book_id, rented_on) VALUES ($1, $2, CURRENT_DATE) RETURNING *', [user_id, book_id], (error, results) => {
//         if (error) {
//             console.error("Error executing query", error.stack);
//         } else {
//             response.status(200).json(results.rows);
//         }
//     });
// }

const rentBook = (request, response) => {
    const { user_id, book_id } = request.body;

    db.query('SELECT quantity FROM books WHERE id = $1', [book_id], (error, results) => {
        if (error) {
            console.error("Error executing query", error.stack);
            response.status(500).json({ error: "Database error" });
        } else if (results.rows.length === 0) {
            response.status(404).json({ error: "Book not found" });
        } else {
            const quantity = results.rows[0].quantity;
            if (quantity === 0) {
                response.status(400).json({ error: "Book cannot be rented, quantity is 0" });
            } else {
                db.query(
                    'UPDATE books SET quantity = quantity - 1 WHERE id = $1 RETURNING *',
                    [book_id],
                    (updateError) => {
                        if (updateError) {
                            console.error("Error updating book quantity", updateError.stack);
                            response.status(500).json({ error: "Error updating book quantity" });
                        } else {
                            db.query(
                                'INSERT INTO booksonrent (user_id, book_id, rented_on) VALUES ($1, $2, CURRENT_DATE) RETURNING *',
                                [user_id, book_id],
                                (insertError, insertResults) => {
                                    if (insertError) {
                                        console.error("Error inserting into booksonrent", insertError.stack);
                                        response.status(500).json({ error: "Error renting book" });
                                    } else {
                                        response.status(200).json(insertResults.rows);
                                    }
                                }
                            );
                        }
                    }
                );
            }
        }
    });
};


// const returnBook = (request, response) => {
//     const id = parseInt(request.params.id);  

//     db.query('UPDATE booksonrent SET returned_on = CURRENT_DATE WHERE id = $1', [id], (error, results) => {
//         if (error) {
//             console.error("Error executing query", error.stack);
//         } else {
//             //response.status(200).json(results.rows);
//             response.status(200).json(`Book returned`);
//         }
//     });
// }

const returnBook = (request, response) => {
    const id = parseInt(request.params.id);

    // First, find the book_id from the booksonrent table for the specified rental
    db.query('SELECT book_id FROM booksonrent WHERE id = $1', [id], (error, results) => {
        if (error) {
            console.error("Error executing query", error.stack);
            response.status(500).json({ error: "Error finding rental record" });
        } else if (results.rows.length === 0) {
            response.status(404).json({ error: "Rental record not found" });
        } else {
            const bookId = results.rows[0].book_id;

            // Update the booksonrent table to set returned_on date
            db.query('UPDATE booksonrent SET returned_on = CURRENT_DATE WHERE id = $1', [id], (updateError, updateResults) => {
                if (updateError) {
                    console.error("Error updating rental record", updateError.stack);
                    response.status(500).json({ error: "Error updating rental record" });
                } else {
                    // Update the books table to increase quantity
                    db.query('UPDATE books SET quantity = quantity + 1 WHERE id = $1', [bookId], (quantityError, quantityResults) => {
                        if (quantityError) {
                            console.error("Error updating book quantity", quantityError.stack);
                            response.status(500).json({ error: "Error updating book quantity" });
                        } else {
                            response.status(200).json({ message: "Book returned and quantity updated" });
                        }
                    });
                }
            });
        }
    });
};

// Server-side code for handling rating updates
const rateBook = (request, response) => {
    const { rental_id, rating } = request.body;

    console.log("Selected Rating:", rating); 
    console.log("Selected Book ID:", rental_id);
    console.log(typeof(rating));
    console.log(typeof(rental_id)); 


    // Ensure rating is between 1 and 5
    if (rating < 1 || rating > 5) {
        return response.status(400).json({ error: "Rating must be between 1 and 5" });
    }

    db.query('SELECT * booksonrent WHERE id = $1', [rental_id], (error, results) => {
        if (error) {
            console.error("Error updating rating", error.stack);
            return response.status(500).json({ error: "Error updating rating" });
        } else {
            return response.status(200).json({ message: "Rating updated successfully", data: results.rows });
        }
    });
}


export {getByUserId, rentBook, returnBook, rateBook};