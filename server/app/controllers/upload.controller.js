import path from 'path';
import cuid from 'cuid';
import slug from 'slug';
import sanitizeHtml from 'sanitize-html';
import config from '../../config';
import fs from 'fs';
import promisify from 'es6-promisify';
import Models from 'MODELS_PATH/entity';
import postUpdate from 'API_PATH/hooks/post_update';


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
  let filePath = null;
  let isNew = false;
  var Model;

  Promise.resolve()
  .then(() => {
    if (subm.form.insert_on_submit) {
      // Insert in target collection
      var collection = subm.form.dest_collection;
      if (!(collection in Models)) {
        //return res.status(500).send("Collection does not exist");
        throw new Error("Collection does not exist");
      }
      Model = Models[collection];
      return Promise.resolve()
      .then(() => {
        if (subm.data.cuid == undefined) {
          //throw new Error('');
          console.log('creating new document')
          isNew = true;
          return Model.createAndInit();
        } else {
          console.log('updating document')
          return Model.get(subm.data.cuid);
        }
      })
      .then(newDoc => {
        if (subm.data.cuid) {
          if (!newDoc.history) newDoc.history = [];
          var doc = {};
          for (var prop of Object.keys(newDoc)) {
            if (!['model','__originalData__','schema','history'].includes(prop)) {
              if (newDoc[prop]) {
                doc[prop] = newDoc[prop];
              }
            }
          }
          newDoc.history.push(doc);
          newDoc.date_added = subm.date_added;
        }
        newDoc.slug = slug(`${collection}`, { lowercase: true });
        for (var prop in subm.data) {
          if (['cuid','slug','date_added','history'].includes(prop)) continue;
          if (prop in newDoc) {
            newDoc[prop] = subm.data[prop];
          }
        }
        for (var prop of Object.keys(newDoc)) {
          if (!(prop in subm.data) && !['model','__originalData__','schema','cuid','slug','date_added','history'].includes(prop)) {
            newDoc[prop] = undefined;
          }
        }
        if (!subm.validate_before_insert) {
          Model.disableValidation();
        }
        return newDoc.save();
      })
      .then(saved => {
        if (!subm.validate_before_insert) {
          Model.enableValidation();
        }
        return { saved };
      })
    } else {
      return {};
    }
  })
  .then(obj => {
    // Write to JSON file for later insertion
    if (obj.saved) {
      subm.saved = obj.saved;
    }
    const stringData = JSON.stringify(subm, null, 2);
    const fileName = cuid();
    filePath = path.posix.join(config.workDir, fileName + '.json');
    let writeFile = promisify(fs.writeFile);
    return writeFile(filePath, stringData);
  })
  .then(() => {
    console.log("File has been created");
  })
  .then(() => {
    if (!isNew) {
      return postUpdate(subm.saved, Model.getName());
    }
  })
  .then(() => {
    let result = {
      file: filePath,
      data: subm
    }
    //res.download(filePath);
    res.json(result);
  })
  .catch(err => {
    console.log(err)
    res.status(500).send(err);
  })

}
