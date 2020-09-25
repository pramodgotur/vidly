import React, { Component } from 'react';
import Form from "./common/form"
import Joi from "joi-browser"
import * as GenreAPI from "../services/fakeGenreService"
import { saveMovie } from "../services/fakeMovieService"

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
    componentDidMount() {
        let { movie } = this.props
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
        let genres = GenreAPI.getGenres()
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