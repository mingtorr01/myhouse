import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { actionCreators } from "../../store/store";
import "./kakao.css";
import io from "socket.io-client";
const url = "http://localhost:3001/";

const socket = io.connect("http://localhost:3001/");

const { kakao } = window;

function updateTarget(map) {
  var bounds = map.getBounds();
  var swLatLng = bounds.getSouthWest();
  var neLatLng = bounds.getNorthEast();
  console.log("222");
  socket.emit("bound", { sw: swLatLng, ne: neLatLng, type: "office_trades" });
}

function updateDong(map) {
  var bounds = map.getBounds();
  var swLatLng = bounds.getSouthWest();
  var neLatLng = bounds.getNorthEast();
  console.log("hi");
  socket.emit("dong", { sw: swLatLng, ne: neLatLng, type: "office_trades" });
}

function updateDistrict(map) {
  var bounds = map.getBounds();
  var swLatLng = bounds.getSouthWest();
  var neLatLng = bounds.getNorthEast();
  socket.emit("district", { sw: swLatLng, ne: neLatLng, type: "office_trades" });
}
function updateCity(map) {
  var bounds = map.getBounds();
  var swLatLng = bounds.getSouthWest();
  var neLatLng = bounds.getNorthEast();
  socket.emit("city", { sw: swLatLng, ne: neLatLng, type: "office_trades" });
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

const MapContainer = () => {
  const dispatcher = useDispatch();
  useEffect(() => {
    const container = document.getElementById("myMap");
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 5,
    };
    const map = new kakao.maps.Map(container, options);

    var markers = [];
    kakao.maps.event.addListener(map, "idle", function () {
      var zoom = map.getLevel();
      console.log(zoom);
      if (zoom <= 5) updateTarget(map);
      else if (zoom <= 9 && zoom >= 6) updateDong(map);
      else if (zoom <= 13 && zoom >= 10) updateDistrict(map);
      else if (zoom <= 12) updateCity(map);
    });

    socket.on("marker", function (positions) {
      updateMarkers(map, markers);
      for (var key in positions) {
        //console.log(positions[key].location.hits.hits[0]._source.location.lat); // 아파트 이름
        //console.log(positions[key].location.hits.hits[0]._source.location.lon); // 아파트 이름
        var position = new kakao.maps.LatLng(positions[key].location.hits.hits[0]._source.location.lat, positions[key].location.hits.hits[0]._source.location.lon);

        var avg;
        if (positions[key].avg_trade_price.value >= 10000) avg = parseInt(Math.round(positions[key].avg_trade_price.value / 1000) / 10) + "." + parseInt(Math.round(positions[key].avg_trade_price.value / 1000) % 10) + "억";
        else avg = parseInt(Math.round(positions[key].avg_trade_price.value)) + "만원";

        var marker = new kakao.maps.Marker({
          map: map,
          position: position,
          title: positions[key].avg_trade_price.value,
          icon: {
            content: ['<div id="base">', '<span class="name">' + positions[key].key + "</span>", '<div class="avg_value">' + avg + "</div>", "</div>"].join(""),
            size: new kakao.maps.Size(38, 58),
            anchor: new kakao.maps.Point(19, 58),
          },
        });
        markers.push(marker);
      }
    });

    //dispatcher(actionCreators.setMap(map), [map]);
  }, []);

  return (
    <div
      id="myMap"
      style={{
        width: "100%",
        height: "100%",
      }}
    ></div>
  );
};

export default MapContainer;
