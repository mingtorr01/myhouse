import React, { useState, useEffect, useRef } from "react";
import './predict.css'

class Predict_tax extends React.Component{

    componentDidMount(){
        const a_tag = document.getElementById('school1');
        a_tag.style.borderBottom="2px solid rgb(104, 104, 104)";
    }
    onclick_school =(string)=>{
        console.log(string);
        if(string === '1'){
            const a_tag1 = document.getElementById('school1');
            const a_tag2 = document.getElementById('school2');
            const a_tag3 = document.getElementById('school3');
            a_tag1.style.borderBottom="2px solid rgb(104, 104, 104)";
            a_tag2.style.borderBottom='0px';
            a_tag3.style.borderBottom='0px';
        }else if(string === '2'){
            const a_tag1 = document.getElementById('school1');
            const a_tag2 = document.getElementById('school2');
            const a_tag3 = document.getElementById('school3');
            a_tag1.style.borderBottom="0px";
            a_tag2.style.borderBottom='2px solid rgb(104, 104, 104)';
            a_tag3.style.borderBottom='0px';
        }else{
            const a_tag1 = document.getElementById('school1');
            const a_tag2 = document.getElementById('school2');
            const a_tag3 = document.getElementById('school3');
            a_tag1.style.borderBottom="0px";
            a_tag2.style.borderBottom='0px';
            a_tag3.style.borderBottom='2px solid rgb(104, 104, 104)';
        }
    }

    render(){
        return(
            <div className="predict_main">
                <div className="predict_main_title">
                    <div className="predict_main_title_contain">
                        <a id="school1" href="#" onClick={()=>this.onclick_school('1')}>
                            초등학교
                        </a>
                        <a id="school2" href="#" onClick={()=>this.onclick_school('2')}>
                            중학교
                        </a>
                        <a id="school3" href="#" onClick={()=>this.onclick_school('3')}>
                            고등학교
                        </a>
                    </div>
                </div>
                <div className="school_div_main">
                    <div className="school_div_main_row">
                        <div className="school_div_main_row_1">
                            <div className="school_div_main_row_1_1">
                                사립
                            </div>
                            <div className="school_div_main_row_1_2">
                                상남초등학교
                            </div>
                            <div className="school_div_main_row_1_3">
                                1996.10.02
                            </div>
                        </div>
                        <div className="school_div_main_row_2">
                            <div className="school_div_main_row_2_1">
                                21.4명
                            </div>
                            <div className="school_div_main_row_2_2">
                                - 3.5km
                            </div>
                        </div>
                    </div>
                    <div className="school_div_main_row">
                        <div className="school_div_main_row_1">
                            <div className="school_div_main_row_1_1">
                                국립
                            </div>
                            <div className="school_div_main_row_1_2">
                                상주초등학교
                            </div>
                            <div className="school_div_main_row_1_3">
                                2001.08.10
                            </div>
                        </div>
                        <div className="school_div_main_row_2">
                            <div className="school_div_main_row_2_1">
                                17.4명
                            </div>
                            <div className="school_div_main_row_2_2">
                                - 5.8km
                            </div>
                        </div>
                    </div>
                    <div className="school_div_main_row">
                        <div className="school_div_main_row_1">
                            <div className="school_div_main_row_1_1">
                                국립
                            </div>
                            <div className="school_div_main_row_1_2">
                                남양초등학교
                            </div>
                            <div className="school_div_main_row_1_3">
                                1999.12.18
                            </div>
                        </div>
                        <div className="school_div_main_row_2">
                            <div className="school_div_main_row_2_1">
                                17.3명
                            </div>
                            <div className="school_div_main_row_2_2">
                                - 8.1km
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Predict_tax;