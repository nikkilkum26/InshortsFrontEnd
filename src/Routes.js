import React, { createContext, useReducer } from "react";
import { reducer, initialState } from "./Reducer/reducer";
import Router from "./Router";
export var InshortsContext = createContext();
const Routes = () => {
  const [state, dispatch] = useReducer(reducer, {});
  return (
    <InshortsContext.Provider value={{ state, dispatch }}>
      <Router />
    </InshortsContext.Provider>
  );
};

export default Routes;
