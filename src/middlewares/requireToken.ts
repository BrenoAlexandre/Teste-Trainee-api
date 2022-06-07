import { Request, Response, NextFunction } from 'express';
import { get } from 'lodash';
import { verifyJwt } from '../utils/jwt.utils';

const requireToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const [scheme, accessToken] = get(req, 'headers.authorization', '').split(
    ' '
  );

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({ error: 'Token error' });
  }
  if (!accessToken) {
    return res.status(401).send({ error: 'Token error' });
  }

  const { decoded, expired } = verifyJwt(accessToken);

  if (expired) {
    return res.status(401).send({ error: 'Token has expired' });
  }
  if (!decoded) {
    return res.status(403).send({ error: 'Permission denied' });
  }

  res.locals.user = decoded;
  return next();
};

export default requireToken;
