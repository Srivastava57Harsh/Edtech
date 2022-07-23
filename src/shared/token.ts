import * as jwt from 'jsonwebtoken';
import config from '../config';
export const createToken = (data: { id: string }, secret: string, time: string): string =>
  jwt.sign(data, secret, { expiresIn: time });
export const verifyToken = (token: string, secret: string): any => jwt.verify(token, secret);
