const { Schema, model } = require('mongoose');
const { dbUserTable, dbOAuthTable } = require('../../constants/db.constants');

const oAuthSchema = new Schema(
  {
    access_token: {
      type: String,
      required: true,
    },

    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: dbUserTable,
    },
  },
  { timestamps: true }
);

oAuthSchema.pre('findOne', function () {
  this.populate('user');
});

module.exports = model(dbOAuthTable, oAuthSchema);
