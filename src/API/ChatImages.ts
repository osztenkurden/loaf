
import api from './';
import * as Loaf from "./Loaf";
interface ChatImage {
    loading: boolean;
    image: string | null;
}

class ChatImageStorage {
    images: Map<number, ChatImage>;
    constructor(onLoad?: () => void){
        this.images = new Map();
        Loaf.on("imageLoaded", (data: {id: number, image: string|null}) => {
            this.images.set(data.id, {loading:false, image:data.image});
            if(onLoad) onLoad();
        });
    }
    get(chatId: number){
        const img = this.images.get(chatId);
        if(!img) return this.load(chatId);
        if(img.loading){ return null};
        return img.image;
    }

    private load(chatId: number){
        this.images.set(chatId, {loading: true, image: null});
        api.chats.loadImage(chatId);
        return null;
    }
}


export default ChatImageStorage;
