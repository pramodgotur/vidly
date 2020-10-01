import React, { Component } from 'react';
import Form from "./common/form"
import Joi from "joi-browser"
import { getGenres } from "../services/genreService";
import { saveMovie } from "../services/fakeMovieService"
import { getMovie } from "../services/movieService"

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
    async componentDidMount() {
        let { data: movie } = await getMovie(this.props.match.params.id)
        if (movie === undefined || !movie) {
            this.props.history.push("/not-found")
        }
        if (movie != undefined) {
            let data = {
                _id: movie._id,
                title: movie.title,
                genreId: movie.genre._id,
                numberInStock: movie.numberInStock,
                dailyRentalRate: movie.dailyRentalRate,
            }
            this.setState({ data: data })
        }
        let { data: genres } = await getGenres()
        this.setState({ genres })
    }
    schema = {
        _id: Joi.string().allow(""),
        title: Joi.string().required().label("Title"),
        genreId: Joi.string().required().label("Genre"),
        numberInStock: Joi.number().required().min(0).max(100).label("Number in Stock"),
        dailyRentalRate: Joi.number().required().min(0).max(10).label("Daily Rental Rate")
    }
    doSubmit = () => {
        saveMovie(this.state.data)
        this.props.history.push("/movies")
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