import React, { Component } from "react";
import { Consumer } from '../../context';


class Tracks extends Component {
  render() {
    return (
      <div>
        <h1>Tracks</h1>
        <Consumer>
          {value => { 
            console.log(value);
            return <p> {value.heading} </p>;
          }}
        </Consumer>
      </div>
    );
  }
}

export default Tracks;
