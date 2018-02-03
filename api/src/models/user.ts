import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt-nodejs'

const UserSchema = mongoose.Schema({
  local: {
    email: String,
    password: String,
  },
  facebook: {
    id: String,
    token: String,
    name: String,
    email: String
  }
  // google: {
  //   id: String,
  //   token: String,
  //   email: String,
  //   name: String
  // }
});

// UserSchema.methods.generateHash = function(password) {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// };

// UserSchema.methods.validPassword = function(password) {
//     return bcrypt.compareSync(password, this.local.password);
// };


const User = mongoose.models.User || mongoose.model('User', UserSchema);
export default User;