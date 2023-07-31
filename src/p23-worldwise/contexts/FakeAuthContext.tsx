import {
  PropsWithChildren,
  createContext,
  useContext,
  useReducer,
} from "react";

type FakeUser = {
  name: string;
  email: string;
  password: string;
  avatar: string;
};

type State = {
  isAuthenticated: boolean;
  user: Partial<FakeUser>;
};
type Action =
  | { type: "login"; payload: Partial<FakeUser> }
  | { type: "logout" };

type ContextType = State & {
  login: (email: string, password: string) => void;
  logout: () => void;
};

const FAKE_USER: FakeUser = {
  name: "sepide",
  email: "seorehiw@gmail.com",
  password: "32jio3",
  avatar: "http://veoim-pic.com/32",
};

const AuthContext = createContext<ContextType | null>(null);

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "login":
      return { ...state, isAuthenticated: true, user: action.payload };
    case "logout":
      return initialState;
    default:
      throw new Error("Unknown action");
  }
}
const initialState: State = {
  isAuthenticated: false,
  user: { email: "", password: "" },
};

function AuthProvider({ children }: PropsWithChildren) {
  const [{ isAuthenticated, user }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(email: string, password: string) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "login", payload: FAKE_USER });
  }
  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error("Out of Auth context");
  return context;
}

export { AuthProvider, useAuth };
