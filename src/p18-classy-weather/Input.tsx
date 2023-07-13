import React from "react";
export type InputProps = {
  location: string;
  onChangeLocation: React.ChangeEventHandler<HTMLInputElement>;
};

export class Input extends React.Component<InputProps, any> {
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
