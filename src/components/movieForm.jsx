import React, { Component } from 'react';
import Form from "./common/form"
import Joi from "joi-browser"
import { getGenres } from "../services/genreService";
// import { saveMovie } from "../services/fakeMovieService"
import { getMovie, saveMovie } from "../services/movieService"

class MovieForm extends Form {
    state = {
        data: {
            _id: "",
            title: "",
            genreId: "",
            numberInStock: "",
            dailyRentalRate: "",
        },
        genres: [],
        errors: {}
    }

    async populateGenres() {
        let { data: genres } = await getGenres()
        this.setState({ genres })
    }

    async populateMovie() {
        try {
            const movieId = this.props.match.params.id
            if (movieId === undefined || !movieId) return;

            let { data: movie } = await getMovie(this.props.match.params.id)
            this.setState({ data: this.mapToViewModel(movie) })
        } catch (ex) {
            if (ex.response && ex.response.status === 404)
                return this.props.history.replace("/not-found")
        }
    }

    async componentDidMount() {
        await this.populateGenres()
        await this.populateMovie()
    }

    mapToViewModel = (movie) => {
        return {
            _id: movie._id,
            title: movie.title,
            genreId: movie.genre._id,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate,
        }
    }

    schema = {
        _id: Joi.string().allow(""),
        title: Joi.string().required().label("Title"),
        genreId: Joi.string().required().label("Genre"),
        numberInStock: Joi.number().required().min(0).max(100).label("Number in Stock"),
        dailyRentalRate: Joi.number().required().min(0).max(10).label("Daily Rental Rate")
    }
    doSubmit = async () => {
        await saveMovie(this.state.data)
        this.props.history.push("/movies");
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                {this.renderInput("title", "Title")}
                {this.renderSelectBox("genreId", "Genre", this.state.genres)}
                {this.renderInput("numberInStock", "Number in Stock", "number")}
                {this.renderInput("dailyRentalRate", "Rate", "number")}
                {this.renderButton("Save")}
            </form>
        );
    }
}

export default MovieForm;