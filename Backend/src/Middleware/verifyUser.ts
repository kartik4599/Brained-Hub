import User from "../Models/userModel";
import jwt from "jsonwebtoken";

interface JwtReturn {
  userId: string;
}

export const verifyUser = async (req: any, res: any, next: Function) => {
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      let token;
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.decode(
        token,
        process.env.JWT_SECRET as any
      ) as unknown as JwtReturn;

      req.user = await User.findById(decoded.userId).select("-password");
      if (req.user) {
        next();
      } else {
        throw Error("User not identified");
      }
    }
  } catch (e) {
    res.status(404).json({ msg: "User not identified" });
    console.log(e);
  }
};
