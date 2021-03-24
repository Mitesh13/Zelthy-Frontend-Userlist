import {useState, useEffect} from 'react'
import Users from './Components/Users'
import './App.css';

function App() {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const usersURL = 'https://jsonplaceholder.typicode.com/users'
  
  useEffect(()=>{
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
    setUsers((usrs)=>usrs.filter((usr)=>usr!==user))
  }

  return (
    
    <div className="App">
      <div className="container-fuild users px-3">
        {
          isLoading ?
          
          <Loading />
          :
          <Users users={users} onDelete={onDelete}/>
        }
      </div>
    </div>
  );
}

const Loading = () => {
  return (
    <div className="spinner">
      <div className="cube1"></div>
      <div className="cube2"></div>
    </div> 
          
  )
}

export default App;
