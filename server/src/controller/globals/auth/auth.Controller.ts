// login
import { Request, Response } from "express";
class LoginUser {
  static createUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    // this code only testing purpose
  };
}

// register
// forget password
// otp vrification
// new password chnage
