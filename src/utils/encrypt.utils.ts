import bcrypt from 'bcrypt';
import config from '../config/config';

export async function encryptPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(config.saltWorkFactor);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}
