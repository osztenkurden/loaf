import React, { Component } from "react";
import { ImagePayloadData } from './Chat';
import { bytesToString } from './../Utils';

interface IProps {
    images: ImagePayloadData[];
    setImages: (images: ImagePayloadData[]) => void;
    sendImages: () => void;
}

export default class DragUploadModal extends Component<IProps> {
    public render() {
        const { images, sendImages } = this.props;
        return (
            <div className="upload-image-preview">
                <div className="upload-entries-preview">
                    {images.map(this.renderEntry)}
                </div>
                {/*images.map(src => <img src={`data:image/jpeg;base64,${src.data}`} className="drag-file-img-preview" alt={'Preview'} />)*/}
                <div onClick={() => null}>SEEEND</div>
            </div>
        );
    }
    private renderEntry = (image: ImagePayloadData) => {
        return <div className="upload-entry-preview">
            <div className="preview-image-container">
                <div className="preview-image" style={{backgroundImage:`url(data:image/jpeg;base64,${image.data})`}}></div>
            </div>
            <div className="preview-data-container">
                <div className="preview-data-name">{image.name}</div>
                <div className="preview-data-size">{bytesToString(image.size)}</div>
            </div>
            <div className="preview-action-container">

            </div>
        </div>
    }

}
