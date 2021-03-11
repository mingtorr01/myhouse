import React, { useState,useEffect} from "react";
import './favorite_3.css';
function Controlbox(props){
    useEffect(() => { 
        document.querySelector("span").style.left = ((Number(range_value))*65.0)+17+"%";
        console.log((Number(range_value))*100.0);
    });
    const [range_value,range_value_change] =useState(0);
    function slider(e){
        range_value_change(e.target.value); 
        
    }

    const select_click =(e)=>{
        const data = {
            name:props.gipho_name,
            range:range_value
        }
        props.props_gipho_select(e,data)
        console.log("yyyy");
        return ;
    }
    return(
        <div className="controlbox_main">
            <div className="controlbox_title">
                <p>{props.gipho_name}</p>
                <p id="controlbox_title_p"> 지표 설정하기</p>
                <button onClick={props.cancle_control_box}>

                </button>
            </div>
            <div className="range">
                <div className="slidervalue">
                    <span>{range_value}</span>
                </div>
                <div className="field">
                    <div className="value left">0</div>
                    <input type="range" min="0" max="1" value={range_value} step="0.1" onChange={(e)=>{slider(e);}}/>
                    <div className="value right">1</div>
                </div>
            </div>
            <div className="controlbox_button">
                <button onClick={select_click}>설정 완료</button>
            </div>
        </div>
    )
}
export default Controlbox;