const pg = require('pg');
const logger = require('./logger');
require('dotenv').config();

const pgconfig = {
  user: process.env.DB_USER,
  database: process.env.DB,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  max: process.env.DB_MAX_CLIENTS,
  idleTimeoutMillis: process.env.DB_IDLE_TIMEOUT_MS,
};

const pool = new pg.Pool(pgconfig);

logger.info(`DB Connection Settings : ${JSON.stringify(pgconfig)}`);

pool.on('error', function (err, client) {
  logger.error(`idle client error, ${err.message} | ${err.stack}`);
});

module.exports.sqlToDB = async (sql, data) => {
  logger.debug(`sqlToDB() sql: ${sql} | data: ${data}`);
  try {
    let result = await pool.query(sql, data);
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};
