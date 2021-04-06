import React, { useState,useEffect} from "react";
import './favorite_3.css';
function Controlbox(props){
    useEffect(() => { 
        //document.querySelector("span").style.left = (((Number(range_value))*65.0)+18)+"%";
        //console.log((Number(range_value))*100.0);
    });
    const [range_value,range_value_change] =useState(1);
    const [percent,percent_change] =useState(50);
    const [range_string,range_string_change] = useState('가중치 보통');
    function slider(e){
        range_value_change(e.target.value); 
        percent_change(Math.floor(e.target.value*50) );
        console.log(e.target.value);
        if(parseFloat(e.target.value) ===1.0){
            range_string_change('가중치 보통')
        }else if(parseFloat(e.target.value) <=1.5 && parseFloat(e.target.value) >1.0){
            range_string_change('가중치 조금 높음')
        }else if(parseFloat(e.target.value) <=2.0 && parseFloat(e.target.value) >1.5){
            range_string_change('가중치 높음')
        }else if(parseFloat(e.target.value) <1.0 && parseFloat(e.target.value) >=0.5){
            range_string_change('가중치 조금 낮음')
        }else if(parseFloat(e.target.value) <0.5 && parseFloat(e.target.value) >=0.0){
            range_string_change('가중치 낮음')
        }
    }

    const select_click =(e)=>{
        const data = {
            bigname:props.gipho_name.bigname,
            name:props.gipho_name.name,
            range:range_value
        }
        props.props_gipho_select(e,data)
        console.log(data);
        return ;
    }
    return(
        <div className="controlbox_main">
            <div className="controlbox_title">
                <p>{props.gipho_name.name}</p>
            </div>
            <div className="controlbox_mid">
                <div className="controlbox_mid1">
                    <div className="controlbox_mid1_1">
                        <p>실제 설정값</p>
                    </div>
                    <div className="controlbox_mid1_2">
                        <p>예측 설정값</p>
                    </div>
                </div>
                <div className="controlbox_mid2">
                    <div className="controlbox_mid2_1">
                        <p>{percent}%</p>
                    </div>
                    <div className="controlbox_mid2_2">
                        <p>{range_string}</p>
                    </div>
                </div>
            </div>
            <div className="controlbox_range">
                <div className="left">하</div>
                    <input type="range" min="0" max="2" value={range_value} step="0.1" onChange={(e)=>{slider(e);}}/>
                <div className="right">상</div>
            </div>
            <div className="controlbox_button">
                <button id="controlbox_onclick1" onClick={props.cancle_control_box} >취소</button>
                <button id="controlbox_onclick2" onClick={select_click}>완료</button>
            </div>
        </div>
    )
}
//                    

///
//
export default Controlbox;