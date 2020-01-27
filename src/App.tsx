import React from "react";
import * as I from "./../modules/interface";
import api from "./API";
import * as Loaf from "./API/Loaf";
// import Main from "./Modules/Main/Main";
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
            this.setState({user, loading: false});
        });
        const loggedInUser = api.user.get();

        if (loggedInUser) {
            return this.setState({ user: loggedInUser, loading: false});
        }
        api.user.load();
    }
    public render() {
        const { user, loading } = this.state;
        if (loading) {
            return <Splash />;
        }
        if (user) {
            return `HELLO ${user.username}`;
        }
        return ":(";
    }
}
