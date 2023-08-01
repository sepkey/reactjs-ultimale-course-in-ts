import Sidebar from "../components/app/Sidebar";
import Map from "../components/app/Map";
import styles from "./Application.module.css";
import User from "../components/app/User";

export default function Application() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      <User />
    </div>
  );
}
