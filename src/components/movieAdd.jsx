import React, { Component } from 'react';
import MovieForm from "./movieForm"

class MovieAdd extends Component {
    state = {}
    render() {
        return (
            <React.Fragment>
                <h2>Add new Movie</h2>
                <MovieForm {...this.props} />
            </React.Fragment>
        );
    }
}

export default MovieAdd;