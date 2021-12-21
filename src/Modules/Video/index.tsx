import React, { useEffect, useState } from "react";

import * as Loaf from "./../../API/Loaf";
import * as I from "./../../../modules/interface";
import api from "./../../API";
import useStateRef from "API/useRefState";

let peerConnection: RTCPeerConnection | null = null;
let mediaStream: MediaStream |  null = null;

interface IProps {
    users: I.IUser[];
}


const Video = ({ users }: IProps) => {
    const [isCalling, setCalling] = useState(false);
    const [_userCalling, setUserCalling, userCallingRef] = useStateRef('');
    const [_isAnswered, setIsAnswered, isAnsweredRef] = useStateRef(false)
    const call = async (user: I.IUser) => {
        if (!peerConnection || isCalling || !user.id) {
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

    const closeConnection = () => {
        const remoteVideo = document.getElementById('remote-video');
        if(!remoteVideo) return;

        (remoteVideo as any).srcObject = null;
        if(!peerConnection) {
            initiateVideoTransmission();
            return;
        }

        peerConnection.close();

        if(peerConnection.iceConnectionState === 'closed') {
            initiateVideoTransmission();
            return;
        };
    }

    const reject = () => {
        if(!userCallingRef.current) return;
        setCalling(false);
        setUserCalling('');
        setIsAnswered(false);

        closeConnection();

        api.call.reject();
    }

    const initYourCamera = async () => {
        if(!peerConnection) return;
        const pc = peerConnection;

        try {
            if(!mediaStream){
                mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, /*audio: true*/ });
            }
            const localVideo = document.getElementById("local-video");
            if(localVideo){
                (localVideo as any).srcObject = mediaStream;
            }

            mediaStream.getTracks().forEach(track => pc.addTrack(track, mediaStream as MediaStream));
        } catch(e) {
            console.log(e);
        }
    }

    const initiateVideoTransmission = () => {
        peerConnection = new RTCPeerConnection();

        peerConnection.ontrack = ({ streams: [stream] }) => {
            const remoteVideo = document.getElementById('remote-video');
            if(!remoteVideo) return;

            (remoteVideo as any).srcObject = stream;
        }
        peerConnection.oniceconnectionstatechange = (ev) => {
            if(!peerConnection) return;

            const state = peerConnection.iceConnectionState;
            if(state === 'closed'){
                // closeConnection();
            }
        }

        initYourCamera();
    }

    useEffect(() => {
        initiateVideoTransmission();

        Loaf.on('call-rejected', () => {
            console.log('call closed')
            reject();
        });
        Loaf.on('call-failed', () => {
            reject();
        });
        Loaf.on("call-offer", async (data: I.CallDescription) => {
            console.log('someone is calling')
            console.log(data);
            if(!peerConnection) return;

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
                console.log('step 2/3', data.type);
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
        <video className="video-call-preview" autoPlay muted id="local-video"></video>
    </React.Fragment>
}

export default Video;