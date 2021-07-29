import React, { Component, useEffect, useState } from "react";
import Announcement from "../Message/Announcement";
import Message from "../Message/Message";
import * as Loaf from "./../../API/Loaf";
import * as I from "./../../../modules/interface";
import api from "./../../API";
import { InView } from 'react-intersection-observer';
import { scrollToBottom } from "Modules/Utils";
import useStateRef from "API/useRefState";

const peerConnection = new RTCPeerConnection();

interface IProps {
    users: I.IUser[];
}


const Video = ({ users }: IProps) => {
    const [isCalling, setCalling] = useState(false);
    const [_userCalling, setUserCalling, userCallingRef] = useStateRef('');
    const [_isAnswered, setIsAnswered, isAnsweredRef] = useStateRef(false)
    const call = async (user: I.IUser) => {
        if (isCalling || !user.id) {
            return;
        }

        const targetId = String(user.id);

        setCalling(true);
        setUserCalling(targetId);

        console.log('step 1');
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(new RTCSessionDescription(offer));

        const offerOrAnswer = JSON.parse(JSON.stringify(offer));

        api.call.make({ offerOrAnswer, target: targetId, type: 'invite' });
    }

    const reject = () => {
        if(!userCallingRef.current) return;
        console.log("end of call")
        setCalling(false);
        setUserCalling('');
        setIsAnswered(false);
        api.call.reject();
    }

    useEffect(() => {
        peerConnection.ontrack = ({ streams: [stream] }) => {
            const remoteVideo = document.getElementById('remote-video');
            if(!remoteVideo) return;

            (remoteVideo as any).srcObject = stream;
        }

        const initYourCamera = async () => {
            try {
                const devices = await navigator.mediaDevices.enumerateDevices();
                console.log(devices);
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                const localVideo = document.getElementById("local-video");
                if(localVideo){
                    (localVideo as any).srcObject = stream;
                }

                stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));
            } catch(e) {
                console.log(e);
            }
        }

        initYourCamera();

        Loaf.on('call-rejected', () => {
            reject();
        });
        Loaf.on('call-failed', () => {
            reject();
        });
        Loaf.on("call-offer", async (data: I.CallDescription) => {
            console.log('someone is calling')
            console.log(data);

            if (data.type === 'invite') {
                let isAccepted = false;
                if (userCallingRef.current) {
                    // eslint-disable-next-line no-restricted-globals
                    isAccepted = confirm(
                        `User "${data.target}" wants to call you. Do accept this call?`
                    );

                    if (!isAccepted) {
                        reject();
                        return;
                    }
                    console.log('step 2')
                } else {
                    console.log('step 1')
                }

                setUserCalling(data.target);
                await peerConnection.setRemoteDescription(new RTCSessionDescription(data.offerOrAnswer));
                const answer = await peerConnection.createAnswer();
                await peerConnection.setLocalDescription(new RTCSessionDescription(answer));

                const offerOrAnswer = JSON.parse(JSON.stringify(answer));
                const answerData: I.CallDescription = {
                    target: data.target,
                    offerOrAnswer,
                    type: !isAccepted ? 'answer' : 'accept'
                }
                if(isAccepted){
                    api.call.accept(answerData);
                } else {
                    api.call.answer(answerData);
                }

            } else if (data.type === 'answer' || data.type === 'accept') {
                console.log('step 2/3');
                await peerConnection.setRemoteDescription(new RTCSessionDescription(data.offerOrAnswer));

                if (!isAnsweredRef.current) {
                    setIsAnswered(true);

                    const offer = await peerConnection.createOffer();
                    await peerConnection.setLocalDescription(new RTCSessionDescription(offer));

                    const offerOrAnswer = JSON.parse(JSON.stringify(offer));

                    api.call.make({ offerOrAnswer, target: data.target, type: 'invite' });
                }
            }
        })
    }, []);

    return <React.Fragment>
        {
            users.map(user => (
                <div className="user-call-button" onClick={() => call(user)}>
                    Call to {user.username}
                </div>
            ))
        }
        <video className="video-call-preview" autoPlay id="remote-video"></video>
        <video className="video-call-preview"autoPlay muted id="local-video"></video>
    </React.Fragment>
}

export default Video;