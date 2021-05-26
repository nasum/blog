<template>
  <div class="l-main">
    <ul class="c-blog-list">
      <li class="c-blog" v-for="page in $pagination.pages" :key="page.key">
        <router-link class="c-blog__title" :to="page.path">{{
          page.title
        }}</router-link>
        <ul class="c-tag-list">
          <li class="c-blog__tag" v-for="tag in page.frontmatter.tag">
            <router-link :to="`/tags/${tag}/`">
              {{ tag }}
            </router-link>
          </li>
        </ul>
        <time :datetime="page.frontmatter.date">{{
          page.frontmatter.date
        }}</time>
      </li>
    </ul>
    <div>
      <router-link v-if="$pagination.hasPrev" :to="$pagination.prevLink"
        >Prev</router-link
      >
      <router-link v-if="$pagination.hasNext" :to="$pagination.nextLink"
        >Next</router-link
      >
    </div>
  </div>
</template>

<style lang="scss">
.c-blog-list {
  display: flex;
  flex-direction: column;
  list-style: none;
}

.c-tag-list {
  display: flex;
  flex-direction: row;
  list-style: none;
  padding-bottom: 6px;
}

.c-blog {
  padding-bottom: 20px;
  &__title {
    color: #2b6cb0;
    display: block;
    font-size: 24px;
    padding-bottom: 5px;
    text-decoration: none;
  }
  &__tag {
    padding: 4px;
    border: 1px solid #d8dadb;
    border-radius: 5px;
    margin-right: 4px;
    a {
      color: #222;
      text-decoration: none;
    }
  }
}
</style>
