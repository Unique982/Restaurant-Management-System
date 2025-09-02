import { Response, NextFunction } from "express";
import { IExtended } from "./types/type";
import jwt from "jsonwebtoken";
import User from "../database/models/users.Model";
class Middleware {
  static isLoggedIn = async (
    req: IExtended,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token = req.headers.authorization;
      if (!token) return;
      res.status(401).json({ message: "Please Provide token" });

      // token verfiy
      jwt.verify(
        token,
        "process.env.JWT_WEB_TOKEN",
        async (error, result: any) => {
          if (error) {
            res.status(400).json({ messag: "Token invalid Vayo" });
          } else {
            const userData = await User.findByPk(result.id, {
              attributes: ["id", "email", "role"],
            });
            if (!userData) {
              res.status(403).json({ message: "Invalid Token" });
            } else {
              req.user = userData;
              next();
            }
          }
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
}
export default Middleware;
