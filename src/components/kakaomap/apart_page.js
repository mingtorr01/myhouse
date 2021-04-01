import React, { useState, useEffect, useRef } from "react";
import './kakao.css';

const Apart_page=(props)=>{

    useEffect(()=>{
        console.log(props.apart_data);
    },[]);

    return(
        <div className="test">

        </div>
    )
}

export default Apart_page;