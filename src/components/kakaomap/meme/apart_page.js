import React, { useState, useEffect, useRef } from "react";
import './meme.css';
import HighChart2 from './meme_line_chart';



class Apart_page extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:[],
            make_data:[],
            make_data2:[],
            apart_name:'',
            apart_address:'',
            sizing:[],
            graph_name:''
        }
    }

    componentDidMount(){
        
    }
    componentDidUpdate(prevProps){
       console.log(this.props);
       if(this.props.apart_data !== prevProps.apart_data){
           console.log('asdasd');
        this.setState({
            data:this.props.apart_data
        },() => {console.log(this.state.data)//
       
        const arr = [];
        const arr2 = [];
        const arr3 = []; //방크기만 담는 arr
        
        this.state.data.map((v,i,a)=>{
            arr3.push(Math.floor(v.exclusive_private_area));
        })
        console.log(this.state.data);
        const newarr = Array.from(new Set(arr3));
        const newarr2 = newarr.sort(function(a, b)  { //평수 작은 순서대로 정렬
            if(a > b) return 1;
            if(a === b) return 0;
            if(a < b) return -1;
          });
          console.log(newarr2);
        this.setState({
            sizing:newarr2
        },()=>{
            console.log(this.state.sizing);
        this.setState({
            graph_name:this.state.sizing[0]
        })
          

          this.state.data.map((v,i,a)=>{
            if(Math.floor(v.exclusive_private_area) === this.state.sizing[0]){
                const date= new Date(v.date);
                const year = date.getFullYear();
                const month = date.getMonth()+1;
                const day = date.getDate();
                const string = year+'.'+month+'.'+day;
                this.setState({
                    apart_name:v.name,
                    apart_address:v.address
                })
                const box = {
                    date:string,
                    price:v.trade_price,
                    size:v.exclusive_private_area,
                    floor:v.floor,
                    address :  v.address,
                    name : v.name
                }
                arr3.push(v.exclusive_private_area);
                arr2.push(box);
            }
            
        })

        this.state.data.map((v,i,a)=>{
            if(Math.floor(v.exclusive_private_area) === this.state.sizing[0]){
                const date= new Date(v.date);
                const year = date.getFullYear();
                const month = date.getMonth()+1;
                const day = date.getDate();
                const string = year+'년'+month+'월'+day+'일';
                const box = {
                    sizing:v.exclusive_private_area,
                    name:string,
                    y:v.trade_price,
                    color:'#4e61f1'
                }
                arr.push(box);
            }
        })
        this.setState({
            make_data:arr,
            make_data2:arr2.reverse()
        },()=>{console.log(this.state.make_data2);},)

    })
    },)///1


    }
    }

    change_size=(size)=>{
        const arr = [];
        const arr2 = [];
        const arr3 = []; //방크기만 담는 arr
        console.log("사이즈"+size);
        this.state.data.map((v,i,a)=>{
            if(Math.floor(v.exclusive_private_area) === Math.floor(size)){
                const date= new Date(v.date);
                const year = date.getFullYear();
                const month = date.getMonth()+1;
                const day = date.getDate();
                const string = year+'.'+month+'.'+day;
                this.setState({
                    apart_name:v.name,
                    apart_address:v.address
                })
                const box = {
                    date:string,
                    price:v.trade_price,
                    size:v.exclusive_private_area,
                    floor:v.floor,
                    address :  v.address,
                    name : v.name
                }
                arr3.push(v.exclusive_private_area);
                arr2.push(box);
            }
            
        })

        this.state.data.map((v,i,a)=>{
            if(Math.floor(v.exclusive_private_area) === Math.floor(size)){
                const date= new Date(v.date);
                const year = date.getFullYear();
                const month = date.getMonth()+1;
                const day = date.getDate();
                const string = year+'년'+month+'월'+day+'일';
                const box = {
                    sizing:v.exclusive_private_area,
                    name:string,
                    y:v.trade_price,
                    color:'#4e61f1'
                }
                arr.push(box);
            }
        })
        this.setState({
            make_data:arr,
            make_data2:arr2.reverse(),
            graph_name:size

        },()=>{console.log(this.state.make_data2);},)

    }


    render(){
        return(
            <div className="meme_page_main">
                <div className="meme_page_title">
                    <div className="meme_page_title_string">
                        {this.state.apart_name}아파트
                    </div>
                    <div className="meme_page_title_string2">
                        {this.state.apart_address}
                    </div>
                    <button id="meme_page_title_button">
                    </button>
                </div>
                <div className="meme_page_scroll">
                    <div className="meme_chart_main">
                        <div className="meme_chart_title">
                            <p>전용평수 당 실매매가 현황</p>
                        </div>
                        <div className="result_gipho_title">
                            {this.state.sizing.map((v,i,a)=>{
                                return(
                                    <button onClick={()=>this.change_size(v)} id="result_button">
                                        {Math.floor((v/3.3058))}평
                                    </button>
                                )
                            })}
                        </div>
                        <div className="meme_chart1">
                        <HighChart2 data={this.state.make_data} data_name={this.state.graph_name}/>

                        </div>
                        <div className="meme_chart2">
                        <Meme_chart make_data2={this.state.make_data2}/>
                        </div>
                    </div>
                    
                </div>
            </div>
        )
    }
}

class Meme_chart extends React.Component{
constructor(props){
    super(props);
}
render(){
    return(
        <div className="pho_main">
            <div className="pho_title">
                최근 거래된 목록
            </div>
            <div className="pho_main_title">
                <div className="pho_main_title_row">
                    계약일
                </div>
                <div className="pho_main_title_row">
                    가격
                </div>
                <div className="pho_main_title_row">
                    전용평수
                </div>
                <div className="pho_main_title_row">
                    층
                </div>
            </div>
            {this.props.make_data2.map((v,i,a)=>{
                return(
                    <Meme_chart_row date={v.date} price={v.price} size={v.size} floor={v.floor} />
                )
            })}
        </div>
    )
}
   
}
class Meme_chart_row extends React.Component{
    constructor(props){
        super(props);
        this.state={
            price1:'',
        }
    }
    componentDidMount(){
        console.log(this.props.price);
        if(this.props.price>10000 && this.props.price%10000 === 0){
            this.setState({
                price1:String(Math.floor(this.props.price/10000))+'억',
            })
        }else if(this.props.price>10000){
            this.setState({
                price1:String(Math.floor(this.props.price/10000))+'억'+String(this.props.price%10000)+'만원',
            })
        }else{
            this.setState({
                price1:String(this.props.price)+'만원',
            })
        }
    }
    componentDidUpdate(prevProps){
        if(this.props !== prevProps){
        console.log(this.props.price);
        if(this.props.price>10000){
            this.setState({
                price1:String(Math.floor(this.props.price/10000))+'억'+String(this.props.price%10000)+'만원',
            })
        }else{
            this.setState({
                price1:String(this.props.price)+'만원',
            })
        }
    }
    }
    render(){
        return(
            <div>
                <div className="pho_main_row_main">
                    <div className="pho_main_row">
                        {this.props.date}
                    </div>
                    <div className="pho_main_row">
                        {this.state.price1}
                    </div>
                    <div className="pho_main_row">
                        {Math.floor((this.props.size/3.3058))}평
                    </div>
                    <div className="pho_main_row">
                        {this.props.floor}
                    </div>
                </div>
            </div>
        )
    }
    
}
export default Apart_page;

////////////////////
