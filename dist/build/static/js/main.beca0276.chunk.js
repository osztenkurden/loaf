(this.webpackJsonploaf=this.webpackJsonploaf||[]).push([[0],{50:function(e,t,a){e.exports=a.p+"static/media/load_icon.1b2bc4e4.svg"},61:function(e,t,a){e.exports=a(75)},71:function(e,t,a){},72:function(e,t,a){},73:function(e,t,a){},74:function(e,t,a){},75:function(e,t,a){"use strict";a.r(t);var n=a(117),s=a(0),r=a.n(s),c=a(9),i=a.n(c),o=a(10),l=a(7),u=a(13),h=a(14),d=a(15),m=a(16),p=a(26),f=a(17),g=a.n(f),v=a(110),b=a(106),E=a(112),y=a(107),O=a(38),j=a(113),x=a(114),C=a(33),w=a.n(C),N=a(18),k=a(108),M=a(109),S=a(118),I=a(101),D=a(105),q=function(e){function t(){return Object(o.a)(this,t),Object(u.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.props,t=e.chat,a=e.accept;return r.a.createElement("div",{className:"announcement message"},r.a.createElement("div",null,r.a.createElement("p",null,"You've got a request from ",r.a.createElement("strong",null,t.name),". Accept?"),r.a.createElement("p",null,r.a.createElement(I.a,{style:{color:"#49a249"},onClick:function(){return a(t.id)}}),r.a.createElement(D.a,{style:{color:"red"}}))))}}]),t}(s.Component),U=function(e){function t(){return Object(o.a)(this,t),Object(u.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.props,t=e.chat;return e.request?r.a.createElement(q,{chat:t,accept:function(){}}):r.a.createElement("div",{className:"announcement message"},r.a.createElement("p",null,5===t.status?"".concat(t.name," still hasn't accepted your request"):"No messages"))}}]),t}(s.Component),T=function(e){function t(){return Object(o.a)(this,t),Object(u.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"message "+(this.props.message.my?"my":"")},r.a.createElement("p",null,this.props.message.content))}}]),t}(s.Component),A=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(u.a)(this,Object(h.a)(t).call(this,e))).handleKeyDown=function(e){"Enter"===e.key&&a.state.form.textMessage&&a.props.chat&&(a.props.manager.addMessageToStack(a.state.form.textMessage,a.props.chat.id),a.props.manager.sendMessage(a.state.form.textMessage,a.props.chat.id),a.setState({form:{textMessage:""}}))},a.handleChange=function(e){var t=a.state.form;t[e.target.name]=e.target.value,a.setState({form:t})},a.handleChange=a.handleChange.bind(Object(N.a)(a)),a.handleKeyDown=a.handleKeyDown.bind(Object(N.a)(a)),a.state={form:{textMessage:""}},a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e;if(!this.props.chat)return r.a.createElement("div",{className:"chat_container"},"Choose chat");var t=this.props,a=t.chat,n=t.messages;return r.a.createElement("div",{className:"chat_container"},r.a.createElement(b.a,{position:"relative"},r.a.createElement(y.a,{className:"bar"},r.a.createElement(k.a,null,r.a.createElement(M.a,{inset:!0,primary:r.a.createElement("div",{className:"chat-name"},r.a.createElement("div",{className:"chat-name-text"},a.name)),secondary:r.a.createElement("div",{className:"chat-last-message"},r.a.createElement("div",{className:"text"},(null===(e=a.last)||void 0===e?void 0:e.my)?r.a.createElement("span",{className:"you"},"Ty:"):""," Last seen 10 minutes ago"))})))),r.a.createElement("div",{className:"message_container"},1!==a.status&&n.length?"":r.a.createElement(U,{request:1===a.status,chat:a}),2===a.status?n.map((function(e){return r.a.createElement(T,{message:e})})):""),2===this.props.chat.status?r.a.createElement("div",{className:"text_sender"},r.a.createElement(S.a,{onChange:this.handleChange,name:"textMessage",onKeyDown:this.handleKeyDown,id:"full-width",placeholder:"Placeholder",fullWidth:!0,value:this.state.form.textMessage,variant:"outlined",InputLabelProps:{shrink:!0}})):"")}}]),t}(s.Component),L=a(111);function R(e){switch(e.status){case 5:return"Waiting for response...";case 2:return e.last&&e.last.content||"No messages";case 1:return r.a.createElement("span",{className:"strong"},"requested your attention");default:return""}}var B=function(e){function t(){return Object(o.a)(this,t),Object(u.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e,t=this,a=this.props.chat;return r.a.createElement("div",null,r.a.createElement(k.a,{button:!0,className:"chat-button "+(a.unread?"new-message":""),onClick:function(){return t.props.loadChat(a.id)}},r.a.createElement(M.a,{inset:!0,primary:r.a.createElement("div",{className:"chat-name"},r.a.createElement("div",{className:"chat-name-text"},a.name),r.a.createElement("div",{className:"last-message-date"},a.last?w()(a.last.date).fromNow():"")),secondary:r.a.createElement("div",{className:"chat-last-message"},r.a.createElement("div",{className:"text"},(null===(e=a.last)||void 0===e?void 0:e.my)?r.a.createElement("span",{className:"you"},"You:"):""," ",R(a)),r.a.createElement("div",{className:"last-text-status "}))})),r.a.createElement("li",null,r.a.createElement(L.a,{variant:"inset",className:"separator"})))}}]),t}(s.Component),F=a(50),K=a.n(F),_={},P={},W=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(u.a)(this,Object(h.a)(t).call(this,e))).loadChats=function(){var e,t;return g.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,g.a.awrap(P.chats.get());case 2:e=n.sent,t=e.body,a.setState({chats:t.chats},(function(){a.state.currentChat&&a.state.currentChat.id&&a.loadChat(a.state.currentChat.id)}));case 5:case"end":return n.stop()}}))},a.loadChat=function(e){a.setState({currentChat:a.state.chats.filter((function(t){return t.id===e}))[0]||null,currentMessages:a.state.messages[e]||[]})},a.sendMessage=function(e,t){var n;return g.a.async((function(s){for(;;)switch(s.prev=s.next){case 0:return n=window.electron.ipcRenderer,s.next=3,g.a.awrap(P.chats.sendMessageV2(e,t,a.props.cxt));case 3:a.props.cxt&&a.props.cxt.user&&n.send("saveUserData",a.props.cxt.user.id,a.props.cxt.store.saveToHex());case 4:case"end":return s.stop()}}))},a.requestFriend=function(e){return g.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,g.a.awrap(P.chats.createPrivateChat(e));case 2:a.loadChats();case 3:case"end":return t.stop()}}))},a.acceptInvitation=function(e){return g.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,g.a.awrap(P.chats.accept(e,a.props.cxt));case 2:a.loadChats();case 3:case"end":return t.stop()}}))},a.addMessageToStack=function(e,t){var n,s,r;return g.a.async((function(c){for(;;)switch(c.prev=c.next){case 0:if(a.props.cxt.user&&a.props.cxt.user.id){c.next=2;break}return c.abrupt("return");case 2:n=a.state.messages[t]||[],s={senderId:a.props.cxt.user.id,content:e,my:!0,date:w()().toISOString()},r=a.state.chats.map((function(e){return e.id!==t?e:Object(p.a)({},e,{last:s})})),n.push(s),a.setState({messages:Object(p.a)({},a.state.messages,Object(m.a)({},t,n)),chats:r},(function(){a.state.currentChat&&a.state.currentChat.id===t&&a.loadChat(t)}));case 7:case"end":return c.stop()}}))},a.toggleDrawer=function(){a.setState(Object(p.a)({},a.state,{drawer:!a.state.drawer}))},a.state={chats:[],currentChat:null,currentMessages:[],drawer:!1,hash:"",messages:{}},a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this;return g.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return");case 5:this.loadChats(),setInterval((function(){e.setState({hash:Math.random().toString(36).substr(2,5)})}),3e4);case 7:case"end":return t.stop()}}),null,this)}},{key:"loadMessages",value:function(e){var t,a,n,s,r,c,i,o,l=this;return g.a.async((function(u){for(;;)switch(u.prev=u.next){case 0:return t=window.electron.ipcRenderer,u.next=3,g.a.awrap(this.loadChats());case 3:if(_.body){u.next=5;break}return u.abrupt("return");case 5:a=_.body.messages,n=this.state.messages[e]||[],s=0,r=Object.values(a);case 8:if(!(s<r.length)){u.next=17;break}return c=r[s],u.next=12,g.a.awrap(this.props.cxt.store.decipherMessage(c.senderId,c.senderMachine,c.content,3===c.type));case 12:i=u.sent,n.push({content:i,date:c.createdAt,id:c.id,my:this.props.cxt.user&&c.senderId===this.props.cxt.user.id,senderId:c.senderId});case 14:s++,u.next=8;break;case 17:o=this.state.chats.map((function(t){return t.id!==e?t:n.length?Object(p.a)({},t,{last:n[n.length-1]}):t})),this.props.cxt&&this.props.cxt.user&&t.send("saveUserData",this.props.cxt.user.id,this.props.cxt.store.saveToHex()),this.setState({messages:Object(p.a)({},this.state.messages,Object(m.a)({},e,n)),chats:o},(function(){l.state.currentChat&&l.state.currentChat.id===e&&l.loadChat(e)}));case 20:case"end":return u.stop()}}),null,this)}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"loaf-app"},r.a.createElement(b.a,{position:"fixed"},r.a.createElement(y.a,{className:"bar"},r.a.createElement(E.a,{className:"menuButton",color:"inherit","aria-label":"Open drawer"},r.a.createElement(j.a,{onClick:this.toggleDrawer})),r.a.createElement(O.a,{variant:"h6",color:"inherit",noWrap:!0,className:"logo-wrapper"},r.a.createElement("img",{src:K.a})),r.a.createElement("div",{className:"searchIcon"},r.a.createElement(x.a,null)))),r.a.createElement("div",{className:"playground"},r.a.createElement("div",{className:"chat-list"},r.a.createElement(v.a,null,this.state.chats.map((function(t){return r.a.createElement(B,{chat:t,loadChat:e.loadChat})})),r.a.createElement("div",{onClick:function(){return e.requestFriend(6)}},"Add Friend"),r.a.createElement("div",{onClick:function(){return e.loadMessages(1)}},"Get messages"))),r.a.createElement(A,{chat:this.state.currentChat,manager:{accept:this.acceptInvitation,addMessageToStack:this.addMessageToStack,sendMessage:this.sendMessage},messages:this.state.currentMessages})))}}]),t}(s.Component),H=window.require("electron").ipcRenderer,J=function(e,t){for(var a=arguments.length,n=new Array(a>2?a-2:0),s=2;s<a;s++)n[s-2]=arguments[s];if(t)return H.sendSync.apply(H,[e].concat(n));H.send.apply(H,[e].concat(n))},Y=function(e,t){H.on(e,(function(e){for(var a=arguments.length,n=new Array(a>1?a-1:0),s=1;s<a;s++)n[s-1]=arguments[s];t.apply(void 0,n)}))},G={user:{authenticate:function(e){return J("authenticateUser",!1,e)},get:function(){return J("getUser",!0)},load:function(){return J("loadUser",!1)},logIn:function(e,t){return J("logInUser",!1,e,t)}}},V=a(115),z=function(e){function t(){return Object(o.a)(this,t),Object(u.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.props,t=e.main,a=e.big,n=e.onClick,s=e.secondary;return r.a.createElement(V.a,{variant:t?"contained":"text",onClick:n,disableElevation:!0,className:a?"big-button":"",color:s?"secondary":"primary"},this.props.children)}}]),t}(s.Component),Q=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(u.a)(this,Object(h.a)(t).call(this,e))).handleChange=function(e){return function(t){var n=t.target.value;a.setState((function(t){return Object(p.a)({},t,Object(m.a)({},e,n))}))}},a.logIn=function(){G.user.logIn(a.state.username,a.state.password)},a.validate=function(){G.user.authenticate(a.state.authCode)},a.state={authCode:0,password:"",username:""},a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return this.props.authentication?r.a.createElement("div",{className:"loaf-app-splash"},r.a.createElement("div",{id:"login-page"},r.a.createElement(S.a,{type:"number",className:"username-input",placeholder:"Username",color:"primary",value:this.state.authCode,onChange:this.handleChange("authCode"),required:!0}),r.a.createElement(z,{main:!0,big:!0,onClick:this.validate},"Authenticate"))):r.a.createElement("div",{className:"loaf-app-splash"},r.a.createElement("div",{id:"login-page"},r.a.createElement(S.a,{className:"username-input",placeholder:"Username",color:"primary",value:this.state.username,onChange:this.handleChange("username"),required:!0}),r.a.createElement(S.a,{className:"password-input",placeholder:"Password",required:!0,value:this.state.password,onChange:this.handleChange("password"),type:"password"}),r.a.createElement(z,{main:!0,big:!0,onClick:this.logIn},"Login")))}}]),t}(s.Component),X=a(116),Z=(a(71),function(e){function t(){return Object(o.a)(this,t),Object(u.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"loaf-app-splash"},r.a.createElement("div",{className:"progress-container"},r.a.createElement(X.a,null)))}}]),t}(s.Component)),$=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(u.a)(this,Object(h.a)(t).call(this,e))).state={authentication:!1,loading:!0,user:null},a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this;Y("user",(function(t){e.setState({user:t,loading:!1})})),Y("userStatus",(function(t){200===t?e.getUser():403===t&&e.setState({authentication:!0})})),this.getUser()}},{key:"render",value:function(){var e=this.state,t=e.user,a=e.loading,n=e.authentication;return a?r.a.createElement(Z,null):t?r.a.createElement(W,{cxt:t}):r.a.createElement(Q,{authentication:n})}},{key:"getUser",value:function(){var e=G.user.get();if(e)return this.setState({user:e,loading:!1});G.user.load()}}]),t}(r.a.Component),ee=a(51),te=Object(ee.a)({overrides:{MuiAppBar:{positionFixed:{borderBottom:"2px solid transparent",borderImage:"linear-gradient(to right,  #ffd66b, #ff8b84) 3",boxShadow:"none",left:"0",right:"auto"},positionRelative:{borderBottom:"2px solid transparent",borderImage:"linear-gradient(to right,  #ffd66b, #ff8b84) 3",boxShadow:"none",left:"0",right:"auto",width:"100%"},root:{width:"34%"}},MuiDivider:{inset:{marginRight:"72px"}},MuiDrawer:{paper:{backgroundColor:"#2e2a27 !important"}},MuiListItem:{button:{transition:"none !important"}},MuiListItemIcon:{root:{marginLeft:"8px",marginRight:"4px",transform:"scale(1.2)"}},MuiTypography:{}},palette:{primary:{dark:"#161c1f",light:"#39434a",main:"#242b2f"}},typography:{fontFamily:"Montserrat"}}),ae=(a(72),a(73),a(74),r.a.createElement(n.a,{theme:te},r.a.createElement($,null)));i.a.render(ae,document.getElementById("root"))}},[[61,1,2]]]);
//# sourceMappingURL=main.beca0276.chunk.js.map