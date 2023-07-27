import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { CityInterface } from "../App";
const BASE_URL = "http://localhost:8000";

type ContextType = {
  isLoading: boolean;
  cities: CityInterface[];
  currentCity: CityInterface | undefined;
  getCity: (id: number) => Promise<void>;
  createCity: (newCity: Partial<CityInterface>) => Promise<void>;
};
const CitiesContext = createContext<ContextType | null>(null);

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
        alert("There was an error loading data");
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
      alert("There was an error loading data");
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
      console.log(isExisted);
      !isExisted && setCities((prev) => [...prev, data]);
    } catch {
      alert("There was an error loading data");
    } finally {
      setIsloading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{ cities, isLoading, currentCity, getCity, createCity }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext) as ContextType;
  if (context === undefined) throw new Error("Out of cities context");
  return context;
}
export { CitiesProvider, useCities };
