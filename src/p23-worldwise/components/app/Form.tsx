import { FormEvent, useEffect, useReducer } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";

import styles from "./Form.module.css";
import useUrlPosition from "../../hooks/useUrlPosition";
import { useCities } from "../../contexts/CitiesContext";
import { CityDetailInterface, CityInterface } from "../../models";
import Spinner from "../common/Spinner";
import Message from "../common/Message";
import Button from "../common/Button";
import ButtonBack from "../common/ButtonBack";
import { formReducer, initialForm } from "../../reducers/form.reducer";

export function convertToEmoji(countryCode: string) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}
const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const [lat, lng] = useUrlPosition();
  const { createCity, isLoading: isCreating } = useCities();
  const navigate = useNavigate();
  const [
    {
      cityName,
      country,
      date,
      emoji,
      geocodingError,
      isLoadingGeocoding,
      notes,
    },
    dispatch,
  ] = useReducer(formReducer, initialForm);

  useEffect(
    function () {
      if (!lat && !lng) return;
      async function fetchCityDetails() {
        try {
          dispatch({ type: "loading" });
          const res = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`
          );
          const data = (await res.json()) as CityDetailInterface;
          if (data.countryCode === "") {
            throw new Error(
              "That doesn't seem to be a city. Click somewhere else!"
            );
          }
          dispatch({
            type: "data-received",
            payload: {
              cityName: data.city || data.locality || "",
              country: data.countryName,
              emoji: convertToEmoji(data.countryCode),
            },
          });
        } catch (err: any) {
          dispatch({ type: "failed", payload: err.message });
        }
      }
      fetchCityDetails();
    },
    [lat, lng]
  );

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!cityName || !date) return;
    const newCity: Partial<CityInterface> = {
      cityName,
      country,
      emoji,
      date: date.toISOString(),
      notes,
      position: { lat, lng },
    };

    await createCity(newCity);
    navigate("/app/cities");
  }

  if (isLoadingGeocoding) return <Spinner />;
  if (!lat && !lng)
    return <Message message="Start by clicking somewhere on the map!" />;
  if (geocodingError) return <Message message={geocodingError} />;
  return (
    <form
      className={`${styles.form} ${isCreating ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) =>
            dispatch({ type: "name-changed", payload: e.target.value })
          }
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>

        <DatePicker
          id="date"
          onChange={(date: Date) =>
            dispatch({ type: "date-changed", payload: date })
          }
          selected={date}
          dateFormat={"dd/MM/yyy"}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) =>
            dispatch({ type: "note-changed", payload: e.target.value })
          }
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <ButtonBack />
      </div>
    </form>
  );
}

export default Form;
