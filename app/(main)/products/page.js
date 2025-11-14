import Link from 'next/link'
import Image from 'next/image'
import React, { Suspense } from 'react'
import "./page.css"
async function page() {
    const res=await fetch('https://fakestoreapi.com/products')
    const data=await res.json()
    console.log(data)
    

  return (
    <>
    <h1>helo world’s</h1>
    <Suspense fallback={<h1>wait</h1>}>
           <div className="container mx-auto">
        <div className='grid grid-cols-3 py-4 gap-4'>
        {data.map((product)=>{
            return (
                
                <div key={product.id} className="max-w-sm p-2 o bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                    <a href="#" className='w-full p-2 box-border'>
                        <Image className="rounded-t-lg h-full" src={product.image} alt={product.title} width={100} height={100} />
                    </a>
                    <div className="p-5">
                        <a href="#">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{product.title}</h5>
                        </a>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{product.description}</p>
                        <Link href={`/products/${product.id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Read more
                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                            </svg>
                        </Link>
                    </div>
                </div>

            )
        })} 
        </div>
    </div>
    </Suspense>
    </>
 
  )
}

export default page
