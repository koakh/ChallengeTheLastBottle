import { createContext, useContext, useReducer } from 'react';

export const initialState = {
  gameStatus: {
    running: false
  }
};

export const StateContext = createContext(null);

export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);
