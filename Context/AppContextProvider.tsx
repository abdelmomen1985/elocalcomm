import {
  createContext,
  ReactNode,
  useReducer,
  useEffect,
  useState,
} from "react";
import { AppReducer } from "./AppReducer";
import { ACTION_TYPES, StateType } from "./contextUtils";
import { useRouter } from "next/router";
import useTranslation from "./../hooks/useTranslation";

const initialState = {
  user: undefined,
} as StateType;

export const AppContext = createContext<StateType>(initialState);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const router = useRouter();
  const { t, locale } = useTranslation();
  useEffect(() => {
    const getUserSession = async () => {
      const response = await fetch("/api/getUserSession", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (response.status === 200) setUser(await response.json());
    };
    getUserSession();
  }, []);

  const setUser = (user: any) => {
    dispatch({
      type: ACTION_TYPES.SET_USER,
      payload: user,
    });
  };

  const [loginModal, setLoginModal] = useState(false);

  const contextValues: StateType = {
    ...state,
    setUser,
    loginModal,
    setLoginModal,
  };
  return (
    <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>
  );
};
