import React, { Component } from 'react'; 
import ReactHighcharts from 'react-highcharts'; 
import Highcharts from 'highcharts'; 
import Drilldown from 'highcharts-drilldown'; 
import './result.css'
Drilldown(Highcharts);

const config = {
    chart: { type: 'column',height:250 }, 
    title: { text: '매매가 비교' }, 
    //subtitle: { text: 'Click the columns to view versions. Source: <a href="http://netmarketshare.com">netmarketshare.com</a>.' }, 
    xAxis: { type: 'category' },
    yAxis:{
        title:{
            text: '평균 가격' //왼쪽 텍스트
        }
    },
    legend:{
        enabled:false
    },
    plotOptions:{
        series:{
            borderWidth:0,
            dataLabels:{
                enabled:true,
                format: '{point.y:.1f}%' //막대 표 위에 넣는 텍스트
            }
        }
    },
    tooltip: {   //막대표 마우스 데이면 나오는 div
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>', 
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>' 
    },
    series: [{ 
        name: '가격률', 
        data: [
            { name: '1분기', y: 43.33, drilldown: 'Microsoft Internet Explorer',color:'#4e61f1' }, 
            { name: '2분기', y: 24.03, drilldown: 'Chrome',color:'#4e61f1' }, 
            { name: '3분기', y: 10.38, drilldown: 'Firefox' ,color:'#4e61f1'}, 
            { name: '4분기', y: 4.77, drilldown: 'Safari',color:'#4e61f1' }, 
            { name: '5분기', y: 0.91, drilldown: 'Opera',color:'#4e61f1' }, 
            { name: '6분기', y: 0.2, drilldown: null ,color:'#4e61f1'}] }
        ],
        
   
};

function HighChart(){
    return(
        <div id="container">
            <ReactHighcharts config={config} chartHeight={200}></ReactHighcharts>
        </div>
    )
}

export default HighChart;