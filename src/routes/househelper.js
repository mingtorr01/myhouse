import React, { useEffect } from "react";
import Topmenu from "../components/topmenu";
import "./househelper.css";
import Leftmenu from "../components/leftmenu";
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

  let show = true;

  const back = () => {
    if (show) {
      var div = document.getElementById("leftmenu");
      div.setAttribute("id", "close");
      setTimeout(() => {
        div.style.display = "none";
      }, 800);
      var div2 = document.getElementById("sibal");
      div2.setAttribute("id", "sibal2");
      show = false;
    } else {
      console.log("asdasd");
      var div3 = document.getElementById("close");
      div3.style.display = "flex";
      console.log(div3);
      div3.setAttribute("id", "close2");
      var div4 = document.getElementById("sibal2");
      div4.setAttribute("id", "sibal3");
      show = true;
      setTimeout(() => {
        div3.setAttribute("id", "leftmenu");
        div4.setAttribute("id", "sibal");
      }, 1000);
    }
  };

  return (
    <div className="main">
      <button id="sibal" onClick={back}>
        &gt;
      </button>
      <Topmenu />
      <div className="map">
        <MapContainer />
        <div id="leftmenu">
          <Leftmenu />
        </div>
      </div>
    </div>
  );
};

export default Househelper;

/*
export default class Househelper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
      count: 0,
      count2: 0,
    };
  }
  back = () => {
    if (this.state.show === true) {
      var div = document.getElementById("leftmenu");
      div.setAttribute("id", "close");
      setTimeout(() => {
        div.style.display = "none";
      }, 800);
      var div2 = document.getElementById("sibal");
      div2.setAttribute("id", "sibal2");
      this.setState({
        show: false,
        count: 1,
      });
    } else {
      console.log("asdasd");
      var div3 = document.getElementById("close");
      div3.style.display = "flex";
      console.log(div3);
      div3.setAttribute("id", "close2");
      var div4 = document.getElementById("sibal2");
      div4.setAttribute("id", "sibal3");
      this.setState({
        show: true,
        count: 1,
      });
      setTimeout(() => {
        div3.setAttribute("id", "leftmenu");
        div4.setAttribute("id", "sibal");
      }, 1000);
    }
  };
  render() {
    return (
      <div className="main">
        <button id="sibal" onClick={this.back}>
          &gt;
        </button>
        <Topmenu />
        <div className="map">
          <MapContainer />
          <div id="leftmenu">
            <Leftmenu />
          </div>
        </div>
      </div>
    );
  }
}
*/
