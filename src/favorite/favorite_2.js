import React, { useState, useEffect } from "react";
import "./favorite_2.css";
import Favorite_3 from "./favorite_3";

const Favorite_2 = (props) => {
  const [step, stepchange] = useState(1);
  const [step2, stepchange2] = useState(1);
  const [region, newregion] = useState([]);
  const [all_region, all_region_change] = useState("");
  useEffect(() => {
    console.log(props.location1);
    const arr = props.location2;
    const last = { _시군구: "전체선택" };

    arr.push(last);
    newregion(arr);
  }, [props.location2]);

  const select_region = (region) => {
    newregion(region);
    stepchange(2);
  };
  const rendering = region.map((v, i, a) => {
    let str = v._시군구;
    if (str.search(/\s/) != -1) {
      const str1 = str.split(" ");
      return (
        <div className="favorite_main_div_column2">
          <button
            onClick={() => {
              stepchange(props.location1 + "-" + v._시군구);
              stepchange2(0);
            }}
          >
            {str1[0]}
            <br />
            {str1[1]}
          </button>
        </div>
      );
    } else {
      if (v._시군구 === "전체선택") {
        return (
          <div className="favorite_main_div_last">
            <button
              onClick={() => {
                stepchange(props.location1 + "-" + v._시군구);
                stepchange2(0);
              }}
            >
              {str}
            </button>
          </div>
        );
      } else {
        return (
          <div className="favorite_main_div_column2">
            <button
              onClick={() => {
                stepchange(props.location1 + "-" + v._시군구);
                stepchange2(0);
              }}
            >
              {str}
            </button>
          </div>
        );
      }
    }
  });

  if (step2 === 1) {
    return (
      <div className="favorite_2_main">
        <div className="favorite_2_main_title">
          <button id="back_step" onClick={()=>props.stepchange(1)}></button>
          <p>2. 세부 지역을 선택하세요.</p>
          <button id="cancle_step" onClick={()=>props.favorite_div_bool_change(false)}></button>
        </div>
        <div className="favorite_main_div2">{rendering}</div>
      </div>
    );
  } else {
    return <Favorite_3  props_gipho_select={props.props_gipho_select} cancle_select_gipho_data_change={props.cancle_select_gipho_data_change} stepchange2={stepchange2} favorite_div_bool_change={props.favorite_div_bool_change} region_change={props.region_change} step={step} control_change={props.control_change} result_data_change={props.result_data_change} cancle_giphodata={props.cancle_giphodata} select_gipho_data={props.select_gipho_data} result_change={props.result_change} />;
  }
};

export default Favorite_2;
