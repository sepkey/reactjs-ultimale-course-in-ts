import styles from "./CityList.module.css";
import CityItem from "./CityItem";
import Spinner from "../common/Spinner";
import { useCities } from "../../contexts/CitiesContext";
import Message from "../common/Message";

export default function CityList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}
