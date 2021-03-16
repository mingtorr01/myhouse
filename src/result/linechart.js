import React, { Component } from 'react'; 
import ReactHighcharts from 'react-highcharts'; 
import Highcharts from 'highcharts'; 
import Drilldown from 'highcharts-drilldown'; 
import './result.css'
Drilldown(Highcharts);

const config = {
    chart:{
        height:250
    },
    title: {
        text: ''
      },
      yAxis: {
        title: {
          text: '가격률'
        }
      },
    
      xAxis: {
        accessibility: {
          rangeDescription: 'Range: 2010 to 2017'
        }
      },
    
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
      },
    
      plotOptions: {
        series: {
          label: {
            connectorAllowed: false
          },
          pointStart: 2010
        }
      },
    
      series: [{
        name: '상남동 매매거래량',
        data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
      }],
    
      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom'
            }
          }
        }]
      }
    
}

function HighChart2(){
    return(
        <div id="container">
            <ReactHighcharts config={config} chartHeight={200}></ReactHighcharts>
        </div>
    )
}

export default HighChart2;