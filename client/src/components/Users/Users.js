import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import User from '../User/User';

import './Users.css';

const Users = ({ users }) => (
    <ScrollToBottom className='users'>
        {users.map((user, i) => <div key={i}><User name={user.name} color={user.color}></User></div>)}
    </ScrollToBottom>
)

export default Users;