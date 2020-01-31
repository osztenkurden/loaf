import { TextField } from "@material-ui/core";
import API from "API";
import React, { Component } from "react";
import LoafButton from "Theme/Components/LoafButton";

interface IProps {
    togglePage: () => void;
}

interface IState {
    username: string;
    password: string;
    firstName: string;
}

export default class Register extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            firstName: "",
            password: "",
            username: "",
        };
    }

    public render() {
        return (
            <div className="loaf-app-splash">
                <div id="login-page">
                    <TextField
                        className="firstname-input"
                        placeholder="First Name"
                        color="primary"
                        value={this.state.firstName}
                        onChange={this.handleChange("firstName")}
                        required
                    />
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
                    <LoafButton main big onClick={this.register}>Register</LoafButton>
                    <LoafButton big onClick={this.props.togglePage}>Log In</LoafButton>
                </div>
            </div>
        );
    }

    private handleChange = (field: "password" | "username" | "firstName") => (e: any) => {
        const value = e.target.value;
        this.setState((state) => ({ ...state, [field]: value }));
    }

    private register = () => {
        API.user.register(this.state.username, this.state.password, this.state.firstName);
    }
}
