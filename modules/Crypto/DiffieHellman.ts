import { fork } from "child_process";
import path from "path";

interface IKeys {
    gen: string;
    prime: string;
    private: string;
    public: string;
}

interface IDebugKeys {
    token: string
}
export const generateKeys = async (): Promise<IKeys | IDebugKeys> => {
    return new Promise((res, rej) => {
        if(process.env.DEVUSER1){
            const keys: IDebugKeys = {
                token:'JBSWY3DPEHPK3PXP'
            }
            return res(keys);
        }
        if(process.env.DEVUSER2){
            const keys: IDebugKeys = {
                token:'JBSWY3DPEHPK3PXX'
            }
            return res(keys);
        }
        if(process.env.DEVUSER3){
            const keys: IDebugKeys = {
                token:'JBSWY3DPEHPK3PXY'
            }
            return res(keys);
        }
        const diffieHellman = fork(path.join(__dirname, "DiffieHellmanGenerator.js"));
        diffieHellman.on("message", (msg: { keys: IKeys }) => {
            res(msg.keys);
        });
        diffieHellman.on("exit", () => {
            res(null);
        });
    });
};
