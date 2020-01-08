const router = require('express').Router();
const { home, show, update } = require('./controller');
const { errHandler } = require('../../core/helpers');

router.get('/', errHandler(home));

router.get('/users/:id/show', errHandler(show));

router.post('/users/:id', errHandler(update));

module.exports = router;
