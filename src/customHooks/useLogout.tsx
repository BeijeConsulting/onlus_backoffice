import { useEffect, useState } from "react";

//Redux
import { initUser } from "../redux/ducks/userDuck";
import { initLogin } from "../redux/ducks/loginDuck";
import { useDispatch } from "react-redux";

interface State {
  ready: boolean;
}

const initialState: State = {
  ready: false,
};

//CustomHook per eseguire il logout
const useLogout = (resetInterval: any = null): any => {
  const [state, setState] = useState(initialState);
  const dispatch: any = useDispatch();

  const logout = (): void => {
    localStorage.clear();
    sessionStorage.clear();
    dispatch(initLogin());
    dispatch(initUser());
    setState({
      ready: true,
    });
  };

  useEffect(() => {
    let timeout: any;
    if (state.ready && resetInterval) {
      timeout = setTimeout(() => setState({ ready: false }), resetInterval);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [state.ready, resetInterval]);

  return [logout, state];
};

export default useLogout;
