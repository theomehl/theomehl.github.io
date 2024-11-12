export default {
    tags: "notes",
    layout: "layouts/note.njk",
    permalink: function({page}) {
        return `/notes/${page.fileSlug}/`;
    }
}