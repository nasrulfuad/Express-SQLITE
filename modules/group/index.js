const router = require('express').Router();
const { home, create, show, update } = require('./controller');
const { errHandler } = require('../../core/helpers');

router.get('/', errHandler(home));

router.post('/', errHandler(create));

router.get('/:id/show', errHandler(show));

router.post('/:id', errHandler(update));

module.exports = router;
