const fs = require('fs');

const createFolder = (filePath) => {
  try {
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath);
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  createFolder
};
