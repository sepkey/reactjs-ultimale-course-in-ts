import React from "react";
import styles from "./CityList.module.css";
import { CityInterface } from "../App";
import CityItem from "./CityItem";
import Spinner from "./Spinner";
import Message from "./Message";
type Props = {
  isLoading: boolean;
  cities: CityInterface[] | [];
};

export default function CityList({ cities, isLoading }: Props) {
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.cityName} />
      ))}
    </ul>
  );
}
