import * as bcrypt from 'bcrypt';

export async function hashPassword(password: string) {
  const saltRounds = 10;

  return await bcrypt.hash(password, saltRounds);
}

export async function comparePassword(
  password: string,
  hashedPassword: string,
) {
  return await bcrypt.compare(password, hashedPassword);
}
