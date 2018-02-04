import * as bcrypt from "bcrypt-nodejs";
import * as mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  constituencies: [ { type: mongoose.Schema.Types.ObjectId, ref: "Constituency" } ],
  facebook: {
    email: String,
    id: String,
    name: String,
    token: String,
  },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
