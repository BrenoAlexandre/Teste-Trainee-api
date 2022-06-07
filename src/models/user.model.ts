export interface UserInput {
  name: string;
  cpf: string;
  password: string;
  confirmPassword: string;
  birthdate: Date;
  obs?: string;
  role: Role;
}

export enum Role {
  admin = 'admin',
  user = 'user',
}
