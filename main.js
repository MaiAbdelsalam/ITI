import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors'
import dotenv from 'dotenv'
import usersRouter from './src/users/users.route.js';
import dbConnection from './config/db.js';
import postsRouter from './src/posts/posts.route.js';
import { error } from 'console';


// const usersRouter = require("./routers/usersRouter");
const app = express();

// middleware to parse json body
dotenv.config({quiet:true});
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
// app.use("/users", usersRouter);

dbConnection()
app.use('/users',usersRouter)
app.use('/posts',postsRouter)
app.all('/{*any}', (req, res) => {
    res.status(404).json({
      message: `Route not found: ${req.originalUrl}`,
      method: req.method
    });
  });
// const PORT = 5000;
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
})
