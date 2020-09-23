import React, { Component } from "react";
import MovieForm from "./movieForm"
import { getMovie } from "../services/fakeMovieService"

class MovieDetail extends Component {
  state = {
    movie: {}
  }

  componentWillMount() {
    let movie = getMovie(this.props.match.params.id)
    if (movie === undefined || !movie) {
      this.props.history.push("/not-found")
    }
    this.setState({ movie })
  }

  render() {
    return (
      <div>
        <h1>MovieDetail - {this.props.match.params.id}</h1>
        <MovieForm {...this.props} movie={this.state.movie} />
      </div>
    );
  }
}

export default MovieDetail;
