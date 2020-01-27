import { LinearProgress } from "@material-ui/core";
import React, { Component } from "react";
import api from "./../../API";

export default class Login extends Component {
    public componentDidMount() {
        api.user.load();
    }
    public render() {
        return (
            <div className="loaf-app-splash">
                <div className="progress-container">
                    <LinearProgress />
                </div>
            </div>
        );
    }
}
