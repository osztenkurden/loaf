import Main from "Modules/Main";
import React from "react";
import * as I from "./../modules/interface";
import api from "./API";
import * as Loaf from "./API/Loaf";
import Login from "./Modules/Login";
import Register from "./Modules/Register";
import Splash from "./Modules/Splash";
/*declare let window: any;
if(typeof window.require !== "function"){
    window.require = () => ({remote: {}});
}*/
import fakeRequire from "./API/DevHandler";
declare let window: any;
if(process.env.REACT_APP_DEV === "true"){
    window.require = fakeRequire;
}
const { remote } = window.require('electron');

interface IState {
    user: I.IUser | null;
    loading: boolean;
    authentication: boolean;
    register: boolean;
}

export class App extends React.Component<any, IState> {
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
        if (loading) {
            return <Splash />;
        }
        if (user) {
            return <Main />;
        }
        if (register) {
            return <Register togglePage={this.togglePage} />;
        }
        return <Login togglePage={this.togglePage} authentication={authentication}/>;
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

export default class WindowApp extends React.Component {
    minimize = () => {
        remote.getCurrentWindow().minimize();
    }
    maximize = () => {
        if(remote.getCurrentWindow().isMaximized()){
            remote.getCurrentWindow().restore();
        } else {
            remote.getCurrentWindow().maximize();
        }
    }
    close = () => {
        remote.getCurrentWindow().close();
    }
    render(){
        return <>
            <div className="window-bar">
                <div className="window-drag-bar"></div>
                <div onClick={this.minimize} className="app-control">_</div>
                <div onClick={this.maximize} className="app-control">O</div>
                <div onClick={this.close} className="app-control close">X</div>
            </div>
            <App />
        </>
    }
}
