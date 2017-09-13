import path from 'path';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';
import config from '../../config';
import fs from 'fs';
import Models from 'MODELS_PATH/entity';


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
        var collection = subm.form.dest_collection;
        if (!(collection in Models)) {
          return res.status(500).send("Collection does not exist");
        }
        var Model = Models[collection];
        Promise.resolve()
        .then(() => {
          if (subm.data.cuid == undefined) {
            console.log('creating new document')
            return Model.createAndInit();
          } else {
            console.log('updating document')
            return Model.get(subm.data.cuid);
          }
        })
        .then(newDoc => {
          newDoc.slug = slug(`${collection}`, { lowercase: true });
          for (var prop in subm.data) {
            newDoc[prop] = subm.data[prop];
          }
          return newDoc.save();
        })
        .then(saved => {
          //console.log(saved);
          resolve({ saved });
        })
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
