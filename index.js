
const express = require("express");
const app = express();

// Set EJS as the view engine
app.set("view engine", "ejs");

// Read form data
app.use(express.urlencoded({ extended: true }));

// Connect CSS folder
app.use(express.static("public"));

// Store blog posts temporarily
let posts = [];

// Home page
app.get("/", (req, res) => {
    res.render("index", { posts: posts });
});

// Create a new blog post
app.post("/posts", (req, res) => {

    const title = req.body.title;
    const content = req.body.content;

    // Check whether fields are empty
    if (!title || !title.trim() || !content || !content.trim()) {
        return res.status(400).send("Please fill in all fields.");
    }

    posts.push({
        id: Date.now(),
        title: title.trim(),
        content: content.trim()
    });

    res.redirect("/");
});

// Show edit page
app.get("/posts/:id/edit", (req, res) => {

    const id = Number(req.params.id);

    const post = posts.find(p => p.id === id);

    if (!post) {
        return res.status(404).send("Post not found!");
    }

    res.render("edit", { post: post });
});
// Update blog post
app.post("/posts/:id", (req, res) => {

    const id = Number(req.params.id);

    const post = posts.find(p => p.id === id);

    if (!post) {
        return res.status(404).send("Post not found!");
    }

    const title = req.body.title;
    const content = req.body.content;

    if (!title || !title.trim() || !content || !content.trim()) {
        return res.status(400).send("Please fill in all fields.");
    }

    post.title = title.trim();
    post.content = content.trim();

    res.redirect("/");
});

// Delete a blog post
app.post("/posts/:id/delete", (req, res) => {

    const id = Number(req.params.id);

    const postIndex = posts.findIndex(p => p.id === id);

    if (postIndex === -1) {
        return res.status(404).send("Post not found!");
    }

    posts.splice(postIndex, 1);

    res.redirect("/");
});

// Start server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
