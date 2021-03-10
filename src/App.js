import Leftmenu_1 from "./leftmenu/leftmenu_1";
import Region_search from "./leftmenu/region_search";
import React, { useState } from "react";
import Findhouse_button from './leftmenu/findhousebutton'
import store from "./store/store";
import Househelper from "./routes/househelper";
import News from './news/news'
import Dropmenu from './dropmenue/dropmenu'
import Dropmenu_list_hospital from './dropmenue/dropmenu_list'
import Favorite_1 from './favorite/favorite_1'
import { Provider } from "react-redux";
import Controlbox from './favorite/controlbox'
function App() {
  const [searchdiv_bool, searchdiv_change] = useState(false);
  const [favorite_div_bool, favorite_div_bool_change] = useState(false);
  const [listname, listname_change] = useState('no');
  const [listclick_count ,listclick_count_change] = useState(0);
  const [control,controlchange] =useState(false);
  const [gipho_name,gipho_name_change] = useState('')
  const props_searchbar_change = () => {
    searchdiv_change(true);
  };
  const props_searchbar_false_change = () => {
    searchdiv_change(false);
  };

  const findhouse_button=()=>{
    favorite_div_bool_change(true)
  }
  const control_change=(name)=>{
    gipho_name_change(name);
    console.log(name);
    controlchange(true);
    
  }
  const cancle_control_box =()=>{
    controlchange(false)
  }
  const listname_change_props =(name)=>{
    console.log(name);
    switch (name) {
      case 'hospital':
        console.log("asdasdasd");
        if(listname === 'hospital'){
          listclick_count_change(0);
          listname_change('no');
        }else{
          listclick_count_change(1);
          listname_change(name);
        }
        break;

      case 'education':
        if(listname === 'education'){
          listclick_count_change(0);
          listname_change('no');
        }else{
          listclick_count_change(1);
          listname_change(name);
        }
        break;

      case 'store':
        if(listname === 'store'){
          listclick_count_change(0);
          listname_change('no');
        }else{
          listclick_count_change(1);
          listname_change(name);
        }
        break;

      case 'caps':
        if(listname === 'caps'){
          listclick_count_change(0);
          listname_change('no');
        }else{
          listclick_count_change(1);
          listname_change(name);
        }
        break; 

      default:
        break;
    }
  }
  return (
    <Provider store={store}>
      <div>
        {searchdiv_bool ? <Region_search props_searchbar_false_change={props_searchbar_false_change} /> : <div></div>}
        <Leftmenu_1 props_searchbar_change={props_searchbar_change} />
        {favorite_div_bool?<div></div>:<Findhouse_button findhouse_button={findhouse_button}/>}
        {favorite_div_bool?<Favorite_1 control_change={control_change}/>:<News/>}
        <Dropmenu listname_change_props={listname_change_props}/>
        {listclick_count === 1?<Dropmenu_list_hospital listname={listname}/> : <div></div>}
        <Househelper />
      </div>
      {control ? <Controlbox gipho_name={gipho_name} cancle_control_box={cancle_control_box}/>:<div></div>}
    </Provider>
  );
}

export default App;
