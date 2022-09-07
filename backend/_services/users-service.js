const dbConnector = require('../_utilities/dbConnector');
const passwordManager = require('../_utilities/passwordManager');

const getUsers = async (id) => {
  let sql = `SELECT * FROM users
              WHERE users.type = 'user'`;

  if (id && id !== 'all') sql += ` AND users.id = ${id}`;

  let data = [];
  let result = {};

  try {
    result = await dbConnector.sqlToDB(sql, data);
    return result.rows;
  } catch (error) {
    throw new Error(error.message);
  }
}

const createUser = async (user) => {
  let sql = `INSERT INTO users
              (
                id,
                name,
                email,
                password,
                type
              )
              VALUES 
              (
                DEFAULT,
                '${user.name}',
                '${user.email}',
                '${user.password || 'notausernoneedforpassword'}',
                '${user.type || 'user'}'
              )
              RETURNING *;`;
  let data = [];
  let result = {};

  try {
    result = await dbConnector.sqlToDB(sql, data);
    return result.rows;
  } catch (error) {
    throw new Error(error.message);
  }
}

const getUserByUsername = async (username) => {
  let sql = `SELECT * FROM users
              WHERE users.name = '${username}'`;
  let data = [];
  let result = {};

  try {
    result = await dbConnector.sqlToDB(sql, data);
    return result.rows;
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  getUsers,
  getUserByUsername,
  createUser
}
