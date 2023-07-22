import { useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

export default function Map() {
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return (
    <div className={styles.mapContainer}>
      {lat}, {lng}
      <button
        onClick={() => setSearchParams((s) => ({ ...s, lat: 45, lng: 89 }))}
      >
        change position
      </button>
    </div>
  );
}
