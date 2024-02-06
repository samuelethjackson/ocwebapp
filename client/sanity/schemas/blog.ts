export default {
    name: "blog",
    type: "document",
    title: "Blog",
    fields: [
        {
            name: "title",
            type: "string",
            title: "Title",
        },
        {
            name: "slug",
            type: "slug",
            title: "Slug",
            options: {
                source: "title"
            }
        },
        {
            name: "category",
            type: "string",
            title: "Category",
            options: {
                source: "title"
            }
        },
        {
            name: "author",
            type: "string",
            title: "Author",
        },
        {
            name: "biographyName",
            type: "string",
            title: "Biography Name",
        },
        {
            name: "biographyText",
            type: "text",
            title: "Biography",
        },
        {
            name: "date",
            type: "date",
            title: "Published on",
        },
        {
            name: "language",
            type: "string",
            title: "Language of Text",
        },
        {
            name: "citation",
            type: "string",
            title: "Citation",
        },
        {
            name: "content",
            type: "array",
            title: "Content",
            of: [
                {
                    type: "block"
                }
            ]
        }
    ]
}