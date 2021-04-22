import React, { useState, useEffect, useRef } from "react";
import './meme.css';
import HighChart2 from './meme_line_chart';
import Bottom_arrow from './blue-bottom-arrow.png';
import Top_arrow from './blue-top-arrow.png';
import Predict_tax from './predict_tax/predict_tax';
import Budongsan from './budongsan/budongsan';
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
            graph_name:'',
            select_time:'0',
            select_sizing:0,
            avg_meme:0,
            last_cost:0
        }
    }
///////////////////////////////////////////////////////////////////////
    componentDidMount(){ 
        this.setState({
            data:this.props.apart_data
        },() => {//
            let index_15 = 0;
        const arr = [];
        const arr2 = [];
        const arr3 = []; //방크기만 담는 arr
        this.state.data.map((v,i,a)=>{
            arr3.push(Math.floor(v.exclusive_private_area));
        })
        const newarr = Array.from(new Set(arr3));
        console.log(newarr);
        const newarr2 = newarr.sort(function(a, b)  { //평수 작은 순서대로 정렬
            if(a > b) return 1;
            if(a === b) return 0;
            if(a < b) return -1;
          });
        console.log(newarr2);
        this.setState({
            sizing:newarr2
        },()=>{
           
        this.setState({
            graph_name:this.state.sizing[this.state.select_sizing]
        })
          this.state.data.map((v,i,a)=>{
              
            const today = new Date();
            const today_year = today.getFullYear()-2; //2년이내
           
            const date= new Date(v.date);
            const year = date.getFullYear();
            const month = date.getMonth()+1;
            const day = date.getDate();
            const string = year+'.'+month+'.'+day;
            if(Math.floor(v.exclusive_private_area) === this.state.sizing[this.state.select_sizing]&& this.state.select_time==='0'){
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
                //arr3.push(v.exclusive_private_area);
                arr2.push(box);
            }else if(Math.floor(v.exclusive_private_area) === this.state.sizing[this.state.select_sizing]&& this.state.select_time==='2'){
                if(parseInt(today_year) <= parseInt(year) ){
                    console.log("aaaaaaaa");
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
                    //arr3.push(v.exclusive_private_area);
                    arr2.push(box);
                }
            }else if(Math.floor(v.exclusive_private_area) === this.state.sizing[this.state.select_sizing]&& this.state.select_time==='3'){
                console.log(i);
                if(index_15<15){
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
                    //arr3.push(v.exclusive_private_area);
                    arr2.push(box);
                }
                index_15=index_15+1;
            }
            
        })

        this.state.data.map((v,i,a)=>{
            const today = new Date();
            const today_year = today.getFullYear()-2; //2년이내
            const date= new Date(v.date);
            const year = date.getFullYear();
            const month = date.getMonth()+1;
            const day = date.getDate();
            const string = year+'년'+month+'월'+day+'일';
            if(Math.floor(v.exclusive_private_area) === this.state.sizing[this.state.select_sizing] && this.state.select_time==='0'){
                const box = {
                    sizing:v.exclusive_private_area,
                    name:string,
                    y:v.trade_price,
                    color:'#4e61f1'
                }
                arr.push(box);
            }else if(Math.floor(v.exclusive_private_area) === this.state.sizing[this.state.select_sizing] && this.state.select_time==='2'){
                if(parseInt(today_year) <= parseInt(year) ){
                    const box = {
                        sizing:v.exclusive_private_area,
                        name:string,
                        y:v.trade_price,
                        color:'#4e61f1'
                    }
                    arr.push(box);
                }
            }
        })
        this.setState({
            make_data:arr,
            make_data2:arr2.reverse(),
        },()=>{},)

    })
    },)///1
    
    }



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    componentDidUpdate(prevProps,prevState){
       
       if(this.props.apart_data !== prevProps.apart_data ||prevState.select_time !== this.state.select_time){
        this.setState({
            data:this.props.apart_data
        },() => {//
       let index_15 = 0;
        const arr = [];
        const arr2 = [];
        const arr3 = []; //방크기만 담는 arr
        this.state.data.map((v,i,a)=>{
            arr3.push(Math.floor(v.exclusive_private_area));
        })
        const newarr = Array.from(new Set(arr3));
        console.log(newarr);
        const newarr2 = newarr.sort(function(a, b)  { //평수 작은 순서대로 정렬
            if(a > b) return 1;
            if(a === b) return 0;
            if(a < b) return -1;
          });
          
        this.setState({
            sizing:newarr2
        },()=>{
           
        this.setState({
            graph_name:this.state.sizing[this.state.select_sizing]
        })
          this.state.data.map((v,i,a)=>{
              
            const today = new Date();
            const today_year = today.getFullYear()-2; //2년이내
           
            const date= new Date(v.date);
            const year = date.getFullYear();
            const month = date.getMonth()+1;
            const day = date.getDate();
            const string = year+'.'+month+'.'+day;
            if(Math.floor(v.exclusive_private_area) === this.state.sizing[this.state.select_sizing]&& this.state.select_time==='0'){
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
                //arr3.push(v.exclusive_private_area);
                arr2.push(box);
            }else if(Math.floor(v.exclusive_private_area) === this.state.sizing[this.state.select_sizing]&& this.state.select_time==='2'){
                
                if(parseInt(today_year) <= parseInt(year) ){
                    console.log("aaaaaaaa");
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
                    //arr3.push(v.exclusive_private_area);
                    arr2.push(box);
                }
            }
            
        })

        this.state.data.map((v,i,a)=>{
            const today = new Date();
            const today_year = today.getFullYear()-2; //2년이내
            const date= new Date(v.date);
            const year = date.getFullYear();
            const month = date.getMonth()+1;
            const day = date.getDate();
            const string = year+'년'+month+'월'+day+'일';
            if(Math.floor(v.exclusive_private_area) === this.state.sizing[this.state.select_sizing] && this.state.select_time==='0'){
                const box = {
                    sizing:v.exclusive_private_area,
                    name:string,
                    y:v.trade_price,
                    color:'#4e61f1'
                }
                arr.push(box);
            }else if(Math.floor(v.exclusive_private_area) === this.state.sizing[this.state.select_sizing] && this.state.select_time==='2'){
                if(parseInt(today_year) <= parseInt(year) ){
                    const box = {
                        sizing:v.exclusive_private_area,
                        name:string,
                        y:v.trade_price,
                        color:'#4e61f1'
                    }
                    arr.push(box);
                }
            }
        })
        if(arr2[arr2.length-1].price<10000){
            console.log('시발');
            this.setState({
                avg_meme:arr2[arr2.length-1].price+'만원'
            })
        }else if(arr2[arr2.length-1].price%10000===0){
            this.setState({
                avg_meme:Math.floor(arr2[arr2.length-1].price/10000)+'억'
            })
        }else{
            this.setState({
                avg_meme:Math.floor(arr2[arr2.length-1].price/10000)+'억'+arr2[arr2.length-1].price%10000+'만원'
            })
        }
        this.setState({
            make_data:arr,
            make_data2:arr2.reverse(),
            last_cost:arr2[arr2.length-1].price
        },()=>{console.log(this.state.sizing);},)

    })
    },)///1


    }
    }

    change_size=(size,i)=>{
        const arr = [];
        const arr2 = [];
        const arr3 = []; //방크기만 담는 arr
       this.setState({
           select_sizing:i
       })
        this.state.data.map((v,i,a)=>{
            if(Math.floor(v.exclusive_private_area) === Math.floor(size)&& this.state.select_time==='0'){
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
               // arr3.push(v.exclusive_private_area);
                arr2.push(box);
            }else if(Math.floor(v.exclusive_private_area) === Math.floor(size)&& this.state.select_time==='1'){
                const today = new Date();
                const today_year = today.getFullYear()-2; //2년이내
                const date= new Date(v.date);
                const year = date.getFullYear();
                const month = date.getMonth()+1;
                const day = date.getDate();
                const string = year+'.'+month+'.'+day;

                if(parseInt(today_year) <= parseInt(year) ){
                    console.log("aaaaaaaa");
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
                    //arr3.push(v.exclusive_private_area);
                    arr2.push(box);
                }
            }
            
        })

        this.state.data.map((v,i,a)=>{
            if(Math.floor(v.exclusive_private_area) === Math.floor(size)&& this.state.select_time==='0'){
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
            }else if(Math.floor(v.exclusive_private_area) === Math.floor(size)&& this.state.select_time==='2'){
                const today = new Date();
                const today_year = today.getFullYear()-2; //2년이내
                const date= new Date(v.date);
                const year = date.getFullYear();
                const month = date.getMonth()+1;
                const day = date.getDate();
                const string = year+'년'+month+'월'+day+'일';
                if(parseInt(today_year) <= parseInt(year) ){
                    const box = {
                        sizing:v.exclusive_private_area,
                        name:string,
                        y:v.trade_price,
                        color:'#4e61f1'
                    }
                    arr.push(box);
                }
            }
            
        })
        if(arr2[arr2.length-1] !=undefined){
            if(arr2[arr2.length-1].price<10000){
                this.setState({
                    avg_meme:arr2[0].price+'만원'
                })
            }else if(arr2[arr2.length-1].price%10000===0){
                this.setState({
                    avg_meme:Math.floor(arr2[arr2.length-1].price/10000)+'억'
                })
            }else{
                this.setState({
                    avg_meme:Math.floor(arr2[arr2.length-1].price/10000)+'억'+arr2[arr2.length-1].price%10000+'만원'
                })
            }
            this.setState({
                make_data:arr,
                make_data2:arr2.reverse(),
                graph_name:size,
                last_cost:arr2[arr2.length-1].price
            },()=>{},)
        }
    }

    time_onchange=(e)=>{
        console.log(e.target.value);
        this.setState({
            select_time:e.target.value
        })
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
                    <button id="meme_page_title_button" onClick={()=>this.props.apart_page_change(false)}>
                    </button>
                </div>
                <div className="meme_page_scroll">
                    <div className="meme_1">
                        <div className="meme_chart_main">
                            <div className="meme_chart_title">
                                <p>전용평수 당 실매매가 현황</p>
                                <div className="avg_meme_div">
                                    <div className="avg_meme_div1">
                                        최근 거래 가격 기준 
                                    </div>
                                    <div className="avg_meme_div2">
                                        {this.state.avg_meme}
                                    </div>
                                </div>
                                <div className="time_select_div">
                                    <select onChange={this.time_onchange}>
                                        <option value="0">전체 기간</option>
                                        <option value="2">2년 이내</option>
                                    </select>
                                </div>
                            </div>
                            <div className="result_gipho_title">
                                {this.state.sizing.map((v,i,a)=>{
                                    console.log(v);
                                    return(
                                        <button onClick={()=>this.change_size(v,i)} id="result_button">
                                            {v}m<sup>2</sup>
                                        </button>
                                    )
                                })}
                            </div>
                            <div className="meme_chart1">
                            <HighChart2 data={this.state.make_data} data_name={this.state.graph_name}/>

                            </div>
                            <div className="meme_chart2">
                            <Meme_chart make_data2={this.state.make_data2} />
                            </div>
                        </div>
                    </div>
                    <Predict_tax/>
                    <Budongsan/>
                </div>
            </div>
        )
    }
}

class Meme_chart extends React.Component{
constructor(props){
    super(props);
    this.state={
        click:5,
        name:'더 보기',
        img:Bottom_arrow
    }
}
onclicker=()=>{
    if(this.state.name === '더 보기'){
        this.setState({
            click:this.props.make_data2.length,
            name:'닫기',
            img:Top_arrow
        })
    }else{
        this.setState({
            click:5,
            name:'더 보기',
            img:Bottom_arrow
        })
    }
    
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
                if(i<this.state.click){
                    return(
                        <Meme_chart_row date={v.date} price={v.price} size={v.size} floor={v.floor} />
                    )
                }
            })}
            {this.props.make_data2.length>5? 
            <div className="pho_main_title_row_button">
                <button onClick={this.onclicker}>{this.state.name}<img src={this.state.img} width="10px" height="10px"/></button>
                <div className="gonbak">
                </div>
            </div>
            :<div></div>
            }      
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
