import Leftmenu_1 from "./leftmenu/leftmenu_1";
import Region_search from "./leftmenu/region_search";
import React, { useState, useEffect, useRef } from "react";
import Findhouse_button from "./leftmenu/findhousebutton";
import store from "./store/store";
import Househelper from "./routes/househelper";
import News from "./news/news";
import Dropmenu from "./dropmenue/dropmenu";
import Dropmenu_list_hospital from "./dropmenue/dropmenu_list";
import Favorite_1 from "./favorite/favorite_1";
import { Provider } from "react-redux";
import Controlbox from "./favorite/controlbox";
import Result from "./result/result";

function App() {
  const [searchdiv_bool, searchdiv_change] = useState(false);
  const [favorite_div_bool, favorite_div_bool_change] = useState(false);
  const [listname, listname_change] = useState("no");
  const [listclick_count, listclick_count_change] = useState(0);
  const [control, controlchange] = useState(false);
  const [gipho_name, gipho_name_change] = useState([]);
  const [select_gipho_data, select_gipho_data_change] = useState([]);
  const [result_bool, result_bool_change] = useState(false);
  const [result_data, result_data_change] = useState([]);
  const [data_set,data_set_change] = useState([]);
  const [region,region_change] = useState('');
  const [stop,stop_change] = useState(false);
  const [stop2,stop_change2] = useState(false);

  const mounted = useRef(false);
  const result_cancle =()=>{
    favorite_div_bool_change(false);
    result_bool_change(false)
  }

 
  const cancle_select_gipho_data_change =()=>{
    select_gipho_data_change([]);
  }

  const result_change = (location) => {
    if(select_gipho_data.length===0){
      alert('최소 하나 이상의 지표를 설정해야됩니다.');
    }else{
      result_bool_change(true);
    favorite_div_bool_change(false);
    const box = {
      location: location,
      point: select_gipho_data,
    };

    fetch("http://localhost:5000/posts", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(box),
    }).then(res=>res.json()).then((json)=>{
      console.log(json);
      data_set_change(json);
    });
    }
  };

  function props_gipho_select( select) {
    //선택한지표들중에서 선택을한게 있을때 검사를 하고 있으면 change 없으면 추가
      console.log(select_gipho_data.length);
      console.log('으어어어어엉');
      let data = select_gipho_data;
      let is_include = false;
      data.map((value, index, array) => {
        console.log(value);
        if (value.name === select.name) {
          is_include = true;
        }
      });
      if (is_include === false) { //중복안될때
        if(select_gipho_data.length>4){
          controlchange(false);
          stop_change(true);
          alert('6개 이상의 지표를 설정할 수 없습니다.')
        }else{
          data.push(select);
          console.log(select_gipho_data);
          select_gipho_data_change(data);
          controlchange(false);
        }
      } else {
        select_gipho_data_change(data);
        controlchange(false);
      }
    
    //select_gipho_data_change(data);
    //console.log(select_gipho_data);
  }

  const cancle_giphodata = (name) => {
    console.log("시발?");
      let data = select_gipho_data;
    data.map((value, index) => {
      if (value.name === name) {
        console.log(index);
        data.splice(index, 1);
      }
    });
    console.log(select_gipho_data);
    select_gipho_data_change(data);
  };

  const props_searchbar_change = () => {
    searchdiv_change(true);
  };

  const props_searchbar_false_change = () => {
    searchdiv_change(false);
  };

  const findhouse_button = () => {
    favorite_div_bool_change(true);
  };
  const control_change = (name) => {
    gipho_name_change(name);
    console.log(name);
    controlchange(true);
  };
  const cancle_control_box = () => {
    controlchange(false);
  };
  const listname_change_props = (name) => {
    console.log(name);
    switch (name) {
      case "hospital":
        if (listname === "hospital") {
          listclick_count_change(0);
          listname_change("no");
        } else {
          listclick_count_change(1);
          listname_change(name);
        }
        break;

      case "education":
        if (listname === "education") {
          listclick_count_change(0);
          listname_change("no");
        } else {
          listclick_count_change(1);
          listname_change(name);
        }
        break;

      case "store":
        if (listname === "store") {
          listclick_count_change(0);
          listname_change("no");
        } else {
          listclick_count_change(1);
          listname_change(name);
        }
        break;

      case "caps":
        if (listname === "caps") {
          listclick_count_change(0);
          listname_change("no");
        } else {
          listclick_count_change(1);
          listname_change(name);
        }
        break;

      default:
        break;
    }
  };
  return (
    <Provider store={store}>
      <div>
        {searchdiv_bool ? <Region_search props_searchbar_false_change={props_searchbar_false_change} /> : <div></div>}
        <Leftmenu_1 props_searchbar_change={props_searchbar_change} result_data_change={result_data_change} />
        {favorite_div_bool ? <div></div> : <Findhouse_button findhouse_button={findhouse_button} />}
        {favorite_div_bool ? <Favorite_1 props_gipho_select={props_gipho_select} cancle_select_gipho_data_change={cancle_select_gipho_data_change} favorite_div_bool_change={favorite_div_bool_change} control_change={control_change} result_change={result_change} cancle_giphodata={cancle_giphodata} select_gipho_data={select_gipho_data} region_change={region_change}/> : <News />}
        <Dropmenu listname_change_props={listname_change_props} />
        {listclick_count === 1 ? <Dropmenu_list_hospital listname={listname} /> : <div></div>}
        <Househelper />
        {result_bool ? <Result cancle_select_gipho_data_change={cancle_select_gipho_data_change} result_cancle={result_cancle} region={region} select_gipho_data={select_gipho_data} data={data_set} /> : <div></div>}
      </div>
      {control ? <Controlbox  stop={stop} gipho_name={gipho_name} props_gipho_select={props_gipho_select} cancle_control_box={cancle_control_box} /> : <div></div>}
    </Provider>
  );
}

export default App;
