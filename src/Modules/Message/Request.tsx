import { BlockRounded, CheckCircleRounded } from "@material-ui/icons";
import React, { Component } from "react";
import * as I from "./../../../modules/interface";

export default class Request extends Component<{ chat: I.IChat, accept: (chatId: number) => void }, any> {
    public render() {
        const { chat, accept } = this.props;
        return <div className={"announcement message"}>
            <div>
                <p>You've got a request from <strong>{chat.name}</strong>. Accept?</p>
                <p>
                    <CheckCircleRounded
                        style={{ color: "#49a249" }}
                        onClick={() => accept(chat.id)} />
                    <BlockRounded style={{ color: "red" }} />
                </p>
            </div>
        </div>;
    }
}
