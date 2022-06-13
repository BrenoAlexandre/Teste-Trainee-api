import bcrypt from 'bcrypt';

export async function decryptPassword(
  password: string,
  hashPassword: string
): Promise<boolean> {
  if (!(await bcrypt.compare(password, hashPassword))) {
    return false;
  }
  return true;
}
