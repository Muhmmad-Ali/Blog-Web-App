import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

let posts = [];

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { posts });
});

app.get("/new-post", (req, res) => {
  res.render("create-blog-form.ejs");
});

// Route to handle submission of a new blog post
app.post("/new-post", (req, res) => {
  const { title, subtitle, author, content } = req.body;

  // Create a post object and assign a unique ID
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

// Route to show individual blog post based on its ID
app.get("/post/:id", (req, res) => {
  const postId = parseInt(req.params.id);

  const post = posts.find((p) => {
    return p.id === postId;
  });

  if (post) {
    res.render("open-blog.ejs", { post });
  } else {
    res.status(404).send("Post not found");
  }
});

app.post("/delete-post/:id", (req, res) => {
  const postId = parseInt(req.params.id);

  // find and remove from array
  posts = posts.filter((post) => post.id !== postId);

  res.redirect("/");
});

// Start the server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
