
import api from './';
import * as Loaf from "./Loaf";
interface ChatImage {
    loading: boolean;
    image: string | null;
}

class ChatImageStorage {
    images: Map<number, ChatImage>;
    onLoad?: () => void;
    constructor(){
        this.images = new Map();
        this.onLoad = () => {}
        Loaf.on("imageLoaded", (data: {id: number, image: string|null}) => {
            const imageUrl = data.image ? data.image + `?cache=${new Date().getTime()}` : null
            this.images.set(data.id, {loading:false, image:imageUrl});
            if(this.onLoad) this.onLoad();
        });
        Loaf.on("updatedChat", (data: { chatId: number, data: any }) => {
            api.chats.loadImage(data.chatId, true);
        });
    }
    set(onLoad: () => void){
        this.onLoad = onLoad;
        return this;
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
const storage = new ChatImageStorage();
export default storage;

export { ChatImageStorage };
