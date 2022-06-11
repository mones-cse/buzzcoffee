import { createContext } from "react";

export const StoreContext = createContext();

const initialValue = {
  latLong: "",
  stores: [],
  count: 0,
};

const StoreProvider = (props) => {
  return (
    <StoreContext.Provider value={{ state: initialValue }}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
