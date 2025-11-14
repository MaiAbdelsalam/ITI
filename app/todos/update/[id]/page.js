// import React from 'react'
// import { updateTodo } from '../../../../lib/action'
// import { todo } from '../../../../lib/models/todo';
// async function page({params}) {
//     const {id}=await params
//     const currentTodo = await todo.findById(id);
//   return (
//     <section className="bg-white dark:bg-gray-900">
//   <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
//       <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new Todo</h2>
//       <form action={updateTodo}>
        
//           <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
//               <div className="sm:col-span-2">
//                   <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Todo Name</label>
//                   <input type="text" name="title" defaultValue={currentTodo.title} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required="" />
//               </div>
//               <div className="sm:col-span-2">
//                   <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Todo Title</label>
//                   <input type="text" name="author" defaultValue={currentTodo.author} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required="" />
//               </div>
//           </div>
//           <button type="submit"  className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white  bg-blue-600 hover:bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200">
//                 Add product
//           </button>

//       </form>
//   </div>
// </section>
   
//   )
// }

// export default page
import React from 'react'
import { updateTodo } from '../../../../lib/action'
import { todo } from '../../../../lib/models/todo';

async function page({ params }) {
  const { id } =await params;
  const currentTodo = await todo.findById(id);

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Edit Todo</h2>
        <form action={updateTodo}>
          <input type="hidden" name="id" value={id} />

          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="sm:col-span-2">
              <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Todo Name
              </label>
              <input
                type="text" name="title" defaultValue={currentTodo.title || ''} id="title" placeholder="Type Todo title" required minLength={4} maxLength={50}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="author" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Todo Author
              </label>
              <input
                type="text" name="author" defaultValue={currentTodo.author || ''} id="author"
                placeholder="Type Todo author" required minLength={3} maxLength={30}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              />
            </div>
          </div>

          <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-600 hover:bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200">
            Update Todo
          </button>
        </form>
      </div>
    </section>
  )
}

export default page
