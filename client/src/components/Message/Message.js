import React from 'react';
import ReactEmoji from 'react-emoji';

const Message = ({ message: { user, text }, name }) => {
    let isSentByCurrentUser = false;
    const trimmedName = name.trim().toLowerCase();
    if(user === trimmedName) {
        isSentByCurrentUser = true;
    }

    return (
        isSentByCurrentUser ? (
            <div className='messageContainerCurrent'>
                <p className='sentTextCurrent'>{trimmedName}</p>
                <div className='messageBoxCurrent'>
                    <p className='messageTextCurrent'>{ReactEmoji.emojify(text)}</p>
                </div>
            </div>
        ) : (
            <div className='messageContainer'>
                <p className='sentText'>{user}</p>
                <div className='messageBox'>
                    <p className='messageText'>{ReactEmoji.emojify(text)}</p>
                </div>
            </div>
        )
    )
};

export default Message;