<template>
  <div class="l-main">
    <ul class="c-tag-list">
      <li class="c-tag-list__tag" v-for="tag in tags" :key="tag">
        <router-link class="page-link" :to="tag.path"
          >{{ tag.name }}: {{ tag.pages.length }}</router-link
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Tag",
  computed: {
    tags() {
      const tagList = this.$tag.list;
      return tagList.sort((tagA, tagB) => {
        if (tagA.pages.length < tagB.pages.length) {
          return 1;
        } else if (tagA.pages.length > tagB.pages.length) {
          return -1;
        } else {
          return 0;
        }
      });
    },
  },
};
</script>

<style lang="scss">
.c-tag-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  list-style: none;
  padding-bottom: 6px;

  &__tag {
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
}
</style>
