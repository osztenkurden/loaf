import { TextField } from "@material-ui/core";
import API from "API";
import React, { Component } from "react";
import LoafButton from "Theme/Components/LoafButton";

interface IProps {
    authentication?: boolean;
}

interface IState {
    username: string;
    password: string;
    authCode: number;
}

export default class Login extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            authCode: 0,
            password: "",
            username: "",
        };
    }

    public render() {
        if (this.props.authentication) {
            return (
                <div className="loaf-app-splash">
                    <div id="login-page">
                        <TextField
                            type="number"
                            className="username-input"
                            placeholder="Username"
                            color="primary"
                            value={this.state.authCode}
                            onChange={this.handleChange("authCode")}
                            required
                        />
                        <LoafButton main big onClick={this.validate}>Authenticate</LoafButton>
                    </div>
                </div>
            );
        }
        return (
            <div className="loaf-app-splash">
                <div id="login-page">
                    <TextField
                        className="username-input"
                        placeholder="Username"
                        color="primary"
                        value={this.state.username}
                        onChange={this.handleChange("username")}
                        required
                    />
                    <TextField
                        className="password-input"
                        placeholder="Password"
                        required
                        value={this.state.password}
                        onChange={this.handleChange("password")}
                        type="password"
                    />
                    <LoafButton main big onClick={this.logIn}>Login</LoafButton>
                </div>
            </div>
        );
    }

    private handleChange = (field: "password" | "username" | "authCode") => (e: any) => {
        const value = e.target.value;
        this.setState((state) => ({ ...state, [field]: value }));
    }

    private logIn = () => {
        API.user.logIn(this.state.username, this.state.password);
    }

    private validate = () => {
        API.user.authenticate(this.state.authCode);
    }
}
