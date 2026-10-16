export default function (type, date) {
    let tagContent;
    switch (type) {
        case "recent":
            tagContent = "Recently added";
            break;
        case "new":
            tagContent = "New";
            break;
    }
    if (date) {
        if (Date.now() - Date.parse(date) <= 518400000) {
            return `<span class="tag">${tagContent}</span>`;
        }
        return '';
    }
    return `<span class="tag">${tagContent}</span>`;
}