import React, {useState} from 'react';
import './leftmenu_main.css';


function Leftmenu_1(props) {
  const [realtime_bool, realtime_change] = useState(false);
  const realtime_onclick_true = () =>{
    realtime_change(true)
  }
  const realtime_onclick_false = () =>{
    realtime_change(false)
  }
  return (
    <div className="keyword_main">
      {realtime_bool ? <Realtime_visitor realtime_onclick_false={realtime_onclick_false}/>: <div></div>}
      <div className="keyword_div">
        <a href="#"></a>
        <input placeholder="  지역명또는 도로명주소로 검색"/>
        <button onClick={props.props_searchbar_change}></button>
      </div>
      <div className="realtime_visitor">
      <ul>
        <li>
          <div className="realtime_visitor_div">
            <div className="realtime_visitor_div_num">
              1
            </div>
            <div className="realtime_visitor_div_name">
              경상남도 창원시 의창구 사림동
            </div>
            <div className="realtime_visitor_div_visitornum">
              512명
            </div>
          </div>
        </li>
        <li>
        <div className="realtime_visitor_div">
            <div className="realtime_visitor_div_num">
              2
            </div>
            <div className="realtime_visitor_div_name">
            경상남도 창원시 성산구 대방동
            </div>
            <div className="realtime_visitor_div_visitornum">
            312명
            </div>
          </div>
        </li>
        <li>
        <div className="realtime_visitor_div">
            <div className="realtime_visitor_div_num">
              3
            </div>
            <div className="realtime_visitor_div_name">
            경상남도 창원시 성산구 성주동
            </div>
            <div className="realtime_visitor_div_visitornum">
            162명
            </div>
          </div>
        </li>
        <li>
        <div className="realtime_visitor_div">
            <div className="realtime_visitor_div_num">
              4
            </div>
            <div className="realtime_visitor_div_name">
            경상남도 창원시 의창구 봉림동
            </div>
            <div className="realtime_visitor_div_visitornum">
            52명
            </div>
          </div>
        </li>
      </ul>
      <button className="realtime_visitor_button" onClick={realtime_onclick_true}>

      </button>
      </div>
    </div>
  );
}

export default Leftmenu_1;

function Realtime_visitor(props){
  return(
    <div className="show_realtime_visitor">
      <div className="show_realtime_visitor_title">
        <p>실시간 인기 검색어</p>
      </div>
      <button className="show_realtime_visitor_button" onClick={props.realtime_onclick_false}>

      </button>
      <div className="show_realtime_visitor_main">
        <ul>
          <li>
            <div className="show_realtime_visitor_row">
              <div className="show_realtime_visitor_row_1">
                <div className="show_realtime_visitor_column_1">
                  1
                </div>
                <div className="show_realtime_visitor_column_2">
                경상남도 창원시 의창구 사림동
                </div>
                <div className="show_realtime_visitor_column_3">
                512명
                </div>
              </div>
              <div className="show_realtime_visitor_row_2">

              </div>
            </div>
          </li>
          <li>
          <div className="show_realtime_visitor_row">
              <div className="show_realtime_visitor_row_1">
                <div className="show_realtime_visitor_column_1">
                  2
                </div>
                <div className="show_realtime_visitor_column_2">
                경상남도 창원시 성산구 대방동
                </div>
                <div className="show_realtime_visitor_column_3">
                312명
                </div>
              </div>
              <div className="show_realtime_visitor_row_2">

              </div>
            </div>
          </li>
          <li>
          <div className="show_realtime_visitor_row">
              <div className="show_realtime_visitor_row_1">
                <div className="show_realtime_visitor_column_1">
                  3
                </div>
                <div className="show_realtime_visitor_column_2">
                경상남도 창원시 성산구 성주동
                </div>
                <div className="show_realtime_visitor_column_3">
                162명
                </div>
              </div>
              <div className="show_realtime_visitor_row_2">

              </div>
            </div>   
          </li>
          <li>
          <div className="show_realtime_visitor_row">
              <div className="show_realtime_visitor_row_1">
                <div className="show_realtime_visitor_column_1">
                  4
                </div>
                <div className="show_realtime_visitor_column_2">
                경상남도 창원시 의창구 봉림동
                </div>
                <div className="show_realtime_visitor_column_3">
                52명
                </div>
              </div>
              <div className="show_realtime_visitor_row_2">

              </div>
            </div>
          </li>
        </ul>
        <div className="show_realtime_visitor_main_end">
          2021.02.18 20:18 기준
        </div>
      </div>
    </div>
  )
}