import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { get } from 'lodash';
import { Role } from '../models/user.model';
import { verifyJwt } from '../utils/jwt.utils';

const validateRole =
  (role: Role) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const [scheme, accessToken] = get(req, 'headers.authorization', '').split(
        ' '
      );
      if (!accessToken || !scheme) {
        return res.status(401).send({ error: 'Token error' });
      }

      const { decoded } = verifyJwt(accessToken);
      if (!decoded || typeof decoded === 'string') {
        return res.status(403).send({ error: 'Permission denied' });
      }

      if (decoded.role !== role) {
        return res.status(403).send({ error: 'Permission denied' });
      }

      return next();
    } catch (e: any) {
      res.status(StatusCodes.BAD_REQUEST).send(e.errors);
    }
    return next();
  };

export default validateRole;
