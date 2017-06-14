import Form from '../models/form';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';
import config from '../config';

/**
 * Get all forms
 * @param req
 * @param res
 * @returns void
 */
export function getForms(req, res) {
  Form.find().sort('-dateAdded').exec((err, forms) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ forms });
  });
}

/**
 * Save a form
 * @param req
 * @param res
 * @returns void
 */
export function addForm(req, res) {
  if (!req.body.form.title ||
      !req.body.form.json_schema ||
      !req.body.form.ui_schema ||
      !req.body.form.init_data) {
    res.status(403).end();
  }

  const newForm = new Form(req.body.form);

  // Let's sanitize inputs
  newForm.title = sanitizeHtml(newForm.title);
  newForm.json_schema = JSON.parse(newForm.json_schema);
  newForm.ui_schema = JSON.parse(newForm.ui_schema);
  newForm.init_data = JSON.parse(newForm.init_data);

  newForm.slug = slug(newForm.title.toLowerCase(), { lowercase: true });
  newForm.cuid = cuid();
  newForm.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ form: saved });
  });
}

/**
 * Get a single form
 * @param req
 * @param res
 * @returns void
 */
export function getForm(req, res) {
  Form.findOne({ cuid: req.params.cuid }).exec((err, form) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ form });
  });
}

/**
 * Delete a form
 * @param req
 * @param res
 * @returns void
 */
export function deleteForm(req, res) {
  Form.findOne({ cuid: req.params.cuid }).exec((err, form) => {
    if (err) {
      res.status(500).send(err);
    }

    form.remove(() => {
      res.status(200).end();
    });
  });
}

export function updateForm(req, res) {
  Form.findOneAndUpdate({ cuid: req.params.cuid }, { $set: req.body.form}, { new: true })
  .exec((err, updated) => {
    console.log(err);
    if (err) {
      res.status(500).send(err);
    }
    res.json({ form: updated });
  });
}

export function uploadFileFromForm(req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');

  console.log(req.files)
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.file;

  // Use the mv() method to place the file somewhere on your server
  let newName = cuid();
  sampleFile.mv(config.workDir + '/' + newName, function(err) {
    if (err)
      return res.status(500).send(err);

    res.json({ newName });
  });
}

export function uploadDataFromForm(req, res) {
  // save it on work dir as JSON
  res.json({ data: req.body.data });
}
