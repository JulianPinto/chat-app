import React from 'react';
import ReactEmoji from 'react-emoji';

import './Message.css';

const Message = ({ message: { user, text, timeStamp }, name, color }) => {
    const trimmedName = name.trim().toLowerCase();
    if(user === trimmedName) {
        return (
            <div className='messageContainer'>
                <div className='messageBoxCurrent' style={{backgroundColor: '#' + color}}>
                    <p className='sentText'>{trimmedName}</p>
                    <p className='messageText'>{ReactEmoji.emojify(text)}</p>
                    <div className="timeStampCurrent">{timeStamp}</div>
                </div>
            </div>
        )
    }

    return (
        <div className='messageContainer'>
            <div className='messageBox'>
                <p className='sentText'>{user.trim().toLowerCase()}</p>
                <p className='messageText'>{ReactEmoji.emojify(text)}</p>
                <div className='timeStamp'>{timeStamp}</div>
            </div>
        </div>
    )
};

export default Message;