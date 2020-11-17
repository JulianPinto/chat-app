import React from 'react';

import './InfoBar.css';

const InfoBar = ({ name, color }) => (
    <div className='infoBar' style={{backgroundColor: '#' + color}}>
        <h3>{name}</h3>
    </div>
)

export default InfoBar;