import * as I from "./../interface";
import Loaf from "./LoafAPI";

export const api = {
    user: {
        authenticate: (authcode: number, machineName: string) => Loaf("auth/auth", "POST", { authcode, machineName }),
        get: async (): Promise<I.IUser | null> => {
            const res = await Loaf("auth");
            if (res.data && res.success) {
                return res.data;
            }
            return null;
        },
        // tslint:disable-next-line:max-line-length
        login: (body: {username: string, password: string, machineId: number}) => Loaf("auth/login", "POST", body),
    },
};
