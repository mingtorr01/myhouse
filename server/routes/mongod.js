const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("./schema/land");
const location = require("./schema/location");
const av_age = require("./schema/average_age");
const av_house = require("./schema/average_house");
const density = require("./schema/density");
const house = require("./schema/house");
const old_house = require("./schema/old_house");
const old = require("./schema/old");
const to_house = require("./schema/total_house");
const to_people = require("./schema/total_people");
const villa = require("./schema/villa");
const ranks = require("./schema/rank");
const { AreaSeries } = require("@devexpress/dx-react-chart");

require("dotenv").config({ path: __dirname + "/./../../.env" });

console.log(process.env.REACT_APP_MONGO_URI);
const uri = process.env.REACT_APP_MONGO_URI; // mongoDB Connect 정보

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error);
db.once("open", function () {
  // 몽고디비 서버에 연결
  console.log("Connected to mongod server");
});
/*
router.post("/point", (req, res) => {
  console.log(req.body);
  const rank = [];
  const name = [];
  const value = 0;
  req.body.map((p, index) => {
    console.log(p);
    if (p.name == "녹지비율") {
      land
        .find()
        .lte("rank", 10)
        .sort("rank")
        .then((data) => {
          console.log("hi");
          console.log(data);
        })
        .catch((err) => console.log(err));
    } else if (p.name == "미세먼지") {
      weather
        .find()
        .lte("rank", 10)
        .sort("rank")
        .then((data) => {
          data.map((d, index) => {
            console.log(d);
          });
        })
        .catch((err) => console.log(err));
    }
  });
  rank.land;
});*/

router.post("/getLocation", async (req, res) => {
  const locations = req.body.location;
  location.find({ _시도: locations }, { _id: 0, _시군구: 1 }).then((data) => {
    res.send(data);
  });
});

router.post("/getpoint", async function (req, res) {
  console.log(req.body);
  const body = req.body;
  let arr = [];
  let arr2 = [];
  let result = [];
  if (body.location === "전국-전체선택") {
    console.log("전국 선택함");
  } else {
    const city = body.location.split("-");
    console.log(body.point[0]);
    let a1 = await Promise.all(body.point.map((x) => getCity(city, x.name)));

    let cnt = 0;
    for (const idx of body.point) {
      const data = await Promise.all(a1.map((x) => adds(x, idx)));
      if (idx === body.point[0]) {
        for (i = 0; i < data.length; i++) arr.push(data[i]);
      } else {
        for (i = 0; i < data.length; i++) {
          arr[i].sets.push(data[i].sets[0]);
        }
      }

      /*
      if(idx === body.point[0]) {
        let json = {tot_oa_cd: }
      }*/
    }
    console.log(arr);
    sorting(arr).then((data) => {
      let ress = data.slice(0, 9);

      res.send(ress);
    });

    //console.log(arr[0][0][0].city);
    //console.log(arr);
    //console.log(arr[0].data);
    //지표배열 만들기
  }
});

/*

    const promises = body.point.map((v) => {
      const vs = getCity(city, v.name).then(() => {
        arr.push(vs);
      });
    });
    await Promise.all(promises);
    console.log(arr);
 */
/*
    for (const idx of body.point) {
      let cdd = getCity(city, idx.name);
      arr.push(cdd);
    }
    for (const index of body.point) {
      let temp = [];
      for (const idx of arr) {
        let ddd = getpoint(idx.tot_oa_cd, index);
        temp.push(ddd);
      }
      result.push({ name: index.name, arr: temp });
      console.log(result);
    }*/

/*
  const data = await getData(city, idx);
      temps.push({ code: idx.name, arr: data });
      if (idx === body.point[body.point.length - 1]) {
        res.send(temps);
      }
      //arr.push(data);
      if (idx === body.point[body.point.length - 1]) {
        sorting(arr).then((data) => {
          data.slice(0, 9);
          //searchData(city, arr);
          console.log(data);
          res.send(data);
        });
      }
    }
  }*/

////////////////////////////////////////////////////////////////////////////////

function adds(loc, idx) {
  return new Promise(function (resolve, reject) {
    let locs = loc[loc.length - 1];
    let result = [];
    loc.map((data) => {
      const ids = getpoint(data.tot_oa_cd, idx);
      result.push(ids);

      if (data === locs) {
        resolve(result);
      }
    });
  });
}

function sorting(arr) {
  return new Promise(function (resolve, reject) {
    arr.sort(function (a, b) {
      return a.point - b.point;
    });
    resolve(arr);
  });
}

async function getCity(city, select) {
  return new Promise(function (resolve, reject) {
    console.log(select);
    ranks
      .find()
      .where("sido")
      .equals(city[0])
      .where("city")
      .equals(city[1])
      .sort(select)
      .limit(10)
      .select("tot_oa_cd sido city dong")
      .then((data) => {
        console.log(data.length);
        resolve(data);
      })
      .catch(function (err) {
        console.log(err);
      });
  });
}

async function getpoint(loc, idx) {
  return new Promise(function (resolve, reject) {
    console.log(loc);
    if (idx.name === "대기오염도") {
    } else if (idx.name === "녹지비율") {
    } else if (idx.name === "교원 1인당학생수") {
    } else if (idx.name === "병원+약국밀집도") {
    } else if (idx.name === "유치원및보육시설") {
    } else if (idx.name === "노인복지시설") {
    } else if (idx.name === "사회복지시설") {
    } else if (idx.name === "문화시설수") {
    } else if (idx.name === "체육시설수") {
    } else if (idx.name === "쇼핑시설밀집도") {
    } else if (idx.name === "외식시설밀집도") {
    } else if (idx.name === "은행시설밀집도") {
    } else if (idx.name === "우체국시설") {
    } else if (idx.name === "대중교통이용률") {
    } else if (idx.name === "화재안전") {
    } else if (idx.name === "교통사고안전") {
    } else if (idx.name === "범죄안전") {
    } else if (idx.name === "감염병안전") {
    } else if (idx.name === "자연재해 안전") {
    } else if (idx.name === "다세대주택수") {
      villa.find({ tot_oa_cd: loc }).then((data) => {
        let dataset = addData(data);
        if (idx.range >= 1) dataset.point = dataset.point * idx.range;
        else dataset.point = dataset.point * (1 - idx.range);
        resolve(dataset);
      });
    } else if (idx.name === "단독주택수") {
      house.find({ tot_oa_cd: loc }).then((data) => {
        let dataset = addData(data);
        if (idx.range >= 1) dataset.point = dataset.point * idx.range;
        else dataset.point = dataset.point * (1 - idx.range);
        resolve(dataset);
      });
    } else if (idx.name === "노후주택비율") {
      old_house.find({ tot_oa_cd: loc }).then((data) => {
        let dataset = addData(data);
        if (idx.range >= 1) dataset.point = dataset.point * idx.range;
        else dataset.point = dataset.point * (1 - idx.range);
        resolve(dataset);
      });
    } else if (idx.name === "지가지수") {
    } else if (idx.name === "총주택수") {
      to_house.find({ tot_oa_cd: loc }).then((data) => {
        console.log(data);
        let dataset = addData(data);
        if (idx.range >= 1) dataset.point = dataset.point * idx.range;
        else dataset.point = dataset.point * (1 - idx.range);
        resolve(dataset);
      });
    } else if (idx.name === "청장년인구비율") {
    } else if (idx.name === "사업체종사자 비율") {
    } else if (idx.name === "노령화지수") {
      old.find({ tot_oa_cd: loc }).then((data) => {
        let dataset = addData(data);
        if (idx.range >= 1) dataset.point = dataset.point * idx.range;
        else dataset.point = dataset.point * (1 - idx.range);
        resolve(dataset);
      });
    } else if (idx.name === "인구밀도") {
      density.find({ tot_oa_cd: loc }).then((data) => {
        let dataset = addData(data);
        if (idx.range >= 1) dataset.point = dataset.point * idx.range;
        else dataset.point = dataset.point * (1 - idx.range);
        resolve(dataset);
      });
    } else if (idx.name === "총인구") {
      to_people.find({ tot_oa_cd: loc }).then((data) => {
        let dataset = addData(data);
        if (idx.range >= 1) dataset.point = dataset.point * idx.range;
        else dataset.point = dataset.point * (1 - idx.range);
        resolve(dataset);
      });
    } else if (idx.name === "평균나이") {
      av_age.find({ tot_oa_cd: loc }).then((data) => {
        let dataset = addData(data);
        if (idx.range >= 1) dataset.point = dataset.point * idx.range;
        else dataset.point = dataset.point * (1 - idx.range);
        resolve(dataset);
      });
    } else if (idx.name === "평균가구원수") {
      av_house.find({ tot_oa_cd: loc }).then((data) => {
        let dataset = addData(data);
        if (idx.range >= 1) dataset.point = dataset.point * idx.range;
        else dataset.point = dataset.point * (1 - idx.range);
        resolve(dataset);
      });
    }
  });
}

function addData(data) {
  let dataset = {
    rank: data[0].rank,
    tot_oa_cd: data[0].tot_oa_cd,
    sido: data[0].sido,
    city: data[0].city,
    dong: data[0].dong,
    point: data[0].point,
    sets: [data[0].data],
  };
  return dataset;
}
function searchData(city, temps) {
  // console.log(temps[0]);
  console.log(temps);
}

function sorting(arr) {
  return new Promise(function (resolve, reject) {
    arr.sort(function (a, b) {
      return a.point - b.point;
    });
    resolve(arr);
  });
}

function getData(city, idx) {
  return new Promise(function (resolve, reject) {
    if (idx.name === "대기오염도") {
    } else if (idx.name === "녹지비율") {
    } else if (idx.name === "교원 1인당 학생수") {
    } else if (idx.name === "병원+약국 밀집도") {
    } else if (idx.name === "유치원 및 보육시설") {
    } else if (idx.name === "노인복지시설") {
    } else if (idx.name === "사회복지시설") {
    } else if (idx.name === "문화시설 수") {
    } else if (idx.name === "체육시설 수") {
    } else if (idx.name === "쇼핑시설 밀집도") {
    } else if (idx.name === "외식시설 밀집도") {
    } else if (idx.name === "은행시설 밀집도") {
    } else if (idx.name === "우체국시설") {
    } else if (idx.name === "대중교통 이용률") {
    } else if (idx.name === "화재 안전") {
    } else if (idx.name === "교통사고 안전 안전") {
    } else if (idx.name === "범죄 안전") {
    } else if (idx.name === "감염병 안전") {
    } else if (idx.name === "자연재해 안전") {
    } else if (idx.name === "다세대 주택 수") {
      villa
        .find({ sido: city[0], city: city[1] })
        .limit(10)
        .then((data) => {
          data.map((d, index) => {
            if (idx.range >= 1) d.point = d.point * idx.range;
            else d.point = d.point * (1 - idx.range);
          });
          resolve(data);
        });
    } else if (idx.name === "단독주택 수") {
      house
        .find({ sido: city[0], city: city[1] })
        .limit(10)
        .then((data) => {
          data.map((d, index) => {
            if (idx.range >= 1) d.point = d.point * idx.range;
            else d.point = d.point * (1 - idx.range);
          });
          resolve(data);
        });
    } else if (idx.name === "노후주택 비율") {
      old_house
        .find({ sido: city[0], city: city[1] })
        .limit(10)
        .then((data) => {
          data.map((d, index) => {
            if (idx.range >= 1) d.point = d.point * idx.range;
            else d.point = d.point * (1 - idx.range);
          });
          resolve(data);
        });
    } else if (idx.name === "지가지수") {
    } else if (idx.name === "총 주택 수") {
      to_house
        .find({ sido: city[0], city: city[1] })
        .limit(10)
        .then((data) => {
          data.map((d, index) => {
            if (idx.range >= 1) d.point = d.point * idx.range;
            else d.point = d.point * (1 - idx.range);
          });
          resolve(data);
        });
    } else if (idx.name === "청장년 인구비율") {
    } else if (idx.name === "사업체 종사자 비율") {
    } else if (idx.name === "노령화지수") {
      old
        .find({ sido: city[0], city: city[1] })
        .limit(10)
        .then((data) => {
          data.map((d, index) => {
            if (idx.range >= 1) d.point = d.point * idx.range;
            else d.point = d.point * (1 - idx.range);
          });
          resolve(data);
        });
    } else if (idx.name === "인구밀도") {
      density
        .find({ sido: city[0], city: city[1] })
        .limit(10)
        .then((data) => {
          data.map((d, index) => {
            if (idx.range >= 1) d.point = d.point * idx.range;
            else d.point = d.point * (1 - idx.range);
          });
          resolve(data);
        });
    } else if (idx.name === "총인구") {
      to_people
        .find({ sido: city[0], city: city[1] })
        .limit(10)
        .then((data) => {
          data.map((d, index) => {
            if (idx.range >= 1) d.point = d.point * idx.range;
            else d.point = d.point * (1 - idx.range);
          });
          resolve(data);
        });
    } else if (idx.name === "평균나이") {
      av_age
        .find({ sido: city[0], city: city[1] })
        .limit(10)
        .then((data) => {
          data.map((d, index) => {
            if (idx.range >= 1) d.point = d.point * idx.range;
            else d.point = d.point * (1 - idx.range);
          });
          resolve(data);
        });
    } else if (idx.name === "평균 가구원 수") {
      av_house
        .find({ sido: city[0], city: city[1] })
        .limit(10)
        .then((data) => {
          data.map((d, index) => {
            if (idx.range >= 1) d.point = d.point * idx.range;
            else d.point = d.point * (1 - idx.range);
          });
          resolve(data);
        });
    }
  });
}

/*
function cal(d, value) {
  if (value >= 1) d.지수 = d.지수 * value;
  else d.지수 = d.지수 * (1 - value);
  return d;
}*/
module.exports = router;
