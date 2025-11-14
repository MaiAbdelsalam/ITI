import React from 'react'
import Image  from 'next/image';

function Notfound() {
  return (
    <div>
        {/* <h1 className="text-3xl font-bold mt-4">Page Not Found</h1> */}

        <div className="image">
        <img  src="/404.png" alt="404 Not Found"  width={700} style={{margin:"auto"}} />
        </div>
        <h1 className="text-3xl font-bold mt-4">Page Not Found</h1>
    
    </div>
  )
}


export default Notfound
