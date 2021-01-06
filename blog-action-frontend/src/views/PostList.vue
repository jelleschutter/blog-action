<template>
  <h1>Jelle's Blog</h1>
  <PostPreview
    v-for="(post, link) in posts"
    :post="post"
    :key="link"
    :link="'/' + link"
  />
</template>

<script>
import posts from '../assets/posts.json';
import PostPreview from '../components/PostPreview';

export default {
  setup() {
    return {
      posts
    };
  },
  components: {
    PostPreview
  }
};
</script>

<style lang="scss" scoped>
h1 {
  text-align: center;
}
</style>
