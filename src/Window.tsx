import React from "react";
import fakeRequire from "./API/DevHandler";
import App from './App';
import * as Loaf from "./API/Loaf";
declare let window: any;
if(process.env.REACT_APP_DEV === "true"){
    window.require = fakeRequire;
}
const { remote } = window.require('electron');

export default class WindowApp extends React.Component<{}, { error: string, showError: boolean}> {
    constructor(props:{}){
        super(props);
        this.state = {
            error: '',
            showError: false
        }
    }
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
    componentDidMount() {
        Loaf.on('error-message', (error: string) => {
            this.setState({ error, showError: true });
            setTimeout(() => {
                this.setState({ showError: false });
            }, 5000);
        });
    }
    render(){
        return <>
            <div className="window-bar">
                <div className="window-drag-bar"></div>
                <div onClick={this.minimize} className="app-control">_</div>
                <div onClick={this.maximize} className="app-control">O</div>
                <div onClick={this.close} className="app-control close">X</div>
            </div>
            <div className={`error-message ${this.state.showError ? 'show': ''}`}>
                {this.state.error}
            </div>
            <App />
        </>
    }
}
