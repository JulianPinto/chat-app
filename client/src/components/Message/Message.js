import React from 'react';
import ReactEmoji from 'react-emoji';

const Message = ({ message: { user, text, timeStamp }, name }) => {
    const trimmedName = name.trim().toLowerCase();
    if(user === trimmedName) {
        return (
            <div className='messageContainerCurrent'>
                <p className="timeStamp">{timeStamp}</p>
                <p className='sentTextCurrent'>{trimmedName}</p>
                <div className='messageBoxCurrent'>
                    <p className='messageTextCurrent'>{ReactEmoji.emojify(text)}</p>
                </div>
            </div>
        )
    }

    return (
        <div className='messageContainer'>
            <div className='messageBox'>
                <p className='messageText'>{ReactEmoji.emojify(text)}</p>
            </div>
            <p className='sentText'>{user}</p>
            <p className='timeStamp'>{timeStamp}</p>
        </div>
    )
};

export default Message;