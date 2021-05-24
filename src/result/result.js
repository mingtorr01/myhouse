import "./result.css";
import React, { useState, useEffect, useRef } from "react";
import HighChart from "./chart";
import HighChart2 from "./linechart";
import { map } from "highcharts";
import CircularProgress from "@material-ui/core/CircularProgress";

const top10 = ["창원시 대방동", "서울특별시 신림동", "창원시 사림동", "창원시 명서동", "창원시 봉곡동", "전라남도 보성읍", "창원시 성주동", "창원시 남양동", "창원시 사파동", "창원시 회원동"];
const moneytype = ["매매", "월전세"];

class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result_data: [],
      result_data2: [],
      gipho_data: [],
      top10: [],
      categori: [],
      categori_in: [],
      chart_in_data: [],
      type_index: 0,
      set_gipho: "",
      avg_gipho: 0,
      top: [],
      loading: false,
      region: "",
      region2: "",
    };
  }
  componentDidMount() {
    console.log(this.state.gipho_data);
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.region !== prevProps.region || this.props.select_gipho_data != prevProps.select_gipho_data || this.props.data != prevProps.data) {
      const str1 = this.props.region.split("-");
      if (str1[0] === "전국") {
        this.setState({
          region: str1[0],
          region2: "",
        });
      } else {
        this.setState({
          region: str1[0],
          region2: str1[1],
        });
      }
      const arr = [];
      let avg = 0;
      let indexing = 0;
      const data_making = this.data_make(this.props.select_gipho_data);
      console.log(data_making);
      this.setState(
        {
          categori: data_making,
          categori_in: data_making[0].arr,
          top10: this.props.data,
          top: this.props.data,
        },
        () => {
          console.log(this.state.top);
          this.state.top.map((v, i) => {
            console.log(v);
            console.log(v.city);
          });

          if (this.state.top10[0].tot_oa_cd !== null) {
            const box = { city: this.state.top10[0].tot_oa_cd };
            fetch("http://localhost:5000/getpolygon", {
              method: "post",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(box),
            })
              .then((res) => res.json())
              .then((json) => {
                console.log(json);
                this.props.mapdata_change(json);
              });
          }
          this.state.top.map((v, i, a) => {
            for (const key in v) {
              if (key === this.state.categori_in[0]) {
                indexing = indexing + 1;
                avg = avg + parseInt(v[key]);
                console.log(v[key]);
                if (parseInt(v[key]) != 0) {
                  if (i === 0) {
                    const data = {
                      name: v.dong,
                      y: parseInt(v[key]),
                      color: "#ec8b8b",
                    };
                    arr.push(data);
                  } else {
                    const data = {
                      name: v.dong,
                      y: parseInt(v[key]),
                      color: "#4e61f1",
                    };
                    arr.push(data);
                  }
                }
              }
            }
          });
          console.log(avg);
          this.setState(
            {
              loading: true,
              chart_in_data: arr,
              set_gipho: this.state.categori_in[0],
              avg_gipho: avg / indexing,
            },
            () => {}
          );
        }
      );
    }
  }
  // 데이터 지표 분류 만들기
  data_make = (data) => {
    let making = [];
    let making2 = [];

    data.map((v, i, t) => {
      making.push(v.bigname);
    });
    const set = new Set(making);
    const uniqueArr = [...set];

    uniqueArr.map((v, i, t) => {
      // 큰배열
      const arr = [];
      data.map((v2, i2, t2) => {
        //작은배열
        if (v === v2.bigname) {
          arr.push(v2.name);
        }
      });
      making2.push({ bigname: v, arr: arr });
    });
    return making2;
  };
  dongclick = (index) => {
    const box = { city: this.state.top10[index].tot_oa_cd };
    fetch("http://ec2-15-165-159-127.ap-northeast-2.compute.amazonaws.com/getpolygon", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(box),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        //this.props.mapdata_function(json);
        this.props.mapdata_change(json);
      });
  };
  onclick1 = (name) => {
    const data2 = this.state.top10;
    this.setState(
      {
        change: this.state.top10,
      },
      () => {
        const data = this.state.change;
        let insert = {};
        const arr = [];
        const newarr = [];
        let avg = 0;
        let indexing = 0;
        this.state.top10.map((v, i, a) => {
          if (v.tot_oa_cd === name) {
            insert = v;
          } else {
            arr.push(v);
          }
        });
        console.log(insert);
        newarr.push(insert);
        arr.map((v1, i1, a1) => {
          newarr.push(v1);
        });
        console.log(newarr);
        this.setState(
          {
            top: newarr,
          },
          () => {
            const arr2 = [];
            this.state.top.map((v, i, a) => {
              for (const key in v) {
                if (key === this.state.categori_in[0]) {
                  indexing = indexing + 1;
                  avg = avg + parseInt(v[key]);

                  if (parseInt(v[key]) != 0) {
                    console.log(this.state.chart_in_data);
                    console.log(parseInt(v[key]));
                    if (i === 0) {
                      console.log();
                      const data = {
                        name: v.dong,
                        y: parseInt(v[key]),
                        color: "#ec8b8b",
                      };
                      arr2.push(data);
                    } else {
                      const data = {
                        name: v.dong,
                        y: parseInt(v[key]),
                        color: "#4e61f1",
                      };
                      arr2.push(data);
                    }
                  }
                }
              }
            });
            console.log(avg);
            this.setState(
              {
                chart_in_data: arr2,
                set_gipho: this.state.categori_in[0],
                avg_gipho: avg / indexing,
              },
              () => {
                console.log(arr2);
              }
            );
          }
        );
      }
    );
  };
  onclick2 = (name, type) => {
    let avg = 0;
    let indexing = 0;
    console.log(name);
    console.log(this.state.categori);
    const arr = [];
    this.state.categori.map((v, i, a) => {
      if (v.bigname === name) {
        console.log(v);
        console.log(i);
        this.setState(
          {
            categori_in: v.arr,
          },
          () => {
            this.state.top.map((v, i, a) => {
              for (const key in v) {
                if (key === this.state.categori_in[0]) {
                  indexing = indexing + 1;
                  avg = avg + parseInt(v[key]);
                  if (parseInt(v[key]) != 0) {
                    if (i === 0) {
                      const data = {
                        name: v.dong,
                        y: parseInt(v[key]),
                        color: "#ec8b8b",
                      };
                      arr.push(data);
                    } else {
                      const data = {
                        name: v.dong,
                        y: parseInt(v[key]),
                        color: "#4e61f1",
                      };
                      arr.push(data);
                    }
                  }
                  console.log(key + ": " + v[key] + v.dong);
                }
              }
            });
            this.setState(
              {
                chart_in_data: arr,
                set_gipho: this.state.categori_in[0],
                avg_gipho: avg / indexing,
              },
              () => {}
            );
          }
        );
      }
    });
  };

  onclick3 = (string) => {
    let avg = 0;
    let indexing = 0;
    const arr = [];
    this.state.top.map((v, i, a) => {
      for (const key in v) {
        if (key === string) {
          indexing = indexing + 1;
          avg = avg + parseInt(v[key]);
          if (parseInt(v[key]) != 0) {
            if (i === 0) {
              const data = {
                name: v.dong,
                y: parseInt(v[key]),
                color: "#ec8b8b",
              };
              arr.push(data);
            } else {
              const data = {
                name: v.dong,
                y: parseInt(v[key]),
                color: "#4e61f1",
              };
              arr.push(data);
            }
          }
          console.log(key + ": " + v[key] + v.dong);
        }
      }
    });
    this.setState(
      {
        chart_in_data: arr,
        set_gipho: string,
        avg_gipho: avg / indexing,
      },
      () => {
        console.log(this.state.chart_in_data);
      }
    );
  };
  render() {
    if (this.state.loading === true) {
      return (
        <div className="result_main">
          <div className="result_all_gipho_title">
            1.{" "}
            <p id="region_selecting">
              {this.state.region} {this.state.region2}
            </p>{" "}
            추천지역 리스트
            <button
              id="cancle_step"
              onClick={() => {
                this.props.result_cancle();
                this.props.cancle_select_gipho_data_change();
                this.props.polygon_stop_change(true);
              }}
            ></button>
          </div>
          <div className="result_all_gipho">
            <div className="result_all_gipho1">
              {this.state.top10.map((v, i, a) => {
              if(v.sido === '0'){
                if (i < 5) {
                  if (this.state.region === "전국") {
                    return (
                      <a
                        href="#"
                        className="show_all_gipho"
                        onClick={() => {
                          this.onclick1(v.tot_oa_cd);
                          this.dongclick(i);
                        }}
                      >
                        <div id="show_all_gipho_circle">
                          <div id="circle_num">{i + 1}</div>
                        </div>
                        <div id="show_all_gipho_main">
                          {v.city}&nbsp;{v.dong}
                        </div>
                      </a>
                    );
                  } else {
                    return (
                      <a
                        href="#"
                        className="show_all_gipho"
                        onClick={() => {
                          this.onclick1(v.tot_oa_cd);
                          this.dongclick(i);
                        }}
                      >
                        <div id="show_all_gipho_circle">
                          <div id="circle_num">{i + 1}</div>
                        </div>
                        <div id="show_all_gipho_main">{v.dong}</div>
                      </a>
                    );
                  }
                } 
              }
              })}
            </div>
            <div className="result_all_gipho2">
              {this.state.top10.map((v, i, a) => {
                if(v.sido === '0'){
                  if (i < 10 && i > 4) {
                    if (this.state.region === "전국") {
                      return (
                        <a
                          href="#"
                          className="show_all_gipho"
                          onClick={() => {
                            this.onclick1(v.tot_oa_cd);
                            this.dongclick(i);
                          }}
                        >
                          <div id="show_all_gipho_circle">
                            <div id="circle_num">{i + 1}</div>
                          </div>
                          <div id="show_all_gipho_main">
                            {v.city}&nbsp;{v.dong}
                          </div>
                        </a>
                      );
                    } else {
                      return (
                        <a
                          href="#"
                          className="show_all_gipho"
                          onClick={() => {
                            this.onclick1(v.tot_oa_cd);
                            this.dongclick(i);
                          }}
                        >
                          <div id="show_all_gipho_circle">
                            <div id="circle_num">{i + 1}</div>
                          </div>
                          <div id="show_all_gipho_main">{v.dong}</div>
                        </a>
                      );
                    }
                  }
                }
              })}
            </div>
          </div>
          <div className="result_gipho">
            <div className="result_all_gipho_title2">2. 선택한 지표 현황별 보기</div>
            <div className="result_gipho_title">
              {this.state.categori.map((v, i, a) => {
                return (
                  <button onClick={() => this.onclick2(v.bigname, 0)} id="result_button">
                    {v.bigname}
                  </button>
                );
              })}
            </div>
            <div className="result_gipho_title2">
              {this.state.categori_in.map((v, i, a) => {
                return (
                  <button id="result_button2" onClick={() => this.onclick3(v)}>
                    {v}
                  </button>
                );
              })}
            </div>
            <HighChart gipho_data={this.state.chart_in_data} avg_gipho={this.state.avg_gipho} />
            <div className="set_gipho_name">*{this.state.set_gipho}</div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="result_main">
          <div className="loading">
            <div>
              <CircularProgress />
            </div>
            <div className="loading_string">분석중입니다. 시간이 다소 걸릴수 있습니다.</div>
          </div>
        </div>
      );
    }
  }
}

export default Result;
