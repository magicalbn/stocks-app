import React from 'react';

const Dropdown = (props) => {
    const { list, length } = props;
   
    let count = 0  
    let content = (

    

        list.map(each => {
            if(++count >3)
            return

            return <div key={each.symbol} onClick={() => props.setHandler(each.symbol)}>
                <p className="symbol">{each.symbol}</p>
                <p className="name">{each.shortname}</p>
            </div>
        })

        

    )
    
    return (
        <div className="dropdown">

            {
                list.length ? content : (<div> <p>{!length?"Start typing . .":"Try something else"}</p></div>)
                
            }


        </div>
    )
}

export default Dropdown;