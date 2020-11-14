import React from 'react';
//import closeIcon from '../../Icons/closeIcon.png';
//import onlineIcon from '../../Icons/onlineIcon.png';

const InfoBar = ({ name }) => (
    <div className='infoBar'>
        <div className='leftInnerContainer'>
            {/* <img className='onlineIcon' src={onlineIcon} alt='online'></img> */}
            <h3>{name}</h3>
        </div>
        <div className='rightInnerContainer'>
            {/* <a href="/"><img src={closeIcon} alt='close'></img></a> */}
        </div>
    </div>
)

export default InfoBar;