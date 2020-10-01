import React, { Component } from "react";
import MovieForm from "./movieForm"
import { getMovie } from "../services/movieService"

class MovieDetail extends Component {

  render() {
    return (
      <div>
        <h1>MovieDetail - {this.props.match.params.id}</h1>
        <MovieForm {...this.props} />
      </div>
    );
  }
}

export default MovieDetail;
