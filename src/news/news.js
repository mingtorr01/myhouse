import "./news.css"
import React, { useState, useEffect, useRef } from "react";
import { render } from "@testing-library/react";


    
export default class News extends React.Component{

    constructor(props){
        super(props);
        this.state={

        }
    }

    componentDidUpdate(prevProps,prevState){
        if(this.props.newsdata !== prevProps.newsdata){
            console.log(this.props.newsdata);
        }
    }
render(){
    return(
        <div className="news_main_paper">
            <div className="news_main_paper_title">
                <p>실시간 부동산 뉴스</p>
            </div>
            <div className="news_main_paper_body">
            <ul>
                    <li>
                        <div className="first_news">
                            <div className="news_title">
                               {this.props.newsdata[0] === undefined ?<div></div>:<a href={this.props.newsdata[0].link} target="_blank">{this.props.newsdata[0].tile}</a>} 
                            </div>
                            <div className="first_news_body">
                            {this.props.newsdata[0] === undefined?'':this.props.newsdata[0].text}
                            </div>
                        </div>
                    </li>
                    {this.props.newsdata.map((v,i,a)=>{
                        if(i>0 && i<8)
                        return(
                            <li>
                                <div className="nomal_news">
                                    <div className="news_title">
                                        <a href={v.link} target="_blank">{v.tile}</a>    
                                    </div>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}
}