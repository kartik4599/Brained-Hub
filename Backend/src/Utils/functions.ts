import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const gentrateToken = (userId: any) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET as any, {
    expiresIn: Math.floor(Date.now() / 1000) + 60 * 60,
  });
};

export const authToken = (token: any) => {
  let senduser;
  jwt.verify(token, process.env.JWTToken as any, (err: any, user: any) => {
    if (err) {
      console.log(err);
    }
    senduser = user;
  });
  return senduser;
};
