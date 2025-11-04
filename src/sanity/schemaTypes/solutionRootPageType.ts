import { defineType, defineField } from "sanity";

export const solutionRootPage = defineType({
  name: "solutionRootPage",
  title: "Solutions Root Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
    }),
    defineField({
      name: "subtitle",
      title: "Page Subtitle",
      type: "string",
    }),
    defineField({
      name: "overviewTitle",
      title: "Overview Title",
      type: "string",
    }),
    defineField({
      name: "overviewDesc",
      title: "Overview Description",
      type: "text",
    }),
     defineField({
      name: "solutions",
      title: "Solutions",
      type: "array",
      of: [
        defineField({
            name: "solution",
            title: "Solution Item",
            type: "object",
            fields: [
                defineField({
                name: "name",
                title: "Name",
                type: "string",
                validation: (Rule) => Rule.required(),
                }),
                defineField({
                name: "desc",
                title: "Description",
                type: "text",
                }),
                defineField({
                name: "image",
                title: "Image",
                type: "image",
                options: { hotspot: true },
                description: "Upload image for this solution.",
                }),
                defineField({
                name: "href",
                title: "Link / URL",
                type: "string",
                description: "Example: /solutions/greige",
                }),
            ],
            }),
        ],
        description: "Add all solution items directly here.",
        }),
        defineField({
      name: "otherSolutions",
      title: "Other Solutions",
      type: "array",
      of: [
        defineField({
            name: "solution",
            title: "Solution Item",
            type: "object",
            fields: [
                defineField({
                name: "name",
                title: "Name",
                type: "string",
                validation: (Rule) => Rule.required(),
                }),
                defineField({
                name: "desc",
                title: "Description",
                type: "text",
                }),
                defineField({
                name: "image",
                title: "Image",
                type: "image",
                options: { hotspot: true },
                description: "Upload image for this solution.",
                }),
                defineField({
                name: "href",
                title: "Link / URL",
                type: "string",
                description: "Example: /solutions/greige",
                }),
            ],
            }),
        ],
        description: "Add all solution items directly here.",
        }),
    defineField({
        name: "ctaSection",
        title: "CTA Section",
        type : "object",
        fields:[
        {
            name: 'title',
          title: 'Section Title',
          type: 'string',
          validation: Rule => Rule.required()
        },
        {
            name: 'desc',
          title: 'Section desc',
          type: 'string',
          validation: Rule => Rule.required()
        },
        {
            name: 'url',
          title: 'Button url',
          type: 'string',
          validation: Rule => Rule.required()
        },
        {
            name: 'btn',
          title: 'Button Txt',
          type: 'string',
          validation: Rule => Rule.required()
        },

  ]
}),
]})
