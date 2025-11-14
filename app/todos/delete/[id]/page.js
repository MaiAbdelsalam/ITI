import React from 'react'
import { DELETE } from '../../../api/todos/[id]/route'
import { redirect } from "next/navigation"
import { deleteTodo } from '../../../../lib/action'

async function page({params}) {
  const { id } =await params
  await deleteTodo({ id })
  return (
    <div>
            
    </div>
  )
}

export default page
