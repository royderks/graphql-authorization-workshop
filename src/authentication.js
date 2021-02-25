const JsonWebToken = require('jsonwebtoken');
const db = require('./database');

// Replace this value with something unique
const jwtSecret = 'dfsdfer3efdcdcfefe';

function signToken(userId, role) {
  // Sign token containing the userName and role using the secret
  return JsonWebToken.sign({ userId, role }, jwtSecret, {
    expiresIn: 3600,
  });
}

function isTokenValid(token) {
  const bearerToken = token && token.split(' ');

  if (bearerToken) {
    try {
      // The decoded JWT contains the userName, role and expiration timestap
      const decoded = JsonWebToken.verify(bearerToken[1], jwtSecret);

      return decoded;
    } catch (e) {
      return false;
    }
  }

  return false;
}

function createUserToken(_, { userName, password }) {
  for (let [key, { email, id, role }] of db.users.entries()) {
    if (email === userName && password === 'fullstackgraphql') {
      // Create JTW
      const token = signToken(id, role);

      return {
        token: `Bearer ${token}`,
        role,
      };
    }
  }

  return false;
}

module.exports = {
  isTokenValid,
  createUserToken,
};
