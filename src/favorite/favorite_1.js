import "./favorite.css";
import React, { useState, useEffect } from "react";
import Favorite_3 from "./favorite_3";
import Favorite_2 from "./favorite_2";
const regionarr = ["서울특별시", "대구광역시", "부산광역시", "울산광역시", "광주광역시", "경기도", "강원도", "충청북도", "충청남도", "경상북도", "경상남도", "전라남도", "전라북도", "제주특별자치도", "전국"];

function Favorite_1(props) {
  const [step, stepchange] = useState(1);
  const [arrsize, arrsizechange] = useState(regionarr.length / 4);
  const [renewarr, renewarrchange] = useState([]);
  const [value, setValue] = useState(props.select_gipho_data);
  const [location2, location2_change] = useState([]);
  const [location1, location1_change] = useState("");
  // This will launch only if propName value has chaged.
  useEffect(() => {
    showregion();
    setValue(props.select_gipho_data);
  }, [value]);

  const showregion = () => {
    const row = regionarr.length / 4 + 1; //4.5나옴 4개의 row가 나와야함
    console.log(row);
    let newarr = [];
    let newcolumn = [];
    let num = 0;
    for (let index = 0; index < regionarr.length; index++) {
      if (index % 4 === 0) {
        newarr.push(newcolumn);
        newcolumn = [];
        newcolumn.push(regionarr[index]);
      } else {
        newcolumn.push(regionarr[index]);
      }
    }
    if (newcolumn.length != 0) {
      newarr.push(newcolumn);
    }

    newarr.shift();
    renewarrchange(newarr);
  };

  const showregion2 = (location) => {
    location1_change(location);
    stepchange(2);
    const locations = {
      location: location,
    };
    fetch("http://localhost:3001/db/getLocation", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(locations),
    })
      .then((res) => res.json())
      .then((json) => {
        location2_change(json);
        location1_change(location);
      });
  };

  const rendermap = renewarr.map((v, i, a) => {
    return (
      <div className="favorite_main_div_row">
        {renewarr[i].map((v, i, a) => {
          if(v==='제주특별자치도'){
            return(
              <div className="favorite_main_div_column">
              <button
                onClick={() => {
                  showregion2(v);
                }}
              >
                {'제주'}
                <br />
                {'특별자치도'}
              </button>
            </div>
            )
          }else{
            return (
              <div className="favorite_main_div_column">
                <button
                  onClick={() => {
                    showregion2(v);
                  }}
                >
                  {v}
                </button>
              </div>
            ); 
          }
        })}
      </div>
    );
  });

  if (step === 1) {
    return (
      <div className="favorite_1">
        <div className="favorite_title_div">
          <p>1. 원하시는 지역을 선택하세요.</p>
          <button onClick={()=>props.favorite_div_bool_change(false)}></button>
        </div>
        <div className="favorite_main_div">{rendermap}</div>
      </div>
    );
  } else {
    return <Favorite_2 cancle_select_gipho_data_change={props.cancle_select_gipho_data_change} stepchange={stepchange} favorite_div_bool_change={props.favorite_div_bool_change} region_change={props.region_change}location1={location1} location2={location2} control_change={props.control_change} result_data_change={props.result_data_change} cancle_giphodata={props.cancle_giphodata} select_gipho_data={props.select_gipho_data} result_change={props.result_change} />;
  }
}

export default Favorite_1;
