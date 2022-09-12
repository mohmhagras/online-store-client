import React from "react";
import { withRouter } from "react-router-dom";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    buttonText: "LOGIN",
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("email", this.state.email);
    localStorage.setItem("password", this.state.password);
    this.props.history.go(0);
  };
  render() {
    const { email, password } = this.state;
    return (
      <section id="login-box">
        <h2>
          <strong>ACCESS ADMIN PANEL</strong>
        </h2>
        <form id="form" onSubmit={this.handleFormSubmit}>
          <div id="form-item">
            <label for="email">
              Email
              <sup style={{ color: "red" }}>*</sup>
            </label>
            <input
              type="email"
              name="email"
              value={email}
              required
              placeholder="john@mail.net"
              onChange={(event) => this.setState({ email: event.target.value })}
            />
          </div>
          <div id="form-item">
            <label for="password">
              Password
              <sup style={{ color: "red" }}>*</sup>
            </label>
            <input
              type="password"
              name="password"
              value={password}
              required
              placeholder="•••••••••••"
              onChange={(event) =>
                this.setState({ password: event.target.value })
              }
            />
          </div>
          <button
            style={{ marginTop: "20px", marginBottom: "50px" }}
            className={`green-large-button`}
            type="submit"
          >
            {this.state.buttonText}
          </button>
        </form>
      </section>
    );
  }
}

export default withRouter(Login);
