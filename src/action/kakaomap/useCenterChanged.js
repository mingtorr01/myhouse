import { useCallback } from "react";
import { useSelector } from "react-redux";
import useMaskData from "../useMaskData";
import useSetMarker from "./useSetMarker";

const { kakao } = window;

var kakaoMap = null;

const useCenterChanged = () => {
  const { map } = useSelector((state) => ({
    map: state.maskMap.map,
  }));

  const { getMaskDataGeo } = useMaskData();

  const { setMarker } = useSetMarker();

  kakaoMap = map;

  const setEvent = useCallback(() => {
    if (kakaoMap !== null) {
      kakao.maps.event.addListener(kakaoMap, "dragend", () => {
        // 지도의 중심좌표를 얻어옵니다
        var latlng = kakaoMap.getCenter();
        //좌표가 바뀌면 다시 얻어 온다.
        getMaskDataGeo(latlng.getLat(), latlng.getLng(), 3000);

        setMarker();
      });
    }
  });

  return { setEvent };
};

export default useCenterChanged;
