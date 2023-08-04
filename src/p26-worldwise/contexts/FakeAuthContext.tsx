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
  error: string;
};
type Action =
  | { type: "login"; payload: Partial<FakeUser> }
  | { type: "logout" }
  | { type: "reject"; payload: string };

type ContextType = State & {
  login: (email: string, password: string) => void;
  logout: () => void;
};

const FAKE_USER: FakeUser = {
  name: "sepide",
  email: "seorehiw@gmail.com",
  password: "20123",
  avatar: "https://pravatar.cc/100?u=zz",
};

const AuthContext = createContext<ContextType | null>(null);

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "login":
      return { ...state, isAuthenticated: true, user: action.payload };
    case "logout":
      return initialState;
    case "reject":
      return { ...state, error: action.payload };
    default:
      throw new Error("Unknown action");
  }
}
const initialState: State = {
  isAuthenticated: false,
  user: { email: "", password: "" },
  error: "",
};

function AuthProvider({ children }: PropsWithChildren) {
  const [{ isAuthenticated, user, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(email: string, password: string) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    } else {
      dispatch({ type: "reject", payload: "Wrong email or password!" });
    }
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, error }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext) as ContextType;
  if (context === undefined) throw new Error("Out of Auth context");
  return context;
}

export { AuthProvider, useAuth };
