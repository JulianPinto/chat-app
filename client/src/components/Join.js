import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Join = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = setState('');

    return (
        <div className="outerContainer">
            <div className="innerContainer">
                <h1 className="heading">Join</h1>
                <div>
                    <input placeholder="" className="joinInput" type="text" onChange={(event) => setName(event.target.value)}></input>
                </div>
                <div>
                    <input placeholder="" className="joinInput" type="text" onChange={(event) => setRoom(event.target.value)}></input>
                </div>
                <Link onClick={event => (!name || !room) ? event.preventDefault() : null} to={'./chat?name=${name}&room=${room}'}>
                    <button className="button" type="submit">Sign In</button>
                </Link>
            </div>
        </div>
    )
}

export default Join;