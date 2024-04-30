'use strict'

const fs = require('fs');
const {createHash} = require('crypto')
require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;

function readFile(fileName) {
    if (!fs.existsSync(fileName)) {
        throw `${fileName} does not exist!`
    }
    try {
        var text = fs.readFileSync(fileName).toString('utf-8');
        var textByLine = text.split("\n");
        return textByLine;
    } catch (err) {
        console.log(err)
    }
}

const schema = new mongoose.Schema({
    user: String
})
// Define Mongoose model
const user_info = mongoose.model('user_info', schema);
async function writeFile(ar, fileName) {
    try {
        var res = ar.join("\n")
        fs.writeFileSync(fileName, res)
        //drop items into database
        await mongoose.connect(uri);
        console.log("Connected to db");

        let dbUsers = readFile(fileName);
        const userObjects = dbUsers.map(user => ({ user: user }));
        for (const userData of userObjects) {
            try {
                const user = new user_info(userData);
                await user.save();

                console.log("User saved:", user);
            } catch (error) {
                console.error("Error saving user:", error);
            }
        }

        console.log("All users saved.");
        /*
        user_info.create(dbUsers)
        .then(() => {
            console.log('Items uploaded successfully');
        })
        .catch((error) => {
            console.error('Error uploading items:', error);
        });
        */
        await mongoose.connection.close();
    } catch (err) {
        console.log(err)
    }
}

function hash(input) {
    return createHash('sha256').update(input).digest('hex'); // never use md5
}

module.exports = {readFile, writeFile, hash};