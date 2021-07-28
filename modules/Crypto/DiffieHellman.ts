import { fork } from "child_process";
import path from "path";
import * as I from "../interface";



export const generateKeys = async (): Promise<I.IKeyPackage | I.IDebugKeys | null> => {
    return new Promise((res, rej) => {
        if(process.env.DEVUSER1){
            const keys = {
                token:'JBSWY3DPEHPK3PXP'
            }
            return res(keys);
        }
        if(process.env.DEVUSER2){
            const keys = {
                token:'JBSWY3DPEHPK3PXX'
            }
            return res(keys);
        }
        if(process.env.DEVUSER3){
            const keys = {
                token:'JBSWY3DPEHPK3PXY'
            }
            return res(keys);
        }
        const diffieHellman = fork(path.join(__dirname, "DiffieHellmanGenerator.js"));
        diffieHellman.on("message", (msg: { keys: I.IKeyPackage }) => {
            res(msg.keys);
        });
        diffieHellman.on("exit", () => {
            res(null);
        });
    });
};
