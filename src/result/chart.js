import React, { Component } from 'react'; 
import ReactHighcharts from 'react-highcharts'; 
import Highcharts from 'highcharts'; 
import Drilldown from 'highcharts-drilldown'; 
import './result.css'
import { PromiseProvider } from 'mongoose';
Drilldown(Highcharts);



function HighChart(props){
    const config = {
        chart: { type: 'column',height:250,width:340 }, 
        title: { text: '' }, 
        //subtitle: { text: 'Click the columns to view versions. Source: <a href="http://netmarketshare.com">netmarketshare.com</a>.' }, 
        xAxis: { type: 'category' },
        yAxis:{
            title:{
                text: '' //왼쪽 텍스트
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
                    format: '{point.y}' //막대 표 위에 넣는 텍스트
                }
            }
        },
        tooltip: {   //막대표 마우스 데이면 나오는 div
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>', 
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> of total<br/>' 
        },
        series: [{ 
            name: '가격률', 
            data: props.gipho_data
        }],
            
       
    };
    return(
        <div id="container">
            <ReactHighcharts config={config} chartHeight={200}></ReactHighcharts>
        </div>
    )
}

export default HighChart;