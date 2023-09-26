import React from 'react'
import { Outlet } from "react-router-dom"

const LayoutMain = () => {
  return (
    <div className="app-layout">
    
        <main className='app-main'>
        <Outlet />
        </main>

    </div>
  )
}

export default LayoutMain