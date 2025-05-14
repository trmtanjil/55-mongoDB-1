import React from 'react'
import { NavLink } from 'react-router'

function Header() {
  return (
    <div>
        <NavLink to='/'> Home</NavLink>
        <NavLink to='/home'> Homes</NavLink>
    </div>
  )
}

export default Header