<template>
  <h1 class="article-title">{{ meta.title }}</h1>
  <p class="article-subtitle">Published on {{ meta.published }}</p>
  <main @click="click" v-html="content"></main>
</template>

<script>
import { ref, watch } from 'vue';
import posts from '../assets/posts.json';
import marked from 'marked';

const router = ref();
const meta = ref();
const content = ref('');

const dateOptions = {
  day: 'numeric',
  month: 'short',
  year: 'numeric'
};

const updateData = (to, from, next) => {
  const path = to.fullPath.substr(1);
  if (path in posts) {
    content.value = marked(posts[path].content);
    meta.value = posts[path].data;
    meta.value.published = new Intl.DateTimeFormat('en-US', dateOptions).format(
      new Date(Date.parse(meta.value.published))
    );
  }
  next();
};

export default {
  setup() {
    watch(meta, meta => {
      document.title = meta.value.title;
    });
    const click = event => {
      if (
        event.target.tagName === 'A' &&
        event.target.attributes.href.value in posts
      ) {
        event.preventDefault();
        router.value.push({ path: event.target.attributes.href.value });
        return false;
      }
    };
    return {
      meta,
      content,
      click
    };
  },
  mounted() {
    router.value = this.$router;
  },
  beforeRouteEnter: updateData,
  beforeRouteUpdate: updateData
};
</script>

<style lang="scss" scoped>
.article-title,
.article-subtitle {
  text-align: center;
}

::v-deep(main) {
  width: 100%;

  figure {
    margin: 0 auto;
    max-width: 100%;

    img {
      margin: 0 auto;
      max-width: 100%;
    }

    figcaption {
      text-align: center;
      font-style: italic;
      padding: 15px 0;
    }
  }

  p {
    text-align: justify;
  }
}
</style>
