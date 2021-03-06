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

router.get('/edit/:id', controller.edit);

router.post('/update', controller.update);

router.get('/admin', controller.admin.index);

router.get('/:id', controller.find);

module.exports = router;
