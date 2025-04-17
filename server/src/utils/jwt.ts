import jwt from "jsonwebtoken";

const secretKey = "your_secret_key";
const expirationTime = "1h";

export const generateToken = (userId: string): string => {
  const payload = { userId };
  return jwt.sign(payload, secretKey, { expiresIn: expirationTime });
};
export const verifyToken = (token: string): string | jwt.JwtPayload => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    throw new Error("Invalid token");
  }
};
