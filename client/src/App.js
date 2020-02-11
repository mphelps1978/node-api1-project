import React, { useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import UserApp from './components/UserApp'

function App() {
  const [user, setUser] = useState([])

  useEffect(() => {
    axios
    .get('http://localhost:5000/api/users')
    .then(res =>{
      setUser(res.data)
    })
    .catch(err => console.log(err))

  }, [])
  // console.log(user);

  return (
    <div className="App">
      <UserApp user={user} />

    </div>
  );
}

export default App;
