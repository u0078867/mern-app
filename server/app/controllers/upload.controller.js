import path from 'path';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';
import config from '../../config';
import fs from 'fs';


export function uploadFile(req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');

  console.log(req.files)
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

  const data = JSON.stringify(req.body, null, 2);

  const fileName = cuid();

  fs.writeFile(path.join(config.workDir, fileName + '.json'), data, (err) => {
    if (err) {
      return res.status(500).send(err);
    };
    console.log("File has been created");
  });

  res.json({ data: data });
}
