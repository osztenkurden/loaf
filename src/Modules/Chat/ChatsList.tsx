import List from "@material-ui/core/List";
import React, { Component, useEffect, useRef, useState } from "react";
import * as I from "./../../../modules/interface";
import ChatsListEntry from "./ChatsListEntry";
// import moment from "moment";
import storage from './../../API/ChatImages';
import Chat from "./Chat";


interface IProps {
  chats: I.IChatPaged[];
  currentChat: I.IChatPaged | null;
  loadChat: (chat: I.IChatPaged) => void;
  hash: string;
  addTemporaryMessage: (message: I.IAnyMessage) => void;
  temporaryMessages: I.IAnyMessage[];
}


const ChatsList = ({ chats, currentChat, loadChat, temporaryMessages, hash, addTemporaryMessage }: IProps) => {
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(268);

  const startResizing = React.useCallback((mouseDownEvent) => {
    setIsResizing(true);
  }, []);

  const stopResizing = React.useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = React.useCallback(
    (mouseMoveEvent) => {
      if (isResizing) {
        const value = mouseMoveEvent.clientX -
        (sidebarRef.current?.getBoundingClientRect?.().left || 0);
        
        setSidebarWidth(Math.max(Math.min(value, 300), 150));
      }
    },
    [isResizing]
  );

  //useEffect(() => {
    /*window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };*/
  //}, [resize, stopResizing]);
  return (
    <>
      <div className="chat-list" ref={sidebarRef} style={{ width: '34%' }} onMouseDown={(e) => e.preventDefault()}>
        <List>
          {chats.map((chat) => <ChatsListEntry
            key={chat.id}
            chat={chat}
            chatImage={storage.get(chat.id)}
            loadChat={loadChat}
            isCurrent={currentChat?.id === chat.id}
          />)}
        </List>
        {/*<div className="chat-list-resizer" onMouseDown={startResizing} />*/}
      </div>
      <Chat chat={currentChat} temporaryMessages={temporaryMessages} hash={hash} addTemporaryMessage={addTemporaryMessage} maxWidth={`calc(100vw - ${34}%)`} />
    </>

  )
}

export default ChatsList;