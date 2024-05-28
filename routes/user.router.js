import express from "express";
import { users } from "../controllers/users.controllers.js";
// import { isWorkerOrOwnerOrCustomer } from "../auth/middleware.js";
// import { checkReqForAuthToken } from "../auth/auth.js";
// import {
//   validateReqUser,
//   userSchema,
//   userUpdateSchema,
// } from "../auth/data-validation.js";

const userRouter = express.Router();

userRouter.get(
  "/",users.getAllUsers
);
userRouter.post("/register", users.createUser);
userRouter.post("/login", users.userLogin);
userRouter.get( "/:id", users.getUser
);
userRouter.patch("/:id", users.updateUser);
userRouter.delete("/:id",users.deleteUser);
export default userRouter;
