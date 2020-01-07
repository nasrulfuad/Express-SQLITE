const router = require('express').Router();
const { home, show } = require('./controller');
const { errHandler } = require('../../core/helpers');

router.get('/', errHandler(home));

router.get('/users/:id/show', errHandler(show));

module.exports = router;
