const { Schema, model, ObjectId } = require('mongoose');
const { dbUserTable } = require('../../constants/db.constants');

const userSchema = new Schema({
  diskSpace: {
    type: Number,
    default: 1024 ** 3 * 10,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  usedSpace: {
    type: Number,
    default: 0,
  },

  avatar: {
    type: String,
  },

  files: [
    {
      type: ObjectId,
      ref: 'file',
    },
  ],

  password: {
    type: String,
    required: true,
  },
});

module.exports = model(dbUserTable, userSchema);
