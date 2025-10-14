import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors'
import dotenv from 'dotenv'
import usersRouter from './src/users/users.route.js';
import dbConnection from './config/db.js';
import postsRouter from './src/posts/posts.route.js';
import { error } from 'console';
import errorHandler from './src/middelwares/errorHandler.js'
import limiter from './src/middelwares/rateLimiter.js'
import authRouter from './src/auth/auth.route.js';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import { xss } from 'express-xss-sanitizer';


// const usersRouter = require("./routers/usersRouter");
const app = express();

// middleware to parse json body
dotenv.config({quiet:true});
app.use(cors());
app.use(express.json());
dbConnection()
app.use(express.urlencoded({ extended: true }));
app.use(limiter);
app.use(helmet())
app.use(mongoSanitize());
app.use(xss())

app.use(
  mongoSanitize({
    replaceWith: '_',
  }),
);

// routes
// app.use("/users", usersRouter);


app.use('/api/v1/users',usersRouter)
app.use('/api/v1/posts',postsRouter)
app.use('/api/v1/auth',authRouter)
app.all('/{*any}', (req, res) => {
    res.status(404).json({
      message: `Route not found: ${req.originalUrl}`,
      method: req.method
    });
  });

  app.use(errorHandler)
// const PORT = 5000;
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
})
