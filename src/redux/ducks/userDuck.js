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
      id: undefined,
      name: undefined,
      surname: undefined,
      role: undefined,
      email: undefined,
      phone: undefined,
      password: undefined,
      language: undefined,
      disableDate: undefined,
    },
  },
  reducers: {
    initUserAction: (state) => {
      state.user = {
        id: undefined,
        name: undefined,
        surname: undefined,
        role: undefined,
        email: undefined,
        phone: undefined,
        password: undefined,
        language: undefined,
        disableDate: undefined,
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
