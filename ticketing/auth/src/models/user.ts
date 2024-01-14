import mongoose from 'mongoose';
import { Password } from '../services/password';

//  An interface that describes the properties that are required to create a new User

interface UserAttrs {
  email: String;
  password: String;
}

//  An interface that describes the properties that a User Model has (User Model is the entire collection of data)
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the properties that a User Document has (User Document is a single user)
//  UserDoc will have all the properties of mongoose.Document plus the ones we define below
interface UserDoc extends mongoose.Document {
  email: String;
  password: String;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
});

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
