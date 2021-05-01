import React, { useState, useEffect, useRef } from "react";
import "./househelper.css";
import MapContainer from "../components/kakaomap/kakaoMap";

import useGeolocation from "../action/kakaomap/useGeolocation";
import useCenterChanged from "../action/kakaomap/useCenterChanged";
import { useSelector } from "react-redux";

const Househelper = (props) => {
  const { map } = useSelector((state) => ({ map: state.maskMap.map }), []);

  const { getGeo } = useGeolocation();
  const { setEvent } = useCenterChanged();
  useEffect(() => {
    getGeo();
    setEvent();
    const box = {};
    fetch("http://localhost:5000/getNews", {
      method: "get",
      headers: {
        "content-type": "application/json",
      },
    });
  }, [map]);

  return (
    <div className="map">
      <MapContainer mapdata={props.mapdata} polygon_stop={props.polygon_stop} />
    </div>
  );
};

export default Househelper;
