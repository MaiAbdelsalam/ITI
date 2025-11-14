"use client"
import React, { useEffect, useState } from 'react'

function page() {
  const [todos , setTodos]=useState([]);
  async function getTodos(){
    const res=await fetch("https://6912073c52a60f10c820563f.mockapi.io/api/v1/todo")
    const data=await res.json()
    setTodos(data)
  };
  useEffect(()=>{
    (()=>{
      getTodos()
    })()
  },[])
  return (
    <div className='grid grid-cols-4'>
      {
        todos.map((todo)=>{
          return <p key={todo.id}> {todo.name}</p>
        })
      }
    </div>
  )
}

export default page
