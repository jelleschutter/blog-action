import { createRouter, createWebHistory } from 'vue-router';
import PostList from '../views/PostList.vue';
import Post from '../views/Post.vue';

const routes = [
  {
    path: '/',
    name: 'PostList',
    component: PostList
  },
  {
    path: '/:page(.*)',
    name: 'Post',
    component: Post
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
