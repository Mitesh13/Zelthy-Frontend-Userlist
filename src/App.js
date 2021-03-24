import {useState, useEffect} from 'react'
import Users from './Components/Users'
import Loading from './Components/Loading'
import './App.css';

function App() {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const usersURL = 'https://jsonplaceholder.typicode.com/users'
  
  useEffect(()=>{
    // Fetches users from API

    const func = async() =>{
      let res = await fetch(usersURL)
      let data = await res.json()
      
      setUsers(()=>{
        setIsLoading(()=>false)
        return data
      })
    }
    func()
  },[])
  
  const onDelete = (user) =>{
    // Removing element when delete icon is clicked
    setUsers((usrs)=>usrs.filter((usr)=>usr!==user))
  }

  return (
    <div className="App">
      <div className="container-fuild users px-3">
        {
          // Shows Loading screen while API fetches users data and displays users when fetched.
          isLoading ?
          <Loading />
          :
          <Users users={users} onDelete={onDelete}/>
        }
      </div>
    </div>
  );
}

export default App;
