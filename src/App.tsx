import React from "react";
import * as I from "./../modules/interface";
import api from "./API";
import * as Loaf from "./API/Loaf";
// import Main from "./Modules/Main/Main";
import Login from "./Modules/Login";
import Splash from "./Modules/Splash";

interface IState {
    user: I.IUser | null;
    loading: boolean;
}

export default class App extends React.Component<any, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            loading: true,
            user: null,
        };
    }

    public componentDidMount() {
        Loaf.on("user", (user: I.IUser) => {
            // console.log(user);
            this.setState({user, loading: false});
        });
        Loaf.on("userStatus", (status: number) => {
            if (status === 200) {
                this.getUser();
            }
        });
        this.getUser();
    }
    public render() {
        const { user, loading } = this.state;
        if (loading) {
            return <Splash />;
        }
        if (user) {
            return `HELLO ${user.username}`;
        }
        return <Login/>;
    }

    private getUser() {
        const loggedInUser = api.user.get();

        if (loggedInUser) {
            // console.log(loggedInUser);
            return this.setState({ user: loggedInUser, loading: false});
        }
        api.user.load();
    }
}
