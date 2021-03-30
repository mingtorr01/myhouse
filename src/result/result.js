import './result.css'
import React, { useState, useEffect, useRef } from "react";
import HighChart from './chart';
import HighChart2 from './linechart';
import { map } from 'highcharts';


const top10 = ['창원시 대방동','서울특별시 신림동','창원시 사림동','창원시 명서동','창원시 봉곡동','전라남도 보성읍','창원시 성주동','창원시 남양동','창원시 사파동','창원시 회원동']
const moneytype = ['매매','월전세'];
function Result(props){
    const [result_data,data_change] = useState([]); //대분류,소분류
    const [result_data2,data_change2] = useState([]); //소분류
    useEffect(() => { 
        console.log("그래그래"+JSON.stringify(props.select_gipho_data));
        data_make(props.select_gipho_data)
    },[]);

    const data_make =(data)=>{
        let making = []
        let making2 = []
        data.map((v,i,t)=>{
           making.push(v.bigname)
        })
        const set = new Set(making);
        const uniqueArr = [...set];
        console.log(uniqueArr);

        uniqueArr.map((v,i,t)=>{ // 큰배열
            const arr = []
            data.map((v2,i2,t2)=>{ //작은배열
                if(v===v2.bigname){
                    arr.push(v2.name);
                }
            })
            making2.push({bigname:v, arr:arr});
         })

         console.log(making2);
         data_change(making2)
         data_change2(making2[0].arr);
    }
    const onclick2=(name)=>{
        console.log(name);
        result_data.map((v,i,a)=>{
            if(v.bigname===name){
                data_change2(v.arr);
            }
        })
        console.log(result_data2);
    }
    return(
        <div className="result_main">
            <div className="result_all_gipho_title">
                1. 추천지역 리스트
            </div>
            <div className="result_all_gipho">
                <div className="result_all_gipho1">
                    {top10.map((v,i,a)=>{
                        if(i<5)
                        return(
                            <a href="#" className="show_all_gipho">
                                <div id="show_all_gipho_circle">
                                    <div id="circle_num">
                                    {i+1}
                                    </div>
                                </div>
                                <div id="show_all_gipho_main">
                                {v}
                                </div>
                            </a>
                        )
                    })}
                </div>
                <div className="result_all_gipho2">
                    {top10.map((v,i,a)=>{
                            if(i<10&&i>4)
                            return(
                                <a href="#" className="show_all_gipho">
                                <div id="show_all_gipho_circle">
                                    <div id="circle_num">
                                    {i+1}
                                    </div>
                                </div>
                                <div id="show_all_gipho_main">
                                {v}
                                </div>
                            </a>
                            )
                        })}
                </div>
            </div>
            <div className="result_gipho">
                <div className="result_all_gipho_title2">
                    2. 선택한 지표 현황별 보기
                </div>
                <div className="result_gipho_title">
                {result_data.map((v,i,a)=>{
                    return(
                        <button onClick={()=>onclick2(v.bigname)} id="result_button">
                            {v.bigname}
                        </button>
                    )
                })}
                </div>
                <div className="result_gipho_title2">
                    {
                        result_data2.map((v,i,a)=>{
                            return(<button id="result_button2">{v}</button>)
                        })
                    }
                </div>
                <HighChart/>
            </div>
            <div className="money_result">
                <div className="result_all_gipho_title3">
                    3. {'창원시 대방동'} 평균가
                </div>
                <div className="result_gipho_title">
                {moneytype.map((v,i,a)=>{
                    return(
                        <button  id="result_button">
                            {v}
                        </button>
                    )
                })}
                </div>
                <HighChart2/>
            </div>
        </div>
    )
}

export default Result