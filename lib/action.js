'use server'

import { redirect } from "next/navigation"
import { todo } from "./models/todo"

export async function saveNewTodo(formData) {
    const title=formData.get("title")
    const author=formData.get("author")
    await todo.create({title,author})
    redirect("/todos")
}
export async function deleteTodo({ id }) {
    await todo.findByIdAndDelete(id)
    redirect("/todos")
}
export async function updateTodo(formData) {
    const id = formData.get("id");
    const title=formData.get("title")
    const author=formData.get("author")
    await todo.findByIdAndUpdate(id,{title,author},{new:true})
    redirect("/todos")
}

