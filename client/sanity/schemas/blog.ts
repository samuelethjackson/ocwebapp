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
              type: "text",
              title: "Citation",
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
                    },
                    {
                      name: 'link',
                      type: 'object',
                      title: 'External link',
                      fields: [
                        {
                          name: 'href',
                          type: 'url',
                          title: 'URL'
                        },
                        {
                          title: 'Open in new tab',
                          name: 'blank',
                          description: 'Read https://css-tricks.com/use-target_blank/',
                          type: 'boolean'
                        }
                      ]
                    }
                  ]
                },
              },
              {
                type: 'image',
                fields: [
                  {
                    name: 'caption',
                    type: 'string',
                    title: 'Caption',
                  },
                  {
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative Text',
                  }
                ],
                options: {
                  hotspot: true
                },
              },
              {
                name: 'video',
                type: 'object',
                title: 'Video',
                fields: [
                  {
                    name: 'url',
                    type: 'url',
                    title: 'Video URL',
                  },
                  {
                    name: 'caption',
                    type: 'string',
                    title: 'Caption',
                  }
                ]
              }
            ]
          }
    ]
}