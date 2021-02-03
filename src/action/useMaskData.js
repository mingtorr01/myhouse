import { useState } from "react";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { actionCreators } from "../store/store";
import geohash from "ngeohash";

const useMaskData = () => {
  //국토교통부_아파트매매 실거래 상세 자료 등으로 직방 api 대체 가능

  const dispatch = useDispatch();

  const [maskData, setMaskData] = useState({
    keyward: "사림동",
    lat: "",
    lng: 0,
    stores: [
      {
        addr: "",
        code: "",
        created_at: "",
        lat: 0,
        lng: 0,
        name: "",
        remain_stat: "",
        stock_at: "",
        type: "",
      },
    ],
  });

  /* url 응답 예시
{"success":true,
  "code":"200",
  "items":[{"id":1717,"type":"address","name":"사림동","hint":"","description":"경상남도 창원시 의창구 사림동",
  "lat":35.24296188354492,"lng":128.68511962890625,"zoom":5,"polygon":[],"_score":null,"_source":{"name_length":3,
  "local1":"경상남도","local2":"창원시 의창구","local3":"사림동","web_level":15,"web_lat":35.24296188354492,
  "web_lng":128.68511962890625,"app_level":15,"app_lat":35.24296188354492,"app_lng":128.68511962890625,"법정동코드":"4812112500"},
  "zoom_level":{"google":15,"daum":4},"zoom_level_v2":{"app":5,"web":4}}],"next":null,"limit":0}
}*/

  //해당 동의 좌표 가져 오는 것.
  const getZigbang = async (keyward) => {
    console.log("keywark: " + keyward);
    await Axios.get(`https://apis.zigbang.com/search?q=${keyward}`).then((response) => {
      console.log(response.data.items[0]);
      if (response.status === 200) {
        const { lat, lng } = response.data.items[0];
        const geocode = geohash.encode(lat, lng, 5);
        console.log(geocode);
        
      }
    });
  };

  /*
{"lat":37.48935024024023,"lng":127.08326080678184,"item_id":25705651}
*/
  const getMaskDataAddr = async (location) => {
    console.log("location: ", location);
    await Axios.get(`https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByAddr/json?address=${location}`)
      .then((response) => {
        const { address, count, stores } = response.data;
        console.log(response);
        setMaskData({
          address,
          count,
          stores,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
//https://apis.zigbang.com/v2/items?deposit_gteq=0&domain=zigbang&geohash={}&rent_gteq=0&sales_type_in=전세%7C월세&service_type_eq=원룸
  /*
  url	/storesByGeo/json
  key	항목명(국문)	type	기본값	필수	항목설명
  Lat	위도	number		N	wgs84 좌표계 / 
  최소:33.0, 최대:43.0
  lng	경도	number		N	wgs84 표준 / 
  최소:124.0, 최대:132.0
  m	반경(미터)	integer		N	최대 5000(5km)까지 조회 가능
  */

  const getMaskDataGeo = async (lat, lng, m) => {
    console.log("lat: ", lat, " lng: ", lng, " m: ", m);
    await Axios.get(`https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByGeo/json?lat=${lat}&lng=${lng}&m=${m}`)
      .then((response) => {
        const { stores } = response.data;
        dispatch(actionCreators.setStoreList(stores));
        console.log(stores.length);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return { ...maskData, getMaskDataAddr, getMaskDataGeo, getZigbang };
};

export default useMaskData;
