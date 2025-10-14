
import { Router } from "express";
import postsValidation from "./posts.validator.js";
import postsController from './posts.controller.js'
const postsRouter=Router({mergeParams:true});

postsRouter.route('/')
.get(postsController.getAll)
.post(postsValidation.createOne,postsController.createOne)

postsRouter.route('/:id')
.get(postsValidation.getOne,postsController.getOne)
.put(postsValidation.updateOne,postsController.updateOne)
.delete(postsValidation.deleteOne,postsController.deleteOne)

export default postsRouter
