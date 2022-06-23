import LinearProgress from "@material-ui/core/LinearProgress";
import React, { Component } from "react";
import "./style.css";

export default class SplashScreen extends Component {
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
