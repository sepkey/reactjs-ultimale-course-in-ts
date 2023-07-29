import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
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
  getCity: (id: number) => new Promise(() => Promise),
  createCity: (newCity: Partial<CityInterface>) => new Promise(() => Promise),
  deleteCity: (id: number) => new Promise(() => Promise),
});

function CitiesProvider({ children }: PropsWithChildren) {
  const [cities, setCities] = useState<CityInterface[]>([]);
  const [isLoading, setIsloading] = useState(false);
  const [currentCity, setCurrentCity] = useState<CityInterface>();

  useEffect(function () {
    async function getCities() {
      try {
        setIsloading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = (await res.json()) as CityInterface[];
        setCities(data);
      } catch {
        alert("There was an error loading city");
      } finally {
        setIsloading(false);
      }
    }
    getCities();
  }, []);

  async function getCity(id: number) {
    try {
      setIsloading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = (await res.json()) as CityInterface;
      setCurrentCity(data);
    } catch {
      alert("There was an error getting city");
    } finally {
      setIsloading(false);
    }
  }

  async function createCity(newCity: Partial<CityInterface>) {
    try {
      setIsloading(true);
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = (await res.json()) as CityInterface;
      const isExisted = cities.find((item) => item.id === data.id);
      !isExisted && setCities((prev) => [...prev, data]);
      setCurrentCity(data);
    } catch {
      alert("There was an error creating city");
    } finally {
      setIsloading(false);
    }
  }

  async function deleteCity(id: number) {
    try {
      setIsloading(true);
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      setCities((cities) => cities.filter((city) => city.id !== id));
    } catch {
      alert("There was an error deleting data");
    } finally {
      setIsloading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
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
