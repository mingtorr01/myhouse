import React, { Component } from 'react'; 
import ReactHighcharts from 'react-highcharts'; 
import Highcharts, { color } from 'highcharts'; 
import Drilldown from 'highcharts-drilldown'; 
import './result.css'
Drilldown(Highcharts);

const config = {
    chart:{
      height:250,width:340
    },
    title: {
        text: ''
      },
      yAxis: {
        title: {
          text: ''
        }
      },
    
      xAxis: {
        visible:false,
        accessibility: {
          rangeDescription: 'Range: 2017 to 2021'
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
          pointStart: 2016
        }
      },
      tooltip: {   //막대표 마우스 데이면 나오는 div
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>', 
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>' 
    },
      series: [{
        name: '대방동 매매가 평균',
        data: [
          { name: '2016', y: 43.33, drilldown: 'Microsoft Internet Explorer',color:'#4e61f1' }, 
          { name: '2017', y: 24.03, drilldown: 'Chrome',color:'#4e61f1' }, 
          { name: '2017', y: 10.38, drilldown: 'Firefox' ,color:'#4e61f1'}, 
          { name: '2018', y: 4.77, drilldown: 'Safari',color:'#4e61f1' }, 
          { name: '2019', y: 0.91, drilldown: 'Opera',color:'#4e61f1' }, 
          { name: '2021', y: 0.2, drilldown: null ,color:'#4e61f1'}] ,
        color:'#4e61f1'
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