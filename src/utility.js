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
    } catch (err) {
        console.log(err)
    } finally {
        await mongoose.connection.close();
    }
}

async function checkCredentials(filename, email, password){
    await mongoose.connect(uri);
    console.log("Reading database");
    try{
        const hashedPassword = hash(password);
        const user = await user_info.findOne({ user: `${email}:${hashedPassword}` });

        if (user) {
            console.log("true");
        } else {
            console.log("false");
        }
    }catch (error){
        console.log(error);
    }finally {
        await mongoose.connection.close();
    }
}

function hash(input) {
    return createHash('sha256').update(input).digest('hex'); // never use md5
}

module.exports = {readFile, writeFile, checkCredentials, hash};