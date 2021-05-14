import React, { useState, useEffect, useRef } from 'react';
import Dropdown from './Dropdown'
import Router,{useRouter} from 'next/router'
import { autoComplete } from '../../../lib/stocks-lib'

const StockSearch = (props) => {

    const {  initialValue, submitHandler, error } = props

    const [search, setsearch] = useState(initialValue || "")
    const [list, setlist] = useState([])
  

    
    const input = useRef()
    
    

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (search == input.current.value && search.trim() != "") {

                autoComplete(search).then(list => setlist(list)).catch(err => console.log(err.response))
            }
        }, 500);
        if(search.trim()==""){
            setlist([])
        }
        return () => {
            
            clearTimeout(timeoutId)
        }
    }, [search])


    const setHandler = (name) => {
        setsearch(name)

    }

    

    return (
        <div className="search">
            <div className="suggestion">
                <input ref={input} placeholder="Search by Stock Name" type="search" value={search} onChange={(event) => setsearch(event.target.value)}></input>
                <Dropdown setHandler={setHandler} list={list} length={search.trim().length} />
                {error?<p className="error">Error: {error}</p>:null}
            </div>
            <button onClick={()=>submitHandler(search)}></button>
            
        </div>
    )
}

export default StockSearch;