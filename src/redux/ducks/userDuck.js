import { createSlice } from "@reduxjs/toolkit";

//Action Creator
export const initUser = () => async (dispatch) => {
  try {
    //const resp = await api.logutuser
    return dispatch(initUserAction());
  } catch (e) {
    return console.error(e.message);
  }
};

export const setUser = (obj) => (dispatch) => {
  try {
    return dispatch(setUserAction(obj));
  } catch (e) {
    return console.error(e.message);
  }
};

//Slice
const userDuck = createSlice({
  name: "userDuck",
  initialState: {
    user: {
      email: undefined,
      id: undefined,
      permission: undefined,
      refreshToken: undefined,
      token: undefined,
      logedIn: undefined,
    },
  },
  reducers: {
    initUserAction: (state) => {
      state.user = {
        email: undefined,
        id: undefined,
        permission: undefined,
        refreshToken: undefined,
        token: undefined,
        logedIn: undefined,
      };
    },
    setUserAction: (state, action) => {
      state.user = action.payload.user;
    },
  },
});

export default userDuck.reducer;

//Action
const { initUserAction, setUserAction } = userDuck.actions;
