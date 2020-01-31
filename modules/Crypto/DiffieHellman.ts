import { fork } from "child_process";
import path from "path";

interface IKeys {
    gen: string;
    prime: string;
    private: string;
    public: string;
}

export const generateKeys = async (): Promise<IKeys> => {
    return new Promise((res, rej) => {
        const diffieHellman = fork(path.join(__dirname, "DiffieHellmanGenerator.js"));
        diffieHellman.on("message", (msg: { keys: IKeys }) => {
            res(msg.keys);
        });
        diffieHellman.on("exit", () => {
            res(null);
        });
    });
};
