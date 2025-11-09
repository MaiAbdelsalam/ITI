import StudentsSchema from "./students.js"
import CoursesSchema from "./courses.js"
import bcrypt from "bcryptjs"
import User from "./user.js"
import { verify } from 'crypto';
import jwt from "jsonwebtoken" 
const JWT_SECRET="my-top-secret"

const resolvers = {
    Query: {
      // Students:()=> authors,
      // getoneauthor:(_,{id})=>{ return authors.find((auth)=>auth.id===id)},
      Courses:async(_,{filter,options},{user})=>{
        if(!user) throw new Error('unauthorize')
        const q={}

        if(filter?.nameContains){
            q.name=new RegExp(filter.nameContains,"i")
        } 
        const limit=Math.min(Math.max(options?.limit ?? 50, 0),100)
        const offset=Math.max(options?.offset ?? 0, 0)
        const sortBy= "ASC" || "DESC"

        const courses=await CoursesSchema.find().populate('students').sort(sortBy).limit(limit).skip(offset)
      
          return courses;
      },
      Students:async(_,{filter,options},{user})=>{
          if(!user) throw new Error('unauthorize')
          const q={}
  
          if(filter?.nameContains){
              q.name=new RegExp(filter.nameContains,"i")
          } 
          const limit=Math.min(Math.max(options?.limit ?? 50, 0),100)
          const offset=Math.max(options?.offset ?? 0, 0)
          const sortBy= "ASC" || "DESC"
          const Students=await StudentsSchema.find(q).populate('courses').sort(sortBy).limit(limit).skip(offset)
     
          return Students;
      },
      getStudentById:async(_,{id},{user})=>{
          console.log(user)
          if(!user) throw new Error("unAthorize")
          const student=await StudentsSchema.findById(id).populate('courses')
          return student
      },
      searchStudentByMajor:async(_,{major},{user})=>{
          if(!user) throw new Error("unAthorize")
          const students=await StudentsSchema.find({major:major})
          return students
      },
      getCourseById:async(_,{id},{user})=>{
          if(!user) throw new Error("unAthorize")
          const course=await CoursesSchema.findById(id).populate('students')
          return course
      },
  
  
  },
  Mutation:{
      addStudent:async(_,{input},{user})=>{
          if(!user) throw new Error("unAthorize")
          const student=new StudentsSchema(input)
          student.save()
          return student
      },
      addCoures:async(_,{input},{user})=>{
          if(!user) throw new Error("unAthorize")
          const course=new CoursesSchema(input)
          course.save()
          return course
      },
      updateStudentById:async(_,{id,input},{user})=>{
          if(!user) throw new Error("unAthorize")
          if (input.courses) {
              input.courses = input.courses.map(c => c.id);
              }
          const student=await StudentsSchema.findOneAndUpdate({_id:id},input,{new:true}).populate('courses')
          return student
      },
      updateCourseById:async(_,{id,input},{user})=>{
          if(!user) throw new Error("unAthorize")
          if (input.students) {
              input.students = input.students.map(c => c.id);
              }
          const course=await CoursesSchema.findOneAndUpdate({_id:id},input,{new:true}).populate('students')
          return course
      },
      deleteStudentById: async (_, { id }, { user }) => {
        if (!user) throw new Error("unauthorize");      
        const student = await StudentsSchema.findByIdAndDelete(id);
        if (!student) throw new Error("Student not found");      
        await CoursesSchema.updateMany(
          { students: id },
          { $pull: { students: id } }
        );
        delete enrollments[id];
        return student;
      },
      deleteCourseById: async (_, { id }, { user }) => {
        if (!user) throw new Error("unauthorize");
        const course = await CoursesSchema.findByIdAndDelete(id);
        if (!course) throw new Error("Course not found");
           Object.keys(enrollments).forEach(studentId => {
          enrollments[studentId] = enrollments[studentId].filter(
            courseId => courseId !== id);
        });
        await StudentsSchema.updateMany(
          { courses: id },
          { $pull: { courses: id } });
        return course;
      },
      enrollStudent: async (_, { studentId, courseId },{user})=>{
          if(!user) throw new Error("unAthorize")
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
          } ,
          
      signUp:async(_,{email,password})=>{
          const userExists=await User.findOne({email})
          if(userExists) throw new Error("Email already Registered")
          const passwordHash=await bcrypt.hash(password,13)
          const user=await User.create({email,passwordHash})
          const token=jwt.sign({email},JWT_SECRET,{expiresIn:"7d"})
          return {token,user}
      },
      login:async(_,{email,password})=>{
          const user=await User.findOne({email})
          if(!user) throw new Error("invalid credentials")
          const isPasswordMatch=await bcrypt.compare(password,user.passwordHash)
          if(!isPasswordMatch) throw new Error("invalid credentials")
          const token=jwt.sign({email},JWT_SECRET,{expiresIn:"7d"})
          console.log('token ' + token)
          console.log('user' +user)
          return {token,user}
          
      },   
    },
    Student: {
        coursesCount: async (parent) => {
          const student = await StudentsSchema.findById(parent.id).populate("courses");
          return student.courses.length;
        },
      },
    
      Course: {
        studentsCount: async (parent) => {
          const course = await CoursesSchema.findById(parent.id).populate("students");
          return course.students.length;
        }}, 
     
  };

  export default resolvers