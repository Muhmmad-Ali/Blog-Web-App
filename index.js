import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

let posts = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Home page
app.get("/", (req, res) => {
  res.render("index.ejs", { posts });
});

// Create Blog Form
app.get("/new-post", (req, res) => {
  res.render("create-blog-form.ejs");
});

// Handle New Blog Submission
app.post("/new-post", (req, res) => {
  const { title, subtitle, author, content } = req.body;

  const post = {
    id: posts.length + 1,
    title,
    subtitle,
    author,
    content,
  };

  posts.push(post);
  res.redirect("/");
});

// Open Blog by ID
app.get("/post/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find((p) => p.id === postId);

  if (post) {
    res.render("open-blog.ejs", { post });
  } else {
    res.status(404).send("Post not found");
  }
});

// Delete Blog
app.post("/delete-post/:id", (req, res) => {
  const postId = parseInt(req.params.id);

  // Remove the post
  posts = posts.filter((post) => {
    post.id !== postId;
  });

  // Reassign IDs to maintain consistency
  posts.forEach((post, index) => {
    post.id = index + 1;
  });

  res.redirect("/");
});

// Show Edit Page
app.get("/edit-post/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  const blog = posts.find((blog) => blog.id === postId);

  if (blog) {
    res.render("edit-blog-form.ejs", { posts, blog });
  } else {
    res.status(404).send("Post not found");
  }
});

// Handle Edit Submission
app.post("/edited-post/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  const { title, subtitle, author, content } = req.body;

  const blogIndex = posts.findIndex((blog) => {
    blog.id === postId;
  });

  if (blogIndex !== -1) {
    posts[blogIndex] = {
      id: postId,
      title,
      subtitle,
      author,
      content,
    };

    res.redirect("/");
  } else {
    res.status(404).send("Post not found");
  }
});

// Start server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
