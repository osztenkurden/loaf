import { TextField } from "@material-ui/core";
import React, { Component } from "react";
import Announcement from "../Message/Announcement";
import Message from "../Message/Message";
import * as I from "./../../../modules/interface";
import api from "./../../API";
import AppBar from './AppBar';
import DragUploadModal from './DragUploadModal';

export interface FilePayloadData {
    data: string,
    size: number,
    name: string
}
interface IProps {
    chat: I.IChat | null;
    hash: string;
}


interface IState {
    form: {
        textMessage: string;
        files: FilePayloadData[]
    };
    highlight: boolean;
}

export default class Chat extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            form: {
                textMessage: "",
                files: []
            },
            highlight: false
        };
    }

    allow = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    }

    whileOver = (evt: React.DragEvent<HTMLDivElement>) => {
        let highlight = false;
        if(evt.type === "dragenter" || evt.type === "dragover"){
            highlight = true;
        }
        if(this.state.highlight !== highlight){
            this.setState({ highlight })
        }
    }

    drop = (evt: React.DragEvent<HTMLDivElement>) => {
        evt.preventDefault();
        if(evt.dataTransfer)
            this.handleFiles(evt.dataTransfer.files);

        this.setState({highlight: false});
    }

    public handleFiles = (files: FileList) => {
        if(!files || !files.length) return;
        const filesToSend: FilePayloadData[] = [];

        const readFile = (index: number, file?: File) => {
            /*if(file && !file.type?.startsWith("image/")){
                return;
            }*/
            if(!file){
                return this.setFiles(filesToSend);
                /*return this.setState(state => {
                    state.form.images = images;
                    return state;
                }, () => console.log(this.state));*/
            }
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                if(typeof reader.result !== "string"){
                    return readFile(index+1, files[index+1]);;
                }
                const img = reader.result;

                filesToSend.push({
                    data: img,
                    name: file.name,
                    size: file.size,
                });
                return readFile(index+1, files[index+1]);
            }
        }

        readFile(0, files[0]);
    }

    public render() {
        const { chat } = this.props;
        if (!chat) {
            return <div className={`chat_container empty`}></div>;
        }
        if(this.state.form.files.length) console.log(this.state.form.files)
        return (
            <div className="chat_container">
                <AppBar chat={chat} />
                <div className={`message_container ${this.state.highlight ? 'highlight-drag':''} ${this.state.form.files.length ? 'upload':''}`}
                    onDragOver={this.allow}
                    onDragEnter={this.whileOver}
                    onDragOverCapture={this.whileOver}
                    onDragEnd={this.whileOver}
                    onDragLeave={this.whileOver}
                    onDrop={this.drop}
                >
                    { chat.status === 1 || !chat.messages.length ?
                    <Announcement
                        request={chat.status === 1}
                        chat={chat}
                        /* manager={this.props.manager}*/
                    /> : ""}
                    {chat.status === 2 ? chat.messages.map((message) => <Message key={message.id} message={message} chatName={chat.name} />) : ""}
                </div>
                <DragUploadModal
                    images={this.state.form.files}
                    setFiles={this.setFiles}
                    sendFiles={this.sendFiles}
                />
                {chat.status === 2 ? <div className="text_sender">
                    <TextField
                        onChange={this.handleChange}
                        name="textMessage"
                        onKeyDown={this.handleKeyDown}
                        id="full-width"
                        placeholder="Type in a message..."
                        fullWidth
                        value={this.state.form.textMessage}
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        InputProps={{
                            classes:{
                                root: 'outline-container'
                            }
                        }}
                        inputProps={{
                            style:{color: 'white'}
                        }}
                    />
                </div> : null}
            </div>
        );
    }

    private setFiles = (files: FilePayloadData[]) => {
        this.setState(state => {
            state.form.files = files;
            return state;
        });
    }

    private handleKeyDown = (e: any) => {
        if (e.key === "Enter" && this.state.form.textMessage && this.props.chat) {
            const content = this.state.form.textMessage;
            api.message.send(this.props.chat.id, { type: "text", content });
            this.setState({ form: { textMessage: "", files: [] } });
        }
    }
    private sendFiles = () => {
        const files = this.state.form.files;
        if(!files.length || !this.props.chat){
            return console.log("NO files OR NO CHAT");
        }
        if(files.length === 1) {
            const file = this.state.form.files[0];
            const message: I.IMessageContent = {
                type: "file",
                content: file
            };
            api.message.send(this.props.chat.id, message);
            this.setState({ form: { textMessage: "", files: [] } });
        } else {
            const message: I.IMessageContentMixed = {
                type: "mixed",
                content: []
            }
            for(const file of files){
                const filePayload: I.IMessageContentFile = {
                    type: "file",
                    content: file
                }
                message.content.push(filePayload);
            }
            api.message.send(this.props.chat.id, message);
            this.setState({ form: { textMessage: "", files: [] } });
        }
    }
    private handleChange = (e: any) => {
        const { form } = this.state;
        const field: "textMessage" = e.target.name;
        form[field] = e.target.value;
        this.setState({ form });
    }
}
