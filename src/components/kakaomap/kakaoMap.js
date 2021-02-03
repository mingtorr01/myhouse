import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { actionCreators } from "../../store/store";

const { kakao } = window;

const MapContainer = () => {
  const dispatcher = useDispatch();
  useEffect(() => {
    const container = document.getElementById("myMap");
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);
    dispatcher(actionCreators.setMap(map), [map]);
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
