const mongoose = require('mongoose')
const colors = require('colors')

const db = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('Connected to the Database'.bgMagenta
        .white);
    } catch (error) {
        console.log('Error: ', error)
    }
}

module.exports = db;