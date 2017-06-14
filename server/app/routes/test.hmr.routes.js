import { Router } from 'express';
const router = new Router();

router.get('/msg', (req, res) => {
  res.send("Test server server HMR");
});

//export default router;
module.exports = router;
