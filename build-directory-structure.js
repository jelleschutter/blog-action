const core = require('@actions/core');
const fs = require('fs');
const path = require('path');

const frontendPath = './blog-action-frontend';

async function run() {
  try {
    const posts = JSON.parse(fs.readFile(path.join(frontendPath, 'src/assets/posts.json')));

    Object.keys(posts).forEach(key => {
      fs.mkdir(path.join(frontendPath, 'dist/', key), { recursive: true }, err => {
        if (err) throw err;

        fs.copyFile(path.join(frontendPath, 'dist/index.html'), path.join(frontendPath, 'dist/', key, 'index.html'), err => {
          if (err) throw err;
        });
      });
    });

  } catch (error) {
    core.setFailed(error);
  }
}

run();

