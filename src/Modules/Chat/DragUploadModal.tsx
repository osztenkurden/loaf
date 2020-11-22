import React, { Component } from "react";
import { CloudUpload } from "@material-ui/icons";
import { FilePayloadData } from './Chat';
import UploadImagePreview from './UploadImagePreview';

interface IProps {
    images: FilePayloadData[];
    setFiles: (files: FilePayloadData[]) => void;
    sendFiles: () => void;
}
interface IState {
    highlight: boolean;
}

export default class DragUploadModal extends Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            highlight: false
        };
    }

    public render() {
        const { images, sendFiles, setFiles } = this.props;
        return (
            <div className="drag-show" onClick={() => setFiles([])}>
                <div className={`drag-window ${images.length ? 'dropped' : ''}`} onClick={e => e.stopPropagation()}>
                    {images.length ? <UploadImagePreview
                        setFiles={setFiles}
                        sendFiles={sendFiles}
                        images={images}
                    /> : <div className='drag-window-content'>
                            <CloudUpload />
                            Drop your images here
                        </div>}
                </div>
            </div>
        );
    }

}
