import React from 'react'
import { useLoaderData } from 'react-router'

function UserDetails() {
    const user = useLoaderData()
    console.log(user)
  return (
    <div>UserDetails</div>
  )
}

export default UserDetails