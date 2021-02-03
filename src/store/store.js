import { createStore } from "redux";

/**
 * MaskMap Action Type
 */

//리덕스에서 관리할 상태값들
const setMap = (map) => {
  return {
    type: SET_MAP,
    map: map
  }
};

// 액션타입 정의
// 액션은 주로 대문자로
const SET_MAP = "setMap";
const SET_STORE_LIST = "setStoreList";
const ADD_MARKER = "addMarker";


// 액션 생성 함수 정의 주로 소문자로 작성
// return 에 타입 필수적

const setStoreList = (storeList) => {
  return {
    type: SET_STORE_LIST,
    storeList: storeList
  };
};

//타입 외에 추가필드 마음대로 추가할 수 있다.
const addMarker = (marker, overlay) => {
  return {
    type: ADD_MARKER,
    marker: marker,
    overlay: overlay
  }
};


// 리듀서 생성함수
// 위 액션 생성함수들을 통해 만들어진 객체들을 참조하여
// 새로운 상태를 만드는 함수를 만들어봅시다.
// 주의: 리듀서에서는 불변성을 꼭 지켜줘야 합니다!

const reducer = (state = {
  maskMap: {
    map: null,
    storeList: [],
    oldMarker: [],
    oldOverlay: []
  }
}, action) => {
  console.log(action);
  switch (action.type) {

    case SET_MAP:
      return {
        ...state,
        maskMap: {
          ...state.maskMap,
          map: action.map
        }
      };

    case SET_STORE_LIST:
      return {
        ...state,
        maskMap: {
          ...state.maskMap,
          storeList: action.storeList
        }
      };

    case ADD_MARKER:
      console.log("adding... :",action);
      return {
        ...state,
        maskMap: {
          ...state.maskMap,
          oldMarker: action.marker,
          oldOverlay: action.overlay
        }
      };

    default:
      return state;
  }
};

// 스토어 생성
const store = createStore(reducer);

/*
// 스토어안에 들어있는 상태가 바뀔 때 마다 호출되는 listener 함수
const listener = () => {
  const state = store.getState();
  console.log(state);
};

const unsubscribe = store.subscribe(listener);
// 구독을 해제하고 싶을 때는 unsubscribe() 를 호출하면 됩니다.
*/

export const actionCreators = {
  setStoreList,
  setMap,
  addMarker
};

export default store;