import React, { useState,useEffect } from "react";
import './favorite_3.css';
function Favorite_3(props){
    const [value,valuechange] = useState(props.select_gipho_data2);
    const [click,clickchange] =useState(0);

    const click_a = (name)=>{  //강제 트리거
        clickchange(click+1);
        props.cancle_giphodata(name);
    }
    useEffect( () => {
        valuechange(props.select_gipho_data2);
    }, [click,click_a])

    
    return(
        <div className="Favorite_3_main">
            <div className="Favorite_3_main_div">
            <div className="favorite_title_div2">
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
                        <button onClick={()=>{props.control_change("교원 1인당 학생수")}}>
                            교원 1인당 학생수
                        </button>
                    </div>
                </div>
                <div className="favorite_item_div">
                    <p>복지 지표</p>
                    <div className="favorite_enviroment_item_div">
                        <button onClick={()=>{props.control_change(" 병원+약국 밀집도")}}>
                            병원+약국 밀집도
                        </button>
                        <button onClick={()=>{props.control_change("유치원 및 보육시설")}}>
                            유치원 및 보육시설
                        </button>
                        <button onClick={()=>{props.control_change("노인복지시설")}}>
                            노인복지시설
                        </button>
                        <button onClick={()=>{props.control_change("사회복지시설")}}>
                            사회복지시설
                        </button>
                        <button onClick={()=>{props.control_change("문화시설 수")}}>
                            문화시설 수
                        </button>
                        <button onClick={()=>{props.control_change("노인복지시설 수")}}>
                            체육시설 수
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
                        <button onClick={()=>{props.control_change("우체국시설")}}>
                            우체국시설
                        </button>
                        <button onClick={()=>{props.control_change("대중교통 이용률")}}>
                            대중교통 이용률
                        </button>
                    </div>
                </div>
                <div className="favorite_item_div">
                    <p>안전시설 지표</p>
                    <div className="favorite_enviroment_item_div">
                        <button onClick={()=>{props.control_change("화재 안전")}}>
                            화재 안전
                        </button>
                        <button onClick={()=>{props.control_change("교통사고 안전")}}>
                            교통사고 안전
                        </button>
                        <button onClick={()=>{props.control_change("범죄 안전")}}>
                            범죄 안전
                        </button> 
                        <button onClick={()=>{props.control_change("감염병 안전")}}>
                            감염병 안전
                        </button>
                        <button onClick={()=>{props.control_change("자연재해 안전")}}>
                            자연재해 안전
                        </button>     
                    </div>
                </div>
                <div className="favorite_item_div">
                    <p>주택 지표</p>
                    <div className="favorite_enviroment_item_div">
                        <button onClick={()=>{props.control_change("공동주택 비율")}}>
                            공동주택 비율
                        </button>
                        <button onClick={()=>{props.control_change("주거면적")}}>
                            주거면적
                        </button>
                        <button onClick={()=>{props.control_change("노후주택 비율")}}>
                            노후주택 비율
                        </button>
                        <button onClick={()=>{props.control_change("자가점유 비율")}}>
                            자가점유 비율
                        </button>
                        <button onClick={()=>{props.control_change("단독주택 비율")}}>
                            단독주택 비율
                        </button> 
                    </div>
                </div>
                <div className="favorite_item_div">
                    <p>지역인구 지표</p>
                    <div className="favorite_enviroment_item_div">
                        <button onClick={()=>{props.control_change("청장년 인구비율")}}>
                            청장년 인구비율
                        </button>
                        <button onClick={()=>{props.control_change("사업체 종사자 비율")}}>
                            사업체 종사자 비율
                        </button>
                        <button onClick={()=>{props.control_change("순유입인구 비율")}}>
                            순유입인구 비율
                        </button>
                    </div>
                </div>
                <div className="gongbak">

                </div>
            </div>
        </div>
        <div className="gipho" key={props.select_gipho_data2}>
            <div className="gipho_title">
                <p>* 선택하신 옵션</p>
            </div>
            <div className="gipho_main">
            {value.map((v,i,a)=>{
                return(
                    <div key={i} className="gipho_select_item">
                        <p>{v.name}</p>
                        <p id="gipho_select_item_p">선호도 {v.range}</p>
                        <button id="gipho_cancle" onClick={()=>{click_a(v.name)}}></button>
                    </div>
                )
            })} 
            </div>
            <button id="gipho_select_button">
                선택 완료
            </button>
        </div>
    </div>
        
    )
}

/*{props.select_gipho_data2.map((v,i,a)=>{
                return(
                    <div key={i} className="gipho_select_item">
                        <p>{v.name}</p>
                        <p id="gipho_select_item_p">선호도 {v.range}</p>
                    </div>
                )
            })} */
export default Favorite_3