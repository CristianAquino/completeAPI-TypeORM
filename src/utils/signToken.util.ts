import jwt from "jsonwebtoken";
const { SECRET_WORD } = process.env;

function createToken(
  tokenSign: Record<string, unknown>,
  expire: any,
  secretWord = SECRET_WORD as string
) {
  const token = jwt.sign(tokenSign, secretWord, {
    expiresIn: expire,
  });

  return token;
}

function confirmToken(token: string, secretWord = SECRET_WORD as string) {
  const decoded = jwt.verify(token, secretWord);

  return decoded;
}
export { createToken, confirmToken };
