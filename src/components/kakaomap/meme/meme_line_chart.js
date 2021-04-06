import React, { useState, useEffect, useRef }  from 'react'; 
import ReactHighcharts from 'react-highcharts'; 
import Highcharts, { color } from 'highcharts'; 
import Drilldown from 'highcharts-drilldown'; 
import '../../../result/result.css';

Drilldown(Highcharts);



function HighChart2(props){

    const [apart_data,apart_data_chage] = useState([]);


    useEffect(()=>{
        console.log(props.data);
        apart_data_chage(props.data);
    },[props.data]);
////////////////////////////////////////////////////////////

   


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
            headerFormat: '<span style="font-size:11px">평균가</span><br>', 
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b> {point.y:0f}만원</b><br/>' 
        },
          series: [{
            name: Math.floor((props.data_name/3.3058))+'평 '+'매매가 평균',
            data: props.data,
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

    ////////////////////////////////////////////////////////////
    return(
        <div id="container">
            <ReactHighcharts config={config} chartHeight={200}></ReactHighcharts>
        </div>
    )
}

export default HighChart2;