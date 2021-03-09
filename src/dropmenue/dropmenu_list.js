import "./dropmenu.css"
import Medicine from '../img/medicine.png';
import Hospital from '../img/hospital.png';
import school from '../img/school.png';
import book from '../img/books.png';
import bak from '../img/online-shopping.png';
import confi from  '../img/shops.png';
import food from '../img/cutlery.png';
import store_1 from '../img/store.png';
import React, { useState } from "react";


function Dropmenu_list_hospital(props){
    const [medicine_check, medicine_check_change] = useState(false);
    const [hospital_check, hospital_check_change] = useState(false);
    const [school_check, school_check_change] = useState(false);
    const [hakwone_check, hakwone_check_change] = useState(false);
    const [bak_check, bak_check_change] = useState(false);
    const [confi_check, confi_check_change] = useState(false);
    const [food_check, food_check_change] = useState(false);
    const [mart_check, mart_check_change] = useState(false);

    const medicine_onclick =()=>{
        if(medicine_check === true){
            medicine_check_change(false);
        }else{
            medicine_check_change(true);
        }
    }
    const hospital_onclick =()=>{
        if(hospital_check === true){
            hospital_check_change(false);
        }else{
            hospital_check_change(true);
        }
    }
    const school_onclick =()=>{
        if(school_check === true){
            school_check_change(false);
        }else{
            school_check_change(true);
        }
    }
    const hakwone_onclick =()=>{
        if(hakwone_check === true){
            hakwone_check_change(false);
        }else{
            hakwone_check_change(true);
        }
    }
    const bak_onclick =()=>{
        if(bak_check === true){
            bak_check_change(false);
        }else{
            bak_check_change(true);
        }
    }
    const confi_onclick =()=>{
        if(confi_check === true){
            confi_check_change(false);
        }else{
            confi_check_change(true);
        }
    }
    const food_onclick =()=>{
        if(food_check === true){
            food_check_change(false);
        }else{
            food_check_change(true);
        }
    }
    const mart_onclick =()=>{
        if(mart_check === true){
            mart_check_change(false);
        }else{
            mart_check_change(true);
        }
    }
    switch (props.listname) {
        case 'hospital':
            return(
                <div>
                    <Hospital_list medicine_check={medicine_check} hospital_check={hospital_check} medicine_onclick={medicine_onclick} hospital_onclick={hospital_onclick}/>
                </div>
            )
            break;
        case 'education':
            return(
                <div>
                    <Education_list  school_check={school_check} hakwone_check={hakwone_check} school_onclick={school_onclick} hakwone_onclick={hakwone_onclick}/>
                </div>
            )
            break;
        case 'store':
            return(
                <div>
                    <Store_list bak_check={bak_check} confi_check={confi_check} food_check={food_check} mart_check={mart_check} bak_onclick={bak_onclick} confi_onclick={confi_onclick} food_onclick={food_onclick} mart_onclick={mart_onclick}/>
                </div>
            )
            break;
        case 'caps':
            return(
                <div>
                    <Hospital_list/>
                </div>
            )
            break;
                   
        default:
            break;
    }
}

export default Dropmenu_list_hospital

const Hospital_list =(props)=>{
    
    return(
        <div className="dropmenu_list_main">
            <ul>
                <li>
                    <a className="dropmenu_item" href="#" onClick={props.medicine_onclick}>
                        <div className="item_img">
                            <img src={Medicine} height="24px" width="24px"/>
                        </div>
                        <div className="item_name">
                            약국 시설
                        </div>
                        <div className="item_check">
                        <input type="checkbox" name="xxx" value="yyy" checked={props.medicine_check}/>
                        </div>
                    </a>
                </li>
                <li>
                    <a className="dropmenu_item" href="#" onClick={props.hospital_onclick}>
                        <div className="item_img">
                        <img src={Hospital} height="23px" width="23px"/>
                        </div>
                        <div className="item_name">
                            병원 시설
                        </div>
                        <div className="item_check">
                        <input type="checkbox" name="xxx" value="yyy" checked={props.hospital_check}/>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
    )
}

const Education_list =(props)=>{
    
    
    
    return(
        <div className="dropmenu_list_main2">
            <ul>
                <li>
                    <a className="dropmenu_item" href="#" onClick={props.school_onclick}>
                        <div className="item_img">
                            <img src={school} height="24px" width="24px"/>
                        </div>
                        <div className="item_name">
                            학교 시설
                        </div>
                        <div className="item_check">
                        <input type="checkbox" name="xxx" value="yyy" checked={props.school_check}/>
                        </div>
                    </a>
                </li>
                <li>
                    <a className="dropmenu_item" href="#" onClick={props.hakwone_onclick}>
                        <div className="item_img">
                        <img src={book} height="23px" width="23px"/>
                        </div>
                        <div className="item_name">
                            학원 시설
                        </div>
                        <div className="item_check">
                        <input type="checkbox" name="xxx" value="yyy" checked={props.hakwone_check}/>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
    )
}
const Store_list =(props)=>{
    
    return(
        <div className="dropmenu_list_main3">
            <ul>
                <li>
                    <a className="dropmenu_item" href="#" onClick={props.bak_onclick}>
                        <div className="item_img">
                            <img src={bak} height="24px" width="24px"/>
                        </div>
                        <div className="item_name">
                            백화점
                        </div>
                        <div className="item_check">
                        <input type="checkbox" name="xxx" value="yyy" checked={props.bak_check}/>
                        </div>
                    </a>
                </li>
                <li>
                    <a className="dropmenu_item" href="#" onClick={props.confi_onclick}>
                        <div className="item_img">
                        <img src={confi} height="23px" width="23px"/>
                        </div>
                        <div className="item_name">
                            편의점
                        </div>
                        <div className="item_check">
                        <input type="checkbox" name="xxx" value="yyy" checked={props.confi_check}/>
                        </div>
                    </a>
                </li>
                <li>
                    <a className="dropmenu_item" href="#" onClick={props.food_onclick}>
                        <div className="item_img">
                        <img src={food} height="23px" width="23px"/>
                        </div>
                        <div className="item_name">
                            음식점
                        </div>
                        <div className="item_check">
                        <input type="checkbox" name="xxx" value="yyy" checked={props.food_check}/>
                        </div>
                    </a>
                </li>
                <li>
                    <a className="dropmenu_item" href="#" onClick={props.mart_onclick}>
                        <div className="item_img">
                        <img src={store_1} height="23px" width="23px"/>
                        </div>
                        <div className="item_name">
                            대형마트
                        </div>
                        <div className="item_check">
                        <input type="checkbox" name="xxx" value="yyy" checked={props.mart_check}/>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
    )
}