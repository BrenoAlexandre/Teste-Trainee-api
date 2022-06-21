import { getRepository } from 'typeorm';
import config from '../config/config';
import User from '../database/entities/User.Entity';
import ApiError from '../utils/apiError.utils';
import { decryptPassword } from '../utils/decrypt.utils';
import { signJwt } from '../utils/jwt.utils';

export async function authenticateUser(input: {
  cpf: string;
  password: string;
}) {
  const { cpf, password } = input;
  const repository = getRepository(User);
  const user = await repository.findOne({ where: { cpf } });

  if (!user) {
    throw new ApiError(400, false, 'User not found');
  }

  const isValid = await decryptPassword(password, user.password);

  if (!isValid) {
    throw new ApiError(401, false, 'Credentials are incorrect');
  }

  user.password = '';

  return {
    user,
    token: signJwt({ ...user }, { expiresIn: config.accessTokenTtl }),
  };
}
