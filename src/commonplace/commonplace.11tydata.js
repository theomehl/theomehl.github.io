export default {
    tags: ["commonplace", "commonplace all"],
    layout: "layouts/commonplace-post.njk",
    permalink: function({page}) {
        return `/commonplace/${page.fileSlug}/`;
    }
}