let data = {
    tags: "commonplace",
    layout: "layouts/commonplace-post.njk",
    permalink: function({page}) {
        return `/commonplace/${page.fileSlug}/`;
    }
}

export default data;