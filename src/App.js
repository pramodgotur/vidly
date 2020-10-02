import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NavBar from "./components/navbar";
import NotFound from "./components/common/notFound";
import MovieDetail from "./components/movieDetail";
import MovieAdd from "./components/movieAdd";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Logout from "./components/logout";
import auth from "./services/authService";
import ProtectedRoute from "./components/common/protectedRoute"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./App.css";

class App extends Component {
  state = {}
  componentDidMount() {
    const user = auth.getCurrentUser()
    this.setState({ user })
  }
  render() {
    const { user } = this.state
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={this.state.user} />
        <main className="container">
          <Switch>
            <Route path="/logout" component={Logout} />
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <ProtectedRoute path="/movies/new" component={MovieAdd} />
            <ProtectedRoute path="/movies/:id" component={MovieDetail} />
            <Route path="/movies" render={props => <Movies {...props} user={user} />} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment >
    );
  }
}

export default App;
