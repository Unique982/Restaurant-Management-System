import jwt from "jsonwebtoken";

const generatedJwtWebToken = (data: { id: string }) => {
  // @ts-ignore
  const token = jwt.sign(data, process.env.JWT_WEB_TOKEN!, {
    expiresIn: process.env.EXPIRESIN!,
  });
  return token;
};
export default generatedJwtWebToken;
