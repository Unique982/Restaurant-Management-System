import { Request, Response, NextFunction } from "express";
import { IExtendedRequest, userRole } from "./types/type";
import jwt from "jsonwebtoken";
import User from "../database/models/users.Model";
class Middleware {
  static isLoggedIn = async (
    req: IExtendedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
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
            return res.status(400).json({ messag: "Token invalid Vayo" });
          } else {
            const userData = await User.findByPk(result.id, {
              attributes: ["id", "role"],
            });
            if (!userData) {
              res.status(403).json({ message: "Invalid Token" });
            } else {
              req.user = userData;
              console.log(userData);
              next();
            }
          }
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
  // role base access
}
export default Middleware;
