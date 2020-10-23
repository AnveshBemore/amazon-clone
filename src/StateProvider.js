import React,{createContact,createContext,useContext,useReducer} from "react";

//Prepare the datLayer
export const StateContext=createContext();


//Wrap our app and provide the Data layer
export const StateProvider=({reducer, initialState, children})=>(
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);

//Pull informatoion from the data layer
export const useStateValue=()=> useContext(StateContext);