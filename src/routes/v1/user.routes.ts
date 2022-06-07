import { Router } from 'express';
import {
  createUserHandler,
  deleteUserHandler,
  editUserHandler,
  findUserHandler,
  findUsersHandler,
  loginHandler,
} from '../../controllers/user.controller';
import requireToken from '../../middlewares/requireToken';
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

routes.route('/authenticate').post(loginHandler);

routes
  .route('/:id')
  .get([validateResource(getUserSchema), requireToken], findUserHandler)
  .put([validateResource(updateUserSchema), requireToken], editUserHandler)
  .delete(
    [validateResource(deleteUserSchema), requireToken],
    deleteUserHandler
  );

export default routes;
