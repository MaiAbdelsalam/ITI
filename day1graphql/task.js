import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import express from 'express';
import http from 'http';
import cors from 'cors';
import mongoose from 'mongoose';
import StudentsSchema from "./students.js"
import CoursesSchema from "./courses.js"
import { title } from 'process';
// import AuthorSchema from './Author.js'
// import BookSchema from './Book.js'


// const authors=[
//     {id:"a1",name:"author1"},
//     {id:"a2",name:"author2"},
// ]
// const Books=[
//     {id:"b1", title:"t1",price:12.5,author:"a1"},
//     {id:"b2", title:"t2",price:14.0,author:"a1"},
//     {id:"b3", title:"t3",price:30.0,author:"a2"}
// ]
// The GraphQL schema
const typeDefs = `#graphql
    type Student{
    id: ID!  
    name: String!
    email: String!
    age: Int!
    major: String 
    courses:[Course!]
    }
    type Course{
    id: ID!
    title: String!
    code: String! 
    credits: Int!
    instructor: String! 
    students:[Student!]
    }
    input StudentRefInput {
    id: ID!
    }

    input CourseRefInput {
    id: ID!
    }
    input StudentInput{
        name: String!
        email: String!
        age: Int!
        major: String 
    }
    input UpdateStudentInput{
        name: String
        email: String
        age: Int
        major: String 
        courses:[CourseRefInput!]
    }
    input CourseInput{
        title: String!
        code: String! 
        credits: Int!
        instructor: String!
    }
    input updateCourseInput{
        title: String
        code: String 
        credits: Int
        instructor: String
        students:[StudentRefInput!]
}
    
    type Query{
        Students:[Student!]!
        Courses:[Course!]! 
        getStudentById(id:ID):Student!
        searchStudentByMajor(major:String):[Student!]
        getCourseById(id:ID):Course!

    }
    type Mutation{
        addStudent(input:StudentInput!):Student!
        addCoures(input:CourseInput!):Course!
        updateStudentById(id:ID!,input:UpdateStudentInput):Student!
        updateCourseById(id:ID!,input:updateCourseInput):Course!
        deleteStudentById(id:ID):Student
        deleteCourseById(id:ID):Course
        enrollStudent(studentId: ID!, courseId: ID!): Student!

    }
 
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    // Students:()=> authors,
    // getoneauthor:(_,{id})=>{ return authors.find((auth)=>auth.id===id)},
    Courses:async()=>{
        const courses=await CoursesSchema.find().populate('students')
        return courses;
    },
    Students:async()=>{
        const Students=await StudentsSchema.find().populate('courses')
        return Students;
    },
    getStudentById:async(_,{id})=>{
        const student=await StudentsSchema.findById(id)
        return student
    },
    searchStudentByMajor:async(_,{major})=>{
        const students=await StudentsSchema.find({major:major})
        return students
    }


},
    Mutation:{
        // addAuthor:async(_,{name})=>{
        //     const author=new AuthorSchema({name});
        //     author.save();
        //     return author
        // },
        addStudent:async(_,{input})=>{
            const student=new StudentsSchema(input)
            student.save()
            return student
        },
        addCoures:async(_,{input})=>{
            const student=new CoursesSchema(input)
            student.save()
            return student
        },
        updateStudentById:async(_,{id,input})=>{
            if (input.courses) {
                input.courses = input.courses.map(c => c.id);
              }
            const student=await StudentsSchema.findOneAndUpdate({_id:id},input,{new:true}).populate('courses')
            return student
        },
        updateCourseById:async(_,{id,input})=>{
            if (input.students) {
                input.students = input.students.map(c => c.id);
              }
            const course=await CoursesSchema.findOneAndUpdate({_id:id},input,{new:true}).populate('students')
            return course
        },
        deleteStudentById:async(_ ,{id})=>{
            const student=await StudentsSchema.findByIdAndDelete(id) 
        },
        deleteCourseById:async(_ ,{id})=>{
            const course=await CoursesSchema.findByIdAndDelete(id) 
        },
        enrollStudent: async (_, { studentId, courseId }) => {
            const student = await StudentsSchema.findById(studentId);
            if (!student) throw new Error("Student not found");
          
            if (!student.courses.includes(courseId)) {
              student.courses.push(courseId);
              await student.save();
            }
          
            const course = await CoursesSchema.findById(courseId);
            if (!course) throw new Error("Course not found");
          
            if (!course.students.includes(studentId)) {
              course.students.push(studentId);
              await course.save();
            }
            return await StudentsSchema.findById(studentId).populate('courses');
          }  
    },
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