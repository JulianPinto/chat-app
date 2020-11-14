import React from 'react';

import './InfoBar.css';

const InfoBar = ({ name }) => (
    <div className='infoBar'>
        <div className='leftInnerContainer'>
            <h3>{name}</h3>
        </div>
        <div className='rightInnerContainer'>
        
        </div>
    </div>
)

export default InfoBar;