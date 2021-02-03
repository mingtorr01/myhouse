import React from "react";
import "./top.css";
import Houseimg from "../img/home.png";

export default class Topmenu extends React.Component {
  render() {
    return (
      <div>
        <div className="topdiv">
          <div className="topname">
            <img src={Houseimg} height="35px" witdh="25px" alt="" />
            <pre className="topname1">하우스</pre>
            <pre className="topname2">헬퍼</pre>
          </div>
          <div className="topmenu1">
            <p className="topmenupre1">아파트</p>
            <p className="topmenupre2">매매/전세</p>
          </div>
          <div className="topmenu2">
            <p className="topmenupre1">빌라, 투룸+</p>
            <p className="topmenupre2">매매/전세/월세</p>
          </div>
          <div className="topmenu3">
            <p className="topmenupre1">원룸</p>
            <p className="topmenupre2">전세/월세</p>
          </div>
          <div className="topmenu4">
            <p className="topmenupre1">오피스텔</p>
            <p className="topmenupre2">매매/전세/월세</p>
          </div>
          <div className="topmenu5">
            <p className="topmenupre1">사무실/창업</p>
            <p className="topmenupre2">임대/매매</p>
          </div>
        </div>
      </div>
    );
  }
}
