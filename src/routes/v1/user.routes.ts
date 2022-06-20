import { Router } from 'express';
import {
  createUserHandler,
  deleteUserHandler,
  editUserHandler,
  findUserHandler,
  findUsersHandler,
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

/**
 * @openapi
 * paths:
 *  /api/v1/users:
 *   get:
 *      parameters:
 *       - name: Bearer token
 *         in: path
 *         description: authentication token
 *         required: true
 *      tags:
 *      - Users
 *      summary: Get all registered users
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/UserResponse'
 *        400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               code: 400
 *               message: Bad Request
 *        404:
 *          description: Not found
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *              example:
 *                code: 404
 *                message: Empty database
 *   post:
 *      parameters:
 *       - name: Bearer token
 *         in: path
 *         description: authentication token
 *         required: true
 *      tags:
 *      - Users
 *      summary: Create a new user
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateUser'
 *      responses:
 *        201:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/UserResponse'
 *        403:
 *          description: Unauthorized
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *              example:
 *                code: 403
 *                message: Request is unauthorized
 *        409:
 *          description: Conflict
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *              example:
 *                code: 409
 *                message: This user cpf is already registered
 *
 *  '/api/v1/users/{id}':
 *   get:
 *     parameters:
 *      - name: Bearer token
 *        in: path
 *        description: authentication token
 *        required: true
 *      - name: userId
 *        in: path
 *        description: The user database id
 *        required: true
 *     tags:
 *     - Users
 *     summary: Get a user by it's id
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       403:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               code: 403
 *               message: Request is unauthorized
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               code: 404
 *               message: User not found
 *   put:
 *     parameters:
 *      - name: Bearer token
 *        in: path
 *        description: authentication token
 *        required: true
 *     tags:
 *     - Users
 *     summary: Edit a user by it's id
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               code: 400
 *               message: Bad Request
 *       403:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               code: 403
 *               message: Request is unauthorized
 *       404:
 *        description: Not Found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 *            example:
 *              code: 404
 *              message: User not found
 *   delete:
 *     parameters:
 *      - name: Bearer token
 *        in: path
 *        description: authentication token
 *        required: true
 *     tags:
 *     - Users
 *     summary: Delete a user by it's id
 *     responses:
 *       200:
 *         description: ok
 *       403:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               code: 403
 *               message: Request is unauthorized
 *       404:
 *        description: Not Found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 *            example:
 *              code: 404
 *              message: User not found
 */
const routes = Router();

routes
  .route('/')
  .get(requireToken, findUsersHandler)
  .post(
    [
      requireToken,
      validateRole(Role.admin),
      validateResource(createUserSchema),
    ],
    createUserHandler
  );

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
