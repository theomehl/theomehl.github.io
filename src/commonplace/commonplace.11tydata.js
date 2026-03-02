let data = {
    tags: "commonplace",
    layout: "layouts/commonplace-post.njk",
    permalink: function({page}) {
        return `/commonplace/${page.fileSlug}/`;
    }
}

if (process.env.ELEVENTY_RUN_MODE === "build") {
    data.date = "git Last Modified";
}

export default data;