export const slugify = (name) =>
    name
        .replace(/&/g, 'and') // & → and
        .replace(/\s+/g, '-'); // 공백 → -
