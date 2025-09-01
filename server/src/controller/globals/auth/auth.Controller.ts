// login
import { Request, Response } from "express";
class LoginUser {
  static createUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    // this code only testing purpose
  };

  // registe r
  static userRegsiter = async (req: Request, res: Response) => {
    const { username, email, password, role } = req.body;
    // testing new branch
  };
}

// register
// forget password
// otp vrification
// new password chnage
