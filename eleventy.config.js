export default function (eleventyConfig) {
  // Pass through any static assets inside blog/
  eleventyConfig.addPassthroughCopy({ "blog/assets": "assets" });

  // Collection: published posts (sorted newest first)
  eleventyConfig.addCollection("posts", (collectionApi) =>
    collectionApi
      .getFilteredByTag("post")
      .filter((p) => !p.data.draft)
      .sort((a, b) => b.date - a.date)
  );

  // Collection: afterdark / draft posts
  eleventyConfig.addCollection("afterdark", (collectionApi) =>
    collectionApi
      .getFilteredByTag("afterdark")
      .sort((a, b) => b.date - a.date)
  );

  // Human-readable date filter
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return new Date(dateObj).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });

  return {
    dir: {
      input: "blog",
      output: "public/blog",
      includes: "_includes",
    },
  };
}
