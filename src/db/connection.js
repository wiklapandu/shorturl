// ! to using env
require('dotenv').config();

// * call mongoose library
const mongoose = require('mongoose');

const DB_URL = process.env.NODE_DB || 'mongodb://127.0.0.1:27017/shorturl';

mongoose.connect(DB_URL)
    .then(() => {
        console.log('berhasil connect')
    })
    .catch((err) => {
        console.log(`gagal connect karena ${err}`)
    })