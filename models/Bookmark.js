var mongoose = require('mongoose')

var BookmarkSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    url: { type: String, unique: true, required: true, trim: true },
    rating: { type: Number },
})

var Bookmark = mongoose.model('Bookmark', BookmarkSchema)

// populate the database on load
Bookmark.countDocuments({}, (err, count) => {
    if (!err && count < 2) {
        Bookmark.create({ title: 'CWEs', url: 'https://cwe.mitre.org/', rating: 4 })
        Bookmark.create({ title: 'OWASP Top 10', url: 'https://owasp.org/Top10/', rating: 5 })
    }
})

module.exports = Bookmark