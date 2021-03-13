import React, { useEffect } from "react";
import "./househelper.css";
import MapContainer from "../components/kakaomap/kakaoMap";

import useGeolocation from "../action/kakaomap/useGeolocation";
import useCenterChanged from "../action/kakaomap/useCenterChanged";
import { useSelector } from "react-redux";

const Househelper = () => {
  const { map } = useSelector((state) => ({ map: state.maskMap.map }), []);

  const { getGeo } = useGeolocation();
  const { setEvent } = useCenterChanged();
  useEffect(() => {
    getGeo();
    setEvent();
  }, [map]);

  return (
    <div className="map">
      <MapContainer />
    </div>
  );
};

export default Househelper;
