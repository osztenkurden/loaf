import React, { Component } from "react";
import * as I from "./../../../modules/interface";

export default class Message extends Component<{message: I.IMessage}, any> {
    public render() {
        return <div className={"message " + (this.props.message.my ? "my" : "")}>
            <p>{this.props.message.content}</p>
        </div>;
    }
}
