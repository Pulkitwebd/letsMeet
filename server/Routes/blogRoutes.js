const express = require("express");
const router = express.Router();
const blogController = require("../Controller/Blog/blogController");

router.post("/create", blogController.createBlog);
router.get("/allBlogs", blogController.getAllBlog);
router.get("/:id", blogController.getBlogById);

module.exports = router;
