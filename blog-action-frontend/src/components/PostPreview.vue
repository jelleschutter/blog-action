<template>
  <router-link :to="link">
    <div class="post-preview">
      <h2>{{ meta.title }}</h2>
      <span>Published on {{ meta.published }}</span>
    </div>
  </router-link>
</template>

<script>
import { ref } from 'vue';

const dateOptions = {
  day: 'numeric',
  month: 'short',
  year: 'numeric'
};

export default {
  props: {
    link: String,
    post: Object
  },
  setup(props) {
    const meta = ref(props.post.data);
    meta.value.published = new Intl.DateTimeFormat('en-US', dateOptions).format(
      new Date(Date.parse(meta.value.published))
    );
    return {
      meta
    };
  }
};
</script>

<style lang="scss" scoped>
.post-preview {
  border: 2px solid #2c3e50;
  padding: 30px;

  h2 {
    margin: 0;
  }
}

a {
  text-decoration: none;
}
</style>
