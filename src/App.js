import Leftmenu_1 from "./leftmenu/leftmenu_1";
import Region_search from "./leftmenu/region_search";
import React, { useState } from "react";

import store from "./store/store";
import Househelper from "./routes/househelper";
import { Provider } from "react-redux";
function App() {
  const [searchdiv_bool, searchdiv_change] = useState(false);
  const props_searchbar_change = () => {
    searchdiv_change(true);
  };
  const props_searchbar_false_change = () => {
    searchdiv_change(false);
  };
  return (
    <Provider store={store}>
      <div>
        {searchdiv_bool ? <Region_search props_searchbar_false_change={props_searchbar_false_change} /> : <div></div>}
        <Leftmenu_1 props_searchbar_change={props_searchbar_change} />
        <Househelper />
      </div>
    </Provider>
  );
}

export default App;
