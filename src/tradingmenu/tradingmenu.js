import React, { useState, useEffect } from "react";
import "./tradingmenu.css";
export default class Tradingmenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      memeclick: false,
      junseclick: false,
      walseclick:false,
    };
  }

  meme_click = () => {
    this.setState({
      memeclick: !this.state.memeclick,
    });
    console.log(this.state.memeclick);
  };

  meme_click2 = () => {
    this.setState({
      junseclick: !this.state.junseclick,
    });
    console.log(this.state.junseclick);
  };
  meme_click3 = () => {
    this.setState({
      walseclick: !this.state.walseclick,
    });
    console.log(this.state.walseclick);
  };

  render() {
    return (
      <div className="Tradingmenu_main">
        <a href="#" onClick={() => this.meme_click()} className="Tradingmenu_main_meme">
          매매
        </a>
        {this.state.memeclick ? <Meme_menu type_change={this.props.type_change} apart_page_change={this.props.apart_page_change}/> : <div></div>}
        <a href="#" onClick={() => this.meme_click2()} className="Tradingmenu_main_junse">
          전세
        </a>
        {this.state.junseclick ? <Junse_menu type_change={this.props.type_change} apart_page_change={this.props.apart_page_change}/> : <div></div>}
        <a href="#" onClick={() => this.meme_click3()} className="Tradingmenu_main_walse">
          월세
        </a>
        {this.state.walseclick ? <Walse_menu type_change={this.props.type_change} apart_page_change={this.props.apart_page_change}/> : <div></div>}
      </div>
    );
  }
}

class Meme_menu extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="meme_menu">
        <a href="#" onClick={() => {this.props.type_change("apart_trades");this.props.apart_page_change(false)}}>
          아파트
        </a>
        <a href="#" onClick={() => this.props.type_change("apart_trades")}>
          &nbsp;&nbsp;연립
          <br />
          다세대
        </a>
        <a href="#" onClick={() => this.props.type_change("apart_trades")}>
          오피스텔
        </a>
      </div>
    );
  }
}
class Junse_menu extends React.Component {
  render() {
    return (
      <div className="junse_menu">
        <a href="#" onClick={() => {this.props.type_change("office_deposits"); this.props.apart_page_change(false)}}>
          아파트
        </a>
        <a href="#" onClick={() => {this.props.type_change("office_deposits"); this.props.apart_page_change(false)}}>
          &nbsp;&nbsp;연립
          <br />
          다세대
        </a>
        <a href="#" onClick={() => {this.props.type_change("office_deposits"); this.props.apart_page_change(false)}}>
          오피스텔
        </a>
      </div>
    );
  }
}
class Walse_menu extends React.Component {
  render() {
    return (
      <div className="walse_menu">
        <a href="#" onClick={() => {this.props.type_change("apart_rents"); this.props.apart_page_change(false)}}>
          아파트
        </a>
        <a href="#" onClick={() => {this.props.type_change("office_rents"); this.props.apart_page_change(false)}}>
          &nbsp;&nbsp;연립
          <br />
          다세대
        </a>
        <a href="#" onClick={() => {this.props.type_change("office_rents");this.props.apart_page_change(false);}}>
          오피스텔
        </a>
      </div>
    );
  }
}
