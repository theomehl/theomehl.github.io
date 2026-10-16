export default function (content, summary, open = false) {
return `
<details ${open ? 'open' : ''}>
<summary>${summary}</summary>
<div class="details-wrapper flow">
${content}
</div>
</details>
`;
}