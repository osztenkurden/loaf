(this.webpackJsonploaf=this.webpackJsonploaf||[]).push([[0],{43:function(e,t,a){e.exports=a.p+"static/media/load_icon.1b2bc4e4.svg"},59:function(e,t,a){e.exports=a(71)},69:function(e,t,a){},70:function(e,t,a){},71:function(e,t,a){"use strict";a.r(t);var n=a(112),s=a(0),r=a.n(s),c=a(8),o=a.n(c),i=a(11),l=a(10),u=a(12),m=a(13),h=a(14),d=a(15),p=a(29),f=a(16),g=a.n(f),v=a(107),b=a(103),E=a(109),x=a(104),y=a(37),O=a(110),j=a(111),C=a(32),w=a.n(C),N=a(43),M=a.n(N),k=a(17),I=a(105),S=a(106),D=a(113),T=a(98),q=a(102),B=function(e){function t(){return Object(i.a)(this,t),Object(u.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.props,t=e.chat,a=e.accept;return r.a.createElement("div",{className:"announcement message"},r.a.createElement("div",null,r.a.createElement("p",null,"You've got a request from ",r.a.createElement("strong",null,t.name),". Accept?"),r.a.createElement("p",null,r.a.createElement(T.a,{style:{color:"#49a249"},onClick:function(){return a(t.id)}}),r.a.createElement(q.a,{style:{color:"red"}}))))}}]),t}(s.Component),K=function(e){function t(){return Object(i.a)(this,t),Object(u.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.props,t=e.chat;return e.request?r.a.createElement(B,{chat:t,accept:function(){}}):r.a.createElement("div",{className:"announcement message"},r.a.createElement("p",null,5===t.status?"".concat(t.name," still hasn't accepted your request"):"No messages"))}}]),t}(s.Component),L=function(e){function t(){return Object(i.a)(this,t),Object(u.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"message "+(this.props.message.my?"my":"")},r.a.createElement("p",null,this.props.message.content))}}]),t}(s.Component),R=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(u.a)(this,Object(m.a)(t).call(this,e))).handleKeyDown=function(e){"Enter"===e.key&&a.state.form.textMessage&&a.props.chat&&(a.props.manager.addMessageToStack(a.state.form.textMessage,a.props.chat.id),a.props.manager.sendMessage(a.state.form.textMessage,a.props.chat.id),a.setState({form:{textMessage:""}}))},a.handleChange=function(e){var t=a.state.form;t[e.target.name]=e.target.value,a.setState({form:t})},a.handleChange=a.handleChange.bind(Object(k.a)(a)),a.handleKeyDown=a.handleKeyDown.bind(Object(k.a)(a)),a.state={form:{textMessage:""}},a}return Object(h.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e;if(!this.props.chat)return r.a.createElement("div",{className:"chat_container"},"Choose chat");var t=this.props,a=t.chat,n=t.messages;return r.a.createElement("div",{className:"chat_container"},r.a.createElement(b.a,{position:"relative"},r.a.createElement(x.a,{className:"bar"},r.a.createElement(I.a,null,r.a.createElement(S.a,{inset:!0,primary:r.a.createElement("div",{className:"chat-name"},r.a.createElement("div",{className:"chat-name-text"},a.name)),secondary:r.a.createElement("div",{className:"chat-last-message"},r.a.createElement("div",{className:"text"},(null===(e=a.last)||void 0===e?void 0:e.my)?r.a.createElement("span",{className:"you"},"Ty:"):""," Last seen 10 minutes ago"))})))),r.a.createElement("div",{className:"message_container"},1!==a.status&&n.length?"":r.a.createElement(K,{request:1===a.status,chat:a}),2===a.status?n.map((function(e){return r.a.createElement(L,{message:e})})):""),2===this.props.chat.status?r.a.createElement("div",{className:"text_sender"},r.a.createElement(D.a,{onChange:this.handleChange,name:"textMessage",onKeyDown:this.handleKeyDown,id:"full-width",placeholder:"Placeholder",fullWidth:!0,value:this.state.form.textMessage,variant:"outlined",InputLabelProps:{shrink:!0}})):"")}}]),t}(s.Component),_=a(108);function A(e){switch(e.status){case 5:return"Waiting for response...";case 2:return e.last&&e.last.content||"No messages";case 1:return r.a.createElement("span",{className:"strong"},"requested your attention");default:return""}}var F=function(e){function t(){return Object(i.a)(this,t),Object(u.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e,t=this,a=this.props.chat;return r.a.createElement("div",null,r.a.createElement(I.a,{button:!0,className:"chat-button "+(a.unread?"new-message":""),onClick:function(){return t.props.loadChat(a.id)}},r.a.createElement(S.a,{inset:!0,primary:r.a.createElement("div",{className:"chat-name"},r.a.createElement("div",{className:"chat-name-text"},a.name),r.a.createElement("div",{className:"last-message-date"},a.last?w()(a.last.date).fromNow():"")),secondary:r.a.createElement("div",{className:"chat-last-message"},r.a.createElement("div",{className:"text"},(null===(e=a.last)||void 0===e?void 0:e.my)?r.a.createElement("span",{className:"you"},"You:"):""," ",A(a)),r.a.createElement("div",{className:"last-text-status "}))})),r.a.createElement("li",null,r.a.createElement(_.a,{variant:"inset",className:"separator"})))}}]),t}(s.Component),P={},W={},H=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(u.a)(this,Object(m.a)(t).call(this,e))).loadChats=function(){var e,t;return g.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,g.a.awrap(W.chats.get());case 2:e=n.sent,t=e.body,a.setState({chats:t.chats},(function(){a.state.currentChat&&a.state.currentChat.id&&a.loadChat(a.state.currentChat.id)}));case 5:case"end":return n.stop()}}))},a.loadChat=function(e){a.setState({currentChat:a.state.chats.filter((function(t){return t.id===e}))[0]||null,currentMessages:a.state.messages[e]||[]})},a.sendMessage=function(e,t){var n;return g.a.async((function(s){for(;;)switch(s.prev=s.next){case 0:return n=window.electron.ipcRenderer,s.next=3,g.a.awrap(W.chats.sendMessageV2(e,t,a.props.cxt));case 3:a.props.cxt&&a.props.cxt.user&&n.send("saveUserData",a.props.cxt.user.id,a.props.cxt.store.saveToHex());case 4:case"end":return s.stop()}}))},a.requestFriend=function(e){return g.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,g.a.awrap(W.chats.createPrivateChat(e));case 2:a.loadChats();case 3:case"end":return t.stop()}}))},a.acceptInvitation=function(e){return g.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,g.a.awrap(W.chats.accept(e,a.props.cxt));case 2:a.loadChats();case 3:case"end":return t.stop()}}))},a.addMessageToStack=function(e,t){var n,s,r;return g.a.async((function(c){for(;;)switch(c.prev=c.next){case 0:if(a.props.cxt.user&&a.props.cxt.user.id){c.next=2;break}return c.abrupt("return");case 2:n=a.state.messages[t]||[],s={senderId:a.props.cxt.user.id,content:e,my:!0,date:w()().toISOString()},r=a.state.chats.map((function(e){return e.id!==t?e:Object(p.a)({},e,{last:s})})),n.push(s),a.setState({messages:Object(p.a)({},a.state.messages,Object(d.a)({},t,n)),chats:r},(function(){a.state.currentChat&&a.state.currentChat.id===t&&a.loadChat(t)}));case 7:case"end":return c.stop()}}))},a.toggleDrawer=function(){a.setState(Object(p.a)({},a.state,{drawer:!a.state.drawer}))},a.state={chats:[],currentChat:null,currentMessages:[],drawer:!1,hash:"",messages:{}},a}return Object(h.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this;return g.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return");case 5:this.loadChats(),setInterval((function(){e.setState({hash:Math.random().toString(36).substr(2,5)})}),3e4);case 7:case"end":return t.stop()}}),null,this)}},{key:"loadMessages",value:function(e){var t,a,n,s,r,c,o,i,l=this;return g.a.async((function(u){for(;;)switch(u.prev=u.next){case 0:return t=window.electron.ipcRenderer,u.next=3,g.a.awrap(this.loadChats());case 3:if(P.body){u.next=5;break}return u.abrupt("return");case 5:a=P.body.messages,n=this.state.messages[e]||[],s=0,r=Object.values(a);case 8:if(!(s<r.length)){u.next=17;break}return c=r[s],u.next=12,g.a.awrap(this.props.cxt.store.decipherMessage(c.senderId,c.senderMachine,c.content,3===c.type));case 12:o=u.sent,n.push({content:o,date:c.createdAt,id:c.id,my:this.props.cxt.user&&c.senderId===this.props.cxt.user.id,senderId:c.senderId});case 14:s++,u.next=8;break;case 17:i=this.state.chats.map((function(t){return t.id!==e?t:n.length?Object(p.a)({},t,{last:n[n.length-1]}):t})),this.props.cxt&&this.props.cxt.user&&t.send("saveUserData",this.props.cxt.user.id,this.props.cxt.store.saveToHex()),this.setState({messages:Object(p.a)({},this.state.messages,Object(d.a)({},e,n)),chats:i},(function(){l.state.currentChat&&l.state.currentChat.id===e&&l.loadChat(e)}));case 20:case"end":return u.stop()}}),null,this)}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"loaf-app"},r.a.createElement(b.a,{position:"fixed"},r.a.createElement(x.a,{className:"bar"},r.a.createElement(E.a,{className:"menuButton",color:"inherit","aria-label":"Open drawer"},r.a.createElement(O.a,{onClick:this.toggleDrawer})),r.a.createElement(y.a,{variant:"h6",color:"inherit",noWrap:!0,className:"logo-wrapper"},r.a.createElement("img",{src:M.a})),r.a.createElement("div",{className:"searchIcon"},r.a.createElement(j.a,null)))),r.a.createElement("div",{className:"playground"},r.a.createElement("div",{className:"chat-list"},r.a.createElement(v.a,null,this.state.chats.map((function(t){return r.a.createElement(F,{chat:t,loadChat:e.loadChat})})),r.a.createElement("div",{onClick:function(){return e.requestFriend(6)}},"Add Friend"),r.a.createElement("div",{onClick:function(){return e.loadMessages(1)}},"Get messages"))),r.a.createElement(R,{chat:this.state.currentChat,manager:{accept:this.acceptInvitation,addMessageToStack:this.addMessageToStack,sendMessage:this.sendMessage},messages:this.state.currentMessages})))}}]),t}(s.Component),J=function(e){function t(){return Object(i.a)(this,t),Object(u.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement(H,{cxt:void 0})}}]),t}(r.a.Component),U=a(48),Y=Object(U.a)({overrides:{MuiAppBar:{positionFixed:{borderBottom:"2px solid transparent",borderImage:"linear-gradient(to right,  #ffd66b, #ff8b84) 3",boxShadow:"none",left:"0",right:"auto"},positionRelative:{borderBottom:"2px solid transparent",borderImage:"linear-gradient(to right,  #ffd66b, #ff8b84) 3",boxShadow:"none",left:"0",right:"auto",width:"100%"},root:{width:"34%"}},MuiDivider:{inset:{marginRight:"72px"}},MuiDrawer:{paper:{backgroundColor:"#2e2a27 !important"}},MuiListItem:{button:{transition:"none !important"}},MuiListItemIcon:{root:{marginLeft:"8px",marginRight:"4px",transform:"scale(1.2)"}},MuiTypography:{}}}),G=(a(69),a(70),r.a.createElement(n.a,{theme:Y},r.a.createElement(J,null)));o.a.render(G,document.getElementById("root"))}},[[59,1,2]]]);
//# sourceMappingURL=main.c9cd734d.chunk.js.map