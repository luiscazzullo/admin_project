const mongoose = require('mongoose');
const projectsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    pubdate: {
        type: Date,
        default: Date.now()
    }
});
module.exports = mongoose.model('Project', projectsSchema);