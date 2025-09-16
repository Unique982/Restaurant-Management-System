export interface ILoginData {
  email: string;
  password: string;
}

export interface IRegisterInput {
  email: string;
  username: string;
  password: string;
}

export interface forget {
  email: string;
}

export interface otp {
  email: string;
  otp: number;
}
export interface changePassord {
  email: string;
  password: string;
}
