import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import express from 'express';
import http from 'http';
import cors from 'cors';
import mongoose from 'mongoose';
import AuthorSchema from './Author.js'
import BookSchema from './Book.js'


const authors=[
    {id:"a1",name:"author1"},
    {id:"a2",name:"author2"},
]
const Books=[
    {id:"b1", title:"t1",price:12.5,author:"a1"},
    {id:"b2", title:"t2",price:14.0,author:"a1"},
    {id:"b3", title:"t3",price:30.0,author:"a2"}
]
// The GraphQL schema
const typeDefs = `#graphql
    type Author{
    id:ID!
    name:String!
    books:[Book!]!
    }
    type Book{
    id:ID!
    title:String!
    price:Float!
    author:Author!
    }
    type Query{
    authors:[Author!]!
    getoneauthor(id:ID):Author!
    book:[Book!]!
    }
    input BookInput{
    title:String
    price:Float
    author:String
    }
    type Mutation{
        addAuthor(name:String!):Author!
        addBook(input:BookInput):Book!
    }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    authors:()=> authors,
    getoneauthor:(_,{id})=>{ return authors.find((auth)=>auth.id===id)},
    book:async()=>{
        const books=await BookSchema.find().populate('author')
        return books;
    }
    
},
    Mutation:{
        addAuthor:async(_,{name})=>{
            const author=new AuthorSchema({name});
            author.save();
            return author
        },
        addBook:async(_,{input})=>{
            const book=new BookSchema(input)
            book.save()
            return book
        }
    }

};

const app = express();
const httpServer = http.createServer(app);

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();
await mongoose.connect('mongodb://localhost:27017/ITI')
app.use(
  '/graphql',
  cors(),
  express.json(),
  expressMiddleware(server),
);

await new Promise((resolve) => httpServer.listen({ port: 3000 }, resolve));
console.log(`🚀 Server ready at http://localhost:3000/graphql`);