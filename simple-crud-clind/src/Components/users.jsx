import { use, useState } from "react";
import { Link } from "react-router";

function Users({usersPromiss}) {
 
const initialUsers = use(usersPromiss)
const [users, setUsers] = useState(initialUsers)
console.log(initialUsers)

const hadleusercreat=e=>{
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const newuser = {name, email};
    console.log(newuser);

    fetch('http://localhost:5000/users',{
        method:'POST',
        headers:{
              "Content-Type": "application/json",
        },
        body:JSON.stringify(newuser)
    })
    .then(res=>res.json())
    .then(data=>{
        console.log('after adding data ', data)
        if(data.insertedId){
            newuser._id= data.insertedId;
            const newUsers = [...users, newuser];
            setUsers(newUsers);
            alert('data succefully added')


            e.target.reset();
        }
    })
}
const handleDelet =(id)=>{
    console.log('delet user succes',id)
    fetch( `http://localhost:5000/users/${id}`,{
        method:'DELETE'
    })
    .then(res =>res.json())
    .then(data =>{
          if(data.deletedCount){
            const remainingUsers = users.filter(user=> user._id !== id );
            setUsers(remainingUsers)
            console.log(remainingUsers)
            console.log('after delete ', data)
        }
    })
}
  return (
    <div>
        <div>
            <h1>Length : {users.length}</h1>
            <form onSubmit={hadleusercreat}>
                <input className='input my-4' type="text" name='name' placeholder='name' /><br />
                <input className='input' type="email" name='email' placeholder='email' /><br />
                <button className='btn'>onSubmit</button>
            </form>
        </div>
        <div>
            {
                users.map(user=><p className="border border-amber-100 m-10 rounded-xl p-3">{user.name} : {user.email}

                    <Link className="btn ml-3" to={`/users/${user._id}`}>Details</Link>
                    <Link className="btn ml-3" to={`/edituser/${user._id}`}>
                    Edit
                    </Link>


                <button className=" ml-5 btn" onClick={()=>handleDelet(user._id)}>x</button>
                </p>)
            }
        </div>
    </div>
  )
}

export default Users