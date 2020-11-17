import React from 'react';

const User = ({ name }) => {
    const trimmedName = name.trim().toLowerCase();

    return (
            <div className='serContainer'>
                <p className='userName'>{trimmedName}</p>
            </div>
        )
};

export default User;