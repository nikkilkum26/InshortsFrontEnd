import React, { useEffect, useContext } from "react";
import Home from "./components/Home";
import { InshortsContext } from "./Routes";
import "./app.css";
const App = () => {
  const { dispatch } = useContext(InshortsContext);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch({
        type: "ISLOGGEDIN",
        payload: true,
      });
    }
  }, []);
  // console.log(state);
  return (
    <div>
      <Home />
    </div>
  );
};

export default App;
