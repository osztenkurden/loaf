import * as I from "./../interface";
import Loaf from "./LoafAPI";

export const api = {
    user: {
        authenticate: (authcode: number) => Loaf("auth/auth", "POST", { authcode }),
        fakeLogin: async () => {
            console.log("PROCEEDING FAKE LOGIN");
            const loginObject = {
                machineId: 1234,
                password: "LeMoni@da1",
                username: "osztenkurden",
            };
            const response = await Loaf("auth/login", "POST", loginObject);
            console.log(response);
            const res2 = await Loaf("auth/auth", "POST", { authcode: 322343});
            console.log(res2);
            console.log(await api.user.get());

        },
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
