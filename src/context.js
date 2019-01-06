import React, { Component } from "react";

const Context = React.createContext();

export default class Provider extends Component {
    state = {
        track_list: [
            { track: { track_name: 'abc' } },
            { track: { track_name: 'efg' } },
            { track: { track_name: 'hij' } },
        ],
        heading: 'Top 10 Tracks'
    }
    render() {
    return (
        <Context.Provider value={ this.state } > 
            { this.props.children }
        </Context.Provider>
    );
    }
}

export const Consumer = Context.Consumer;