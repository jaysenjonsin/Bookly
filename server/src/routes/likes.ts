import express from 'express';
const router = express.Router();

// router.get('/test', (_, res) => {
//   res.send('test');
// });

router.route('/').get((_, res) => {
  res.send('hello from likes');
});

export default router;
