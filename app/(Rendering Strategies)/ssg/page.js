import React from 'react'

async function getData(){
  const res=await fetch("https://6912073c52a60f10c820563f.mockapi.io/api/v1/todo",{cache:"force-cache"})
  return res.json()
}

async function page() {
  const todos =await getData()
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
