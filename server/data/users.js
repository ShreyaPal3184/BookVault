import bcrypt from "bcrypt";
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

const createUser = async (request, response) => {
  const { name, email, password } = request.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, hashedPassword],
      (error, results) => {
        if (error) {
          console.log("Error creating user: ", error);
          response.status(500).send(`User not created`);
        }
        response.status(201).send(`User added with ID: ${results.rows[0].id}`);
      }
    );
  } catch(error) {
    console.log("Error creating user: ", error);
    response.status(500).send(`User not created`);
  }
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

const login = async (request, response) => {
  const { email, password } = request.body;
  
  try {
    const result = await db.query('SELECT id, name, email, password FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) {
      return response.status(401).send('Login failed'); // Return 401 if user not found
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if(passwordMatch) {
      response.status(200).send(user);
    } else {
      console.log("Error logging in: ", error);
      response.status(401);
    } 
  } catch(error) {
    console.log("Error logging in: ", error);
    response.status(401);
  }
};

export {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  login
};