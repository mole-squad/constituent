import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt-nodejs'

import User from './user';

const ConstituencySchema = mongoose.Schema({
  title: String,
  children: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Constituency', unique: true } ],
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Constituency' },
  members: [ { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true } ]
});

ConstituencySchema.methods.getConstituents = function() {
  return new Promise((resolve, reject) => {
    if (this.children.length) {
      Constituency.find({ '_id': { $in: this.children } }, (err, children) => {
        if (err) return reject(err);

        const promises = children.map(aChild => aChild.getConstituents());

        Promise.all(promises).then(members => {
          resolve([].join.apply(members));
        });
      });
    } else {
      User.find({ '_id': { $in: this.members } }, (err, members) => {
        if (err) return reject(err);
        resolve(members);
      });
    }
  });
};

ConstituencySchema.methods.join = function(user) {
  return new Promise((resolve, reject) => {
    // TODO recursively search child constituencies

    this.members.push(user._id);
    user.constituencies.push(this._id);
    
    this.save((err) => {
      if (err) return reject(err);

      user.save();
      resolve(true);
    });
  });
};

ConstituencySchema.methods.serialize = function() {
  return {
    title: this.title
  };
}

const Constituency = mongoose.models.Constituency || mongoose.model('Constituency', ConstituencySchema);

export default Constituency;

