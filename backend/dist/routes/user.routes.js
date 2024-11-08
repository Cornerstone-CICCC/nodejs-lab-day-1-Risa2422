"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const auth_1 = require("../middleware/auth");
const userRouter = (0, express_1.Router)();
userRouter.post("/signup", user_controller_1.default.addUser);
userRouter.post("/login", user_controller_1.default.loginUser);
userRouter.get("/check-auth", auth_1.cookieAuthCheck, user_controller_1.default.userProfile);
userRouter.get("/users", user_controller_1.default.getUsers);
userRouter.get("/user/:id", user_controller_1.default.getUserById);
userRouter.put("/user/:id", user_controller_1.default.updateUserById);
userRouter.delete("/user/:id", user_controller_1.default.deleteUserById);
userRouter.get("/logout", user_controller_1.default.logout);
exports.default = userRouter;
