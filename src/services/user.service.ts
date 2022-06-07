import { getRepository } from 'typeorm';
import User from '../database/entities/User.Entity';
import { Permissions, UserInput } from '../models/user.model';
import ApiError from '../utils/apiError.utils';
import { encryptPassword } from '../utils/encrypt.utils';

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
  const user = repository.findOne({ where: { id } });
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

export async function editUser(input: {
  id: string;
  obs: string;
  permissions: Permissions;
}) {
  const repository = getRepository(User);
  const user = await repository.findOne({ where: { id: input.id } });
  if (!user) {
    throw new Error(`This user doesn't exists}`);
  }

  user.obs = input.obs;
  user.permissions = input.permissions;
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
