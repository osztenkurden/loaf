import BlockRounded from "@material-ui/icons/BlockRounded";
import CheckCircleRounded from "@material-ui/icons/CheckCircleRounded";
import React, { Component } from "react";
import * as I from "./../../../modules/interface";

interface IProps {
    chat: I.IChatPaged;
    accept: (chatId: number) => void;
}

export default class Request extends Component<IProps> {
    public render() {
        const { chat, accept } = this.props;
        return <div className={"announcement message"}>
            <div>
                <p>You've got a request from <strong>{chat.name}</strong>. Accept?</p>
                <p>
                    <CheckCircleRounded
                        style={{ color: "#2fc52f", cursor: 'pointer' }}
                        onClick={() => accept(chat.id)} />
                    <BlockRounded style={{ color: "red", cursor: 'pointer' }} />
                </p>
            </div>
        </div>;
    }
}
