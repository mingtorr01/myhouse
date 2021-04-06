import React, { useState, useEffect, useRef } from "react";
import './meme.css';
import HighChart2 from './meme_line_chart';
const Apart_page=(props)=>{
    const [data,data_change] = useState([]);
    const [make_data,make_data_change] = useState([]);
    const [make_data2,make_data_change2] = useState([]);
    const [apart_name,apart_name_change] = useState('');
    const [apart_address,apart_address_change] = useState('');
    useEffect(()=>{
        console.log(props.apart_data);
        data_change(props.apart_data);
        const arr = [];
        const arr2 = [];
        data.map((v,i,a)=>{
            const date= new Date(v.date);
            const year = date.getFullYear();
            const month = date.getMonth()+1;
            const day = date.getDate();
            const string = year+'.'+month+'.'+day;
            apart_name_change(v.name)
            apart_address_change(v.address)
            const box = {
                date:string,
                price:v.trade_price,
                size:v.exclusive_private_area,
                floor:v.floor,
                address :  v.address,
                name : v.name
            }
            arr2.push(box);
        })

        data.map((v,i,a)=>{
            const date= new Date(v.date);
            const year = date.getFullYear();
            const month = date.getMonth()+1;
            const day = date.getDate();
            const string = year+'년'+month+'월'+day+'일';
            const box = {
                name:string,
                y:v.trade_price,
                color:'#4e61f1'
            }
            arr.push(box);
        })
        make_data_change(arr);
        make_data_change2(arr2.reverse());

    },[props.apart_data,data]);

    return(
        <div className="meme_page_main">
            <div className="meme_page_title">
                <div className="meme_page_title_string">
                    {apart_name}아파트
                </div>
                <div className="meme_page_title_string2">
                    {apart_address}
                </div>
                <button id="meme_page_title_button">
                </button>
            </div>
            <div className="meme_page_scroll">
                <div className="meme_chart_main">
                    <div className="meme_chart_title">
                        <p>실매매가 현황</p>
                    </div>
                    <div className="meme_chart1">
                    <HighChart2 data={make_data}/>
                    </div>
                    <div className="meme_chart2">
                        <Meme_chart make_data2={make_data2}/>
                    </div>
                </div>
                
            </div>
        </div>
    )
}
const Meme_chart=(props)=>{


    return(
        <div className="pho_main">
            <div className="pho_title">
                최근 거래된 목록
            </div>
            <div className="pho_main_title">
                <div className="pho_main_title_row">
                    계약일
                </div>
                <div className="pho_main_title_row">
                    가격
                </div>
                <div className="pho_main_title_row">
                    전용평수
                </div>
                <div className="pho_main_title_row">
                    층
                </div>
            </div>
            {props.make_data2.map((v,i,a)=>{
                return(
                    <Meme_chart_row date={v.date} price={v.price} size={v.size} floor={v.floor} />
                )
            })}
        </div>
    )
}
const Meme_chart_row=(props)=>{
    return(
        <div>
            <div className="pho_main_row_main">
                <div className="pho_main_row">
                    {props.date}
                </div>
                <div className="pho_main_row">
                    {props.price}만원
                </div>
                <div className="pho_main_row">
                    {Math.floor((props.size/3.3058))}평
                </div>
                <div className="pho_main_row">
                    {props.floor}
                </div>
            </div>
        </div>
    )
}
export default Apart_page;