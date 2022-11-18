import { createSlice } from "@reduxjs/toolkit";

//Action Creator
export const initLogin = () => async (dispatch) => {
  try {
    //const resp = await api.logutuser
    return dispatch(initLoginAction());
  } catch (e) {
    return console.error(e.message);
  }
};

export const setLogin = (obj) => (dispatch) => {
  try {
    return dispatch(setLoginAction(obj));
  } catch (e) {
    return console.error(e.message);
  }
};

//Slice
const loginDuck = createSlice({
  name: "loginDuck",
  initialState: {
    loginToken: undefined,
  },
  reducers: {
    initLoginAction: (state) => {
      state.loginToken = undefined;
    },
    setLoginAction: (state, action) => {
      state.loginToken = action.payload.loginToken;
    },
  },
});

export default loginDuck.reducer;

//Action
const { initLoginAction, setLoginAction } = loginDuck.actions;
