"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { saveNewTodo } from "@/lib/action";

export default function page() {
  const {register,handleSubmit,watch,formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    console.log("Submitted Data:", data);

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("author", data.author);

    await saveNewTodo(formData);
  };

  const titleValue = watch("title");

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Add a new Todo
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Todo Title
            </label>
            <input
              type="text"
              {...register("title", {
                required: "Title is required",
                minLength: { value: 4, message: "Minimum 4 characters" },
                maxLength: { value: 50, message: "Maximum 50 characters" },
              })}
              placeholder="Enter Todo title"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            />
            {errors.title && (
              <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Todo Author
            </label>
            <input
              type="text"
              {...register("author", {
                required: "Author is required",
                minLength: { value: 3, message: "Minimum 3 characters" },
                maxLength: { value: 30, message: "Maximum 30 characters" },
              })}
              placeholder="Enter author name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            />
            {errors.author && (
              <p className="text-red-600 text-sm mt-1">{errors.author.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="inline-flex items-center px-5 py-2.5 mt-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add Todo
          </button>
        </form>
      </div>
    </section>
  );
}
