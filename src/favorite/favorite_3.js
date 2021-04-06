import React, { useState, useEffect } from "react";
import "./favorite_3.css";
function Favorite_3(props) {
  const [value, valuechange] = useState(props.select_gipho_data2);
  const [click, clickchange] = useState(0);
  const [setopen1, openchange1] = useState(true);
  const [setopen2, openchange2] = useState(true);
  const [setopen3, openchange3] = useState(true);
  const [setopen4, openchange4] = useState(true);
  const [setopen5, openchange5] = useState(true);
  const [setopen6, openchange6] = useState(true);
  const [setopen7, openchange7] = useState(true);


  const click_a = (name) => {
    //강제 트리거
    clickchange(click + 1);
    props.cancle_giphodata(name);
  };
  useEffect(() => {
    valuechange(props.select_gipho_data2);
  }, [click, click_a]);

  const openchange = (item) => {
      switch (item) {
          case 1:
              openchange1(!setopen1)
              break;
          case 2:
            openchange2(!setopen2)
              break;
          case 3:
            openchange3(!setopen3)
              break;
          case 4:
            openchange4(!setopen4)
              break;
          case 5:
            openchange5(!setopen5)
              break;
              
          case 6:
            openchange6(!setopen6)
              break;
          case 7:
            openchange7(!setopen7)
              break;

          default:
              break;
      }
    
  };

  return (
    <div className="Favorite_3_main">
      <div className="Favorite_3_main_div">
        <div className="favorite_title_div2">
          <button id="back_step"></button>
          <p>3. 지표를 선택하세요.</p>
          <button id="cancle_step"></button>
        </div>
        <div className="Favorite_3_main_div_scroll">
          <div className="favorite_item_div">
            <button id="favorite_item_div_button" onClick={()=>openchange(1)} >1. 환경 지표</button>
            <div className="favorite_enviroment_item_div" style={{ display: `${setopen1 === true ? "none" : "block"}` }}>
              <button
                onClick={() => {
                  props.control_change({bigname:'환경',name:"대기오염도"});
                }}
              >
                대기오염도
              </button>
              <button
                onClick={() => {
                  props.control_change({bigname:'환경',name:"녹지비율"});
                }}
              >
                녹지비율
              </button>
            </div>
          </div>
          <div className="favorite_item_div">
          <button id="favorite_item_div_button" onClick={()=>openchange(2)} >2. 교육 지표</button>
            <div className="favorite_enviroment_item_div" style={{ display: `${setopen2 === true ? "none" : "block"}` }}>
              <button
                onClick={() => {
                  props.control_change({bigname:'교육',name:"교원 1인당 학생수"});
                }}
              >
                교원 1인당 학생수
              </button>
            </div>
          </div>
          <div className="favorite_item_div">
          <button id="favorite_item_div_button" onClick={()=>openchange(3)} >3. 복지 지표</button>
            <div className="favorite_enviroment_item_div" style={{ display: `${setopen3=== true ? "none" : "block"}` }}>
              <button
                onClick={() => {
                  props.control_change({bigname:'복지',name:"병원+약국 밀집도"});
                }}
              >
                병원+약국 밀집도
              </button>
              <button
                onClick={() => {
                  props.control_change({bigname:'복지',name:"유치원 및 보육시설"});
                }}
              >
                유치원 및 보육시설
              </button>
              <button
                onClick={() => {
                  props.control_change({bigname:'복지',name:"노인복지시설"});
                }}
              >
                노인복지시설
              </button>
              <button
                onClick={() => {
                  props.control_change({bigname:'복지',name:"사회복지시설"});
                }}
              >
                사회복지시설
              </button>
              <button
                onClick={() => {
                  props.control_change({bigname:'복지',name:"문화시설 수"});
                }}
              >
                문화시설 수
              </button>
              <button
                onClick={() => {
                  props.control_change({bigname:'복지',name:"체육시설 수"});
                }}
              >
                체육시설 수
              </button>
            </div>
          </div>
          <div className="favorite_item_div">
          <button id="favorite_item_div_button" onClick={()=>openchange(4)} >4. 편의시설 지표</button>
            <div className="favorite_enviroment_item_div" style={{ display: `${setopen4 === true ? "none" : "block"}` }}>
              <button
                onClick={() => {
                  props.control_change({bigname:'편의',name:"쇼핑시설 밀집도"});
                }}
              >
                쇼핑시설 밀집도
              </button>
              <button
                onClick={() => {
                  props.control_change({bigname:'편의',name:"외식시설 밀집도"});
                }}
              >
                외식시설 밀집도
              </button>
              <button
                onClick={() => {
                  props.control_change({bigname:'편의',name:"은행시설 밀집도"});
                }}
              >
                은행시설 밀집도
              </button>
              <button
                onClick={() => {
                  props.control_change({bigname:'편의',name:"우체국시설"});
                }}
              >
                우체국시설
              </button>
              <button
                onClick={() => {
                  props.control_change({bigname:'편의',name:"대중교통 이용률"});
                }}
              >
                대중교통 이용률
              </button>
            </div>
          </div>
          <div className="favorite_item_div">
          <button id="favorite_item_div_button" onClick={()=>openchange(5)} >5. 안전시설 지표</button>
            <div className="favorite_enviroment_item_div" style={{ display: `${setopen5 === true ? "none" : "block"}` }}>
              <button
                onClick={() => {
                  props.control_change({bigname:'안전',name:"화재 안전"});
                }}
              >
                화재 안전
              </button>
              <button
                onClick={() => {
                  props.control_change({bigname:'안전',name:"교통사고 안전"});
                }}
              >
                교통사고 안전
              </button>
              <button
                onClick={() => {
                  props.control_change({bigname:'안전',name:"범죄 안전"});
                }}
              >
                범죄 안전
              </button>
              <button
                onClick={() => {
                  props.control_change({bigname:'안전',name:"감염병 안전"});
                }}
              >
                감염병 안전
              </button>
              <button
                onClick={() => {
                  props.control_change({bigname:'안전',name:"자연재해 안전"});
                }}
              >
                자연재해 안전
              </button>
            </div>
          </div>
          <div className="favorite_item_div">
          <button id="favorite_item_div_button" onClick={()=>openchange(6)} >6. 주택 지표</button>
            <div className="favorite_enviroment_item_div" style={{ display: `${setopen6 === true ? "none" : "block"}` }}>
              <button
                onClick={() => {
                  props.control_change({bigname:'주택',name:"공동주택 비율"});
                }}
              >
                공동주택 비율
              </button>
              <button
                onClick={() => {
                  props.control_change({bigname:'주택',name:"주거면적"});
                }}
              >
                주거면적
              </button>
              <button
                onClick={() => {
                  props.control_change({bigname:'주택',name:"노후주택 비율"});
                }}
              >
                노후주택 비율
              </button>
              <button
                onClick={() => {
                  props.control_change({bigname:'주택',name:"자가점유 비율"});
                }}
              >
                자가점유 비율
              </button>
              <button
                onClick={() => {
                  props.control_change({bigname:'주택',name:"단독주택 비율"});
                }}
              >
                단독주택 비율
              </button>
            </div>
          </div>
          <div className="favorite_item_div2">
          <button id="favorite_item_div_button" onClick={()=>openchange(7)} >7. 지역인구 지표</button>
            <div className="favorite_enviroment_item_div" style={{ display: `${setopen7 === true ? "none" : "block"}` }}>
              <button
                onClick={() => {
                  props.control_change({bigname:'지역인구',name:"청장년 인구비율"});
                }}
              >
                청장년 인구비율
              </button>
              <button
                onClick={() => {
                  props.control_change({bigname:'지역인구',name:"사업체 종사자 비율"});
                }}
              >
                사업체 종사자 비율
              </button>
              <button
                onClick={() => {
                  props.control_change({bigname:'지역인구',name:"순유입인구 비율"});
                }}
              >
                순유입인구 비율
              </button>
            </div>
          </div>
          <div className="gongbak"></div>
        </div>
      </div>
      <div className="gipho" key={props.select_gipho_data2}>
        <div className="gipho_title">
          <p>* 선택하신 지표</p>
        </div>
        <div className="gipho_main">
          {value.map((v, i, a) => {
            return (
              <div key={i} className="gipho_select_item">
                <p>{v.name}</p>
                <p id="gipho_select_item_p">{v.range*50}%</p>
                <button
                  id="gipho_cancle"
                  onClick={() => {
                    click_a(v.name);
                  }}
                ></button>
              </div>
            );
          })}
          <div className="gonbak2">

          </div>
        </div>
        <button id="gipho_select_button" onClick={props.result_change}>선택 완료</button>
      </div>
    </div>
  );
}

/*{props.select_gipho_data2.map((v,i,a)=>{
                return(
                    <div key={i} className="gipho_select_item">
                        <p>{v.name}</p>
                        <p id="gipho_select_item_p">선호도 {v.range}</p>
                    </div>
                )
            })} */
export default Favorite_3;
