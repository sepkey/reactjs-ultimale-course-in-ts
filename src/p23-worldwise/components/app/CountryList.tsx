import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import Spinner from "../common/Spinner";
import { useCities } from "../../contexts/CitiesContext";
import Message from "../common/Message";
import { CityInterface, CountryInterface } from "../../models";

export default function CountryList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  const countries = cities.reduce(
    (acc: CountryInterface[], city: CityInterface) => {
      if (!acc.map((el) => el.country).includes(city.country))
        return [...acc, { country: city.country, emoji: city.emoji }];
      else return acc;
    },
    []
  );

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}

// const countries = Array.from(new Set(cities.map((city) => city.country))).map(
//   (item) => ({
//     country: item,
//     emoji: cities.find((city) => city.country === item)?.emoji,
//   })
// );
// const countries: { country: string; emoji: string }[] = [];

// const countries = cities.reduce(
//   (acc: CountryInterface[], city: CityInterface) => {
//     const isExisted = acc.find((country) => country.country === city.country);

//     if (!isExisted) {
//       acc.push({ country: city.country, emoji: city.emoji });
//     }

//     return acc;
//   },
//   []
// );
