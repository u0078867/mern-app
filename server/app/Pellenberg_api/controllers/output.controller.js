import { getAllOutputs } from '../dataServices/output.service';
import { outputLoader } from '../dataLoaders/output';

/**
 * Get all outputs
 * @param req
 * @param res
 * @returns void
 */
export function getOutputs(req, res) {
  getAllOutputs()
  .then(items => {
    res.json({ items });
  })
  .catch(err => {
    res.status(500).send(err);
  })
}

/**
 * Get a single output
 * @param req
 * @param res
 * @returns void
 */
export function getOutput(req, res) {
  outputLoader.load(req.params.cuid)
  .then(item => {
    res.json({ item });
  })
  .catch(err => {
    res.status(500).send(err);
  })
}
