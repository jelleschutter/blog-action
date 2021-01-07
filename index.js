const core = require('@actions/core');
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const slugify = require('slugify');

const rootPath = process.env['GITHUB_WORKSPACE'];
const frontendPath = './blog-action-frontend';

async function run() {
  try {
    const postsPath = path.join(rootPath, 'posts');
    let postFiles = fs.readdirSync(postsPath);
    postFiles = postFiles.filter(value => /.*\.md/.test(value));
    const posts = {}
    postFiles.forEach(postPath => {
      const post = matter.read(path.join(postsPath, postPath));
      const published = post.data.published;
      const slug = post.data.slug || slugify(post.data.title);

      let url = [published.getFullYear(), published.getMonth() + 1, published.getDate(), slug, ''].join('/').toLowerCase();
      if (url in posts) {
        let i = 1;
        let newUrl = url;
        while (newUrl in posts) {
          newUrl = url + '-' + i;
          i++;
        }
        url = newUrl;
      }
      posts[url] = post;
    });

    fs.mkdirSync(path.join(frontendPath, 'src/assets'), { recursive: true });
    
    fs.writeFileSync(path.join(frontendPath, 'src/assets/posts.json'), JSON.stringify(posts));
  } catch (error) {
    core.setFailed(error);
  }
}

run();
