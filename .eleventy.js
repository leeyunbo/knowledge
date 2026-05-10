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

  eleventyConfig.addFilter("seriesNav", function(episodes, currentUrl) {
    if (!episodes || episodes.length === 0) return { prev: null, next: null, index: -1, total: 0 };
    const idx = episodes.findIndex(e => e.url === currentUrl);
    return {
      prev: idx > 0 ? episodes[idx - 1] : null,
      next: idx >= 0 && idx < episodes.length - 1 ? episodes[idx + 1] : null,
      index: idx,
      total: episodes.length
    };
  });

  eleventyConfig.addFilter("padNum", function(n) {
    return String(n).padStart(2, "0");
  });

  eleventyConfig.addCollection("postsBySeries", function(collectionApi) {
    const groups = {};
    collectionApi.getAll().forEach(item => {
      if (!item.inputPath.startsWith("./posts/")) return;
      const parts = item.inputPath.split("/");
      const slug = parts[2];
      if (!slug) return;
      if (!groups[slug]) groups[slug] = [];
      groups[slug].push(item);
    });
    Object.keys(groups).forEach(slug => {
      groups[slug].sort((a, b) => a.inputPath.localeCompare(b.inputPath));
    });
    return groups;
  });

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
