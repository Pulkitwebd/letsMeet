const mongoose = require('mongoose');

const subheadingSchema = new mongoose.Schema({
  text: String,
  paragraphs: [String],
  images: [{ data: Buffer, contentType: String }],
});

const headingSchema = new mongoose.Schema({
  text: String,
  paragraphs: [String],
  images: [{ data: Buffer, contentType: String }],
  subheadings: [subheadingSchema],
});

const blogSchema = new mongoose.Schema({
  title: String,
  mainImage: { data: Buffer, contentType: String },
  headings: [headingSchema],
  author: String,
  category: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Blog', blogSchema);
