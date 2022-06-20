import { object, string, date, mixed, InferType } from 'yup';
import { Role } from '../models/user.model';

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateUser:
 *       type: object
 *       required:
 *        - name
 *        - cpf
 *        - password
 *        - confirmPassword
 *        - birthdate
 *        - role
 *       properties:
 *         name:
 *           type: string
 *           description: User name
 *         cpf:
 *           type: string
 *           description: Unique user CPF
 *         password:
 *           type: string
 *           description: User password
 *         confirmPassword:
 *           type: string
 *           description: User confirmation password for validation
 *         birthdate:
 *           type: string
 *           format: date
 *           description: User birthdate
 *         role:
 *           type: string
 *           enum:
 *             - admin
 *             - user
 *           description: User role responsible for permissions
 *         obs:
 *           type: string
 *           description: User description
 *     UserResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: User random generated uuidv4
 *         name:
 *           type: string
 *           description: User name
 *         cpf:
 *           type: string
 *           description: Unique user CPF
 *         birthdate:
 *           type: string
 *           format: date
 *           description: User birthdate
 *         role:
 *           type: string
 *           enum:
 *             - admin
 *             - user
 *           description: User role responsible for permissions
 *         obs:
 *           type: string
 *           description: User description
 *         created_at:
 *           type: string
 *           description: User creation timestamp
 *         updated_at:
 *           type: string
 *           description: User last edition timestamp
 *     Error:
 *       type: object
 *       properties:
 *         code:
 *           type: number
 *         message:
 *           type: string
 */

export const payload = {
  body: object().shape({
    name: string().required('User name is required'),
    cpf: string().required('User cpf is required'),
    password: string().min(6).required('User password is required'),
    confirmPassword: string()
      .min(6)
      .required('User password confirmation is required'),
    birthdate: date().required('user birthdate is required'),
    obs: string().default(''),
    role: mixed<Role>()
      .oneOf(Object.values(Role))
      .required('user must be assigned a permission role'),
  }),
};

export const updatePayload = {
  body: object().shape({
    name: string().required('User name is required'),
    cpf: string().required('User cpf is required'),
    birthdate: date().required('user birthdate is required'),
    obs: string().default(''),
    role: mixed<Role>()
      .oneOf(Object.values(Role))
      .required('user must be assigned a permission role'),
  }),
};

const params = {
  params: object({ id: string().defined('user id is required') }),
};

export const createUserSchema = object({
  ...payload,
});

export const updateUserSchema = object({
  ...updatePayload,
  ...params,
});

export const deleteUserSchema = object({
  ...params,
});

export const getUserSchema = object({
  ...params,
});

export type CreateUserInput = InferType<typeof createUserSchema>;
export type UpdateUserInput = InferType<typeof updateUserSchema>;
export type ReadUserInput = InferType<typeof getUserSchema>;
export type DeleteUserInput = InferType<typeof deleteUserSchema>;
