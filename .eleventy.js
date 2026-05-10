module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("archive");
  eleventyConfig.addPassthroughCopy("curriculum");
  eleventyConfig.addPassthroughCopy("posts/**/*.java");
  eleventyConfig.addPassthroughCopy({ "static/.nojekyll": ".nojekyll" });

  eleventyConfig.ignores.add("CLAUDE.md");
  eleventyConfig.ignores.add("README.md");
  eleventyConfig.ignores.add("_backlog.md");
  eleventyConfig.ignores.add(".claude");
  eleventyConfig.ignores.add("node_modules");
  eleventyConfig.ignores.add("_site");
  eleventyConfig.ignores.add("scripts");

  eleventyConfig.ignores.add("archive/**");
  eleventyConfig.ignores.add("curriculum/**");

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    templateFormats: ["html"],
    htmlTemplateEngine: "liquid",
  };
};
