import { TextField } from "@material-ui/core";
import moment from "moment";
import React, { Component } from "react";
import Announcement from "../Message/Announcement";
import Message from "../Message/Message";
import * as Loaf from "./../../API/Loaf";
import * as I from "./../../../modules/interface";
import api from "./../../API";
import AppBar from './AppBar';
import DragUploadModal from './DragUploadModal';
import { InView } from 'react-intersection-observer';
import { scrollToBottom, sortMessages } from "Modules/Utils";
import { Attachment } from "@material-ui/icons";
import { v4 as uuidv4 } from 'uuid';
export interface FilePayloadData {
    data: string,
    size: number,
    name: string
}
interface IProps {
    chat: I.IChatPaged | null;
    hash: string;
    addTemporaryMessage: (message: I.IAnyMessage) => void;
    temporaryMessages: I.IAnyMessage[];
}


interface IState {
    form: {
        textMessage: string;
        files: FilePayloadData[]
    };
    highlight: boolean;
}

const getKeyFromMessage = (msg: I.IMessage) => {
    return `${msg.uuid}-${msg.senderId}-${msg.date}-${msg.date}-${msg.id || 'xd'}`;
}

const isThisFirstDateOccurence = (pages: I.IPage[], message: I.IMessage) => {
    const dateToCheck = moment(message.date).format('dddd, MMMM Do YYYY')

    const allMessages = pages.map(page => page.messages).flat();

    const messageIndex = allMessages.indexOf(message);

    const listOfDates = allMessages.map(msg => moment(msg.date).format('dddd, MMMM Do YYYY'));

    return listOfDates.indexOf(dateToCheck) === messageIndex;
}

let isLoading = false;

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
        if (evt.type === "dragenter" || evt.type === "dragover") {
            highlight = true;
        }
        if (this.state.highlight !== highlight) {
            this.setState({ highlight })
        }
    }

    drop = (evt: React.DragEvent<HTMLDivElement>) => {
        evt.preventDefault();
        if (evt.dataTransfer)
            this.handleFiles(evt.dataTransfer.files);

        this.setState({ highlight: false });
    }

    componentDidMount = () => {
        Loaf.on("chatPage", () => {
            setTimeout(() => {
                scrollToBottom(62);
                isLoading = false;
            }, 0);
        });
    }

    public handleFiles = (files: FileList | null) => {
        if (!files || !files.length) return;
        const filesToSend: FilePayloadData[] = [];

        const readFile = (index: number, file?: File) => {
            /*if(file && !file.type?.startsWith("image/")){
                return;
            }*/
            if (!file) {
                return this.setFiles(filesToSend);
                /*return this.setState(state => {
                    state.form.images = images;
                    return state;
                }, () => console.log(this.state));*/
            }
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                if (typeof reader.result !== "string") {
                    return readFile(index + 1, files[index + 1]);;
                }
                const img = reader.result;

                filesToSend.push({
                    data: img,
                    name: file.name,
                    size: file.size,
                });
                return readFile(index + 1, files[index + 1]);
            }
        }

        readFile(0, files[0]);
    }

    getAllMessagesCount = () => {
        const { chat } = this.props;
        if (!chat) return 0;
        const allMessagesCount = chat.pages.map(page => page.messages.length).reduce((a, b) => a + b, 0);
        return allMessagesCount;
    }

    public loadMoreMessages = (page: number) => {
        const { chat } = this.props;
        if (!chat || chat.status !== 2) {
            return;
        }
        api.chats.loadPageOfMessages(chat.id, page);
    }

    public loadMoreByScroll = (page: number) => (_inView: boolean, entry: IntersectionObserverEntry) => {
        if (isLoading) return;
        if (!entry || entry.intersectionRatio < 0.98) return;
        isLoading = true;
        this.loadMoreMessages(page);
    }

    public render() {
        const { chat, temporaryMessages } = this.props;
        if (!chat) {
            return <div className={`chat_container empty`}></div>;
        }
        const minimumPage = Math.min(...chat.pages.map(page => page.page));

        const messages: I.IAnyMessage[] = sortMessages([...chat.pages.map(page => page.messages).flat(), ...temporaryMessages]);

        return (
            <div className="chat_container">
                <AppBar chat={chat} />
                <div id="message_container" className={`message_container ${this.state.highlight ? 'highlight-drag' : ''} ${this.state.form.files.length ? 'upload' : ''}`}
                    onDragOver={this.allow}
                    onDragEnter={this.whileOver}
                    onDragOverCapture={this.whileOver}
                    onDragEnd={this.whileOver}
                    onDragLeave={this.whileOver}
                    onDrop={this.drop}
                >
                    {chat.status === 1 || !this.getAllMessagesCount() ?
                        <Announcement
                            request={chat.status === 1}
                            chat={chat}
                        /> : null}
                    {
                        chat.status === 2 ? (
                            <>
                                {
                                    minimumPage > 0 ? (
                                        <InView threshold={0} trackVisibility={true} delay={100} as="div" className="load-messages-button" onClick={() => this.loadMoreMessages(minimumPage - 1)} onChange={this.loadMoreByScroll(minimumPage - 1)}>
                                            LOAD MORE MESSAGES
                                        </InView>
                                    ) : null
                                }
                                {
                                    messages.map(message => (
                                        <React.Fragment key={getKeyFromMessage(message)}>
                                            {
                                                isThisFirstDateOccurence(chat.pages, message) ? (
                                                    <div className="date-tag">{moment(message.date).format('dddd, MMMM Do YYYY')}</div>
                                                ) : null
                                            }
                                            <Message message={message} />
                                        </React.Fragment>
                                    ))
                                }
                            </>
                        ) : null
                    }
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
                            classes: {
                                root: 'outline-container'
                            }
                        }}
                        inputProps={{
                            style: { color: 'white' }
                        }}
                    />
                    <div className="add_attachment_button">
                        <label htmlFor="attachment"><Attachment fontSize={'large'} htmlColor="white" /></label>
                        <input id="attachment" type="file" style={{ display: 'none' }} onChange={e => this.handleFiles(e.target.files)} />
                    </div>
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
            // TODO: SEND MESSAGE
            const content = this.state.form.textMessage;
            this.sendMessages(this.props.chat.id, { type: "text", content });
        }
    }
    private addTemporaryMessage = (chatId: number, message: I.IMessageContent, localUUID: string) => {
        const newTemporaryMessage: I.IAnyMessage = {
            uuid: localUUID,
            chatId,
            id: (new Date()).getTime(),
            senderId: -1,
            content: message,
            my: true,
            date: (new Date()).toISOString(),
            temporary: true
        }

        this.props.addTemporaryMessage(newTemporaryMessage);
    }
    private sendMessages = async (chatId: number, message: I.IMessageContent) => {
        const uuid = uuidv4();
        this.setState({ form: { textMessage: "", files: [] } }, () => {
            this.addTemporaryMessage(chatId, message, uuid);
        });
        api.message.send(chatId, message, uuid);
    }
    private sendFiles = () => {
        const files = this.state.form.files;
        if (!files.length || !this.props.chat) {
            return console.log("NO files OR NO CHAT");
        }
        if (files.length === 1) {
            const file = this.state.form.files[0];
            const message: I.IMessageContent = {
                type: "file",
                content: file
            };
            this.sendMessages(this.props.chat.id, message);
        } else {
            const message: I.IMessageContentMixed = {
                type: "mixed",
                content: []
            }
            for (const file of files) {
                const filePayload: I.IMessageContentFile = {
                    type: "file",
                    content: file
                }
                message.content.push(filePayload);
            }
            this.sendMessages(this.props.chat.id, message);
        }
    }
    private handleChange = (e: any) => {
        const { form } = this.state;
        const field: "textMessage" = e.target.name;
        form[field] = e.target.value;
        this.setState({ form });
    }
}

