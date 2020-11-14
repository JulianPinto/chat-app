const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = process.env.PORT || 8000;

let messageHistory = [];
let users = [];

const validColor = (color) => {
    return (color.lenth === 6 && /^[0-9A-F]{6}$/i.test(color));
}


io.on('connection', (socket) => {
    console.log('new connection ' + socket.id);

    socket.on('join', ({ name, color }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, color });
        console.log(`user created: ${user.id} ${user.name} ${user.color}`);

        if(error){
            callback({error});
        }

        socket.emit('accInfo', { user });

        socket.emit('message', { user: 'admin', text:`${user.name}, welcome to the room!` });
        socket.broadcast.to(0).emit('message', { user:'admin', text:`${user.name} has joined!`});

        socket.emit('messageHistory', { messageHistory });

        socket.join(0);

        io.to(0).emit('userData', { users });
        callback();
    }, []);

    socket.on('sendMessage', (message, callback) => {
        const{ user } = getUser(socket.id);
        if(!(message[0] === '/')) {
            const date = new Date();
            const timeStamp = date.getHours() + ":" + date.getMinutes();
            if(messageHistory.unshift({ user: user.name, text: message, timeStamp }) >= 200) {
                messageHistory.pop();
            }
            io.emit('message', { user: user.name, text: message, timeStamp });

        } else if ((message.startsWith("/name ") && (message.length > 6))) {
            const newName = message.slice(6);
            if(changeName(newName)) {
                io.emit('userData', { users });
            }

        } else if (message.startsWith("/color " && message.length === 13)) {
            const newColor = message.slice(7);
            if(validColor(newColor)) {
                changeColor(socket.id, newColor);
                io.emit('userData', { users });
            }
        }
        callback();
    }, []);

    socket.on('disconnect user', () => {
        console.log("disconnecting user");
        const user = removeUser(socket.id);
        if(user) {
            io.emit('message', {user: 'admin', text: `${user.name} has left.`});
            io.to(0).emit('userData', { users });
        }
    }, []);
});

const addUser = ({ id, name, color }) => {
    if(name === null) {
        name = "user-" + id;
    }
    name = name.trim().toLowerCase();

    const existingUser = users.find((user) => user.name === name);

    if(existingUser) {
        return { error: 'Username is taken'};
    }

    if(color === null) {
        color = Math.floor(Math.random()*16777215).toString(16);
    }
    let user = { id, name, color, room: 0 };

    users.push(user);

    return { user };
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);

    if(index !== -1) {
        return users.splice(index, 1)[0];
    }
}

const getUser = (id) => {
    return { user: users.find((user) => user.id === id) };
}

const changeColor = ( id, color ) => {
    const userIndex = users.findIndex((u) => u.id === id);
    if(userIndex !== -1) {
        user[userIndex].color = color;
        return true;
    }
    return false;
}

const changeName = ( name ) => {
    const userIndex = users.findIndex((user) => user.name === name);
    if(userIndex !== -1) {
        users[userIndex].name = name;
        return true;
    }
    return false;
}

server.listen(PORT, () => console.log(`server started on ${PORT}`));