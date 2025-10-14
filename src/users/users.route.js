import { Router } from "express";
import usersValidation from "./users.validator.js";

import userController from "./user.controller.js";
import postsRouter from "../posts/posts.route.js";
import createUserSchema from "../utils/schemas/createUserSchema.js";
import validator from '../middelwares/validator.js'
const usersRouter=Router()
usersRouter.use('/:userId/posts',postsRouter)

// usersRouter.use('/:userId/todos',todosRouter)
usersRouter.route('/')
.get(userController.getAll)
.post(usersValidation.createOne,validator(createUserSchema),userController.createOne)

usersRouter.route('/:id')
.get(usersValidation.getOne,userController.getOne)
.put(usersValidation.updateOne,userController.updateOne)
.delete(usersValidation.deleteOne,userController.deleteOne)

export default usersRouter
