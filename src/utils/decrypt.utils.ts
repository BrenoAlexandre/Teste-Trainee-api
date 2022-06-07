import bcrypt from 'bcrypt';

export async function decryptPassword(
  hashPassword: string,
  password: string
): Promise<boolean> {
  if (!(await bcrypt.compare(hashPassword, password))) {
    return false;
  }
  return true;
}
