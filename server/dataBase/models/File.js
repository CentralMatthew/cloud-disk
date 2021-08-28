const { Schema, model, ObjectId } = require('mongoose');
const { dbFileTable, dbUserTable } = require('../../constants/db.constants');

const File = new Schema({
  name: {
    type: String,
    required: true,
  },

  type: {
    type: String,
    required: true,
  },
  accessLink: {
    type: String,
  },
  size: {
    type: Number,
    default: 0,
  },
  path: {
    type: String,
    default: '',
  },
  user: {
    type: ObjectId,
    ref: dbUserTable,
  },
  parent: {
    type: ObjectId,
    ref: dbFileTable,
  },
  childs: [{ type: ObjectId, ref: dbFileTable }],
});

module.exports = model(dbFileTable, File);
