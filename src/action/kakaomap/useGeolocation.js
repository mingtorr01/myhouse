import { useCallback } from "react";
import { useSelector } from "react-redux";
import useIpAddr from "../useIpAddr";
import useMaskData from "../useMaskData";
import useSetMarker from "./useSetMarker";
const { kakao } = window;

var kakaoMap = {};

const useGeolocation = () => {
  const { map } = useSelector((state) => ({ map: state.maskMap.map }), []);
  const { getIpAddr } = useIpAddr();
  const { getZigbang } = useMaskData();
  const { setMarker } = useSetMarker();

  kakaoMap = map;

  const getGeo = useCallback(() => {
    if (navigator.geolocation) {
      if (kakaoMap !== null) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            getZigbang("사림동").then(() => {
              //setMarker();
            });

            kakaoMap.panTo(new kakao.maps.LatLng(position.coords.latitude, position.coords.longitude));
          },
          () => getIpAddr()
        );
      }
    } else {
      alert("이 브라우저에서는 Geolocation이 지원되지 않습니다.");
    }
  });
  return { getGeo };
};

export default useGeolocation;
