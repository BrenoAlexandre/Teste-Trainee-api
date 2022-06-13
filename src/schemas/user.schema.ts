import { object, string, date, mixed, InferType } from 'yup';
import { Role } from '../models/user.model';

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
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
 *         cpf:
 *           type: string
 *         password:
 *           type: string
 *         confirmPassword:
 *           type: string
 *         birthdate:
 *           type: Date
 *         obs:
 *           type: string
 *         role:
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
