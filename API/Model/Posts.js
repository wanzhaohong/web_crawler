const mongoose = require('mongoose');

// schema
const PostingsSchema = new mongoose.Schema({
    jobtitle: {
        type: Array,
        required: true,
    },
    company: {
        type: Array,
        required: true,
    },
    companylink: {
        type: String,
        required: false,
    },
    companyIcon: {
        type: String,
        required: false,
    },
    location: {
        type: Array,
        required: true,
    },
    worktype: {
        type: Array,
        required: false,
    },
    jobcondition: {
        type: Array,
        required: false,
    },
    jobdescription: {
        type: String,
        required: true,
    },
    postdate: {
        type: Array,
        required: true,
    },
    tags: {
        type: Array,
        required: false,
    },
    deleted: {
        type: Boolean,
        default: false,
    },
});


module.exports = mongoose.model('Postings', PostingsSchema);