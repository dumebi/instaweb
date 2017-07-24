let cloudinary = require('cloudinary');
// Mongoose Model
let Model = require('./model');

// Configure Cloudinary
// with credentials available on
// your Cloudinary account dashboard
cloudinary.config({
    cloud_name: 'dikejude49',
    api_key: '224227558288659',
    api_secret: 'HoDLJdlOKemwIqvTdtk3zUWek7w'
});

module.exports = {
    new: function (req, res) {
        res.render('pages/new');
    },
    create: function (req, res) {
        let post = new Model({
            tags: req.body.tags,
            title: req.body.title,
            description: req.body.description,
            created_at: new Date(),
            // Now we are requesting the image
            // from a form text input
            image: req.body.image
        });
        // Persist by saving
        post.save(function (err) {
            if(err){
                res.send(err)
            }
            // Redirect
            res.redirect('/');
        });
    },
    index: function (req, res) {
        Model.find({}, function (err, posts) {
            if(err) res.send(err);

            res.render('pages/index', {posts: posts});
        });
    },
    destroy: function (req, res) {
        let imageId = req.body.image_id;
        // The destroy method takes the image ID
        // which we need to remove
        cloudinary.v2.uploader.destroy(imageId, function (error, result) {
            // We also delete this
            // image details from our database
            Model.findOneAndRemove({ image_id: imageId }, function(err) {
                if (err) res.send(err);

                res.redirect('/');
            });
        });
    },
    edit: function (req, res) {
        Model.find({image_id: req.params.id}, function (err, posts) {
            if(err) res.send(err);
            // Render edit form
            //with existing post
            res.render('pages/edit', {post: posts[0]});
        });
    },
    update: function (req, res) {
        let oldName = req.body.old_id
        let newName = req.body.image_id;
        cloudinary.v2.uploader.rename(oldName, newName,
            function(error, result) {
                if (error) res.send(error);
                Model.findOneAndUpdate({image_id: oldName},
                    Object.assign({}, req.body, {image: result.url}),
                    function (err) {
                        if (err) res.send(err);

                        res.redirect('/');
                    })
            })

    }
};