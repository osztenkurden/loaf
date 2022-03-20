import React, { useEffect, useState } from "react";
import App from './App';
import * as Loaf from "./API/Loaf";

declare global {
	interface Window {
		ipcApi: {
			send: (channel: string, ...arg: any) => void;
            sendSync: (channel: string, ...arg: any) => any,
			on: (channel: string, func: (...arg: any) => void) => void;
		};
	}
}

export default () => {
    const [ error, setError ] = useState('');
    const [ showError, setShowError ] = useState(false);

    const minimize = () => {
        window.ipcApi.send("min");
    }
    const maximize = () => {
        window.ipcApi.send("max");
    }
    const close = () => {
		window.ipcApi.send('close');
    }

    useEffect(() => {
        Loaf.on('error-message', (error: string) => {
            setError(error);
            setShowError(true);
            setTimeout(() => {
                setShowError(false);
            }, 5000);
        });
    }, [])

    return <>
        <div className="window-bar">
            <div className="window-drag-bar"></div>
            <div onClick={minimize} className="app-control">_</div>
            <div onClick={maximize} className="app-control">O</div>
            <div onClick={close} className="app-control close">X</div>
        </div>
        <div className={`error-message ${showError ? 'show': ''}`}>
            {error}
        </div>
        <App />
    </>

}
/*
export default class WindowApp extends React.Component<{}, { error: string, showError: boolean}> {
    constructor(props:{}){
        super(props);
        this.state = {
            error: '',
            showError: false
        }
    }
    minimize = () => {
        window.ipcApi.send("min");
    }
    maximize = () => {
        window.ipcApi.send("max");
    }
    close = () => {
		window.ipcApi.send('close');
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
*/