import { randomBytes, pbkdf2Sync } from 'crypto';

export function saltAndHashPassword(password: string): string {
  const salt = randomBytes(16).toString('hex');
  const hash = pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return hash;
}