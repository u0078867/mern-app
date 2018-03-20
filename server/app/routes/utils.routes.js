import { Router } from 'express';
import * as UtilsController from '../controllers/utils.controller';
const router = new Router();

function transferAccessToken(req, res, next) {
  let token = req.headers.authorization.split(' ')[1];
  req.token = token;
  next();
}

// Get all collections
//router.route('/utils/staticize-json-schema').post(UtilsController.staticizeJSONSchema);
router.post('/utils/staticize-json-schema', transferAccessToken, UtilsController.staticizeJSONSchema);

//export default router;
module.exports = router;
