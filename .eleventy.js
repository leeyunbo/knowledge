module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("posts");
  eleventyConfig.addPassthroughCopy("archive");
  eleventyConfig.addPassthroughCopy("curriculum");
  eleventyConfig.addPassthroughCopy({ "static/.nojekyll": ".nojekyll" });

  eleventyConfig.addPassthroughCopy("index.html");
  eleventyConfig.addPassthroughCopy("narrative.html");
  eleventyConfig.addPassthroughCopy("reading.html");
  eleventyConfig.addPassthroughCopy("network.html");
  eleventyConfig.addPassthroughCopy("spring.html");
  eleventyConfig.addPassthroughCopy("db.html");
  eleventyConfig.addPassthroughCopy("distributed.html");
  eleventyConfig.addPassthroughCopy("security.html");

  eleventyConfig.ignores.add("CLAUDE.md");
  eleventyConfig.ignores.add("README.md");
  eleventyConfig.ignores.add("_backlog.md");
  eleventyConfig.ignores.add(".claude");
  eleventyConfig.ignores.add("node_modules");
  eleventyConfig.ignores.add("_site");

  eleventyConfig.ignores.add("posts/**");
  eleventyConfig.ignores.add("archive/**");
  eleventyConfig.ignores.add("curriculum/**");

  eleventyConfig.ignores.add("index.html");
  eleventyConfig.ignores.add("narrative.html");
  eleventyConfig.ignores.add("reading.html");
  eleventyConfig.ignores.add("network.html");
  eleventyConfig.ignores.add("spring.html");
  eleventyConfig.ignores.add("db.html");
  eleventyConfig.ignores.add("distributed.html");
  eleventyConfig.ignores.add("security.html");

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
