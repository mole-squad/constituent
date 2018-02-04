import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt-nodejs'

const UserSchema = mongoose.Schema({
  facebook: {
    id: String,
    token: String,
    name: String,
    email: String
  },
  constituencies: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Constituency' } ]
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);
export default User;