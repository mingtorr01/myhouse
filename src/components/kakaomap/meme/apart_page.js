import React, { useState, useEffect, useRef } from "react";
import './meme.css';
import HighChart2 from '../../../result/linechart';
const Apart_page=(props)=>{

    useEffect(()=>{
        console.log(props.apart_data);
    },[]);

    return(
        <div className="meme_page_main">
            <div className="meme_page_title">
                <div className="meme_page_title_string">
                    사파 삼익 아파트
                </div>
                <div className="meme_page_title_string2">
                    경상남도 창원시 의창구 사림동
                </div>
                <button id="meme_page_title_button">
                </button>
            </div>
            <div className="meme_page_scroll">
                <HighChart2/>
            </div>
        </div>
    )
}

export default Apart_page;