import path from 'path';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';
import config from '../../config';
import fs from 'fs';
import mongoose from 'mongoose';


export function uploadFile(req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');

  //console.log(req.files)
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.file;

  // Use the mv() method to place the file somewhere on your server
  const newFileName = cuid();
  sampleFile.mv(path.join(config.workDir, newFileName), function(err) {
    if (err)
      return res.status(500).send(err);

    res.json({ newFileName });
  });
}

export function uploadData(req, res) {

  let subm = req.body;

  Promise.resolve()
  .then(() => new Promise((resolve, reject) => {
      if (subm.form.insert_on_submit) {
        // Insert in target collection
        let models = mongoose.connection.models;
        let model = Object.keys(models).filter(m => {
          return models[m].collection.collectionName == subm.form.dest_collection
        })[0];
        const TargetModel = models[model];
        const newDoc = new TargetModel(subm.data);
        newDoc.slug = slug(`${model}`, { lowercase: true });
        newDoc.save((err, saved) => {
          if (err) {
            return reject(err);
          }
          resolve({ saved });
        });
      } else {
        resolve({ });
      }
  }))
  .then(obj => new Promise((resolve, reject) => {
    // Write to JSON file for later insertion
    if (obj.saved) {
      subm.saved = obj.saved;
    }
    const stringData = JSON.stringify(subm, null, 2);
    const fileName = cuid();
    fs.writeFile(path.join(config.workDir, fileName + '.json'), stringData, (err) => {
      if (err) {
        return reject(err);
      };
      console.log("File has been created");
      obj.fileName = fileName;
      resolve(obj);
    });
  }))
  .then(obj => {
    res.json(obj);
  })
  .catch(err => {
    console.log(err)
    res.status(500).send(err);
  })

}
