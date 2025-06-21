export default {
    tags: "demos",
    permalink: function({page}) {
        return `/demos/${page.fileSlug}/`;
    }
}