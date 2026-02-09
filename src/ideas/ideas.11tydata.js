export default {
    tags: "ideas",
    layout: "layouts/idea.njk",
    permalink: function({page}) {
        return `/ideas/${page.fileSlug}/`;
    }
}