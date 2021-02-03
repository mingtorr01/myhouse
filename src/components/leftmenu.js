import React from "react";
import "./leftmenu.css";
import Mark from "../img/placeholder.png";
import Planet from "../img/ecosystem.png";
import Book from "../img/books.png";
import Hospital from "../img/hospital.png";
import Store from "../img/shop.png";
import Police from "../img/sheriff-badge.png";
import Cars from "../img/cars.png";
export default class Leftmenu extends React.Component {
  render() {
    return (
      <div className="main">
        <div className="region">
          <div className="region1">
            <div className="region1in1">
              <p>1. 지역 선택</p>
            </div>
          </div>
          <div className="region2">
            <div className="regionselect">
              <p className="regionselect_p">살고싶은지역</p>
              <img src={Mark} width="25px" height="25px" alt="" />
            </div>
            <div className="regionselect2">
              <select name="cars">
                <option value="volvo">전국</option>
                <option value="saab">Saab</option>
                <option value="fiat">Fiat</option>
                <option value="audi">Audi</option>
              </select>
              <select name="cars">
                <option value="volvo">전체</option>
                <option value="saab">Saab</option>
                <option value="fiat">Fiat</option>
                <option value="audi">Audi</option>
              </select>
            </div>
          </div>
        </div>
        <div className="money">
          <div className="region1">
            <div className="region1in1">
              <p>2. 거래유형 선택</p>
            </div>
          </div>
          <div className="money_select">
            <div className="meme">매매</div>
            <div className="junse">전세</div>
            <div className="wallse">월세</div>
          </div>
        </div>
        <div className="work">
          <div className="region1">
            <div className="region1in1">
              <p>3.직장주소 입력</p>
            </div>
          </div>
          <div className="work_select">
            <input placeholder="  직장 주소를 입력해주세요" />
            <button>입력</button>
          </div>
        </div>
        <div className="selector">
          <div className="selector_1">
            <div className="region1in1">
              <p>5.지표 설정</p>
            </div>
          </div>
          <div className="selector_div1">
            <div className="selector_img">
              <img src={Planet} width="30px" height="30px" alt="" />
            </div>
            <div className="selector_p">
              <p>환경</p>
            </div>
          </div>
          <div className="selector_div2">
            <div className="selector_img">
              <img src={Book} width="30px" height="30px" alt="" />
            </div>
            <div className="selector_p">
              <p>교육</p>
            </div>
          </div>
          <div className="selector_div3">
            <div className="selector_img">
              <img src={Hospital} width="30px" height="30px" alt="" />
            </div>
            <div className="selector_p">
              <p>병원시설</p>
            </div>
          </div>
          <div className="selector_div4">
            <div className="selector_img">
              <img src={Store} width="30px" height="30px" alt="" />
            </div>
            <div className="selector_p">
              <p>편의시설</p>
            </div>
          </div>
          <div className="selector_div5">
            <div className="selector_img">
              <img src={Police} width="30px" height="30px" alt="" />
            </div>
            <div className="selector_p">
              <p>치안</p>
            </div>
          </div>
          <div className="selector_div5">
            <div className="selector_img">
              <img src={Cars} width="30px" height="30px" alt="" />
            </div>
            <div className="selector_p">
              <p>교통</p>
            </div>
          </div>
        </div>
        <button className="leftmenubuttton">검색</button>
      </div>
    );
  }
}
