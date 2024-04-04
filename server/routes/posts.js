const express = require("express");
const router = express.Router();
const fs = require("fs");
const crypto = require("crypto");

router
  .route("/")
  .get((_req, res) => {
    const postData = JSON.parse(fs.readFileSync("./data/posts.json"));
    res.status(200).json(postData);
  })
  .post((req, res) => {
    if (!req.body.user) {
      return res.status(400).send("Please log in before posting");
    }
    if (!req.body.post) {
      return res.status(400).send("Please enter a post");
    }
    const newPost = {
      id: crypto.randomUUID(),
      user: req.body.user,
      post: req.body.post,
      timestamp: new Date(),
      avatar: "",
      attachements: "",
      replies: "",
      likeCount: 0,
    };
    const postData = JSON.parse(fs.readFileSync("./data/posts.json"));
    postData.push(newPost);
    fs.writeFileSync("./data/posts.json", JSON.stringify(postData));

    res.status(201).json(newPost);
  });
router
  .route("/:id")
  .delete((req, res) => {
    const postData = JSON.parse(fs.readFileSync("./data/posts.json"));
    const postDataEdit = postData.filter((post) => post.id !== req.params.id);
    // if (
    //   !postData.find((post) => {
    //     post.id === req.params.id;
    //   })
    // ) {
    //   return res.status(404).send("Post does not exist");
    // }
    fs.writeFileSync("./data/posts.json", JSON.stringify(postDataEdit));
    res.status(200).send("Post deleted");
  })
  .patch((req, res) => {
    if (!req.body.post) {
      return res.status(400).send("Please enter your edit");
    }
    const postData = JSON.parse(fs.readFileSync("./data/posts.json"));
    const postEdited = postData.find((post) => post.id === req.params.id);
    if (!postEdited) {
      return res.status(404).send("Post does not exist");
    }
    postEdited.post = req.body.post;
    fs.writeFileSync("./data/posts.json", JSON.stringify(postData));
    res.status(200).send("Post edited");
  })
  .put((req, res) => {
    const postData = JSON.parse(fs.readFileSync("./data/posts.json"));
    const postLiked = postData.find((post) => post.id === req.params.id);
    if (!postLiked) {
      return res.status(404).send("Post does not exist");
    }
    postLiked.likeCount += 1;
    fs.writeFileSync("./data/posts.json", JSON.stringify(postData));
    res.status(200).send("Post liked");
  });

module.exports = router;
