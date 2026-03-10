
// const path = require('path');
// const mysql = require('mysql2');
// //require('dotenv').config();
// require('dotenv').config({ path: path.join(__dirname, '../../.env') });


// // Crear un pool de conexiones en lugar de una sola conexión
// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
//   waitForConnections: true,
//   connectionLimit: 10, // Máximo 10 conexiones simultáneas
//   queueLimit: 0,
//   enableKeepAlive: true,
//   keepAliveInitialDelay: 0
// });

// // Promisify para usar async/await
// const promisePool = pool.promise();

// // Test de conexión
// pool.getConnection((err, connection) => {
//   if (err) {
//     console.error('Error connecting to database:', err);
//     return;
//   }
//   console.log('Database connected successfully!');
//   connection.release(); // Libera la conexión de vuelta al pool
// });

// // Manejo de errores del pool
// pool.on('error', (err) => {
//   console.error('Unexpected database error:', err);
// });

// module.exports = promisePool; // Exporta el pool con promesas

const mysql = require('mysql2');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Database connected successfully!');
  connection.release();
});

pool.on('error', (err) => {
  console.error('Unexpected database error:', err);
});

// Exporta el pool normal (sin promesas) para mantener compatibilidad
module.exports = pool;