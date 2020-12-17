import React from "react";
import fakeRequire from "./API/DevHandler";
import App from './App';
declare let window: any;
if(process.env.REACT_APP_DEV === "true"){
    window.require = fakeRequire;
}
const { remote } = window.require('electron');

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
