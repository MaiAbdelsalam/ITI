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
    type User{
        id:ID!
        email:String!
    }
    type AuthPayload{
        token:String!
        user:User
    }
    input ListOptions{
        limit:Int
        offset:Int
        sortBy:String
        sortOrder:String
    }
    input Filter{
        nameContains:String
    }
        extend type Student {
  coursesCount: Int!
}

extend type Course {
  studentsCount: Int!
}

    type Query{
        Students(filter:Filter,options:ListOptions):[Student!]!
        Courses(filter:Filter,options:ListOptions):[Course!]! 
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
        signUp(email:String!,password:String!):AuthPayload!
        login(email:String!,password:String!):AuthPayload!
   
    }
`;

export default typeDefs