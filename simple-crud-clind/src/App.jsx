 
import './App.css'
import Users from './Components/users'

const usersPromiss = fetch('http://localhost:5000/users').then(res=>res.json())
function App() {
 

  return (
    <>
      
      <h1>simple crud operaton  </h1>
       <Users usersPromiss={usersPromiss}></Users>
    </>
  )
}

export default App