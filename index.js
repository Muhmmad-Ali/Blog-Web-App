import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

// In-memory array to store all blog posts
const posts = [];

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { posts });
});

app.get("/new-post", (req, res) => {
  res.render("new-post.ejs");
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

  // Save the new post in memory
  posts.push(post);

  // Redirect to homepage after submission
  res.redirect("/");
});

// Route to show individual blog post based on its ID
app.get("/post/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find((p) => {
    p.id === postId;
  });

  if (post) {
    // Render post if found
    res.render("single-post", { post });
  } else {
    // Handle invalid ID
    res.status(404).send("Post not found");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
