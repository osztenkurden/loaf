import * as I from "./../interface";
import Loaf from "./LoafAPI";

export const api = {
    user: {
        authenticate: (authcode: number): Promise<boolean | I.IServerError> => Loaf("auth/auth", "POST", { authcode }),
        fakeLogin: async () => {
            console.log("PROCEEDING FAKE LOGIN");
            const loginObject = {
                machineId: 1234,
                password: "",
                username: "osztenkurden",
            };
            const response = await Loaf("auth/login", "POST", loginObject);
            console.log(response);
            const res2 = await Loaf("auth/auth", "POST", { authcode: 405384});
            console.log(res2);

        },
        get: (): Promise<I.IUser | false> => Loaf("user"),
        // tslint:disable-next-line:max-line-length
        login: (body: {username: string, password: string, machineId: number}): Promise<boolean | I.IServerError> => Loaf("auth/login", "POST", body),
    },
};
