
# Orhan YARDIM's Blog

## Overview

Orhan YARDIM's Blog is a simple yet elegant blog application built using Node.js and Express.js. The application dynamically displays blog posts from JSON files stored in the `data` directory. The homepage lists all blog posts with a brief summary, and clicking on a post displays the full content. This project demonstrates the use of Express.js for server-side rendering and dynamic content loading.

## Features

- Dynamic loading of blog posts from JSON files
- Clean and modern design with a dark theme
- Author name and post date displayed for each post
- Social media links in the header
- Footer with contact information
- Responsive design for various screen sizes

## Project Structure

```
NodeJS-Blog
│
├── views
│   ├── index.ejs          # Main page template
│   ├── post.ejs           # Blog post detail template
│
├── data                   # Directory for blog post JSON files
│   ├── technology.json    # Sample JSON file for technology posts
│   ├── travel.json        # Sample JSON file for travel posts
│   ├── health.json        # Sample JSON file for health posts
│   ├── education.json     # Sample JSON file for education posts
│   ├── recipes.json       # Sample JSON file for recipes posts
│   ├── sports.json        # Sample JSON file for sports posts
│
├── public                 # Static assets
│   ├── images             # Social media icons
│   │   ├── twitter-icon.png
│   │   ├── github-icon.png
│   │   └── linkedin-icon.png
│   └── styles.css         # CSS file for styling
│
├── app.js                 # Main application file
├── package.json           # Project metadata and dependencies
└── README.md              # Project documentation
```

## Installation

To get started with this project, follow the steps below:

1. **Clone the repository:**

   ```sh
   git clone https://github.com/yourusername/NodeJS-Blog.git
   cd NodeJS-Blog
   ```

2. **Install the dependencies:**

   ```sh
   npm install
   ```

3. **Run the application:**

   ```sh
   node app.js
   ```

4. **Open your browser and navigate to:**

   ```
   http://localhost:3000
   ```

## Usage

- **Adding New Blog Posts:** To add new blog posts, simply create new JSON files in the `data` directory. Each JSON file should contain an array of blog posts. The application will automatically detect and display new blog posts on the homepage.
  
  Example JSON structure:
  ```json
  [
    {
      "id": 1,
      "title": "New Blog Post",
      "summary": "This is a summary of the new blog post.",
      "content": "This is the full content of the new blog post.",
      "author": "Orhan Yardım",
      "date": "15 Mart 2024"
    }
  ]
  ```

## Detailed Explanation

### app.js

This file sets up the main Express.js server and defines the routes for the application.

- **Dependencies:**
  ```js
  const express = require('express');
  const bodyParser = require('body-parser');
  const fs = require('fs');
  const path = require('path');
  ```

- **Setup Express app:**
  ```js
  const app = express();
  const port = 3000;
  app.set('view engine', 'ejs');
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static('public'));
  ```

- **Dynamic topic loading:**
  The `getBlogTopics` function dynamically reads the JSON files from the `data` directory and returns an array of topic names.
  ```js
  const getBlogTopics = () => {
    const files = fs.readdirSync('data');
    return files
      .filter(file => path.extname(file) === '.json')
      .map(file => path.basename(file, '.json'));
  };
  ```

- **Routes:**
  - **Home page route:**
    Reads all blog posts from the JSON files and renders the `index.ejs` template.
    ```js
    app.get('/', (req, res) => {
      const blogTopics = getBlogTopics();
      let posts = [];
      blogTopics.forEach(topic => {
        let topicPosts = JSON.parse(fs.readFileSync(`data/${topic}.json`, 'utf-8'));
        topicPosts = topicPosts.map(post => {
          return { ...post, topic }; // Add topic to each post
        });
        posts = posts.concat(topicPosts);
      });
      res.render('index', { posts: posts });
    });
    ```

  - **Post detail route:**
    Reads a specific blog post based on the topic and ID and renders the `post.ejs` template.
    ```js
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
    ```

  - **Start server:**
    ```js
    app.listen(port, () => {
      console.log(`Blog app listening at http://localhost:${port}`);
    });
    ```

### Template Files (views)

- **index.ejs:** 
  Displays the list of blog posts with title, summary, author, and date.

- **post.ejs:** 
  Displays the full content of a selected blog post with title, author, and date.

### CSS (public/styles.css)

The CSS file styles the blog application with a dark theme, positions the social media icons, and styles the header, footer, and post elements.

### Author

- **Orhan YARDIM**
- Computer Engineer

Social Media:
- [GitHub](https://github.com/orhanyardim)
- [LinkedIn](https://linkedin.com/in/orhanyardim)
