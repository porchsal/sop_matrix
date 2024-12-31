const db = require('../connection.js');
const bcrypt = require('bcryptjs');

const addUser = (username, first_name, last_name, password) => {

    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                console.error('Error hashing password:', err);
                return reject(err);
            }
            db.query('INSERT INTO users (username, first_name, last_name, password) VALUES (?, ?, ?, ?)', [username, first_name, last_name, hash], (err, rows) => {
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

const getUsers = () => {
  return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users', (err, rows) => {
          if (err) {
              console.error('Database query error:', err);
              return reject(err);
          }
          resolve(rows);
      });
  });
}

const changePassword = (userId, password) => {
  console.log('userId:', userId);
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



module.exports = {
    addUser,
    registerUser,
    getUserByUsername,
    getUsers,
    changePassword,

  };