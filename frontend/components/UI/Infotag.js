import React from 'react';

const Infotag = () =>{
    return(
        <div className="infotag">
            <span>i</span>
            <div className="info">
                <ul>
                    <li>Email should be in the correct format (example@ex.ex)</li>
                    <li>Password should be min 8 charcters long</li>
                    <li>Password in both feilds should match</li>
                </ul>
            </div>
        </div>
    )
}

export default Infotag