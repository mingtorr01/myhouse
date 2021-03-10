import "./leftmenu_main.css"
import React, { useState } from "react";


function Findhouse_button(props){
    const [string_name, change_string] = useState(<div>나만의 &nbsp;집을  &nbsp;찾아보세요</div>);
    const onclick_button =()=>{
        props.findhouse_button();
    }
    return(
        <button className="find_house_button" onClick={onclick_button}>
            나만의 &nbsp;집을  &nbsp;찾아보세요
        </button>
    )
}

export default Findhouse_button