//importing mongoose package
const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  fileName: {
    type: String
  },
  filePath : {
    type:String
  },
  file: {
    type: String
  }
}, {
  timestamps: true
});

//setting the model
const files = mongoose.model("files", fileSchema);

module.exports = files;