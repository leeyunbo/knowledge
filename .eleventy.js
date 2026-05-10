module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("*.html");
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("posts");
  eleventyConfig.addPassthroughCopy("archive");
  eleventyConfig.addPassthroughCopy("curriculum");
  eleventyConfig.addPassthroughCopy({ "static/.nojekyll": ".nojekyll" });

  eleventyConfig.ignores.add("CLAUDE.md");
  eleventyConfig.ignores.add("README.md");
  eleventyConfig.ignores.add("_backlog.md");
  eleventyConfig.ignores.add(".claude");
  eleventyConfig.ignores.add("node_modules");
  eleventyConfig.ignores.add("_site");

  return {
    dir: {
      input: ".",
      output: "_site",
    },
    templateFormats: [],
  };
};
