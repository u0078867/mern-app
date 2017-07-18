import SWTool from '../models/swtool';


/**
 * Get all software tools
 * @param req
 * @param res
 * @returns void
 */
export function getSWTools(req, res) {
  SWTool.find().exec((err, SWTools) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ SWTools });
  });
}

/**
 * Get a single software tool
 * @param req
 * @param res
 * @returns void
 */
export function getSWTool(req, res) {
  SWTool.findOne({ cuid: req.params.cuid }).exec((err, SWTool) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ SWTool });
  });
}
