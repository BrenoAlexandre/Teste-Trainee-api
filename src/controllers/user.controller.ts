import { Request, Response } from 'express';
import {
  CreateUserInput,
  DeleteUserInput,
  ReadUserInput,
  UpdateUserInput,
} from '../schemas/user.schema';
import {
  createUser,
  deleteUser,
  editUser,
  getUser,
  getUsers,
} from '../services/user.service';
import ApiError from '../utils/apiError.utils';

export async function findUsersHandler(
  req: Request<{}, {}, {}>,
  res: Response
) {
  try {
    const users = await getUsers();
    res.status(200).send(users);
  } catch (error: any) {
    throw new ApiError(400, false, error.message);
  }
}

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput['body']>,
  res: Response
) {
  try {
    const user = await createUser(req.body);
    return res.status(200).send(user);
  } catch (error: any) {
    throw new ApiError(400, false, error.message);
  }
}

export async function findUserHandler(
  req: Request<ReadUserInput['params'], {}, {}>,
  res: Response
) {
  try {
    const user = await getUser(req.params.id);
    res.status(200).send(user);
  } catch (error: any) {
    throw new ApiError(400, false, error.message);
  }
}

export async function editUserHandler(
  req: Request<UpdateUserInput['params'], {}, UpdateUserInput['body']>,
  res: Response
) {
  try {
    const { id } = req.params;
    const { obs, permissions } = req.body;
    const user = await editUser({ id, obs, permissions });
    res.status(200).send(user);
  } catch (error: any) {
    throw new ApiError(400, false, error.message);
  }
}

export async function deleteUserHandler(
  req: Request<DeleteUserInput['params'], {}, {}>,
  res: Response
) {
  try {
    await deleteUser(req.params.id);
    res.status(200).send();
  } catch (error: any) {
    throw new ApiError(400, false, error.message);
  }
}
