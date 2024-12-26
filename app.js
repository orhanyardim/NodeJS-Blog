const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Ana sayfa rotası
app.get('/', (req, res) => {
  const posts = JSON.parse(fs.readFileSync('data/posts.json', 'utf-8'));
  res.render('index', { posts: posts });
});

// Yazı detay rotası
app.get('/post/:id', (req, res) => {
  const posts = JSON.parse(fs.readFileSync('data/posts.json', 'utf-8'));
  const post = posts.find(p => p.id == req.params.id);
  res.render('post', { post: post });
});

app.listen(port, () => {
  console.log(`Blog app listening at http://localhost:${port}`);
});
