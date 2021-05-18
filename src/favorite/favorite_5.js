import React, { useState, useEffect } from "react";
import "./favorite_3.css";

class Favorite_3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [],
      click: 0,
      setopen1: true,
      setopen2: true,
      setopen3: true,
      setopen4: true,
      setopen5: true,
      setopen6: true,
      setopen7: true,
      dropindex: null,
      click1: 0,
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if ((this.props !== prevProps && this.props !== undefined) || prevState.click1 !== this.state.click1) {
      this.props.region_change(this.props.step);
      this.setState({
        value: this.props.select_gipho_data,
      });
      console.log(this.props.step);
    }
  }
  click_a = (name) => {
    //강제 트리거
    this.setState(
      {
        click: this.state.click + 1,
      },
      this.props.cancle_giphodata(name)
    );
  };

  select_click = (box) => {
    const data = {
      bigname: box.bigname,
      name: box.name,
      view: box.view,
      sido: box.sido,
      Positive: box.Positive,
    };
    this.setState(
      {
        click1: this.state.click1 + 1,
      },
      this.props.props_gipho_select(data)
    );
    console.log(data);
  };

  effect = (index) => {
    var st = document.getElementsByClassName("gipho_select_item");
    for (var i = 0; i < st.length; i++) {
      var section = st.item(i);
      section.style.backgroundColor = "#4760ce";
    }

    let arr = this.state.value;
    let tmp = arr[index];
    console.log(tmp);
    arr[index] = arr[this.state.dropindex];
    console.log(arr[index]);
    arr[this.state.dropindex] = tmp;
    console.log(arr);
    this.setState({
      value: arr,
    });
    console.log(this.state.value);
  };

  effect2 = (index) => {
    //console.log(index+"번을 드레그함");
  };
  effect3 = (index) => {
    this.setState({
      dropindex: index,
    });
    var st = document.getElementsByClassName("gipho_select_item");
    for (var i = 0; i < st.length; i++) {
      var section = st.item(i);
      if (i === this.state.dropindex) {
        section.style.backgroundColor = "#4056fc71";
      } else {
        section.style.backgroundColor = "#4760ce";
      }
    }
    //console.log(index+"번에 가져다 놓음");
  };
  openchange = (item) => {
    switch (item) {
      case 1:
        this.setState({
          setopen1: !this.state.setopen1,
        });
        break;
      case 2:
        this.setState({
          setopen2: !this.state.setopen2,
        });
        break;
      case 3:
        this.setState({
          setopen3: !this.state.setopen3,
        });
        break;
      case 4:
        this.setState({
          setopen4: !this.state.setopen4,
        });
        break;
      case 5:
        this.setState({
          setopen5: !this.state.setopen5,
        });
        break;

      case 6:
        this.setState({
          setopen6: !this.state.setopen6,
        });
        break;
      case 7:
        this.setState({
          setopen7: !this.state.setopen7,
        });
        break;

      default:
        break;
    }
  };

  render() {
    return (
      <div className="Favorite_3_main">
        <div className="Favorite_3_main_div">
          <div className="favorite_title_div2">
            <button id="back_step" onClick={() => this.props.stepchange2(1)}></button>
            <p>3. 지표를 선택하세요.</p>
            <button
              id="cancle_step"
              onClick={() => {
                this.props.favorite_div_bool_change(false);
                this.props.cancle_select_gipho_data_change();
              }}
            ></button>
          </div>
          <div className="Favorite_3_main_div_scroll">
            <div className="type_div">
              <span id="blue_span"></span> 읍면동 데이터 <span id="red_span"></span> 시군구 데이터
            </div>
            <div className="favorite_item_div">
              <button id="favorite_item_div_button" onClick={() => this.openchange(1)}>
                1. 이런 환경에서 살고 싶어요!
              </button>
              <div className="favorite_enviroment_item_div" style={{ display: `${this.state.setopen1 === true ? "none" : "block"}` }}>
                <button
                  id="specialbutton"
                  onClick={() => {
                    this.select_click({ bigname: "환경", name: "대기오염도", view: "대기 오염도가 낮은 지역이면 좋겠어요!.", sido: 0, Positive: 0 });
                  }}
                >
                  &middot;대기 오염도가 낮은 지역
                </button>
                <button
                  id="specialbutton"
                  onClick={() => {
                    this.select_click({ bigname: "환경", name: "도시공원", view: "도시 공원이 넓은 지역이면 좋겠어요!.", sido: 0, Positive: 1 });
                  }}
                >
                  &middot;도시 공원이 넓은 지역
                </button>
                <button
                  id="specialbutton"
                  onClick={() => {
                    this.select_click({ bigname: "환경", name: "녹지비율", view: "녹지 비율이 높은 지역이면 좋겠어요!.", sido: 0, Positive: 1 });
                  }}
                >
                  &middot;녹지 비율이 높은 지역
                </button>
              </div>
            </div>
            <div className="favorite_item_div">
              <button id="favorite_item_div_button" onClick={() => this.openchange(2)}>
                2. 교육열이 높은 지역에서 살고 싶어요!
              </button>
              <div className="favorite_enviroment_item_div" style={{ display: `${this.state.setopen2 === true ? "none" : "block"}` }}>
                <button
                  onClick={() => {
                    this.select_click({ bigname: "교육", name: "학원수", view: "학원이 많은 지역이면 좋겠어요!.", sido: 1, Positive: 1 });
                  }}
                >
                  &middot;학원이 많은 지역
                </button>
                <button
                  id="specialbutton"
                  onClick={() => {
                    this.select_click({ bigname: "교육", name: "교원1인당학생수", view: "교원 1인당 학생수가 많은 지역이면 좋겠어요!.", sido: 0, Positive: 1 });
                  }}
                >
                  &middot;교원 1인당 학생수가 많은 지역
                </button>
              </div>
            </div>
            <div className="favorite_item_div">
              <button id="favorite_item_div_button" onClick={() => this.openchange(4)}>
                3. 이런 특성이 있으면 좋겠어요!
              </button>
              <div className="favorite_enviroment_item_div" style={{ display: `${this.state.setopen4 === true ? "none" : "block"}` }}>
                <button
                  onClick={() => {
                    this.select_click({ bigname: "특성", name: "쇼핑시설밀집도", view: "쇼핑시설 밀집도가 높은 지역이면 좋겠어요!.", sido: 1, Positive: 1 });
                  }}
                >
                  쇼핑시설 밀집도가 높은 지역
                </button>
                <button
                  onClick={() => {
                    this.select_click({ bigname: "특성", name: "외식시설밀집도", view: "외식시설이 많은 지역이면 좋겠어요!.", sido: 1, Positive: 1 });
                  }}
                >
                  외식시설 밀집도가 높은 지역
                </button>
                {/*<button
                  onClick={() => {
                    this.select_click({ bigname: "특성", name: "면적당아파트가격", view: "면적당 아파트가격이 높은 지역이면 좋겠어요!." });
                  }}
                >
                  면적당 아파트 가격이 높은 지역
                </button>
                <button
                  onClick={() => {
                    this.select_click({ bigname: "특성", name: "면적당주택가격", view: "면적당 주택 가격이 높은 지역이면 좋겠어요!." });
                  }}
                >
                  면적당 주택 가격이 높은 지역
                </button>
                <button
                  onClick={() => {
                    this.select_click({ bigname: "특성", name: "주택가격변동률", view: "주택 가격 변동률이 높은 지역이면 좋겠어요!." });
                  }}
                >
                  주택 가격 변동률이 높은 지역
                </button>*/}
                <button
                  onClick={() => {
                    this.select_click({ bigname: "편의", name: "노후주택비율", view: "노후주택 비율이 낮은 지역이면 좋겠어요!.", sido: 1, Positive: 0 });
                  }}
                >
                  노후주택 비율이 낮은 지역
                </button>
              </div>
            </div>
            <div className="favorite_item_div">
              <button id="favorite_item_div_button" onClick={() => this.openchange(5)}>
                4. 안전한 지역에서 살고 싶어요!
              </button>
              <div className="favorite_enviroment_item_div" style={{ display: `${this.state.setopen5 === true ? "none" : "block"}` }}>
                <button
                  onClick={() => {
                    this.select_click({ bigname: "안전", name: "cctv", view: "CCTV 감시 취약 지수가 낮은 지역이면 좋겠어요!.", sido: 1, Positive: 0 });
                  }}
                >
                  &middot;CCTV 감시 취약 지수가 낮은 지역
                </button>
                <button
                  onClick={() => {
                    this.select_click({ bigname: "안전", name: "범죄안전", view: "범죄 안전취약 지수가 낮은 지역이면 좋겠어요!.", sido: 1, Positive: 0 });
                  }}
                >
                  &middot;범죄 안전취약 지수가 낮은 지역
                </button>
                <button
                  id="specialbutton"
                  onClick={() => {
                    this.select_click({ bigname: "안전", name: "스트레스인지율", view: "스트레스 인지율이 낮은 지역이면 좋겠어요!.", sido: 0, Positive: 0 });
                  }}
                >
                  &middot;스트레스 인지율이 낮은 지역
                </button>
                <button
                  id="specialbutton"
                  onClick={() => {
                    this.select_click({ bigname: "안전", name: "화재발생건수", view: "화제 발생건수가 낮은 지역이면 좋겠어요!.", sido: 0, Positive: 0 });
                  }}
                >
                  &middot;화제 발생건수가 낮은 지역
                </button>
              </div>
            </div>
            <div className="favorite_item_div">
              <button id="favorite_item_div_button" onClick={() => this.openchange(6)}>
                5. 취업/창업이 활발한 지역이면 좋겠어요!
              </button>
              <div className="favorite_enviroment_item_div" style={{ display: `${this.state.setopen6 === true ? "none" : "block"}` }}>
                <button
                  onClick={() => {
                    this.select_click({ bigname: "취업/창업", name: "사업체종사자비율", view: "사업체 종사자 비율이 높은 지역이면 좋겠어요!.", sido: 1, Positive: 1 });
                  }}
                >
                  &middot;사업체 종사자 비율이 높은 지역
                </button>
                <button
                  onClick={() => {
                    this.select_click({ bigname: "취업/창업", name: "기업체수", view: "기업체가 많은 지역이면 좋겠어요!.", sido: 1, Positive: 1 });
                  }}
                >
                  &middot;기업체가 많은 지역
                </button>
                <button
                  id="specialbutton"
                  onClick={() => {
                    this.select_click({ bigname: "취업/창업", name: "순이동인구", view: "순이동 인구가 많은 지역이면 좋겠어요!.", sido: 0, Positive: 1 });
                  }}
                >
                  &middot;순이동 인구가 많은 지역
                </button>
              </div>
            </div>
            <div className="favorite_item_div2">
              <button id="favorite_item_div_button" onClick={() => this.openchange(7)}>
                6. 이런 이웃이 있으면 좋겠어요!
              </button>
              <div className="favorite_enviroment_item_div" style={{ display: `${this.state.setopen7 === true ? "none" : "block"}` }}>
                <button
                  onClick={() => {
                    this.select_click({ bigname: "이웃", name: "노령화지수", view: "노령화지수가 낮은 지역이면 좋겠어요!.", sido: 1, Positive: 0 });
                  }}
                >
                  &middot;노령화 지수가 낮은 지역
                </button>
                <button
                  onClick={() => {
                    this.select_click({ bigname: "이웃", name: "평균나이", view: "평균나이가 젊은 지역이면 좋겠어요!.", sido: 1, Positive: 0 });
                  }}
                >
                  &middot;평균나이가 젊은 지역
                </button>
                <button
                  onClick={() => {
                    this.select_click({ bigname: "이웃", name: "인구밀도높음", view: "인구 밀도가 높은 지역이면 좋겠어요!.", sido: 1, Positive: 1 });
                  }}
                >
                  &middot;인구 밀도가 높은 지역
                </button>
                <button
                  onClick={() => {
                    this.select_click({ bigname: "이웃", name: "총인구", view: "총인구가 많은 지역이면 좋겠어요!.", sido: 1, Positive: 1 });
                  }}
                >
                  &middot;총인구가 많은 지역
                </button>
                <button
                  onClick={() => {
                    this.select_click({ bigname: "이웃", name: "남자인구", view: "남자가 많은 지역이면 좋겠어요!.", sido: 1, Positive: 1 });
                  }}
                >
                  &middot;남자가 많은 지역
                </button>
                <button
                  onClick={() => {
                    this.select_click({ bigname: "이웃", name: "여자인구", view: "여자가 많은 지역이면 좋겠어요!.", sido: 1, Positive: 1 });
                  }}
                >
                  &middot;여자가 많은 지역
                </button>
              </div>
            </div>
            <div className="gongbak"></div>
          </div>
        </div>
        <div className="gipho" key={this.props.select_gipho_data}>
          <div className="gipho_title">
            <p>* 선택하신 지표 순위 (드래그 하여 순위를 바꿀 수 있습니다.)</p>
          </div>
          <div className="gipho_main">
            {this.state.value.map((v, i, a) => {
              return (
                <div
                  key={i}
                  className="gipho_select_item"
                  draggable="true"
                  onDragOver={() => {
                    this.effect3(i);
                  }}
                  onDragStart={() => this.effect2(i)}
                  onDragEnd={() => this.effect(i)}
                >
                  <div className="gipho_select_item_rank">
                    <p>{i + 1} </p>
                  </div>
                  <div className="gipho_select_item_div_1">
                    <p>{v.view}</p>
                  </div>
                  <div className="gipho_select_item_div_2">
                    <button
                      id="gipho_cancle"
                      onClick={() => {
                        this.click_a(v.name);
                      }}
                    ></button>
                  </div>
                </div>
              );
            })}
            <div className="gonbak2"></div>
          </div>
          <button
            id="gipho_select_button"
            onClick={() => {
              this.props.result_change(this.props.step);
              this.setState({ value: [] });
            }}
          >
            선택 완료
          </button>
        </div>
      </div>
    );
  }
}

/*

function Favorite_3(props) {
  const [value, valuechange] = useState([]);
  const [click, clickchange] = useState(0);
  const [setopen1, openchange1] = useState(true);
  const [setopen2, openchange2] = useState(true);
  const [setopen3, openchange3] = useState(true);
  const [setopen4, openchange4] = useState(true);
  const [setopen5, openchange5] = useState(true);
  const [setopen6, openchange6] = useState(true);
  const [setopen7, openchange7] = useState(true);
  const [dropindex,dropindex_change] = useState(null);



  const click_a = (name) => {
    //강제 트리거
    clickchange(click + 1);
    props.cancle_giphodata(name);
  };
  useEffect(() => {
    console.log(props.step); // 선택 지역이름
    console.log(value);
    props.region_change(props.step);
    valuechange(props.select_gipho_data);
  }, [value,click, click_a]);

  useEffect(()=>{
    console.log('aaaa');
  },[value])


  const effect =(index)=>{
    var st = document.getElementsByClassName("gipho_select_item");
    for(var i = 0 ; i<st.length; i++){
      var section = st.item(i);
      section.style.backgroundColor = "#4056fc";
    }
    console.log(index+"번 에서"+dropindex+"에 드래그를 놓음");

    
    let arr=value;
    let tmp = arr[index];
    console.log(tmp);
    arr[index] = arr[dropindex];
    console.log(arr[index]);
    arr[dropindex] = tmp;
    console.log(arr);
    valuechange(arr);
    valuechange(arr);
    console.log(value);
    
  }
  const effect2 =(index)=>{
   
    //console.log(index+"번을 드레그함");
  }
  const effect3 =(index)=>{
    dropindex_change(index);
    var st = document.getElementsByClassName("gipho_select_item");
    for(var i = 0 ; i<st.length; i++){
      var section = st.item(i);
      if(i===dropindex){
        section.style.backgroundColor = "red";
      }else{
        section.style.backgroundColor = "#4056fc";
      }
    }
    //console.log(index+"번에 가져다 놓음");
  }
  const openchange = (item) => {
    switch (item) {
      case 1:
        openchange1(!setopen1);
        break;
      case 2:
        openchange2(!setopen2);
        break;
      case 3:
        openchange3(!setopen3);
        break;
      case 4:
        openchange4(!setopen4);
        break;
      case 5:
        openchange5(!setopen5);
        break;

      case 6:
        openchange6(!setopen6);
        break;
      case 7:
        openchange7(!setopen7);
        break;

      default:
        break;
    }
  };

  return (
    <div className="Favorite_3_main">
      <div className="Favorite_3_main_div">
        <div className="favorite_title_div2">
          <button id="back_step" onClick={()=>props.stepchange2(1)}></button>
          <p>3. 지표를 선택하세요.</p>
          <button id="cancle_step" onClick={()=>{props.favorite_div_bool_change(false); props.cancle_select_gipho_data_change();}}></button>
        </div>
        <div className="Favorite_3_main_div_scroll">
          <div className="favorite_item_div">
            <button id="favorite_item_div_button" onClick={() => openchange(1)}>
              1. 환경 지표
            </button>
            <div className="favorite_enviroment_item_div" style={{ display: `${setopen1 === true ? "none" : "block"}` }}>
              <button
                onClick={() => {
                  props.control_change({ bigname: "환경", name: "대기오염도" });
                }}
              >
                대기오염도
              </button>
              <button
                onClick={() => {
                  props.control_change({ bigname: "환경", name: "녹지비율" });
                }}
              >
                녹지비율
              </button>
            </div>
          </div>
          <div className="favorite_item_div">
            <button id="favorite_item_div_button" onClick={() => openchange(2)}>
              2. 교육 지표
            </button>
            <div className="favorite_enviroment_item_div" style={{ display: `${setopen2 === true ? "none" : "block"}` }}>
              <button
                onClick={() => {
                  props.control_change({ bigname: "교육", name: "교원1인당학생수" });
                }}
              >
                교원 1인당 학생수
              </button>
            </div>
          </div>
          <div className="favorite_item_div">
            <button id="favorite_item_div_button" onClick={() => openchange(3)}>
              3. 복지 지표
            </button>
            <div className="favorite_enviroment_item_div" style={{ display: `${setopen3 === true ? "none" : "block"}` }}>
              <button
                onClick={() => {
                  props.control_change({ bigname: "복지", name: "병원+약국 밀집도" });
                }}
              >
                병원+약국 밀집도
              </button>
              <button
                onClick={() => {
                  props.control_change({ bigname: "복지", name: "유치원및보육시설" });
                }}
              >
                유치원 및 보육시설
              </button>
              <button
                onClick={() => {
                  props.control_change({ bigname: "복지", name: "노인복지시설" });
                }}
              >
                노인복지시설
              </button>
              <button
                onClick={() => {
                  props.control_change({ bigname: "복지", name: "사회복지시설" });
                }}
              >
                사회복지시설
              </button>
              <button
                onClick={() => {
                  props.control_change({ bigname: "복지", name: "문화시설수" });
                }}
              >
                문화시설 수
              </button>
              <button
                onClick={() => {
                  props.control_change({ bigname: "복지", name: "체육시설수" });
                }}
              >
                체육시설 수
              </button>
            </div>
          </div>
          <div className="favorite_item_div">
            <button id="favorite_item_div_button" onClick={() => openchange(4)}>
              4. 편의시설 지표
            </button>
            <div className="favorite_enviroment_item_div" style={{ display: `${setopen4 === true ? "none" : "block"}` }}>
              <button
                onClick={() => {
                  props.control_change({ bigname: "편의", name: "쇼핑시설밀집도" });
                }}
              >
                쇼핑시설 밀집도
              </button>
              <button
                onClick={() => {
                  props.control_change({ bigname: "편의", name: "외식시설밀집도" });
                }}
              >
                외식시설 밀집도
              </button>
              <button
                onClick={() => {
                  props.control_change({ bigname: "편의", name: "은행시설밀집도" });
                }}
              >
                은행시설 밀집도
              </button>
              <button
                onClick={() => {
                  props.control_change({ bigname: "편의", name: "우체국시설" });
                }}
              >
                우체국시설
              </button>
              <button
                onClick={() => {
                  props.control_change({ bigname: "편의", name: "대중교통이용률" });
                }}
              >
                대중교통 이용률
              </button>
            </div>
          </div>
          <div className="favorite_item_div">
            <button id="favorite_item_div_button" onClick={() => openchange(5)}>
              5. 안전시설 지표
            </button>
            <div className="favorite_enviroment_item_div" style={{ display: `${setopen5 === true ? "none" : "block"}` }}>
              <button
                onClick={() => {
                  props.control_change({ bigname: "안전", name: "화재안전" });
                }}
              >
                화재 안전
              </button>
              <button
                onClick={() => {
                  props.control_change({ bigname: "안전", name: "교통사고안전" });
                }}
              >
                교통사고 안전
              </button>
              <button
                onClick={() => {
                  props.control_change({ bigname: "안전", name: "범죄안전" });
                }}
              >
                범죄 안전
              </button>
              <button
                onClick={() => {
                  props.control_change({ bigname: "안전", name: "감염병안전" });
                }}
              >
                감염병 안전
              </button>
              <button
                onClick={() => {
                  props.control_change({ bigname: "안전", name: "자연재해안전" });
                }}
              >
                자연재해 안전
              </button>
            </div>
          </div>
          <div className="favorite_item_div">
            <button id="favorite_item_div_button" onClick={() => openchange(6)}>
              6. 주택 지표
            </button>
            <div className="favorite_enviroment_item_div" style={{ display: `${setopen6 === true ? "none" : "block"}` }}>
              <button
                onClick={() => {
                  props.control_change({ bigname: "주택", name: "다세대주택수" });
                }}
              >
                다세대 주택 수
              </button>
              <button
                onClick={() => {
                  props.control_change({ bigname: "주택", name: "단독주택수" });
                }}
              >
                단독주택 수
              </button>
              <button
                onClick={() => {
                  props.control_change({ bigname: "주택", name: "노후주택비율" });
                }}
              >
                노후주택 비율
              </button>
              <button
                onClick={() => {
                  props.control_change({ bigname: "주택", name: "지가지수" });
                }}
              >
                지가지수
              </button>
              <button
                onClick={() => {
                  props.control_change({ bigname: "주택", name: "총주택수" });
                }}
              >
                총 주택 수
              </button>
            </div>
          </div>
          <div className="favorite_item_div2">
            <button id="favorite_item_div_button" onClick={() => openchange(7)}>
              7. 지역인구 지표
            </button>
            <div className="favorite_enviroment_item_div" style={{ display: `${setopen7 === true ? "none" : "block"}` }}>
              <button
                onClick={() => {
                  props.control_change({ bigname: "지역인구", name: "청장년인구비율" });
                }}
              >
                청장년 인구비율
              </button>
              <button
                onClick={() => {
                  props.control_change({ bigname: "지역인구", name: "사업체종사자비율" });
                }}
              >
                사업체 종사자 비율
              </button>
              <button
                onClick={() => {
                  props.control_change({ bigname: "지역인구", name: "노령화지수" });
                }}
              >
                노령화지수
              </button>
              <button
                onClick={() => {
                  props.control_change({ bigname: "지역인구", name: "인구밀도" });
                }}
              >
                인구밀도
              </button>
              <button
                onClick={() => {
                  props.control_change({ bigname: "지역인구", name: "총인구" });
                }}
              >
                총인구
              </button>
              <button
                onClick={() => {
                  props.control_change({ bigname: "지역인구", name: "평균나이" });
                }}
              >
                평균나이
              </button>
              <button
                onClick={() => {
                  props.control_change({ bigname: "지역인구", name: "평균가구원수" });
                }}
              >
                평균 가구원 수
              </button>
            </div>
          </div>
          <div className="gongbak"></div>
        </div>
      </div>
      <div className="gipho" key={props.select_gipho_data}>
        <div className="gipho_title">
          <p>* 선택하신 지표</p>
        </div>
        <div className="gipho_main"  >
          {value.map((v, i, a) => {
            return (
              <div key={i} className="gipho_select_item" draggable="true"  onDragOver={()=>{effect3(i)}} onDragStart={()=>effect2(i)} onDragEnd={()=>effect(i)}>
                <p>{v.name}</p>
                <p id="gipho_select_item_p">{v.range * 50}%</p>
                <button
                  id="gipho_cancle"
                  onClick={() => {
                    click_a(v.name);
                  }}
                ></button>
              </div>
            );
          })}
          <div className="gonbak2"></div>
        </div>
        <button id="gipho_select_button" onClick={() => {props.result_change(props.step); valuechange([]);}}>
          선택 완료
        </button>
      </div>
    </div>
  );
}

{props.select_gipho_data2.map((v,i,a)=>{
                return(
                    <div key={i} className="gipho_select_item">
                        <p>{v.name}</p>
                        <p id="gipho_select_item_p">선호도 {v.range}</p>
                    </div>
                )
            })} */
export default Favorite_3;
