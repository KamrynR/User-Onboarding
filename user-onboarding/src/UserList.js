import React from 'react';
import './UserList.css';

const UserList = props => {
    // console.log(props.list);
    return (
        <li className='UL'>
            {props.list.map((e, i) => (
                <div className='users' key={i}>
                    <h1>User {i + 1}</h1>
                    <p>Name: {e.formState.name}</p>
                    <p>Email: {e.formState.email}</p>
                    <p>Role: {e.formState.position}</p>
                </div>
            ))}
        </li>
    )
}

export default UserList;