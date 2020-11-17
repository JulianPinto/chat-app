import React from 'react';
import User from '../User/User';

import './Users.css';

const Users = ({ users, color }) => (
    <div className='usersContainer' style={{backgroundColor: '#' + color}}>
        <h3>Online</h3>
        <div className='users'>
            {users.map((user, i) => <div key={i}><User name={user.name} ></User></div>)}
        </div>
    </div>
)

export default Users;