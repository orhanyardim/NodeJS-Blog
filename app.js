const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(session({
  secret: 'secret_key',
  resave: false,
  saveUninitialized: true
}));

const getBlogTopics = () => {
  const files = fs.readdirSync('data');
  return files
    .filter(file => path.extname(file) === '.json')
    .map(file => path.basename(file, '.json'));
};

// Admin giriş rotası
app.get('/admin/login', (req, res) => {
  res.render('login');
});

app.post('/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'nodeblog' && password === '123456') {
    req.session.admin = true;
    res.redirect('/admin');
  } else {
    res.send('Geçersiz kullanıcı adı veya şifre');
  }
});

app.get('/admin', (req, res) => {
  if (!req.session.admin) {
    return res.redirect('/admin/login');
  }
  const blogTopics = getBlogTopics();
  let posts = [];
  blogTopics.forEach(topic => {
    let topicPosts = JSON.parse(fs.readFileSync(`data/${topic}.json`, 'utf-8'));
    topicPosts = topicPosts.map(post => {
      return { ...post, topic }; // Her posta topic bilgisi ekle
    });
    posts = posts.concat(topicPosts);
  });
  res.render('admin', { posts: posts });
});

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
