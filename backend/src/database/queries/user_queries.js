const db = require('../connection.js');
const bcrypt = require('bcryptjs');

const addUser = (username, first_name, last_name, password, profile) => {

    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                console.error('Error hashing password:', err);
                return reject(err);
            }
            db.query('INSERT INTO users (username, first_name, last_name, password, profile) VALUES (?, ?, ?, ?, ?)', [username, first_name, last_name, hash, profile], (err, rows) => {
                if (err) {
                    console.error('Database query error:', err);
                    return reject(err);
                }
                resolve(rows);
            });
        });
    });
}

const getUserByUsername = (username) => {
  return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE username = ?', [username], (err, rows) => {
          if (err) {
              console.error('Database query error:', err);
              return reject(err);
          }
          resolve(rows[0]);
      });
  });
}

const getUserById = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT username FROM users WHERE id = ?', [id], (err, rows) => {
            if (err) {
                console.error('Database query error:', err);
                return reject(err);
            }
            resolve(rows[0]);
        });
    });
}

const getUsers = () => {
  return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users where id>1', (err, rows) => {
          if (err) {
              console.error('Database query error:', err);
              return reject(err);
          }
          resolve(rows);
      });
  });
}

const changePassword = (userId, password) => {
   return new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, (err, hash) => {
          if (err) {
              console.error('Error hashing password:', err);
              return reject(err);
          }
          db.query('UPDATE users SET password = ? WHERE id = ?', [hash, userId], (err, rows) => {
              if (err) {
                  console.error('Database query error:', err);
                  return reject(err);
              }
              resolve(rows);
          });
      });
  });
}

const checkLoginCredentials = (username, password) => {
  return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE username = ?', [username], (err, rows) => {
          if (err) {
              console.error('Database query error:', err);
              return reject(err);
          }
          if (rows.length === 0) {
              return resolve(null);
          }
          bcrypt.compare(password, rows[0].password, (err, result) => {
              if (err) {
                  console.error('Error comparing passwords:', err);
                  return reject(err);
              }
              if (result) {
                  resolve(rows[0]);
                  
              } else {
                  resolve(null);
              }
          });
      });
  });
}

module.exports = {
    addUser,
    getUserByUsername,
    getUsers,
    getUserById,
    changePassword,
    checkLoginCredentials,
  };