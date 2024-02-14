const footnote = {
    name: 'footnote',
    type: 'object',
    title: 'Footnote',
    fields: [
      {
        name: 'number',
        type: 'number',
        title: 'Footnote number',
      },
      {
        name: 'text',
        type: 'text',
        title: 'Footnote text',
      },
    ],
  };
  
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
          },
          {
              name: "type",
              type: "string",
              title: "Article type",
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
              type: "array",
              title: "Biography",
              of: [
                {
                    type: 'block'
                }
            ]
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
              type: "array",
              title: "Citation",
              of: [
                {
                    type: 'block'
                }
            ]
          },
          {
            name: "content",
            type: "array",
            title: "Content",
            of: [
                {
                    type: 'block',
                    marks: {
                        annotations: [
                            {
                                name: 'footnote',
                                type: 'object',
                                title: 'Footnote',
                                fields: [
                                    {
                                        name: 'number',
                                        type: 'number',
                                        title: 'Footnote number',
                                    },
                                    {
                                        name: 'text',
                                        type: 'text',
                                        title: 'Footnote text',
                                    },
                                ]
                            }
                        ]
                    }
                }
            ]
        }
    ]
}