const mongoose = require('mongoose');
const conn=require('../config.js')
const connection = mongoose.createConnection(conn.db.connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports=connection
