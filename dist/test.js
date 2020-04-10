const libsignal = require('./modules/Breadcrumb/libsignal');
const Breadbox = require('./modules/Breadbox/LoafBreadbox').default;
const Keys = require('./modules/Breadbox/Keys');
const { SignalProtocolAddress, SessionCipher, SessionBuilder } = libsignal;


function getPreKey(store){
    for(let i in store.store){
        if(i.startsWith('25519KeypreKey')){
            return store.store[i];
        }
    }
    return null;
}

function getSignedPreKey(store){
    for(let i in store.store){
        if(i.startsWith('25519KeysignedKey')){
            return store.store[i];
        }
    }
    return null;
}

async function generatePreKey(store){
    const identityKeys = await store.getIdentityKeyPair();
    const preKey = getPreKey(store);
    const signedPreKey = getSignedPreKey(store)
    return {
        identityKey: identityKeys.pubKey,
        registrationId: await store.getLocalRegistrationId(),
        preKey: {
            keyId: preKey.keyId,
            publicKey: preKey.pubKey
        },
        signedPreKey: {
            keyId: signedPreKey.keyId,
            publicKey: signedPreKey.pubKey,
            signature: signedPreKey.signature
        }
    }
}

const aliceAddress = new SignalProtocolAddress("xx",1);
const bobAddress = new SignalProtocolAddress("yy",2);

const aliceStore = new Breadbox();
const bobStore = new Breadbox();

const main = async () => {
    await aliceStore.init();
    await bobStore.init();

    const bobsBundle = await generatePreKey(bobStore);
    const builder = new SessionBuilder(aliceStore, bobAddress);
    await builder.processPreKey(bobsBundle);


    async function sendToBob(text, first){
        const aliceCipher = new SessionCipher(aliceStore, bobAddress);
        const bobCipher = new SessionCipher(bobStore, aliceAddress);
        const cipherText = await aliceCipher.encrypt(text);
        let decrypted;
        console.log(cipherText)
        if(cipherText.type === 3){
            decrypted = await bobCipher.decryptPreKeyWhisperMessage(cipherText.body, 'binary');
        } else {
            decrypted = await bobCipher.decryptWhisperMessage(cipherText.body, 'binary');
        }
        const plain = Buffer.from(decrypted).toString();
        console.log('ALICE SEND TO BOB: '+text +', BOB RECEIVED: ' +plain);
    }
    async function sendToAlice(text, first){
        const aliceCipher = new SessionCipher(aliceStore, bobAddress);
        const bobCipher = new SessionCipher(bobStore, aliceAddress);
        const cipherText = await bobCipher.encrypt(text);
        let decrypted;
        if(cipherText.type === 3){
            decrypted = await aliceCipher.decryptPreKeyWhisperMessage(cipherText.body, 'binary');
        } else {
            decrypted = await aliceCipher.decryptWhisperMessage(cipherText.body, 'binary');
        }
        const plain = Buffer.from(decrypted).toString();
        console.log('BOB SEND TO BOB: '+text +', ALICE RECEIVED: ' +plain);
    }
    try {

        await sendToBob("A")
        sendToBob("Ac")
    } catch(e){
        console.log(e)
    }
    //sendToBob("A3")
/*

    text = 'message1';

    cipherText = await aliceCipher.encrypt(text);
    decrypted = await bobCipher.decryptPreKeyWhisperMessage(cipherText.body, 'binary');
    text = Buffer.from(decrypted).toString();
    console.log(text)

    console.log('HM')*/
}

main();

/*
var KeyHelper = libsignal.KeyHelper;

function generateIdentity(store) {
    return Promise.all([
        KeyHelper.generateIdentityKeyPair(),
        KeyHelper.generateRegistrationId(),
    ]).then(function(result) {
        store.put('identityKey', result[0]);
        store.put('registrationId', result[1]);
    });
}

function generatePreKeyBundle(store, preKeyId, signedPreKeyId) {
    return Promise.all([
        store.getIdentityKeyPair(),
        store.getLocalRegistrationId()
    ]).then(function(result) {
        var identity = result[0];
        var registrationId = result[1];

        return Promise.all([
            KeyHelper.generatePreKey(preKeyId),
            KeyHelper.generateSignedPreKey(identity, signedPreKeyId),
        ]).then(function(keys) {
            var preKey = keys[0]
            var signedPreKey = keys[1];

            store.storePreKey(preKeyId, preKey.keyPair);
            store.storeSignedPreKey(signedPreKeyId, signedPreKey.keyPair);

            return {
                identityKey: identity.pubKey,
                registrationId : registrationId,
                preKey:  {
                    keyId     : preKeyId,
                    publicKey : preKey.keyPair.pubKey
                },
                signedPreKey: {
                    keyId     : signedPreKeyId,
                    publicKey : signedPreKey.keyPair.pubKey,
                    signature : signedPreKey.signature
                }
            };
        });
    });
}

var ALICE_ADDRESS = new libsignal.SignalProtocolAddress("xxxxxxxxx", 1);
var BOB_ADDRESS   = new libsignal.SignalProtocolAddress("yyyyyyyyyyyyy", 1);

    var aliceStore = new libsignal.SignalProtocolStore();

    var bobStore = new libsignal.SignalProtocolStore();
    var bobPreKeyId = 1337;
    var bobSignedKeyId = 1;

    var Curve = libsignal.Curve;

        Promise.all([
            generateIdentity(aliceStore),
            generateIdentity(bobStore),
        ]).then(function() {
            return generatePreKeyBundle(bobStore, bobPreKeyId, bobSignedKeyId);
        }).then(function(preKeyBundle) {
            var builder = new libsignal.SessionBuilder(aliceStore, BOB_ADDRESS);
            return builder.processPreKey(preKeyBundle).then(function() {

              var originalMessage = util.toArrayBuffer("my message ......");
              var aliceSessionCipher = new libsignal.SessionCipher(aliceStore, BOB_ADDRESS);
              var bobSessionCipher = new libsignal.SessionCipher(bobStore, ALICE_ADDRESS);

              aliceSessionCipher.encrypt(originalMessage).then(function(ciphertext) {

                  // check for ciphertext.type to be 3 which includes the PREKEY_BUNDLE
                  return bobSessionCipher.decryptPreKeyWhisperMessage(ciphertext.body, 'binary');

              }).then(function(plaintext) {

                  alert(plaintext);

              });

              bobSessionCipher.encrypt(originalMessage).then(function(ciphertext) {

                  return aliceSessionCipher.decryptWhisperMessage(ciphertext.body, 'binary');

              }).then(function(plaintext) {

                  assertEqualArrayBuffers(plaintext, originalMessage);

              });

            });
        });*/