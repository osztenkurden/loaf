import crypto from "crypto";

const diffiehellman = crypto.createDiffieHellman(2048);
diffiehellman.generateKeys("hex");

const keyData = {
    generator: diffiehellman.getGenerator("hex"),
    prime: diffiehellman.getPrime("hex"),
    private: diffiehellman.getPrivateKey("hex"),
    public: diffiehellman.getPublicKey("hex"),
};

if (process && process.send) {
    process.send({ keys: keyData });
}
