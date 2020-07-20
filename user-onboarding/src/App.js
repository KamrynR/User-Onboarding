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
        {users.length !== 0 && <div className='users-header'>List of Users</div>}
        {users.length !== 0 && <UserList list={users}/>}
      </ul>
    </div>
  );
}

export default App;
