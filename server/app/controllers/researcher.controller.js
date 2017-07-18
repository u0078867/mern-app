import Researcher from '../models/researcher';


/**
 * Get all researchers
 * @param req
 * @param res
 * @returns void
 */
export function getResearchers(req, res) {
  Researcher.find().exec((err, researchers) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ researchers });
  });
}

/**
 * Get a single researcher
 * @param req
 * @param res
 * @returns void
 */
export function getResearcher(req, res) {
  Researcher.findOne({ cuid: req.params.cuid }).exec((err, researcher) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ researcher });
  });
}
