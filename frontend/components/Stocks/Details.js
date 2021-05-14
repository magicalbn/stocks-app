import React,{useState} from 'react';

import Fade from 'react-reveal/Fade';

const Details = (props) => {

    const [showDetail,setshowDetail] = useState(false)

    const { stockDetails } = props;

    const { summaryProfile, price, ceo } = stockDetails

    let city = summaryProfile.city?summaryProfile.city+", ":""
    let state = summaryProfile.state?summaryProfile.state+", ":""
    let country = summaryProfile.country?summaryProfile.country:""
    const location = `${city}${state}${country}`
    const na = "-"


    const showDetails =()=>{
        setshowDetail(!showDetail);
    }
    
 

    return (
        <div className="details">
            <div className="controller"><h2>About</h2><button className={'desc '+ (showDetail?'show':'')} onClick={showDetails}></button></div>
            
            <Fade collapse when={showDetail}><p className="description">{summaryProfile.longBusinessSummary}</p></Fade>
            <div className="content">
                <div className="each">
                    <p className="title">CEO</p>
                    <p>{stockDetails.ceo||na}</p>
                </div>
                <div className="each">
                    <p className="title">Website</p>
                    <p>{summaryProfile.website||na}</p>
                </div>
                <div className="each">
                    <p className="title">Headquaters</p>
                    <p>{location||na}</p>
                </div>
                <div className="each">
                    <p className="title">Industry</p>
                    <p>{summaryProfile.industry||na}</p>
                </div>
                <div className="each">
                    <p className="title">Market Cap</p>
                    <p>{price.marketCap||na}</p>
                </div>
                <div className="each">
                    <p className="title">Average Volume</p>
                    <p>{price.avgVolume||na}</p>
                </div>


            </div>
        </div>

    )
}

export default Details