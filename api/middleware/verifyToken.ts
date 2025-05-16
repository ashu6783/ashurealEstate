import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";

interface CustomJwtPayload extends JwtPayload {
  id: string;
}

interface CustomRequest extends Request {
  userId?: string;
}

export const verifyToken = (
  req: CustomRequest, 
  res: Response, 
  next: NextFunction
): void => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({ message: "Not Authenticated" });
    return;
  }

  jwt.verify(
    token, 
    process.env.JWT_SECRET_KEY as string, 
    (err: VerifyErrors | null, payload: string | JwtPayload | undefined) => {
      if (err || typeof payload !== "object" || !("id" in payload)) {
        res.status(403).json({ message: "Token is not valid" });
        return;
      }

      req.userId = (payload as CustomJwtPayload).id;
      next();
    }
  );
};
