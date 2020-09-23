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
            genre: "",
            numberInStock: "",
            dailyRentalRate: "",
        },
        errors: {}
    }
    componentDidMount() {
        let { movie } = this.props
        if (movie != undefined) {
            let data = {
                _id: movie._id,
                title: movie.title,
                genre: movie.genre.name,
                numberInStock: movie.numberInStock,
                dailyRentalRate: movie.dailyRentalRate,
            }
            this.setState({ data: data })
        }
        console.log(this.state);
    }
    schema = {
        _id: Joi.string().allow(""),
        title: Joi.string().required().label("Title"),
        genre: Joi.string().required().label("Genre"),
        numberInStock: Joi.number().required().min(0).max(100).label("Number in Stock"),
        dailyRentalRate: Joi.number().required().min(0).max(10).label("Daily Rental Rate")
    }
    doSubmit = () => {
        let { data: movie } = this.state
        let genreId = GenreAPI.genres.find(g => g.name === movie.genre)
        movie.genreId = genreId._id
        saveMovie(movie)
        this.props.history.push("/movies")
    }
    render() {
        let options = [
            { value: "", label: "Select Genre" },
            { value: "Action", label: "Action" },
            { value: "Comedy", label: "Comedy" },
            { value: "Thriller", label: "Thriller" }
        ]
        return (
            <form onSubmit={this.handleSubmit}>
                {this.renderInput("title", "Title")}
                {this.renderSelectBox("genre", "Genre", options)}
                {this.renderInput("numberInStock", "Number in Stock", "number")}
                {this.renderInput("dailyRentalRate", "Rate", "number")}
                {this.renderButton("Save")}
            </form>
        );
    }
}

export default MovieForm;