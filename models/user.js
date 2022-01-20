const connection=require('../database/databaseConnection')

const UserSchema = new mongoose.Schema({
    username: String,
    hash: String,
    salt: String,
	Admin:Boolean
});

const User = connection.model('User', UserSchema);

module.exports=User;