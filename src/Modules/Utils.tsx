import React from 'react';
import * as I from '../../modules/interface';
export function hashCode(str: string) { // java String#hashCode
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
       // tslint:disable-next-line:no-bitwise
       hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
}

export function textToRGB(i: string) {
    // tslint:disable-next-line:no-bitwise
    const c = (hashCode(i) & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();

    return "#" + "00000".substring(0, 6 - c.length) + c;
}

export function renderGallery(message: I.IMessageContentPackage[]){
    return <div>
        {message.map(payload => {
            if(payload.type === "image"){
                return <img src={`data:image/jpeg;base64,${payload.content}`} alt={'Upload'}/>
            }
            return null;
        })}
    </div>
}