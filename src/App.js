import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const nameRef = useRef();
  const emailRef = useRef();

  useEffect(() => {
    fetch('http://localhost:8000/users')
    .then(res => res.json())
    .then(data => setUsers(data));
  }, [])

  //server data setting
const handleSubmit = (e) => {
  const name = nameRef.current.value;
  const email = emailRef.current.value;

  const newUser = {name: name, email: email }

  //sending data to the server
  fetch('http://localhost:8000/users', {
    method: 'post',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(newUser)
  })
  .then(res => res.json())
  .then(data => {
    console.log(data);
    const addedUser = data;
    const newUsers = [...users, addedUser];
    setUsers(newUsers);
  })
nameRef.current.value = '';
emailRef.current.value = '';
  e.preventDefault();
}

  return (
    <div className="App">

    <form onSubmit={handleSubmit}>
      <input type="text" ref={nameRef} name="" id="" placeholder="name" />
      <input type="email" ref= {emailRef} name="" id="" placeholder="email" />
      <input type="submit" name="" id="" />
    </form>
    <ul>
    {
      users.map(user => <li>{user.name}</li>)
    }
    </ul>
      <h1>this is users : {users.length}</h1>
    </div>
  );
}

export default App;
