<template>
  <div class="l-wrapper">
    <header class="l-header">
      <router-link class="l-header__link c-nav-title" to="/"
        >🍆 nasum's tech memo</router-link
      >
      <router-link class="l-header__link c-nav-link" to="/tags/"
        >Tags</router-link
      >
    </header>
    <DefaultGlobalLayout />
    <footer class="l-footer">
      <p class="copyright">Copyright 2020 nasum</p>
    </footer>
  </div>
</template>

<script>
import GlobalLayout from "@app/components/GlobalLayout.vue";

export default {
  components: { DefaultGlobalLayout: GlobalLayout },
  created() {
    console.log();
  },
};
</script>

<style lang="scss">
html,
body,
#app {
  color: #222;
  height: 100%;
  font-family: "Helvetica Neue", "Helvetica", "Hiragino Sans",
    "Hiragino Kaku Gothic ProN", "Arial", "Yu Gothic", "Meiryo", sans-serif;
  background: #f5f5f5;
}
.l-wrapper {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}
.l-header {
  border-bottom: 1px solid #ebebeb;
  padding: 15px;
  &__link {
    color: #222;
    text-decoration: none;
  }
}
.l-main {
  max-width: 1024px;
  width: 100%;
  margin: 0 auto;
  padding: 0 15px;
}
.l-footer {
  padding: 15px;
  margin-top: auto;
  background-color: #f5f5f5;
  .copyright {
    text-align: center;
    font-weight: bold;
  }
}

.c-nav-title {
  font-size: 1.2rem;
  font-weight: bold;
}

.c-nav-link {
  padding: 4px;
  border: 1px solid #d8dadb;
  border-radius: 5px;
  margin-right: 4px;
  margin-bottom: 4px;
  a {
    color: #222;
    text-decoration: none;
  }
}
</style>
