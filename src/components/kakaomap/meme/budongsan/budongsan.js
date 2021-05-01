import React, { useState, useEffect, useRef } from "react";
import './budongsan.css';
import medal from './medal.png';
export default class Budongsan extends React.Component{
    render(){
        return(
            <div className="budongsan_main">
                <div className="budongsan_main_title">
                    <p>근처 부동산</p>
                </div>
                <a href="#" className="budongsan_main_div">
                    <div className="budongsan_main_div_img">
                    <img src={medal} height="25px" width="25px"/>
                    </div>
                    <div className="budongsan_main_div_1">
                        <div className="budongsan_main_div_1_1">
                            한반도 부동산 
                        </div>
                        <div className="budongsan_main_div_1_2">
                            대표- 정태진 
                        </div>
                        <div className="budongsan_main_div_1_3">
                            경상남도 창원시 성산구 성주동
                        </div>
                    </div>
                    <div className="budongsan_main_div_2">
                        <div className="budongsan_main_div_2_1">
                            번호
                        </div>
                        <div className="budongsan_main_div_2_2">
                            010-3859-3779
                        </div>
                    </div>
                </a>
                <a href="#" className="budongsan_main_div">
                    <div className="budongsan_main_div_1">
                        <div className="budongsan_main_nomal_div_1_1">
                            성주 공인중계사
                        </div>
                        <div className="budongsan_main_div_1_3">
                            경상남도 창원시 성산구 성주동
                        </div>
                    </div>
                    <div className="budongsan_main_nomal_div_2">
                        <div className="budongsan_main_nomal_div_2_1">
                            -2.1km
                        </div>
                    </div>
                </a>
                <a href="#" className="budongsan_main_div">
                    <div className="budongsan_main_div_1">
                        <div className="budongsan_main_nomal_div_1_1">
                            우리 부동산
                        </div>
                        <div className="budongsan_main_div_1_3">
                            경상남도 창원시 성산구 대방동
                        </div>
                    </div>
                    <div className="budongsan_main_nomal_div_2">
                        <div className="budongsan_main_nomal_div_2_1">
                            -3.1km
                        </div>
                    </div>
                </a>
            </div>
        )
    }
}