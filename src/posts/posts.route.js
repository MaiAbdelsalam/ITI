// import todosRouter from "../todos/todo.route.js";
// import userService from "./users.service.js";
import { Router } from "express";
// import UsersValidation from "./users.validation.js";
// import uploadStorage from "../middelwares/uploadfiles.js";
// import authService from "../auth/auth.service.js";
import postsValidation from "./posts.validator.js";
import postsController from './posts.controller.js'
// usersRouter.use('/:userId/todos',todosRouter)
const postsRouter=Router({mergeParams:true});

postsRouter.route('/')
.get(postsController.getAll)
.post(postsValidation.createOne,postsController.createOne)

postsRouter.route('/:id')
.get(postsValidation.getOne,postsController.getOne)
.put(postsValidation.updateOne,postsController.updateOne)
.delete(postsValidation.deleteOne,postsController.deleteOne)

export default postsRouter
