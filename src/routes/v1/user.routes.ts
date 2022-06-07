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
import validateRole from '../../middlewares/validateRole';
import { Role } from '../../models/user.model';
import {
  createUserSchema,
  deleteUserSchema,
  getUserSchema,
  updateUserSchema,
} from '../../schemas/user.schema';

const routes = Router();

routes
  .route('/')
  .get(requireToken, findUsersHandler)
  .post(
    [validateRole(Role.admin), validateResource(createUserSchema)],
    createUserHandler
  );

routes.route('/authenticate').post(loginHandler);

routes
  .route('/:id')
  .get(
    [requireToken, validateRole(Role.admin), validateResource(getUserSchema)],
    findUserHandler
  )
  .put(
    [
      requireToken,
      validateRole(Role.admin),
      validateResource(updateUserSchema),
    ],
    editUserHandler
  )
  .delete(
    [
      requireToken,
      validateRole(Role.admin),
      validateResource(deleteUserSchema),
    ],
    deleteUserHandler
  );

export default routes;
