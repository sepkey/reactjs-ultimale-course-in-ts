import Sidebar from "../components/app/Sidebar";
import Map from "../components/app/Map";
import styles from "./Application.module.css";

export default function Application() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
    </div>
  );
}
