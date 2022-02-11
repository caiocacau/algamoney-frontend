import React, { Component } from "react";
import { toast } from "react-toastify";
import eventBus from "../common/EventBus";

import UserService from "../services/user.service";
import { history } from '../helpers/history';

export default class Raiz extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        toast.error(error.message);

        if (error.response && error.response.status === 401) {
          eventBus.dispatch("logout");
          history.push("/login");
        }
      }
    );
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>{this.state.content}</h3>
        </header>
      </div>
    );
  }
}