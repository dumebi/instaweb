let express = require('express');
let router = express.Router();
let multipart = require('connect-multiparty');
let multipartMiddleware = multipart();
let controller = require('../app/controller');


/* GET home page. */
router.get('/', controller.index);

router.get('/new', controller.new);

router.post('/create', multipartMiddleware, controller.create);

router.post('/destroy', controller.destroy);

router.get('/edit', controller.edit);

router.post('/update', controller.update);

module.exports = router;
