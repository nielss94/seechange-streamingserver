const SHA256 = require('crypto-js/sha256');
const AES = require('crypto-js/aes');
const UTF8 = require('crypto-js/enc-utf8');

const assert = require('assert');

describe("Adding integrity to data", () => {

    beforeEach(() => {

    });

    it("can hash, encrypt and decrypt", () => {

        const data = "Hallo Rick";
        const key = '123';
        const fakeData = "Hallo Ricku";
        const hash = SHA256(data).toString();
        const fakeHash = SHA256(fakeData).toString();

        // Encrypted hash
        const cipherHash = AES.encrypt(SHA256(data).toString(), key);
        // Decrypted hash
        const plainHash = AES.decrypt(cipherHash, key).toString(UTF8);

        assert.notEqual(hash, fakeHash);
        assert.equal(hash, plainHash);
    });

    it('can\t be cracked with a different key', () => {

        const data = "Hallo Rick";
        const key = '123';
        const fakeKey = '12E';

        const hash = SHA256(data).toString();
        const cipherHash = AES.encrypt(hash.toString(), key);
        const plainHash = AES.decrypt(cipherHash, fakeKey).toString(UTF8);

        assert.notEqual(hash, plainHash);
    });
});