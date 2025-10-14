import AuthValidation from "./auth.validation.js";
import authService from "./auth.service.js";
import { Router } from "express";
import uploadStorage from "../middelwares/upload.js";

const authRouter=Router();

authRouter.post('/signUp',uploadStorage.single("file"),AuthValidation.signUp,authService.signUp)
authRouter.post('/logIn',AuthValidation.logIn,authService.logIn)
// usersRouter.put('/changeUserPassword/:id',UsersValidation.changeUserPassword,userService.changeUserPassword)
export default authRouter
