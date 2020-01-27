import Loaf from "./LoafAPI";

export const api = {
    user: {
        get: () => Loaf("user"),
    },
};
