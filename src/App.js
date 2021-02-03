import Househelper from "./routes/househelper";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <div>
        <Househelper />
      </div>
    </Provider>
  );
}

export default App;
