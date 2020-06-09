import { TextField } from "@material-ui/core";
import React, { Component } from "react";
import { CloudUpload } from "@material-ui/icons";
import Announcement from "../Message/Announcement";
import Message from "../Message/Message";
import * as I from "./../../../modules/interface";
import api from "./../../API";
import AppBar from './AppBar';

interface IProps {
    chat: I.IChat | null;
    hash: string;
}

interface IState {
    form: {
        textMessage: string;
        images: string[]
    };
    highlight: boolean;
}

export default class Chat extends Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            form: {
                textMessage: "",
                images: []
            },
            highlight: false
        };
    }

    allow = (e: any) => {  
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
        if(evt.dataTransfer)
            this.handleImages(evt.dataTransfer.files);
        
        this.setState({highlight: false});
    }

    public handleImages = (files: FileList) => {
        if(!files || !files.length) return;
        const images: string[] = [];

        const readFile = (index: number, file?: File) => {
            if(file && !file.type?.startsWith("image/")){
                return;
            }
            if(!file){
                return this.setState(state => {
                    state.form.images = images;
                    return state;
                }, () => console.log(this.state));
            }
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                if(typeof reader.result !== "string"){
                    return readFile(index+1, files[index+1]);;
                }
                const img = reader.result.replace(/^data:([a-z]+)\/([a-z0-9]+);base64,/, '');
                images.push(img);
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
        return (
            <div className="chat_container">
                <AppBar chat={chat} />
                <div className={`message_container ${this.state.highlight ? 'highlight-drag':''} ${this.state.form.images.length ? 'upload':''}`}
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
                <div className="drag-show">
                    <div className="drag-window">
                        {this.state.form.images.length ? <div>
                            {this.state.form.images.map(src => <img src={`data:image/jpeg;base64,${src}`} className="drag-file-img-preview" alt={'Preview'} />)}
                            <div onClick={this.sendImage}>SEEEND</div>
                        </div> : <CloudUpload />}
                    </div>
                </div>
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
                        inputProps={{
                            style:{color: 'white'}
                        }}
                    />
                </div> : ""}
            </div>
        );
    }
    private handleKeyDown = (e: any) => {
        if (e.key === "Enter" && this.state.form.textMessage && this.props.chat) {
            // TODO: SEND MESSAGE
            const content = this.state.form.textMessage;
            api.message.send(this.props.chat.id, { type: "text", content });
            this.setState({ form: { textMessage: "", images: [] } });
        }
    }
    private sendImage = () => {
        const images = this.state.form.images;
        if(!images.length || !this.props.chat){
            return console.log("NO IMAGES OR NO CHAT");
        }
        if(images.length === 1) {
            const image = this.state.form.images[0];
            const message: I.IMessageContent = {
                type: "image",
                content: image
            };
            api.message.send(this.props.chat.id, message);
            this.setState({ form: { textMessage: "", images: [] } });
        } else {
            const message: I.IMessageContentMixed = {
                type: "mixed",
                content: []
            }
            for(const img of images){
                const imgPayload: I.IMessageContentImage = {
                    type: "image",
                    content: img
                }
                message.content.push(imgPayload);
            }
            api.message.send(this.props.chat.id, message);
            this.setState({ form: { textMessage: "", images: [] } });
        }
    }
    private handleChange = (e: any) => {
        const { form } = this.state;
        const field: "textMessage" = e.target.name;
        form[field] = e.target.value;
        this.setState({ form });
    }
}
