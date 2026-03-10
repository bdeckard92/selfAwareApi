const db = require("../config/db");

const createUser = async ({ name, email }) => {
  const query = `
    INSERT INTO users (name, email)
    VALUES ($1, $2)
    RETURNING id, name, email, created_at;
  `;

  const values = [name, email];
  const { rows } = await db.query(query, values);
  return rows[0];
};

const getAllUsers = async () => {
  const query = `
    SELECT id, name, email, created_at
    FROM users
    ORDER BY id ASC;
  `;

  const { rows } = await db.query(query);
  return rows;
};

const getUserById = async (id) => {
  const query = `
    SELECT id, name, email, created_at
    FROM users
    WHERE id = $1;
  `;

  const { rows } = await db.query(query, [id]);
  return rows[0] || null;
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
};
