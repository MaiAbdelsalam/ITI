import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import express from 'express';
import http from 'http';
import cors from 'cors';
import mongoose from 'mongoose';
import typeDefs from './typeDefs.js';
import resolvers from './resolvers.js';
import StudentsSchema from "./students.js"
import CoursesSchema from "./courses.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken" 
import User from "./user.js"
import { verify } from 'crypto';

const JWT_SECRET="my-top-secret"

// The GraphQL schema


// A map of functions which return data for the schema.


const app = express();
const httpServer = http.createServer(app);

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();
await mongoose.connect('mongodb://localhost:27017/ITI')
app.use(
    '/graphql',
    cors({
      origin: 'http://localhost:3000', 
      credentials: true
    }),
    express.json(),
    expressMiddleware(server,{
        context: async ({ req }) => {
            let user=null
            let token = '';
            if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
                token = req.headers.authorization.split(' ')[1];
            } else {
                return { user: null };
            }
            try {

            const decoded = jwt.verify(token, JWT_SECRET);
            console.log("DECODED " , decoded)
            user = await User.findOne({ email: decoded.email });
            }catch(err){
                console.log('invalid token')
            }
            return {user};
        }
        
    })
  );;

await new Promise((resolve) => httpServer.listen({ port: 3000 }, resolve));
console.log(`🚀 Server ready at http://localhost:3000/graphql`);