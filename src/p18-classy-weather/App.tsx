import React, { Dispatch, SetStateAction } from "react";

function getWeatherIcon(wmoCode: number) {
  const icons = new Map([
    [[0], "☀️"],
    [[1], "🌤"],
    [[2], "⛅️"],
    [[3], "☁️"],
    [[45, 48], "🌫"],
    [[51, 56, 61, 66, 80], "🌦"],
    [[53, 55, 63, 65, 57, 67, 81, 82], "🌧"],
    [[71, 73, 75, 77, 85, 86], "🌨"],
    [[95], "🌩"],
    [[96, 99], "⛈"],
  ]);
  const arr = Array.from(icons.keys()).find((key) => key.includes(wmoCode));

  if (!arr) return "NOT FOUND";
  return icons.get(arr);
}

function convertToFlag(countryCode: string) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

function formatDay(dateStr: string) {
  return new Intl.DateTimeFormat("en", {
    weekday: "short",
  }).format(new Date(dateStr));
}

type Props = {};

type WeatherDaily = {
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  time: string[];
  weathercode: number[];
};

type State = {
  location: string;
  isLoading: boolean;
  displayLocation: string;
  weather: Partial<WeatherDaily>;
};

export default class App extends React.Component<Props, State> {
  state: State = {
    location: "lisbon",
    isLoading: false,
    displayLocation: "",
    weather: {},
  };

  fetchWeather = async () => {
    try {
      this.setState({ isLoading: true });
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${this.state.location}`
      );
      const geoData = await geoRes.json();
      console.log(geoData);

      if (!geoData.results) throw new Error("Location not found");

      const { latitude, longitude, timezone, name, country_code } =
        geoData.results.at(0);
      this.setState({
        displayLocation: `${name} ${convertToFlag(country_code)}`,
      });

      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
      );
      const weatherData = await weatherRes.json();
      console.log("checkout--", weatherData.daily);
      this.setState({ weather: weatherData.daily });
    } catch (err) {
      console.error(err);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleChangeLocation = (e: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({ location: e.target.value });

  render() {
    return (
      <div className="app">
        <h1>classy weather</h1>
        <Input
          location={this.state.location}
          onChangeLocation={this.handleChangeLocation}
        />
        <button onClick={this.fetchWeather}>Get weather</button>
        {this.state.isLoading && <p className="loader">Loading...</p>}

        {this.state.weather.weathercode && (
          <Weather
            weather={this.state.weather}
            location={this.state.displayLocation}
          />
        )}
      </div>
    );
  }
}

type InputProps = {
  location: string;
  onChangeLocation: React.ChangeEventHandler<HTMLInputElement>;
};
class Input extends React.Component<InputProps, any> {
  render() {
    return (
      <div>
        <input
          type="text"
          value={this.props.location}
          onChange={this.props.onChangeLocation}
          placeholder="Search form location..."
        />
      </div>
    );
  }
}
type WeatherProps = {
  weather: Partial<WeatherDaily>;
  location: string;
};
class Weather extends React.Component<WeatherProps, any> {
  render() {
    const {
      weather: {
        temperature_2m_max: max,
        temperature_2m_min: min,
        time: dates,
        weathercode: codes,
      },
      location,
    } = this.props;
    return (
      <div>
        <h2> weather {location}</h2>
        <ul className="weather">
          {dates?.map((date, idx) => (
            <Day
              max={max?.at(idx)}
              min={min?.at(idx)}
              code={codes?.at(idx)}
              date={date}
              key={date}
              isToday={idx === 0}
            />
          ))}
        </ul>
      </div>
    );
  }
}

type DayProps = {
  max?: number;
  min?: number;
  date?: string;
  code?: number;
  isToday: boolean;
};
class Day extends React.Component<DayProps, any> {
  render() {
    const { max, min, date, code, isToday } = this.props;
    return (
      <li className="day">
        <span>{getWeatherIcon(code!)}</span>
        <p>{isToday ? "Today" : formatDay(date!)}</p>
        <p>
          {Math.floor(min!)}&deg; &mdash;
          <strong>{Math.ceil(max!)}&deg;</strong>
        </p>
      </li>
    );
  }
}
