import React, { Component } from "react";
import { CloudUpload } from "@material-ui/icons";
import { ImagePayloadData } from './Chat';
import UploadImagePreview from './UploadImagePreview';

interface IProps {
    images: ImagePayloadData[];
    setImages: (images: ImagePayloadData[]) => void;
    sendImages: () => void;
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

    allow = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    }

    whileOver = (evt: React.DragEvent<HTMLDivElement>) => {
        let highlight = false;
        if (evt.type === "dragenter" || evt.type === "dragover") {
            highlight = true;
        }
        if (this.state.highlight !== highlight) {
            this.setState({ highlight })
        }
    }

    drop = (evt: React.DragEvent<HTMLDivElement>) => {
        evt.preventDefault();
        if (evt.dataTransfer)
            this.handleImages(evt.dataTransfer.files);

        this.setState({ highlight: false });
    }

    public handleImages = (files: FileList) => {
        if (!files || !files.length) return;
        const images: ImagePayloadData[] = [];

        const readFile = (index: number, file?: File) => {
            if (file && !file.type?.startsWith("image/")) {
                return;
            }
            if (!file) {
                return this.props.setImages(images);
            }
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                if (typeof reader.result !== "string") {
                    return readFile(index + 1, files[index + 1]);;
                }
                const img = reader.result.replace(/^data:([a-z]+)\/([a-z0-9]+);base64,/, '');

                images.push({
                    data: img,
                    name: file.name,
                    size: file.size,
                });
                return readFile(index + 1, files[index + 1]);
            }
        }

        readFile(0, files[0]);
    }

    public render() {
        const { images, sendImages, setImages } = this.props;
        return (
            <div className="drag-show">
                <div className="drag-window">
                    {images.length ? <UploadImagePreview
                        setImages={setImages}
                        sendImages={sendImages}
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
