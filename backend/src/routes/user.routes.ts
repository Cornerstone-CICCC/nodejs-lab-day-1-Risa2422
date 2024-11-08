import { Router, Request, Response } from "express";
import userController from "../controllers/user.controller";
import { cookieAuthCheck } from "../middleware/auth";

const userRouter = Router();

userRouter.post("/signup", userController.addUser);
userRouter.post("/login", userController.loginUser);
userRouter.get("/check-auth", cookieAuthCheck, userController.userProfile);
userRouter.get("/users", userController.getUsers);
userRouter.get("/user/:id", userController.getUserById);
userRouter.put("/user/:id", userController.updateUserById);
userRouter.delete("/user/:id", userController.deleteUserById);

// Logout Route
userRouter.get("/logout", (req: Request, res: Response) => {
  res.clearCookie("user_info");
  res.status(200).send("ok");
});

export default userRouter;
