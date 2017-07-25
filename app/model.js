let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// create a schema
let postSchema = new Schema({
    title: String,
    description: String,
    image: String,
    image_id: String,
    created_at: Date
});

// the schema is useless so far
// we need to create a model using it
let Post = mongoose.model('Post', postSchema);

// make this available to our users in our Node applications
module.exports = Post;