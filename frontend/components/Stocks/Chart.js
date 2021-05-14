import React, { useState,useEffect } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Label } from 'recharts';

const Chart = (props) => {

    const [filter, setfilter] = useState("12")
    

    const { chartTimestamp, chartStockvalue, title, price } = props;
    
    
    let Chartheight = 500
    let Chartwidth = 600
    
    let Chartmarginleft = 50
    const windowWidth = window.innerWidth;

    if(windowWidth<800){
        Chartheight=450;
        Chartwidth=450
    }
    if(windowWidth<600){
        Chartheight=250;
        Chartwidth=250;
        Chartmarginleft=0
    }

    const monthname = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const monthnumber = { Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6, Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12 }


    let timeVALUE = []
    chartTimestamp && chartTimestamp.forEach(each => {
        var date = new Date(each * 1000)
        timeVALUE.push(`${date.getDate()} ${monthname[date.getMonth()]} ${date.getFullYear()}`)
    })


    let testdata = []
    let datamin = 1000;
    let datamax = 0

    let cutoffDate = new Date();
    cutoffDate.setMonth(cutoffDate.getMonth() - Number(filter))



    Object.keys(timeVALUE).map(each => {

        const time = timeVALUE[each].split(" ")
        const current = new Date(Number(time[2]), Number(monthnumber[time[1]]))


        if (current < cutoffDate) {

            return
        }
        else if (Number(each) % 2 == 0) {
            return
        }



        testdata.push({

            name: `${timeVALUE[each]}`, value: parseFloat(chartStockvalue[each]).toFixed(2), pv: 3000, amt: 7000
        })

        //  console.log(testdata.length)

        if (testdata[testdata.length - 1].value > datamax) {
            datamax = parseInt(testdata[testdata.length - 1].value)
        } else if (testdata[testdata.length - 1].value < datamin) {
            datamin = parseInt(testdata[testdata.length - 1].value)
        }

    })

    const yLabel = `${price.currency} ${price.currencySymbol}`
    const xlabel = ""
    const renderLineChart = (
        
        <LineChart width={Chartwidth} height={Chartheight} data={testdata} margin={{ top: 50, right: 0, bottom: 20, left: Chartmarginleft }}  >
            <Line type="monotone" dataKey="value" stroke="#44AE68" isAnimationActive={true} dot={false} strokeWidth="3px" />

            <XAxis dataKey="name" padding={{ left: 20, right: 20 }}>
                <Label value={xlabel} offset={-10} position="insideBottom" />
            </XAxis>
            <YAxis type="number" domain={[datamin - 20, datamax + 50]} padding={{ bottom: 10 }}>
                <Label value={yLabel} offset={-30} position="insideLeft" />
            </YAxis>
            <Tooltip />
        </LineChart>
        
    )


    return (

        <div className="chart">
            <h2>{title}</h2>
            <p className="cost"><span>{price.value||"NA"}</span> {price.currency}</p>


            {
                !chartTimestamp ? <p className="error">No history Found</p> : null
            }
            {renderLineChart}
            <div className="time-filter">

                <span className={"filter " + (filter == "3" ? "active" : "")} name="3" onClick={(event) => setfilter(event.target.getAttribute("name"))}>3 months</span>
                <span className={"filter " + (filter == "6" ? " active" : "")} name="6" onClick={(event) => setfilter(event.target.getAttribute("name"))}>6 months</span>
                <span className={"filter " + (filter == "12" ? " active" : "")} name="12" onClick={(event) => setfilter(event.target.getAttribute("name"))}>1 year</span>
            </div>
        </div>



    )

}

export default Chart;