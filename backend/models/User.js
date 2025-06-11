const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    userName: {type: String, required: true, unique:true},
    fullName: {type: String},
    password: {type: String, required: true},
    imageUrl :{type:String},
    email: {type: String, required: true},
    roleName: {type: String, enum: ["Admin", "Staff", "Manager","Doctor","Customer","Guest"]},
    // roleId: {type: Schema.Types.ObjectId, ref: 'Role'},
    phone: {type: String,default:""},
    address :{type: String, default:""},
    phoneNumber: { type: String, default:"" },
    isAnonymous: {type: Boolean, default: false},
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date, default: Date.now },
})
UserSchema.pre("save", async function (next) {
  if (this.isModified("Password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  if (this.email.includes("@doctor")) {
    this.roleName = "Doctor";
  } else if (this.email.includes("@user")) {
    this.roleName = "Customer";
  } else if(this.email.includes("@admin")) {
    this.roleName = "Admin";
  } else if(this.email.includes("@staff")){
    this.roleName = "Staff";
  } else {
    return next(new Error("Email must contain @doctor or @user or @admin or @staff"));
  }
  next();
});
module.exports = mongoose.model('User', UserSchema)

