import { Router } from 'express';
import {
  createUserHandler,
  deleteUserHandler,
  editUserHandler,
  findUserHandler,
  findUsersHandler,
} from '../../controllers/user.controller';
import validateResource from '../../middlewares/validateResource';
import {
  createUserSchema,
  deleteUserSchema,
  getUserSchema,
  updateUserSchema,
} from '../../schemas/user.schema';

const routes = Router();

routes
  .route('/')
  .get(findUsersHandler)
  .post(validateResource(createUserSchema), createUserHandler);
routes
  .route('/:id')
  .get(validateResource(getUserSchema), findUserHandler)
  .put(validateResource(updateUserSchema), editUserHandler)
  .delete(validateResource(deleteUserSchema), deleteUserHandler);

export default routes;
