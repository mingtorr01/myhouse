import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { actionCreators } from "../../store/store";
import Apart_page from "./meme/apart_page";
import Junse_page from "./meme/junse_page";
import Walse_page from "./meme/walse_page";
import Tradingmenu from "../../tradingmenu/tradingmenu";
import "./kakao.css";
import io from "socket.io-client";
const url = "http://localhost:3001/";

const socket = io.connect("http://localhost:3001/");
const { kakao } = window;

function updateTarget(map, types) {
  var bounds = map.getBounds();
  var swLatLng = bounds.getSouthWest();
  var neLatLng = bounds.getNorthEast();
  socket.emit("bound", { sw: swLatLng, ne: neLatLng, type: types });
}

function updateDong(map, types) {
  var bounds = map.getBounds();
  var swLatLng = bounds.getSouthWest();
  var neLatLng = bounds.getNorthEast();
  socket.emit("dong", { sw: swLatLng, ne: neLatLng, type: types });
}

function updateDistrict(map, types) {
  var bounds = map.getBounds();
  var swLatLng = bounds.getSouthWest();
  var neLatLng = bounds.getNorthEast();
  socket.emit("district", { sw: swLatLng, ne: neLatLng, type: types });
}
function updateCity(map, types) {
  var bounds = map.getBounds();
  var swLatLng = bounds.getSouthWest();
  var neLatLng = bounds.getNorthEast();
  socket.emit("city", { sw: swLatLng, ne: neLatLng, type: types });
}

function updateMarkers(map, markers) {
  var marker, position;

  for (var i = 0; i < markers.length; i++) {
    marker = markers[i];
    position = marker.getPosition();
    hideMarker(map, marker);
  }

  markers = [];
}

function hideMarker(map, marker) {
  if (!marker.getMap()) return;
  marker.setMap(null);
}

const MapContainer = (props) => {
  ////////////////////////////////////////////

  const dispatcher = useDispatch();
  const [apart_page, apart_page_change] = useState(false);
  const [apart_data, apart_data_change] = useState([]);
  const [maping, maping_change] = useState(null);
  const [polygons, polygon_change] = useState(null);
  const [type, type_change] = useState("apart_trades");
  const [markers_save, markers_change] = useState([]);
  const [position, position_change] = useState(new kakao.maps.LatLng(35.2279868, 128.6796256));
  const [polygon_use, polygon_use_change] = useState(0);
  var map = 0;
  useEffect(() => {
    if (props.mapdata !== null) {
      console.log(props.mapdata[0][0]);
      drawpolygon(true);
    } else if (props.mapdata !== null && polygon_use !== 0) {
      drawpolygon(false);
    }
  }, [props.mapdata, polygon_use]);
  useEffect(() => {
    console.log(props.polygon_stop);
    if (props.polygon_stop === true) {
      polygons.setMap(null);
    }
  }, [props.polygon_stop]);
  useEffect(() => {
    if (type === "apart_trades") {
      type_change(type);
      polygon_use_change(polygon_use + 1);
      updateMarkers(maping, markers_save);
    } else if (type !== "office_deposits") {
      type_change(type);
      polygon_use_change(polygon_use + 1);
      updateMarkers(maping, markers_save);
    } else {
      type_change(type);
      polygon_use_change(polygon_use + 1);
      updateMarkers(maping, markers_save);
    }
  }, [type]);

  useEffect(() => {
    console.log(props.mapdata);
    type_change(type);
    const container = document.getElementById("myMap");
    const options = {
      center: position,
      level: 5,
      tileAnimation: false,
    };
    map = new kakao.maps.Map(container, options);
    maping_change(map);
    //drawpolygon();
    console.log(map);
    var markers = [];
    updateDong(map, type);

    kakao.maps.event.addListener(map, "idle", function () {
      position_change(map.getCenter());
      var zoom = map.getLevel();
      console.log(zoom);
      console.log(type);
      if (zoom <= 3) updateTarget(map, type);
      else if (zoom <= 6 && zoom >= 4) updateDong(map, type);
      else if (zoom <= 8 && zoom >= 7) updateDistrict(map, type);
      else if (zoom >= 9) updateCity(map, type);
    });

    socket.on("marker", function (positions) {
      updateMarkers(map, markers);
      for (var key in positions) {
        var position = new kakao.maps.LatLng(positions[key].location.hits.hits[0]._source.location.lat, positions[key].location.hits.hits[0]._source.location.lon);
        const posi = { lat: positions[key].location.hits.hits[0]._source.location.lat, lon: positions[key].location.hits.hits[0]._source.location.lon };
        var avg;
        if (positions[key].avg_trade_price.value >= 10000) avg = parseInt(Math.round(positions[key].avg_trade_price.value / 1000) / 10) + "." + parseInt(Math.round(positions[key].avg_trade_price.value / 1000) % 10) + "억";
        else avg = parseInt(Math.round(positions[key].avg_trade_price.value)) + "만원";
        var zoom = map.getLevel();
        var housenum = key.length;
        var marker = new kakao.maps.CustomOverlay({
          map: map,
          position: position,
          content: markerreturn(key, positions, avg, zoom, housenum, posi),
          xAnchor: 0.5,
          yAnchor: 0.5,
          zIndex: 4,
        });
        markers.push(marker);
      }
      markers_change(markers);
    });
    //dispatcher(actionCreators.setMap(map), [map]);
  }, [type]); ///////////////////////////////////////////////////

  const apart_page_bool = () => {
    apart_page_change(true);
  };

  const change_poly = (num) => {
    polygon_use_change(polygon_use + num);
  };

  const drawpolygon = (stop) => {
    //불러오는 코드 완성 나머지 띄우는 거 해야함
    console.log(props.mapdata[0]);
    var polygonPath = [];
    if (props.mapdata[0].length < 3) {
      props.mapdata[0][0].map((v, i, a) => {
        if (i !== props.mapdata[0][0].length - 1) {
          const data2 = new kakao.maps.LatLng(v[1], v[0]);
          polygonPath.push(data2);
        } else {
          const data = new kakao.maps.LatLng(v[1], v[0]);
          polygonPath.push(data);
          console.log(polygonPath);
          var polygon = new kakao.maps.Polygon({
            path: polygonPath, // 그려질 다각형의 좌표 배열입니다
            strokeWeight: 3, // 선의 두께입니다
            strokeColor: "#2a3fd6", // 선의 색깔입니다
            strokeOpacity: 0.8, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
            strokeStyle: "solid", // 선의 스타일입니다
            fillColor: "#5f71f8", // 채우기 색깔입니다
            fillOpacity: 0.2, // 채우기 불투명도 입니다
          });
          if (polygons != null && stop == true) {
            polygons.setMap(null);
          }
          polygon.setMap(maping);
          polygon_change(polygon);
          var moveLatLon = new kakao.maps.LatLng(v[1], v[0]);
          maping.panTo(moveLatLon);
          maping.setLevel(5);
        }
      });
    } else {
      props.mapdata[0].map((v, i, a) => {
        console.log(v);
        if (i !== props.mapdata[0].length - 1) {
          const data2 = new kakao.maps.LatLng(v[1], v[0]);
          polygonPath.push(data2);
        } else {
          const data = new kakao.maps.LatLng(v[1], v[0]);
          polygonPath.push(data);
          var polygon = new kakao.maps.Polygon({
            path: polygonPath, // 그려질 다각형의 좌표 배열입니다
            strokeWeight: 3, // 선의 두께입니다
            strokeColor: "#2a3fd6", // 선의 색깔입니다
            strokeOpacity: 0.8, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
            strokeStyle: "solid", // 선의 스타일입니다
            fillColor: "#5f71f8", // 채우기 색깔입니다
            fillOpacity: 0.2, // 채우기 불투명도 입니다
          });
          if (polygons != null && stop == true) {
            polygons.setMap(null);
          }
          polygon.setMap(maping);
          polygon_change(polygon);
          var moveLatLon = new kakao.maps.LatLng(v[1], v[0]);
          maping.panTo(moveLatLon);
          maping.setLevel(5);
        }
      });
    }
    /*
      props.mapdata[1].map((x,i) => {
        if(i ===props.mapdata[1].length-1){
          const data = new kakao.map.LatLng(x[1], x[0]);
          polygonPath.push(data);
          var polygon = new kakao.maps.Polygon({
            path:polygonPath, // 그려질 다각형의 좌표 배열입니다
            strokeWeight: 3, // 선의 두께입니다
            strokeColor: '#39DE2A', // 선의 색깔입니다
            strokeOpacity: 0.8, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
            strokeStyle: 'longdash', // 선의 스타일입니다
            fillColor: '#A2FF99', // 채우기 색깔입니다
            fillOpacity: 0.7 // 채우기 불투명도 입니다
        });
        
        // 지도에 다각형을 표시합니다
        polygon.setMap(maping);
        }else{
          const data2 = new kakao.map.LatLng(x[1], x[0]);
          polygonPath.push(data2);
        }
      })

    var polygon = new kakao.maps.Polygon({
      map: maping,
      path: datas,
      strokeeWeight: 2,
      strokeColor: "#004c80",
      strokeOpacity: 0.8,
      fillColor: "#FFF",
      fillOpacity: 0.7,
    });
    polygon_change(polygon);*/
    // polygon.setMap(map);
  };

  window.myFunction = (box) => {
    ///클릭 이벤트

    var splitstring = box.split(",");
    const data = {
      apart_name: splitstring[0],
      position_x: splitstring[1],
      position_y: splitstring[2],
      types: type,
    };
    fetch("api/clickevent", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        apart_data_change(json);
      });

    apart_page_bool();
  };

  window.myFunction2 = (box) => {
    console.log(map);
    console.log(box);
    var splitstring = box.split("-");
    let zoom = splitstring[0];
    let position_x = splitstring[1];
    let position_y = splitstring[2];
    var moveLatLon = new kakao.maps.LatLng(position_x, position_y);
    if (zoom <= 6 && zoom >= 4) {
      maping.setCenter(moveLatLon);
      maping.setLevel(3);
    } else if (zoom < 9 && zoom >= 7) {
      maping.setCenter(moveLatLon);
      maping.setLevel(6);
    } else if (zoom >= 9) {
      maping.setCenter(moveLatLon);
      maping.setLevel(8);
    }
  };
  function markerreturn(key, positions, avg, zoom, housenum, posi) {
    const box = {
      data: positions[key].key,
      x: positions[key].location.hits.hits[0]._source.location.lat,
      y: positions[key].location.hits.hits[0]._source.location.lon,
    };

    const string = "asdasd";
    if (zoom <= 3) {
      if (type === "apart_trades") {
        const level = '<a href="#" class="level_box"  onclick="myFunction(\'' + positions[key].key + "," + positions[key].location.hits.hits[0]._source.location.lat + "," + positions[key].location.hits.hits[0]._source.location.lon + "')\">" + '<div id="box_avg">' + '<p id="box_avg_p">' + avg + "</p>" + "</div>" + '<div id="box_img">' + "</div>" + "</a>";
        return level;
      } else if (type === "office_deposits") {
        const level = '<a href="#" class="level_box"  onclick="myFunction(\'' + positions[key].key + "," + positions[key].location.hits.hits[0]._source.location.lat + "," + positions[key].location.hits.hits[0]._source.location.lon + "')\">" + '<div id="box_avg2">' + '<p id="box_avg_p">' + avg + "</p>" + "</div>" + '<div id="box_img">' + "</div>" + "</a>";
        return level;
      } else {
        const level = '<a href="#" class="level_box"  onclick="myFunction(\'' + positions[key].key + "," + positions[key].location.hits.hits[0]._source.location.lat + "," + positions[key].location.hits.hits[0]._source.location.lon + "')\">" + '<div id="box_avg3">' + '<p id="box_avg_p">' + avg + "</p>" + "</div>" + '<div id="box_img">' + "</div>" + "</a>";
        return level;
      }
    } else if (zoom <= 6 && zoom >= 4) {
      if (type === "apart_trades") {
        const level2 = '<div class="range_level_box" onclick="myFunction2(\'' + zoom + "-" + box.x + "-" + box.y + "')\">" + '<div id="range_level_box1">' + positions[key].key + "</div>" + '<div id="range_level_box2">' + avg + "</div>" + "</div>";
        return level2;
      } else if (type === "office_deposits") {
        const level2 = '<div class="range_level_box1_2" onclick="myFunction2(\'' + zoom + "-" + box.x + "-" + box.y + "')\">" + '<div id="range_level_box1">' + positions[key].key + "</div>" + '<div id="range_level_box2">' + avg + "</div>" + "</div>";
        return level2;
      } else {
        const level2 = '<div class="range_level_box1_3" onclick="myFunction2(\'' + zoom + "-" + box.x + "-" + box.y + "')\">" + '<div id="range_level_box1">' + positions[key].key + "</div>" + '<div id="range_level_box2">' + avg + "</div>" + "</div>";
        return level2;
      }
    } else if (zoom < 9 && zoom >= 7) {
      if (type === "apart_trades") {
        const level2 = '<div class="range_level_box2"  onclick="myFunction2(\'' + zoom + "-" + box.x + "-" + box.y + "')\">" + '<div id="range_level_box3">' + positions[key].key + "</div>" + '<div id="range_level_box4">' + avg + "</div>" + "</div>";
        return level2;
      } else if (type === "office_deposits") {
        const level2 = '<div class="range_level_box2_2"  onclick="myFunction2(\'' + zoom + "-" + box.x + "-" + box.y + "')\">" + '<div id="range_level_box3">' + positions[key].key + "</div>" + '<div id="range_level_box4">' + avg + "</div>" + "</div>";
        return level2;
      } else {
        const level2 = '<div class="range_level_box2_3"  onclick="myFunction2(\'' + zoom + "-" + box.x + "-" + box.y + "')\">" + '<div id="range_level_box3">' + positions[key].key + "</div>" + '<div id="range_level_box4">' + avg + "</div>" + "</div>";
        return level2;
      }
    } else if (zoom >= 9) {
      if (type === "apart_trades") {
        const level2 = '<div class="range_level_box2" onclick="myFunction2(\'' + zoom + "-" + box.x + "-" + box.y + "')\">" + '<div id="range_level_box3">' + positions[key].key + "</div>" + '<div id="range_level_box4">' + avg + "</div>" + "</div>";
        return level2;
      } else if (type === "office_deposits") {
        const level2 = '<div class="range_level_box2_2" onclick="myFunction2(\'' + zoom + "-" + box.x + "-" + box.y + "')\">" + '<div id="range_level_box3">' + positions[key].key + "</div>" + '<div id="range_level_box4">' + avg + "</div>" + "</div>";
        return level2;
      } else {
        const level2 = '<div class="range_level_box2_3" onclick="myFunction2(\'' + zoom + "-" + box.x + "-" + box.y + "')\">" + '<div id="range_level_box3">' + positions[key].key + "</div>" + '<div id="range_level_box4">' + avg + "</div>" + "</div>";
        return level2;
      }
    }
  }

  return (
    <div
      id="myMap"
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <Tradingmenu type_change={type_change} apart_page_change={apart_page_change} change_poly={change_poly} />
      {apart_page && type === "apart_trades" ? <Apart_page apart_data={apart_data} apart_page_change={apart_page_change} /> : <div></div>}
      {apart_page && type === "office_deposits" ? <Junse_page apart_data={apart_data} apart_page_change={apart_page_change} /> : <div></div>}
      {apart_page && type === "office_rents" ? <Walse_page naming={"오피스텔"} apart_data={apart_data} apart_page_change={apart_page_change} /> : <div></div>}
      {apart_page && type === "apart_rents" ? <Walse_page naming={"아파트"} apart_data={apart_data} apart_page_change={apart_page_change} /> : <div></div>}
    </div>
  );
};

export default MapContainer;
