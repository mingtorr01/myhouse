import './result.css'
import * as React from 'react';
import HighChart from './chart';
import HighChart2 from './linechart';



function Result(props){
    return(
        <div className="result_main">
            <div className="result_chart1">
                <HighChart/>
            </div>
            <div className="result_chart1">
                <HighChart2/>
            </div>
        </div>
    )
}

export default Result