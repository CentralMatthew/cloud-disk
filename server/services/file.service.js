const path = require('path');
// const { promisify } = require('util');
const fs = require('fs');
// const uuid = require('uuid').v1;
//
// const mkDirPromise = promisify(fs.mkdir);
// const rmDirPromise = promisify(fs.rmdir);

module.exports = {
  dirBuilder: (file) => {
    try {
      const uploadPath = path.join(
        process.cwd(),
        'files',
        file.user.toString(),
        file.path.toString()
      );
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath);
      }
    } catch (e) {
      console.log(e);
    }
  },
};
