import { Request, Response } from 'express';
import { authenticateUser } from '../services/session.service';

export async function loginHandler(req: Request, res: Response) {
  try {
    const { token, user } = await authenticateUser(req.body);
    res.status(200).setHeader('authorization', token).send(user);
  } catch (error: any) {
    res.status(error.statusCode).send(error.message);
  }
}
