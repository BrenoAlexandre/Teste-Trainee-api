import { getRepository } from 'typeorm';
import User from '../database/entities/User.Entity';
import { Role, UserInput } from '../models/user.model';
import ApiError from '../utils/apiError.utils';
import { encryptPassword } from '../utils/encrypt.utils';

export async function getUsers() {
  const repository = getRepository(User);
  const users = await repository.find({ order: { created_at: 'DESC' } });
  if (!users) {
    throw new ApiError(400, false, 'Users not found');
  }

  return users;
}

export async function getUser(id: string) {
  const repository = getRepository(User);
  const user = await repository.findOne(id);
  if (!user) {
    throw new ApiError(400, false, 'User not found');
  }

  return user;
}

export async function createUser(input: UserInput) {
  const { cpf, password } = input;
  const repository = getRepository(User);
  const cpfExists = await repository.findOne({ where: { cpf } });
  if (cpfExists) {
    throw new ApiError(409, false, 'User cpf is already registered');
  }

  const hashPassword = await encryptPassword(password);
  const newUser = repository.create({ ...input, password: hashPassword });
  if (!newUser) {
    throw new ApiError(500, false, 'An error ocurred while creating the user');
  }

  await repository.save(newUser);
  return newUser;
}

export async function editUser(input: { id: string; obs: string; role: Role }) {
  const repository = getRepository(User);
  const user = await repository.findOne({ where: { id: input.id } });
  if (!user) {
    throw new ApiError(400, false, `User does not exists}`);
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
    throw new ApiError(400, false, `User does not exists}`);
  }

  await repository.delete(id);
}
