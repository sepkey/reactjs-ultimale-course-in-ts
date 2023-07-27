import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";

export default function Map() {
  const [searchParams] = useSearchParams();
  const mapLat = searchParams.get("lat");
  const mapLng = searchParams.get("lng");
  const [mapPosition, setMapPosition] = useState<[number, number]>([40, 0]);
  const { cities } = useCities();
  const {
    getPosition,
    isLoading: isLoadingGeolocation,
    position: geolocationposition,
  } = useGeolocation();

  useEffect(
    function () {
      if (mapLat && mapLng) {
        setMapPosition([+mapLat, +mapLng]);
      }
    },
    [mapLat, mapLng]
  );

  useEffect(
    function () {
      if (geolocationposition) {
        setMapPosition([+geolocationposition.lat, +geolocationposition.lng]);
      }
    },
    [geolocationposition]
  );
  return (
    <div className={styles.mapContainer}>
      {!geolocationposition ? (
        <Button type="position" onClick={getPosition}>
          {isLoadingGeolocation ? "Loading..." : "Use your position"}
        </Button>
      ) : (
        ""
      )}
      <MapContainer
        center={[+mapLat!, +mapLng!]}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>
                {city.emoji}
                {city.cityName}
              </span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }: { position: [number, number] }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}lng=${e.latlng.lng}`),
  });
  return null;
}
