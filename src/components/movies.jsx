import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { paginate } from "../utils/paginate";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import _ from "lodash";
// import { array } from "prop-types";
import { Link } from "react-router-dom"

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: "",
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({
      movies: getMovies(),
      genres,
    });
  }

  handleDelete = (id) => {
    this.state.movies.pop({ _id: id });
    this.setState({ movies: this.state.movies });
  };
  handleLike = (movie) => {
    console.log(movie);
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movie.liked;
    this.setState({ movies });
  };
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const { pageSize, currentPage, movies: allMovies, selectedGenre, sortColumn } = this.state;
    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((movie) => movie.genre._id === selectedGenre._id)
        : allMovies;
    const totalCount = filtered.length;
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const data = paginate(sorted, currentPage, pageSize);
    return { totalCount, data };
  };

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, sortColumn } = this.state;
    const { totalCount: filteredCount, data: movies } = this.getPagedData();

    if (count === 0) {
      return (
        <div className="mt-5 mb-5">
          <p>There are no movies in the database.</p>
        </div>
      );
    }
    return (
      <div className="row">
        <div className="col-md-4 mt-5 mb-5">
          <ListGroup
            onItemSelect={this.handleGenreSelect}
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
          />
        </div>
        <div className="col-md-8">
          <div className="mt-5 mb-5">
            <p>Showing {filteredCount} movies in the database</p>
            <Link to="/movies/new" className="mb-5 btn btn-primary">
              New Movie
            </Link>
            <MoviesTable
              movies={movies}
              sortColumn={sortColumn}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
            />
            <Pagination
              pageSize={pageSize}
              itemsCount={filteredCount}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </div >
    );
  }
}

export default Movies;
