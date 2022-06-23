import TextField from "@material-ui/core/TextField";
import API from "API";
import React, { Component } from "react";
import LoafButton from "Theme/Components/LoafButton";

interface IProps {
    authentication?: boolean;
    togglePage: () => void;
}

interface IState {
    username: string;
    password: string;
    authCode: string;
}

export default class Login extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            authCode: '',
            password: "",
            username: "",
        };
    }

    keyPress = (event: any) => {
        if(event.key === "Enter"){
            this.logIn();
        }
    }

    public render() {
        if (this.props.authentication) {
            return (
                <div className="loaf-app-splash">
                    <div id="login-page">
                        <TextField
                            type="text"
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
                        onKeyPress={this.keyPress}
                        onChange={this.handleChange("username")}
                        required
                    />
                    <TextField
                        className="password-input"
                        placeholder="Password"
                        required
                        onKeyPress={this.keyPress}
                        value={this.state.password}
                        onChange={this.handleChange("password")}
                        type="password"
                    />
                    <LoafButton main big onClick={this.logIn}>Login</LoafButton>
                    <LoafButton big onClick={this.props.togglePage}>Sign Up</LoafButton>
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
