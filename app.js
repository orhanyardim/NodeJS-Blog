const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const getBlogTopics = () => {
  const files = fs.readdirSync('data');
  return files
    .filter(file => path.extname(file) === '.json')
    .map(file => path.basename(file, '.json'));
};

// Ana sayfa rotası
app.get('/', (req, res) => {
  const blogTopics = getBlogTopics();
  let posts = [];
  blogTopics.forEach(topic => {
    let topicPosts = JSON.parse(fs.readFileSync(`data/${topic}.json`, 'utf-8'));
    topicPosts = topicPosts.map(post => {
      return { ...post, topic }; // Her posta topic bilgisi ekle
    });
    posts = posts.concat(topicPosts);
  });
  res.render('index', { posts: posts });
});

// Yazı detay rotası
app.get('/post/:topic/:id', (req, res) => {
  const { topic, id } = req.params;
  const posts = JSON.parse(fs.readFileSync(`data/${topic}.json`, 'utf-8'));
  const post = posts.find(p => p.id == id);
  if (post) {
    res.render('post', { post: post });
  } else {
    res.status(404).send('Post not found');
  }
});

app.listen(port, () => {
  console.log(`Blog app listening at http://localhost:${port}`);
});
