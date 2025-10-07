// import todosRouter from "../todos/todo.route.js";
// import userService from "./users.service.js";
import { Router } from "express";
// import UsersValidation from "./users.validation.js";
// import uploadStorage from "../middelwares/uploadfiles.js";
// import authService from "../auth/auth.service.js";
import usersValidation from "./users.validator.js";

import userController from "./user.controller.js";
import postsRouter from "../posts/posts.route.js";
const usersRouter=Router()
usersRouter.use('/:userId/posts',postsRouter)

// usersRouter.use('/:userId/todos',todosRouter)
usersRouter.route('/')
.get(userController.getAll)
.post(usersValidation.createOne,userController.createOne)

usersRouter.route('/:id')
.get(usersValidation.getOne,userController.getOne)
.put(usersValidation.updateOne,userController.updateOne)
.delete(usersValidation.deleteOne,userController.deleteOne)

export default usersRouter
