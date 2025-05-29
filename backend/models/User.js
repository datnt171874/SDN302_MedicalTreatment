const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    userName: {type: String, required: true, unique:true},
    fullName: {type: String, required: true},
    password: {type: String, required: true},
    imageUrl :{type:String},
    email: {type: String, required: true},
    roleName: {type: String, enum: ["Admin", "Staff", "Manager","Doctor","Customer","Guest"]},
    roleId: {type: Schema.Types.ObjectId, ref: 'Role'},
    phone: {type: String},
    address :{type: String},
    phoneNumber: { type: String },
    isAnonymous: {type: Boolean, default: false},
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date, default: Date.now },
})
module.exports = mongoose.model('User', UserSchema)

