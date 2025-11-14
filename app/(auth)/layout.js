import React from 'react'
import AuthNavBar from "@/components/AuthNavBar.jsx"
function layout({children}) {
  return (
    <div>
      <AuthNavBar />
      {children}
    </div>
  )
}

export default layout
