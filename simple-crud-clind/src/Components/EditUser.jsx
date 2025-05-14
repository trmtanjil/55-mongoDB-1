import React from 'react'
import { useLoaderData } from 'react-router';

function EditUser() {
    const user = useLoaderData();
    const handleEdit=e=>{
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const updatedUser = {name, email}
        console.log(updatedUser)

        //update user in the data fetch
        fetch(`http://localhost:5000/users/${user._id}`,{
            method:'PUT',
            headers:{
                'Content-type': 'application/json'
            },
            body:JSON.stringify(updatedUser)
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.modifiedCount){

                console.log('after update data succefully ', data)
            }
        })
    }
  return (
    <div>
        <form onSubmit={handleEdit} >
            <input type="text" className='input' name='name'  defaultValue={user.name}/><br />
            <input type="email"  className='input' name='email'  defaultValue={user.email}/><br />
            <button className='btn'>edit</button>
        </form>
    </div>
  )
}

export default EditUser








//mongodb://localhost:27017