(this.webpackJsonploaf=this.webpackJsonploaf||[]).push([[0],{124:function(e,t,a){},125:function(e,t,a){},126:function(e,t,a){},127:function(e,t,a){},128:function(e,t,a){"use strict";a.r(t);var n=a(189),r=a(0),s=a.n(r),c=a(13),o=a.n(c),i=a(63),l=a(23),u=a(7),m=a(8),d=a(10),p=a(9),h=a(27),f=a.n(h),g=a(40),v=a(35),E=a(26),b=a(172),y=a(173),C=a(182),O=a(46),N=a(192),w=a(191),j=a(185),A=a(186),M=a(161),k=a(162),x=a(163),S=a(165),D=a(166),I=a(152),P=a(156),U=a(157),F=a(158),R=a(159),B=a(160),L=window.ipcApi,q=function(e,t){if(L){for(var a=arguments.length,n=new Array(a>2?a-2:0),r=2;r<a;r++)n[r-2]=arguments[r];if(t)return L.sendSync.apply(L,[e].concat(n));L.send.apply(L,[e].concat(n))}},G=function(e,t){L&&L.on(e,(function(){t.apply(void 0,arguments)}))},T={session:{getCookie:function(){return q("getCookie",!0)}},chats:{accept:function(e){return q("acceptChat",!1,e)},createGroup:function(e,t){return q("createGroup",!1,e,t)},get:function(){return q("getChats",!1)},loadImage:function(e){return q("loadImage",!1,e)},loadPageOfMessages:function(e,t){return q("loadPageOfMessages",!1,e,t)}},message:{send:function(e,t){return q("sendMessage",!1,e,t)}},call:{make:function(e){return q("call-to-user",!1,e)},reject:function(){return q("reject-call",!1)},answer:function(e){return q("exchange-offer",!1,e)},accept:function(e){return q("accept-call",!1,e)},error:function(){return q("errortest",!1)}},user:{add:function(e){return q("addUser",!1,e)},authenticate:function(e){return q("authenticateUser",!1,e)},get:function(){return q("getUser",!0)},getUserByName:function(e){return q("getUserByName",!1,e)},load:function(){return q("loadUser",!1)},logout:function(){return q("logout",!1)},logIn:function(e,t){return q("logInUser",!1,e,t)},register:function(e,t,a){return q("register",!1,e,t,a)}}},z=function(e){Object(d.a)(a,e);var t=Object(p.a)(a);function a(){return Object(u.a)(this,a),t.apply(this,arguments)}return Object(m.a)(a,[{key:"render",value:function(){var e=[{text:"New Conversation",icon:I.a,action:this.props.newConversation},{text:"Add Contact",icon:P.a,action:this.props.newContact}],t=[{text:"Media",icon:U.a},{text:"Settings",icon:F.a},{text:"Logout",icon:R.a,action:T.user.logout},{text:"About LOAF",icon:B.a}];return s.a.createElement("div",{className:"sidenav"},s.a.createElement("div",{className:"userView"},s.a.createElement("div",{className:"background"}),s.a.createElement("span",{className:"firstName"},"Hubert"),s.a.createElement("span",{className:"username"},"@osztenkurden")),s.a.createElement(M.a,null),s.a.createElement(k.a,null,e.map((function(e){return s.a.createElement(x.a,{button:!0,key:e.text,className:"menu",onClick:e.action},s.a.createElement(S.a,{classes:{root:"menu-icon"}},s.a.createElement(e.icon,null)),s.a.createElement(D.a,{classes:{primary:"menu-entry"},primary:e.text}))}))),s.a.createElement(M.a,null),s.a.createElement(k.a,null,t.map((function(e){return s.a.createElement(x.a,{button:!0,key:e.text,className:"menu",onClick:e.action},s.a.createElement(S.a,{classes:{root:"menu-icon"}},s.a.createElement(e.icon,null)),s.a.createElement(D.a,{classes:{primary:"menu-entry"},primary:e.text}))}))))}}]),a}(r.Component),K=a.p+"static/media/load_icon.f5b74f47.svg",W=a(190),Q=a(45),V=a.n(Q),H=a(167),Z=a(168),Y=function(e){Object(d.a)(a,e);var t=Object(p.a)(a);function a(){return Object(u.a)(this,a),t.apply(this,arguments)}return Object(m.a)(a,[{key:"render",value:function(){var e=this.props,t=e.chat,a=e.accept;return s.a.createElement("div",{className:"announcement message"},s.a.createElement("div",null,s.a.createElement("p",null,"You've got a request from ",s.a.createElement("strong",null,t.name),". Accept?"),s.a.createElement("p",null,s.a.createElement(H.a,{style:{color:"#2fc52f",cursor:"pointer"},onClick:function(){return a(t.id)}}),s.a.createElement(Z.a,{style:{color:"red",cursor:"pointer"}}))))}}]),a}(r.Component),J=function(e){Object(d.a)(a,e);var t=Object(p.a)(a);function a(){return Object(u.a)(this,a),t.apply(this,arguments)}return Object(m.a)(a,[{key:"render",value:function(){var e=this.props,t=e.chat;return e.request?s.a.createElement(Y,{chat:t,accept:function(){return T.chats.accept(t.id)}}):s.a.createElement("div",{className:"announcement message"},s.a.createElement("p",null,5===t.status?"".concat(t.name," still hasn't accepted your request"):"No messages"))}}]),a}(r.Component),X=a(169),_=a(170),$=a(171);var ee="iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0CAQAAAD+k96sAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfkAg8WFhR9Sw5qAAAD4klEQVR42u2bTWhVRxSAv/jEkPeoxp+ApqGgtMFoRKORRCzSRcG0Cy0tuCh0WySCdtdEKuJGrcSFIAhtQcGAFFpL4kLQ2ig1pC30h9dU8AeiRpqfFqttjTGa3C4erUWomXPvnXvvKecbyGrezHyZmXfPnDsPDMMwDCN2yry2nmcVK3iOGmqoJk8FFVQwxQPGGed3hhhmiBv08xO/aBStpIWNrGUpOefPjPI1PfRQZErDCplNK1/wkCB0GeUIGzyvtIg08CF/RlD8dxlkJ/OyKLmKrpgUH5d7HGZRliSr+Zip2DVL5Q/aKc/Gt/ZW7nqS/LtcoyltzQV87lmyVB7Sxoz0NNdwIxHNUvkkrSX8KvcT1AwIOM+c5DU38SBhzYCAPiqSns2JFDQDAj4Lu1dzIT5Tz+mk/7P/sJRZnEvqm/Z6SrNZKpOsT0b001Q1S8/VvH/Nt1LXDAho8605n98yIXqbSunQZ4pq75J3AMA4PVzkO64zzBhlzKWS+aykmWZeCNHeXHawx998Lgn17LxCK4WntNrIsRChx6DPkPCDEMN53WlAz3JG3HaLv/05JhxKp2Chl7GDR6LWj/sSbRdqbhf3sIVJQftDvkSviDTfCdXHe6I+lvnJB0mG8H7IXnJ8K+jlbR+i+wUD6I9wcmwR9HPQh+iPzt0/ojFST9ecezoVv2aVIPnVGbGvA4KVI8DtsfuSIKHcEVH0onPNOfGLumfhivwQUfSyc81n4hetd26vO/I2+dm5ZiF+0RXO7V2ILDrmXFP0Mmqm4x4tUKBAftq/xcii7vN0P37Rqwlmhdzj4zvxL91k01+u3NItutq55oBu0c3ONb9HMbWCWHe9ZtETggRZTq/mi4KY+qhezdkMCBbuGq2aM+gWaPbqnc8OUQ5ji1bNXSLN3mzfQ/pv9oo0JwSnqQxRzjFhInWfRs2F9Ak1v2SWPs1Gbgk1B6jSp7mNcaHmHUEKICNUclL8WulXfUFCU4h7EEMs16bZGuI9az9LdEnm6QzxMrlLltpMnxqKIa7b7NEWB9WG2JkjvKxtZzYwItY8l60b2C6sE19fnuDdDGa0pmEZt4WalzUerKu4KdT8SPZeJSuZg7PCMO8NnWdN2W2WIs/r1KwTBe4nkri36YfzAs1DWhMk8JpAc7fevF4ZlwSzqZhXBBdpcppFTztq3tR2Nnkyh+D6K9LNqOZN57Omco46ijZoF3U7Yn+TXCTqh3LqnOp1axdd7Hix5yvtotWO9S5pF3VLgQSMYhiGYRiGYRh+8JVJDVIfQUJBfeYwURM1URM1URM1URM1URM1URM1URM1URM1DOP/zl+IROP1bg+NpwAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMC0wMi0xNVQyMjoyMjoyMCswMDowMBpZaTEAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjAtMDItMTVUMjI6MjI6MjArMDA6MDBrBNGNAAAAAElFTkSuQmCC";function te(e){var t=(16777215&function(e){for(var t=0,a=0;a<e.length;a++)t=e.charCodeAt(a)+((t<<5)-t);return t}(e)).toString(16).toUpperCase();return"#"+"00000".substring(0,6-t.length)+t}var ae=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=document.getElementById("message_container");if(!t)return 0;if(e)t.scroll({top:e});else{var a=t.scrollHeight-t.scrollTop-t.clientHeight;a<=100&&t.scroll({top:t.scrollHeight})}},ne=function(e){var t,a=function(e){if(!e)return[];if(e.last)return[e.last];var t=Math.max.apply(Math,Object(v.a)(e.pages.map((function(e){return e.page})))),a=e.pages.find((function(e){return e.page===t}));return a?a.messages:[]}(e),n=null,r=Object(E.a)(a);try{for(r.s();!(t=r.n()).done;){var s=t.value;n?new Date(s.date)>new Date(n.date)&&(n=s):n=s}}catch(c){r.e(c)}finally{r.f()}return n},re=function(e){return Object(v.a)(e).sort((function(e,t){var a=[ne(e),ne(t)],n=a[0],r=a[1];return n&&r?new Date(n.date)>new Date(r.date)?-1:1:0}))},se=function(e){var t=e.data,a=t.substr(t.indexOf(":")+1,t.indexOf("/")-t.indexOf(":")-1);return s.a.createElement("div",{className:"file-preview"},s.a.createElement("div",{className:"file-icon",onClick:function(){return function(e,t){var a=document.createElement("a");a.href=e,a.download=t,a.click()}(t,e.name)}},s.a.createElement("div",{className:"hover-icon"},s.a.createElement($.a,null)),s.a.createElement("div",{className:"default-icon"},function(e){return"audio"===e?s.a.createElement(X.a,null):s.a.createElement(_.a,null)}(a))),s.a.createElement("div",{className:"file-data"},s.a.createElement("div",{className:"file-name"},e.name),s.a.createElement("div",{className:"file-size"},oe(e.size))))};function ce(e){return s.a.createElement("div",{className:"many-msg-types"},e.filter((function(e){return"file"===e.type})).map((function(e){var t=e.content.data;return t.startsWith("data:image")?s.a.createElement("img",{src:t,alt:"Upload"}):se(e.content)})),e.filter((function(e){return"text"===e.type})).map((function(e){return s.a.createElement("p",null,e.content)})))}function oe(e){for(var t=0,a=["B","KB","MB","GB","TB"];t<a.length;t++){var n=a[t];if(e<1024)return"".concat(e.toFixed(1)," ").concat(n);e=e/1024}return"".concat(e.toFixed(1)," PB")}var ie=a(193),le=function(e){Object(d.a)(a,e);var t=Object(p.a)(a);function a(){var e;Object(u.a)(this,a);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).renderAvatar=function(){e.props.sender;return s.a.createElement(ie.a,{src:"",className:"avatar"})},e.renderContent=function(){var t=e.props.message;switch("file"===t.content.type&&console.log(t),t.content.type){case"text":return s.a.createElement("p",null,t.content.content);case"file":return s.a.createElement("div",null,s.a.createElement("img",{src:t.content.content.data,alt:"Upload"}));case"mixed":return ce(t.content.content)}},e}return Object(m.a)(a,[{key:"render",value:function(){var e=this.props,t=e.message,a=e.sender;return s.a.createElement("div",{className:"message friend ".concat(t.content.type)},this.renderAvatar(),s.a.createElement("div",{className:"message-container"},s.a.createElement("div",{className:"message-sender-name"},a.username),this.renderContent()))}}]),a}(r.Component),ue=function(e){Object(d.a)(a,e);var t=Object(p.a)(a);function a(){var e;Object(u.a)(this,a);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).renderContent=function(){var t=e.props.message;switch(t.content.type){case"text":return s.a.createElement("p",null,t.content.content);case"file":return ce([t.content]);case"mixed":return ce(t.content.content)}},e}return Object(m.a)(a,[{key:"render",value:function(){var e=this.props.message;return!e.my&&e.sender?s.a.createElement(le,{message:e,sender:e.sender}):s.a.createElement("div",{className:"message"},this.renderContent())}}]),a}(r.Component),me=new(function(){function e(){var t=this;Object(u.a)(this,e),this.images=void 0,this.onLoad=void 0,this.images=new Map,this.onLoad=function(){},G("imageLoaded",(function(e){t.images.set(e.id,{loading:!1,image:e.image}),t.onLoad&&t.onLoad()}))}return Object(m.a)(e,[{key:"set",value:function(e){return this.onLoad=e,this}},{key:"get",value:function(e){var t=this.images.get(e);return t?t.loading?null:t.image:this.load(e)}},{key:"load",value:function(e){return this.images.set(e,{loading:!0,image:null}),T.chats.loadImage(e),null}}]),e}()),de=function(e){Object(d.a)(a,e);var t=Object(p.a)(a);function a(){return Object(u.a)(this,a),t.apply(this,arguments)}return Object(m.a)(a,[{key:"render",value:function(){var e,t,a=this.props.chat;return s.a.createElement(b.a,{position:"relative"},s.a.createElement(y.a,{className:"bar"},s.a.createElement(x.a,{style:{paddingTop:0,paddingBottom:0}},a.image?s.a.createElement(ie.a,{src:"data:image/jpeg;base64,".concat(me.get(a.id)),className:"avatar"}):s.a.createElement(ie.a,{className:"avatar",style:{backgroundColor:te(a.name)}},(null===(e=a.name.charAt(0))||void 0===e?void 0:e.toUpperCase())||"#"),s.a.createElement(D.a,{inset:!0,className:"chat-text-item",primary:s.a.createElement("div",{className:"chat-name"},s.a.createElement("div",{className:"chat-name-text"},a.name)),secondary:s.a.createElement("div",{className:"chat-last-message"},s.a.createElement("div",{className:"text"},(null===(t=a.last)||void 0===t?void 0:t.my)?s.a.createElement("span",{className:"you"},"Ty:"):""," Last seen 10 minutes ago"))}))))}}]),a}(s.a.Component),pe=a(174),he=function(e){Object(d.a)(a,e);var t=Object(p.a)(a);function a(){var e;Object(u.a)(this,a);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).renderEntry=function(t){var a=e.props,n=a.images,r=a.setFiles;return s.a.createElement("div",{className:"upload-entry-preview"},s.a.createElement("div",{className:"preview-image-container"},s.a.createElement("div",{className:"preview-image",style:{backgroundImage:t.data.startsWith("data:image")?"url(".concat(t.data,")"):"url(data:image/jpeg;base64,".concat(ee,")")}})),s.a.createElement("div",{className:"preview-data-container"},s.a.createElement("div",{className:"preview-data-name"},t.name),s.a.createElement("div",{className:"preview-data-size"},oe(t.size))),s.a.createElement("div",{className:"preview-action-container"},s.a.createElement("div",{className:"cancel-file",onClick:function(){return r(n.filter((function(e){return e!==t})))}},s.a.createElement(R.a,null))))},e}return Object(m.a)(a,[{key:"render",value:function(){var e=this.props,t=e.images,a=e.sendFiles;return s.a.createElement("div",{className:"upload-image-preview"},s.a.createElement("div",{className:"upload-entries-preview"},t.map(this.renderEntry)),s.a.createElement("div",{className:"image-send btn-behaviour",onClick:a},"SEND"))}}]),a}(r.Component),fe=function(e){Object(d.a)(a,e);var t=Object(p.a)(a);function a(e){var n;return Object(u.a)(this,a),(n=t.call(this,e)).state={highlight:!1},n}return Object(m.a)(a,[{key:"render",value:function(){var e=this.props,t=e.images,a=e.sendFiles,n=e.setFiles;return s.a.createElement("div",{className:"drag-show",onClick:function(){return n([])}},s.a.createElement("div",{className:"drag-window ".concat(t.length?"dropped":""),onClick:function(e){return e.stopPropagation()}},t.length?s.a.createElement(he,{setFiles:n,sendFiles:a,images:t}):s.a.createElement("div",{className:"drag-window-content"},s.a.createElement(pe.a,null),"Drop your images here")))}}]),a}(r.Component),ge=a(78),ve=!1,Ee=function(e){Object(d.a)(a,e);var t=Object(p.a)(a);function a(e){var n;return Object(u.a)(this,a),(n=t.call(this,e)).allow=function(e){e.preventDefault(),e.stopPropagation()},n.whileOver=function(e){console.log("a");var t=!1;"dragenter"!==e.type&&"dragover"!==e.type||(t=!0),n.state.highlight!==t&&n.setState({highlight:t})},n.drop=function(e){e.preventDefault(),e.dataTransfer&&n.handleFiles(e.dataTransfer.files),n.setState({highlight:!1})},n.componentDidMount=function(){console.log(),G("chatPage",(function(){setTimeout((function(){ae(62),ve=!1}),0)}))},n.handleFiles=function(e){if(e&&e.length){var t=[];!function a(r,s){if(!s)return n.setFiles(t);var c=new FileReader;c.readAsDataURL(s),c.onload=function(){if("string"!==typeof c.result)return a(r+1,e[r+1]);var n=c.result;return t.push({data:n,name:s.name,size:s.size}),a(r+1,e[r+1])}}(0,e[0])}},n.getAllMessagesCount=function(){var e=n.props.chat;return e?e.pages.map((function(e){return e.messages.length})).reduce((function(e,t){return e+t}),0):0},n.loadMoreMessages=function(e){var t=n.props.chat;t&&2===t.status&&T.chats.loadPageOfMessages(t.id,e)},n.loadMoreByScroll=function(e){return function(t,a){ve||!a||a.intersectionRatio<.98||(ve=!0,n.loadMoreMessages(e))}},n.setFiles=function(e){n.setState((function(t){return t.form.files=e,t}))},n.handleKeyDown=function(e){if("Enter"===e.key&&n.state.form.textMessage&&n.props.chat){var t=n.state.form.textMessage;T.message.send(n.props.chat.id,{type:"text",content:t}),n.setState({form:{textMessage:"",files:[]}})}},n.sendMessages=function(){var e=Object(g.a)(f.a.mark((function e(t,a){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,T.message.send(t,a);case 2:n.setState({form:{textMessage:"",files:[]}});case 3:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}(),n.sendFiles=function(){var e=n.state.form.files;if(!e.length||!n.props.chat)return console.log("NO files OR NO CHAT");if(1===e.length){var t={type:"file",content:n.state.form.files[0]};n.sendMessages(n.props.chat.id,t)}else{var a,r={type:"mixed",content:[]},s=Object(E.a)(e);try{for(s.s();!(a=s.n()).done;){var c={type:"file",content:a.value};r.content.push(c)}}catch(o){s.e(o)}finally{s.f()}n.sendMessages(n.props.chat.id,r)}},n.handleChange=function(e){var t=n.state.form;t[e.target.name]=e.target.value,n.setState({form:t})},n.state={form:{textMessage:"",files:[]},highlight:!1},n}return Object(m.a)(a,[{key:"render",value:function(){var e=this,t=this.props.chat;return t?s.a.createElement("div",{className:"chat_container"},s.a.createElement(de,{chat:t}),s.a.createElement("div",{id:"message_container",className:"message_container ".concat(this.state.highlight?"highlight-drag":""," ").concat(this.state.form.files.length?"upload":""),onDragOver:this.allow,onDragEnter:this.whileOver,onDragOverCapture:this.whileOver,onDragEnd:this.whileOver,onDragLeave:this.whileOver,onDrop:this.drop},1!==t.status&&this.getAllMessagesCount()?null:s.a.createElement(J,{request:1===t.status,chat:t}),2===t.status?t.pages.map((function(a){return s.a.createElement(s.a.Fragment,null,a.page>0&&!t.pages.find((function(e){return e.page===a.page-1}))?s.a.createElement(s.a.Fragment,null,s.a.createElement(ge.a,{threshold:0,trackVisibility:!0,delay:100,as:"div",className:"load-messages-button",onClick:function(){return e.loadMoreMessages(a.page-1)},onChange:e.loadMoreByScroll(a.page-1)},"LOAD MORE MESSAGES")):null,a.messages.map((function(e){return s.a.createElement(s.a.Fragment,{key:(a=e,"".concat(a.uuid,"-").concat(a.senderId,"-").concat(a.date,"-").concat(a.date,"-").concat(a.id||"xd"))},function(e,t){var a=V()(t.date).format("dddd, MMMM Do YYYY"),n=e.map((function(e){return e.messages})).flat(),r=n.indexOf(t);return n.map((function(e){return V()(e.date).format("dddd, MMMM Do YYYY")})).indexOf(a)===r}(t.pages,e)?s.a.createElement("div",{className:"date-tag"},V()(e.date).format("dddd, MMMM Do YYYY")):null,s.a.createElement(ue,{message:e,chatName:t.name}));var a})))})):null),s.a.createElement(fe,{images:this.state.form.files,setFiles:this.setFiles,sendFiles:this.sendFiles}),2===t.status?s.a.createElement("div",{className:"text_sender"},s.a.createElement(W.a,{onChange:this.handleChange,name:"textMessage",onKeyDown:this.handleKeyDown,id:"full-width",placeholder:"Type in a message...",fullWidth:!0,value:this.state.form.textMessage,variant:"outlined",InputLabelProps:{shrink:!0},InputProps:{classes:{root:"outline-container"}},inputProps:{style:{color:"white"}}})):null):s.a.createElement("div",{className:"chat_container empty"})}}]),a}(r.Component),be=function(e){Object(d.a)(a,e);var t=Object(p.a)(a);function a(){return Object(u.a)(this,a),t.apply(this,arguments)}return Object(m.a)(a,[{key:"render",value:function(){var e,t=this.props.chat;return t.image?s.a.createElement(ie.a,{src:"data:image/jpeg;base64,".concat(me.get(t.id)),className:"avatar"}):s.a.createElement(ie.a,{className:"avatar",style:{backgroundColor:te(t.name)}},(null===(e=t.name.charAt(0))||void 0===e?void 0:e.toUpperCase())||"#")}}]),a}(r.Component),ye=function(e,t){var a;return t?!t.my&&e.private?"":t.my?s.a.createElement("span",{className:"you"},"You:"):s.a.createElement("span",{className:"you"},(null===(a=t.sender)||void 0===a?void 0:a.username)||t.senderId,":"):null};function Ce(e,t){switch(e.status){case 5:return"Waiting for response...";case 2:return"file"===(null===t||void 0===t?void 0:t.content.type)||"mixed"===(null===t||void 0===t?void 0:t.content.type)?"sent an image":(null===t||void 0===t?void 0:t.content.content)||"No messages";case 1:return s.a.createElement("span",{className:"strong"},"requested your attention");default:return""}}var Oe=function(e){Object(d.a)(a,e);var t=Object(p.a)(a);function a(){return Object(u.a)(this,a),t.apply(this,arguments)}return Object(m.a)(a,[{key:"render",value:function(){var e=this,t=this.props,a=t.chat,n=t.isCurrent,r=ne(a);return s.a.createElement("div",{className:"chat-list-entry ".concat(n?"current":"")},s.a.createElement(x.a,{button:!0,className:"chat-button "+(a.unread?"new-message":""),onClick:function(){return e.props.loadChat(a)}},s.a.createElement(be,{chat:a}),s.a.createElement(D.a,{inset:!0,className:"text-item",primary:s.a.createElement("div",{className:"chat-name"},s.a.createElement("div",{className:"chat-name-text"},a.name),s.a.createElement("div",{className:"last-message-date"},r?V()(r.date).fromNow():"")),secondary:s.a.createElement("div",{className:"chat-last-message"},s.a.createElement("div",{className:"text"},ye(a,r)," ",Ce(a,r)),s.a.createElement("div",{className:"last-text-status "}))})),s.a.createElement("li",null,s.a.createElement(M.a,{variant:"inset",className:"separator"})))}}]),a}(r.Component),Ne=function(e){Object(d.a)(a,e);var t=Object(p.a)(a);function a(){return Object(u.a)(this,a),t.apply(this,arguments)}return Object(m.a)(a,[{key:"render",value:function(){var e=this,t=this.props.chats;return s.a.createElement("div",{className:"chat-list"},s.a.createElement(k.a,null,t.map((function(t){var a;return s.a.createElement(Oe,{key:t.id,chat:t,chatImage:me.get(t.id),loadChat:e.props.loadChat,isCurrent:(null===(a=e.props.currentChat)||void 0===a?void 0:a.id)===t.id})}))))}}]),a}(r.Component),we=a(129),je=a(176),Ae=a(177),Me=a(178),ke=a(179),xe=a(83),Se=a(175),De=function(e){Object(d.a)(a,e);var t=Object(p.a)(a);function a(){return Object(u.a)(this,a),t.apply(this,arguments)}return Object(m.a)(a,[{key:"render",value:function(){var e=this.props,t=e.main,a=e.big,n=e.onClick,r=e.secondary,c=Object(xe.a)(e,["main","big","onClick","secondary"]);return s.a.createElement(Se.a,Object.assign({variant:t?"contained":"text",onClick:n,disableElevation:!0,className:a?"big-button":"",color:r?"secondary":"primary"},c),this.props.children)}}]),a}(r.Component),Ie=function(e){Object(d.a)(a,e);var t=Object(p.a)(a);function a(e){var n;return Object(u.a)(this,a),(n=t.call(this,e)).onChange=function(e){n.setState({name:e.target.value})},n.addContact=function(){n.state.loading||n.setState({loading:!0},(function(){return T.user.add(n.state.name)}))},n.state={name:"",loading:!1},n}return Object(m.a)(a,[{key:"componentDidMount",value:function(){var e=this;G("userAdded",(function(t){e.setState({loading:!1},(function(){t&&(e.props.onClose(),e.props.closeDrawer())}))}))}},{key:"render",value:function(){return s.a.createElement(we.a,{classes:{root:"modal-container"}},s.a.createElement(je.a,{style:{color:"white"}},"Adding contact"),s.a.createElement(Ae.a,null,s.a.createElement(W.a,{style:{width:"100%"},className:"text-field-container",value:this.state.name,onChange:this.onChange,disabled:this.state.loading,placeholder:"Username",InputProps:{className:"contact-input",style:{color:"#fff"},startAdornment:s.a.createElement(Me.a,{position:"start",className:"new-contact-adornment"},"@")}})),s.a.createElement(ke.a,null,s.a.createElement(De,{main:!0,big:!0,onClick:this.addContact},"Add"),s.a.createElement(De,{big:!0,onClick:this.props.onClose},"Cancel")))}}]),a}(r.Component),Pe=a(180),Ue=a(181),Fe=a(183),Re=a(184),Be=function(e){Object(d.a)(a,e);var t=Object(p.a)(a);function a(e){var n;return Object(u.a)(this,a),(n=t.call(this,e)).onChange=function(e){n.setState({name:e.target.value})},n.toggleChatEntry=function(e){return function(){var t=n.state.selectedChats;t.includes(e)?t=t.filter((function(t){return t!==e})):t.push(e),n.setState({selectedChats:t})}},n.createConversation=function(){var e,t=n.state,a=t.name,r=t.selectedChats,s=[],c=n.props.chats.filter((function(e){return r.includes(e.id)})).map((function(e){return e.users})).flat().map((function(e){return e.id})),o=Object(E.a)(c);try{for(o.s();!(e=o.n()).done;){var i=e.value;i&&(s.includes(i)||s.push(i))}}catch(l){o.e(l)}finally{o.f()}n.state.loading||n.setState({loading:!0},(function(){return T.chats.createGroup(a,s)}))},n.state={name:"",loading:!1,selectedChats:[]},n}return Object(m.a)(a,[{key:"componentDidMount",value:function(){var e=this;G("createdChat",(function(t){e.setState({loading:!1},(function(){t&&(e.props.onClose(),e.props.closeDrawer())}))}))}},{key:"render",value:function(){var e=this,t=this.props.chats,a=this.state.selectedChats;return s.a.createElement(we.a,{classes:{root:"modal-container new-conversation"}},s.a.createElement(je.a,{style:{color:"white"}},"Create group"),s.a.createElement(Ae.a,null,s.a.createElement(W.a,{style:{width:"100%"},className:"text-field-container",value:this.state.name,onChange:this.onChange,disabled:this.state.loading,placeholder:"Group name",InputProps:{className:"contact-input",style:{color:"#fff"}}}),s.a.createElement(k.a,{dense:!0},t.filter((function(e){return e.private})).map((function(t){return s.a.createElement(x.a,{className:"new-conversation-entry ".concat(a.includes(t.id)?"selected":"")},s.a.createElement(Pe.a,null,s.a.createElement(ie.a,null,s.a.createElement(be,{chat:t}))),s.a.createElement(D.a,{primary:s.a.createElement("div",{className:"visible-name"},t.name),secondary:s.a.createElement("div",{className:"main-identifier"},"@".concat(t.name))}),s.a.createElement(Ue.a,null,s.a.createElement(C.a,{edge:"end","aria-label":"delete"},a.includes(t.id)?s.a.createElement(Fe.a,{onClick:e.toggleChatEntry(t.id)}):s.a.createElement(Re.a,{onClick:e.toggleChatEntry(t.id)}))))})))),s.a.createElement(ke.a,null,s.a.createElement(De,{main:!0,big:!0,onClick:this.createConversation},"Add"),s.a.createElement(De,{big:!0,onClick:this.props.onClose},"Cancel")))}}]),a}(r.Component),Le=function(e,t){var a,n=Object(E.a)(t);try{var r=function(){var t=a.value,n=e.pages.find((function(e){return e.page===t.page}));if(!n)return e.pages.push(t),"continue";n.messages=t.messages};for(n.s();!(a=n.n()).done;)r()}catch(s){n.e(s)}finally{n.f()}},qe=function(e,t){var a=Math.max.apply(Math,Object(v.a)(t.map((function(e){return e.page}))));if(Math.max.apply(Math,Object(v.a)(e.pages.map((function(e){return e.page}))))>a)return!1;var n=t.find((function(e){return e.page===a})),r=e.pages.find((function(e){return e.page===a}));if(!r)return!0;if(n.messages.length!==r.messages.length)return!0;var s,c=r.messages.map((function(e){return e.uuid})),o=n.messages.map((function(e){return e.uuid})),i=Object(E.a)(c);try{for(i.s();!(s=i.n()).done;){var l=s.value;if(!o.includes(l))return!0}}catch(u){i.e(u)}finally{i.f()}return!1},Ge=function(e){Object(d.a)(a,e);var t=Object(p.a)(a);function a(e){var n;return Object(u.a)(this,a),(n=t.call(this,e)).setContactModal=function(e){return function(){n.setState({newContactModal:e})}},n.setConversationModal=function(e){return function(){n.setState({newConversationModal:e})}},n.toggleDrawer=function(){n.setState((function(e){return Object(l.a)(Object(l.a)({},e),{},{drawer:!e.drawer})}))},n.loadChat=function(e){n.setState({currentChat:e},(function(){setTimeout((function(){var e=document.getElementById("message_container");e&&e.scroll({top:e.scrollHeight})}),10)}))},n.state={chats:[],currentChat:null,drawer:!1,newContactModal:!1,newConversationModal:!1,storage:me.set((function(){return n.setState({hash:(new Date).toISOString()})})),hash:""},n}return Object(m.a)(a,[{key:"componentDidMount",value:function(){var e=Object(g.a)(f.a.mark((function e(){var t=this;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:G("chats",(function(e){var a=t.state.currentChat,n=!1;if(a){var r=e.find((function(e){return e.id===a.id}));r&&(n=qe(a,r.pages),Le(a,r.pages));var s=e.findIndex((function(e){return e.id===a.id}));s>=0&&(e[s]=a)}t.setState({chats:re(e),currentChat:a},(function(){n&&ae()}))})),G("clearPages",(function(){t.loadChat(null);var e=t.state.chats;e.map((function(e){if(0===e.pages.length)return e;var t=Math.max.apply(Math,Object(v.a)(e.pages.map((function(e){return e.page})))),a=e.pages.find((function(e){return e.page===t}));return a?(e.pages=[a],e):e})),t.setState({chats:re(e)})})),G("chatPage",(function(e){var a=t.state,n=a.chats,r=a.currentChat,s=n.find((function(t){return t.id===e.chatId})),c=!1;s&&(r&&r.id===s.id?(c=qe(r,[e.pageEntry]),Le(r,[e.pageEntry]),r.pages.sort((function(e,t){return e.page-t.page}))):s.pages=[e.pageEntry],t.setState({chats:re(n),currentChat:r},(function(){c&&ae()})))})),T.chats.get();case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return s.a.createElement("div",{className:"loaf-app"},s.a.createElement(b.a,{position:"fixed",style:{top:"20px"}},s.a.createElement(y.a,{className:"bar"},s.a.createElement(C.a,{className:"menuButton",color:"inherit","aria-label":"Open drawer",onClick:this.toggleDrawer},s.a.createElement(j.a,null)),s.a.createElement(O.a,{variant:"h6",color:"inherit",noWrap:!0,className:"logo-wrapper"},s.a.createElement("img",{src:K,alt:"Loaf"})),s.a.createElement("div",{className:"searchIcon"},s.a.createElement(A.a,null)))),s.a.createElement(N.a,{open:this.state.drawer,onOpen:this.toggleDrawer,onClose:this.toggleDrawer,className:"sidenav-container",classes:{paper:"drawer-content"}},s.a.createElement(z,{newContact:this.setContactModal(!0),newConversation:this.setConversationModal(!0)})),s.a.createElement(w.a,{open:this.state.newContactModal,onClose:this.setContactModal(!1)},s.a.createElement(Ie,{onClose:this.setContactModal(!1),closeDrawer:this.toggleDrawer})),s.a.createElement(w.a,{open:this.state.newConversationModal,onClose:this.setConversationModal(!1)},s.a.createElement(Be,{onClose:this.setConversationModal(!1),closeDrawer:this.toggleDrawer,chats:this.state.chats})),s.a.createElement("div",{className:"playground"},s.a.createElement(Ne,{chats:this.state.chats,currentChat:this.state.currentChat,loadChat:this.loadChat}),s.a.createElement(Ee,{chat:this.state.currentChat,hash:this.state.hash})))}}]),a}(r.Component),Te=a(39),ze=function(e){Object(d.a)(a,e);var t=Object(p.a)(a);function a(e){var n;return Object(u.a)(this,a),(n=t.call(this,e)).keyPress=function(e){"Enter"===e.key&&n.logIn()},n.handleChange=function(e){return function(t){var a=t.target.value;n.setState((function(t){return Object(l.a)(Object(l.a)({},t),{},Object(Te.a)({},e,a))}))}},n.logIn=function(){T.user.logIn(n.state.username,n.state.password)},n.validate=function(){T.user.authenticate(n.state.authCode)},n.state={authCode:0,password:"",username:""},n}return Object(m.a)(a,[{key:"render",value:function(){return this.props.authentication?s.a.createElement("div",{className:"loaf-app-splash"},s.a.createElement("div",{id:"login-page"},s.a.createElement(W.a,{type:"number",className:"username-input",placeholder:"Username",color:"primary",value:this.state.authCode,onChange:this.handleChange("authCode"),required:!0}),s.a.createElement(De,{main:!0,big:!0,onClick:this.validate},"Authenticate"))):s.a.createElement("div",{className:"loaf-app-splash"},s.a.createElement("div",{id:"login-page"},s.a.createElement(W.a,{className:"username-input",placeholder:"Username",color:"primary",value:this.state.username,onKeyPress:this.keyPress,onChange:this.handleChange("username"),required:!0}),s.a.createElement(W.a,{className:"password-input",placeholder:"Password",required:!0,onKeyPress:this.keyPress,value:this.state.password,onChange:this.handleChange("password"),type:"password"}),s.a.createElement(De,{main:!0,big:!0,onClick:this.logIn},"Login"),s.a.createElement(De,{big:!0,onClick:this.props.togglePage},"Sign Up")))}}]),a}(r.Component),Ke=a(194),We=a(187),Qe=a(81),Ve=a.n(Qe),He=function(e){Object(d.a)(a,e);var t=Object(p.a)(a);function a(e){var n;return Object(u.a)(this,a),(n=t.call(this,e)).renderError=function(){var e=n.state,t=e.done,a=e.loading,r=e.qrcode;return!t||a||r?"":s.a.createElement("p",null,"There was some error along the way - try again")},n.renderForm=function(){return n.state.qrcode?s.a.createElement("img",{src:n.state.qrcode,alt:"TOTP"}):s.a.createElement(s.a.Fragment,null,s.a.createElement(W.a,{className:"firstname-input",placeholder:"First Name",color:"primary",value:n.state.firstName,onChange:n.handleChange("firstName"),required:!0,disabled:n.state.loading}),s.a.createElement(W.a,{className:"username-input",placeholder:"Username",color:"primary",value:n.state.username,onChange:n.handleChange("username"),required:!0,disabled:n.state.loading}),s.a.createElement(W.a,{className:"password-input",placeholder:"Password",required:!0,value:n.state.password,onChange:n.handleChange("password"),type:"password",disabled:n.state.loading}),s.a.createElement(De,{main:!0,big:!0,onClick:n.register,style:{marginTop:"24px"}},"Register"))},n.handleChange=function(e){return function(t){var a=t.target.value;n.setState((function(t){return Object(l.a)(Object(l.a)({},t),{},Object(Te.a)({},e,a))}))}},n.register=function(){n.state.loading||n.setState({loading:!0},(function(){T.user.register(n.state.username,n.state.password,n.state.firstName)}))},n.state={done:!1,firstName:"",loading:!1,password:"",qrcode:null,username:""},n}return Object(m.a)(a,[{key:"componentDidMount",value:function(){var e=this;G("userCreated",function(){var t=Object(g.a)(f.a.mark((function t(a){var n;return f.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(a){t.next=3;break}return e.setState({done:!0,loading:!1}),t.abrupt("return");case 3:return t.next=5,Ve.a.toDataURL("otpauth://totp/Loaf%20Messenger?secret=".concat(a));case 5:n=t.sent,e.setState({done:!0,loading:!1,qrcode:n});case 7:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())}},{key:"render",value:function(){return s.a.createElement("div",{className:"loaf-app-splash"},s.a.createElement("div",{id:"login-page"},this.renderError(),this.renderForm(),s.a.createElement(De,{big:!0,onClick:this.props.togglePage},"Sign In")),s.a.createElement(Ke.a,{id:"splash-backdrop",open:this.state.loading},s.a.createElement(We.a,{color:"inherit"})))}}]),a}(r.Component),Ze=a(188),Ye=(a(124),function(e){Object(d.a)(a,e);var t=Object(p.a)(a);function a(){return Object(u.a)(this,a),t.apply(this,arguments)}return Object(m.a)(a,[{key:"render",value:function(){return s.a.createElement("div",{className:"loaf-app-splash"},s.a.createElement("div",{className:"progress-container"},s.a.createElement(Ze.a,null)))}}]),a}(r.Component)),Je=function(e){Object(d.a)(a,e);var t=Object(p.a)(a);function a(e){var n;return Object(u.a)(this,a),(n=t.call(this,e)).togglePage=function(){n.setState((function(e){return Object(l.a)(Object(l.a)({},e),{},{register:!e.register})}))},n.state={authentication:!1,loading:!0,register:!1,user:null},n}return Object(m.a)(a,[{key:"componentDidMount",value:function(){var e=this;G("user",(function(t){e.setState({user:t,loading:!1})})),G("userStatus",(function(t){200===t?e.getUser():403===t&&e.setState({authentication:!0})})),this.getUser()}},{key:"render",value:function(){var e=this.state,t=e.user,a=e.loading,n=e.authentication,r=e.register;return a?s.a.createElement(Ye,null):t?s.a.createElement(Ge,null):r?s.a.createElement(He,{togglePage:this.togglePage}):s.a.createElement(ze,{togglePage:this.togglePage,authentication:n})}},{key:"getUser",value:function(){var e=T.user.get();if(e)return this.setState({user:e,loading:!1});T.user.load()}}]),a}(s.a.Component),Xe=function(){var e=Object(r.useState)(""),t=Object(i.a)(e,2),a=t[0],n=t[1],c=Object(r.useState)(!1),o=Object(i.a)(c,2),l=o[0],u=o[1];return Object(r.useEffect)((function(){G("error-message",(function(e){n(e),u(!0),setTimeout((function(){u(!1)}),5e3)}))}),[]),s.a.createElement(s.a.Fragment,null,s.a.createElement("div",{className:"window-bar"},s.a.createElement("div",{className:"window-drag-bar"}),s.a.createElement("div",{onClick:function(){window.ipcApi.send("min")},className:"app-control"},"_"),s.a.createElement("div",{onClick:function(){window.ipcApi.send("max")},className:"app-control"},"O"),s.a.createElement("div",{onClick:function(){window.ipcApi.send("close")},className:"app-control close"},"X")),s.a.createElement("div",{className:"error-message ".concat(l?"show":"")},a),s.a.createElement(Je,null))},_e=a(82),$e=Object(_e.a)({overrides:{MuiAppBar:{positionFixed:{borderBottom:"2px solid transparent",borderImage:"linear-gradient(to right,  #ffd66b, #ff8b84) 3",boxShadow:"none",left:"0",right:"auto"},positionRelative:{borderBottom:"2px solid transparent",borderImage:"linear-gradient(to right,  #ffd66b, #ff8b84) 3",boxShadow:"none",left:"0",right:"auto",width:"100%"},root:{width:"34%"}},MuiButton:{textPrimary:{color:"white"}},MuiDivider:{inset:{marginRight:"72px"}},MuiListItem:{button:{transition:"none !important"}},MuiListItemIcon:{root:{marginLeft:"8px",marginRight:"4px",transform:"scale(1.2)"}},MuiTypography:{}},palette:{primary:{dark:"#161c1f",light:"#39434a",main:"#242b2f"}},typography:{fontFamily:"Montserrat"}}),et=(a(125),a(126),a(127),s.a.createElement(n.a,{theme:$e},s.a.createElement(Xe,null)));o.a.render(et,document.getElementById("root"))}},[[128,1,2]]]);
//# sourceMappingURL=main.14a776e0.chunk.js.map