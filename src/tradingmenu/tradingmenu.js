import React, { useState, useEffect } from "react";
import './tradingmenu.css';
export default class Tradingmenu extends React.Component{
    constructor(props){
        super(props)
        this.state={
            memeclick:false,
            junseclick:false
        }
        
    }

    meme_click=()=>{
        this.setState({
            memeclick:!this.state.memeclick
        })
        console.log(this.state.memeclick);
    }

    meme_click2=()=>{
        this.setState({
            junseclick:!this.state.junseclick
        })
        console.log(this.state.junseclick);
    }

    render(){
        return(
            <div className="Tradingmenu_main">
                <a href="#" onClick={()=>this.meme_click()} className="Tradingmenu_main_meme">
                    매매
                </a>
                {this.state.memeclick ? <Meme_menu/>:<div></div>}
                <a href="#" onClick={()=>this.meme_click2()} className="Tradingmenu_main_junse">
                    전월세
                </a>
                {this.state.junseclick ? <Junse_menu/>:<div></div>}
            </div>
        )
    }
}

class Meme_menu extends React.Component{
    render(){
        return(
            <div className="meme_menu">
                <a>
                    아파트
                </a>
                <a>
                    단독주택
                </a>
                <a>
                    &nbsp;&nbsp;연립<br/>다세대
                </a>
                <a>
                    오피스텔
                </a>
            </div>
        )
    }
}
class Junse_menu extends React.Component{
    render(){
        return(
            <div className="meme_menu">
                <a>
                    아파트
                </a>
                <a>
                    단독주택
                </a>
                <a>
                    &nbsp;&nbsp;연립<br/>다세대
                </a>
                <a>
                    오피스텔
                </a>
            </div>
        )
    }
}
