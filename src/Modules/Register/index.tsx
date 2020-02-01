import { Backdrop, CircularProgress, TextField } from "@material-ui/core";
import API from "API";
import QRCode from "qrcode";
import React, { Component } from "react";
import LoafButton from "Theme/Components/LoafButton";
import * as Loaf from "./../../API/Loaf";

interface IProps {
    togglePage: () => void;
}

interface IState {
    username: string;
    password: string;
    firstName: string;
    loading: boolean;
    done: boolean;
    qrcode: string | null;
}

export default class Register extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            done: false,
            firstName: "",
            loading: false,
            password: "",
            qrcode: null,
            username: "",
        };
    }

    public componentDidMount() {
        Loaf.on("userCreated", async (qrcode: string | false) => {
            if (!qrcode) {
                this.setState({ done: true, loading: false });
                return;
            }
            const url = await QRCode.toDataURL(`otpauth://totp/Loaf%20Messenger?secret=${qrcode}`);

            this.setState({ done: true, loading: false, qrcode: url });

        });
    }

    public render() {
        return (
            <div className="loaf-app-splash">
                <div id="login-page">
                    {this.renderError()}
                    {this.renderForm()}
                    <LoafButton big onClick={this.props.togglePage}>Log In</LoafButton>
                </div>
                <Backdrop id="splash-backdrop" open={this.state.loading}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            </div>
        );
    }

    private renderError = () => {
        const { done, loading, qrcode } = this.state;
        if (done && !loading && !qrcode) {
            return <p>There was some error along the way - try again</p>;
        }
        return "";
    }

    private renderForm = () => {
        if (this.state.qrcode) {
            return <img src={this.state.qrcode} alt="TOTP" />;
        }
        return <React.Fragment>
            <TextField
                className="firstname-input"
                placeholder="First Name"
                color="primary"
                value={this.state.firstName}
                onChange={this.handleChange("firstName")}
                required
                disabled={this.state.loading}
            />
            <TextField
                className="username-input"
                placeholder="Username"
                color="primary"
                value={this.state.username}
                onChange={this.handleChange("username")}
                required
                disabled={this.state.loading}
            />
            <TextField
                className="password-input"
                placeholder="Password"
                required
                value={this.state.password}
                onChange={this.handleChange("password")}
                type="password"
                disabled={this.state.loading}
            />
            <LoafButton main big onClick={this.register}>Register</LoafButton>
        </React.Fragment>;
    }

    private handleChange = (field: "password" | "username" | "firstName") => (e: any) => {
        const value = e.target.value;
        this.setState((state) => ({ ...state, [field]: value }));
    }

    private register = () => {
        if (this.state.loading) {
            return;
        }
        this.setState({ loading: true}, () => {
            API.user.register(this.state.username, this.state.password, this.state.firstName);
        });
    }
}
