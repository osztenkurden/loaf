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
        register: async (payload: I.IRegisterPayload) => {
            const response = await Loaf("auth/register", "POST", payload);
            //TODO: Add secret token processing for TOTP
            return response.data || response.success;
        }
    },
    messages:  {
      //  
    }
};
