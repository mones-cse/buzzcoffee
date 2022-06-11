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
  count: 0,
};

const storeReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_LAT_LANG:
      console.log("update lat long");
      return state;
    case ACTION_TYPE.SET_STORE:
      console.log("update store");
      return state;
    case ACTION_TYPE.INCREMENT_COUNT:
      console.log("increment called");
      const updatedCount = state.count + action.payload;
      return { ...state, count: updatedCount };
    default:
      console.log("something went wrong");
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
