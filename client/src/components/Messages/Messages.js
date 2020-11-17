import React, { useEffect, useRef } from 'react'
import Message from '../Message/Message';

import './Messages.css';

const Messages = ({ messages, name, color }) => {

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(scrollToBottom, [messages]);

    return (
        <div className='messages'>
            {messages.map((message, i) => <div key={i}><Message message={message} name={name} color={color}></Message></div>)}
            <div ref={messagesEndRef}/>
        </div>
    )
};

export default Messages;