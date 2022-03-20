import React, { Component } from "react";
import { FilePayloadData } from './Chat';
import { bytesToString, questionMark } from './../Utils';
import { Cancel } from '@material-ui/icons';

interface IProps {
    images: FilePayloadData[];
    setFiles: (files: FilePayloadData[]) => void;
    sendFiles: () => void;
}

export default class DragUploadModal extends Component<IProps> {
    public render() {
        const { images, sendFiles } = this.props;
        return (
            <div className="upload-image-preview">
                <div className="upload-entries-preview">
                    {images.map(this.renderEntry)}
                </div>
                <div className="image-send btn-behaviour" onClick={sendFiles}>SEND</div>
            </div>
        );
    }
    private renderEntry = (file: FilePayloadData) => {
        const { images, setFiles } = this.props;
        return <div className="upload-entry-preview">
            <div className="preview-image-container">
                <div className="preview-image" style={{backgroundImage: file.data.startsWith('data:image') ? `url(${file.data})` : `url(data:image/jpeg;base64,${questionMark})`}}></div>
            </div>
            <div className="preview-data-container">
                <div className="preview-data-name">{file.name}</div>
                <div className="preview-data-size">{bytesToString(file.size)}</div>
            </div>
            <div className="preview-action-container">
                <div className="cancel-file" onClick={() => setFiles(images.filter(img => img !== file))}><Cancel /></div>
            </div>
        </div>
    }

}
