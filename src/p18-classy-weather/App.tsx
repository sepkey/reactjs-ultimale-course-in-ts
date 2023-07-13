import React from "react";
import { Weather } from "./Weather";
import { Input } from "./Input";
import { convertToFlag } from "./helpers";
import { WeatherDaily } from "./types";

type Props = {};

type State = {
  location: string;
  isLoading: boolean;
  displayLocation: string;
  weather: Partial<WeatherDaily>;
};

export default class App extends React.Component<Props, State> {
  state: State = {
    location: "",
    isLoading: false,
    displayLocation: "",
    weather: {},
  };

  fetchWeather = async () => {
    if (this.state.location.length < 2) {
      this.setState({ weather: {} });
      return;
    }

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

  componentDidMount(): void {
    this.setState({ location: localStorage.getItem("location") || "" });
  }
  componentDidUpdate(
    prevProps: Readonly<Props>,
    prevState: Readonly<State>
  ): void {
    if (this.state.location !== prevState.location) {
      this.fetchWeather();
      localStorage.setItem("location", this.state.location);
    }
  }
  render() {
    return (
      <div className="app">
        <h1>classy weather</h1>
        <Input
          location={this.state.location}
          onChangeLocation={this.handleChangeLocation}
        />
        {this.state.isLoading && <p className="loader">Loading...</p>}

        {this.state.weather.weathercode && this.state.location && (
          <Weather
            weather={this.state.weather}
            location={this.state.displayLocation}
          />
        )}
      </div>
    );
  }
}
