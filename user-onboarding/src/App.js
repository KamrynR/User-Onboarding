import React, {useState} from 'react';
import Form from './Form.js';
import UserList from './UserList.js';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);

  return (
    <div className="App">
      <Form users={users} setUsers={setUsers}/>
      <ul>
        <UserList list={users}/>
      </ul>
    </div>
  );
}

export default App;
