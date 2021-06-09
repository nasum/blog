module.exports = {
  title: "🍆 nasum's tech memo",
  description: "A blog that collects technical notes written by nasum",
  locales: {
    "/": {
      lang: "ja",
    },
  },
  head: [
    [
      "meta",
      {
        name: "google-site-verification",
        content: "DfsGAciGojAGIrGTmJ_Wb0HW-Lnx2VOIdXHwds24qS4",
      },
    ],
  ],
  markdown: {
    plugins: ["markdown-it-footnote"],
  },
  plugins: [
    [
      "@vuepress/blog",
      {
        directories: [
          {
            id: "Index",
            dirname: "_posts",
            path: "/",
            itemPermalink: "/:year/:month/:day/:slug",
          },
        ],
        frontmatters: [
          {
            id: "tag",
            keys: ["tag", "tags"],
            path: "/tags/",
            layout: "Tag",
            frontmatter: { title: "Tag" },
            pagination: {
              perPagePosts: 10,
            },
          },
        ],
        sitemap: {
          hostname: "https://nasum.dev",
        },
        feed: {
          canonical_base: "https://nasum.dev",
          feeds: {
            atom1: {
              enable: false,
            },
          },
        },
      },
    ],
    [
      "@vuepress/google-analytics",
      {
        ga: 'G-6YFFEG98M4',
      },
    ],
  ],
};
