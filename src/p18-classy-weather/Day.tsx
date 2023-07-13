import React from "react";
import { getWeatherIcon, formatDay } from "./helpers";

export type Props = {
  max?: number;
  min?: number;
  date?: string;
  code?: number;
  isToday: boolean;
};

export class Day extends React.Component<Props, any> {
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
