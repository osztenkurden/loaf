import React from 'react';
import * as I from '../../modules/interface';
import { Audiotrack } from "@material-ui/icons";

export function hashCode(str: string) { // java String#hashCode
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        // tslint:disable-next-line:no-bitwise
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
}
export const questionMark = 'iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0CAQAAAD+k96sAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfkAg8WFhR9Sw5qAAAD4klEQVR42u2bTWhVRxSAv/jEkPeoxp+ApqGgtMFoRKORRCzSRcG0Cy0tuCh0WySCdtdEKuJGrcSFIAhtQcGAFFpL4kLQ2ig1pC30h9dU8AeiRpqfFqttjTGa3C4erUWomXPvnXvvKecbyGrezHyZmXfPnDsPDMMwDCN2yry2nmcVK3iOGmqoJk8FFVQwxQPGGed3hhhmiBv08xO/aBStpIWNrGUpOefPjPI1PfRQZErDCplNK1/wkCB0GeUIGzyvtIg08CF/RlD8dxlkJ/OyKLmKrpgUH5d7HGZRliSr+Zip2DVL5Q/aKc/Gt/ZW7nqS/LtcoyltzQV87lmyVB7Sxoz0NNdwIxHNUvkkrSX8KvcT1AwIOM+c5DU38SBhzYCAPiqSns2JFDQDAj4Lu1dzIT5Tz+mk/7P/sJRZnEvqm/Z6SrNZKpOsT0b001Q1S8/VvH/Nt1LXDAho8605n98yIXqbSunQZ4pq75J3AMA4PVzkO64zzBhlzKWS+aykmWZeCNHeXHawx998Lgn17LxCK4WntNrIsRChx6DPkPCDEMN53WlAz3JG3HaLv/05JhxKp2Chl7GDR6LWj/sSbRdqbhf3sIVJQftDvkSviDTfCdXHe6I+lvnJB0mG8H7IXnJ8K+jlbR+i+wUD6I9wcmwR9HPQh+iPzt0/ojFST9ecezoVv2aVIPnVGbGvA4KVI8DtsfuSIKHcEVH0onPNOfGLumfhivwQUfSyc81n4hetd26vO/I2+dm5ZiF+0RXO7V2ILDrmXFP0Mmqm4x4tUKBAftq/xcii7vN0P37Rqwlmhdzj4zvxL91k01+u3NItutq55oBu0c3ONb9HMbWCWHe9ZtETggRZTq/mi4KY+qhezdkMCBbuGq2aM+gWaPbqnc8OUQ5ji1bNXSLN3mzfQ/pv9oo0JwSnqQxRzjFhInWfRs2F9Ak1v2SWPs1Gbgk1B6jSp7mNcaHmHUEKICNUclL8WulXfUFCU4h7EEMs16bZGuI9az9LdEnm6QzxMrlLltpMnxqKIa7b7NEWB9WG2JkjvKxtZzYwItY8l60b2C6sE19fnuDdDGa0pmEZt4WalzUerKu4KdT8SPZeJSuZg7PCMO8NnWdN2W2WIs/r1KwTBe4nkri36YfzAs1DWhMk8JpAc7fevF4ZlwSzqZhXBBdpcppFTztq3tR2Nnkyh+D6K9LNqOZN57Omco46ijZoF3U7Yn+TXCTqh3LqnOp1axdd7Hix5yvtotWO9S5pF3VLgQSMYhiGYRiGYRh+8JVJDVIfQUJBfeYwURM1URM1URM1URM1URM1URM1URM1URM1DOP/zl+IROP1bg+NpwAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMC0wMi0xNVQyMjoyMjoyMCswMDowMBpZaTEAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjAtMDItMTVUMjI6MjI6MjArMDA6MDBrBNGNAAAAAElFTkSuQmCC';
export function textToRGB(i: string) {
    // tslint:disable-next-line:no-bitwise
    const c = (hashCode(i) & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();

    return "#" + "00000".substring(0, 6 - c.length) + c;
}

export function renderGallery(message: I.IMessageContentPackage[]) {
    const isFile = (file: I.IMessageContentPackage): file is I.IMessageContentFile => file.type === "file";
    return <div>
        {message.filter(isFile).map(payload => {
            const fileData = payload.content.data;
            if (fileData.startsWith("data:image")) {
                return <img src={fileData} alt={'Upload'} />
            }
            const fileType = fileData.substr(fileData.indexOf(':')+1, fileData.indexOf('/')-fileData.indexOf(':')-1);
            if(fileType === "audio") {
                return <Audiotrack />
            }
            return <img src={`data:image/jpeg;base64,${questionMark}`} alt={'Upload'} data-fileType={fileType} />
        })}
        {message.filter(payload => payload.type === "text").map(payload => <p>{payload.content}</p>)}

    </div>
}

export function bytesToString(bytes: number) {
    function toHigherOrder(lowerBytes: number) {
        return (lowerBytes / 1024);
    }

    const units = ["B", "KB", "MB", "GB", "TB"];

    for (const unit of units) {
        if (bytes < 1024) {
            return `${bytes.toFixed(1)} ${unit}`;
        }
        bytes = toHigherOrder(bytes);
    }

    return `${bytes.toFixed(1)} PB`;
}