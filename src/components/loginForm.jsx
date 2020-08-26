import React, { Component } from "react";
import Input from "./common/input";
import Joi from "joi-browser";
class LoginForm extends Component {
  state = {
    account: {
      username: "",
      password: "",
    },
    errors: {},
  };
  schema = {
    username: Joi.string().required(),
    password: Joi.string().required(),
  };

  validate = () => {
    const result = Joi.validate(this.state.account, this.schema, {
      abortEarly: false,
    });
    console.log(result);
    const errors = {};
    const { account } = this.state;
    if (account.username.trim() === "")
      errors.username = "Username is required.";
    if (account.password.trim() === "")
      errors.password = "Password is required.";
    return Object.keys(errors).length === 0 ? null : errors;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    console.log("submitted");
  };

  validateProperty = ({ name, value }) => {
    if (name === "username") {
      if (value.trim() === "") return "Username is required.";
    }
    if (name === "password") {
      if (value.trim() === "") return "Password is required.";
    }
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account, errors });
  };
  render() {
    const { account, errors } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            label="Username"
            value={account.username}
            onChange={this.handleChange}
            error={errors.username}
          />
          <Input
            name="password"
            label="Password"
            value={account.password}
            onChange={this.handleChange}
            error={errors.password}
          />
          <button className="btn btn-primary">Save</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
