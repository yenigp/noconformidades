var crypto = require('crypto');
var jwt = require('jsonwebtoken');

module.exports = {
    generateHash: generateHash,
    cipher: cipher,
    decipher: decipher
}

function generateHash(string, secret) {
    const hash = crypto.createHmac('sha256', secret)
        .update(string)
        .digest('hex');
    return hash;
}

function cipher(json, secret) {
    var ciphered = jwt.sign({
        data: {
            json: json,
            random: Math.random()
        }
    }, secret, {});
    return ciphered;
}

function decipher(ciphered, secret) {
    try {
        var decoded = jwt.verify(ciphered,
            secret,
            {})
        return {
            error: false,
            json: decoded.data.json
        }
    } catch (error) {
        return {
            error: error,
            json: {}
        }
    }
}