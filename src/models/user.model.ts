export interface UserInput {
  name: string;
  cpf: string;
  password: string;
  confirmPassword: string;
  birthdate: Date;
  obs?: string;
  permissions: Permissions;
}

export enum Permissions {
  admin = 'admin',
  user = 'user',
}
