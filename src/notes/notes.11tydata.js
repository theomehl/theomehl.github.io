import { DateTime } from "luxon";

export default {
    eleventyComputed: {
        title: function(data) {
            // Keep original titles of original notes
            if (data.title) {
                return data.title;
            }
            return DateTime.fromJSDate(data.page.date).toFormat("DD 'at' t");
        },
        description: function(data) {
            // Keep descriptions of original notes. 
            if (data.description) {
                return data.description 
            }
            // Otherwise return the note output truncated to 80 characters max, excluding markdown links just in case
            return (data.page.rawInput.slice(0, 80).replace(/\[([^\]]+)\]\([^)]*\)/g, '$1') + (data.page.rawInput.length >= 80 ? '...' : ''));
        },
        metaTitle: function(data) {
            return "Note - " + DateTime.fromJSDate(data.page.date).toFormat("DD 'at' t");
        }
    },
    tags: "notes",
    layout: "layouts/note.njk",
    permalink: function({page}) {
        // Keep the original permalink for notes that already exist with a title based URL
        if (page.fileSlug.match(/[a-z]/g)) {
            return `/notes/${page.fileSlug}/`;
        }
        return `/notes/${DateTime.fromJSDate(page.date).toFormat("yyyyLLddHHmm")}/`;
    }, 
}