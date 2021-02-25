require('dotenv').config();
const jwksClient = require('jwks-rsa');
const JsonWebToken = require('jsonwebtoken');
const db = require('./database');

// Replace this value with something unique
const jwtSecret = 'dfsdfer3efdcdcfefe';

const client = jwksClient({
  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, function (error, key) {
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

function signToken(userId, role) {
  // Sign token containing the userName and role using the secret
  return JsonWebToken.sign({ userId, role }, jwtSecret, {
    expiresIn: 3600,
  });
}

async function isTokenValid(token) {
  if (token) {
    const bearerToken = token.split(' ');

    const result = new Promise((resolve) => {
      JsonWebToken.verify(
        bearerToken[1],
        getKey,
        {
          audience: process.env.API_IDENTIFIER,
          issuer: `https://${process.env.AUTH0_DOMAIN}/`,
          algorithms: ['RS256'],
        },
        (error, decoded) => {
          if (error) {
            resolve(false);
          }
          if (decoded) {
            resolve({ userId: 2, ...decoded });
          }
        },
      );
    });

    return result;
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
  createUserToken
}