const path = require('path');
const { File } = require('../dataBase');
const { fileService } = require('../services');
const { statusCode } = require('../constants');

module.exports = {
  createDir: async (req, res, next) => {
    try {
      const { name, type, parent } = req.body;
      const file = new File({ name, type, parent, user: req.user.id });
      const parentFile = await File.findOne({ _id: parent });
      if (!parentFile) {
        file.path = name;
        await fileService.dirBuilder(file);
      } else {
        file.path = path.join(parentFile.path, file.name);
        await fileService.dirBuilder(file);
        parentFile.childs.push(file._id);
        await parentFile.save();
      }
      await file.save();
      res.json(file).status(statusCode.CREATED);
    } catch (e) {
      next(e);
    }
  },

  getFiles: async (req, res, next) => {
    try {
      const { id } = req.user;
      const { parent } = req.query;
      const files = await File.find({ user: id, parent });
      res.json(files).status(statusCode.OK);
    } catch (e) {
      next(e);
    }
  },
};
