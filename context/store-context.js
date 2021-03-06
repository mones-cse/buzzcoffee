import { createContext, useReducer } from "react";

export const StoreContext = createContext();

export const ACTION_TYPE = {
  SET_LAT_LANG: "SET_LAT_LANG",
  SET_STORE: "SET_STORE",
  INCREMENT_COUNT: "INCREMENT_COUNT",
};

const initialValue = {
  latLong: "",
  stores: [],
};

const storeReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_LAT_LANG:
      return { ...state, latLong: action.payload };
    case ACTION_TYPE.SET_STORE:
      return { ...state, stores: action.payload };
    default:
      return { ...state };
  }
};

const StoreProvider = (props) => {
  const [state, dispatch] = useReducer(storeReducer, initialValue);
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
