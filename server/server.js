const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const { PORT } = require('./constants/port.constants');
const { dbUrl } = require('./constants/db.constants');
const { authRouter, fileRouter} = require('./routes');
const {
  handleErrors: { handleErrors, notFoundHandler },
} = require('./services');

const app = express();

_moongoseConnector();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRouter);
app.use('/api/files', fileRouter);
app.use(handleErrors);
app.use('*', notFoundHandler);

app.listen(PORT, () => {
  console.log(`App listen ${PORT}`);
});

function _moongoseConnector() {
  mongoose.connect(dbUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  });
}
