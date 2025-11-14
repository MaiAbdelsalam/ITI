import React from 'react'
import TodoNavbar from '../../components/todoNavbar'
function layout({children}) {
    return (
    <div>
        <TodoNavbar /> 
        {children}
    </div>
  )
}

export default layout
