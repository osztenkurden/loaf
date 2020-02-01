import * as I from "./../interface";
import Loaf from "./LoafAPI";

interface IRegisterResponse {
    publicKey: Buffer;
    id: number;
}

export const api = {
    messages:  {
      //
    },
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
            if (!response.success) {
                return null;
            }
            if (response.data && response.data.publicKey) {
                response.data.publicKey = Buffer.from(response.data.publicKey, "hex");
            }
            return response.data as IRegisterResponse;
        },
    },
};
