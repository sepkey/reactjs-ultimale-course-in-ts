import styles from "./CountryList.module.css";
import { CityInterface } from "../App";
import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";

type Props = {
  isLoading: boolean;
  cities: CityInterface[] | [];
};

export default function CountryList({ cities, isLoading }: Props) {
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );
  const countries = Array.from(new Set(cities.map((city) => city.country))).map(
    (item) => ({
      country: item,
      emoji: cities.find((city) => city.country === item)?.emoji,
    })
  );

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}
