const mongoose =  require('mongoose');
const bcrypt = require('bcrypt');

mongoose.connect('mongodb://localhost:27017/Community');
const userSchema = new mongoose.Schema({
    empCode : {type:String,unique : true,required:true,trim:true},
    email : {type:String,unique:true,required:true,trim : true},
    password : {type:String,required:true}
});
// hashing the password befor saving in db 
userSchema.pre('save', async function(next) {
    const user = this;
    if (user.isModified('password') || user.isNew) {
      try {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        next();
      } catch (err) {
        next(err);
      }
    } else {
      next();
    }
  });

userSchema.methods.comparePassword = async (password)=>{
    return bcrypt.compare(password,this.password);
}

module.exports = mongoose.model('User',userSchema);