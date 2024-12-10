const db = require('../connection.js');
const bcrypt = require('bcryptjs');

const getUserByEmail = (email) => {
    const query = `SELECT * FROM users WHERE email = $1;`;
  
    return db
      .query(query, [email])
      .then((result) => {
        return result.rows[0];
      })
      .catch((err) => {
        console.error("Error getting user by id:", err);
      });
  };

const checkLoginCredentials = (email, password) => {
    return getUserByEmail(email).then((user) => {
      if (!user) {
        return false;
      }
  
      return bcrypt.compare(password, user.password).then((match) => {
        if (!match) {
          return false;
        }
  
        return user;
      })
      .catch((err) => {
        console.error("Error checking login credentials:", err);
        return null
      });
    });
  
}

module.exports = {
    getUserByEmail,
    checkLoginCredentials
  };