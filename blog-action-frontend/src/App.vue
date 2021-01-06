<template>
  <div class="page-content">
    <router-view />
    <footer>
      <hr />
      <p>
        Generated with ❤️ using the
        <a href="https://github.com/jelleschutter/blog-action">Blog Action</a>
      </p>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.page-content {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  max-width: 700px;
  margin: 0 auto;

  footer {
    padding: 20px 0;

    hr {
      border: none;
      border-top: 1px solid #2c3e50;
      margin: 0 auto;
      width: 16%;
    }
    p {
      text-align: center;
      margin-top: 23px;
    }
  }
}

::v-deep(a, a:active) {
  color: inherit;
}
</style>
