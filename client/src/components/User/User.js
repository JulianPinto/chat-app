import React from 'react';

const User = ({ name, color }) => {
    const trimmedName = name.trim().toLowerCase();

    return (
            <div className='serContainer' color={color}>
                <p className='userName'>{trimmedName}</p>
            </div>
        )
};

export default User;