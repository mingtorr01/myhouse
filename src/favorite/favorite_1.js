import "./favorite.css";
import React, { useState, useEffect } from "react";
import Favorite_3 from "./favorite_3";
const regionarr = ["서울 특별시", "대구광역시", "부산광역시", "울산광역시", "광주광역시", "경기도", "강원도", "충청북도", "충청남도", "경상북도", "경상남도", "전라남도", "전라북도", "제주도", "전국"];

function Favorite_1(props) {
  const [step, stepchange] = useState(1);
  const [arrsize, arrsizechange] = useState(regionarr.length / 4);
  const [renewarr, renewarrchange] = useState([]);
  const [value, setValue] = useState(props.select_gipho_data);
  // This will launch only if propName value has chaged.
  useEffect(() => {
    showregion();
    setValue(props.select_gipho_data);
    console.log("zzzz" + value);
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
        console.log("한줄끝");
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
    });
  };

  const rendermap = renewarr.map((v, i, a) => {
    return (
      <div className="favorite_main_div_row">
        {renewarr[i].map((v, i, a) => {
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
        })}
      </div>
    );
  });

  if (step === 1) {
    return (
      <div className="favorite_1">
        <div className="favorite_title_div">
          <p>1. 원하시는 지역을 선택하세요.</p>
          <button></button>
        </div>
        <div className="favorite_main_div">{rendermap}</div>
      </div>
    );
  } else {
    return <Favorite_3 control_change={props.control_change} result_data_change={props.result_data_change} cancle_giphodata={props.cancle_giphodata} select_gipho_data2={value} result_change={props.result_change} />;
  }
}

export default Favorite_1;
