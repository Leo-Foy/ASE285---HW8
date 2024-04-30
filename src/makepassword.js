'use strict'
const fs = require('fs');
const {readFile, writeFile, hash} = require('./utility')

async function makepassword(passwordFileName, passwordEncFileName) {
    let encryptedPass;
    let storeHashed = [];
    const passwords = readFile(passwordFileName);
    for (let i =0; i < passwords.length; i++) {
        let array = passwords[i].split(':')
        encryptedPass = hash(array[1].trim());
        storeHashed.push(array[0] + ":" + encryptedPass)
    }
   await writeFile(storeHashed, passwordEncFileName);

}

if (require.main === module) {
    makepassword('./password.txt', './password.enc.txt')
}

module.exports = {makepassword};