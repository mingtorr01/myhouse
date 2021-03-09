import "./leftmenu_main.css"
import React, { useState } from "react";


function Findhouse_button(props){
    const [string_name, change_string] = useState(<div>나만의 &nbsp;집을  &nbsp;찾아보세요</div>);
    const onclick_button =()=>{
        props.findhouse_button();
        change_string(<div>메인 화면으로 돌아가기</div>)
    }
    return(
        <button className="find_house_button" onClick={onclick_button}>
            {string_name}
        </button>
    )
}

export default Findhouse_button