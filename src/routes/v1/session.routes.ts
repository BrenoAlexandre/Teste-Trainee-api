import { Router } from 'express';
import { loginHandler } from '../../controllers/user.controller';

/**
 * @openapi
 * /api/v1/login:
 *  post:
 *    tags:
 *    - Login
 *    description: Return access token
 *    summary: Create user session
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              cpf:
 *                type: string
 *              password:
 *                type: string
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                token:
 *                  type: string
 *                user:
 *                  type: $ref:'#/components/schemas/UserResponse'
 */

const routes = Router();

routes.route('/').post(loginHandler);

export default routes;
