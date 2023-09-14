import { genSalt, hash, compare } from "bcryptjs";

async function encryptPassword(password: string) {
  const salt = await genSalt(10);
  return await hash(password, salt);
}

async function comparePassword(password: string, hash: string) {
  return await compare(password, hash);
}
export { encryptPassword, comparePassword };
