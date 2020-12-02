import JsonWebToken from 'jsonwebtoken';
import db, { Role } from './database';

type JWT = {
  userId: number;
  role: Role;
};

type LoginInput = {
  userName: string;
  password: string;
};

type Credentials = {
  token: string;
  role: Role;
};

// Replace this value with something unique
const jwtSecret = 'dfsdfer3efdcdcfefe';

export function signToken(userId: number, role: string) {
  // Sign token containing the userName and role using the secret
  return JsonWebToken.sign({ userId, role }, jwtSecret, {
    expiresIn: 3600,
  });
}

export function isTokenValid(token: string): JWT | false {
  const bearerToken = token && token.split(' ');

  if (bearerToken) {
    try {
      // The decoded JWT contains the userName, role and expiration timestap
      const decoded = JsonWebToken.verify(bearerToken[1], jwtSecret) as JWT;

      return decoded;
    } catch (e) {
      return false;
    }
  }

  return false;
}

export function createUserToken(
  _: any,
  { userName, password }: LoginInput,
): Credentials | false {
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

  return false
}
