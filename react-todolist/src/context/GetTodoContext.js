import React, { createContext, useReducer, useContext } from "react";
import * as api from "../api/CallByApi";
import createAsyncDispatcher, {
  initialAsyncState,
  createAsyncHandler,
} from "../api/AsyncActionUtils";

const initialState = {
  users: initialAsyncState,
};

//GET_TODOS
//GET_TODOS_SUCCESS
//GET_TODOS_ERROR
const usersHandler = createAsyncHandler("GET_TODOS", "users");

function usersReducer(state, action) {
  switch (action.type) {
    case "GET_TODOS":
    case "GET_TODOS_SUCCESS":
    case "GET_TODOS_ERROR":
      return usersHandler(state, action);
    default:
      throw new Error("Unhandled action type", action.type);
  }
}

const TodosStateContext = createContext(null);

export function TodosProvider({ children }) {
  const [state, dispatch] = useReducer(usersReducer, initialState);
  return (
    <TodosStateContext.Provider value={state}>
      <TodosDispatchContext.Provider value={dispatch}>
        {children}
      </TodosDispatchContext.Provider>
    </TodosStateContext.Provider>
  );
}

export function useTodosState() {
  const state = useContext(TodosStateContext);
  if (!state) {
    throw new Error("Cannot find UserProvider");
  }
  return state;
}

export function useTodosDispatch() {
  const dispatch = useContext(TodosDispatchContext);
  if (!dispatch) {
    throw new Error("Cannot find UserProvider");
  }
  return dispatch;
}

export const getTodos = createAsyncDispatcher("GET_TODOS", api.getTodo);
