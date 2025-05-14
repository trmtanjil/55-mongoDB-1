import React from 'react'
import { Outlet } from 'react-router'
import Header from './Header'

function MainLayout() {
  return (
    <div>
        <Header></Header>
        <Outlet></Outlet>
    </div>
  )
}

export default MainLayout