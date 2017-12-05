import { Router } from 'express';
import * as SubjectController from '../controllers/subject.controller';
const router = new Router();

// Get all Subjects
router.route('/subjects').get(SubjectController.getSubjects);

// Get one subject by cuid
router.route('/subjects/:cuid').get(SubjectController.getSubject);

//export default router;
module.exports = router;
