import db from './db.js';

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

const rentBook = (request, response) => {
    const { user_id, book_id } = request.body;

    db.query('INSERT INTO booksonrent (user_id, book_id, rented_on) VALUES ($1, $2, CURRENT_DATE) RETURNING *', [user_id, book_id], (error, results) => {
        if (error) {
            console.error("Error executing query", error.stack);
        } else {
            response.status(200).json(results.rows);
        }
    });
}

const returnBook = (request, response) => {
    const id = parseInt(request.params.id);

    db.query('UPDATE booksonrent SET returned_on = CURRENT_DATE WHERE id = $1', [id], (error, results) => {
        if (error) {
            console.error("Error executing query", error.stack);
        } else {
            //response.status(200).json(results.rows);
            response.status(200).json(`Book returned`);
        }
    });
}

export {getByUserId, rentBook, returnBook};