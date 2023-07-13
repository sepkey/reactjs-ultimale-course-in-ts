import React from "react";
import { Day } from "./Day";
import { WeatherDaily } from "./types";

type Props = {
  weather: Partial<WeatherDaily>;
  location: string;
};

export class Weather extends React.Component<Props, any> {
  componentWillUnmount(): void {
    console.log("unmounted");
  }
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
