import { Request } from 'express';
import { Response } from 'express-serve-static-core';
import { NextFunction } from 'connect';
import { verify } from 'jsonwebtoken';
import { getSecret } from './utils/configHelper';

export const authenticate = (request: Request, response: Response, next: NextFunction) => {
  const authenticationToken = request.get('Authorization');
  if (!authenticationToken) {
    response.status(400).json({ message: 'Unauthenticated' });
    return;
  }

  // set the token to the token value, no matter if bearer is defined or not
  const token = authenticationToken.search('Bearer') !== -1 ? authenticationToken.split(' ')[1] : authenticationToken;
  try {
    if (verify(token, getSecret())) {
      next();
    }
  } catch (e) {
    response.status(400).json({ error: e, message: 'Unauthenticated' });
  }
};
