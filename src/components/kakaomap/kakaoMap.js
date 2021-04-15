import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { actionCreators } from "../../store/store";
import Apart_page from "./meme/apart_page";
import "./kakao.css";
import io from "socket.io-client";
const url = "http://localhost:3001/";

const socket = io.connect("http://localhost:3001/");
const { kakao } = window;

function updateTarget(map) {
  var bounds = map.getBounds();
  var swLatLng = bounds.getSouthWest();
  var neLatLng = bounds.getNorthEast();
  socket.emit("bound", { sw: swLatLng, ne: neLatLng, type: "apart_trades" });
}

function updateDong(map) {
  var bounds = map.getBounds();
  var swLatLng = bounds.getSouthWest();
  var neLatLng = bounds.getNorthEast();
  socket.emit("dong", { sw: swLatLng, ne: neLatLng, type: "apart_trades" });
}

function updateDistrict(map) {
  var bounds = map.getBounds();
  var swLatLng = bounds.getSouthWest();
  var neLatLng = bounds.getNorthEast();
  socket.emit("district", { sw: swLatLng, ne: neLatLng, type: "apart_trades" });
}
function updateCity(map) {
  var bounds = map.getBounds();
  var swLatLng = bounds.getSouthWest();
  var neLatLng = bounds.getNorthEast();
  socket.emit("city", { sw: swLatLng, ne: neLatLng, type: "apart_trades" });
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
  var map = 0;

  useEffect(() => {
    const container = document.getElementById("myMap");
    const options = {
      center: new kakao.maps.LatLng(35.2279868, 128.6796256),
      level: 5,
      tileAnimation: false,
    };
    map = new kakao.maps.Map(container, options);
    maping_change(map);
    //drawpolygon();
    console.log(map);
    var markers = [];
    updateDong(map);
    kakao.maps.event.addListener(map, "idle", function () {
      var zoom = map.getLevel();
      console.log(zoom);
      if (zoom <= 3) updateTarget(map);
      else if (zoom <= 6 && zoom >= 4) updateDong(map);
      else if (zoom <= 8 && zoom >= 7) updateDistrict(map);
      else if (zoom <= 9) updateCity(map);
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
    });
    //dispatcher(actionCreators.setMap(map), [map]);
  }, []); ///////////////////////////////////////////////////

  const apart_page_bool = () => {
    apart_page_change(true);
  };

  async function drawpolygon() {
    //불러오는 코드 완성 나머지 띄우는 거 해야함
    let datas = await Promise.all(
      props.mapdata[1].map((x) => {
        let point = new kakao.map.LatLng(x[1], x[0]);
      })
    );

    var polygon = new kakao.maps.Polygon({
      map: maping,
      path: datas,
      strokeeWeight: 2,
      strokeColor: "#004c80",
      strokeOpacity: 0.8,
      fillColor: "#FFF",
      fillOpacity: 0.7,
    });
    polygon_change(polygon);
  }

  window.myFunction = (box) => {
    ///클릭 이벤트

    var splitstring = box.split(",");
    const data = {
      apart_name: splitstring[0],
      position_x: splitstring[1],
      position_y: splitstring[2],
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
      maping.panTo(moveLatLon);
      maping.setLevel(3);
    } else if (zoom < 9 && zoom >= 7) {
      maping.panTo(moveLatLon);
      maping.setLevel(6);
    } else if (zoom <= 9) {
      maping.panTo(moveLatLon);
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
      const level = '<a href="#" class="level_box"  onclick="myFunction(\'' + positions[key].key + "," + positions[key].location.hits.hits[0]._source.location.lat + "," + positions[key].location.hits.hits[0]._source.location.lon + "')\">" + '<div id="box_avg">' + '<p id="box_avg_p">' + avg + "</p>" + "</div>" + '<div id="box_img">' + "</div>" + "</a>";

      return level;
    } else if (zoom <= 6 && zoom >= 4) {
      const level2 = '<div class="range_level_box" onclick="myFunction2(\'' + zoom + "-" + box.x + "-" + box.y + "')\">" + '<div id="range_level_box1">' + positions[key].key + "</div>" + '<div id="range_level_box2">' + avg + "</div>" + "</div>";
      return level2;
    } else if (zoom < 9 && zoom >= 7) {
      const level2 = '<div class="range_level_box2"  onclick="myFunction2(\'' + zoom + "-" + box.x + "-" + box.y + "')\">" + '<div id="range_level_box3">' + positions[key].key + "</div>" + '<div id="range_level_box4">' + avg + "</div>" + "</div>";
      return level2;
    } else if (zoom <= 9) {
      const level2 = '<div class="range_level_box2" onclick="myFunction2(\'' + zoom + "-" + box.x + "-" + box.y + "')\">" + '<div id="range_level_box3">' + positions[key].key + "</div>" + '<div id="range_level_box4">' + avg + "</div>" + "</div>";
      return level2;
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
      {apart_page ? <Apart_page apart_data={apart_data} apart_page_change={apart_page_change} /> : <div></div>}
    </div>
  );
};

export default MapContainer;
