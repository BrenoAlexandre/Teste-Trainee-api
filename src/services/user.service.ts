import { getRepository } from 'typeorm';
import config from '../config/config';
import User from '../database/entities/User.Entity';
import { Role, UserInput } from '../models/user.model';
import ApiError from '../utils/apiError.utils';
import { decryptPassword } from '../utils/decrypt.utils';
import { encryptPassword } from '../utils/encrypt.utils';
import { signJwt } from '../utils/jwt.utils';

export async function getUsers() {
  const repository = getRepository(User);
  const user = repository.find({ order: { created_at: 'DESC' } });
  if (!user) {
    throw new Error('User database is empty');
  }

  return user;
}

export async function getUser(id: string) {
  const repository = getRepository(User);
  const user = repository.findOne(id);
  if (!user) {
    throw new Error('No user found');
  }

  return user;
}

export async function createUser(input: UserInput) {
  const { cpf } = input;
  const repository = getRepository(User);
  const cpfExists = await repository.findOne({ where: { cpf } });
  if (cpfExists) {
    throw new ApiError(401, false, 'This user cpf is already registered');
  }

  const hashPassword = await encryptPassword(input.password);
  const newUser = repository.create({ ...input, password: hashPassword });
  if (!newUser) {
    throw new Error('An error ocurred while creating the user');
  }

  await repository.save(newUser);
  return newUser;
}

export async function editUser(input: { id: string; obs: string; role: Role }) {
  const repository = getRepository(User);
  const user = await repository.findOne({ where: { id: input.id } });
  if (!user) {
    throw new Error(`This user doesn't exists}`);
  }

  user.obs = input.obs;
  user.role = input.role;
  await repository.save(user);
  return user;
}

export async function deleteUser(id: string) {
  const repository = getRepository(User);
  const user = await repository.findOne(id);
  if (!user) {
    throw new Error(`This user doesn't exists}`);
  }

  await repository.delete(id);
}

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
    throw new ApiError(400, false, 'Credentials are incorrect');
  }

  user.password = '';

  return {
    user,
    token: signJwt({ ...user }, { expiresIn: config.accessTokenTtl }),
  };
}
