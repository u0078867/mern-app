import Subm from '../models/subm';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';
import config from '../../config';

/**
 * Get all submissions
 * @param req
 * @param res
 * @returns void
 */
export function getSubms(req, res) {
  Subm.find().sort('date_added')
  .populate('form')
  .exec((err, subms) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ subms });
  });
}

/**
 * Save a submission
 * @param req
 * @param res
 * @returns void
 */
export function addSubm(req, res) {
  if (!req.body.subm.form ||
      !req.body.subm.data) {
    return res.status(403).end();
  }

  const newSubm = new Subm(req.body.subm);

  // Let's sanitize inputs
  console.log(newSubm.data);
  //newSubm.data = JSON.parse(newSubm.data);

  newSubm.slug = 'submission';
  newSubm.cuid = cuid();
  newSubm.save((err, saved) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ subm: saved });
  });
}

/**
 * Get a single subm
 * @param req
 * @param res
 * @returns void
 */
export function getSubm(req, res) {
  Subm.findOne({ cuid: req.params.cuid })
  .populate('form')
  .exec((err, subm) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ subm });
  });
}

/**
 * Delete a subm
 * @param req
 * @param res
 * @returns void
 */
export function deleteSubm(req, res) {
  Subm.findOne({ cuid: req.params.cuid }).exec((err, subm) => {
    if (err) {
      return res.status(500).send(err);
    }

    subm.remove((err) => {
      //res.status(200).send({});
      res.status(200).json(null);
    });
  });
}

export function updateSubm(req, res) {
  Subm.findOneAndUpdate({ cuid: req.params.cuid }, { $set: req.body.subm}, { new: true })
  .populate('form')
  .exec((err, updated) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ subm: updated });
  });
}
