import React, { Component } from "react";

class MovieDetail extends Component {
  render() {
    return (
      <div>
        <h1>MovieDetail - {this.props.match.params.id}</h1>
        <button
          className="btn btn-sm btn-primary"
          onClick={() => this.props.history.push("/movies")}
        >
          Save
        </button>
      </div>
    );
  }
}

export default MovieDetail;
