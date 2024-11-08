export default {
    tags: "posts",
    layout: "layouts/post.njk",
    permalink: function({page}) {
        return `/blog/${page.fileSlug}/`;
    }
}