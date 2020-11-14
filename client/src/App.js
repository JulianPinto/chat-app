import React, { useState, useEffect } from 'react';
import socketClient from 'socket.io-client';
import InfoBar from './components/InfoBar/InfoBar';
import Input from './components/Input/Input.js';
import Messages from './components/Messages/Messages';
import Users from './components/Users/Users';

import './App.css';

let socket;

const App = () => {

    const [name, setName] = useState(null);
    const [color, setColor] = useState(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        socket = socketClient();

        socket.on('connect', () => {});

        const savedName = sessionStorage.getItem("name");
        const savedColor = sessionStorage.getItem("color");
        if(savedName && savedColor) {
            setName(savedName);
            setColor(savedColor);
        }

        socket.emit('join', { name, color }, () => {});

        socket.on('accInfo', ({ user }) => {
            setName(user.name);
            setColor(user.color);
            
            sessionStorage.setItem("name", user.name);
            sessionStorage.setItem("color", user.color);
        });

        socket.on('messageHistory', ({ messageHistory }) => {
            setMessages(messageHistory);
        });

        return () => {
            socket.emit('disconnect user');
            socket.off();
        }        
    }, []);

    useEffect(() => {
        socket.on('userData', ({ users }) => {
            setUsers(users);
        });
    }, [users]);

    useEffect(() => { 
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        }, []);
    })

    const sendMessage = (event) => {
        event.preventDefault();
        if(message) {
            if ((message.startsWith("/name ") && (message.length > 6))) {
                const newName = message.slice(6);
                if(!users.find((user) => user.name === newName)) {
                    setName(newName);
                    sessionStorage.setItem("name", newName);
                }

            } else if (message.startsWith("/color " && message.length === 13)) {
                const newColor = message.slice(7);
                if(newColor.lenth === 6 && /^[0-9A-F]{6}$/i.test(newColor)) {
                    setColor(newColor);
                    sessionStorage.setItem("color", newColor);
                }
            }
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    return (
        <div className='outerContainer'>
            <div className='container'>
                <InfoBar name={name}></InfoBar>
                <Messages messages={messages} name={name}></Messages>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage}></Input>
            </div>
            <Users users={users}></Users>
        </div>
    )
}

export default App;