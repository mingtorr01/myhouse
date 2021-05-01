import React, { useState, useEffect } from "react";
import "./favorite_4.css";

class Favorite_4 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  dragend = () => {
    console.log("asdasdasdasd");
  };
  dragend2 = () => {
    console.log("zzzzz");
  };
  render() {
    return (
      <div className="Favorite_4_main_div">
        <div className="Favorite_4_main_div_title">
          <span>Step3. 우선순위를 최대 6개 설정하세요.</span>
          <p>선택하신 지역 - 경상남도 창원시 의창구</p>
          <button id="cancle_step2"></button>
        </div>
        <div className="Favorite_4_main_div_main">
          <div className="Favorite_4_main_div_main1">
            <div className="Favorite_4_main_div_main1_1">
              <div className="Favorite_4_main_div_main1_1_title">
                <span id="gipho_name1">쾌적한 지역</span>
                <span id="gipho_name2">에서 살고 싶어요!.</span>
              </div>
              <div
                className="Favorite_4_list"
                draggable="true"
                onDragEnd={() => {
                  this.dragend2();
                }}
              >
                <span>&middot;</span>대기 오염도가 낮은 지역
              </div>
              <div className="Favorite_4_list" draggable="true">
                <span>&middot;</span>도시 공원이 넓은 지역
              </div>
              <div className="Favorite_4_list" draggable="true">
                <span>&middot;</span>녹지 비율이 높은 지역
              </div>
            </div>
            <div className="Favorite_4_main_div_main1_2">
              <div className="Favorite_4_main_div_main1_1_title">
                <span id="gipho_name1">교육열</span>
                <span id="gipho_name2">이 높은 지역에서 살고 싶어요!.</span>
              </div>
              <div className="Favorite_4_list">
                <span>&middot;</span>학원이 많은 지역
              </div>
              <div className="Favorite_4_list">
                <span>&middot;</span>교원 1인당 학생수가 많은 지역
              </div>
            </div>
            <div className="Favorite_4_main_div_main1_3">
              <div className="Favorite_4_main_div_main1_1_title">
                <span id="gipho_name1">안전한 지역</span>
                <span id="gipho_name2">에서 살고 싶어요!.</span>
              </div>
              <div className="Favorite_4_list">
                <span>&middot;</span>CCTV 감시 취약 지수가 낮은 지역
              </div>
              <div className="Favorite_4_list">
                <span>&middot;</span>범죄 안전취약 지수가 낮은 지역
              </div>
              <div className="Favorite_4_list">
                <span>&middot;</span>스트레스 인지율이 낮은 지역
              </div>
              <div className="Favorite_4_list">
                <span>&middot;</span>화재 발생 건수가 낮은 지역
              </div>
            </div>
          </div>
          <div className="Favorite_4_main_div_main2">
            <div className="Favorite_4_main_div_main2_1">
              <div className="Favorite_4_main_div_main1_1_title">
                <span id="gipho_name2">이런 &nbsp;</span>
                <span id="gipho_name1">이웃</span>
                <span id="gipho_name2">있으면 좋겠어요!.</span>
              </div>
              <div className="Favorite_4_list">
                <span>&middot;</span>노령화 지수가 높은 지역
              </div>
              <div className="Favorite_4_list">
                <span>&middot;</span>평균 나이가 젊은 지역
              </div>
              <div className="Favorite_4_list">
                <span>&middot;</span>인구 밀도가 높은 지역
              </div>

              <div className="Favorite_4_list">
                <span>&middot;</span>총 인구가 많은 지역
              </div>
              <div className="Favorite_4_list">
                <span>&middot;</span>남자가 많은 지역
              </div>
              <div className="Favorite_4_list">
                <span>&middot;</span>여자가 많은 지역
              </div>
            </div>
            <div className="Favorite_4_main_div_main2_2">
              <div className="Favorite_4_main_div_main1_1_title">
                <span id="gipho_name1">취업/창업</span>
                <span id="gipho_name2">이 활발한 지역이면 좋겠어요!.</span>
              </div>
              <div className="Favorite_4_list">
                <span>&middot;</span>사업자 종사자 비율이 높은 지역
              </div>
              <div className="Favorite_4_list">
                <span>&middot;</span>기업체가 많은 지역
              </div>
              <div className="Favorite_4_list">
                <span>&middot;</span>순이동 인구가 많은 지역
              </div>
            </div>
            <div className="Favorite_4_main_div_main2_3">
              <div className="Favorite_4_main_div_main1_1_title">
                <span id="gipho_name2">이런 &nbsp;</span>
                <span id="gipho_name1">특성</span>
                <span id="gipho_name2">이 있으면 좋겠어요!.</span>
              </div>
              <div className="Favorite_4_list">
                <span>&middot;</span>쇼핑시설 밀집도가 높은 지역
              </div>
              <div className="Favorite_4_list">
                <span>&middot;</span>외식시설 밀집도가 높은 지역
              </div>
              <div className="Favorite_4_list">
                <span>&middot;</span>면적당 아파트 가격이 높은 지역
              </div>
              <div className="Favorite_4_list">
                <span>&middot;</span>면적당 주택 가격이 높은 지역
              </div>
              <div className="Favorite_4_list">
                <span>&middot;</span>주택 가격 변동률이 높은 지역
              </div>
              <div className="Favorite_4_list">
                <span>&middot;</span>노후주택 비율이 낮은 지역
              </div>
            </div>
          </div>
        </div>
        <div className="gipho_selecting_div_title">* 위의 지표를 드래그하여 순위대로 아래의 블럭에 두시면 됩니다.</div>
        <div className="gipho_selecting_div">
          <div className="gipho_selecting_div1_3">
            <div className="gipho_selecting_list" onDragOver={() => this.dragend()}>
              1
            </div>
            <div className="gipho_selecting_list">2</div>
            <div className="gipho_selecting_list">3</div>
          </div>
          <div className="gipho_selecting_div4_6">
            <div className="gipho_selecting_list">4</div>
            <div className="gipho_selecting_list">5</div>
            <div className="gipho_selecting_list">6</div>
          </div>
        </div>
        <div className="gipho_selecting_div_button">
          <button id="gipho_button1">뒤로가기</button>
          <button id="gipho_button2">결정 완료</button>
        </div>
      </div>
    );
  }
}

export default Favorite_4;
