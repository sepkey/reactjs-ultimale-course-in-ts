import { Link } from "react-router-dom";
import { CityInterface } from "../App";
import styles from "./CityItem.module.css";
const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

type Props = {
  city: CityInterface;
};
export default function CityItem({ city }: Props) {
  const { cityName, emoji, date, id, position } = city;
  return (
    <li>
      <Link
        to={`${id}/?lat=${position.lat}&lng=${position.lng}`}
        className={styles.cityItem}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}
