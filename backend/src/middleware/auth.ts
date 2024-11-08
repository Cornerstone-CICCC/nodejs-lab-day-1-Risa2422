import { Request, Response, NextFunction } from "express";

export const cookieAuthCheck = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user_info } = req.signedCookies;
  if (user_info) {
    next();
  } else {
    res.status(403).send();
  }
};
