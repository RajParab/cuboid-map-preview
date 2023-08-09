import "./App.css";
import "mapbox-gl/dist/mapbox-gl.css";
import AppLayout from "./layout";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Switch>
          <Route path="/">
            <AppLayout />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
