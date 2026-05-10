class CmdkIndex {
  data() {
    return {
      permalink: "cmdk-index.json",
      eleventyExcludeFromCollections: true,
    };
  }

  render(data) {
    const seriesTitles = (data.series && data.series.seriesTitles) || {};

    const posts = (data.collections && data.collections.postsBySeries
      ? Object.values(data.collections.postsBySeries).flat()
      : []
    ).map(p => ({
      type: "post",
      title: p.data.title || "",
      subtitle: p.data.subtitle || "",
      url: p.url,
      date: p.data.dateText || "",
      series: seriesTitles[p.data.seriesSlug] || "",
      episode: p.data.episode || 0,
    }));

    const topics = [];
    for (const key of ["java", "concurrency"]) {
      const cat = data.series && data.series[key];
      if (!cat) continue;
      for (const group of cat.groups || []) {
        for (const topic of group.topics || []) {
          const url = topic.status === "done" && topic.slug && topic.entry
            ? `/posts/${topic.slug}/${topic.entry}`
            : "";
          topics.push({
            type: "topic",
            title: topic.title,
            desc: topic.desc || "",
            category: cat.title,
            group: group.title,
            url,
            status: topic.status,
          });
        }
      }
    }

    return JSON.stringify({ posts, topics });
  }
}

module.exports = CmdkIndex;
