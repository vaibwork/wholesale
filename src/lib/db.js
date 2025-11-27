import mysql from 'mysql2/promise';

// Singleton connection pool. We maintain one pool per application instance.
let pool;

/**
 * Returns a MySQL connection pool. If the pool does not yet exist it will be
 * created on first call. The pool configuration is taken from environment
 * variables defined in next.config.js or .env.local.
 */
export function getPool() {
  if (!pool) {
    const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
    if (!DB_HOST || !DB_USER || !DB_NAME) {
      throw new Error('Database connection details are not configured');
    }
    pool = mysql.createPool({
      host: DB_HOST,
      port: DB_PORT ? parseInt(DB_PORT) : 3306,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }
  return pool;
}