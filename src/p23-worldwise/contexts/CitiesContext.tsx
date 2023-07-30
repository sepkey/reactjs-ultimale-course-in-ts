import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { CityInterface } from "../models";
const BASE_URL = "http://localhost:8000";

type ContextType = {
  isLoading: boolean;
  cities: CityInterface[];
  currentCity: CityInterface | undefined;
  getCity: (id: number) => Promise<void>;
  createCity: (newCity: Partial<CityInterface>) => Promise<void>;
  deleteCity: (id: number) => Promise<void>;
};
const CitiesContext = createContext<ContextType>({
  isLoading: false,
  cities: [],
  currentCity: undefined,
  getCity: () => new Promise(() => Promise),
  createCity: () => new Promise(() => Promise),
  deleteCity: () => new Promise(() => Promise),
});

type State = {
  cities: CityInterface[];
  isLoading: boolean;
  selectedCity: CityInterface | undefined;
  error: string;
};
type Action =
  | { type: "loading" }
  | { type: "cities-loaded"; payload: CityInterface[] }
  | { type: "city-loaded"; payload: CityInterface }
  | { type: "city-created"; payload: CityInterface }
  | { type: "city-deleted"; payload: number }
  | { type: "rejected"; payload: string };
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities-loaded":
      return { ...state, cities: action.payload, isLoading: false };
    case "city-loaded":
      return { ...state, selectedCity: action.payload, isLoading: false };
    case "city-created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        selectedCity: action.payload,
      };
    case "city-deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        selectedCity: undefined,
      };
    case "rejected":
      return { ...state, error: action.payload, isLoading: false };
    default:
      throw new Error("Unknown action");
  }
}

const initialState: State = {
  cities: [],
  isLoading: false,
  selectedCity: undefined,
  error: "",
};
function CitiesProvider({ children }: PropsWithChildren) {
  const [{ cities, isLoading, selectedCity }, dispatch] = useReducer(
    reducer,
    initialState
  );
  useEffect(function () {
    async function getCities() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = (await res.json()) as CityInterface[];
        dispatch({ type: "cities-loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading city",
        });
      }
    }
    getCities();
  }, []);

  async function getCity(id: number) {
    if (id === selectedCity?.id) return;
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = (await res.json()) as CityInterface;
      dispatch({ type: "city-loaded", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error getting city",
      });
    }
  }
  async function createCity(newCity: Partial<CityInterface>) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = (await res.json()) as CityInterface;
      dispatch({ type: "city-created", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error creating city",
      });
    }
  }

  async function deleteCity(id: number) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "city-deleted", payload: id });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error deleting data",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity: selectedCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  // const context = useContext(CitiesContext) as ContextType;
  const context = useContext(CitiesContext);

  if (context === undefined) throw new Error("Out of cities context");
  return context;
}
export { CitiesProvider, useCities };
