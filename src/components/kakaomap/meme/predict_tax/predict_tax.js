import React, { useState, useEffect, useRef } from "react";
import './predict.css'

class Predict_tax extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:[],
            index:0
        }
    }
    componentDidMount(){
        const a_tag = document.getElementById('school1');
        a_tag.style.borderBottom="2px solid #5f71f8";
    }
    componentDidUpdate(prevProps, prevState){
        if (this.props.school !== prevProps.school){
            console.log(this.props.school);
            this.setState({
                data:this.props.school
            })
            console.log(this.state.data);
        }
    }
    onclick_school =(string)=>{
        console.log(string);
        if(string === '1'){
            const a_tag1 = document.getElementById('school1');
            const a_tag2 = document.getElementById('school2');
            const a_tag3 = document.getElementById('school3');
            a_tag1.style.borderBottom="2px solid #5f71f8";
            a_tag2.style.borderBottom='0px';
            a_tag3.style.borderBottom='0px';
            this.setState({
                index:0
            })
        }else if(string === '2'){
            const a_tag1 = document.getElementById('school1');
            const a_tag2 = document.getElementById('school2');
            const a_tag3 = document.getElementById('school3');
            a_tag1.style.borderBottom="0px";
            a_tag2.style.borderBottom='2px solid #5f71f8';
            a_tag3.style.borderBottom='0px';
            this.setState({
                index:1
            })
        }else{
            const a_tag1 = document.getElementById('school1');
            const a_tag2 = document.getElementById('school2');
            const a_tag3 = document.getElementById('school3');
            a_tag1.style.borderBottom="0px";
            a_tag2.style.borderBottom='0px';
            a_tag3.style.borderBottom='2px solid #5f71f8';
            this.setState({
                index:2
            })
        }
    }
    school_onclick=(school_name,shool_location,distance)=>{
        const data = {
            name:school_name,
            location:shool_location,
            marker_location:this.props.marker_location,
            distance:distance
        }
        console.log(data);
        this.props.school_data_change(data)
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
                {this.state.data[this.state.index]===undefined?<div></div>:this.state.data[this.state.index].map((v,i,a)=>{
                        return(
                            <a href="#" onClick={()=>this.school_onclick(v._source.name,v._source.location,v.sort[0]*1000>1000?Math.floor(v.sort[0]*1000)/1000+'km':Math.floor(v.sort[0]*1000)+'m')} className="school_div_main_row">
                                <div className="school_div_main_row_1">
                                    <div className="school_div_main_row_1_1">
                                        {v._source.type}
                                    </div>
                                    <div className="school_div_main_row_1_2">
                                        {v._source.name}
                                    </div>
                                    <div className="school_div_main_row_1_3">
                                        {v._source.year}
                                    </div>
                                </div>
                                <div className="school_div_main_row_2">
                                    <div className="school_div_main_row_2_1">
                                        - {v.sort[0]*1000>1000?Math.floor(v.sort[0]*1000)/1000+'km':Math.floor(v.sort[0]*1000)+'m'}
                                    </div>
                                    <div className="school_div_main_row_2_2">
                                        
                                    </div>
                                </div>
                            </a>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default Predict_tax;