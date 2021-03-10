import React, { useState,useEffect } from "react";
import './favorite_3.css';
function Favorite_3(props){
    return(
        <div className="Favorite_3_main">
            <div className="Favorite_3_main_div">
            <div className="favorite_title_div">
                    <button id="back_step">
                        
                    </button>
                    <p id="favorite_title_p2">3 step</p>
                    <p>지표를 선택하세요. (3/3)</p>
                    <button>
                        
                    </button>
            </div>
            <div className="Favorite_3_main_div_scroll">
                <div className="favorite_item_div">
                    <p>환경 지표</p>
                    <div className="favorite_enviroment_item_div">
                        <button onClick={()=>{props.control_change("대기오염도")}}>
                            대기오염도
                        </button>
                        <button onClick={()=>{props.control_change("녹지비율")}}>
                            녹지비율
                        </button>
                    </div>
                </div>
                <div className="favorite_item_div">
                    <p>교육 지표</p>
                    <div className="favorite_enviroment_item_div">
                        <button onClick={()=>{props.control_change("학원 밀집도")}}>
                            학원 밀집도
                        </button>
                        <button onClick={()=>{props.control_change("교육기관 밀집도")}}>
                            교육기관 밀집도
                        </button>
                    </div>
                </div>
                <div className="favorite_item_div">
                    <p>병원 지표</p>
                    <div className="favorite_enviroment_item_div">
                        <button onClick={()=>{props.control_change("병원 밀집도")}}>
                            병원 밀집도
                        </button>
                        <button onClick={()=>{props.control_change("약국 밀집도")}}>
                            약국 밀집도
                        </button>
                    </div>
                </div>
                <div className="favorite_item_div">
                    <p>편의시설 지표</p>
                    <div className="favorite_enviroment_item_div">
                        <button onClick={()=>{props.control_change("쇼핑시설 밀집도")}}>
                            쇼핑시설 밀집도
                        </button>
                        <button onClick={()=>{props.control_change("외식시설 밀집도")}}>
                            외식시설 밀집도
                        </button>
                        <button onClick={()=>{props.control_change("은행시설 밀집도")}}>
                            은행시설 밀집도
                        </button>    
                        <button onClick={()=>{props.control_change("우체국시설 밀집도")}}>
                            우체국시설 밀집도
                        </button>
                    </div>
                </div>
                <div className="favorite_item_div">
                    <p>안전시설 지표</p>
                    <div className="favorite_enviroment_item_div">
                        <button onClick={()=>{props.control_change("소방서 밀집도")}}>
                            소방서 밀집도
                        </button>
                        <button onClick={()=>{props.control_change("경찰서 밀집도")}}>
                            경찰서 밀집도
                        </button>
                        <button onClick={()=>{props.control_change("범죄 안전지수")}}>
                            범죄 안전지수
                        </button>    
                    </div>
                </div>
                <div className="favorite_item_div">
                    <p>교통시설 지표</p>
                    <div className="favorite_enviroment_item_div">
                        <button onClick={()=>{props.control_change("버스정류장 밀집도")}}>
                            버스정류장 밀집도
                        </button>
                        <button onClick={()=>{props.control_change("지하철 밀집도")}}>
                            지하철 밀집도
                        </button>   
                    </div>
                </div>
                <div className="gongbak">

                </div>
            </div>
        </div>
        <div className="gipho">

        </div>
    </div>
        
    )
}


export default Favorite_3