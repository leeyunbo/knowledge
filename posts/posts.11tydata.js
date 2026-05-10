module.exports = {
  layout: "layouts/post.html",
  permalink: "{{ page.filePathStem }}.html",
  rootPath: "../../",
  eleventyComputed: {
    seriesSlug: function(data) {
      const parts = data.page.inputPath.split("/");
      return parts[2];
    }
  }
};
