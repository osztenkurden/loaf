import React from "react";
import Main from "./Modules/Main";
import * as I from "./../modules/interface";
import api from "./API";
import * as Loaf from "./API/Loaf";
import Login from "./Modules/Login";
import Register from "./Modules/Register";
import Splash from "./Modules/Splash";
import { UserContext } from "Context";

interface IState {
    user: I.IUser | null;
    loading: boolean;
    authentication: boolean;
    register: boolean;
}

export default class App extends React.Component<any, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            authentication: false,
            loading: true,
            register: false,
            user: null,
        };
    }

    public componentDidMount() {
        Loaf.on("user", (user: I.IUser) => {
            this.setState({user, loading: false});
        });
        Loaf.on("userStatus", (status: number) => {
            if (status === 200) {
                this.getUser();
            } else if (status === 403) {
                this.setState({authentication: true});
            }
        });

        this.getUser();
    }
    public render() {
        const { user, loading, authentication, register } = this.state;

        let window = <Splash />
        if (loading) {
            window = <Splash />;
        } else if (user) {
            window = <Main />;
        }else if (register) {
            window = <Register togglePage={this.togglePage} />;
        } else window = <Login togglePage={this.togglePage} authentication={authentication}/>;

        return <UserContext.Provider value={user}>
            {window}
        </UserContext.Provider>
    }

    private getUser() {
        const loggedInUser = api.user.get();
        if (loggedInUser) {
            return this.setState({ user: loggedInUser, loading: false});
        }
        api.user.load();
    }

    private togglePage = () => {
        this.setState((state) => ({...state, register: !state.register}));
    }
}
