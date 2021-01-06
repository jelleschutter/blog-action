const core = require('@actions/core');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const slugify = require('slugify');

const deployAction = require('@jamesives/github-pages-deploy-action');

const rootPath = process.env.GITHUB_WORKPACE;
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
      const slug = post.data.slug ?? slugify(post.data.title);

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

    fs.writeFileSync(path.join(frontendPath, 'src/assets/posts.json'), JSON.stringify(posts));

    exec('npm run build', { cwd: frontendPath }, (err, stdout, stderr) => {
      if (err) throw err;
      Object.keys(posts).forEach(key => {
        fs.mkdir(path.join(frontendPath, 'dist/', key), { recursive: true }, err => {
          if (err) throw err;
          fs.copyFile(path.join(frontendPath, 'dist/index.html'), path.join(frontendPath, 'dist/', key, 'index.html'), err => {
            if (err) throw err;
          })
        });
      });
    });

    deployAction({
      githubToken: core.getInput('GITHUB_TOKEN'),
      branch: 'gh-pages',
      folder: path.join(frontendPath, 'dist'),
      repositoryName: process.env.GITHUB_REPOSITORY,
      silent: true,
      workspace: '.',
      clean: true
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
