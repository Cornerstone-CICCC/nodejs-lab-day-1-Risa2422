import { Request, Response } from "express";
import userModel from "../models/user.model";
import { User } from "../types/user";
import { compareHash, hashed } from "../utils/hash.util";

// Get users
const getUsers = (req: Request, res: Response) => {
  const users = userModel.findAll();
  res.json(users);
};

// Get user by id
const getUserById = (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  const user = userModel.findById(id);
  if (!user) {
    res.status(404).send("User not found");
    return;
  }
  res.json(user);
};

// Add user
const addUser = async (req: Request<{}, {}, User>, res: Response) => {
  console.log(req.body);
  const { username, password, firstname, lastname } = req.body;
  const hashedPassword = await hashed(password);
  const user = userModel.createUser({
    username,
    password: hashedPassword,
    firstname,
    lastname,
  });
  res.status(201).json(user);
};

// Update user by id
const updateUserById = (
  req: Request<{ id: string }, {}, User>,
  res: Response
) => {
  const { id } = req.params;
  const { username, password, lastname, firstname } = req.body;
  const user = userModel.editUser(id, {
    username,
    password,
    lastname,
    firstname,
  });
  
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  res.status(200).json(user);
};

// Delete user by id
const deleteUserById = (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  const isDeleted = userModel.deleteUser(id);
  if (!isDeleted) {
    res.status(404).send("User not found");
    return;
  }
  res.status(200).send("User deleted!");
};

// Login user
const loginUser = async (req: Request<{}, {}, User>, res: Response) => {
  const { username, password } = req.body;
  const user = userModel.findByUsername(username);
  console.log(user, "user");
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  const isMatch = await compareHash(password, user.password);
  if (!isMatch) {
    res.status(401).json({ message: "Password is invalid " });
    return;
  }

  res.cookie(
    "user_info",
    JSON.stringify({ username: user.username, userId: user.id }),
    {
      httpOnly: false,
      maxAge: 3 * 60 * 1000,
      signed: true,
    }
  );

  res.status(200).json({ message: "Login authenticated" });
};

// Check auth profile
const userProfile = (req: Request, res: Response) => {
  const { user_info } = req.signedCookies;
  res.status(200).json(user_info);
};

// Log out
const logout = (req: Request, res: Response) => {
  res.clearCookie("user_info");
  res.status(200).send("ok");
};

export default {
  getUsers,
  getUserById,
  addUser,
  updateUserById,
  deleteUserById,
  loginUser,
  userProfile,
  logout,
};
